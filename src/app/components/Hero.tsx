"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ContactModal from "@/app/components/ContactModal";
import { ArrowRight } from "lucide-react";
import { nutritionContent, nutritionServices } from "./nutritionContent";

const nutritionOptions = {
  es: [nutritionServices.es, ...nutritionContent.es.consultations],
  en: [nutritionServices.en, ...nutritionContent.en.consultations],
};

type HeroProps = {
  title: string;
  description: string;
  buttonText?: string;
  buttonColor?: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  overlayOpacity?: string;
  gradient?: boolean;
  gradientColor?: string;
  defaultService?: string;
};

export default function Hero({
  title,
  description,
  buttonText = "Contactanos",
  mediaType,
  mediaSrc,
  overlayOpacity = "bg-black/30",
  gradient = true,
  gradientColor = "from-navy via-navy/80",
  defaultService = "Seleccionar servicio",
}: HeroProps) {
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(defaultService);
  const [isMobile, setIsMobile] = useState(false);

  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const isSpanish = lang === "es";
  const contentLang = isSpanish ? "es" : "en";
  const actions = [
    { label: buttonText, description, target: "classes", service: defaultService },
    {
      label: isSpanish ? "Info nutrición" : "Nutrition info",
      description: isSpanish
        ? "Nutrición personalizada para cuidar tu cuerpo, potenciar tu energía y crear hábitos sostenibles."
        : "Personalised nutrition to care for your body, boost your energy and build sustainable habits.",
      target: "nutrition",
      service: nutritionServices[contentLang],
    },
  ];
  const actionClass = "group w-fit max-w-full items-center gap-4 bg-transparent border border-white/30 hover:border-white text-white pl-6 pr-2 py-2 rounded-full motion-safe:transition-colors duration-300 backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center">

        {/* LANGUAGE */}
        <div className="hidden xl:flex absolute top-10 right-10 z-50 gap-3 text-sm font-bold">
          <Link
            href="/?lang=en"
            className={`transition-colors ${
              !isSpanish
                ? "text-white underline decoration-[#d7bdb3] underline-offset-4"
                : "text-white/60 hover:text-white"
            }`}
          >
            EN
          </Link>
          <span className="text-white/40">|</span>
          <Link
            href="/?lang=es"
            className={`transition-colors ${
              isSpanish
                ? "text-white underline decoration-[#d7bdb3] underline-offset-4"
                : "text-white/60 hover:text-white"
            }`}
          >
            ES
          </Link>
        </div>

        {/* MEDIA */}
        {mediaType === "video" && !isMobile ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover contrast-75"
          >
            <source src={mediaSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/images/heroo.jpg"
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        {/* OVERLAY */}
        <div className={`absolute inset-0 ${overlayOpacity}`} />

        {/* GRADIENT */}
        {gradient && (
          <div
            className={`absolute inset-y-0 left-0 w-full md:w-[70%] lg:w-[55%] bg-linear-to-r ${gradientColor} to-transparent`}
          />
        )}

        {/* CONTENT */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-32 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:items-end">

            {/* TITLE */}
            <div className="lg:col-span-8">
              <h1 className="text-[clamp(2.5rem,10vw,6.5rem)] font-extrabold leading-[0.9] tracking-tight text-white mb-6 md:mb-0">
                <span className="block md:hidden">
                  {title.replace("\n", " ")}
                </span>
                <span className="hidden md:block whitespace-pre-line">
                  {title}
                </span>
              </h1>
            </div>

            {/* TEXT + CTA */}
            <div className="lg:col-span-4 flex flex-col">

              <div className="mt-6 flex flex-col items-start gap-8 md:mt-0">
                {actions.map((action) => {
                  const label = (
                    <>
                      <span className="text-sm font-bold uppercase tracking-widest">{action.label}</span>
                      <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black">
                        <ArrowRight size={20} strokeWidth={2.5} />
                      </span>
                    </>
                  );
                  return (
                    <div key={action.target} className="max-w-full">
                      <p className="mb-6 border-l-2 border-white/20 pl-6 text-base font-medium leading-relaxed text-white/80 sm:text-lg">
                        {action.description}
                      </p>
                      <a href={`#${action.target}`} className={`flex md:hidden ${actionClass}`}>
                        {label}
                      </a>
                      <button
                        type="button"
                        onClick={() => { setSelectedService(action.service); setContactOpen(true); }}
                        className={`hidden md:flex ${actionClass}`}
                      >
                        {label}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        lang={lang}
        defaultService={selectedService}
        serviceOptions={selectedService === nutritionServices[contentLang] ? nutritionOptions[contentLang] : undefined}
      />
    </>
  );
}
