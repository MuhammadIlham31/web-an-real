"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiFetch, ApiError } from "@/lib/api";

// ponytail: data dari AN-WEB-SERVICE-ACTIVE-MEMBER-BE (GET /api/v1/active-member/query/)
// field BE: nama, jabatan, divisi, tahunAngkatan, typeAsisten, kesanPesan, imageUrl, instagram, linkedIn
export default function TeamPage() {
  const [members, setMembers] = useState(null);
  const [err, setErr] = useState(null);
  const [tab, setTab] = useState("riset");

  useEffect(() => {
    let alive = true;
    apiFetch("/api/v1/active-member/query/", {}, "activeMember")
      .then((r) => alive && setMembers(Array.isArray(r.data) ? r.data : []))
      .catch((e) =>
        alive && setErr(e instanceof ApiError ? `Backend error ${e.status}` : "Gagal mengambil data member")
      );
    return () => { alive = false; };
  }, []);

  const tabs = [
    { id: "riset", label: "Asisten Riset", data: (members ?? []).filter((m) => (m.typeAsisten ?? "").toLowerCase().includes("riset")) },
    { id: "praktikum", label: "Asisten Praktikum", data: (members ?? []).filter((m) => (m.typeAsisten ?? "").toLowerCase().includes("praktikum")) },
  ];
  const active = tabs.find((t) => t.id === tab);

  return (
    <div className="min-h-screen flex flex-col bg-[#E3F2FD]">
      <Header variant="light" />

      <main className="flex-1">
        {/* About The Team */}
        <section className="page-hero px-6 py-16 text-[#E3F2FD] md:px-12 md:py-20">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-5xl font-bold text-[#E3F2FD] md:text-7xl">About The Team</h1>
            <p className="max-w-3xl text-lg leading-relaxed text-[#E3F2FD]/70">
              Yuk, kenalan sama anggota dari Adaptive Network Laboratory. Kami tergabung dari
              beberapa mahasiswa yang dibagi menjadi dua bagian yaitu asisten praktikum dan
              asisten riset. Jika membutuhkan sesuatu, kamu bisa menghubungi asisten melalui
              sosial media yang dicantumkan di bawah ini, ya.
            </p>
            <div className="mt-12 grid grid-cols-3 items-start gap-3 md:gap-6">
              <img src="/assets/team-photo-1.jpg" alt="Kegiatan team" className="mt-7 aspect-[4/3] w-full object-cover grayscale" />
              <img src="/assets/team-photo-2.jpg" alt="Kegiatan team" className="aspect-[4/3] w-full object-cover grayscale" />
              <img src="/assets/team-photo-3.jpg" alt="Kegiatan team" className="mt-7 aspect-[4/3] w-full object-cover grayscale" />
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
          <p className="text-primary text-2xl font-medium">Adaptive Network Laboratory</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-10">Our Team</h2>

          {err && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-600">
              {err}. Pastikan AN-WEB-SERVICE-ACTIVE-MEMBER-BE (+ Redis) jalan & <code>NEXT_PUBLIC_API_KEY</code> benar.
            </div>
          )}

          {/* Tabs */}
          <div className="grid grid-cols-2 mb-10" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`py-4 text-xl md:text-2xl font-medium border-b-4 transition-colors ${
                  tab === t.id ? "text-primary border-primary" : "text-text-secondary border-gray-200 hover:text-text-primary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Grid member */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {active.data.map((m) => (
              <div key={m.uid} className="bg-surface py-8 px-4 text-center">
                <img src={m.imageUrl || "/assets/team-av-1.jpg"} alt={m.nama} className="w-32 h-32 rounded-full object-cover mx-auto" />
                <h3 className="text-primary text-xl font-semibold mt-5">{m.nama}</h3>
                <p className="text-text-secondary mt-1">{m.jabatan}</p>
                {m.divisi && <p className="text-text-light text-sm mt-1">{m.divisi}</p>}
                {m.tahunAngkatan && <p className="text-text-light text-sm">{m.tahunAngkatan}</p>}
                {/* Sosmed dari BE */}
                <div className="flex justify-center gap-3 mt-3">
                  {m.instagram && (
                    <a href={m.instagram} target="_blank" rel="noreferrer" title="Instagram" className="text-text-light hover:text-primary transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                    </a>
                  )}
                  {m.linkedIn && (
                    <a href={m.linkedIn} target="_blank" rel="noreferrer" title="LinkedIn" className="text-text-light hover:text-primary transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
            {active.data.length === 0 && members && (
              <p className="col-span-4 text-center text-text-secondary py-10">
                Belum ada data asisten {active.label.toLowerCase()}.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
