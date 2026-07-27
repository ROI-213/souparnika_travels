import { Users, ShieldCheck } from "lucide-react";

export function HeroArtwork() {
  return (
    <>
      <div className="hero-artwork" aria-hidden="true">
        <img
          src="/images/hero/mysore-palace-hero.webp"
          alt=""
          className="hero-palace-image"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Floating Badges (Desktop Only) */}
      <div className="happy-travellers-badge hidden lg:flex animate-[floating_6s_ease-in-out_infinite] bg-white/95 backdrop-blur rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-3.5 items-center gap-3 border border-white">
        <div className="h-10 w-10 rounded-full bg-[#fbf8f1] flex items-center justify-center text-[#c9922e] shrink-0">
          <Users className="h-5 w-5" />
        </div>
        <div className="pr-2">
          <div className="font-bold text-[#171914] leading-tight text-sm">20,000+</div>
          <div className="text-[10px] text-[#62645f] mt-0.5">Happy Travelers</div>
        </div>
      </div>

      <div className="trusted-badge hidden lg:flex animate-[floating_7s_ease-in-out_infinite_reverse] bg-[#bd8b31]/95 backdrop-blur shadow-[0_8px_30px_rgb(201,146,46,0.3)] items-center justify-center border border-white/20 text-white flex-col gap-1.5">
        <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
        <div className="text-[9px] font-bold text-center leading-[1.2] uppercase tracking-[0.1em] opacity-90">
          Trusted<br />Since 2013
        </div>
      </div>
    </>
  );
}
