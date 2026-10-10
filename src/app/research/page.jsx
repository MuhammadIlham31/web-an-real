"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ponytail: static per Figma (Backend=kegiatan-services); swap to apiFetch when backend ready
// aset foto dari Figma (public/assets/)
const research = [
  {
    id: "cn",
    logo: "/assets/logo-cn.png",
    title: "5G Cloud",
    desc: "Penggunaan distribusi Kubernetes ringan seperti K3s semakin meningkat dalam penerapan cloud-native dan edge-oriented pada jaringan 5G. Penelitian ini secara eksperimental membandingkan Kubernetes Vanilla dan K3s untuk penerapan OpenAirInterface (OAI) 5G Core-RAN pada lingkungan mesin virtual single-node yang identik.",
    paper: "https://telkomuniversityofficial-my.sharepoint.com/:b:/g/personal/adaptivenetlab_365_telkomuniversity_ac_id/IQDQ30rfEBTERZ_ruN8LQMapAcUTKWPr1tO0AxpjaCatsO4?e=dT3FLS",
    github: "https://github.com/adaptive-network-laboratory",
    photos: ["/assets/research-5gcloud.jpg"],
  },
  {
    id: "ndn",
    logo: "/assets/logo-ndn.png",
    title: "5G C-V2X",
    desc: "Kemajuan pesat teknologi 5G telah mendorong perkembangan jaringan kendaraan, di mana komunikasi Vehicle-to-Vehicle (V2V) yang andal sangat penting bagi sistem transportasi cerdas. Penelitian ini mengevaluasi kinerja komunikasi Vehicle-to-Vehicle (V2V) berbasis Cellular Vehicle-to-Everything (C-V2X) menggunakan pendekatan simulasi berbasis trace (trace-driven simulation) pada lingkungan semi-tertutup.",
    paper: "https://journal.iistr.org/index.php/ESL/article/view/2268/1306",
    github: "https://github.com/adaptive-network-laboratory",
    photos: ["/assets/research-cv2x.jpg", "/assets/research-photo-1.jpg", "/assets/research-photo-2.jpg"],
  },
  {
    id: "ngsdn",
    logo: "/assets/logo-sdn.png",
    title: "SDN-IOT",
    desc: "Perkembangan menuju jaringan 6G serta peningkatan penggunaan Internet of Things (IoT) menuntut penerapan manajemen sumber daya yang adaptif guna mengatasi heterogenitas lalu lintas jaringan. Meskipun segmentasi jaringan multi-tenant dan arsitektur Software Defined Network (SDN) berbasis microservices dapat menyediakan pemisahan lalu lintas secara efektif, penerapan keduanya juga meningkatkan kompleksitas pengelolaan jaringan dan waktu tunggu antrean (queueing delay), serta berpotensi menyebabkan pelanggaran terhadap Service Level Agreement (SLA).",
    paper: "https://telkomuniversityofficial-my.sharepoint.com/:b:/g/personal/adaptivenetlab_365_telkomuniversity_ac_id/IQAYRGnldhXdSb7YnV10ExHPAWxXAt7EhTdpq9NDmeVQIU0?e=oOCdNo",
    github: "https://github.com/adaptive-network-laboratory",
    photos: ["/assets/research-sdn-iot.jpg"],
  },
];

function ResearchSection({ r }) {
  return (
    <section className="bg-[#E3F2FD] py-16 px-6 md:px-12 border-t border-border first:border-t-0">
      <div className="max-w-7xl mx-auto">
        {/* Logo topik */}
        <img src={r.logo} alt={`Logo ${r.title}`} width={80} height={80} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Foto statis (ponytail: carousel di-disable per request — arrow & dots dihapus) */}
          <div>
            <img
              src={r.photos[0]}
              alt={r.title}
              className="image-reveal w-full h-auto object-contain rounded-2xl border border-border bg-[#E3F2FD]"
            />
          </div>

          {/* Penjelasan */}
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{r.title}</h2>
            <p className="text-text-secondary leading-relaxed">{r.desc}</p>
          </div>
        </div>

        {/* Project and Paper */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-text-primary mb-1">Project and Paper</h3>
          <p className="text-text-secondary text-sm mb-5">Berikut dokumentasi hasil riset yang sudah dilakukan.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
            <a href={r.paper} target="_blank" rel="noreferrer" className="bg-surface rounded-2xl p-5 border border-border hover:border-primary transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
              </div>
              <h4 className="font-bold text-text-primary mb-1">Paper</h4>
              <p className="text-text-secondary text-sm mb-2">Dokumentasi hasil riset</p>
              <span className="text-primary text-sm font-medium">Baca di sini →</span>
            </a>
            <a href={r.github} target="_blank" rel="noreferrer" className="bg-surface rounded-2xl p-5 border border-border hover:border-primary transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#2196F3"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.77 1.05.77 2.13v3.16c0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" /></svg>
              </div>
              <h4 className="font-bold text-text-primary mb-1">GitHub</h4>
              <p className="text-text-secondary text-sm mb-2">Implementasi kode</p>
              <span className="text-primary text-sm font-medium">Cek GitHub →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="light" />
      <main className="flex-1">
        <section className="page-hero bg-navy text-[#E3F2FD] px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Research</h1>
            <p className="text-netschool-light text-lg leading-relaxed max-w-3xl">
              Adaptive Network Laboratory berfokus pada 3 topik riset: 5G Cloud,
              5G C-V2X, dan SDN-IOT.
            </p>
          </div>
        </section>
        {research.map((r) => <ResearchSection key={r.id} r={r} />)}
      </main>
      <Footer />
    </div>
  );
}
