"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const programs = [
  { number: "01", slug: "netschool", title: "NETSCHOOL", category: "Education / Training", image: "/assets/activity-netschool.jpg", video: "/videos/netschool.mp4", href: "/netschool" },
  { number: "02", slug: "netdev", title: "NETDEV", category: "Development", image: "/assets/activity-netdev.jpg", video: "/videos/netdev.mp4", href: "/activity" },
  { number: "03", slug: "nettraining", title: "NETTRAINING", category: "Training", image: "/assets/activity-netnongkrong.jpg", video: "/videos/nettraining.mp4", href: "/activity" },
  { number: "04", slug: "netshow", title: "NETSHOW", category: "Showcase / Event", image: "/assets/activity-netshow.jpg", video: "/videos/netshow.mp4", href: "/activity" },
];

function ExploreCard({ program, videoAvailable, onVideo }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const stopVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setHovered(false);
  }, []);

  const startVideo = useCallback(() => {
    if (!videoAvailable || window.matchMedia("(hover: none)").matches) return;
    onVideo(videoRef.current);
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setHovered(true);
    video.play().catch(() => setHovered(false));
  }, [onVideo, videoAvailable]);

  useEffect(() => () => stopVideo(), [stopVideo]);

  return (
    <article className={`explore-card ${hovered ? "is-playing" : ""}`} onMouseEnter={startVideo} onMouseLeave={stopVideo}>
      <Link href={program.href} className="explore-card-link" aria-label={`Open ${program.title}`}>
        <img className="explore-card-cover" src={program.image} alt="" />
        {videoAvailable && <video ref={videoRef} className="explore-card-video" src={program.video} muted playsInline loop preload="metadata" aria-hidden="true" />}
        <span className="explore-card-shade" />
        <span className="explore-card-number">{program.number}</span>
        <div className="explore-card-info"><div><h3>{program.title}</h3><p>{program.category}</p></div><ArrowUpRight className="explore-card-arrow" size={22} /></div>
      </Link>
    </article>
  );
}

export default function ExploreCarousel() {
  const [viewportRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: false, containScroll: "trimSnaps", loop: false });
  const cardsRef = useRef([]);
  const [availableVideos, setAvailableVideos] = useState({});
  const [canScroll, setCanScroll] = useState({ previous: false, next: true });

  const syncControls = useCallback((api) => {
    if (!api) return;
    setCanScroll({ previous: api.canScrollPrev(), next: api.canScrollNext() });
  }, []);

  useEffect(() => {
    let alive = true;
    Promise.all(programs.map(async (program) => {
      try {
        const response = await fetch(program.video, { method: "HEAD" });
        return [program.slug, response.ok];
      } catch {
        return [program.slug, false];
      }
    })).then((results) => alive && setAvailableVideos(Object.fromEntries(results)) );
    return () => { alive = false; };
  }, []);

  const pauseAllVideos = useCallback(() => {
    cardsRef.current.forEach((video) => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    });
  }, []);

  const registerVideo = useCallback((video) => {
    cardsRef.current = cardsRef.current.filter(Boolean).filter((item) => item !== video);
    if (video) cardsRef.current.push(video);
    cardsRef.current.forEach((item) => {
      if (item !== video) {
        item.pause();
        item.currentTime = 0;
      }
    });
  }, []);

  const scrollPrevious = useCallback(() => { pauseAllVideos(); emblaApi?.scrollPrev(); }, [emblaApi, pauseAllVideos]);
  const scrollNext = useCallback(() => { pauseAllVideos(); emblaApi?.scrollNext(); }, [emblaApi, pauseAllVideos]);

  useEffect(() => {
    if (!emblaApi) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); scrollPrevious(); }
      if (event.key === "ArrowRight") { event.preventDefault(); scrollNext(); }
    };
    const handleScroll = () => pauseAllVideos();
    emblaApi.on("scroll", handleScroll);
    emblaApi.on("select", syncControls);
    emblaApi.on("reInit", syncControls);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      emblaApi.off("scroll", handleScroll);
      emblaApi.off("select", syncControls);
      emblaApi.off("reInit", syncControls);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [emblaApi, pauseAllVideos, scrollNext, scrollPrevious, syncControls]);

  return (
    <section className="events-showcase explore-showcase bg-white px-6 py-20 text-[#0D47A1] md:px-12 md:py-28">
      <div className="events-panel mx-auto max-w-[1600px]">
        <div className="events-heading mb-8 flex items-end justify-between gap-8"><h2 className="font-display text-[clamp(3rem,7vw,7rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.1em]">Explore<br /><span className="text-[#2196F3]">together.</span></h2><div className="events-controls"><span>Scroll events</span><button type="button" aria-label="Previous events" onClick={scrollPrevious} aria-disabled={!canScroll.previous}><ChevronLeft size={18} /></button><button type="button" aria-label="Next events" onClick={scrollNext} aria-disabled={!canScroll.next}><ChevronRight size={18} /></button><Link href="/activity" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#2196F3]">View all <ArrowUpRight size={16} /></Link></div></div>
        <div className="explore-viewport" ref={viewportRef} tabIndex={0} aria-label="Explore events carousel"><div className="explore-track">{programs.map((program) => <ExploreCard key={program.slug} program={program} videoAvailable={availableVideos[program.slug] === true} onVideo={registerVideo} />)}</div></div>
      </div>
    </section>
  );
}
