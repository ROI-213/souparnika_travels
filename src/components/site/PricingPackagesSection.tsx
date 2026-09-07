import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, X, Users, Sparkles, Info, Send } from "lucide-react";
import { DEFAULT_FLEETS } from "@/lib/data/vehicles";
import { fleetsQuery, type Fleet } from "@/lib/queries";

export function PricingPackagesSection({
  onSelectVehicle,
}: {
  onSelectVehicle?: (vehicleName: string) => void;
}) {
  const { data: allFleets = DEFAULT_FLEETS } = useQuery(fleetsQuery());
  const fleets = allFleets && allFleets.length > 0 ? allFleets : DEFAULT_FLEETS;
  const selectedPackages = fleets.filter((f) =>
    [
      "fortuner",
      "innova-crysta",
      "10-seater-urbania",
      "12-seater-urbania",
      "16-seater-urbania",
      "12-seater-tempo-traveller",
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
            Standard Local and Inter-State transportation package rates for all vehicles.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {selectedPackages.map((pkg) => {
            const isPopular = pkg.slug === "fortuner" || pkg.slug === "innova-crysta";

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
                    src={pkg.image_url || "/images/fleets/cars/fortuner.jpg"}
                    alt={pkg.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/85 via-transparent to-black/20" />

                  {/* Seating Capacity Badge Overlay */}
                  <div className="absolute top-3 left-3 bg-[#071525]/90 backdrop-blur-md text-amber-300 font-extrabold text-[10px] uppercase px-3 py-1 rounded-lg border border-amber-400/30 shadow-md">
                    {pkg.seating_label || `${pkg.seating}+1 seater`}
                  </div>

                  {/* Rate Badge Overlay */}
                  <div className="absolute bottom-3 right-3 bg-emerald-500 text-white font-black text-xs px-3 py-1 rounded-lg shadow-lg">
                    ₹{pkg.per_km_rate ?? pkg.starting_price} / km
                  </div>
                </div>

                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Title & Capacity */}
                    <div>
                      <h3 className="font-display font-bold text-xl text-[color:var(--brand-navy)]">
                        {pkg.name}, {pkg.seating_label || `${pkg.seating}+1 seater`}
                      </h3>
                    </div>

                    {/* Local & Inter-State Transportation Packages displayed side-by-side */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-700">
                      {/* Local Transportation Package */}
                      <div className="space-y-1.5 border-b sm:border-b-0 sm:border-r border-border pb-3 sm:pb-0 sm:pr-4">
                        <div className="font-bold text-slate-900 text-sm">Local Transportation Package:</div>
                        <div className="font-extrabold text-[color:var(--brand-navy)] text-xs sm:text-sm">
                          • {pkg.local_package_hours ?? 8} Hours / {pkg.local_package_km ?? 80} Kms – ₹{(pkg.local_package_rate ?? 6500).toLocaleString()}
                        </div>
                        <div className="font-semibold text-slate-800">• Additional Charges:</div>
                        <div className="pl-2 space-y-0.5 text-slate-600 text-[11px]">
                          <div>• Extra Hour: ₹{pkg.extra_hour_rate ?? 650}/hr</div>
                          <div>• Extra Distance: ₹{pkg.extra_km_rate ?? pkg.per_km_rate ?? 65}/km</div>
                          <div>• Garage to garage billing.</div>
                        </div>
                      </div>

                      {/* Inter-State Transportation Package */}
                      <div className="space-y-1.5">
                        <div className="font-bold text-slate-900 text-sm">Inter-State Transportation Package:</div>
                        <div className="font-extrabold text-emerald-700 text-xs sm:text-sm">
                          • ₹{pkg.per_km_rate ?? 65} per km
                        </div>
                        <div className="space-y-0.5 text-slate-600 text-[11px]">
                          <div>• Driver Allowance: ₹{pkg.driver_allowance ?? 500}/day</div>
                          <div>• Min Billing: {pkg.min_km ?? 300} kms/day</div>
                          <div>• Toll & Permits: As Actuals</div>
                          <div>• Garage to garage billing.</div>
                        </div>
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
