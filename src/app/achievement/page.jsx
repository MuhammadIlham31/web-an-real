"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiFetch, ApiError } from "@/lib/api";

// ponytail: backend prestasi shape has no imageUrl yet — pakai foto dari aset Figma sampai upstream nambahin.
const placeholder = "/assets/activity-netschool.jpg";

const ALL = "all";

function groupByYear(items) {
  return items.reduce((acc, item) => {
    const y = String(item.tahun ?? item.year);
    (acc[y] ??= []).push(item);
    return acc;
  }, {});
}

function AchievementPageInner() {
  const [grouped, setGrouped] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    apiFetch("/v1/landing-page/about-page")
      .then((r) => {
        if (!alive) return;
        const prestasi = r.data.prestasi;
        setGrouped(Array.isArray(prestasi) ? groupByYear(prestasi) : prestasi);
      })
      .catch((e) => alive && setErr(e instanceof ApiError ? `${e.status} — lihat .env.local` : "Gagal ambil data"))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  const years = grouped ? Object.keys(grouped).sort((a, b) => Number(b) - Number(a)) : [];
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeYear, setActiveYear] = useState(null);
  const [cardIdx, setCardIdx] = useState(0);

  // derived: prioritas activeYear → URL ?year= → tahun terbaru
  const urlYear = searchParams.get("year");
  const urlValid = urlYear && (urlYear === ALL || years.includes(urlYear));
  const currentYear = activeYear ?? (urlValid ? urlYear : null) ?? years[0] ?? null;

  const selectYear = (y) => {
    setActiveYear(y);
    setCardIdx(0);
    router.replace(`/achievement?year=${y}`, { scroll: false });
  };

  const yearItems =
    currentYear === ALL && grouped
      ? Object.values(grouped).flat()
      : currentYear && grouped
        ? grouped[currentYear] ?? []
        : [];
  const currentCard = yearItems[cardIdx] ?? null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="light" />

      <main className="flex-1">
        {/* Hero */}
        <section className="page-hero px-6 py-16 text-center text-[#E3F2FD] md:px-12 md:py-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="page-title-compact mx-auto text-4xl font-bold text-[#E3F2FD] md:text-6xl">Achievement</h1>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-[#E3F2FD]/65">
            Apresiasi kepada asisten atas usahanya yang luar biasa.
          </p>
        </section>

        {/* Timeline */}
        {loading && <p className="text-center text-text-secondary pb-16">Memuat data…</p>}
        {err && (
          <p className="text-center text-red-500 text-sm pb-16">
            {err}. Pastikan backend <code>/v1/landing-page/about-page</code> jalan &amp; <code>NEXT_PUBLIC_API_KEY</code> benar.
          </p>
        )}
        {grouped && years.length === 0 && !err && (
          <p className="text-center text-text-secondary pb-16">Belum ada data prestasi.</p>
        )}

        {years.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
            {/* Desktop timeline */}
            <div className="relative flex items-center justify-between overflow-x-auto gap-4 pb-2">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -translate-y-1/2 hidden sm:block" />
              {/* Semua Tahun */}
              <button
                onClick={() => selectYear(ALL)}
                className="relative z-10 flex flex-col items-center gap-2 shrink-0"
              >
                <span className={`text-sm font-medium transition-colors ${currentYear === ALL ? "text-text-primary font-bold text-base" : "text-text-light"}`}>
                  Semua
                </span>
                <div className={`rounded-full border-2 transition-all ${currentYear === ALL ? "bg-primary border-primary shadow-md w-5 h-5" : "bg-[#E3F2FD] border-border w-3 h-3"}`} />
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => selectYear(y)}
                  className="relative z-10 flex flex-col items-center gap-2 shrink-0"
                >
                  <span className={`text-sm font-medium transition-colors ${y === currentYear ? "text-text-primary font-bold text-base" : "text-text-light"}`}>
                    {y}
                  </span>
                  <div className={`rounded-full border-2 transition-all ${y === currentYear ? "bg-primary border-primary shadow-md w-5 h-5" : "bg-[#E3F2FD] border-border w-3 h-3"}`} />
                </button>
              ))}
            </div>
            {/* Mobile dropdown */}
            <select
              className="sm:hidden mt-4 w-full border border-border rounded-lg px-4 py-2 text-sm text-text-primary bg-[#E3F2FD]"
              value={currentYear ?? ""}
              onChange={(e) => selectYear(e.target.value)}
            >
              <option value={ALL}>Semua Tahun</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </section>
        )}

        {/* Carousel card */}
        {currentCard && (
          <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
            <div className="bg-[#E3F2FD] rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left - Content */}
                <div className="p-10 md:p-14 flex flex-col justify-center relative">
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#E3F2FD] hover:bg-[#90CAF9] rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
                    disabled={cardIdx === 0}
                    onClick={() => setCardIdx((i) => Math.max(0, i - 1))}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                  </button>

                  <div className="ml-6">
                    <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">
                      {currentCard.jenisPenghargaan ?? "Penghargaan"}
                    </h2>
                    <p className="text-text-secondary text-lg">
                      {currentCard.namaKompetisi ?? currentCard.judul ?? "—"}
                    </p>
                    {yearItems.length > 1 && (
                      <p className="text-xs text-text-light mt-4">
                        {cardIdx + 1} / {yearItems.length} prestasi{currentYear !== ALL ? ` tahun ${currentYear}` : ""}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right - Image */}
                <div className="relative h-[300px] md:h-auto">
                  <img
                    src={String(currentCard.imageUrl ?? placeholder)}
                    alt={currentCard.jenisPenghargaan ?? "achievement"}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#E3F2FD]/80 hover:bg-[#E3F2FD] rounded-full flex items-center justify-center shadow transition-colors disabled:opacity-30"
                    disabled={cardIdx >= yearItems.length - 1}
                    onClick={() => setCardIdx((i) => Math.min(yearItems.length - 1, i + 1))}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function AchievementPage() {
  return (
    <Suspense fallback={null}>
      <AchievementPageInner />
    </Suspense>
  );
}
