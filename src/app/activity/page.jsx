import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ponytail: static per Figma (Backend=kegiatan-services); swap to apiFetch when backend ready
// aset foto dari Figma (public/assets/)
const featured = [
  {
    title: "NetSchool",
    desc: "NetSchool adalah kegiatan study group yang bertujuan agar peserta mempunyai dasar ilmu mengenai Network Computer dan Server Administration. Selain itu, NetSchool merupakan langkah awal dalam seleksi anggota baru Adaptive Network Laboratory.",
    href: "/netschool",
    image: "/assets/activity-netschool.jpg",
  },
  {
    title: "AdaptiveTraining",
    desc: "Adaptive Training merupakan program pelatihan dari Adaptive Network Laboratory yang dapat diikuti oleh masyarakat umum. Materi training yang tersedia adalah Networking, Linux, Docker, dan Kubernetes.",
    href: null, // ponytail: pendaftaran Adaptive Training belum dibuka — button Coming Soon
    image: "/assets/activity-netclass.jpg",
  },
];

const programs = [
  { title: "NetClass", desc: "NetClass adalah sesi sharing santai bersama asisten, mereka bebas memilih topik yang mereka suka untuk dibagikan ke asisten lain.", image: "/assets/activity-netclass.jpg" },
  { title: "NetDev", desc: "Program lanjutan dari NetSchool, bertujuan untuk mengembangkan skill calon asisten agar nantinya dapat melakukan kegiatan riset dengan baik.", image: "/assets/activity-netdev.jpg" },
  { title: "NetShow", desc: "Seminar yang ditujukan untuk khalayak umum, bertujuan untuk berbagi informasi tentang topik riset yang sedang dikerjakan oleh asisten.", image: "/assets/activity-netshow.jpg" },
  { title: "NetNongkrong", desc: "Acara internal yang diadakan agar asisten mengenal lebih dekat antara satu dengan yang lain. Kegiatan ini bisa berupa olahraga bareng, nonton bareng, atau makan-makan.", image: "/assets/activity-netnongkrong.jpg" },
];

export default function ActivityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="light" />
      <main className="flex-1">
        {/* Hero */}
        <section className="page-hero bg-navy text-[#E3F2FD] px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Program</h1>
            <p className="text-netschool-light text-lg leading-relaxed max-w-3xl">
              Selain melakukan kegiatan riset, Adaptive Network Laboratory juga mengadakan
              seminar, study group, dan beberapa kegiatan internal lainnya.
            </p>
          </div>
        </section>

        {/* Featured programs */}
        <section className="bg-[#E3F2FD] py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto space-y-12">
            {featured.map((f, i) => (
              <div key={f.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <img src={f.image} alt={f.title} className="image-reveal w-full h-64 md:h-80 object-cover rounded-2xl" />
                <div className="border-l-4 border-primary pl-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">Program</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 mt-1">{f.title}</h2>
                  <p className="text-text-secondary leading-relaxed mb-5">{f.desc}</p>
                  {f.href ? (
                    <Link href={f.href} className="inline-block bg-primary hover:bg-primary-dark text-[#E3F2FD] font-medium py-2.5 px-7 rounded-full transition-colors text-sm">
                      Cek di sini
                    </Link>
                  ) : (
                    <span className="inline-block bg-gray-300 text-[#0D47A1] font-medium py-2.5 px-7 rounded-full text-sm cursor-not-allowed select-none">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other programs — sesuai Figma: card dengan foto background + overlay */}
        <section className="bg-surface py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-10">Program Lainnya</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {programs.map((p) => (
                <div key={p.title} className="relative rounded-2xl overflow-hidden min-h-[240px] flex flex-col justify-end">
                  <img src={p.image} alt={p.title} className="image-reveal absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D47A1]/80 via-black/30 to-transparent" />
                  <div className="relative p-6 text-[#E3F2FD]">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary-light">Program</span>
                    <h3 className="text-2xl font-bold mb-1">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-200">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
