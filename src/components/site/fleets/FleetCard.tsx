import { Link } from "@tanstack/react-router";
import { Users, Briefcase, ArrowRight } from "lucide-react";

export interface FleetCardProps {
  image: string;
  name: string;
  passengers: string;
  useCase: string;
  ctaText?: string;
  ctaLink?: string;
}

export function FleetCard({ 
  image, 
  name, 
  passengers, 
  useCase, 
  ctaText = "View Details", 
  ctaLink = "/contact-us" 
}: FleetCardProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          loading="lazy" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="flex flex-col flex-grow p-5 md:p-6">
        <h3 className="font-display text-xl md:text-2xl font-bold text-[color:var(--brand-navy)] mb-3">
          {name}
        </h3>
        
        <div className="flex flex-col gap-2.5 mb-6 text-sm text-muted-foreground flex-grow">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[color:var(--brand-gold)] shrink-0" />
            <span>{passengers}</span>
          </div>
          <div className="flex items-start gap-2">
            <Briefcase className="w-4 h-4 text-[color:var(--brand-gold)] shrink-0 mt-0.5" />
            <span className="line-clamp-2">{useCase}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <Link 
            to={ctaLink as any} 
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-blue)] group-hover:text-[color:var(--brand-navy)] transition-colors"
          >
            {ctaText} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
