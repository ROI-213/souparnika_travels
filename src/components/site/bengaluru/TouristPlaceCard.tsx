import { Link } from "@tanstack/react-router";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { TouristPlace } from "@/lib/data/bengaluru-places";

export function TouristPlaceCard({ place }: { place: TouristPlace }) {
  // Determine badge color based on category
  const getBadgeColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("nature") || cat.includes("garden")) return "bg-green-100 text-green-800 border-green-200";
    if (cat.includes("temple") || cat.includes("spirituality")) return "bg-orange-100 text-orange-800 border-orange-200";
    if (cat.includes("heritage") || cat.includes("history")) return "bg-amber-100 text-amber-800 border-amber-200";
    if (cat.includes("shopping") || cat.includes("entertainment")) return "bg-pink-100 text-pink-800 border-pink-200";
    if (cat.includes("museum") || cat.includes("art")) return "bg-purple-100 text-purple-800 border-purple-200";
    return "bg-[color:var(--brand-gold)]/20 text-[color:var(--brand-navy)] border-[color:var(--brand-gold)]/30"; // default brand color
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-[20px] border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative">
      <div className="relative h-[240px] w-full overflow-hidden bg-gray-100">
        <img 
          src={place.image} 
          alt={place.altText} 
          loading="lazy" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full border shadow-sm backdrop-blur-md ${getBadgeColor(place.category)}`}>
            {place.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-5">
        <h3 className="font-display text-xl font-bold text-[color:var(--brand-navy)] mb-2 line-clamp-1">
          {place.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {place.description}
        </p>
        
        <div className="flex flex-col gap-2 mt-auto mb-5 text-[13px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[color:var(--brand-gold)] shrink-0" />
            <span className="truncate">{place.distance}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-[color:var(--brand-gold)] shrink-0" />
            <span className="truncate">{place.suitableFor}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border/60">
          <Link 
            to="/destinations" 
            className="inline-flex items-center justify-between w-full text-sm font-semibold text-[color:var(--brand-blue)] group-hover:text-[color:var(--brand-navy)] transition-colors"
          >
            <span>Explore Place</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
