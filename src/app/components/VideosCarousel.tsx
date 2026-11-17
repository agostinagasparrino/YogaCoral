"use client";

const mediaItems = [
  { type: "image", src: "/images/carousel1.PNG" },
  {
    type: "video",
    src: "https://res.cloudinary.com/dax4fjnwx/video/upload/q_auto,f_mp4/v1778294575/carousel2_saietv.mp4",
  },
  { type: "image", src: "/images/carousel3.PNG" },
  {
    type: "video",
    src: "https://res.cloudinary.com/dax4fjnwx/video/upload/q_auto,f_mp4/v1778294529/carousel4_tfwruq.mp4",
  },
  { type: "image", src: "/images/carousel5.PNG" },
  {
    type: "video",
    src: "https://res.cloudinary.com/dax4fjnwx/video/upload/q_auto,f_mp4/v1778295390/carousel6_lepu76.mp4",
  },
];

export default function VideosCarousel({ lang = "en" }: { lang?: "es" | "en" }) {
  const loopMedia = [...mediaItems, ...mediaItems];

  return (
    <section aria-labelledby="practice-title" className="w-full py-16 bg-[#fdfbf9] overflow-hidden">
      <div className="mx-auto mb-8 max-w-6xl px-6 text-[#69483e] md:px-10">
        <h2 id="practice-title" style={{ fontFamily: "Georgia, serif", fontWeight: 400 }} className="mb-4 text-4xl leading-tight md:text-5xl">
          {lang === "es" ? "Un poco de mi práctica" : "A glimpse of my practice"}
        </h2>
        <p className="text-base leading-relaxed md:text-lg">
          {lang === "es" ? "Momentos para mover, respirar y conectar." : "Moments to move, breathe and connect."}
        </p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max gap-6 animate-carousel">
          {loopMedia.map((item, index) => (
            <div
              key={index}
              className="w-[280px] md:w-[360px] lg:w-[420px] shrink-0"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-xl bg-black/10">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={`Carousel item ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}