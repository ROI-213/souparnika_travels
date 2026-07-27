import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BengaluruFeaturedCard } from "./BengaluruFeaturedCard";
import { TouristPlaceCarousel } from "./TouristPlaceCarousel";
import { bengaluruPlaces } from "@/lib/data/bengaluru-places";

export function BengaluruPlacesSection() {
  const activePlaces = bengaluruPlaces.filter(p => p.isActive).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="mt-12 md:mt-16 mb-20 md:mb-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
            EXPLORE BENGALURU
          </span>
          <h2 className="mt-2 font-display font-extrabold text-3xl md:text-4xl text-[color:var(--brand-navy)]">
            Bengaluru Tourist Places
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            From royal palaces and peaceful gardens to temples, museums and vibrant shopping streets.
          </p>
        </div>
        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-blue)] hover:gap-3 transition-all whitespace-nowrap"
        >
          View all Bengaluru places <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 w-full max-w-[100vw] overflow-hidden">
        {/* Fixed Featured Card (First element on desktop) */}
        <div className="hidden lg:block z-20">
          <BengaluruFeaturedCard />
        </div>
        
        {/* Carousel - Continuous Slide */}
        <div className="flex-1 min-w-0 z-10 -mx-4 px-4 lg:mx-0 lg:px-0">
          <TouristPlaceCarousel 
            places={activePlaces} 
            featuredCard={<BengaluruFeaturedCard />} 
          />
        </div>
      </div>
    </div>
  );
}
