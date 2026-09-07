import { Link } from "@tanstack/react-router";
import {
  Users,
  Briefcase,
  Snowflake,
  ArrowRight,
  MapPin,
  MapPinned,
  Clock,
  Tag,
  Sparkles,
} from "lucide-react";
import type { Fleet, Package } from "@/lib/queries";
import { EnquireButton } from "./EnquireButton";

export function FleetCard({ fleet }: { fleet: Fleet }) {
  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-white hover:shadow-[0_22px_45px_-15px_rgba(11,35,65,0.25)] hover:border-amber-400/60 card-hover-lift transition-all duration-300 relative">
      {/* Sheen animation shine */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 card-sheen-effect pointer-events-none z-10" />

      <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
        {fleet.image_url && (
          <img
            src={fleet.image_url}
            alt={fleet.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-extrabold text-[color:var(--brand-navy)] shadow-md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="h-2 w-2 rounded-full bg-emerald-500 -ml-3" />
            Available
          </span>
          {fleet.is_featured && (
            <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[10px] font-black text-[color:var(--brand-navy)] shadow-md flex items-center gap-1">
              <Sparkles className="h-3 w-3 fill-slate-950 text-slate-950" />
              Featured
            </span>
          )}
        </div>
      </div>
      <div className="p-3.5 sm:p-5 flex flex-col flex-1">
        <div className="text-[9px] sm:text-[11px] font-extrabold tracking-widest text-[color:var(--brand-blue)] uppercase truncate">
          {fleet.category}
        </div>
        <h3 className="font-display font-bold text-xs sm:text-base md:text-lg text-[color:var(--brand-navy)] mt-0.5 sm:mt-1 group-hover:text-amber-600 transition-colors line-clamp-1">
          {fleet.name}, {fleet.seating_label || `${fleet.seating}+1 seater`}
        </h3>
        <p className="text-[10px] sm:text-sm text-muted-foreground mt-1 line-clamp-2">{fleet.short_description}</p>

        <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground font-medium">
          <span className="inline-flex items-center gap-1"><Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500" /> {fleet.seating_label || `${fleet.seating} Seats`}</span>
          {fleet.luggage && <span className="inline-flex items-center gap-1 hidden sm:inline-flex"><Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-500" /> {fleet.luggage}</span>}
          {fleet.ac && <span className="inline-flex items-center gap-1"><Snowflake className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-sky-500" /> AC</span>}
        </div>

        {fleet.suitable_for && fleet.suitable_for.length > 0 && (
          <div className="mt-2 sm:mt-3 flex flex-wrap gap-1">
            {fleet.suitable_for.slice(0, 2).map((s) => (
              <span key={s} className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200/60 text-slate-700 truncate max-w-full">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2.5 sm:pt-4 border-t border-border flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Inter-State</div>
            <div className="font-display font-black text-[color:var(--brand-navy)] text-xs sm:text-base">
              ₹{fleet.per_km_rate ?? fleet.starting_price}/km
            </div>
            {fleet.local_package_rate && (
              <div className="text-[8px] sm:text-[10px] font-bold text-blue-700 mt-0.5 truncate">
                Local: ₹{fleet.local_package_rate.toLocaleString("en-IN")}
              </div>
            )}
          </div>
          <div className="flex gap-1 sm:gap-2">
            <Link
              to="/fleets/$slug"
              params={{ slug: fleet.slug }}
              className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
            >
              Details
            </Link>
            <EnquireButton
              options={{
                source: "fleet_card",
                lockedVehicle: fleet.name,
                title: `Enquire — ${fleet.name}`,
              }}
              label="Enquire"
              size="sm"
              variant="gold"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-white hover:shadow-[0_22px_45px_-15px_rgba(11,35,65,0.25)] hover:border-amber-400/60 card-hover-lift transition-all duration-300 relative">
      {/* Sheen animation shine */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 card-sheen-effect pointer-events-none z-10" />

      <div className="aspect-[16/10] overflow-hidden bg-secondary relative">
        {pkg.image_url && (
          <img
            src={pkg.image_url}
            alt={pkg.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        )}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-[9px] sm:text-[11px] font-extrabold text-[color:var(--brand-navy)] shadow-md">
          {pkg.duration}
        </div>
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-400 text-[9px] sm:text-[11px] font-black text-[color:var(--brand-navy)] shadow-md">
          {pkg.category}
        </div>
        {pkg.is_featured && (
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[color:var(--brand-navy)] text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-md">
            Featured
          </div>
        )}
      </div>
      <div className="p-3.5 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground font-semibold truncate">
          <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500 shrink-0" /> {pkg.location}
        </div>
        <h3 className="font-display font-bold text-xs sm:text-base md:text-lg text-[color:var(--brand-navy)] mt-0.5 sm:mt-1 line-clamp-1 group-hover:text-amber-600 transition-colors">
          {pkg.name}
        </h3>
        <p className="text-[10px] sm:text-sm text-muted-foreground mt-1 line-clamp-2">{pkg.short_description}</p>

        <div className="mt-2.5 sm:mt-3 grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-1.5 text-[9px] sm:text-xs text-muted-foreground font-medium">
          <span className="inline-flex items-center gap-1 truncate">
            <Clock className="h-3 w-3 text-amber-500 shrink-0" /> {pkg.duration}
          </span>
          {pkg.starting_from && (
            <span className="inline-flex items-center gap-1 truncate">
              <MapPinned className="h-3 w-3 text-blue-500 shrink-0" /> From {pkg.starting_from}
            </span>
          )}
          {pkg.travellers && (
            <span className="inline-flex items-center gap-1 truncate">
              <Users className="h-3 w-3 text-emerald-500 shrink-0" /> {pkg.travellers} pax
            </span>
          )}
          <span className="inline-flex items-center gap-1 truncate">
            <Tag className="h-3 w-3 text-purple-500 shrink-0" /> {pkg.category}
          </span>
        </div>

        <div className="mt-auto pt-2.5 sm:pt-4 border-t border-border flex items-end justify-between gap-2">
          <div>
            <div className="text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {pkg.price ? "From" : "Price"}
            </div>
            <div className="font-display font-black text-[color:var(--brand-navy)] text-xs sm:text-lg">
              {pkg.price ? `₹${pkg.price.toLocaleString("en-IN")}` : "Contact"}
            </div>
            {pkg.price && (
              <div className="text-[8px] sm:text-[10px] text-muted-foreground font-semibold">per person</div>
            )}
          </div>
        </div>
        <div className="mt-2.5 sm:mt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
          <Link
            to="/packages/$slug"
            params={{ slug: pkg.slug }}
            className="text-center text-[10px] sm:text-xs font-bold py-2 px-1 rounded-xl border border-slate-200 hover:bg-slate-900 hover:text-white transition-all inline-flex items-center justify-center gap-1 shadow-sm whitespace-nowrap"
          >
            <span>Details</span> <ArrowRight className="h-3 w-3" />
          </Link>
          <EnquireButton
            options={{
              source: "package_card",
              lockedPackage: pkg.name,
              title: `Enquire — ${pkg.name}`,
              showPax: true,
            }}
            label="Enquire"
            variant="gold"
            size="sm"
            className="w-full text-[10px] sm:text-xs py-2 px-1 whitespace-nowrap shadow-sm"
          />
        </div>
      </div>
    </article>
  );
}
