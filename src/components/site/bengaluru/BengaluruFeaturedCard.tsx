import { Link } from "@tanstack/react-router";
import { ArrowRight, Map } from "lucide-react";

export function BengaluruFeaturedCard() {
  return (
    <div className="relative w-[320px] lg:w-[330px] shrink-0 h-[420px] rounded-[20px] overflow-hidden group shadow-xl">
      {/* Background Image (Collage representation) */}
      <img
        src="/images/bengaluru/palace.png"
        alt="Bengaluru City Tour Collage"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
      
      {/* Subtle blue gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--brand-navy)] via-[color:var(--brand-navy)]/40 to-transparent opacity-90" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="mb-auto">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-3 shadow-sm">
            Bengaluru City Tour
          </span>
          <h3 className="font-display text-2xl font-extrabold text-white leading-tight">
            Explore All Major Bengaluru Attractions
          </h3>
          <p className="mt-3 text-sm text-white/80 line-clamp-2 leading-relaxed">
            A complete sightseeing experience covering Bengaluru’s most iconic landmarks.
          </p>
        </div>

        <div className="mt-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {["Heritage", "Gardens", "Temples", "Shopping"].map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/10 text-white/90 border border-white/20">
                {tag}
              </span>
            ))}
          </div>

          <Link
            to="/destinations"
            className="flex items-center justify-between w-full h-11 px-4 rounded-xl bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] font-bold text-sm shadow-md hover:brightness-105 transition-all group/btn"
          >
            <span>View All Bengaluru Places</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
