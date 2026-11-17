import { Star } from "lucide-react";

const testimonials = [
  { name: "Agostina", service: { es: "Yoga grupal", en: "Group yoga" }, quote: { es: "Fui con Oli y nos encantó. Nati te hace sentir cómoda desde el primer momento.", en: "I went with Oli and we loved it. Nati makes you feel comfortable from the very first moment." } },
  { name: "Oli", service: { es: "Yoga grupal", en: "Group yoga" }, quote: { es: "Compartir las clases con Agos fue un plan hermoso. Salíamos mucho más relajadas.", en: "Sharing the classes with Agos was such a lovely experience. We always left feeling much more relaxed." } },
  { name: "Camila", service: { es: "Yoga individual", en: "Private yoga" }, quote: { es: "Me encantó practicar con Nati. Súper amable y atenta a cómo me sentía ese día.", en: "I loved practising with Nati. So kind and attentive to how I was feeling that day." } },
  { name: "Wanda", service: { es: "Yoga", en: "Yoga" }, quote: { es: "Un ratito para bajar un cambio y volver a conectar conmigo.", en: "A little time to slow down and reconnect with myself." } },
  { name: "Claudia", service: { es: "Nutrición", en: "Nutrition" }, quote: { es: "Me ayudó a ordenar mis comidas sin sentir que tenía que cambiar toda mi vida.", en: "She helped me organise my meals without feeling like I had to change my whole life." } },
  { name: "Mariana", service: { es: "Seguimiento nutricional", en: "Nutrition follow-up" }, quote: { es: "Me sentí acompañada y pude ir haciendo cambios de a poquito.", en: "I felt supported and was able to make changes little by little." } },
  { name: "Lucas", service: { es: "Nutrición deportiva", en: "Sports nutrition" }, quote: { es: "Pudimos organizar la alimentación alrededor del básquet, los entrenamientos y los partidos.", en: "We were able to plan my nutrition around basketball, training and games." } },
  { name: "Malen", service: { es: "Yoga individual", en: "Private yoga" }, quote: { es: "Las clases se adaptan mucho a lo que necesito. Siempre me llevo algo lindo.", en: "The classes really adapt to what I need. I always take something lovely away with me." } },
  { name: "Cecilia", service: { es: "Nutrición", en: "Nutrition" }, quote: { es: "Me gustó que se tomara el tiempo de escucharme y entender mis hábitos.", en: "I appreciated her taking the time to listen to me and understand my habits." } },
];

export default function TestimonialsSection({ lang }: { lang: "es" | "en" }) {
  const es = lang === "es";
  return (
    <section id="experiences" lang={lang} aria-labelledby="experiences-title" className="scroll-mt-28 overflow-hidden bg-[#f4eae3] py-16 text-[#69483e] md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <header className="mb-8 max-w-2xl md:mb-12">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#985f43]">{es ? "Experiencias compartidas" : "Shared experiences"}</p>
          <h2 id="experiences-title" style={{ fontFamily: "Georgia, serif", fontWeight: 400 }} className="text-4xl leading-tight md:text-5xl">{es ? "Un espacio para conectar" : "A space to connect"}</h2>
          <p className="mt-5 text-[1.0625rem] leading-7">{es ? "Palabras de quienes compartieron conmigo su práctica y su camino de bienestar." : "Words from those who have shared their practice and wellbeing journey with me."}</p>
        </header>
        <p id="experiences-hint" className="mb-4 text-sm text-[#785e4c] md:hidden">{es ? "Deslizá para conocer más experiencias →" : "Swipe to explore more experiences →"}</p>
        <div role="region" aria-label={es ? "Comentarios y puntuaciones" : "Reviews and ratings"} aria-describedby="experiences-hint" tabIndex={0} className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-2xl md:overflow-visible focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#985f43]">
          <ul className="flex gap-4 pb-4 md:grid md:grid-cols-2 md:pb-0 lg:grid-cols-3">
            {testimonials.map(item => (
              <li key={item.name} className="flex w-[88%] shrink-0 snap-start flex-col rounded-2xl border border-[#eadbd0] bg-[#fdfbf9] p-6 md:w-auto md:p-7">
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
      </div>
    </section>
  );
}
