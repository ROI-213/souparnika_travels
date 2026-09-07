import { useState, useEffect } from "react";
import { CheckCircle2, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { openEnquiryDialog } from "@/lib/enquiry-dialog";

const URBANIA_SLIDING_FLEETS = [
  {
    image: "/images/fleets/urbania-12-seater.jpg",
    name: "12 Seater Force Urbania",
    desc: "Spacious 12-seater Force Urbania with 2x1 seating layout, premium recliners, and powerful multi-zone AC.",
    tag: "MOST POPULAR FLEET",
  },
  {
    image: "/images/fleets/urbania-10-seater.jpg",
    name: "10 Seater Force Urbania",
    desc: "Executive 10-seater Force Urbania with plush pushback recliners, individual AC vents, and ambient LED lighting.",
    tag: "EXECUTIVE 10 SEATER",
  },
  {
    image: "/images/fleets/urbania-maharaja-10-seater.jpg",
    name: "10 Seater Urbania Maharaja VIP",
    desc: "Maharaja edition 10-seater Urbania with extra-wide sofa recliners, calf rests, and VIP privacy glass.",
    tag: "MAHARAJA VIP EDITION",
  },
  {
    image: "/images/fleets/urbania-maharaja-12-seater.jpg",
    name: "12 Seater Urbania Maharaja Executive",
    desc: "Luxury Maharaja 12-seater Urbania van built for high-end family tours and executive VIP transport.",
    tag: "ROYAL MAHARAJA COLLECTION",
  },
  {
    image: "/images/fleets/urbania-16-seater.jpg",
    name: "16 Seater Force Urbania",
    desc: "High-capacity 16-seater Force Urbania van offering supreme group comfort for outstation tours and events.",
    tag: "GROUP TRAVELER 16 SEATER",
  },
];

const trustPoints = [
  "Clean and well-maintained vehicles",
  "Experienced, background-verified drivers",
  "Transparent pricing with zero hidden charges",
  "24/7 booking & on-trip emergency assistance",
  "Flexible custom travel options & itineraries",
  "Fast customer support via Call and WhatsApp",
];

const statistics = [
  { value: "12+", label: "Years of Experience" },
  { value: "60,000+", label: "Successful Trips" },
  { value: "25,000+", label: "Happy Customers" },
  { value: "80+", label: "Vehicles Available" },
];

export function WhyUsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % URBANIA_SLIDING_FLEETS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? URBANIA_SLIDING_FLEETS.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % URBANIA_SLIDING_FLEETS.length);
  };

  const currentFleet = URBANIA_SLIDING_FLEETS[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 text-slate-900 border-y border-slate-200/80" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Split Layout Container */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 5 Urbania Images Continuously Sliding Showcase Card */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/5] bg-slate-950">
              {/* 5 Full-Bleed Urbania Fleet Images */}
              {URBANIA_SLIDING_FLEETS.map((fleet, index) => (
                <div
                  key={fleet.name}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
                  }`}
                >
                  <img
                    src={fleet.image}
                    alt={fleet.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/90 via-[#071525]/20 to-transparent" />
                </div>
              ))}

              {/* Top Category Tag Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md">
                  {currentFleet.tag}
                </span>
              </div>

              {/* Left / Right Carousel Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 z-20 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-slate-950/70 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 transition-all pointer-events-auto shadow-lg cursor-pointer"
                  aria-label="Previous Vehicle"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-full bg-slate-950/70 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 transition-all pointer-events-auto shadow-lg cursor-pointer"
                  aria-label="Next Vehicle"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Bottom Card Overlay Badge with Dynamic Urbania Details & 5 Indicator Dots */}
              <div className="absolute bottom-6 left-6 right-6 z-20 rounded-2xl bg-[#071525]/85 backdrop-blur-md border border-white/20 p-4 shadow-xl text-white">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="text-base font-extrabold text-amber-400 truncate">
                    {currentFleet.name}
                  </div>
                  <div className="text-[10px] font-bold text-slate-300 shrink-0">
                    {currentIndex + 1} / {URBANIA_SLIDING_FLEETS.length}
                  </div>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed line-clamp-2">
                  {currentFleet.desc}
                </p>

                {/* 5 Carousel Indicator Dots */}
                <div className="flex items-center gap-1.5 pt-3">
                  {URBANIA_SLIDING_FLEETS.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setCurrentIndex(dotIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        dotIdx === currentIndex ? "w-6 bg-amber-400" : "w-1.5 bg-white/40 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Description, Checklist, CTA */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-amber-600 bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/30">
              THE SOUPARNIKA ADVANTAGE
            </span>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#071525] leading-tight">
              Why Choose Us?
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              At Souparnika Travels, we combine modern vehicle rentals with traditional Indian hospitality. Whether you need an executive Force Urbania for family tours or an Innova for business travel, we ensure every mile is smooth, safe, and memorable.
            </p>

            {/* Checklist */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-2.5 bg-white border border-slate-200/90 p-3.5 rounded-xl shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-slate-800">{point}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => openEnquiryDialog({ source: "why_choose_us" })}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#071525] font-extrabold text-sm transition-all shadow-md cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Enquire Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Continuous Sliding Statistics Marquee Bar */}
        <div className="mt-16 pt-10 border-t border-slate-200/90 relative overflow-hidden">
          {/* Subtle gradient side fades for smooth marquee look */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 sm:gap-8 items-center py-2">
            {[...statistics, ...statistics, ...statistics, ...statistics].map((stat, idx) => (
              <div
                key={`${stat.label}-${idx}`}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow shrink-0 min-w-[220px] sm:min-w-[260px]"
              >
                <div className="font-display font-black text-3xl sm:text-4xl text-amber-500 tracking-tight shrink-0">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-700 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
