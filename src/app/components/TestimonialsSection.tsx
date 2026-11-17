"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

type ReviewFilter = "all" | "group" | "private" | "nutrition";

const testimonials = [
  { name: "Agostina", category: "group", service: { es: "Yoga grupal", en: "Group yoga" }, quote: { es: "Fui con Oli y nos encantó. Nati te hace sentir cómoda desde el primer momento.", en: "I went with Oli and we loved it. Nati makes you feel comfortable from the very first moment." } },
  { name: "Camila", category: "private", service: { es: "Yoga individual", en: "Private yoga" }, quote: { es: "Me encantó practicar con Nati. Súper amable y atenta a cómo me sentía ese día.", en: "I loved practising with Nati. So kind and attentive to how I was feeling that day." } },
  { name: "Claudia", category: "nutrition", service: { es: "Nutrición", en: "Nutrition" }, quote: { es: "Me ayudó a ordenar mis comidas sin sentir que tenía que cambiar toda mi vida.", en: "She helped me organise my meals without feeling like I had to change my whole life." } },
  { name: "Wanda", category: "group", service: { es: "Yoga", en: "Yoga" }, quote: { es: "Un ratito para bajar un cambio y volver a conectar conmigo.", en: "A little time to slow down and reconnect with myself." } },
  { name: "Lucas", category: "nutrition", service: { es: "Nutrición deportiva", en: "Sports nutrition" }, quote: { es: "Pudimos organizar la alimentación alrededor del básquet, los entrenamientos y los partidos.", en: "We were able to plan my nutrition around basketball, training and games." } },
  { name: "Malen", category: "private", service: { es: "Yoga individual", en: "Private yoga" }, quote: { es: "Las clases se adaptan mucho a lo que necesito. Siempre me llevo algo lindo.", en: "The classes really adapt to what I need. I always take something lovely away with me." } },
  { name: "Oli", category: "group", service: { es: "Yoga grupal", en: "Group yoga" }, quote: { es: "Compartir las clases con Agos fue un plan hermoso. Salíamos mucho más relajadas.", en: "Sharing the classes with Agos was such a lovely experience. We always left feeling much more relaxed." } },
  { name: "Mariana", category: "nutrition", service: { es: "Seguimiento nutricional", en: "Nutrition follow-up" }, quote: { es: "Me sentí acompañada y pude ir haciendo cambios de a poquito.", en: "I felt supported and was able to make changes little by little." } },
  { name: "Cecilia", category: "nutrition", service: { es: "Nutrición", en: "Nutrition" }, quote: { es: "Me gustó que se tomara el tiempo de escucharme y entender mis hábitos.", en: "I appreciated her taking the time to listen to me and understand my habits." } },
];

export default function TestimonialsSection({ lang }: { lang: "es" | "en" }) {
  const es = lang === "es";
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const visibleReviews = testimonials.filter(item => filter === "all" || item.category === filter);
  const filters: { value: ReviewFilter; label: string }[] = [
    { value: "all", label: es ? "Todas" : "All" },
    { value: "group", label: es ? "Yoga grupal" : "Group yoga" },
    { value: "private", label: es ? "Yoga individual" : "Private yoga" },
    { value: "nutrition", label: es ? "Nutrición" : "Nutrition" },
  ];
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  function updateEdges() {
    const element = track.current;
    if (!element) return;
    const start = element.scrollLeft <= 2;
    const end = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
    setEdges(previous => previous.start === start && previous.end === end ? previous : { start, end });
  }
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(element);
    return () => observer.disconnect();
  }, [filter]);
  function move(direction: number) {
    const element = track.current;
    const card = element?.querySelector("li");
    if (!element || !card) return;
    const stride = card.getBoundingClientRect().width + 16;
    const count = Math.max(1, Math.round(element.clientWidth / stride));
    const index = Math.round(element.scrollLeft / stride);
    element.scrollTo({ left: (index + direction * count) * stride, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return (
    <section id="experiences" lang={lang} aria-labelledby="experiences-title" className="scroll-mt-28 overflow-hidden bg-[#f4eae3] py-16 text-[#69483e] md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <header data-scroll-reveal className="mb-8 max-w-2xl md:mb-12">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#985f43]">{es ? "Experiencias compartidas" : "Shared experiences"}</p>
          <h2 id="experiences-title" style={{ fontFamily: "Georgia, serif", fontWeight: 400 }} className="text-4xl leading-tight md:text-5xl">{es ? "Un espacio para conectar" : "A space to connect"}</h2>
          <p className="mt-5 text-[1.0625rem] leading-7">{es ? "Palabras de quienes compartieron conmigo su práctica y su camino de bienestar." : "Words from those who have shared their practice and wellbeing journey with me."}</p>
        </header>
        <div role="group" aria-label={es ? "Filtrar opiniones" : "Filter reviews"} className="mb-6 flex flex-wrap gap-2">
          {filters.map(item => <button key={item.value} type="button" aria-pressed={filter === item.value} aria-controls="experiences-track" onClick={() => { setFilter(item.value); }} className={`min-h-11 rounded-full border border-[#985f43] px-4 py-2 text-sm font-medium motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#985f43] ${filter === item.value ? "bg-[#985f43] text-white" : "text-[#69483e] hover:bg-[#eadbd0]"}`}>{item.label}</button>)}
        </div>
        <p role="status" className="sr-only">{visibleReviews.length} {es ? "opiniones" : "reviews"}</p>
        <p id="experiences-hint" className="mb-4 text-sm text-[#785e4c] md:hidden">{es ? "Deslizá para conocer más experiencias →" : "Swipe to explore more experiences →"}</p>
        <div data-scroll-reveal key={filter} ref={track} id="experiences-track" onScroll={updateEdges} role="region" aria-label={es ? "Comentarios y puntuaciones" : "Reviews and ratings"} aria-describedby="experiences-hint" tabIndex={0} className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#985f43]">
          <ul className="flex gap-4 pb-4">
            {visibleReviews.map(item => (
              <li key={item.name} className="flex w-[88%] shrink-0 snap-start flex-col rounded-2xl border border-[#eadbd0] bg-[#fdfbf9] p-6 md:w-[calc((100%-1rem)/2)] md:p-7 lg:w-[calc((100%-2rem)/3)]">
                <div role="img" aria-label={es ? "5 de 5 estrellas" : "5 out of 5 stars"} className="mb-5 flex gap-1 text-[#a76d54]">
                  {Array.from({ length: 5 }, (_, i) => <Star key={i} aria-hidden="true" size={16} strokeWidth={1.3} fill="currentColor" />)}
                </div>
                <figure className="flex flex-1 flex-col">
                  <blockquote className="mb-7 text-[1.0625rem] leading-7"><p>“{item.quote[lang]}”</p></blockquote>
                  <figcaption className="mt-auto border-t border-[#eadbd0] pt-4"><span className="block font-medium">{item.name}</span><span className="mt-1 block text-sm text-[#785e4c]">{item.service[lang]}</span></figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 flex justify-end gap-3" role="group" aria-label={es ? "Navegar opiniones" : "Browse reviews"}>
          <button type="button" onClick={() => move(-1)} disabled={edges.start} aria-controls="experiences-track" aria-label={es ? "Opiniones anteriores" : "Previous reviews"} className="flex h-12 w-12 items-center justify-center rounded-full border border-[#985f43] text-[#985f43] motion-safe:transition-colors hover:bg-[#eadbd0] disabled:cursor-default disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#985f43]"><ArrowLeft size={20} aria-hidden="true" /></button>
          <button type="button" onClick={() => move(1)} disabled={edges.end} aria-controls="experiences-track" aria-label={es ? "Opiniones siguientes" : "Next reviews"} className="flex h-12 w-12 items-center justify-center rounded-full border border-[#985f43] text-[#985f43] motion-safe:transition-colors hover:bg-[#eadbd0] disabled:cursor-default disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#985f43]"><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
