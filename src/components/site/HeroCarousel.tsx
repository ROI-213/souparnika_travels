import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Phone, MessageCircle, Sparkles } from "lucide-react";
import type { HeroSlide } from "@/lib/queries";
import { SITE, telLink, waLink } from "@/lib/site-config";
import { openEnquiryDialog } from "@/lib/enquiry-dialog";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80";

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const list = slides.length > 0 ? slides : [
    {
      id: "fallback",
      badge: "Trusted Travel Partner in Bengaluru",
      heading: "Travel Comfortably with",
      highlight_word: "Souparnika Travels",
      rotating_words: ["Local Journeys", "Airport Transfers", "Family Holidays"],
      description:
        "Reliable vehicles, experienced drivers and thoughtfully planned journeys.",
      desktop_image: FALLBACK_IMAGE,
      tablet_image: null,
      mobile_image: null,
      video_url: null,
      primary_cta_label: "Book Your Journey",
      primary_cta_url: "/booking",
      secondary_cta_label: "Explore Our Fleets",
      secondary_cta_url: "/fleets",
      overlay_color: "#071B33",
      overlay_opacity: 0.55,
      text_position: "left",
      duration_ms: 6000,
      display_order: 1,
      is_active: true,
    } satisfies HeroSlide,
  ];

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const slide = list[idx];

  useEffect(() => {
    if (paused || list.length <= 1) return;
    const ms = slide.duration_ms ?? 6000;
    timer.current = window.setTimeout(() => setIdx((i) => (i + 1) % list.length), ms);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [idx, paused, list.length, slide.duration_ms]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[color:var(--brand-navy)]"
      style={{ minHeight: "min(90vh, 780px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {list.map((s, i) => (
        <SlideView key={s.id} slide={s} active={i === idx} />
      ))}

      {list.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => setIdx((i) => (i - 1 + list.length) % list.length)}
            className="hidden md:grid place-items-center absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => setIdx((i) => (i + 1) % list.length)}
            className="hidden md:grid place-items-center absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-8 bg-[color:var(--brand-gold)]" : "w-4 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function SlideView({ slide, active }: { slide: HeroSlide; active: boolean }) {
  const img = slide.desktop_image || slide.tablet_image || slide.mobile_image || FALLBACK_IMAGE;
  const mobile = slide.mobile_image || img;
  const overlay = slide.overlay_color ?? "#071B33";
  const opacity = slide.overlay_opacity ?? 0.55;
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${active ? "opacity-100 z-10" : "opacity-0 z-0"}`}
      aria-hidden={!active}
    >
      <picture>
        <source media="(max-width: 640px)" srcSet={mobile} />
        <img
          src={img}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover ${active ? "animate-hero-zoom" : ""}`}
        />
      </picture>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${overlay}${toHexOpacity(opacity * 0.8)} 0%, ${overlay}${toHexOpacity(opacity)} 100%)`,
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto container-p flex items-center min-h-[min(90vh,780px)] py-24">
        <div className="max-w-2xl text-white">
          {slide.badge && (
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] mb-6 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--brand-gold)]" />
              {slide.badge}
            </div>
          )}
          <h1 className="font-display font-black leading-[1.02] text-4xl md:text-5xl lg:text-6xl tracking-tight">
            {slide.heading}
            {slide.highlight_word && (
              <>
                {" "}
                <span className="text-[color:var(--brand-gold)]">{slide.highlight_word}</span>
              </>
            )}
            {slide.rotating_words && slide.rotating_words.length > 0 && (
              <span className="block mt-2 text-2xl md:text-3xl lg:text-4xl font-bold text-white/90">
                for <RotatingWord words={slide.rotating_words} active={active} />
              </span>
            )}
          </h1>
          {slide.description && (
            <p className="mt-5 text-base md:text-lg text-white/85 max-w-xl">{slide.description}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {slide.primary_cta_label && (
              <CTAButton to={slide.primary_cta_url} variant="gold">
                {slide.primary_cta_label}
                <ArrowRight className="h-4 w-4" />
              </CTAButton>
            )}
            {slide.secondary_cta_label && (
              <CTAButton to={slide.secondary_cta_url} variant="ghost">
                {slide.secondary_cta_label}
              </CTAButton>
            )}
            <button
              type="button"
              onClick={() => openEnquiryDialog({ source: "home_hero" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[color:var(--brand-navy)] text-sm font-bold hover:bg-white/90"
            >
              Enquire Now
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs md:text-sm">
            <a href={telLink()} className="inline-flex items-center gap-2 text-white/90 hover:text-[color:var(--brand-gold)]">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/90 hover:text-[color:var(--brand-gold)]">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <ul className="mt-8 hidden sm:flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/75">
            {["Professional Drivers", "Clean Vehicles", "On-Time Pickup", "24/7 Support"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-gold)]" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CTAButton({
  children,
  to,
  variant,
}: {
  children: React.ReactNode;
  to: string | null | undefined;
  variant: "gold" | "ghost";
}) {
  const cls =
    variant === "gold"
      ? "bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] hover:brightness-95"
      : "bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/25";
  const inner = (
    <span className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold ${cls}`}>{children}</span>
  );
  if (!to) return <span>{inner}</span>;
  if (to.startsWith("http")) {
    return (
      <a href={to} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return <Link to={to}>{inner}</Link>;
}

function RotatingWord({ words, active }: { words: string[]; active: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => window.clearInterval(t);
  }, [active, words.length]);
  return (
    <span key={i} className="inline-block text-[color:var(--brand-gold)] animate-fade-in">
      {words[i]}
    </span>
  );
}

function toHexOpacity(o: number) {
  const v = Math.round(Math.max(0, Math.min(1, o)) * 255)
    .toString(16)
    .padStart(2, "0");
  return v;
}
