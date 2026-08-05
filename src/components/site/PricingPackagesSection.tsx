import { useState } from "react";
import { Check, X, Users, Sparkles, Info, Send } from "lucide-react";
import { DEFAULT_FLEETS } from "@/lib/data/vehicles";

export function PricingPackagesSection({
  onSelectVehicle,
}: {
  onSelectVehicle?: (vehicleName: string) => void;
}) {
  const selectedPackages = DEFAULT_FLEETS.filter((f) =>
    [
      "10-seater-urbania",
      "12-seater-urbania",
      "16-seater-urbania",
      "10-seater-maharaja-urbania",
      "12-seater-tempo-traveller",
      "9-seater-tempo-traveller",
    ].includes(f.slug)
  );

  const handleBook = (vehicleName: string) => {
    if (onSelectVehicle) {
      onSelectVehicle(vehicleName);
    }
    const el = document.getElementById("booking-form") || document.getElementById("booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 lg:py-24 bg-white" id="pricing-packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[color:var(--brand-blue)] bg-[color:var(--brand-blue)]/10 px-3.5 py-1 rounded-full">
            TRANSPARENT RATES
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[color:var(--brand-navy)]">
            Vehicle Rental Packages
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Transparent pricing with clear inclusions, driver allowance terms, and zero hidden surprises.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {selectedPackages.map((pkg) => {
            const isPopular = pkg.slug === "force-urbania-luxury-van" || pkg.slug === "innova-crysta";

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative group ${
                  isPopular
                    ? "border-[color:var(--brand-gold)] shadow-2xl bg-gradient-to-b from-amber-50/40 via-white to-white ring-2 ring-[color:var(--brand-gold)]/40 md:-translate-y-2"
                    : "border-border shadow-sm hover:shadow-lg bg-white"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] font-black text-[11px] tracking-wider uppercase text-center py-1.5 px-4 flex items-center justify-center gap-1.5 z-10">
                    <Sparkles className="h-3.5 w-3.5" /> Most Popular Choice
                  </div>
                )}

                {/* Vehicle Image Banner Header */}
                <div className="relative w-full h-48 sm:h-52 bg-slate-900 overflow-hidden">
                  <img
                    src={pkg.image_url || pkg.thumbnail || "/images/fleets/urbania-10-seater.jpg"}
                    alt={pkg.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/85 via-transparent to-black/20" />

                  {/* Seating Capacity Badge Overlay */}
                  <div className="absolute top-3 left-3 bg-[#071525]/90 backdrop-blur-md text-amber-300 font-extrabold text-[10px] uppercase px-3 py-1 rounded-lg border border-amber-400/30 shadow-md">
                    Up to {pkg.seating} Seats
                  </div>

                  {/* Rate Badge Overlay */}
                  <div className="absolute bottom-3 right-3 bg-emerald-500 text-white font-black text-xs px-3 py-1 rounded-lg shadow-lg">
                    ₹{pkg.per_km_rate ?? pkg.starting_price} / km
                  </div>
                </div>

                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Title & Capacity */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display font-bold text-xl text-[color:var(--brand-navy)]">
                          {pkg.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground mt-1 bg-secondary px-2.5 py-0.5 rounded-full">
                          <Users className="h-3 w-3 text-[color:var(--brand-blue)]" /> Up to {pkg.seating} Seats
                        </span>
                      </div>
                    </div>

                    {/* Price Header */}
                    <div className="mt-5 pb-5 border-b border-border">
                      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                        Outstation Rate
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-extrabold text-[color:var(--brand-navy)]">
                          ₹{pkg.per_km_rate ?? pkg.starting_price}
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">/ km</span>
                      </div>
                      <div className="text-xs text-foreground/75 mt-1">
                        Min. <span className="font-bold text-foreground">{pkg.min_km ?? 250} km</span> per day · Driver Allowance: <span className="font-bold text-foreground">₹{pkg.driver_allowance ?? 500}/day</span>
                      </div>
                    </div>

                    {/* Inclusions */}
                    <div className="mt-5 space-y-2">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[color:var(--brand-navy)]">
                        Included Amenities & Services
                      </div>
                      <ul className="space-y-2 text-xs text-foreground/85">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600 shrink-0" />
                          <span>Professional Uniformed Chauffeur</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600 shrink-0" />
                          <span>Clean, Sanitized Air-Conditioned Vehicle</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600 shrink-0" />
                          <span>Pushback Comfortable Recliner Seating</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600 shrink-0" />
                          <span>Music System & USB Phone Charging</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600 shrink-0" />
                          <span>Luggage Carrier / Rear Boot Support</span>
                        </li>
                      </ul>
                    </div>

                    {/* Exclusions */}
                    <div className="mt-5 space-y-1.5 pt-4 border-t border-border/60">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Additional Charges (At Actuals)
                      </div>
                      <div className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <X className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>Tolls, Parking Fees, Interstate Tax / Permits</span>
                      </div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => handleBook(pkg.name)}
                      className={`w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm transition-all shadow-md ${
                        isPopular
                          ? "bg-[color:var(--brand-navy)] text-white hover:bg-[color:var(--brand-blue)]"
                          : "bg-secondary text-[color:var(--brand-navy)] hover:bg-[color:var(--brand-navy)] hover:text-white"
                      }`}
                    >
                      <Send className="h-4 w-4 text-[color:var(--brand-gold)]" />
                      <span>Book Now ({pkg.name})</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Disclaimer */}
        <div className="mt-10 rounded-2xl bg-secondary/50 border border-border p-4 sm:p-5 flex items-start gap-3">
          <Info className="h-5 w-5 text-[color:var(--brand-blue)] shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground">Disclaimer:</span> Final pricing may vary depending on travel dates, route, vehicle availability, pickup location, trip duration, tolls, permits, parking, and special requirements. Please contact our 24/7 reservation team for a detailed custom itinerary quote.
          </p>
        </div>
      </div>
    </section>
  );
}
