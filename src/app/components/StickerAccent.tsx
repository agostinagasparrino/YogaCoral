import Image from "next/image";
import { Heart, Leaf, Sun } from "lucide-react";

type StickerAccentProps = {
  food: "berry" | "tart" | "green";
  side?: "left" | "right";
  detail?: "sun" | "leaf" | "heart";
};

export default function StickerAccent({ food, side = "left", detail = "leaf" }: StickerAccentProps) {
  const Detail = detail === "sun" ? Sun : detail === "heart" ? Heart : Leaf;
  return (
    <div aria-hidden="true" className="pointer-events-none relative z-10 h-12 select-none bg-[#fdfbf9] md:h-16">
      <div className="relative mx-auto h-full max-w-6xl">
        <Image
          src={`/images/stickers/${food}.webp`}
          alt=""
          width={160}
          height={160}
          sizes="(min-width: 768px) 144px, 88px"
          className={`absolute top-1/2 h-22 w-22 -translate-y-1/2 object-contain drop-shadow-md md:h-36 md:w-36 ${side === "left" ? "left-6 -rotate-12 md:left-12" : "right-6 rotate-12 md:right-12"}`}
        />
        <span className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-[40%] border-[3px] border-white bg-[#f4eae3] text-[#985f43] shadow-sm md:h-16 md:w-16 ${side === "left" ? "right-10 rotate-12 md:right-24" : "left-10 -rotate-12 md:left-24"}`}>
          <Detail className="h-6 w-6 md:h-9 md:w-9" strokeWidth={1.2} />
        </span>
      </div>
    </div>
  );
}
