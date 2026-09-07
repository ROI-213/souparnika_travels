import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Users,
  Info,
  Calculator,
  Phone,
  ArrowRight,
  Car,
  Clock,
  Compass,
} from "lucide-react";
import {
  getUrbaniaRates,
  calculateOutstationEstimate,
  type UrbaniaCategory,
  type UrbaniaFleetRate,
} from "@/lib/data/urbania-pricing";
import { urbaniaRatesQuery } from "@/lib/queries";
import { openEnquiryDialog } from "@/lib/enquiry-dialog";
import { SITE, telLink, waLink } from "@/lib/site-config";
import { UrbaniaCard } from "./UrbaniaCard";
import { cn } from "@/lib/utils";


export function UrbaniaFleetPricingSection() {
  const { data: rates = getUrbaniaRates() } = useQuery(urbaniaRatesQuery());
  const [selectedCategory, setSelectedCategory] = useState<UrbaniaCategory | "All">("All");
  const [selectedSeating, setSelectedSeating] = useState<number | "All">("All");
  const [pricingMode, setPricingMode] = useState<"local" | "outstation">("local");

  // Outstation Calculator state
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcFleetId, setCalcFleetId] = useState<string>(rates[0]?.id || "");
  const [calcDistanceKm, setCalcDistanceKm] = useState<number>(350);
  const [calcDays, setCalcDays] = useState<number>(2);
  const [calcIsRoundTrip, setCalcIsRoundTrip] = useState<boolean>(true);
  const [calcPickup, setCalcPickup] = useState<string>("Bangalore");
  const [calcDestination, setCalcDestination] = useState<string>("Coorg");

  // Filtered fleets calculation
  const filteredFleets = useMemo(() => {
    return rates.filter((fleet) => {
      if (selectedCategory !== "All" && fleet.category !== selectedCategory) {
        return false;
      }
      if (selectedSeating !== "All" && fleet.seating_capacity !== selectedSeating) {
        return false;
      }
      return fleet.is_active;
    });
  }, [rates, selectedCategory, selectedSeating]);

  // Seat capacity options
  const seatOptions = useMemo(() => {
    const seats = Array.from(new Set(rates.map((r) => r.seating_capacity))).sort((a, b) => a - b);
    return seats;
  }, [rates]);

  // Selected calculator fleet
  const calcSelectedFleet = useMemo(() => {
    return rates.find((f) => f.id === calcFleetId) || rates[0];
  }, [rates, calcFleetId]);

  // Calculate result for outstation calculator
  const calcResult = useMemo(() => {
    if (!calcSelectedFleet) return { billedKm: 0, estimatedTotal: null };
    return calculateOutstationEstimate({
      fleet: calcSelectedFleet,
      estimatedKm: Number(calcDistanceKm) || 300,
      days: Number(calcDays) || 1,
      isRoundTrip: calcIsRoundTrip,
    });
  }, [calcSelectedFleet, calcDistanceKm, calcDays, calcIsRoundTrip]);

  const handleBookVehicle = (fleet: UrbaniaFleetRate, modeName: string, rateString: string) => {
    openEnquiryDialog({
      source: "urbania_pricing_card",
      vehicleType: `${fleet.name} ${fleet.seating_layout || ""}`,
      message: `Enquiry for ${fleet.name} ${fleet.seating_layout || ""} (${fleet.category}, ${fleet.seating_capacity} Seats). Option: ${modeName}. Rate: ${rateString}.`,
    });
  };

  return (
    <section id="urbania-fleet-pricing" className="py-12 lg:py-16 bg-gradient-to-b from-blue-50 via-white to-blue-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* â”€â”€ SECTION HEADER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-700 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> PREMIUM & LUXURY FLEET SPECS & RATES
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Force Urbania & Maharaja Rates
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Detailed seating configurations, plush cabin features, ideal travel use cases, fixed local city packages, and transparent outstation per-km rates.
          </p>
        </div>

        {/* â”€â”€ FILTER & TOGGLE CONTROL BAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-blue-100 shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-blue-100 pb-5">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 bg-blue-50 p-1.5 rounded-2xl border border-blue-100 self-start">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer",
                  selectedCategory === "All"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:text-blue-700"
                )}
              >
                All Variants
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("Luxury / Maharaja")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5",
                  selectedCategory === "Luxury / Maharaja"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-500 hover:text-amber-700"
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Luxury Maharaja</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("Premium")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5",
                  selectedCategory === "Premium"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:text-blue-700"
                )}
              >
                <Car className="h-3.5 w-3.5" />
                <span>Premium Standard</span>
              </button>
            </div>

            {/* Pricing Mode Switcher (Local vs Outstation) */}
            <div className="flex items-center bg-blue-50 p-1.5 rounded-2xl border border-blue-100">
              <button
                type="button"
                onClick={() => setPricingMode("local")}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2",
                  pricingMode === "local"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:text-blue-700"
                )}
              >
                <Clock className="h-4 w-4" />
                <span>LOCAL (Within City)</span>
              </button>
              <button
                type="button"
                onClick={() => setPricingMode("outstation")}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2",
                  pricingMode === "outstation"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-500 hover:text-emerald-700"
                )}
              >
                <Compass className="h-4 w-4" />
                <span>OUTSTATION (Per KM)</span>
              </button>
            </div>
          </div>

          {/* Seating Capacity Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider mr-1">
              Seating Capacity:
            </span>
            <button
              type="button"
              onClick={() => setSelectedSeating("All")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                selectedSeating === "All"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-500 border-slate-200 hover:text-blue-700 hover:border-blue-300"
              )}
            >
              All Seats
            </button>
            {seatOptions.map((seats) => (
              <button
                key={seats}
                type="button"
                onClick={() => setSelectedSeating(seats)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1",
                  selectedSeating === seats
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-500 border-slate-200 hover:text-blue-700 hover:border-blue-300"
                )}
              >
                <Users className="h-3 w-3" />
                <span>{seats} Seater</span>
              </button>
            ))}

            {/* Outstation Estimator Button */}
            <button
              type="button"
              onClick={() => setShowCalculator((v) => !v)}
              className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold hover:bg-indigo-100 transition-all cursor-pointer"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>{showCalculator ? "Close Fare Calculator" : "Outstation Fare Calculator"}</span>
            </button>
          </div>

          {/* â”€â”€ OUTSTATION CALCULATOR DRAWER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {showCalculator && (
            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-4 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-indigo-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 grid place-items-center">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">Outstation Fare Calculator</div>
                    <div className="text-[11px] text-slate-500">Estimate your journey cost based on daily rules</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
                  Min 300 KM/Day Rule
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold">Select Vehicle Model</label>
                  <select
                    value={calcFleetId}
                    onChange={(e) => setCalcFleetId(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-blue-400"
                  >
                    {rates.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} {f.seating_layout} ({f.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold">Estimated Distance (KM)</label>
                  <input
                    type="number"
                    min={50}
                    step={10}
                    value={calcDistanceKm}
                    onChange={(e) => setCalcDistanceKm(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-blue-400"
                    placeholder="e.g. 350"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold">Trip Duration (Days)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={calcDays}
                    onChange={(e) => setCalcDays(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold">Trip Type</label>
                  <div className="flex items-center gap-2 h-10">
                    <button
                      type="button"
                      onClick={() => setCalcIsRoundTrip(true)}
                      className={cn(
                        "flex-1 h-full rounded-xl font-bold transition-all text-center",
                        calcIsRoundTrip ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-500"
                      )}
                    >
                      Round Trip
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcIsRoundTrip(false)}
                      className={cn(
                        "flex-1 h-full rounded-xl font-bold transition-all text-center",
                        !calcIsRoundTrip ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-500"
                      )}
                    >
                      One Way
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-600 font-bold">
                    Vehicle: <span className="text-blue-700">{calcSelectedFleet.name}</span> {calcSelectedFleet.seating_layout} ({calcSelectedFleet.category})
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Billed Distance: <span className="text-slate-900 font-bold">{calcResult.billedKm} KM</span> ({calcDays} Days x {calcSelectedFleet.outstation_min_km_per_day} KM min)
                  </div>
                </div>

                <div className="text-right">
                  {calcResult.estimatedTotal ? (
                    <div>
                      <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Estimated Outstation Base Fare</div>
                      <div className="text-2xl font-black text-blue-700">
                        ₹{calcResult.estimatedTotal.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">+ Driver Allowance (₹{calcSelectedFleet.driver_allowance * calcDays}) + Tolls</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm font-bold text-blue-700">
                        Outstation Rate on Request
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Contact us for custom quotation</div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openEnquiryDialog({
                      source: "outstation_calculator",
                      vehicleType: `${calcSelectedFleet.name} ${calcSelectedFleet.seating_layout || ""}`,
                      pickup: calcPickup,
                      destination: calcDestination,
                      message: `Outstation Calculator Enquiry: ${calcSelectedFleet.name} ${calcSelectedFleet.seating_layout || ""} (${calcSelectedFleet.category}). Estimated ${calcDistanceKm} KM for ${calcDays} Days. Trip Type: ${calcIsRoundTrip ? "Round Trip" : "One Way"}. Estimated Fare: ${calcResult.estimatedTotal ? "₹" + calcResult.estimatedTotal : "On Request"}.`,
                    })
                  }
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:from-amber-300 hover:to-amber-400 transition-all shadow-md cursor-pointer shrink-0"
                >
                  Get Custom Outstation Quote
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── FLEET CARDS GRID — 2x2 on mobile, 3x3 on desktop ────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6">
          {filteredFleets.map((fleet) => (
            <UrbaniaCard
              key={fleet.id}
              fleet={fleet}
              pricingMode={pricingMode}
              handleBookVehicle={handleBookVehicle}
            />
          ))}
        </div>

        {/* ── LEGAL DISCLAIMER & RULES FOOTER STRIP ────────────────────────── */}
        <div className="mt-12 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#071525] via-[#0A1F38] to-[#071525] border border-slate-800/90 shadow-xl space-y-3.5">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
            <Info className="h-4 w-4 shrink-0 text-amber-400" />
            <span>TRANSPARENT BILLING TERMS &amp; OUTSTATION RULES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
            <div className="space-y-1.5">
              <div className="font-bold text-white">Local Package Policy:</div>
              <p>
                Local 8 Hours / 80 KM and 12 Hours / 100 KM packages include clean vehicle, fuel, and uniform chauffeur. Night charges (if applicable), extra hours, extra kilometres, toll, parking, state permit, and GST are charged extra as per actual receipts.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-white">Outstation Package Policy:</div>
              <p>
                Outstation trips are billed per kilometre with a minimum billing of 300 KM per day plus driver allowance per day. Tolls, parking, state permit taxes, and GST are extra at actuals. Billing is calculated from garage to garage.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function UrbaniaCard({
  fleet,
  pricingMode,
  handleBookVehicle,
}: {
  fleet: UrbaniaFleetRate;
  pricingMode: "local" | "outstation";
  handleBookVehicle: (fleet: UrbaniaFleetRate, modeName: string, rateString: string) => void;
}) {
  const image = fleet.gallery && fleet.gallery.length > 0 ? fleet.gallery[0] : fleet.image;
  const isMaharaja = fleet.category === "Luxury / Maharaja";

  const localRate = fleet.local_8hr_80km;
  const outstationRate = fleet.outstation_per_km;

  return (
    <div
      className={cn(
        "rounded-2xl bg-white border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group",
        isMaharaja ? "border-amber-300 ring-1 ring-amber-200" : "border-blue-200"
      )}
    >
      {/* Compact Vehicle Image */}
      <div className="relative w-full h-36 sm:h-44 overflow-hidden bg-slate-900">
        <img
          src={image}
          alt={fleet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex items-center gap-1.5">
          <span
            className={cn(
              "px-2 py-0.5 sm:px-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow backdrop-blur-md border",
              isMaharaja
                ? "bg-amber-500/90 text-slate-950 border-amber-400"
                : "bg-blue-600/90 text-white border-blue-400"
            )}
          >
            {isMaharaja ? "Maharaja" : "Premium"}
          </span>
        </div>

        {/* Seat count badge */}
        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 rounded-full text-[9px] sm:text-[10px] font-black text-white border border-white/10 flex items-center gap-1">
          <Users className="h-3 w-3 text-amber-400" />
          <span>{fleet.seating_capacity} Seats</span>
        </div>

        {/* Vehicle name overlay */}
        <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-2.5 sm:left-3 sm:right-3">
          <div className="text-amber-400 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest mb-0.5 truncate">
            {fleet.seating_layout}
          </div>
          <h3 className="text-xs sm:text-base font-display font-black text-white tracking-tight leading-tight drop-shadow line-clamp-1">
            {fleet.name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-4 flex flex-col gap-2.5 sm:gap-3 flex-1">
        {/* Short description — 2 lines max */}
        <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed line-clamp-2">{fleet.description}</p>

        {/* Key Rate Pill */}
        <div className={cn(
          "rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-1.5",
          pricingMode === "local" ? "bg-blue-50 border border-blue-100" : "bg-emerald-50 border border-emerald-100"
        )}>
          <div>
            <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {pricingMode === "local" ? "8 Hrs / 80 Km" : "Per KM (Outstation)"}
            </div>
            <div className={cn(
              "text-base sm:text-xl font-black",
              pricingMode === "local" ? "text-blue-700" : "text-emerald-700"
            )}>
              {pricingMode === "local"
                ? localRate ? `₹${localRate.toLocaleString("en-IN")}` : "On Request"
                : outstationRate ? `₹${outstationRate}/km` : "On Request"}
            </div>
          </div>
          {pricingMode === "outstation" && (
            <div className="text-right">
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-semibold">Driver Allowance</div>
              <div className="text-xs sm:text-sm font-bold text-slate-700">₹{fleet.driver_allowance}/day</div>
            </div>
          )}
        </div>

        {/* Ideal for tags — max 2 on mobile, 3 on larger */}
        {fleet.ideal_for && fleet.ideal_for.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {fleet.ideal_for.slice(0, 2).map((use, i) => (
              <span key={i} className="px-1.5 py-0.5 sm:px-2 rounded-lg bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] font-semibold border border-slate-200 truncate max-w-full">
                {use}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 mt-auto pt-1">
          <Link
            to="/fleets/$slug"
            params={{ slug: fleet.slug }}
            className="py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-[10px] sm:text-[11px] text-center transition-colors border border-slate-200 flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Details</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
          <button
            type="button"
            onClick={() =>
              handleBookVehicle(
                fleet,
                pricingMode === "local" ? "Local Package" : "Outstation Package",
                pricingMode === "local"
                  ? localRate ? `₹${localRate}` : "On Request"
                  : outstationRate ? `₹${outstationRate}/km` : "On Request"
              )
            }
            className="py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] sm:text-[11px] text-center transition-all shadow cursor-pointer flex items-center justify-center gap-1"
          >
            <Phone className="h-3 w-3 text-amber-300" />
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

