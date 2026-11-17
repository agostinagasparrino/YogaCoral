import { MapPin } from "lucide-react"; // Importamos solo los iconos necesarios
import Link from "next/link";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

export default function Footer({ lang = "en" }: { lang?: "es" | "en" }) {
  return (
    // Mantenemos el fondo navy y texto blanco original
    <footer className="bg-[#f6f4f0] text-[#b89589] border-t border-[#b89589]/20">

      {/* Contenedor principal: Max-width estándar, centrado, padding vertical reducido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Flex container: En móvil se apila (col), en sm+ se pone en fila y separa */}
        <div data-scroll-reveal className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">

          {/* 1. SECCIÓN LOGO */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src={"/images/logo.png"}
                alt="Coral Reef Logo"
                width={160}
                height={60}
                className="h-22 md:h-24 w-auto"
                priority
              />
            </Link>
          </div>

          {/* 2. SECCIÓN INFO (Instagram y Ubicación) */}
          {/* Otro flex container para alinear iconos y texto */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-[#b89589]/100">

            <a
              href="https://www.instagram.com/natiyogacoral/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-[#b89589] transition-colors duration-200"
            >
              {/* Icono de Instagram de Lucide */}
              <FaInstagram size={18} className="text-coral" />
              <span>natiyogacoral</span>
            </a>

            <span className="hidden sm:block text-[#b89589]/100" aria-hidden="true">|</span>

            <a
              href="https://www.instagram.com/natiyogacoral/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-[#b89589] transition-colors duration-200"
            >
              <MapPin size={18} className="text-coral" />
              <span>Malta</span>
            </a>
          </div>

        </div>
        <div className="mt-8 pt-6 text-center text-xs text-[#b89589]/90">
          <p>© {new Date().getFullYear()} Coral Reef</p>
          <p data-scroll-reveal className="mt-6 border-t border-[#b89589]/20 pt-4 flex flex-wrap items-center justify-center gap-2 text-[#785e4c]">
            <span>{lang === "es" ? "Desarrollado por" : "Developed by"}</span>
            <a href="https://minthera-landing.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-sm font-medium motion-safe:transition-colors hover:text-[#985f43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#985f43]">
              <svg viewBox="0 0 122.5 82.5" fill="currentColor" aria-hidden="true" className="h-5 w-auto shrink-0"><path d="M32 0L105.7 0L110.3 6L93.5 6L84.2 13.8L48.4 13.8ZM0 0L0 82.5L14.5 82.5L14.5 16.9L47.5 44.6L58.8 35.1L17 0ZM68.5 18.2L79 18.2L66.3 28.8L61.1 24.4ZM23.8 37.3L23.8 56.3L47.5 76.2L103 29.6L116.5 40L120.5 48.5L109 44.1L107 44.1L107 82.5L122.5 82.5L122.5 14L99 14L47.5 57.2ZM82.5 59.4L96.5 47.7L96.5 82.5L82.5 82.5ZM55 82.5L72.5 67.8L72.5 82.5Z"></path></svg>
              <span>Minthera</span>
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}