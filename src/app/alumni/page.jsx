"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiFetch, ApiError } from "@/lib/api";

// ponytail: data dari AN-WEB-SERVICE-ALUMNI-BE (GET /api/v1/alumni/query/)
// field BE: nama, tahunAngkatan, judulTA, linkTA, profesiJabatan, profesiTempat, kesanPesan, imageUrl
export default function AlumniPage() {
  const [alumni, setAlumni] = useState(null);
  const [err, setErr] = useState(null);
  const [testiIdx, setTestiIdx] = useState(0);
  const [year, setYear] = useState("All Team");

  useEffect(() => {
    let alive = true;
    apiFetch("/api/v1/alumni/query/", {}, "alumni")
      .then((r) => alive && setAlumni(Array.isArray(r.data) ? r.data : []))
      .catch((e) =>
        alive && setErr(e instanceof ApiError ? `Backend error ${e.status}` : "Gagal mengambil data alumni")
      );
    return () => { alive = false; };
  }, []);

  const years = ["All Team", ...new Set((alumni ?? []).map((a) => a.tahunAngkatan).filter(Boolean))];
  const filtered = !alumni ? [] : year === "All Team" ? alumni : alumni.filter((a) => a.tahunAngkatan === year);

  // testimonial: alumni yang punya kesanPesan
  const testimonials = (alumni ?? []).filter((a) => a.kesanPesan);
  const t = testimonials[testiIdx % Math.max(testimonials.length, 1)];

  return (
    <div className="min-h-screen flex flex-col bg-[#E3F2FD]">
      <Header variant="light" />

      <main className="flex-1">
        {/* Testimonials */}
        <section className="page-hero px-6 py-16 text-[#E3F2FD] md:px-12 md:py-20">
          <h1 className="mx-auto mb-14 text-center text-4xl font-bold text-[#E3F2FD] md:text-6xl">
            Our Alumni Testimonials
          </h1>
          {err && (
            <p className="text-center text-red-500 text-sm mb-8">
              {err}. Pastikan AN-WEB-SERVICE-ALUMNI-BE jalan & <code>NEXT_PUBLIC_API_KEY</code> benar.
            </p>
          )}
          {t ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Quote */}
              <div className="relative md:pl-8">
                <span className="absolute left-0 top-0 text-5xl text-primary font-serif leading-none">“</span>
                <p className="pl-6 text-lg leading-relaxed text-justify text-[#E3F2FD]/80">
                  {t.kesanPesan}
                  <span className="text-3xl text-primary font-serif"> ”</span>
                </p>
                <div className="pl-6 mt-6">
                  <p className="text-primary text-xl font-semibold">{t.nama}</p>
                  <p className="text-[#E3F2FD]/55 text-lg">
                    {[t.profesiJabatan, t.profesiTempat].filter(Boolean).join(" — ") || "Alumni"}
                  </p>
                </div>
              </div>
              {/* Foto carousel */}
              <div className="flex items-center gap-6 justify-center">
                <button onClick={() => setTestiIdx((i) => (i - 1 + Math.max(testimonials.length, 1)) % Math.max(testimonials.length, 1))}
                  aria-label="Testimoni sebelumnya" disabled={testimonials.length === 0}
                  className="w-14 h-14 shrink-0 rounded-full bg-[#E3F2FD] hover:bg-[#90CAF9] disabled:opacity-40 flex items-center justify-center transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <img src={t.imageUrl || "/assets/alumni-testi-1.jpg"} alt={t.nama} className="h-80 w-56 object-cover grayscale md:h-96 md:w-64" />
                <button onClick={() => setTestiIdx((i) => (i + 1) % Math.max(testimonials.length, 1))}
                  aria-label="Testimoni berikutnya" disabled={testimonials.length === 0}
                  className="w-14 h-14 shrink-0 rounded-full bg-[#E3F2FD] hover:bg-[#90CAF9] disabled:opacity-40 flex items-center justify-center transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          ) : (
            !err && <p className="text-center text-[#E3F2FD]/60">Memuat testimoni…</p>
          )}
        </section>

        {/* Our Alumni */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
          <p className="text-primary text-2xl font-medium">Adaptive Network Lab.</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-10">Our Alumni</h2>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar filter tahun */}
            <div className="space-y-3">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`w-full rounded-lg py-3 text-lg font-medium transition-colors ${
                    year === y
                      ? "bg-navy text-[#E3F2FD]"
                      : "bg-[#E3F2FD] border border-gray-200 text-text-secondary hover:border-primary hover:text-primary"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Grid alumni */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((a) => (
                <div key={a.uid} className="bg-surface py-8 px-4 text-center">
                  <img src={a.imageUrl || "/assets/avatar-1.jpg"} alt={a.nama} className="w-32 h-32 rounded-full object-cover mx-auto" />
                  <h3 className="text-primary text-xl font-semibold mt-5">{a.nama}</h3>
                  <p className="text-text-secondary mt-1">{a.profesiJabatan || "Alumni"}</p>
                  {a.tahunAngkatan && <p className="text-text-light text-sm mt-1">{a.tahunAngkatan}</p>}
                </div>
              ))}
              {filtered.length === 0 && alumni && (
                <p className="col-span-3 text-center text-text-secondary py-10">Tidak ada alumni tahun ini.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
