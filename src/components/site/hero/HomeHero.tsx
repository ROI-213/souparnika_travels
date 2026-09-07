import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  Award,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { openEnquiryDialog } from "@/lib/enquiry-dialog";
import { SITE, telLink, waLink } from "@/lib/site-config";

// ─── SLIDER DATA ────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: 0,
    bgImage: "/images/hero/user-hero-1.jpg",
    cardImage: "/images/fleets/urbania-10-seater.jpg",
    mobilePos: "center 60%",
    desktopPos: "center 45%",
    badge: "OUTSTATION & RESORT TOURING",
    category: "SCENIC OUTSTATION TOURING",
    vehicleName: "Force Urbania 10 Seater",
    title: "Mountain Resort & Outstation Luxury",
    desc: "Ideal for Coorg, Ooty, Wayanad, Chikmagalur and Tirupati — comfortable travel for long-distance premium journeys.",
    rate: "₹33/km",
    rateLabel: "Starting Rate",
    specs: ["Pushback Recliners", "AC Vents", "Ambient Light"],
  },
  {
    id: 1,
    bgImage: "/images/hero/user-hero-2.jpg",
    cardImage: "/images/fleets/urbania-12-seater.jpg",
    mobilePos: "center 50%",
    desktopPos: "center 40%",
    badge: "BANGALORE CITY & AIRPORT EXPRESS",
    category: "CITY & AIRPORT TRANSFER",
    vehicleName: "Force Urbania Executive 12 Seater",
    title: "Executive City & Airport Fleet",
    desc: "UB City, Whitefield, Tech Parks, Corporate Events, Weddings and Kempegowda International Airport — on-time, every time.",
    rate: "₹36/km",
    rateLabel: "Starting Rate",
    specs: ["Individual AC", "Spacious Boot", "Soft Leather"],
  },
  {
    id: 2,
    bgImage: "/images/hero/mysore-palace-hero.webp",
    cardImage: "/images/fleets/urbania-maharaja-10-seater-grey.jpg",
    mobilePos: "center 50%",
    desktopPos: "center 40%",
    badge: "HERITAGE & CULTURAL TOURS",
    category: "HERITAGE TOUR PACKAGE",
    vehicleName: "Force Urbania Maharaja 10 Seater",
    title: "Mysore Palace & South India Heritage",
    desc: "Explore Mysore, Coorg, Hampi, and stunning South India heritage destinations in plush recliner-seat luxury vans.",
    rate: "₹38/km",
    rateLabel: "Starting Rate",
    specs: ["VIP Recliners", "Panoramic Glass", "LED Screen"],
  },
  {
    id: 3,
    bgImage: "/images/hero/user-hero-2.jpg",
    cardImage: "/images/fleets/urbania-16-seater-white.jpg",
    mobilePos: "center center",
    desktopPos: "center center",
    badge: "MAHARAJA EXECUTIVE RECLINERS",
    category: "PREMIUM FLEET EXPERIENCE",
    vehicleName: "Force Urbania 16 Seater Luxury",
    title: "Pushback Recliners & Panoramic Interiors",
    desc: "100% Sanitized vehicles with individual AC vents, ambient LED lighting, plush leather seating and professional chauffeurs.",
    rate: "₹38/km",
    rateLabel: "Starting Rate",
    specs: ["16 Recliner Seats", "Twin AC Units", "Chauffeur"],
  },
];

const THUMBS = [
  { slideIndex: 0, label: "Outstation Special", sub: "Hill Station Escapes", image: "/images/hero/user-hero-1.jpg" },
  { slideIndex: 1, label: "City & Airport", sub: "UB City & Airport", image: "/images/hero/user-hero-2.jpg" },
  { slideIndex: 2, label: "Heritage Tours", sub: "Mysore & Hampi", image: "/images/hero/mysore-palace-hero.webp" },
  { slideIndex: 3, label: "Premium Urbania", sub: "Executive Recliners", image: "/images/hero/user-hero-2.jpg" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export function HomeHero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const SLIDE_DURATION = 6000;

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning || idx === current) return;
      setPrev(current);
      setIsTransitioning(true);
      setCurrent(idx);
      setProgress(0);
      setTimeout(() => {
        setPrev(null);
        setIsTransitioning(false);
      }, 950);
    },
    [current, isTransitioning]
  );

  const goNext = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  // Autoplay + progress bar
  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }
    setProgress(0);
    const step = 100 / (SLIDE_DURATION / 50);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 50);
    autoPlayRef.current = setTimeout(() => goNext(), SLIDE_DURATION);
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, isPaused, goNext]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const slide = SLIDES[current];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 pt-2 sm:pt-3 pb-2">
      <section
        aria-label="Hero — Force Urbania Luxury Van Rentals Bangalore"
        className="relative w-full overflow-hidden bg-[#071525] sm:bg-white rounded-2xl sm:rounded-3xl lg:rounded-[2.2rem] shadow-[0_20px_50px_rgba(3,12,24,0.12)] border border-slate-200 sm:border-slate-200"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current !== null) {
            const dx = touchStartX.current - e.changedTouches[0].clientX;
            if (dx > 50) goNext();
            else if (dx < -50) goPrev();
            touchStartX.current = null;
          }
        }}
      >
        {/* ── BACKGROUND IMAGES ─────────────────────────────────────────────── */}
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-[950ms] ease-in-out"
            style={{
              opacity: i === current ? 1 : i === prev ? 0 : 0,
              zIndex: i === current ? 1 : i === prev ? 0 : 0,
            }}
          >
            <img
              src={s.bgImage}
              alt=""
              role="presentation"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[7000ms] ease-out opacity-40 blur-[2px]"
              style={{
                objectPosition: s.desktopPos,
                transform: i === current ? "scale(1.03)" : "scale(1.07)",
              }}
            />
          </div>
        ))}

        {/* ── CINEMATIC OVERLAYS ─────────────────────────────────────────────── */}
        <div aria-hidden="true" className="absolute inset-0 z-[2]"
          style={{ background: "linear-gradient(90deg, rgba(3,12,24,0.98) 0%, rgba(3,12,24,0.92) 40%, rgba(3,12,24,0.7) 70%, rgba(3,12,24,0.45) 100%)" }} />
        <div aria-hidden="true" className="absolute inset-0 z-[3]"
          style={{ background: "linear-gradient(0deg, rgba(3,10,20,0.95) 0%, rgba(3,10,20,0.3) 50%, transparent 80%)" }} />
        <div aria-hidden="true" className="absolute inset-0 z-[3]"
          style={{ background: "radial-gradient(ellipse at 75% 50%, rgba(255,196,0,0.07), transparent 60%)" }} />

        {/* ── MAIN CONTENT CONTAINER ────────────────────────────────────────── */}
        <div className="relative z-10 p-3 sm:p-5 lg:p-6 flex flex-col gap-2.5 sm:gap-4">

          {/* Top Content Row */}
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-5">

            {/* LEFT COLUMN: Badges + Headline + CTAs */}
            <div className="flex-1 max-w-[620px] space-y-2.5">

              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-amber-300"
                  style={{
                    background: "rgba(4,16,31,0.8)",
                    border: "1px solid rgba(255,196,0,0.5)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 4px 18px rgba(0,0,0,0.3)",
                  }}
                >
                  <Award className="h-3 w-3 text-amber-400 shrink-0" />
                  Bangalore's #1 Rated Force Urbania Provider
                </div>

                <div key={`badge-${current}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-amber-400 border border-amber-500/30 bg-amber-500/10 animate-fade-in-up"
                >
                  <Sparkles className="h-2.5 w-2.5 fill-amber-400" />
                  {slide.badge}
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="font-display font-black leading-[1.06] tracking-tight text-white"
                style={{ fontSize: "clamp(24px, 3vw, 42px)", textShadow: "0 4px 24px rgba(0,0,0,0.7)" }}>
                Force{" "}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #FFC400 0%, #FFAA00 50%, #FFD040 100%)" }}>
                  Urbania
                </span>{" "}
                &amp;{" "}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #FFC400 0%, #FFAA00 100%)" }}>
                  Luxury
                </span>{" "}
                Van Rentals in{" "}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #FFC400 0%, #FFAA00 100%)" }}>
                  Bangalore
                </span>
              </h1>

              {/* Dynamic Slide Description */}
              <div key={`title-${current}`} className="space-y-0.5 animate-fade-in-up">
                <p className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">
                  {slide.title}
                </p>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-[540px]">
                  {slide.desc}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => openEnquiryDialog({ source: "hero_cta" })}
                  className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-extrabold text-[#030C18] text-xs sm:text-sm transition-all active:scale-95 cursor-pointer shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #FFC400 0%, #FFAA00 100%)",
                    boxShadow: "0 6px 20px rgba(255,196,0,0.3)",
                  }}
                >
                  Get Instant Quote <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <a href={waLink()} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(34,197,94,0.22)",
                    border: "1px solid rgba(34,197,94,0.45)",
                    backdropFilter: "blur(10px)",
                  }}>
                  <MessageCircle className="h-3.5 w-3.5 text-green-400" />
                  WhatsApp Booking
                </a>

                <a href={telLink()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                  <Phone className="h-3.5 w-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Call: </span>{SITE.phone}
                </a>
              </div>

              {/* Trust Strip */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1.5 border-t border-white/10">
                {[
                  { icon: ShieldCheck, text: "100% Verified Vans", color: "text-emerald-400" },
                  { icon: UserCheck, text: "Professional Chauffeurs", color: "text-amber-400" },
                  { icon: Clock, text: "24/7 Support", color: "text-blue-400" },
                  { icon: CheckCircle2, text: "Zero Hidden Charges", color: "text-purple-400" },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-slate-300">
                    <Icon className={`h-3 w-3 ${color} shrink-0`} />
                    {text}
                  </div>
                ))}
              </div>

              {/* Dynamic Trip Category Highlight Bar */}
              <div key={`info-left-${current}`} className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-xl bg-white/8 border border-amber-500/30 backdrop-blur-md animate-fade-in-up mt-1">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                  {slide.category}
                </div>
                <span className="text-white/30 font-light">|</span>
                <div className="text-xs font-bold text-white truncate max-w-[240px]">{slide.title}</div>
                <span className="text-white/30 font-light">|</span>
                <div className="text-xs font-black text-emerald-400">{slide.rate}</div>
              </div>

              {/* Thumbnail Navigation Strip — hidden on mobile */}
              <div className="overflow-x-auto scrollbar-none pt-2 hidden sm:block">
                <div className="flex gap-2 sm:gap-2.5 w-max">
                  {THUMBS.map((t) => {
                    const isActive = t.slideIndex === current;
                    return (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => goTo(t.slideIndex)}
                        className="flex-none flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl transition-all duration-300 text-left cursor-pointer"
                        style={{
                          background: isActive
                            ? "rgba(255,196,0,0.15)"
                            : "rgba(4,14,28,0.6)",
                          border: isActive
                            ? "1px solid rgba(255,196,0,0.6)"
                            : "1px solid rgba(255,255,255,0.1)",
                          backdropFilter: "blur(12px)",
                          boxShadow: isActive ? "0 0 16px rgba(255,196,0,0.2)" : "none",
                          minWidth: 140,
                        }}
                      >
                        <div className="w-10 h-7 rounded bg-[#071525] overflow-hidden border border-white/10 shrink-0 flex items-center justify-center p-0.5">
                          <img
                            src={t.image}
                            alt={t.label}
                            loading="lazy"
                            className="w-full h-full object-cover rounded"
                            style={{
                              opacity: isActive ? 1 : 0.7,
                            }}
                          />
                        </div>
                        <div className="overflow-hidden">
                          <div className={`text-[10px] font-extrabold truncate ${isActive ? "text-amber-300" : "text-white"}`}>
                            {t.label}
                          </div>
                          <div className="text-[8px] text-slate-400 truncate">{t.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop-only Pagination & Navigation Controls in the Left Column Empty Space */}
              <div className="hidden lg:flex items-center justify-between max-w-[340px] pt-3.5 border-t border-white/10 mt-2">
                {/* Slide Progress Indicator */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-amber-400 tabular-nums">
                    {String(current + 1).padStart(2, "0")}
                  </span>
                  <div className="w-20 sm:w-24 h-0.5 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 tabular-nums">
                    {String(SLIDES.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Prev / Next Arrows */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={goPrev}
                    className="h-7 w-7 rounded-full grid place-items-center transition-all hover:bg-white/20 active:scale-95 cursor-pointer"
                    style={{
                      background: "rgba(4,14,28,0.65)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <ChevronLeft className="h-3.5 w-3.5 text-white" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={goNext}
                    className="h-7 w-7 rounded-full grid place-items-center transition-all hover:bg-amber-400/30 active:scale-95 cursor-pointer"
                    style={{
                      background: "rgba(4,14,28,0.65)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Featured Vehicle Card Box */}
            <div className="w-full lg:w-[460px] shrink-0">
              <div key={`veh-hero-box-${current}`}
                className="w-full rounded-2xl p-4 sm:p-5 bg-[#051326]/95 border border-amber-500/40 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col gap-3.5 animate-fade-in-up"
              >
                {/* Top Header inside Vehicle Card */}
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
                    </div>
                    <span className="text-sm font-black text-white">4.9/5</span>
                    <span className="text-xs text-slate-400 font-medium">(1.2k+ Journeys)</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/50 shadow-sm">
                    Luxury Fleet
                  </span>
                </div>

                {/* Main Featured Vehicle Image Box (ENLARGED) */}
                <div className="relative w-full h-44 sm:h-64 lg:h-72 rounded-2xl overflow-hidden border border-white/20 bg-slate-900 group shadow-inner">
                  <img
                    src={slide.cardImage}
                    alt={slide.vehicleName}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030C18] via-transparent to-transparent opacity-85" />

                  {/* Vehicle Tag Badge */}
                  <div className="absolute top-3 left-3 bg-[#030C18]/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-black text-amber-300 border border-amber-400/40 shadow-lg">
                    {slide.vehicleName}
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 bg-emerald-500/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs sm:text-sm font-black text-white shadow-lg">
                    {slide.rate}
                  </div>
                </div>

                {/* Vehicle Specs & Features */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-extrabold text-white">{slide.vehicleName}</div>
                    <div className="text-xs font-bold text-amber-400">{slide.rate}</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {slide.specs.map((spec) => (
                      <span key={spec} className="text-[9px] font-bold text-slate-300 bg-white/8 px-1.5 py-0.5 rounded border border-white/10">
                        ✓ {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => openEnquiryDialog({ source: "hero_vehicle_box_primary" })}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-[#030C18] text-xs font-black hover:from-amber-300 hover:to-amber-400 transition-all shadow-md active:scale-95 cursor-pointer text-center"
                  >
                    Instant Quote
                  </button>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-3 rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-green-500/30 text-xs font-bold transition-all flex items-center gap-1 shrink-0"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Book
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Progress & Pagination Controls — Mobile only at bottom */}
          <div className="flex lg:hidden items-center justify-between max-w-[340px] pt-1 sm:pt-2 border-t border-white/5 mt-1.5">
            {/* Slide Progress Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-amber-400 tabular-nums">
                {String(current + 1).padStart(2, "0")}
              </span>
              <div className="w-20 sm:w-24 h-0.5 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-500 tabular-nums">
                {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={goPrev}
                className="h-7 w-7 rounded-full grid place-items-center transition-all hover:bg-white/20 active:scale-95 cursor-pointer"
                style={{
                  background: "rgba(4,14,28,0.65)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <ChevronLeft className="h-3.5 w-3.5 text-white" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={goNext}
                className="h-7 w-7 rounded-full grid place-items-center transition-all hover:bg-amber-400/30 active:scale-95 cursor-pointer"
                style={{
                  background: "rgba(255,196,0,0.18)",
                  border: "1px solid rgba(255,196,0,0.45)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <ChevronRight className="h-3.5 w-3.5 text-amber-300" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
