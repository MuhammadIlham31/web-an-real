"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const benefits = [
  { icon: "📘", text: "Peserta Netschool akan mendapatkan pengetahuan tentang jaringan dari dasar hingga menengah." },
  { icon: "🛠️", text: "Peserta NetSchool tidak hanya belajar teori, tetapi juga belajar praktik, langsung dibimbing oleh asisten lab berkompeten di bidangnya." },
  { icon: "🏅", text: "Peserta yang lulus akan mendapat E-sertifikat yang bisa digunakan untuk klaim TAK." },
  { icon: "🌐", text: "NetShool mencangkup 4 fakultas di Telkom University, sehingga peserta NetSchool mendapatkan koneksi dari keempat fakultas tersebut." },
  { icon: "🚀", text: "Peserta Netschool berpeluang untuk menjadi anggota laboratorium Adaptive Network." },
];

const requirements = [
  "Peserta merupakan mahasiswa/i aktif Telkom University Bandung",
  "Peserta merupakan mahasiswa/i angkatan 2024, 2025 & 2026",
  "Peserta berasal dari segala jurusan yang ada di Fakultas Teknik Elektro (FTE), Fakultas Rekayasa Industri (FRI), Fakultas Informatika (FIF) dan Fakultas Ilmu Terapan (FIT) Telkom University",
  "Peserta bersedia dan wajib mengikuti seluruh rangkaian acara, prosedur, dan ketentuan NetSchool 2026",
  "Peserta memiliki motivasi yang tinggi dalam mempelajari hal baru",
  "NetSchool 2026 diadakan secara Offline",
  "Deadline pendaftaran NetSchool 2026 adalah tanggal 26 Oktober 2026",
];

const timeline = [
  { num: 1, title: "Registrasi", date: "14 - 26 Oktober 2026" },
  { num: 2, title: "Pendaftaran Ditutup", date: "26 Oktober 2026" },
  { num: 3, title: "Pengumuman", date: "-" },
  { num: 4, title: "Pelaksanaan", date: "17 Nov - 20 Desember 2026" },
];

const faqs = [
  { q: "Kamu penasaran tentang NetSchool 2026?", a: "Aku di sini siap menjawab semua pertanyaan kamu seputar NetSchool. Kalau ada yang ingin ditanyakan, jangan ragu untuk hubungi aku, ya!" },
  { q: "Bagaimana seleksi untuk jadi asisten?", a: "Seleksi dilakukan melalui tes tertulis dan wawancara yang dijadwalkan setelah masa registrasi ditutup." },
  { q: "Gimana cara daftar Netschool?", a: "Pendaftaran dilakukan melalui tombol 'Daftar di sini'. Pastikan kamu memenuhi syarat yang telah ditentukan." },
  { q: "Kapan dilaksanakan Netdev?", a: "Netdev akan dilaksanakan setelah rangkaian NetSchool selesai, biasanya pada bulan Desember." },
];

export default function NetSchoolPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState({});

  useEffect(() => {
    const cards = document.querySelectorAll(".timeline-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);

          if (entry.isIntersecting) {
            setVisibleCards((prev) => ({ ...prev, [index]: false }));
            requestAnimationFrame(() => {
              setVisibleCards((prev) => ({ ...prev, [index]: true }));
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="light" />

      <main className="flex-1">
        {/* Hero */}
        <section className="netschool-section page-hero bg-navy text-[#E3F2FD] px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-light text-sm font-medium mb-3">Adaptive Network Laboratory Present</p>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight whitespace-pre-line">NetSchool{"\n"}2026</h1>
            </div>
            <div className="flex justify-center">
              <svg width="280" height="280" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="50" width="120" height="100" fill="#16263f" stroke="#2196F3" strokeWidth="2" />
                <rect x="50" y="60" width="40" height="30" fill="#0D47A1" />
                <rect x="100" y="60" width="50" height="30" fill="#0D47A1" />
                <rect x="50" y="100" width="30" height="20" fill="#2196F3" opacity="0.3" />
                <rect x="90" y="100" width="30" height="20" fill="#2196F3" opacity="0.3" />
                <rect x="130" y="100" width="20" height="20" fill="#2196F3" opacity="0.3" />
                <rect x="50" y="130" width="100" height="8" fill="#d1d6df" opacity="0.5" />
                <circle cx="100" cy="160" r="10" fill="#2196F3" opacity="0.2" />
                <circle cx="100" cy="160" r="5" fill="#2196F3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Apa itu NetSchool? */}
        <section className="netschool-section bg-[#E3F2FD] py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Apa itu NetSchool?</h2>
            <p className="text-text-primary leading-relaxed text-xl md:text-2xl font-medium">
              NetSchool merupakan acara Study group yang di selenggarakan oleh Laboratorium Adaptive
              Network, Fakultas Teknik Elektro, Universitas Telkom untuk melatih mahasiswa/i aktif
              Telkom University agar mempunyai dasar ilmu yang terkait dengan Network Computer dari
              dasar sampai menengah, serta mencari talenta terbaik untuk direkrut sebagai anggota
              baru Adaptive Network Laboratory.
            </p>
          </div>
        </section>

        {/* Apa yang didapat */}
        <section className="netschool-section bg-navy py-16 px-6 md:px-12 text-[#E3F2FD]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-light mb-12">Apa yang didapat dari Netschool?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="bg-navy-light/60 rounded-2xl p-8 border border-[#E3F2FD]/10">
                  <span className="text-4xl mb-4 block">{b.icon}</span>
                  <p className="text-lg leading-relaxed text-netschool-light font-medium">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Syarat dan Ketentuan */}
        <section className="netschool-section bg-surface py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-10 text-center">Syarat dan Ketentuan</h2>
            <ol className="space-y-5">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-primary text-[#E3F2FD] rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-lg text-text-primary font-medium">{req}</span>
                </li>
              ))}
            </ol>
            <div className="text-center mt-10">
              {/* ponytail: pendaftaran NetSchool belum dibuka — button Coming Soon */}
              <span className="inline-block bg-gray-300 text-[#0D47A1] font-semibold py-3 px-12 rounded-full text-lg cursor-not-allowed select-none">
                Coming Soon
              </span>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="netschool-section py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-12 text-center">Timeline NetSchool 2026</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map((item, index) => {
                const isVisible = Boolean(visibleCards[index]);

                return (
                  <div
                    key={item.num}
                    data-index={index}
                    className={`timeline-card bg-navy text-[#E3F2FD] rounded-2xl p-6 relative transition-all duration-[420ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <span className="text-5xl font-bold text-[#E3F2FD]/10 absolute top-3 right-4">{item.num}</span>
                    <h3 className="font-bold text-lg mb-1 mt-2">{item.title}</h3>
                    <p className="text-[#0D47A1] text-sm">{item.date}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Galeri — 3 foto kegiatan NetSchool */}
        <section className="netschool-section bg-surface py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-10 text-center">Galeri NetSchool</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "/assets/netschool-gallery-1.jpg",
                "/assets/netschool-gallery-2.jpg",
                "/assets/netschool-gallery-3.jpg",
                "/assets/netschool-gallery-4.jpg",
                "/assets/netschool-gallery-5.jpg",
                "/assets/netschool-gallery-6.jpg",
                "/assets/netschool-gallery-7.jpg",
                "/assets/netschool-gallery-8.jpg",
              ].map((src, i) => (
                <img key={src} src={src} alt={`Kegiatan NetSchool ${i + 1}`} className="aspect-[4/3] w-full rounded-lg bg-[#E3F2FD] object-contain p-2" />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="netschool-section bg-[#E3F2FD] py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-surface rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left font-medium text-text-primary hover:bg-[#E3F2FD] transition-colors"
                  >
                    {faq.q}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`}>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-text-secondary text-sm leading-relaxed border-t border-border pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Card */}
            <div className="bg-navy rounded-2xl p-8 text-[#E3F2FD] flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold mb-2">Ada pertanyaan?</h3>
              <p className="text-gray-300 text-sm mb-6">Kirimkan pertanyaanmu lewat email</p>
              <a
                href="mailto:adaptivelab@telkomuniversity.ac.id"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-netschool-light font-semibold py-3 px-8 rounded-full transition-colors text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Kirim email
              </a>
            </div>
          </div>
        </section>

        {/* Media Partner — 25 logo lab & komunitas */}
        <section className="netschool-section py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-sm font-semibold text-text-secondary mb-8">Media Partner</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "ipv", "aicoms", "rf", "optical", "gdg", "apt", "cci", "tesla",
                "csl", "hmt", "electronics", "sisgrid", "forensics", "mobile", "sea",
                "spiis", "cps", "eir", "dsp", "iss", "biospin", "mbc", "girlsforce",
                "dasartransmisi", "sre",
              ].map((name) => (
                <img
                  key={name}
                  src={`/assets/partners/partner-${name}.png`}
                  alt={`Media partner ${name}`}
                  title={name}
                  className="w-24 h-24 object-contain bg-[#E3F2FD] rounded-lg border border-border p-2 hover:shadow-md transition-shadow"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
