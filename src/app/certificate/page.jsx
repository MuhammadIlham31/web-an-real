"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiFetch, ApiError } from "@/lib/api";

// ponytail: data dari AN-WEB-SERVICE-SERTIFIKAT-BE (GET /api/v1/sertifikat/query/search?nama=&idSertifikat=)
// response data[]: { uuid, nama, idSertifikat, acara, dateOfIssue, keterangan }
export default function CertificatePage() {
  const [nama, setNama] = useState("");
  const [idSertifikat, setIdSertifikat] = useState("");
  const [result, setResult] = useState(null); // array | "notfound"
  const [formErr, setFormErr] = useState(null);
  const [loading, setLoading] = useState(false);

  async function check(e) {
    e.preventDefault();
    setFormErr(null);
    setResult(null);
    if (!nama.trim() || !idSertifikat.trim()) {
      setFormErr("Nama dan ID Sertifikat wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      const r = await apiFetch(
        `/api/v1/sertifikat/query/search?nama=${encodeURIComponent(nama.trim())}&idSertifikat=${encodeURIComponent(idSertifikat.trim())}`,
        {},
        "sertifikat"
      );
      setResult(Array.isArray(r.data) && r.data.length > 0 ? r.data : "notfound");
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) setResult("notfound");
      else if (err instanceof ApiError && err.status === 400) setFormErr(err.body?.message ?? "Parameter tidak lengkap.");
      else setFormErr("Gagal mengambil data. Pastikan AN-WEB-SERVICE-SERTIFIKAT-BE jalan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="light" />
      <main className="flex-1">
        <section className="page-hero bg-navy text-[#E3F2FD] px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">E-Certificate</h1>
            <p className="text-netschool-light text-lg leading-relaxed">
              Cek sertifikat kegiatan laboratorium dengan memasukkan nama dan ID sertifikat kamu.
            </p>
          </div>
        </section>

        <section className="bg-[#E3F2FD] py-16 px-6 md:px-12">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={check} className="flex flex-col gap-3">
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama lengkap, contoh: Budi Suyo"
                aria-label="Nama"
                className="w-full rounded-full border border-border px-5 py-3 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={idSertifikat}
                  onChange={(e) => setIdSertifikat(e.target.value)}
                  placeholder="ID Sertifikat, contoh: NS-2024-001"
                  aria-label="ID Sertifikat"
                  className="flex-1 rounded-full border border-border px-5 py-3 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-[#E3F2FD] font-medium py-3 px-8 rounded-full transition-colors text-sm"
                >
                  {loading ? "Mencari..." : "Cek Sertifikat"}
                </button>
              </div>
            </form>

            {formErr && (
              <div className="mt-8 rounded-2xl bg-red-50 border border-red-200 p-5 text-sm text-red-600" role="alert">
                {formErr}
              </div>
            )}

            {result === "notfound" && (
              <div className="mt-8 rounded-2xl bg-red-50 border border-red-200 p-8 text-center" role="alert">
                <span className="text-4xl block mb-3">🔍</span>
                <h2 className="text-xl font-bold text-red-600 mb-2">Sertifikat tidak ditemukan</h2>
                <p className="text-text-secondary text-sm">
                  Kombinasi nama <strong>{nama}</strong> dan ID <strong>{idSertifikat}</strong> tidak terdaftar.
                  Pastikan ejaan nama sesuai sertifikat.
                </p>
              </div>
            )}

            {Array.isArray(result) && (
              <div className="mt-8 space-y-4" role="status">
                {result.map((c) => (
                  <div key={c.uuid} className="rounded-2xl border border-border overflow-hidden shadow-sm">
                    <div className="bg-navy text-[#E3F2FD] p-10 text-center">
                      <p className="text-primary-light text-sm font-medium mb-2">Sertifikat ditemukan</p>
                      <h2 className="text-3xl font-bold mb-1">{c.nama}</h2>
                      <p className="text-gray-300">telah mengikuti</p>
                      <p className="text-xl font-semibold text-primary-light mt-1">{c.acara}</p>
                      <p className="text-sm text-[#0D47A1] mt-4">
                        Diterbitkan: {c.dateOfIssue || "-"} · ID: {c.idSertifikat}
                      </p>
                      {c.keterangan && <p className="text-sm text-gray-300 mt-1">{c.keterangan}</p>}
                    </div>
                    <div className="p-6 flex justify-center bg-surface">
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-[#E3F2FD] font-medium py-2.5 px-7 rounded-full transition-colors text-sm"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
                        </svg>
                        Unduh / Print
                      </button>
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
