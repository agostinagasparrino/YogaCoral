"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop({ lang }: { lang: "es" | "en" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 160);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={lang === "es" ? "Volver arriba" : "Back to top"}
      onClick={() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
      }}
      className="fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-[#8e735b]/90 text-white shadow-lg backdrop-blur-sm motion-safe:transition-colors hover:bg-[#745c48] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8e735b] md:hidden"
    >
      <ArrowUp size={22} aria-hidden="true" />
    </button>
  );
}
