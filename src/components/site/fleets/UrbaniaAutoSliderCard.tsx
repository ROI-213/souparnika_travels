import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UrbaniaSlideItem {
  image: string;
  tag: string;
  title: string;
  desc: string;
  seating?: string;
  features?: string[];
}

export const DEFAULT_URBANIA_SLIDES: UrbaniaSlideItem[] = [
  {
    image: "/images/fleets/urbania-10-seater.jpg",
    tag: "EXECUTIVE VAN",
    title: "10 Seater Force Urbania",
    seating: "10+1 seater",
    desc: "Executive 10-seater with aircraft pushback recliners & individual AC vents.",
    features: ["10 Pushback Aircraft Seats", "Individual AC Outlets & Lamps", "USB Charging at Every Seat"],
  },
  {
    image: "/images/fleets/urbania-12-seater.jpg",
    tag: "LUXURY URBANIA",
    title: "12 Seater Force Urbania",
    seating: "12+1 seater",
    desc: "2x1 luxury seating layout, wide standing aisle & panoramic windows.",
    features: ["2x1 Ergonomic Recliner Layout", "Dual Evaporator Air Conditioner", "Panoramic Sealed Glass Windows"],
  },
  {
    image: "/images/fleets/urbania-maharaja-10-seater.jpg",
    tag: "VIP MAHARAJA EDITION",
    title: "10 Seater Urbania Maharaja VIP",
    seating: "10+1 seater",
    desc: "Royal sofa recliners, calf rests, smart HD TV & onboard refrigerator.",
    features: ["Maharaja Sofa Recliners with Calf Rests", "Smart HD LED Screen & Audio", "Onboard Refrigerator & Mood Glow"],
  },
  {
    image: "/images/fleets/urbania-maharaja-12-seater.jpg",
    tag: "ROYAL MAHARAJA COLLECTION",
    title: "12 Seater Urbania Maharaja Executive",
    seating: "12+1 seater",
    desc: "Italian leather pushback seats, wood accents & multi-zone climate control.",
    features: ["Italian Leather Maharaja Pushback Seats", "Ambient Mood Lighting & Wood Accents", "Individual Passenger AC Outlets"],
  },
  {
    image: "/images/fleets/urbania-16-seater.jpg",
    tag: "GROUP TRAVELER 16 SEATER",
    title: "16 Seater Force Urbania",
    seating: "16+1 seater",
    desc: "16 spacious recliners & heavy luggage boot for family and corporate trips.",
    features: ["16 Comfortable Pushback Recliners", "Heavy Luggage Boot & Roof Carrier", "Premium Surround Audio System"],
  },
];

export const OUTSTATION_TOUR_SLIDES: UrbaniaSlideItem[] = [
  {
    image: "/images/packages/mysore-day-trip.webp",
    tag: "HERITAGE SPECIAL",
    title: "Mysore Palace & Chamundi Hills Tour",
    seating: "Full-Day Tour",
    desc: "1-Day Mysore Palace, Zoo, Silk Saree Shopping & Brindavan Gardens trip.",
    features: ["Mysore Palace & Chamundi Temple", "Brindavan Gardens Musical Fountain", "Silk & Handicraft Shopping Stops"],
  },
  {
    image: "/images/packages/coorg-getaway-3d2n.webp",
    tag: "COFFEE LAND ESCAPE",
    title: "Coorg Plantation & Waterfalls 3D/2N",
    seating: "3 Days / 2 Nights",
    desc: "Abbey Falls, Raja Seat Sunset, Golden Temple & Coffee Estate retreat.",
    features: ["Abbey Falls & Raja Seat Viewpoint", "Namdroling Nyingmapa Monastery", "Private Coffee Estate Walk"],
  },
  {
    image: "/images/packages/ooty-kodaikanal-5d4n.webp",
    tag: "NILGIRI QUEEN",
    title: "Ooty & Kodaikanal Hill Station Tour",
    seating: "5 Days / 4 Nights",
    desc: "Botanical Gardens, Doddabetta Peak, Pykara Lake & Toy Train experience.",
    features: ["Botanical Gardens & Doddabetta Peak", "Pykara Lake Speedboating", "UNESCO Heritage Toy Train Ride"],
  },
  {
    image: "/images/packages/chikmagalur-2d1n.webp",
    tag: "PEAKS & NATURE",
    title: "Chikmagalur Nature & Peak Getaway",
    seating: "2 Days / 1 Night",
    desc: "Mullayanagiri Peak, Baba Budangiri, Hebbe Falls & Nature Trails.",
    features: ["Highest Peak Trek (Mullayanagiri)", "Baba Budangiri Scenic Ridge", "Hebbe & Jhari Waterfalls"],
  },
  {
    image: "/images/packages/tirupati-darshan.webp",
    tag: "PILGRIM EXPRESS",
    title: "Tirupati Balaji VIP Express Package",
    seating: "1 Day Express",
    desc: "Seamless Bengaluru to Tirumala Balaji Temple VIP Darshan & Return.",
    features: ["Doorstep Pickup & Drop (BLR)", "Special Entry VIP Darshan Assistance", "Laddoo Prasadam & Chauffeur Support"],
  },
  {
    image: "/images/packages/kerala-backwaters-4d3n.webp",
    tag: "GOD'S OWN COUNTRY",
    title: "Kerala Backwaters & Wayanad Escapes",
    seating: "4 Days / 3 Nights",
    desc: "Wayanad Hills, Edakkal Caves & Alleppey Houseboat Experience.",
    features: ["Wayanad Banasura Sagar Dam", "Edakkal Prehistoric Caves", "Alleppey Houseboat Backwater Cruise"],
  },
];

interface UrbaniaAutoSliderCardProps {
  slides?: UrbaniaSlideItem[];
  autoPlayMs?: number;
  onSlideChange?: (slide: UrbaniaSlideItem) => void;
  className?: string;
}

export function UrbaniaAutoSliderCard({
  slides = DEFAULT_URBANIA_SLIDES,
  autoPlayMs = 2800,
  onSlideChange,
  className,
}: UrbaniaAutoSliderCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto scroll timer
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, autoPlayMs);

    return () => clearInterval(interval);
  }, [slides.length, autoPlayMs]);

  const activeSlide = slides[currentIdx] || slides[0];

  // Notify parent component on slide change
  useEffect(() => {
    if (onSlideChange && activeSlide) {
      onSlideChange(activeSlide);
    }
  }, [currentIdx, activeSlide, onSlideChange]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 group select-none h-80 w-full bg-slate-900",
        className
      )}
    >
      {/* Full-Bleed Urbania Vehicle Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.title + index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIdx ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/90 via-[#071525]/20 to-transparent" />
        </div>
      ))}

      {/* Manual Left/Right Carousel Controls */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 h-8 w-8 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-all hover:bg-amber-400 hover:text-black cursor-pointer shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 h-8 w-8 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-all hover:bg-amber-400 hover:text-black cursor-pointer shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Indicator Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIdx(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all cursor-pointer",
                  dotIdx === currentIdx ? "w-5 bg-amber-400" : "w-1.5 bg-white/40 hover:bg-white"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
