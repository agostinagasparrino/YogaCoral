"use client";

import { Users } from "lucide-react";
import ClassSection from "@/app/components/ClassSection";

const content = {
  en: {
    title: "Group classes",
    p1: "More than just a space for movement, it’s a ritual of connection. Each practice is guided with presence, deep listening, and truth.",
    p2: "You don’t need any experience, just your willingness to breathe, feel, and come back to yourself. Because when the body awakens, the soul does too. And that’s where the magic begins.",
    button: "Book a session",
    serviceValue: "Group Classes",
  },
  es: {
    title: "Clases grupales",
    p1: "Más que un espacio de movimiento, es un ritual de conexión. Cada práctica es guiada con presencia, escucha profunda y verdad.",
    p2: "No necesitas experiencia, solo tu voluntad de respirar, sentir y volver a ti. Porque cuando el cuerpo despierta, el alma también lo hace. Y ahí es donde comienza la magia.",
    button: "Reservar sesión",
    serviceValue: "Clases Grupales",
  },
};

export default function GroupClasses({ lang = "en" }: { lang?: string }) {
  return (
    <ClassSection
      id="group-classes"
      lang={lang}
      icon={<Users size={32} strokeWidth={1.5} />}
      videoSrc="https://res.cloudinary.com/dax4fjnwx/video/upload/q_auto,f_mp4/v1778294524/group2_vxcqrc.mp4"
      content={content}
    />
  );
}