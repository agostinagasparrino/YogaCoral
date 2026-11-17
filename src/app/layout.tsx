import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Títulos: Súper moderna, limpia y "cara"
const titlesFont = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-titles",
  weight: "500 700",
  display: "swap",
});

// Cuerpo: El que te gustó
const bodyFont = localFont({
  src: "./fonts/outfit-latin.woff2",
  variable: "--font-body",
  weight: "300 400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coral Reef",
  description: "Coral Reef Yoga",
  icons: {
    icon: "/images/logoIcon.png",
    shortcut: "/images/logoIcon.png",
    apple: "/images/logoIcon.png",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${titlesFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
