import { Link } from "@tanstack/react-router";
import { Car, Briefcase, Plane, Headphones, ArrowRight } from "lucide-react";

const cards = [
  {
    title: "Car Rentals",
    desc: "Self-drive or chauffeur-driven cars for every journey.",
    linkText: "View Options",
    to: "/fleets",
    icon: Car,
    img: "/images/services/car-rentals.webp",
  },
  {
    title: "Tour Packages",
    desc: "Curated itineraries covering temples, hills, beaches & more.",
    linkText: "Explore Packages",
    to: "/packages",
    icon: Briefcase,
    img: "/images/services/tour-packages.webp",
  },
  {
    title: "Airport Transfer",
    desc: "Reliable pickups & drops across all major airports.",
    linkText: "Book Transfer",
    to: "/fleets",
    icon: Plane,
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80",
  },
  {
    title: "Custom Trips",
    desc: "Tailor-made trips designed around your preferences.",
    linkText: "Plan Your Trip",
    to: "/booking",
    icon: Headphones,
    img: "/images/services/custom-trips.webp",
  },
];

export function HeroServiceCards() {
  return (
    <div className="hero-service-grid animate-fade-up">
      {cards.map((c) => (
        <Link
          key={c.title}
          to={c.to as any}
          className="service-card group"
        >
          <div className="relative z-10 w-[60%] p-5 h-full flex flex-col justify-between">
            <div>
              <div className="h-8 w-8 rounded-full bg-[#fbf8f1] text-[#c9922e] flex items-center justify-center mb-3">
                <c.icon className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-[#171914] text-[15px] mb-1.5">{c.title}</h3>
              <p className="text-[10px] text-[#62645f] leading-[1.6] mb-4 pr-2">{c.desc}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[#171914] text-[11px] font-bold group-hover:text-[#c9922e] transition-colors mt-auto">
              {c.linkText} 
              <div className="h-4 w-4 rounded-full bg-[#c9922e] text-white flex items-center justify-center">
                <ArrowRight className="h-2.5 w-2.5" />
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 bottom-0 w-[55%] z-0 overflow-hidden">
            <img 
              src={c.img} 
              alt="" 
              className="w-full h-full object-cover object-left opacity-90 group-hover:scale-[1.05] transition-transform duration-700 ease-out"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 20%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%)'
              }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
