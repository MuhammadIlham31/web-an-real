"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiFetch, ApiError } from "@/lib/api";

// ponytail: data dari AN-WEB-SERVICE-CONTRIBUTOR-BE (GET /api/v1/contributor/query/)
// field BE: name, position[], imageUrl, description, instagram, linkedin, email, statusContributor
export default function ContributorPage() {
  const [contributors, setContributors] = useState(null);
  const [err, setErr] = useState(null);
  const [q, setQ] = useState("");
  const [pos, setPos] = useState("Semua posisi");

  useEffect(() => {
    let alive = true;
    apiFetch("/api/v1/contributor/query/", {}, "contributor")
      .then((r) => alive && setContributors(Array.isArray(r.data) ? r.data : []))
      .catch((e) =>
        alive && setErr(e instanceof ApiError ? `Backend error ${e.status}` : "Gagal mengambil data kontributor")
      );
    return () => { alive = false; };
  }, []);

  const positions = useMemo(
    () => ["Semua posisi", ...new Set((contributors ?? []).flatMap((c) => c.position ?? []))],
    [contributors]
  );

  const filtered = useMemo(
    () =>
      (contributors ?? []).filter(
        (c) =>
          (pos === "Semua posisi" || (c.position ?? []).includes(pos)) &&
          (c.name?.toLowerCase().includes(q.toLowerCase()) ||
            (c.position ?? []).some((p) => p.toLowerCase().includes(q.toLowerCase())))
      ),
    [contributors, q, pos]
  );

  const inputCls = "rounded-full border border-border bg-[#E3F2FD] px-5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors";

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="light" />
      <main className="flex-1">
        {/* Hero */}
        <section className="page-hero bg-navy text-[#E3F2FD] px-6 md:px-12 py-16 md:py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Say Hi to the amazing people behind it!</h1>
              <p className="text-netschool-light text-lg leading-relaxed">
                Tim kami terdiri dari beberapa asisten yang mempunyai bagiannya masing-masing.
              </p>
            </div>
            <div className="flex justify-center md:justify-end items-center">
              <div className="flex -space-x-4">
                {(contributors ?? []).slice(0, 5).map((c, i) => (
                  <img
                    key={c.uid ?? i}
                    src={c.imageUrl}
                    alt={c.name}
                    className="w-16 h-16 rounded-full border-4 border-navy object-cover relative"
                    style={{ zIndex: 5 - i }}
                  />
                ))}
                {(contributors?.length ?? 0) > 5 && (
                  <div className="w-16 h-16 rounded-full border-4 border-navy bg-primary flex items-center justify-center font-bold" style={{ zIndex: 0 }}>
                    {contributors.length - 5}+
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="bg-[#E3F2FD] py-16 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            {err && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-600">
                {err}. Pastikan AN-WEB-SERVICE-CONTRIBUTOR-BE jalan & <code>NEXT_PUBLIC_API_KEY</code> benar.
              </div>
            )}
            {contributors?.length === 0 && !err && (
              <p className="text-center text-text-secondary py-10">Belum ada data kontributor.</p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <select value={pos} onChange={(e) => setPos(e.target.value)} className={inputCls} aria-label="Filter posisi">
                {positions.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <div className="relative">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Mau cari siapa?"
                  className={`${inputCls} w-full sm:w-72 pr-10`}
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light">
                  <circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" />
                </svg>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-navy text-[#E3F2FD]">
                  <tr>
                    <th className="px-5 py-4 font-semibold w-14">#</th>
                    <th className="px-5 py-4 font-semibold">Kontributor</th>
                    <th className="px-5 py-4 font-semibold">Posisi</th>
                    <th className="px-5 py-4 font-semibold">Kontak</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c.uid ?? i} className="border-t border-border hover:bg-surface">
                      <td className="px-5 py-4 text-text-secondary">{i + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={c.imageUrl} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <span className="font-medium text-text-primary block">{c.name}</span>
                            <span className="text-xs text-text-light">{c.statusContributor}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {(c.position ?? []).map((p) => (
                            <span key={p} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{p}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          {c.instagram && (
                            <a href={c.instagram} target="_blank" rel="noreferrer" title="Instagram" className="text-text-secondary hover:text-primary transition-colors">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                            </a>
                          )}
                          {c.linkedin && (
                            <a href={c.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="text-text-secondary hover:text-primary transition-colors">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
                            </a>
                          )}
                          {c.email && (
                            <a href={`mailto:${c.email}`} title="Email" className="text-text-secondary hover:text-primary transition-colors">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && contributors && (
                    <tr><td colSpan={4} className="px-5 py-8 text-center text-text-secondary">Kontributor tidak ditemukan.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
