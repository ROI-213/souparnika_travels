import { Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Send,
  Snowflake,
  Sparkles,
  Crown,
  Car,
  Bus,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import { DEFAULT_FLEETS, type Fleet } from "@/lib/data/vehicles";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/site-config";

export function RentalServicesSection({
  onSelectVehicle,
}: {
  onSelectVehicle?: (vehicleName: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Group vehicles strictly by category
  const urbaniaStandard = useMemo(() => {
    return DEFAULT_FLEETS.filter(
      (f) =>
        f.category === "Urbania" &&
        !f.name.includes("Maharaja") &&
        !f.name.includes("Luxury")
    ).sort((a, b) => a.display_order - b.display_order);
  }, []);

  const urbaniaLuxury = useMemo(() => {
    return DEFAULT_FLEETS.filter(
      (f) =>
        f.category === "Urbania" &&
        (f.name.includes("Maharaja") || f.name.includes("Luxury"))
    ).sort((a, b) => a.display_order - b.display_order);
  }, []);

  const tempoTravellers = useMemo(() => {
    return DEFAULT_FLEETS.filter((f) => f.category === "Tempo Traveller").sort(
      (a, b) => a.display_order - b.display_order
    );
  }, []);

  const coaches = useMemo(() => {
    return DEFAULT_FLEETS.filter((f) => f.category === "Coach").sort(
      (a, b) => a.display_order - b.display_order
    );
  }, []);

  const buses = useMemo(() => {
    return DEFAULT_FLEETS.filter((f) => f.category === "Bus").sort(
      (a, b) => a.display_order - b.display_order
    );
  }, []);

  const scrollToSection = (id: string) => {
    setActiveFilter(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white" id="rental-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* ── 1. HOMEPAGE FLEET SECTION INTRODUCTION ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#155EEF] bg-[#155EEF]/10 px-4 py-1.5 rounded-full inline-block">
            EXPLORE OUR FLEET
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#071525] tracking-tight">
            Choose the Perfect Vehicle for Every Journey
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From premium Force Urbania vans and comfortable Tempo Travellers to spacious coaches and buses, choose a fleet based on your group size, travel style and destination.
          </p>

          {/* Filter Chips Bar */}
          <div className="pt-4 flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: "all", label: "All Fleets" },
              { id: "urbania", label: "Force Urbania" },
              { id: "luxury-urbania", label: "Luxury Urbania" },
              { id: "tempo", label: "Tempo Traveller" },
              ...(coaches.length > 0 ? [{ id: "coaches", label: "Coaches" }] : []),
              ...(buses.length > 0 ? [{ id: "buses", label: "Buses" }] : []),
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => scrollToSection(chip.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 border whitespace-nowrap shadow-sm",
                  activeFilter === chip.id
                    ? "bg-[#071525] text-amber-400 border-[#071525] shadow-md scale-105"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── 2. FORCE URBANIA CATEGORY SECTION ── */}
        {urbaniaStandard.length > 0 && (
          <div id="section-urbania" className="space-y-8 scroll-mt-24">
            {/* Full-width Unified Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#071525] border border-slate-800 p-8 sm:p-10 lg:p-12 min-h-[380px] flex flex-col justify-between group">
              {/* Background Vehicle Image */}
              <img
                src="/images/fleets/urbania-12-seater.jpg"
                alt="Force Urbania Executive Van"
                className="absolute inset-0 w-full h-full object-cover object-center sm:object-right transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay: Dark on left for text readability, clear on right for vehicle visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#071525] via-[#071525]/85 via-50% to-transparent z-10" />

              {/* Banner Text Content */}
              <div className="relative z-20 max-w-2xl space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3">
                    <Sparkles className="h-3.5 w-3.5" /> Premium Group Travel
                  </span>
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
                    Force Urbania Fleet
                  </h3>
                  <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                    Experience premium group travel with spacious interiors, reclining seats, individual AC vents and professional chauffeurs for city, airport and outstation journeys.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Capacity Badge */}
                  <div className="text-xs text-amber-300 font-extrabold flex items-center gap-2">
                    <Users className="h-4 w-4 text-amber-400" />
                    <span>9 to 16 Seater Executive Configurations</span>
                  </div>

                  {/* Use Cases Chips */}
                  <div className="flex flex-wrap gap-2">
                    {["Corporate Travel", "Family Tours", "Airport Transfer", "Outstation Trips"].map((uc) => (
                      <span
                        key={uc}
                        className="px-2.5 py-1 rounded-md bg-black/40 border border-white/10 text-white text-[11px] font-semibold backdrop-blur-sm"
                      >
                        ✓ {uc}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="#booking-form"
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071525] font-extrabold text-xs transition-all shadow-lg flex items-center gap-2"
                    >
                      <span>Explore Urbania Fleet</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={waLink("Hi, I would like to get a quote for Force Urbania rental.")}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-2"
                    >
                      <Send className="h-3.5 w-3.5 fill-white" />
                      <span>Get Instant Quote</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h4 className="font-display font-extrabold text-xl text-[#071525]">
                  Available Force Urbania Options
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose the right seating capacity for your group ({urbaniaStandard.length} Models Available)
                </p>
              </div>
              <Link
                to="/fleets"
                className="text-xs font-extrabold text-[#155EEF] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {urbaniaStandard.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelectVehicle={onSelectVehicle}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── 3. LUXURY URBANIA CATEGORY SECTION ── */}
        {urbaniaLuxury.length > 0 && (
          <div id="section-luxury-urbania" className="space-y-8 scroll-mt-24">
            {/* Luxury Full-width Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-slate-950 to-[#071525] border border-amber-500/40 p-8 sm:p-10 lg:p-12 min-h-[380px] flex flex-col justify-between group">
              <img
                src="/images/fleets/urbania-maharaja-10-seater.jpg"
                alt="Luxury Urbania Maharaja Cabin"
                className="absolute inset-0 w-full h-full object-cover object-center sm:object-right transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 via-50% to-transparent z-10" />

              <div className="relative z-20 max-w-2xl space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-[#071525] text-xs font-black uppercase tracking-wider mb-3 shadow-lg">
                    <Crown className="h-3.5 w-3.5 fill-[#071525]" /> Luxury &amp; Maharaja Collection
                  </span>
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
                    Luxury Urbania Experiences
                  </h3>
                  <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                    Travel in enhanced comfort with Maharaja seating, premium interiors, pushback recliners, ambient lighting and executive styling.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-xs text-amber-300 font-extrabold flex items-center gap-2">
                    <Crown className="h-4 w-4 text-amber-400" />
                    <span>Premium 9, 10 and 12 Seater Maharaja Configurations</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["VIP Guest Transfer", "Executive Travel", "Luxury Family Tours", "Wedding Transportation"].map((uc) => (
                      <span
                        key={uc}
                        className="px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-200 text-[11px] font-bold backdrop-blur-sm"
                      >
                        👑 {uc}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="#booking-form"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#071525] font-black text-xs transition-all shadow-xl flex items-center gap-2"
                    >
                      <span>Explore Luxury Fleet</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={waLink("Hi, I am interested in booking the Maharaja Luxury Urbania.")}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-2"
                    >
                      <Send className="h-3.5 w-3.5 fill-white" />
                      <span>Request Premium Quote</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h4 className="font-display font-extrabold text-xl text-[#071525]">
                  Available Luxury Urbania Options
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Royal Maharaja recliners &amp; luxury interiors ({urbaniaLuxury.length} Models Available)
                </p>
              </div>
              <Link
                to="/fleets"
                className="text-xs font-extrabold text-[#155EEF] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Cards Grid - 4 Cards in 1 Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {urbaniaLuxury.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelectVehicle={onSelectVehicle}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── 4. TEMPO TRAVELLER CATEGORY SECTION ── */}
        {tempoTravellers.length > 0 && (
          <div id="section-tempo" className="space-y-8 scroll-mt-24">
            {/* Tempo Full-width Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#071525] via-[#0b2447] to-[#071525] border border-blue-500/30 p-8 sm:p-10 lg:p-12 min-h-[380px] flex flex-col justify-between group">
              <img
                src="/images/fleets/tempo-12-seater-interior.png"
                alt="Tempo Traveller Cabin"
                className="absolute inset-0 w-full h-full object-cover object-center sm:object-right transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071525] via-[#071525]/85 via-50% to-transparent z-10" />

              <div className="relative z-20 max-w-2xl space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-extrabold uppercase tracking-wider mb-3">
                    <Car className="h-3.5 w-3.5" /> Comfortable Group Journeys
                  </span>
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
                    Tempo Traveller Fleet
                  </h3>
                  <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                    Flexible and comfortable group transportation for local sightseeing, family trips, pilgrimages, weekend tours and multi-day outstation travel.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-xs text-blue-300 font-extrabold flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span>Available in 9 Seater and 12 Seater Configurations</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["Pilgrimage Trips", "Family Groups", "Weekend Tours", "Outstation Travel"].map((uc) => (
                      <span
                        key={uc}
                        className="px-2.5 py-1 rounded-md bg-black/40 border border-white/10 text-white text-[11px] font-semibold backdrop-blur-sm"
                      >
                        ✓ {uc}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="#booking-form"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-all shadow-lg flex items-center gap-2"
                    >
                      <span>View Tempo Travellers</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={waLink("Hi, I want to check availability for Tempo Traveller rental.")}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-2"
                    >
                      <Send className="h-3.5 w-3.5 fill-white" />
                      <span>Check Availability</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h4 className="font-display font-extrabold text-xl text-[#071525]">
                  Available Tempo Traveller Options
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reliable pushback seating &amp; powerful AC ({tempoTravellers.length} Models Available)
                </p>
              </div>
              <Link
                to="/fleets"
                className="text-xs font-extrabold text-[#155EEF] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Cards Grid - 4 Cards in 1 Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tempoTravellers.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelectVehicle={onSelectVehicle}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function VehicleCard({
  vehicle,
  onSelectVehicle,
}: {
  vehicle: Fleet;
  onSelectVehicle?: (vehicleName: string) => void;
}) {
  const images =
    vehicle.gallery && vehicle.gallery.length > 0
      ? vehicle.gallery
      : [vehicle.image_url ?? "/images/fleets/urbania-10-seater.jpg"];
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleEnquireClick = () => {
    if (onSelectVehicle) {
      onSelectVehicle(vehicle.name);
    }
    const formEl =
      document.getElementById("booking-form") ||
      document.getElementById("booking-section");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="group rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Vehicle Image Slider Area */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
        <img
          src={images[currentIdx]}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-[#071525] text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
          {vehicle.category}
        </div>

        {/* AC Badge */}
        {vehicle.ac && (
          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <Snowflake className="h-3 w-3" /> AC
          </div>
        )}

        {/* Slider Controls */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous vehicle image"
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Next vehicle image"
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`View slide ${idx + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIdx(idx);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    idx === currentIdx ? "w-4 bg-amber-400" : "w-1.5 bg-white/40"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-display font-extrabold text-base text-[#071525] group-hover:text-[#155EEF] transition-colors">
            {vehicle.name}
          </h3>

          <div className="mt-1 text-xs text-slate-500 font-medium">
            Starting from{" "}
            <span className="text-sm font-extrabold text-[#071525]">
              ₹{vehicle.starting_price ?? vehicle.per_km_rate}
            </span>
            /km
          </div>

          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {vehicle.short_description}
          </p>

          <div className="mt-3.5 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
            <span className="inline-flex items-center gap-1 font-bold text-[#071525] bg-slate-100 px-2.5 py-1 rounded-md">
              <Users className="h-3.5 w-3.5 text-[#155EEF]" /> {vehicle.seating} Seats
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md line-clamp-1">
              <Briefcase className="h-3.5 w-3.5" /> {vehicle.luggage?.split("+")[0]}
            </span>
          </div>

          <ul className="mt-3 space-y-1.5">
            {(vehicle.features ?? []).slice(0, 3).map((feat) => (
              <li key={feat} className="flex items-center gap-1.5 text-xs text-slate-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#155EEF] shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Link
            to="/fleets/$slug"
            params={{ slug: vehicle.slug }}
            className="inline-flex items-center justify-center gap-1 h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors text-center"
          >
            <span>View Details</span>
          </Link>

          <button
            type="button"
            onClick={handleEnquireClick}
            className="inline-flex items-center justify-center gap-1 h-10 px-3 rounded-xl bg-[#071525] text-white text-xs font-bold hover:bg-[#155EEF] transition-colors shadow-sm text-center"
          >
            <Send className="h-3 w-3 text-amber-400" />
            <span>Enquire Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
