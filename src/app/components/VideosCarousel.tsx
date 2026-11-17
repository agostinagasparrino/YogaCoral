"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const mediaItems = [
  { type: "image", src: "/images/carousel1.PNG" },
  { type: "video", src: "https://res.cloudinary.com/dax4fjnwx/video/upload/q_auto,f_mp4/v1778294575/carousel2_saietv.mp4" },
  { type: "image", src: "/images/carousel3.PNG" },
  { type: "video", src: "https://res.cloudinary.com/dax4fjnwx/video/upload/q_auto,f_mp4/v1778294529/carousel4_tfwruq.mp4" },
  { type: "image", src: "/images/carousel5.PNG" },
  { type: "video", src: "https://res.cloudinary.com/dax4fjnwx/video/upload/q_auto,f_mp4/v1778295390/carousel6_lepu76.mp4" },
];

const loopMedia = [...mediaItems, ...mediaItems, ...mediaItems];

const content = {
  es: {
    title: "Un poco de mi práctica",
    subtitle: "Momentos para mover, respirar y conectar.",
    swipe: "Deslizá para recorrer.",
    previous: "Ver momento anterior", next: "Ver siguiente momento",
    pause: "Pausar movimiento y videos", play: "Reanudar movimiento y videos",
    moment: "Momento de mi práctica de yoga", photo: "Fotografía", video: "Video",
    instructions: "Usá las flechas o deslizá para explorar las fotos y los videos.",
  },
  en: {
    title: "A glimpse of my practice",
    subtitle: "Moments to move, breathe and connect.",
    swipe: "Swipe to explore.",
    previous: "View previous moment", next: "View next moment",
    pause: "Pause movement and videos", play: "Resume movement and videos",
    moment: "A moment from my yoga practice", photo: "Photograph", video: "Video",
    instructions: "Use the arrows or swipe to explore the photos and videos.",
  },
};

export default function VideosCarousel({ lang = "en" }: { lang?: "es" | "en" }) {
  const t = content[lang];
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [manualBrowsing, setManualBrowsing] = useState(false);
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(section);
    let settleTimer: ReturnType<typeof setTimeout>;
    const cycleWidth = () => (track.children[mediaItems.length] as HTMLElement).offsetLeft - (track.children[0] as HTMLElement).offsetLeft;
    const updateActive = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let distance = Infinity;
      Array.from(track.children).forEach((child, index) => {
        const item = child as HTMLElement;
        const nextDistance = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
        if (nextDistance < distance) { distance = nextDistance; closest = index; }
      });
      setActiveIndex(closest);
    };
    const settleLoop = () => {
      const cycle = cycleWidth();
      if (cycle <= 0) return;
      const halfWidth = track.clientWidth / 2;
      const normalized = cycle + ((track.scrollLeft + halfWidth - cycle) % cycle + cycle) % cycle - halfWidth;
      if (Math.abs(normalized - track.scrollLeft) > 1) track.scrollLeft = normalized;
      updateActive();
    };
    const onScroll = () => {
      updateActive();
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settleLoop, 180);
    };
    const initialize = () => { track.scrollLeft = cycleWidth(); updateActive(); };
    initialize();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", initialize);
    return () => {
      observer.disconnect();
      clearTimeout(settleTimer);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", initialize);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || paused || hovered || manualBrowsing || !inView || reduceMotion !== false) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    let frame = 0;
    let previousTime = 0;
    let position = track.scrollLeft;
    const animate = (time: number) => {
      if (desktop.matches && !document.hidden) {
        const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
        const cycle = (track.children[mediaItems.length] as HTMLElement).offsetLeft - (track.children[0] as HTMLElement).offsetLeft;
        if (cycle > 0) {
          position += elapsed * 0.012;
          if (position + track.clientWidth / 2 >= cycle * 2) position -= cycle;
          if (position + track.clientWidth / 2 < cycle) position += cycle;
          track.scrollLeft = position;
        }
      }
      previousTime = time;
      frame = requestAnimationFrame(animate);
    };
    const updateMotion = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      position = track.scrollLeft;
      if (desktop.matches && !document.hidden) frame = requestAnimationFrame(animate);
    };
    updateMotion();
    desktop.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateMotion);
    return () => {
      cancelAnimationFrame(frame);
      desktop.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateMotion);
    };
  }, [paused, hovered, manualBrowsing, inView, reduceMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updatePlayback = () => {
      track.querySelectorAll("video").forEach((video) => video.pause());
      if (paused || !inView || document.hidden || reduceMotion !== false) return;
      const active = track.children[activeIndex]?.querySelector("video");
      if (active) { active.muted = true; void active.play().catch(() => {}); }
    };
    updatePlayback();
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      document.removeEventListener("visibilitychange", updatePlayback);
      track.querySelectorAll("video").forEach((video) => video.pause());
    };
  }, [activeIndex, paused, inView, reduceMotion]);

  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    setPaused(true);
    const item = track.children[0] as HTMLElement | undefined;
    track.scrollBy({ left: direction * ((item?.offsetWidth ?? 280) + 24), behavior: reduceMotion ? "instant" : "smooth" });
  };

  return (
    <section ref={sectionRef} aria-labelledby="practice-title" className="overflow-hidden bg-[#fdfbf9] py-20 text-[#69483e] md:py-24">
      <div className="mx-auto mb-8 flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 md:px-10">
        <div>
          <h2 id="practice-title" style={{ fontFamily: "Georgia, serif", fontWeight: 400 }} className="mb-4 text-4xl leading-tight md:text-5xl">{t.title}</h2>
          <p className="text-base leading-relaxed md:text-lg">{t.subtitle}</p>
          <p className="mt-2 text-sm text-[#985f43] md:hidden">{t.swipe}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} aria-label={t.previous} aria-controls="practice-gallery" className="gallery-control"><ArrowLeft size={20} aria-hidden="true" /></button>
          <button type="button" onClick={() => { setPaused(!paused); setManualBrowsing(false); }} aria-label={paused ? t.play : t.pause} aria-pressed={paused} className="gallery-control">{paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}</button>
          <button type="button" onClick={() => move(1)} aria-label={t.next} aria-controls="practice-gallery" className="gallery-control"><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </div>
      <p id="practice-instructions" className="sr-only">{t.instructions}</p>
      <div
        id="practice-gallery"
        ref={trackRef}
        role="region"
        aria-label={t.title}
        aria-describedby="practice-instructions"
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setManualBrowsing(true)}
        onPointerDown={() => setManualBrowsing(true)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); }
        }}
        className="no-scrollbar relative flex gap-6 overflow-x-auto overscroll-x-contain px-6 pb-4 snap-x snap-mandatory md:snap-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#985f43] md:px-10"
      >
        {loopMedia.map((item, index) => (
          <figure key={`${item.src}-${index}`} aria-hidden={index < mediaItems.length || index >= mediaItems.length * 2 ? true : undefined} inert={index < mediaItems.length || index >= mediaItems.length * 2 ? true : undefined} className="w-[76vw] max-w-[320px] shrink-0 snap-center md:w-[300px] lg:w-[340px] lg:max-w-[340px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#eadbd0] bg-[#eee3d8]">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.src.replace("/video/upload/q_auto,f_mp4/", "/video/upload/so_0,f_jpg,q_auto,w_680/").replace(/\.mp4$/, ".jpg")}
                  muted loop playsInline controls={index >= mediaItems.length && index < mediaItems.length * 2} preload="none"
                  aria-label={`${t.moment} ${index % mediaItems.length + 1}`}
                  onPlay={(event) => {
                    trackRef.current?.querySelectorAll("video").forEach((video) => { if (video !== event.currentTarget) video.pause(); });
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Image src={item.src} alt={index >= mediaItems.length && index < mediaItems.length * 2 ? `${t.moment} ${index % mediaItems.length + 1}` : ""} fill sizes="(min-width: 1024px) 340px, (min-width: 768px) 300px, 76vw" className="object-cover" />
              )}
            </div>
            <figcaption className="mt-3 flex items-center justify-between px-1 text-xs uppercase tracking-[0.15em] text-[#985f43]">
              <span>{item.type === "video" ? t.video : t.photo}</span><span>{String(index % mediaItems.length + 1).padStart(2, "0")} / 06</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
