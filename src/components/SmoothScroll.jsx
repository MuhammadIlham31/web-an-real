"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });
    const animated = new WeakSet();
    const reveal = (element) => {
      if (animated.has(element)) return;
      animated.add(element);
      gsap.fromTo(element, { autoAlpha: 0, y: 28 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && reveal(entry.target)),
      { threshold: 0.08 },
    );
    document.querySelectorAll("main > section, main > .page-hero").forEach((section) => {
      if (section.matches(".about-page main > section:first-child")) return;
      gsap.set(section, { autoAlpha: 0, y: 28 });
      observer.observe(section);
    });

    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      observer.disconnect();
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
