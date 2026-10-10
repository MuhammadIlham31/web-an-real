import Link from "next/link";
import Logo from "./Logo";

const socials = [
  { name: "YouTube", url: "https://youtube.com/@adaptivenetworklab", icon: "/assets/youtube.png" },
  { name: "LinkedIn", url: "https://linkedin.com/company/adaptive-network-laboratory", icon: "/assets/linkedin.png" },
  { name: "Line", url: "https://line.me/R/ti/p/@adaptivenetworklab", icon: "/assets/line.png" },
  { name: "Instagram", url: "https://instagram.com/adaptivenetworklab", icon: "/assets/instagram.png" },
];

const events = [
  { label: "NetSchool — Coming Soon", href: "/netschool" },
];

const laboratory = [
  { label: "Profile Laboratory", href: "/about" },
  { label: "Member", href: "/contributor" },
  { label: "Research Activity", href: "/research" },
  { label: "Achievement", href: "/achievement" },
];

export default function Footer() {
  return (
    <footer className="bg-footer-bg px-6 pb-6 pt-12 text-[#E3F2FD] md:px-12 md:pt-16 xl:px-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 border-b border-[#E3F2FD]/20 pb-9 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={54} showText={false} />
              <span className="font-display text-2xl uppercase leading-[0.95] tracking-tight sm:text-3xl">
                Adaptive Network
                <br />
                Laboratory
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 sm:grid-cols-4 md:gap-10">
          <div className="col-span-2 sm:col-span-1">
            <h2 className="editorial-label mb-4">Location / Bandung</h2>
            <p className="max-w-[260px] text-sm leading-relaxed text-[#E3F2FD]/70">
              Telkom University Bandung, Gedung TULT Ruang 13.13
            </p>
          </div>

          <div>
            <h2 className="editorial-label mb-4">Let&apos;s Connect</h2>
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center border border-[#E3F2FD]/25 transition-colors hover:border-primary hover:bg-primary"
                >
                  <img className="brightness-0 invert" src={social.icon} alt="" width={22} height={22} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="editorial-label mb-4">Events</h2>
            <ul className="space-y-2.5 text-sm text-[#E3F2FD]/70">
              {events.map((event) => (
                <li key={event.label}>
                  <Link href={event.href} className="transition-colors hover:text-primary">
                    {event.label} <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="editorial-label mb-4">Laboratory</h2>
            <ul className="space-y-2.5 text-sm text-[#E3F2FD]/70">
              {laboratory.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-primary">
                    {item.label} <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-[#E3F2FD]/20 pt-4 font-mono text-[0.6rem] tracking-[0.12em] text-[#E3F2FD]/50 sm:flex-row">
          <span>© 2023 – {new Date().getFullYear()} ADAPTIVE NETWORK LABORATORY</span>
          <span>MADE AT TELKOM UNIVERSITY / INDONESIA</span>
        </div>
      </div>
    </footer>
  );
}
