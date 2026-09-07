import { useState, useEffect } from "react";
import { Star, ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { openEnquiryDialog } from "@/lib/enquiry-dialog";
import { waLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export interface ShowcaseVehicleItem {
  id: string;
  name: string;
  category: string;
  image: string;
  seating: string;
  rateTag: string;
  features: string[];
}

export const URBANIA_SHOWCASE_FLEETS: ShowcaseVehicleItem[] = [
  {
    id: "urb-10",
    name: "10 Seater Force Urbania",
    category: "EXECUTIVE VAN",
    image: "/images/fleets/urbania-10-seater.jpg",
    seating: "10+1 seater",
    rateTag: "Best Standard Rate",
    features: [
      "10 Aircraft-Style Reclining Seats",
      "Individual Passenger AC Vents & Lamps",
      "USB Quick Charging at Every Seat",
    ],
  },
  {
    id: "urb-12",
    name: "12 Seater Force Urbania",
    category: "LUXURY URBANIA",
    image: "/images/fleets/urbania-12-seater.jpg",
    seating: "12+1 seater",
    rateTag: "Best Standard Rate",
    features: [
      "2x1 Ergonomic Recliner Seating",
      "Dual Evaporator Air Conditioning",
      "Sealed Panoramic Glass Windows",
    ],
  },
  {
    id: "urb-10-mah",
    name: "10 Seater Urbania Maharaja VIP",
    category: "VIP MAHARAJA EDITION",
    image: "/images/fleets/urbania-maharaja-10-seater.jpg",
    seating: "10+1 seater",
    rateTag: "Best Standard Rate",
    features: [
      "Maharaja Sofa Recliners with Calf Rests",
      "Smart HD LED Screen & Streaming",
      "Onboard Refrigerator & Mood Glow",
    ],
  },
  {
    id: "urb-12-mah",
    name: "12 Seater Urbania Maharaja Executive",
    category: "ROYAL MAHARAJA COLLECTION",
    image: "/images/fleets/urbania-maharaja-12-seater.jpg",
    seating: "12+1 seater",
    rateTag: "Best Standard Rate",
    features: [
      "Italian Leather Maharaja Pushback Seats",
      "Ambient Mood Lighting & Wood Accents",
      "Individual Passenger AC Outlets",
    ],
  },
  {
    id: "urb-16",
    name: "16 Seater Force Urbania",
    category: "GROUP TRAVELER 16 SEATER",
    image: "/images/fleets/urbania-16-seater.jpg",
    seating: "16+1 seater",
    rateTag: "Best Standard Rate",
    features: [
      "16 Comfortable Pushback Recliners",
      "Heavy Luggage Boot & Roof Carrier",
      "Premium Surround Audio System",
    ],
  },
];

export const DEFAULT_SHOWCASE_VEHICLES: ShowcaseVehicleItem[] = [
  {
    id: "crysta",
    name: "Toyota Innova Crysta",
    category: "PREMIUM MPV",
    image: "/images/fleets/cars/innova-crysta.jpg",
    seating: "6+1 seater",
    rateTag: "₹3,500/day onwards",
    features: ["Captain Recliner Seats", "Dual Evaporator Rear AC", "Plush Leatherette Interior"],
  },
  {
    id: "hycross",
    name: "Toyota Innova Hycross Hybrid",
    category: "HYBRID LOUNGE MPV",
    image: "/images/fleets/cars/innova-hycross-hybrid.jpg",
    seating: "6+1 seater",
    rateTag: "₹3,750/day onwards",
    features: ["Self-Charging Silent EV Mode", "Ottoman Lounge Captain Seats", "Panoramic Sunroof View"],
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner 4x4",
    category: "PREMIUM LUXURY SUV",
    image: "/images/fleets/cars/fortuner.jpg",
    seating: "6+1 seater",
    rateTag: "₹6,500/day onwards",
    features: ["High-Stature VIP Presence", "Dark Chamois Leather Interior", "All-Terrain 4x4 Power"],
  },
  {
    id: "tempo-12",
    name: "12 Seater Tempo Traveller",
    category: "DELUXE TEMPO COACH",
    image: "/images/fleets/tempo-12-seater.jpg",
    seating: "12+1 seater",
    rateTag: "₹5,000/day onwards",
    features: ["2x1 High Roof Standing Aisle", "Dual AC Evaporator Vents", "Plush Pushback Recliners"],
  },
];

interface PngVehicleShowcaseCardProps {
  serviceName?: string;
  featuredFleet?: {
    name: string;
    seating?: number;
    seating_label?: string;
    category?: string;
    features?: string[];
    image_url?: string;
  };
  vehicles?: ShowcaseVehicleItem[];
  autoPlayMs?: number;
  onVehicleChange?: (vehicle: ShowcaseVehicleItem) => void;
  className?: string;
}

export function PngVehicleShowcaseCard({
  serviceName = "Outstation Trips",
  featuredFleet,
  vehicles = DEFAULT_SHOWCASE_VEHICLES,
  autoPlayMs = 2800,
  onVehicleChange,
  className,
}: PngVehicleShowcaseCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Active showcase vehicles list
  const showcaseList = featuredFleet ? URBANIA_SHOWCASE_FLEETS : vehicles;

  // Continuous auto-scrolling timer without pausing
  useEffect(() => {
    if (showcaseList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % showcaseList.length);
    }, autoPlayMs);

    return () => clearInterval(interval);
  }, [showcaseList.length, autoPlayMs]);

  const activeVehicle = showcaseList[currentIdx] || showcaseList[0];

  // Notify parent component on vehicle slide change
  useEffect(() => {
    if (onVehicleChange && activeVehicle) {
      onVehicleChange(activeVehicle);
    }
  }, [currentIdx, activeVehicle, onVehicleChange]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? showcaseList.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === showcaseList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl p-4 bg-white border border-slate-200/90 shadow-xl flex flex-col gap-3 group transition-all duration-300",
        className
      )}
    >
      {/* Top Rating & Recommended Fleet Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs font-black text-slate-900">4.9/5</span>
          <span className="text-[10px] text-slate-500 font-medium">(1.2k+ Journeys)</span>
        </div>
        <span className="text-[9px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-ping" />
          RECOMMENDED FLEET
        </span>
      </div>

      {/* Main Full-Bleed Vehicle Image Box (Continuous Auto-Scrolling Images & Title) */}
      <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden border border-slate-200/70 bg-slate-900 flex items-center justify-center select-none group/box">
        {/* Full-Bleed Sliding Image */}
        {showcaseList.map((item, index) => (
          <div
            key={item.id || item.image}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIdx ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/box:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
          </div>
        ))}

        {/* Top-Left Dynamic Category Badge */}
        <div className="absolute top-2.5 left-2.5 z-20 bg-slate-900/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[9px] font-black text-amber-300 border border-amber-400/40 shadow-md uppercase">
          {activeVehicle.category}
        </div>

        {/* Bottom-Right Rate Badge */}
        <div className="absolute bottom-2.5 right-2.5 z-20 bg-emerald-600 px-2.5 py-0.5 rounded-lg text-[10px] font-black text-white shadow-md">
          {activeVehicle.rateTag || "Best Standard Rate"}
        </div>

        {/* Left / Right Carousel Controls */}
        {showcaseList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous vehicle image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-7 w-7 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center opacity-0 group-hover/box:opacity-100 transition-all hover:bg-black"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next vehicle image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-7 w-7 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center opacity-0 group-hover/box:opacity-100 transition-all hover:bg-black"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
              {showcaseList.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all cursor-pointer",
                    i === currentIdx ? "w-4 bg-amber-400" : "w-1.5 bg-white/40 hover:bg-white"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Dynamic Vehicle Model Title & Seating Tag (Changes with Image) */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="text-xs font-black text-slate-900 truncate max-w-[210px]" title={activeVehicle.name}>
          {activeVehicle.name}
        </div>
        <div className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
          {activeVehicle.seating}
        </div>
      </div>

      {/* Dynamic Spec Pills (Changes with Image) */}
      <div className="flex flex-wrap gap-1 text-[9px] text-slate-700">
        {activeVehicle.features.map((feat, idx) => (
          <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/70 font-semibold">
            {feat.startsWith("✓") ? feat : `✓ ${feat}`}
          </span>
        ))}
      </div>

      {/* Action Buttons (Targets Active Vehicle Model) */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() =>
            openEnquiryDialog({
              defaultService: serviceName,
              vehiclePreference: activeVehicle.name,
            })
          }
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 group/btn"
        >
          <span>Instant Quote</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
        </button>

        <a
          href={waLink(`Hi, I'd like to book ${activeVehicle.name} for ${serviceName}.`)}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center transition-colors shadow-sm"
          title="WhatsApp Booking"
        >
          <MessageCircle className="h-4 w-4 fill-emerald-600 text-emerald-600" />
        </a>
      </div>
    </div>
  );
}
