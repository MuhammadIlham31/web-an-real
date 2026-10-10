"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Header({ className = "" }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);
      setHidden(currentScrollY > 80 && currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-3 top-3 z-[70] w-auto rounded-full border shadow-[0_12px_32px_rgb(13_71_161_/_0.08)] backdrop-blur-xl transition-[opacity,transform,background-color,color,box-shadow] duration-300 md:inset-x-6 lg:inset-x-10 ${hidden ? "-translate-y-[calc(100%+1rem)] opacity-0" : "translate-y-0 opacity-100"} ${
        scrolled
          ? "border-[#0D47A1]/15 bg-[#E3F2FD]/95 text-[#0D47A1] shadow-[0_16px_40px_rgb(13_71_161_/_0.12)]"
          : "border-[#0D47A1]/10 bg-white/80 text-[#0D47A1]"
        } ${className}`}
      >
      <div className="mx-auto flex w-full items-center justify-between px-5 py-3.5 md:px-10 lg:px-14">
        <Link href="/" aria-label="Adaptive Network Laboratory - beranda" className="group relative z-[60]">
          <Logo
            size={42}
            textColor="text-[#0D47A1]"
            className="[&_span]:font-display [&_span]:text-[0.72rem] [&_span]:uppercase [&_span]:tracking-[0.08em] [&_span]:transition-colors group-hover:[&_span]:text-primary md:[&_span]:text-sm"
          />
        </Link>

        <nav aria-label="Navigasi cepat" className={`hidden items-center gap-7 font-mono text-[0.62rem] uppercase tracking-[0.12em] lg:flex ${scrolled ? "text-[#0D47A1]/75" : "text-[#0D47A1]/80"}`}>
          <Link href="/about" className="nav-link-hover transition-colors hover:text-[#2196F3]">About</Link>
          <Link href="/research" className="nav-link-hover transition-colors hover:text-[#2196F3]">Research</Link>
          <Link href="/team" className="nav-link-hover transition-colors hover:text-[#2196F3]">Team</Link>
          <Link href="/activity" className="nav-link-hover transition-colors hover:text-[#2196F3]">Programs</Link>
          <Link href="/alumni" className="nav-link-hover transition-colors hover:text-[#2196F3]">Alumni</Link>
          <Link href="/certificate" className="nav-link-hover transition-colors hover:text-[#2196F3]">Certificate</Link>
          <Link href="/contributor" className="nav-link-hover transition-colors hover:text-[#2196F3]">Contributors</Link>
        </nav>

        <div className="relative z-[60] flex items-center gap-3">
          <span className={`hidden font-mono text-[0.6rem] tracking-[0.18em] xl:block ${scrolled ? "text-[#0D47A1]/70" : "text-[#0D47A1]/75"}`}>
            TELKOM UNIVERSITY / BANDUNG
          </span>
          <Link href="/research" className={`hidden border px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] transition-colors lg:inline-flex ${scrolled ? "border-[#0D47A1]/25 hover:border-[#2196F3] hover:text-[#2196F3]" : "border-[#0D47A1]/30 hover:border-[#2196F3] hover:text-[#2196F3]"}`}>
            Explore Research ↗
          </Link>
        </div>
      </div>

      </header>

    </>
  );
}
