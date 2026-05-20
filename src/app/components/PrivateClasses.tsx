"use client";

import { User } from "lucide-react";
import ClassSection from "@/app/components/ClassSection";

const content = {
  en: {
    title: "Private classes",
    p1: "A personalized practice designed to support your physical, emotional, and spiritual journey. We focus on what your body and soul need: to move, release, rest, strengthen, breathe, and reconnect.",
    p2: "Each session is unique, guided by presence and deep listening, so you can fully inhabit yourself and return to your center.",
    button: "Book a session",
    serviceValue: "Private Classes",
  },
  es: {
    title: "Clases privadas",
    p1: "Una práctica personalizada diseñada para acompañar tu proceso físico, emocional y espiritual. Nos enfocamos en lo que tu cuerpo y alma necesiten: mover, soltar, descansar, fortalecer, respirar y reconectar.",
    p2: "Cada encuentro es único, guiado desde la presencia y la escucha profunda, para que puedas habitarte plenamente y volver a tu centro.",
    button: "Reservar sesión",
    serviceValue: "Clases Privadas",
  },
};

export default function PrivateClasses({ lang = "en" }: { lang?: string }) {
  return (
    <ClassSection
      id="private-classes"
      lang={lang}
      icon={<User size={32} strokeWidth={1.5} />}
      videoSrc="https://res.cloudinary.com/dax4fjnwx/video/upload/q_auto,f_mp4/v1778294474/nati_figi8x.mp4"
      content={content}
      reverse
    />
  );
}