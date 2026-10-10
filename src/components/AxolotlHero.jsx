"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AxolotlHero() {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const image = imageRef.current;
    if (!wrapper || !image) return undefined;

    const intro = gsap.fromTo(wrapper, { autoAlpha: 0, scale: 0.86, y: 28 }, {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 1.1,
      delay: 0.2,
      ease: "power3.out",
    });
    const float = gsap.to(image, {
      y: -14,
      rotation: 2,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      intro.kill();
      float.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="axolotl-hero" aria-hidden="true">
      <div className="axolotl-glow" />
      <Image
        ref={imageRef}
        src="/assets/axl.png"
        alt=""
        width={1175}
        height={909}
        priority
        className="axolotl-image"
      />
    </div>
  );
}
