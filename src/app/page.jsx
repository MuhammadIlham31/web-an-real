"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExploreCarousel from "@/components/ExploreCarousel";
import { apiFetch, ApiError } from "@/lib/api";
import AxolotlHero from "@/components/AxolotlHero";

const researchAreas = [
  { no: "01", title: "5G Core", meta: "Core Network / 5G", image: "/assets/research-photo-1.jpg", visual: "core-visual" },
  { no: "02", title: "Open RAN", meta: "Radio Access Network", image: "/assets/research-photo-2.jpg", visual: "ran-visual" },
  { no: "03", title: "5G Cloud", meta: "Cloud Infrastructure", image: "/assets/research-5gcloud.jpg", visual: "cloud-visual" },
  { no: "04", title: "SDN / IoT", meta: "Intelligent Network", image: "/assets/research-sdn-iot.jpg", visual: "iot-visual" },
];

const projects = [
  { no: "01", title: "5G Cloud", meta: "Cloud-native / OpenAirInterface / K3s", image: "/assets/research-5gcloud.jpg" },
  { no: "02", title: "5G C-V2X", meta: "Vehicle Networks / Trace-driven Simulation", image: "/assets/research-cv2x.jpg" },
];

const practicumModules = [
  { no: "01", title: "Komunikasi Data & Media Transmisi", overview: "Memahami jaringan, model OSI, IPv4/IPv6, subnetting, dan media transmisi melalui praktik membuat kabel straight dan crossover.", image: "/assets/modules/module-1.webp", alt: "Praktik crimping dan pengujian kabel UTP" },
  { no: "02", title: "Routing Statis & Dinamis", overview: "Merancang pengalamatan VLSM dan mengonfigurasi static routing, RIPv2, serta OSPF pada topologi PNETLab hingga konektivitas teruji.", image: "/assets/modules/module-2.webp", alt: "Konfigurasi IP, router, dan pengujian ping" },
  { no: "03", title: "Linux & Layanan Transport", overview: "Mengoperasikan Linux, permission, SSH, SFTP, dan Apache2 pada virtual machine sampai web server dapat diakses dari browser.", image: "/assets/modules/module-3.webp", alt: "Terminal Linux dan web server di virtual machine" },
  { no: "04", title: "SDN & Analisis QoS", overview: "Membangun topologi SDN dengan Mininet dan RYU, lalu mengukur throughput, delay, jitter, dan packet loss memakai Iperf3 serta Wireshark.", image: "/assets/modules/module-4.webp", alt: "Topologi SDN dan pengujian konektivitas Mininet" },
];

const events = [
  { no: "01", title: "NetSchool", meta: "Networking / Linux Fundamentals", desc: "Study group untuk membangun dasar network computer dan server administration.", image: "/assets/activity-netschool.jpg", href: "/netschool" },
  { no: "02", title: "NetDevelopment", meta: "Research Assistant Selection", desc: "Program lanjutan untuk mengembangkan skill calon asisten melalui riset.", image: "/assets/activity-netdev.jpg", href: "/activity" },
  { no: "03", title: "NetShow", meta: "Research Seminar", desc: "Seminar untuk berbagi informasi tentang topik riset yang sedang dikerjakan.", image: "/assets/activity-netshow.jpg", href: "/activity" },
  { no: "04", title: "NetTraining", meta: "Public Training", desc: "Pelatihan teknologi jaringan untuk peserta dari berbagai latar belakang.", image: "/assets/activity-netnongkrong.jpg", href: "/activity" },
  { no: "05", title: "NetClass", meta: "Assistant Sharing", desc: "Sesi sharing santai bersama asisten dengan topik yang bebas dipilih.", image: "/assets/activity-netclass.jpg", href: "/activity" },
];

const faqStatic = [
  { q: "Apa saja program yang tersedia di Adaptive?", a: "Workshop, NetTraining, NetClass, dan program riset di bidang jaringan komputer." },
  { q: "Bagaimana cara mendaftar kegiatan?", a: "Pendaftaran dilakukan melalui website atau menghubungi contact person laboratorium." },
  { q: "Dimana lokasi laboratorium?", a: "Gedung TULT Ruang 13.13, Telkom University Bandung." },
];

const technologyLogos = [
  ["Kubernetes", "/assets/logo-kubernetes.png"],
  ["Istio", "/assets/logo-istio.png"],
  ["Cilium", "/assets/logo-cilium.png"],
  ["Open5GS", "/assets/logo-open5gs.png"],
  ["OpenAirInterface", "/assets/logo-openairinterface.png"],
  ["Proxmox", "/assets/logo-proxmox.png"],
];

function Marquee() {
  return <div className="marquee" aria-label="Technology partners"><div className="marquee-track">{[...technologyLogos, ...technologyLogos].map(([name, logo], index) => <span className="marquee-logo" aria-hidden={index >= technologyLogos.length} key={`${name}-${index}`}><img src={logo} alt={index < technologyLogos.length ? name : ""} /></span>)}</div></div>;
}

export default function HomePage() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [profilePreview, setProfilePreview] = useState(false);
  const eventsCarouselRef = useRef(null);
  const [activeMentor, setActiveMentor] = useState(0);

  const moveCarousel = (ref, direction) => {
    ref.current?.scrollBy({ left: direction * ref.current.clientWidth * 0.72, behavior: "smooth" });
  };

  const mentors = [
    { role: "Academic Advisor", name: <>Dr. Sofia<br />Naning Hertiana</>, degree: "S.T., M.T.", image: "/assets/avatar-sofi.png", quote: "“This laboratory is a space for students to adapt to the field of computer networks, from practicums to research that makes a real contribution.”" },
    { role: "Role Direction", name: <>Dr. Ridha<br />Muldina Negara</>, degree: "S.T., M.T.", image: "/assets/ridha-transparent.png", quote: "“Learn the basics, break the limits, and build something awesome.”" },
    { role: "Pembina", name: <>Naufal Hanan<br />Lutfianto</>, degree: "S.T., M.T.", image: "/assets/naufal-transparent.png", quote: "“Each experiment provides lessons, even when the results do not meet expectations.”" },
  ];

  const changeMentor = (direction) => setActiveMentor((current) => (current + direction + mentors.length) % mentors.length);

  useEffect(() => {
    let alive = true;
    apiFetch("/v1/landing-page/homepage")
      .then((response) => alive && setData(response.data))
      .catch((error) => alive && setErr(error instanceof ApiError ? `${error.status}` : "Backend offline"));
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveMentor((current) => (current + 1) % 3), 5000);
    return () => clearInterval(interval);
  }, []);

  const faqItems = data?.faq?.length ? data.faq.map((item) => ({ q: item.judul, a: item.isi })) : faqStatic;

  return (
    <div className="landing-page min-h-screen bg-white text-[#0D47A1]">
      <Header />
      <main>
        <section className="lab-hero relative flex min-h-svh items-center overflow-hidden bg-white px-6 pb-10 pt-28 text-[#0D47A1] md:px-12 md:pb-14">
          <AxolotlHero />
          <div className="relative z-10 mx-auto grid w-full max-w-[1600px] items-end gap-8 px-6 md:px-12">
            <div>
              <p className="editorial-label mb-5 text-[#0D47A1]">Adaptive Network Laboratory / Telkom University</p>
              <h1 className="max-w-[12ch] font-display text-[clamp(3.2rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.09em]">Adaptive<br />Network<br /><span className="text-[#2196F3]">Laboratory</span></h1>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-[#0D47A1]/75 md:text-base">Laboratorium di bawah Prodi S1 Teknik Telekomunikasi Telkom University yang berfokus pada eksplorasi core network, riset, dan pengembangan keterampilan mahasiswa di bidang jaringan komputer dan komunikasi data.</p>
            </div>
          </div>
          <div className="hero-utility absolute inset-x-6 top-[60%] z-10 flex justify-between pt-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#0D47A1]/70 md:inset-x-12 md:top-[60%]"><span>Research / Learning / Network</span><span>Scroll to explore ↓</span></div>
        </section>

        <ExploreCarousel />

        <section className="pembina-section bg-white px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1600px]"><div className="pembina-heading"><h2 className="font-display text-[clamp(3rem,7vw,7rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.1em] text-[#0D47A1]">Guidance<br /><span className="text-[#2196F3]">for research.</span></h2><span className="pembina-counter">{String(activeMentor + 1).padStart(2, "0")} / {String(mentors.length).padStart(2, "0")}</span></div><article key={activeMentor} className="pembina-full-frame"><img className="pembina-abstract" src="/assets/pembina-abstract.png" alt="" aria-hidden="true" /><img className={`pembina-photo pembina-photo-${activeMentor}`} src={mentors[activeMentor].image} alt={mentors[activeMentor].role} /><div className="pembina-copy"><span>0{activeMentor + 1} / {mentors[activeMentor].role}</span><h3>{mentors[activeMentor].name}</h3><p>{mentors[activeMentor].degree}</p><blockquote>{mentors[activeMentor].quote}</blockquote></div><div className="pembina-arrows"><button type="button" aria-label="Previous mentor" onClick={() => changeMentor(-1)}>←</button><button type="button" aria-label="Next mentor" onClick={() => changeMentor(1)}>→</button></div></article></div>
        </section>

        <section className="profile-case-study editorial-section bg-white px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-10 md:mb-14"><p className="editorial-label text-[#2196F3]">01 / Profile</p><h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3rem,7vw,7rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.1em] text-[#0D47A1]">Laboratory<br /><span className="text-[#2196F3]">profile.</span></h2><p className="mt-6 max-w-xl text-sm leading-relaxed text-[#0D47A1]/70 md:text-base">Discover Adaptive Network Laboratory.</p></div>
            <div className="profile-frame">
              <a
                className="profile-media block"
                href="https://youtu.be/xbQWlYBBHWQ"
                target="_blank"
                rel="noreferrer"
                aria-label="Watch Adaptive Network Laboratory profile on YouTube"
                onMouseEnter={() => setProfilePreview(true)}
                onMouseLeave={() => setProfilePreview(false)}
              >
                {profilePreview ? (
                  <iframe
                    className="profile-video pointer-events-none"
                    src="https://www.youtube.com/embed/xbQWlYBBHWQ?autoplay=1&mute=1&controls=0&loop=1&playlist=xbQWlYBBHWQ&rel=0&playsinline=1"
                    title="Adaptive Network Laboratory profile preview"
                    allow="autoplay; encrypted-media"
                    aria-hidden="true"
                  />
                ) : (
                  <img className="profile-video object-cover" src="https://i.ytimg.com/vi/xbQWlYBBHWQ/maxresdefault.jpg" alt="Adaptive Network Laboratory profile video" />
                )}
              </a>
            </div>
          </div>
        </section>

        <Marquee />

        <section className="editorial-section research-showcase bg-white px-6 py-28 md:px-12 md:py-40">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-14 flex items-end justify-between">
              <div><p className="editorial-label text-[#0D47A1]">02 / Research</p><h2 className="mt-5 max-w-[9ch] font-display text-[clamp(3.5rem,8vw,8rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.1em]">Selected<br /><span className="text-[#2196F3]">research.</span></h2></div>
              <Link href="/research" className="editorial-link hidden items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] md:inline-flex">View all <ArrowUpRight size={18} /></Link>
            </div>
            <div className="research-project-grid">
              {researchAreas.map((item) => <article key={item.no} className="research-project">
                <Link href="/research" className="group block">
                  <div className={`research-project-media ${item.visual}`}>
                    <img src={item.image} alt="" />
                    <span className="research-project-number">{item.no}</span>
                    <span className="research-project-view">View ↗</span>
                    <span className="visual-network" aria-hidden="true"><i /><i /><i /><i /><b /><b /><b /></span>
                  </div>
                  <div className="research-project-info"><div><h3>{item.title}</h3><p>{item.meta}</p></div><ArrowUpRight className="research-project-arrow" size={22} /></div>
                </Link>
              </article>)}
            </div>
          </div>
        </section>

        <section className="paper-section editorial-section research-showcase bg-white px-6 py-28 text-[#0D47A1] md:px-12 md:py-40"><div className="mx-auto max-w-[1600px]"><div className="mb-14 flex items-end justify-between"><div><p className="editorial-label text-[#0D47A1]">03 / Selected papers</p><h2 className="mt-5 max-w-[9ch] font-display text-[clamp(3.5rem,8vw,8rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.1em]">Selected<br /><span className="text-[#2196F3]">papers.</span></h2></div><Link href="/research" className="editorial-link hidden items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] md:inline-flex">Explore research <ArrowUpRight size={18} /></Link></div><div className="research-project-grid">{projects.map((project) => <article key={project.no} className="research-project"><Link href="/research" className="group block"><div className="research-project-media paper-visual"><img src={project.image} alt="" /><span className="research-project-number">{project.no}</span><span className="research-project-view">View ↗</span></div><div className="research-project-info"><div><h3>{project.title}</h3><p>{project.meta}</p></div><ArrowUpRight className="research-project-arrow" size={22} /></div></Link></article>)}</div></div></section>


        <section className="practicum-section bg-[#E3F2FD] px-6 py-20 text-[#0D47A1] md:px-12 md:py-28"><div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-end"><div><p className="editorial-label text-[#2196F3]">03 / Praktikum</p><h2 className="mt-5 max-w-[8ch] font-display text-[clamp(3rem,7vw,7rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.1em]">Learn<br /><span className="text-[#2196F3]">by doing.</span></h2></div><div><p className="max-w-2xl text-lg leading-relaxed text-[#0D47A1]/75 md:text-2xl">Praktikum menjadi ruang untuk memahami konsep jaringan secara langsung—mulai dari konfigurasi dasar, server, routing, hingga eksperimen teknologi jaringan modern.</p><Link href="/practicum" className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em] text-[#0D47A1]">Overview praktikum <ArrowUpRight size={18} /></Link></div></div><div className="research-project-grid mx-auto mt-14 max-w-[1600px]">{practicumModules.map((module) => <article key={module.no} className="research-project"><div className="research-project-media"><img src={module.image} alt={module.alt} /><span className="research-project-number">{module.no}</span></div><div className="research-project-info"><div><h3>{module.title}</h3><p>{module.overview}</p></div></div></article>)}</div></section>

        <section className="editorial-section bg-white px-6 py-28 md:px-12 md:py-40"><div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[0.7fr_1.3fr]"><div><p className="editorial-label text-[#2196F3]">05 / Questions</p><img src="/assets/logo.png" alt="Adaptive Network Laboratory" className="mt-10 h-auto w-40 md:mt-16 md:w-64" /></div><div><h2 className="mb-14 font-display text-[clamp(3rem,6vw,6rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.08em]">Let’s talk<br /><span className="text-[#0D47A1]">networks.</span></h2>{err && <p className="mb-4 text-sm text-[#0D47A1]">{err}; menampilkan FAQ statis.</p>}<div>{faqItems.map((item, index) => <div className="border-t border-border" key={item.q}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold"><span>{item.q}</span><ChevronDown className={`shrink-0 text-[#2196F3] transition-transform ${openFaq === index ? "rotate-180" : ""}`} /></button>{openFaq === index && <p className="max-w-2xl pb-6 leading-relaxed text-[#0D47A1]/60">{item.a}</p>}</div>)}</div><a href="mailto:adaptivelab@telkomuniversity.ac.id" className="editorial-link mt-12 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em]">Send an email <ArrowUpRight size={18} /></a></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
