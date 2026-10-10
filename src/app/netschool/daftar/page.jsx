"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiFetch, ApiError } from "@/lib/api";

const prodiOptions = ["S1 Teknik Komputer", "D3 Teknik Komputer"];

const initialForm = {
  nama: "",
  nim: "",
  prodi: "",
  angkatan: "",
  noHp: "",
  email: "",
  motivasi: "",
};

export default function DaftarNetSchoolPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitErr, setSubmitErr] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate() {
    const e = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi";
    if (!form.nim.trim()) e.nim = "NIM wajib diisi";
    else if (!/^\d{6,12}$/.test(form.nim.trim())) e.nim = "NIM harus 6–12 digit angka";
    if (!form.prodi) e.prodi = "Pilih program studi";
    if (!form.angkatan.trim()) e.angkatan = "Angkatan wajib diisi";
    else if (!/^\d{4}$/.test(form.angkatan.trim())) e.angkatan = "Format tahun, contoh: 2023";
    if (!form.noHp.trim()) e.noHp = "Nomor HP wajib diisi";
    else if (!/^(\+?62|0)8\d{8,12}$/.test(form.noHp.trim())) e.noHp = "Format nomor HP tidak valid";
    if (!form.email.trim()) e.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Format email tidak valid";
    if (!form.motivasi.trim()) e.motivasi = "Motivasi wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitErr(null);
    try {
      // TODO: ganti dengan endpoint pendaftaran NetSchool dari backend
      await apiFetch("/v1/netschool/daftar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setSubmitErr(
        err instanceof ApiError
          ? `Gagal mengirim (${err.status}). Endpoint backend belum tersedia.`
          : "Gagal mengirim data. Coba lagi."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls = "w-full rounded-xl border border-border px-4 py-3 text-sm text-text-primary bg-[#E3F2FD] focus:outline-none focus:border-primary transition-colors";
  const labelCls = "block text-sm font-medium text-text-primary mb-1.5";

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="light" />

      <main className="flex-1">
        <section className="max-w-2xl mx-auto px-6 md:px-12 py-16">
          <Link
            href="/netschool"
            className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
            Kembali ke NetSchool
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            Pendaftaran <span className="text-primary">NetSchool</span>
          </h1>
          <p className="text-text-secondary text-sm mb-8">
            Isi formulir di bawah dengan data yang lengkap.
          </p>

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-sm text-green-700">
              Pendaftaran berhasil terkirim! Pantau email/WhatsApp untuk info selanjutnya.
            </div>
          )}
          {submitErr && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-600">
              {submitErr}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelCls} htmlFor="nama">Nama Lengkap</label>
              <input id="nama" className={inputCls} value={form.nama} onChange={set("nama")} placeholder="Nama lengkap" />
              {errors.nama && <p className="text-xs text-red-500 mt-1">{errors.nama}</p>}
            </div>

            <div>
              <label className={labelCls} htmlFor="nim">NIM</label>
              <input id="nim" className={inputCls} value={form.nim} onChange={set("nim")} placeholder="Contoh: 2023xxxxxx" />
              {errors.nim && <p className="text-xs text-red-500 mt-1">{errors.nim}</p>}
            </div>

            <div>
              <label className={labelCls} htmlFor="prodi">Program Studi</label>
              <select id="prodi" className={inputCls} value={form.prodi} onChange={set("prodi")}>
                <option value="">Pilih program studi</option>
                {prodiOptions.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.prodi && <p className="text-xs text-red-500 mt-1">{errors.prodi}</p>}
            </div>

            <div>
              <label className={labelCls} htmlFor="angkatan">Angkatan</label>
              <input id="angkatan" className={inputCls} value={form.angkatan} onChange={set("angkatan")} placeholder="Contoh: 2023" />
              {errors.angkatan && <p className="text-xs text-red-500 mt-1">{errors.angkatan}</p>}
            </div>

            <div>
              <label className={labelCls} htmlFor="noHp">Nomor HP/WhatsApp</label>
              <input id="noHp" className={inputCls} value={form.noHp} onChange={set("noHp")} placeholder="Contoh: 081234567890" />
              {errors.noHp && <p className="text-xs text-red-500 mt-1">{errors.noHp}</p>}
            </div>

            <div>
              <label className={labelCls} htmlFor="email">Email</label>
              <input id="email" type="email" className={inputCls} value={form.email} onChange={set("email")} placeholder="email@example.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className={labelCls} htmlFor="motivasi">Motivasi / Alasan Mendaftar</label>
              <textarea id="motivasi" className={`${inputCls} min-h-[120px] resize-y`} value={form.motivasi} onChange={set("motivasi")} placeholder="Ceritakan motivasi kamu mengikuti NetSchool..." />
              {errors.motivasi && <p className="text-xs text-red-500 mt-1">{errors.motivasi}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-[#E3F2FD] font-medium py-3 px-8 rounded-full transition-colors text-sm"
            >
              {submitting ? "Mengirim..." : "Kirim Pendaftaran"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
