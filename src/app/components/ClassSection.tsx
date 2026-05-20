// app/components/ClassSection.tsx
"use client";

import { ReactNode, useState } from "react";
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
    <section id={id} className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-items-center">
          
          {/* TEXTO */}
          <div
            className={`
              w-full max-w-xl space-y-6
              order-1
              ${reverse ? "lg:order-2" : "lg:order-1"}
            `}
          >
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-[#d7bdb3]/10 text-[#d7bdb3]">
              {icon}
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-neutral-800 leading-tight">
              {t.title}
            </h2>

            <div className="space-y-4 text-neutral-600 text-lg leading-relaxed">
              <p>{t.p1}</p>

              <p className="relative inline-block">
                {t.p2}
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#d7bdb3]/20 -z-10" />
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-[#8e735b] text-white px-8 py-3 rounded-full font-medium hover:bg-[#7a624e] transition-all transform hover:scale-105 shadow-md cursor-pointer"
            >
              {t.button}
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
            <div className="relative group overflow-hidden rounded-3xl aspect-[4/5] shadow-xl bg-neutral-100 w-full max-w-[420px]">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
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