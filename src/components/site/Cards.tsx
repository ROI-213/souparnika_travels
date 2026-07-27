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
} from "lucide-react";
import type { Fleet, Package } from "@/lib/queries";
import { EnquireButton } from "./EnquireButton";


export function FleetCard({ fleet }: { fleet: Fleet }) {
  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-white hover:shadow-[0_20px_50px_-25px_rgba(11,35,65,0.35)] transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
        {fleet.image_url && (
          <img
            src={fleet.image_url}
            alt={fleet.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/95 text-[10px] font-bold text-[color:var(--brand-navy)]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Available
          </span>
          {fleet.is_featured && (
            <span className="px-2 py-1 rounded-full bg-[color:var(--brand-gold)] text-[10px] font-bold text-[color:var(--brand-navy)]">
              Featured
            </span>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[11px] font-bold tracking-widest text-[color:var(--brand-blue)] uppercase">
          {fleet.category}
        </div>
        <h3 className="font-display font-bold text-lg text-[color:var(--brand-navy)] mt-1">{fleet.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{fleet.short_description}</p>

        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {fleet.seating} Seats</span>
          {fleet.luggage && <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {fleet.luggage}</span>}
          {fleet.ac && <span className="inline-flex items-center gap-1.5"><Snowflake className="h-3.5 w-3.5" /> AC</span>}
        </div>

        {fleet.suitable_for && fleet.suitable_for.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {fleet.suitable_for.slice(0, 3).map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-end justify-between gap-2 pt-4 border-t border-border">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Starting</div>
            <div className="font-display font-extrabold text-[color:var(--brand-navy)] text-lg">
              {fleet.starting_price ? `₹${fleet.starting_price}/km` : "Contact for price"}
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to="/fleets/$slug"
              params={{ slug: fleet.slug }}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-border hover:bg-secondary"
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
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-white hover:shadow-[0_20px_50px_-25px_rgba(11,35,65,0.35)] transition-shadow">
      <div className="aspect-[16/10] overflow-hidden bg-secondary relative">
        {pkg.image_url && (
          <img
            src={pkg.image_url}
            alt={pkg.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[11px] font-bold text-[color:var(--brand-navy)]">
          {pkg.duration}
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[color:var(--brand-gold)] text-[11px] font-bold text-[color:var(--brand-navy)]">
          {pkg.category}
        </div>
        {pkg.is_featured && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[color:var(--brand-navy)] text-white text-[10px] font-bold uppercase tracking-wider">
            Featured
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {pkg.location}
        </div>
        <h3 className="font-display font-bold text-lg text-[color:var(--brand-navy)] mt-1 line-clamp-1">
          {pkg.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{pkg.short_description}</p>

        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {pkg.duration}
          </span>
          {pkg.starting_from && (
            <span className="inline-flex items-center gap-1.5">
              <MapPinned className="h-3.5 w-3.5" /> From {pkg.starting_from}
            </span>
          )}
          {pkg.travellers && (
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> {pkg.travellers} pax
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" /> {pkg.category}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2 pt-4 border-t border-border">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {pkg.price ? "Starting from" : "Price"}
            </div>
            <div className="font-display font-extrabold text-[color:var(--brand-navy)] text-lg">
              {pkg.price ? `₹${pkg.price.toLocaleString("en-IN")}` : "Contact for Price"}
            </div>
            {pkg.price && (
              <div className="text-[10px] text-muted-foreground">per person onwards</div>
            )}
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Link
            to="/packages/$slug"
            params={{ slug: pkg.slug }}
            className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-lg border border-border hover:bg-secondary inline-flex items-center justify-center gap-1"
          >
            View Details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <EnquireButton
            options={{
              source: "package_card",
              lockedPackage: pkg.name,
              title: `Enquire — ${pkg.name}`,
              showPax: true,
            }}
            label="Enquire Now"
            variant="gold"
            size="sm"
            className="flex-1"
          />
        </div>
      </div>
    </article>
  );

}
