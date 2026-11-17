"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Send, X, ArrowLeft } from "lucide-react";
import ContactModal from "./ContactModal";
import { nutritionServices } from "./nutritionContent";

type Lang = "es" | "en";
type Topic = "private" | "group" | "nutrition";
const copy = {
  es: {
    title: "Asistente de Nati", open: "Abrir asistente de Nati", close: "Cerrar asistente", back: "Volver al inicio",
    intro: "¡Hola! Soy el asistente de Nati. Te ayudo a explorar la web o preparar tu consulta para ella.",
    private: "Clases privadas", group: "Clases grupales", nutrition: "Info nutrición", consult: "Preparar mi consulta",
    privateInfo: "Una práctica personalizada, adaptada a tus necesidades y tu proceso. Podés conocer el enfoque o preparar una consulta para Nati.",
    groupInfo: "Conocé las clases grupales y encontrá la información para compartir tu práctica. Nati puede ayudarte a coordinar tu próxima clase.",
    nutritionInfo: "Un enfoque personalizado basado en alimentos reales, movimiento y hábitos sostenibles. Conocé la propuesta o prepará tu consulta nutricional.",
    section: "Ir a la sección", question: "¿Sobre qué te gustaría consultar?", goal: "¿Qué te gustaría contarle a Nati?", placeholder: "Por ejemplo: quiero empezar yoga…",
    draft: "Con esto podemos preparar tu mensaje. En el formulario vas a poder revisarlo, completar tus datos y elegir la modalidad antes de abrir WhatsApp.",
    review: "Revisar mi consulta", send: "Enviar al asistente", input: "Escribí tu pregunta", fallback: "Puedo orientarte sobre las secciones de la web. Para horarios, precios o una consulta personal, preparemos un mensaje para Nati.",
    note: "Guía de la web · No es una conversación con Nati", greeting: "Me gustaría consultar sobre", saved: "Tu consulta", required: "Escribí unas palabras para continuar.",
  },
  en: {
    title: "Nati’s assistant", open: "Open Nati’s assistant", close: "Close assistant", back: "Back to start",
    intro: "Hi! I’m Nati’s assistant. I can help you explore the website or prepare an inquiry for her.",
    private: "Private classes", group: "Group classes", nutrition: "Nutrition info", consult: "Prepare my inquiry",
    privateInfo: "A personalized practice adapted to your needs and journey. Explore the approach or prepare an inquiry for Nati.",
    groupInfo: "Explore group classes and find information about sharing your practice. Nati can help you arrange your next class.",
    nutritionInfo: "A personalized approach based on real food, movement and sustainable habits. Explore the approach or prepare your nutrition inquiry.",
    section: "Explore this section", question: "What would you like to ask about?", goal: "What would you like to tell Nati?", placeholder: "For example: I’d like to start yoga…",
    draft: "We can use this to prepare your message. In the form you can review it, add your details and choose a modality before opening WhatsApp.",
    review: "Review my inquiry", send: "Send to assistant", input: "Type your question", fallback: "I can guide you through the website. For schedules, prices or a personal question, let’s prepare a message for Nati.",
    note: "Website guide · You are not chatting with Nati", greeting: "I’d like to ask about", saved: "Your inquiry", required: "Write a few words to continue.",
  },
};
const ids: Record<Topic, string> = { private: "private-classes", group: "group-classes", nutrition: "nutrition" };

export default function NatiAssistant({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [step, setStep] = useState<"home" | "topic" | "choose" | "goal" | "review" | "fallback">("home");
  const [input, setInput] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const services: Record<Topic, string> = {
    private: lang === "es" ? "Clases Privadas" : "Private Classes",
    group: lang === "es" ? "Clases Grupales" : "Group Classes",
    nutrition: nutritionServices[lang],
  };
  function close() { setOpen(false); launcher.current?.focus(); }
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    }, { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); launcher.current?.focus(); }
      if (event.key !== "Tab") return;
      const elements = panel.current?.querySelectorAll<HTMLElement>('button, input, textarea, a[href]');
      if (!elements?.length) return;
      const first = elements[0]; const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => { body.current?.scrollTo({ top: 0 }); }, [step, topic]);
  const button = "min-h-11 rounded-2xl border border-[#decbbd] px-4 py-3 text-left text-sm hover:bg-[#eee2d8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#985f43]";
  function choose(value: Topic) { setTopic(value); setStep(step === "choose" ? "goal" : "topic"); setInput(""); setError(false); }
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = input.trim();
    if (!value) { setError(true); return; }
    setError(false);
    if (step === "goal") { setDetail(value); setStep("review"); setInput(""); return; }
    const text = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const found: Topic | null = /nutri|aliment|food|diet/.test(text) ? "nutrition" : /privad|private|individual/.test(text) ? "private" : /grup|group|yoga|clase|class/.test(text) ? "group" : null;
    setInput("");
    if (found) { setTopic(found); setStep("topic"); } else { setTopic(null); setDetail(value); setStep("fallback"); }
  }
  return <>
    {!contact && <button ref={launcher} type="button" onClick={() => setOpen(value => !value)} aria-label={t.open} aria-expanded={open} aria-controls="nati-assistant" className={`fixed left-4 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-50 ${pastHero ? "flex" : "hidden md:flex"} h-32 w-[86px] items-center justify-center bg-transparent md:left-auto md:right-4 md:bottom-6 md:h-36 md:w-24 motion-safe:transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#985f43]`}>
      <Image src="/images/nati-assistant-standing.webp" alt="" width={427} height={640} className="h-32 w-auto object-contain md:h-36" />
    </button>}
    {open && <section ref={panel} id="nati-assistant" role="dialog" aria-labelledby="nati-assistant-title" lang={lang} className="fixed inset-x-3 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-[90] flex max-h-[calc(100svh-2rem-env(safe-area-inset-bottom))] flex-col overflow-hidden rounded-3xl border border-[#decbbd] bg-[#fdfbf9] text-[#69483e] shadow-2xl sm:left-auto sm:right-6 sm:bottom-4 sm:w-[380px] sm:max-h-[min(640px,calc(100svh-2rem))] md:bottom-44 md:max-h-[min(640px,calc(100svh-12rem))]">
      <header className="flex shrink-0 items-center gap-3 border-b border-[#eadbd0] bg-[#f2e8df] px-4 py-3">
        <Image src="/images/nati-assistant-standing.webp" alt="" width={427} height={640} className="h-12 w-auto shrink-0 object-contain" />
        <div className="flex-1"><h2 id="nati-assistant-title" style={{fontSize: "1rem", fontWeight: 600, letterSpacing: "normal"}}>{t.title}</h2><p className="mt-1 text-xs leading-4">{t.note}</p></div>
        <button ref={closeButton} type="button" onClick={close} aria-label={t.close} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-[#e4d4c6]"><X size={20}/></button>
      </header>
      <div ref={body} className="min-h-0 overflow-y-auto overscroll-contain p-5 text-base leading-7">
        {step !== "home" && <button type="button" className="mb-4 flex min-h-11 items-center gap-2 text-sm underline underline-offset-4" onClick={() => {setStep("home");setTopic(null);setInput("");setError(false);}}><ArrowLeft size={16}/>{t.back}</button>}
        <div aria-live="polite" aria-atomic="true"><p>{step === "home" ? t.intro : step === "topic" && topic ? t[`${topic}Info`] : step === "choose" ? t.question : step === "goal" ? t.goal : step === "review" ? t.draft : t.fallback}</p></div>
        {(step === "home" || step === "choose") && <div className="mt-5 grid gap-2">{(["private", "group", "nutrition"] as Topic[]).map(value => <button type="button" key={value} className={button} onClick={() => choose(value)}>{t[value]}</button>)}{step === "home" && <button type="button" className={`${button} bg-[#985f43] text-white hover:bg-[#78452e]`} onClick={() => setStep("choose")}>{t.consult}</button>}</div>}
        {step === "topic" && topic && <div className="mt-5 grid gap-2"><button type="button" className={button} onClick={() => { const target = document.getElementById(ids[topic]); close(); target?.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"}); }}>{t.section}</button><button type="button" className={button} onClick={() => {setStep("goal");setInput("");}}>{t.consult}</button></div>}
        {step === "review" && <p className="mt-4 whitespace-pre-wrap break-words rounded-2xl bg-[#f2e8df] p-4"><strong>{t.saved}</strong><br/>{topic ? `${t.greeting}: ${services[topic]}.\n\n` : ""}{detail}</p>}
        {(step === "review" || step === "fallback") && <button type="button" className={`${button} mt-5 w-full bg-[#985f43] text-white hover:bg-[#78452e]`} onClick={() => {setOpen(false);setContact(true);}}>{t.review}</button>}
        {step !== "review" && step !== "choose" && <form onSubmit={submit} className="mt-5"><label htmlFor="nati-question" className="mb-2 block text-sm">{step === "goal" ? t.goal : t.input}</label><div className="flex gap-2"><input id="nati-question" maxLength={1500} value={input} onChange={e => setInput(e.target.value)} placeholder={step === "goal" ? t.placeholder : t.input} aria-invalid={error} aria-describedby={error ? "nati-input-error" : undefined} className="min-h-12 min-w-0 flex-1 rounded-2xl border border-[#decbbd] bg-white px-3 text-base focus:outline-2 focus:outline-[#985f43]"/><button type="submit" aria-label={t.send} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#985f43] text-white"><Send size={18}/></button></div>{error && <p id="nati-input-error" role="alert" className="mt-2 text-sm">{t.required}</p>}</form>}
      </div>
    </section>}
    {contact && <ContactModal open onClose={() => {setContact(false);setOpen(true);}} lang={lang} defaultService={topic ? services[topic] : undefined} defaultMessage={detail}/>}
  </>;
}
