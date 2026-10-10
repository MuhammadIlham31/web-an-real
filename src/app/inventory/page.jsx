"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const flow = [
  "Pilih barang yang akan dipinjam",
  "Isi form yang tersedia",
  "Tunggu email konfirmasi",
  "Ambil barang di laboratorium",
  "Kembalikan barang sesuai jadwal",
];

const items = [
  { name: "TP-LINK", jenis: "Router", spec: "300 Mbps Wireless N", qty: 5, status: "Dipinjam" },
  { name: "TL-WA5210G", jenis: "Adaptor", spec: "2.4GHz High Power W", qty: 1, status: "Tersedia" },
  { name: "TL-WA5210G", jenis: "Adaptor", spec: "2.4GHz High Power W", qty: 1, status: "Available" },
  { name: "TL-WA5210G", jenis: "Adaptor", spec: "2.4GHz High Power W", qty: 1, status: "Available" },
];

const statusCls = (s) =>
  s === "Tersedia" || s === "Available"
    ? "bg-green-100 text-green-700"
    : "bg-amber-100 text-amber-700";

export default function InventoryPage() {
  const [q, setQ] = useState("");
  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(q.toLowerCase()) ||
      i.jenis.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="light" />

      <main className="flex-1">
        {/* Hero */}
        <section className="page-hero bg-navy text-[#E3F2FD] px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">Borrow Item</h1>
              <p className="text-netschool-light text-lg leading-relaxed mt-6 max-w-md">
                Adaptive Network Laboratory menyediakan barang yang bisa kamu pinjam untuk
                keperluan praktikum dan kegiatan laboratorium.
              </p>
            </div>
            <div className="flex justify-center">
              <svg width="260" height="260" viewBox="0 0 200 200" fill="none">
                <rect x="40" y="60" width="120" height="80" fill="#16263f" stroke="#2196F3" strokeWidth="2" />
                <rect x="55" y="75" width="40" height="30" fill="#0D47A1" />
                <circle cx="100" cy="100" r="14" fill="#2196F3" opacity="0.4" />
                <rect x="70" y="150" width="60" height="6" rx="3" fill="#64748b" opacity="0.5" />
              </svg>
            </div>
          </div>
        </section>

        {/* Alur Peminjaman */}
        <section className="bg-surface py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-12 text-center">Alur Peminjaman</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {flow.map((step, i) => (
                <div key={i} className="bg-[#E3F2FD] rounded-2xl p-6 border border-border text-center">
                  <span className="w-10 h-10 mx-auto mb-4 bg-primary text-[#E3F2FD] rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <p className="text-text-primary font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* List View */}
        <section className="bg-[#E3F2FD] py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary">List View</h2>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search Properties"
                className="w-full md:w-72 rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-navy text-[#E3F2FD]">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Gambar</th>
                    <th className="px-5 py-4 font-semibold">Nama Barang</th>
                    <th className="px-5 py-4 font-semibold">Jenis</th>
                    <th className="px-5 py-4 font-semibold">Spesifikasi</th>
                    <th className="px-5 py-4 font-semibold">Qty</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((it, i) => (
                    <tr key={i} className="border-t border-border hover:bg-surface">
                      <td className="px-5 py-4">
                        <div className="w-12 h-12 bg-navy-light/30 rounded-lg flex items-center justify-center text-xl">📦</div>
                      </td>
                      <td className="px-5 py-4 font-medium text-text-primary">{it.name}</td>
                      <td className="px-5 py-4 text-text-secondary">{it.jenis}</td>
                      <td className="px-5 py-4 text-text-secondary">{it.spec}</td>
                      <td className="px-5 py-4 text-text-secondary">{it.qty}</td>
                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusCls(it.status)}`}>
                          {it.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="px-5 py-8 text-center text-text-secondary">Tidak ada barang ditemukan.</td></tr>
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
