// app/components/ClassSection.tsx
"use client";

import { ReactNode, useState } from "react";
import { ArrowRight } from "lucide-react";
import ContactModal from "@/app/components/ContactModal";

type Lang = "en" | "es";

type SectionText = {
  title: string;
  p1: string;
  p2: string;
  button: string;
  serviceValue: string;
};

type ClassSectionProps = {
  id: string;
  lang?: string;
  icon: ReactNode;
  videoSrc: string;
  content: Record<Lang, SectionText>;
  reverse?: boolean;
};

export default function ClassSection({
  id,
  lang = "en",
  icon,
  videoSrc,
  content,
  reverse = false,
}: ClassSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedLang: Lang = lang === "es" ? "es" : "en";
  const t = content[selectedLang];

  return (
    <section id={id} lang={selectedLang} aria-labelledby={`${id}-title`} className="scroll-mt-28 overflow-hidden bg-[#fdfbf9] py-20 text-[#69483e] md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center justify-items-center">
          
          {/* TEXTO */}
          <div
            className={`
              w-full max-w-xl space-y-6
              order-1
              ${reverse ? "lg:order-2" : "lg:order-1"}
            `}
          >
            <div className="inline-flex items-center justify-center rounded-full bg-[#f4eae3] p-3 text-[#985f43]">
              {icon}
            </div>

            <h2 id={`${id}-title`} style={{ fontFamily: "Georgia, serif", fontWeight: 400 }} className="text-4xl leading-tight md:text-5xl">
              {t.title}
            </h2>

            <div className="space-y-6 text-base leading-relaxed md:text-lg">
              <p>{t.p1}</p>

              <p>{t.p2}</p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#985f43] bg-[#985f43] px-6 py-3 text-sm font-medium text-white motion-safe:transition-colors hover:bg-[#78452e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#985f43]"
            >
              {t.button}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>

          {/* VIDEO */}
          <div
            className={`
              w-full flex justify-center
              order-2
              ${reverse ? "lg:order-1" : "lg:order-2"}
            `}
          >
            <div className="relative overflow-hidden rounded-t-[48%] rounded-b-3xl aspect-[4/5] bg-[#eee3d8] w-full max-w-[440px]">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>

              <div className="pointer-events-none absolute inset-0 bg-black/5" />
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={selectedLang}
        defaultService={t.serviceValue}
      />
    </section>
  );
}