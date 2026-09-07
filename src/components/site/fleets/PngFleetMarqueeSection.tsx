import { openEnquiryDialog } from "@/lib/enquiry-dialog";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export const PNG_FLEETS = [
  {
    name: "9 / 10 / 12 / 16 Seater Force Urbania",
    category: "ULTRA LUXURY URBANIA",
    image: "/images/urbania-side-view.png",
    seating: "9, 10, 12, 16 Seats",
    package: "Per KM / Local Package",
    rate: "₹25/km onwards",
    tag: "MOST POPULAR",
    badgeBg: "bg-amber-500 text-slate-950",
  },
  {
    name: "Toyota Innova Crysta",
    category: "PREMIUM MPV",
    image: "/images/fleets/cars/crysta-side-view.png",
    seating: "6+1 Seater",
    package: "8 Hours / 80 KM",
    rate: "₹3,500/- (Extra Hr: ₹200)",
    tag: "BEST SELLER",
    badgeBg: "bg-blue-600 text-white",
  },
  {
    name: "Toyota Innova Hycross Hybrid",
    category: "HYBRID LUXURY MPV",
    image: "/images/fleets/cars/innova-new.png",
    seating: "6+1 Seater",
    package: "8 Hours / 80 KM",
    rate: "₹3,750/- (Extra Hr: ₹250)",
    tag: "HYBRID LOUNGE",
    badgeBg: "bg-emerald-600 text-white",
  },
  {
    name: "Toyota Fortuner",
    category: "ROYAL SUV",
    image: "/images/fleets/cars/suv-new.png",
    seating: "6+1 Seater",
    package: "8 Hours / 80 KM",
    rate: "₹6,500/- (Extra Hr: ₹650)",
    tag: "VIP EXECUTIVE",
    badgeBg: "bg-purple-600 text-white",
  },
  {
    name: "Ertiga",
    category: "BUDGET MPV",
    image: "/images/fleets/cars/sedan-new.png",
    seating: "6+1 Seater",
    package: "8 Hours / 80 KM",
    rate: "₹2,600/- (Extra Hr: ₹180)",
    tag: "ECONOMICAL",
    badgeBg: "bg-sky-600 text-white",
  },
  {
    name: "12 Seater Tempo Traveller",
    category: "GROUP TRAVELER",
    image: "/images/fleets/tempo/tempo-12-new.png",
    seating: "12 Seater",
    package: "8 Hours / 80 KM",
    rate: "₹5,000/- (Extra Hr: ₹250)",
    tag: "FAMILY TOURS",
    badgeBg: "bg-amber-600 text-white",
  },
  {
    name: "9 Seater Tempo Traveller",
    category: "VIP RECLINER TEMPO",
    image: "/images/fleets/tempo/tempo-17-new.png",
    seating: "9 Seater",
    package: "8 Hours / 80 KM",
    rate: "₹6,000/- (Extra Hr: ₹300)",
    tag: "MAHARAJA RECLINERS",
    badgeBg: "bg-indigo-600 text-white",
  },
  {
    name: "Luxury Recliner Tempo Traveller",
    category: "LUXURY CABIN",
    image: "/images/fleets/tempo/tempo-luxury-new.png",
    seating: "10-15 Seats",
    package: "Outstation & City",
    rate: "₹30/km onwards",
    tag: "PREMIUM COMFORT",
    badgeBg: "bg-slate-800 text-amber-400 border border-amber-400/30",
  },
];

export function PngFleetMarqueeSection() {
  // Duplicate array to create endless infinite marquee effect
  const marqueeItems = [...PNG_FLEETS, ...PNG_FLEETS];

  return (
    <section className="py-16 sm:py-20 bg-slate-950 text-white overflow-hidden border-y border-slate-800">
      <div className="max-w-7xl mx-auto container-p mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3">
          <Sparkles className="h-3.5 w-3.5 fill-amber-400 animate-pulse" />
          OUR FLEET GALLERY
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
          Continuously Sliding <span className="text-amber-400">PNG Fleet Showcase</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl mx-auto">
          Browse our entire luxury vehicle collection featuring transparent PNG previews and updated rates. Hover over any card to pause.
        </p>
      </div>

      {/* Infinite Continuous Horizontal Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Side Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee space-x-6 py-4">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="w-[280px] sm:w-[320px] shrink-0 rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 flex flex-col justify-between hover:border-amber-400/60 hover:shadow-[0_10px_30px_rgba(244,176,0,0.15)] hover:-translate-y-1.5 transition-all duration-300 group"
            >
              {/* Top Tag & Category */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm ${item.badgeBg}`}>
                  {item.tag}
                </span>
              </div>

              {/* PNG Transparent Vehicle Image Box */}
              <div className="relative h-40 w-full flex items-center justify-center py-2 bg-gradient-to-b from-slate-800/50 to-slate-950/70 rounded-2xl border border-slate-800/80 group-hover:bg-amber-400/10 transition-colors">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-32 w-auto object-contain filter drop-shadow-[0_10px_12px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Vehicle Title & Details */}
              <div className="mt-4 space-y-2">
                <h3 className="font-display font-black text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{item.seating}</span>
                  </div>
                  <div className="text-emerald-400 font-extrabold">
                    {item.rate}
                  </div>
                </div>
              </div>

              {/* Quick Action Button */}
              <button
                onClick={() => openEnquiryDialog({ defaultVehicle: item.name })}
                className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Instant Quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
