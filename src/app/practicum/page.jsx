"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ponytail: struktur dari nama frame Figma "Practicum-page (Tatib)/(Jadwal)/(Modul)" — 3 tab.
// Konten statis; swap ke backend saat ready.
const tabs = [
  {
    id: "tatib",
    label: "Tata Tertib",
    title: "Tata Tertib Praktikum",
    rules: [
      "Peserta wajib hadir 10 menit sebelum praktikum dimulai.",
      "Peserta yang terlambat lebih dari 15 menit tidak diperbolehkan mengikuti praktikum.",
      "Wajib membawa modul praktikum dan alat tulis.",
      "Dilarang membawa makanan atau minuman ke dalam laboratorium.",
      "Nilai praktikum terdiri dari pretest, posttest, dan modul.",
      "Ketidakhadiran tanpa keterangan dinyatakan gugur.",
    ],
  },
  {
    id: "jadwal",
    label: "Jadwal",
    title: "Jadwal Praktikum",
    sessions: [
      { hari: "Senin", waktu: "07.00 - 09.30", modul: "Jaringan Komputer" },
      { hari: "Senin", waktu: "13.00 - 15.30", modul: "Jaringan Komputer" },
      { hari: "Selasa", waktu: "07.00 - 09.30", modul: "Komunikasi Data" },
      { hari: "Rabu", waktu: "07.00 - 09.30", modul: "Komunikasi Data" },
      { hari: "Kamis", waktu: "13.00 - 15.30", modul: "Jaringan Komputer" },
    ],
  },
  {
    id: "modul",
    label: "Modul",
    title: "Modul Praktikum",
    moduls: [
      { no: 1, judul: "Pengenalan Cisco Packet Tracer" },
      { no: 2, judul: "Subnetting dan IP Address" },
      { no: 3, judul: "Routing Statis" },
      { no: 4, judul: "Routing Dinamis (OSPF)" },
      { no: 5, judul: "VLAN dan Trunking" },
      { no: 6, judul: "Network Address Translation (NAT)" },
    ],
  },
];

export default function PracticumPage() {
  const [active, setActive] = useState("tatib");
  const tab = tabs.find((t) => t.id === active);

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="light" />
      <main className="flex-1">
        <section className="page-hero bg-navy text-[#E3F2FD] px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Practicum</h1>
            <p className="text-netschool-light text-lg leading-relaxed max-w-3xl">
              Informasi praktikum mata kuliah Jaringan Komputer dan Komunikasi Data
              untuk mahasiswa Teknik Telekomunikasi.
            </p>
          </div>
        </section>

        <section className="bg-[#E3F2FD] py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-2 mb-10 border-b border-border" role="tablist">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active === t.id}
                  onClick={() => setActive(t.id)}
                  className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    active === t.id
                      ? "text-primary border-primary"
                      : "text-text-secondary border-transparent hover:text-text-primary"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-text-primary mb-6">{tab.title}</h2>

            {tab.rules && (
              <ul className="space-y-4">
                {tab.rules.map((r, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-7 h-7 bg-primary text-[#E3F2FD] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-text-primary leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            )}

            {tab.sessions && (
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-navy text-[#E3F2FD]">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Hari</th>
                      <th className="px-5 py-4 font-semibold">Waktu</th>
                      <th className="px-5 py-4 font-semibold">Modul</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tab.sessions.map((s, i) => (
                      <tr key={i} className="border-t border-border hover:bg-surface">
                        <td className="px-5 py-4 font-medium text-text-primary">{s.hari}</td>
                        <td className="px-5 py-4 text-text-secondary">{s.waktu}</td>
                        <td className="px-5 py-4 text-text-secondary">{s.modul}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab.moduls && (
              <div className="space-y-3">
                {tab.moduls.map((m) => (
                  <div key={m.no} className="flex items-center gap-4 bg-surface rounded-xl border border-border p-5">
                    <span className="w-10 h-10 bg-primary text-[#E3F2FD] rounded-full flex items-center justify-center font-bold shrink-0">{m.no}</span>
                    <div>
                      <h3 className="font-bold text-text-primary">Modul {m.no}</h3>
                      <p className="text-text-secondary text-sm">{m.judul}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
