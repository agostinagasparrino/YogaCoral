"use client";

import { motion, MotionConfig } from "framer-motion";
import Image from "next/image";

// 1. Traducciones del componente Intro
const content = {
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

export default function IntroYoga({ lang = "en" }: { lang?: string }) {
  // Seleccionamos el idioma
  const t = content[lang as keyof typeof content] || content.en;

  return (
    <MotionConfig reducedMotion="user">
      <section id="about" aria-labelledby="about-title" className="scroll-mt-28 relative bg-[#fdfbf9] text-[#69483e] py-16 lg:py-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.03, rotate: 12 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 right-0 pointer-events-none"
        ></motion.div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-0 border border-[#eadbd0] bg-white shadow-sm overflow-hidden rounded-2xl">
            <motion.div
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:min-h-[500px] bg-[#eee3d8]"
            >
              <Image
                src="/images/nati.jpg"
                alt="Natalia"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_60%] contrast-[0.95] saturate-[0.95] brightness-[1.03] lg:object-center"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center"
            >
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="flex items-center gap-3"
                >
                  <span className="h-0.5 w-6 bg-[#d7bdb3]" />
                  <span className="text-[#985f43] font-medium text-xs uppercase tracking-[0.2em] font-body">
                    {t.badge}
                  </span>
                </motion.div>

                <motion.h2
                  id="about-title"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.55 }}
                  className="text-4xl md:text-5xl font-title text-[#985f43] leading-[1.1] tracking-tight"
                >
                  {t.title}
                  <span className="mt-3 block text-xl font-normal leading-relaxed text-[#785e4c] md:text-2xl">{t.subtitle}</span>
                </motion.h2>

                <div className="space-y-6">
                  {t.paragraphs.map((text, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="text-[1.0625rem] leading-7 text-[#69483e] max-w-prose font-body md:text-lg md:leading-relaxed"
                    >
                      {text}
                    </motion.p>
                  ))}
                  <p className="border-l-2 border-[#d7bdb3] pl-5 font-serif text-xl italic leading-relaxed text-[#8e735b]">{t.philosophy}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
