"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RotateCw } from "lucide-react";
import Image from "next/image";

const nutritionBio = {
  en: {
    badge: "about me",
    title: "I'm Natalia",
    subtitle: "nutritionist certified in Malta and the European Union",
    paragraphs: [
      "Specialising in Nutrition for Sport and Physical Activity, with a holistic and ancestral perspective.",
      "My approach integrates nutritional science, mindful eating and the importance of movement as fundamental pillars of health and wellbeing.",
      "I believe there is no ideal diet for everyone. We are all unique and one of a kind, with different needs, histories and goals. That is why I believe nutrition should be adapted to each person, respecting their individuality, lifestyle and physical activity.",
      "My purpose is to support you in building a healthy relationship with food, learning to listen to your body and discovering how to nourish it so you can feel better, boost your energy and reach your goals.",
      "I believe in nutrition based on real foods, variety, balance and sustainable habits. Because taking care of yourself should not mean restricting yourself, but learning to choose what makes you feel good."
    ],
    philosophy: "My philosophy: Nutrition is a bridge connecting your body with your energy, nurturing wellbeing from within."
  },
  es: {
    badge: "Sobre mí",
    title: "Soy Natalia",
    subtitle: "nutricionista certificada en Malta y la Unión Europea",
    paragraphs: [
      "Especializada en Nutrición para el Deporte y la Actividad Física, con orientación holistica y ancestral.",
      "Mi enfoque integra la ciencia de la nutrición, la alimentación consciente y la importancia del movimiento como pilares fundamentales para la salud y el bienestar.",
      "Creo que no existe una dieta ideal para todos. Somos seres únicos e irrepetibles, con necesidades, historias y objetivos diferentes. Por eso, considero que la alimentación debe adaptarse a cada persona, respetando su individualidad, estilo de vida y actividad física.",
      "Mi propósito es acompañarte a construir una relación saludable con la comida, aprender a escuchar tu cuerpo y descubrir cómo nutrirlo para sentirte mejor, potenciar tu energía y alcanzar tus objetivos.",
      "Creo en una nutrición basada en alimentos reales, variedad, equilibrio y hábitos sostenibles. Porque cuidarte no debería significar restringirte, sino aprender a elegir aquello que te hace bien."
    ],
    philosophy: "Mi filosofía: La nutricion es un puente para conectar tu cuerpo con tu energia, y cultivar el bienestar desde adentro."
  }
};

const yogaBio = {
  en: {
    badge: "about me",
    title: "I'm Natalia",
    subtitle: "your yoga teacher",
    paragraphs: [
      "My journey with yoga began over 5 years ago as a personal search for physical and mental well-being. Over time, it became my lifestyle and my passion: guiding others to reconnect with themselves.",
      "My classes combine mindful movement, breath, and presence. I believe in an accessible, loving, and transformative yoga practice.",
    ],
  },
  es: {
    badge: "sobre mí",
    title: "Soy Natalia",
    subtitle: "tu profesora de yoga",
    paragraphs: [
      "Mi camino en el yoga comenzó hace más de 5 años como una búsqueda personal de bienestar físico y mental. Con el tiempo, se convirtió en mi estilo de vida y mi pasión: guiar a otros a reconectar consigo mismos.",
      "Mis clases combinan movimiento consciente, respiración y presencia. Creo en una práctica de yoga accesible, amorosa y transformadora.",
    ],
  },
};

export default function IntroYoga({ lang = "en" }: { lang?: string }) {
  const selectedLang = lang === "es" ? "es" : "en";
  const [side, setSide] = useState<"yoga" | "nutrition">("yoga");
  const reduceMotion = useReducedMotion();
  const yoga = yogaBio[selectedLang];
  const nutrition = nutritionBio[selectedLang];
  const t = side === "yoga" ? yoga : nutrition;
  const es = selectedLang === "es";

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-28 relative overflow-hidden bg-[#fdfbf9] py-16 text-[#69483e] lg:py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-6 bg-[#d7bdb3]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#985f43]">{es ? "Sobre mí" : "About me"}</span>
          </div>
          <div role="group" aria-label={es ? "Elegir presentación de Natalia" : "Choose Natalia’s introduction"} className="inline-flex rounded-full border border-[#decbbd] bg-[#f4eae3] p-1">
            {(["yoga", "nutrition"] as const).map(value => (
              <button key={value} type="button" aria-pressed={side === value} aria-controls="about-bio" onClick={() => setSide(value)} className={`flex min-h-11 items-center gap-2 rounded-full px-5 py-2 text-sm font-medium motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#985f43] ${side === value ? "bg-[#985f43] text-white shadow-sm" : "text-[#69483e] hover:bg-[#eadbd0]"}`}>
                {value === "yoga" ? "Yoga" : es ? "Nutrición" : "Nutrition"}
                {side !== value && <RotateCw size={14} aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>
        <p className="mb-5 text-sm leading-6 text-[#785e4c]">{es ? "Dos formas de acompañarte. Elegí Yoga o Nutrición para conocer mi camino." : "Two ways to support you. Choose Yoga or Nutrition to discover my journey."}</p>
        <div id="about-bio" style={{ perspective: "1600px" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={side} initial={{ opacity: reduceMotion ? 1 : 0, rotateY: reduceMotion ? 0 : -80 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: reduceMotion ? 1 : 0, rotateY: reduceMotion ? 0 : 80 }} transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeInOut" }} style={{ backfaceVisibility: "hidden" }} className="grid overflow-hidden rounded-2xl border border-[#eadbd0] bg-white shadow-sm lg:grid-cols-12">
              <div data-scroll-reveal className="relative aspect-[4/3] bg-[#eee3d8] sm:aspect-[3/2] lg:col-span-5 lg:aspect-auto lg:min-h-[500px]">
                <Image src="/images/nati.jpg" alt="Natalia" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover object-[center_60%] contrast-[0.95] saturate-[0.95] brightness-[1.03] lg:object-center" />
              </div>
              <div data-scroll-reveal className="flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:col-span-7 lg:p-16">
                <h2 id="about-title" className="text-4xl leading-[1.1] font-title tracking-tight text-[#985f43] md:text-5xl">
                  {t.title}
                  <span className="mt-3 block text-xl font-normal leading-relaxed text-[#785e4c] md:text-2xl">{t.subtitle}</span>
                </h2>
                <div className="mt-8 space-y-6">
                  {t.paragraphs.map(text => <p key={text} className="max-w-prose font-body text-[1.0625rem] leading-7 text-[#69483e] md:text-lg md:leading-relaxed">{text}</p>)}
                  <p className="border-l-2 border-[#d7bdb3] pl-5 font-serif text-xl italic leading-relaxed text-[#8e735b]">{side === "nutrition" ? nutrition.philosophy : es ? "Mi intención es guiarte a reconectar con vos, escuchar tu cuerpo y encontrar en el movimiento y la respiración una forma de cuidarte." : "My intention is to guide you to reconnect with yourself, listen to your body and find a way to care for yourself through movement and breath."}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <span role="status" className="sr-only">{es ? "Presentación:" : "Introduction:"} {side === "yoga" ? "Yoga" : es ? "Nutrición" : "Nutrition"}</span>
      </div>
    </section>
  );
}
