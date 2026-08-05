import { useState, useEffect, useRef } from "react";
import {
  Armchair,
  Maximize,
  Snowflake,
  UserCheck,
  ShieldCheck,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Headphones,
  MapPin,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Armchair,
    title: "Comfortable Seating",
    description: "Ergonomic pushback seats with ample legroom, headrests, and armrests for relaxed highway travel.",
    highlight: "Pushback Recliners",
  },
  {
    icon: Maximize,
    title: "Spacious Interiors",
    description: "Generous headroom, dedicated luggage space, and wide panoramic windows for group comfort.",
    highlight: "Tall Standing Height",
  },
  {
    icon: Snowflake,
    title: "Air Conditioning",
    description: "Powerful multi-zone AC vents in every row ensuring uniform cooling across all weather conditions.",
    highlight: "Dual Roof Vents",
  },
  {
    icon: UserCheck,
    title: "Professional Drivers",
    description: "Experienced, background-checked chauffeurs trained in safe highway and hill station driving.",
    highlight: "Uniformed & Verified",
  },
  {
    icon: ShieldCheck,
    title: "Advanced Safety",
    description: "Regularly serviced vehicles equipped with airbags, ABS, GPS tracking, and first aid kits.",
    highlight: "GPS & Speed Governor",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Booking",
    description: "Easy online booking, customized trip itineraries, 24/7 support, and hassle-free cancellation options.",
    highlight: "Zero Hidden Charges",
  },
  {
    icon: Headphones,
    title: "24/7 Trip Support",
    description: "Dedicated dispatch and customer support team active around the clock during your journey.",
    highlight: "Instant Assistance",
  },
  {
    icon: MapPin,
    title: "Pan-South India Permits",
    description: "All-India tourist permits for seamless inter-state travel across Karnataka, Kerala, Tamil Nadu, and Goa.",
    highlight: "Hassle-free Toll & Tax",
  },
];

export function PremiumFeatures() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef<number | null>(null);

  // Responsive breakpoint listener for visible cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, features.length - visibleCount);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const stepPercent = 100 / visibleCount;

  return (
    <section
      className="py-16 sm:py-20 lg:py-28 bg-[#071525] text-white border-y border-slate-800 relative overflow-hidden"
      id="premium-features"
    >
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-widest shadow-inner">
            <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
            <span>WHY WE STAND OUT</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Premium Features &amp; Comforts
          </h2>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
            Experience uncompromised comfort, safety, and convenience with our professionally maintained fleet.
          </p>
        </div>

        {/* Carousel Outer Container */}
        <div
          className="relative group px-1 sm:px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Carousel Outer Frame */}
          <div className="overflow-hidden py-2 sm:py-4 -mx-2 px-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * stepPercent}%)`,
              }}
            >
              {features.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={`${item.title}-${idx}`}
                    className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2 sm:px-3 flex flex-col"
                  >
                    <div className="h-full rounded-2xl bg-[#0B1E36]/90 border border-white/15 p-5 sm:p-7 shadow-xl hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-md group/card">
                      <div>
                        <div className="flex items-center justify-between mb-4 sm:mb-5">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-400 grid place-items-center group-hover/card:bg-amber-400 group-hover/card:text-slate-950 transition-all duration-300 shadow-md">
                            <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2]" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                            {item.highlight}
                          </span>
                        </div>

                        <h3 className="font-display font-extrabold text-base sm:text-xl text-white group-hover/card:text-amber-400 transition-colors mb-2">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400">
                        <span>Souparnika Standard</span>
                        <span className="text-amber-400">Included ✓</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Manual Left & Right Navigation Arrows */}
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 -left-2 -right-2 sm:-left-4 sm:-right-4 pointer-events-none z-20">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 sm:p-3 rounded-full bg-slate-900/90 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 transition-all pointer-events-auto shadow-xl cursor-pointer"
              aria-label="Previous Feature"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 sm:p-3 rounded-full bg-slate-900/90 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 transition-all pointer-events-auto shadow-xl cursor-pointer"
              aria-label="Next Feature"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Carousel Slide Dots Indicator Bar */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-6 sm:pt-8 flex-wrap">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === currentIndex
                    ? "w-6 sm:w-8 bg-amber-400 shadow-md shadow-amber-400/30"
                    : "w-2 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
