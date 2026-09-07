import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { FleetCard } from "@/components/site/Cards";
import { fleetBySlugQuery, fleetsQuery, type Fleet } from "@/lib/queries";
import { openEnquiryDialog } from "@/lib/enquiry-dialog";
import {
  CheckCircle2,
  Users,
  Briefcase,
  Snowflake,
  MessageCircle,
  Phone,
  ArrowLeft,
  MapPin,
  Route as RouteIcon,
  Gauge,
  UserCheck,
  IndianRupee,
  Wallet,
  ShieldCheck,
  FileText,
  Wrench,
  Music,
  Plug,
  Navigation,
  Heart,
  Sofa,
  Star,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Calculator,
  ArrowRight,
  Car,
  Clock,
  Compass,
  Target,
  ChevronDown,
  ChevronUp,
  Plane,
  Building,
  Map,
} from "lucide-react";
import { waLink, telLink } from "@/lib/site-config";
import { VehiclePricingFormatCard } from "@/components/site/fleets/VehiclePricingFormatCard";

export const Route = createFileRoute("/fleets/$slug")({
  head: ({ params }) => {
    if (params.slug === "ertiga") {
      return {
        meta: [
          { title: "Ertiga Car Rental | Ertiga Outstation & Local Travel" },
          {
            name: "description",
            content:
              "Book a comfortable Ertiga for outstation trips, local travel, airport transfers and corporate transportation. View Ertiga rental rates and enquire today.",
          },
        ],
      };
    }
    return {
      meta: [
        { title: `${toTitle(params.slug)} — Souparnika Travels` },
        {
          name: "description",
          content: `Book ${toTitle(params.slug)} with Souparnika Travels. Verified driver, transparent per-km pricing, 24×7 support across South India.`,
        },
      ],
    };
  },
  component: FleetDetail,
});

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

const FEATURE_ICONS: { pattern: RegExp; icon: React.ComponentType<{ className?: string }> }[] = [
  { pattern: /music|audio|entertain/i, icon: Music },
  { pattern: /charg|usb|power/i, icon: Plug },
  { pattern: /gps|nav|tracking/i, icon: Navigation },
  { pattern: /first[- ]?aid|safety/i, icon: Heart },
  { pattern: /luggage|boot|storage/i, icon: Briefcase },
  { pattern: /pushback|recline|comfort|seat/i, icon: Sofa },
  { pattern: /driver/i, icon: UserCheck },
  { pattern: /air[- ]?condition|\bac\b/i, icon: Snowflake },
];

function featureIcon(feature: string) {
  const hit = FEATURE_ICONS.find((f) => f.pattern.test(feature));
  return hit?.icon ?? CheckCircle2;
}

function FleetDetail() {
  const { slug } = Route.useParams();
  const { data: fleet, isLoading } = useQuery(fleetBySlugQuery(slug));
  const { data: allFleets = [] } = useQuery(fleetsQuery());

  const related = useMemo(() => {
    if (!fleet) return [] as Fleet[];
    const same = allFleets
      .filter((f) => f.id !== fleet.id)
      .map((f) => {
        let score = 0;
        if (f.category === fleet.category) score += 3;
        if (Math.abs(f.seating - fleet.seating) <= 2) score += 2;
        const overlap = (f.suitable_for ?? []).filter((s) =>
          (fleet.suitable_for ?? []).includes(s),
        ).length;
        score += overlap;
        return { f, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((x) => x.f);
    return same;
  }, [fleet, allFleets]);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="max-w-7xl mx-auto container-p py-20 text-muted-foreground">Loading…</div>
      </SiteLayout>
    );
  }
  if (!fleet) throw notFound();

  const isErtiga = slug === "ertiga";

  const gallery =
    fleet.gallery && fleet.gallery.length > 0
      ? fleet.gallery
      : fleet.image_url
        ? [fleet.image_url]
        : [];

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="bg-[color:var(--brand-soft)] border-b border-border">
        <div className="max-w-7xl mx-auto container-p py-4 flex items-center justify-between gap-3">
          <nav className="text-xs text-muted-foreground flex items-center gap-1.5 truncate">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/fleets" className="hover:text-foreground">Fleets</Link>
            <span>/</span>
            <span className="text-foreground font-semibold truncate">{fleet.name}</span>
          </nav>
          <Link
            to="/fleets"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground shrink-0"
          >
            <ArrowLeft className="h-4 w-4" /> Back to fleets
          </Link>
        </div>
      </div>

      {/* ── ERTIGA DEDICATED / GENERAL HERO SECTION ─────────────────────── */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto container-p grid lg:grid-cols-2 gap-10 items-start">
          <Gallery images={gallery} name={fleet.name} />

          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[color:var(--brand-navy)] text-white text-[11px] font-black uppercase tracking-wider">
                {isErtiga ? "ERTIGA" : fleet.category}
              </span>
              {fleet.is_featured && (
                <span className="px-3 py-1 rounded-full bg-[color:var(--brand-gold)] text-[11px] font-black text-[color:var(--brand-navy)] uppercase tracking-wider">
                  Featured
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Available for Booking
              </span>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[color:var(--brand-blue)]">
                {isErtiga ? "Ertiga – Comfortable & Reliable Travel" : fleet.category}
              </p>
              <h1 className="mt-1 font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-[color:var(--brand-navy)] tracking-tight">
                {fleet.name}
              </h1>
            </div>

            {fleet.short_description && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{fleet.short_description}</p>
            )}

            {/* Quick highlights */}
            <div className="grid grid-cols-3 gap-3">
              <Spec icon={Users} label="Seating" value={fleet.seating_label || `${fleet.seating} Seats`} />
              {fleet.luggage && <Spec icon={Briefcase} label="Luggage" value={fleet.luggage} />}
              <Spec icon={Snowflake} label="AC" value={fleet.ac ? "Dual AC Vents" : "Non-AC"} />
            </div>

            {/* CTA buttons */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[color:var(--brand-navy)] to-[color:var(--brand-blue)] text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap border-b border-white/10 pb-3">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-slate-300 font-semibold">Local 8h / 80km Package</div>
                  <div className="font-display font-black text-3xl text-[color:var(--brand-gold)]">
                    ₹{fleet.local_package_rate?.toLocaleString("en-IN") ?? 2600}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-widest text-slate-300 font-semibold">Outstation Tariff</div>
                  <div className="font-display font-bold text-xl text-white">
                    ₹{fleet.per_km_rate ?? 16} <span className="text-xs opacity-80">/ km</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    openEnquiryDialog({
                      source: "ertiga_hero_book",
                      vehicleType: fleet.name,
                      message: `Booking Enquiry for ${fleet.name}`,
                    })
                  }
                  className="flex-1 py-3 px-5 rounded-xl bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] font-black text-sm hover:brightness-105 transition-all shadow-md text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Book {isErtiga ? "Ertiga" : fleet.name}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openEnquiryDialog({
                      source: "ertiga_hero_enquiry",
                      vehicleType: fleet.name,
                      message: `Quick Enquiry for ${fleet.name}`,
                    })
                  }
                  className="flex-1 py-3 px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm transition-all border border-white/20 text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Get a Quick Enquiry</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Verified Chauffeur · Sanitized Vehicles · Clear Pricing · 24/7 Assistance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. VEHICLE HIGHLIGHTS ─────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto container-p space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-[color:var(--brand-blue)]">
              KEY SPECIFICATIONS
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[color:var(--brand-navy)]">
              Vehicle Highlights
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
            <HighlightCard
              icon={Car}
              title="Vehicle"
              value={fleet.name}
              sub="Premium MUV Engineering"
            />
            <HighlightCard
              icon={Users}
              title="Seating"
              value={fleet.seating_label || `${fleet.seating} Seater`}
              sub="Ergonomic & Comfortable Layout"
            />
            <HighlightCard
              icon={Wrench}
              title="Vehicle Type"
              value={fleet.category || "MUV"}
              sub="Multi-Utility Vehicle"
            />
            <HighlightCard
              icon={Target}
              title="Ideal For"
              value="Family Trips, Outstation Travel, Corporate Travel, Airport Transfers"
              sub="Versatile Group Capability"
            />
            <HighlightCard
              icon={Sofa}
              title="Comfort"
              value="Spacious Interior"
              sub="Dual AC Blowers & Quiet Cabin"
            />
            <HighlightCard
              icon={Briefcase}
              title="Luggage"
              value={fleet.luggage || "Large Boot Space"}
              sub="Ample Cargo Capacity for Bags"
            />
          </div>
        </div>
      </section>

      {/* ── 4. PRICING SECTION ───────────────────────────────────────── */}
      <section id="pricing" className="py-14 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto container-p space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-black uppercase tracking-wider">
              <IndianRupee className="h-3.5 w-3.5" /> TRANSPARENT TARIFF & RATES
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[color:var(--brand-navy)]">
              Rental Pricing & Tariff Sheet
            </h2>
            <div className="inline-block px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-sm shadow-sm">
              Primary Base Package: 8 Hrs / 80 KM – ₹{(fleet.local_package_rate ?? (fleet.per_km_rate ? fleet.per_km_rate * 100 : 2600)).toLocaleString("en-IN")}
            </div>
          </div>

          {/* Responsive Mobile Tariff Card (Visible on Mobile < md) */}
          <div className="block md:hidden space-y-3">
            <div className="bg-gradient-to-br from-[#071525] to-[#0e243f] rounded-2xl p-5 text-white shadow-xl border border-slate-700/50 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-400 grid place-items-center">
                    <Car className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle</div>
                    <div className="text-base font-black text-white">{isErtiga ? "ERTIGA" : fleet.name}</div>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full shadow">
                  Base Package
                </span>
              </div>

              {/* Highlight Base Rate */}
              <div className="flex items-baseline justify-between bg-white/5 rounded-xl p-3 border border-white/10">
                <div>
                  <div className="text-xs text-slate-300 font-bold">8 Hours / 80 KM</div>
                  <div className="text-[11px] text-slate-400">Local City Rental</div>
                </div>
                <div className="text-2xl font-black text-amber-400">
                  ₹{(fleet.local_package_rate ?? 2600).toLocaleString("en-IN")}
                </div>
              </div>

              {/* 2x2 Tariff Grid for Additional Rates */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Extra Hour</div>
                  <div className="text-sm font-black text-white mt-0.5">₹{fleet.extra_hour_rate ?? 180}/hr</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Extra KM</div>
                  <div className="text-sm font-black text-white mt-0.5">₹{fleet.extra_km_rate ?? fleet.per_km_rate ?? 16}/km</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Driver Allowance</div>
                  <div className="text-sm font-black text-white mt-0.5">₹{fleet.driver_allowance ?? 400}/day</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Min Outstation KM</div>
                  <div className="text-sm font-black text-blue-300 mt-0.5">{fleet.min_km ?? 300} KM/day</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Table (Visible on Desktop/Tablet >= md) */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[color:var(--brand-navy)] text-white text-xs sm:text-sm">
                    <th className="py-4 px-5 font-extrabold uppercase">Vehicle</th>
                    <th className="py-4 px-5 font-extrabold uppercase text-amber-300">8 Hrs / 80 KM</th>
                    <th className="py-4 px-5 font-extrabold uppercase">Extra Hour</th>
                    <th className="py-4 px-5 font-extrabold uppercase">Extra KM</th>
                    <th className="py-4 px-5 font-extrabold uppercase">Driver Allowance</th>
                    <th className="py-4 px-5 font-extrabold uppercase">Minimum KM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-800">
                  <tr className="bg-amber-50/40 hover:bg-amber-50 transition-colors">
                    <td className="py-4 px-5 font-black text-[color:var(--brand-navy)] flex items-center gap-2">
                      <Car className="h-4 w-4 text-[color:var(--brand-blue)]" />
                      <span>{isErtiga ? "ERTIGA" : fleet.name.toUpperCase()}</span>
                    </td>
                    <td className="py-4 px-5 font-black text-2xl text-blue-700">
                      ₹{fleet.local_package_rate?.toLocaleString("en-IN") ?? "2,600"}
                    </td>
                    <td className="py-4 px-5 font-extrabold text-slate-900">
                      ₹{fleet.extra_hour_rate ?? 180}
                    </td>
                    <td className="py-4 px-5 font-extrabold text-slate-900">
                      ₹{fleet.extra_km_rate ?? fleet.per_km_rate ?? 16}
                    </td>
                    <td className="py-4 px-5 font-extrabold text-slate-900">
                      ₹{fleet.driver_allowance ?? 400}
                    </td>
                    <td className="py-4 px-5 font-extrabold text-blue-800">
                      {fleet.min_km ?? 300} KM
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 5. RATE EXPLANATION ──────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-blue-800 font-extrabold text-base border-b border-blue-100 pb-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>8 Hours / 80 KM Package</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 font-medium">
                <li className="flex items-center justify-between">
                  <span>Base package price:</span>
                  <span className="font-extrabold text-blue-700 text-base">
                    ₹{(fleet.local_package_rate ?? 2600).toLocaleString("en-IN")}
                  </span>
                </li>
                <li className="flex items-center justify-between border-t border-slate-100 pt-2">
                  <span>Includes up to hours:</span>
                  <span className="font-bold text-slate-900">{fleet.local_package_hours ?? 8} hours</span>
                </li>
                <li className="flex items-center justify-between border-t border-slate-100 pt-2">
                  <span>Includes up to distance:</span>
                  <span className="font-bold text-slate-900">{fleet.local_package_km ?? 80} KM</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-extrabold text-base border-b border-amber-100 pb-2">
                <Gauge className="h-5 w-5 text-amber-600" />
                <span>Additional Usage</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 font-medium">
                <li className="flex items-center justify-between">
                  <span>Additional hour:</span>
                  <span className="font-bold text-slate-900">₹{fleet.extra_hour_rate ?? 180}/hour</span>
                </li>
                <li className="flex items-center justify-between border-t border-slate-100 pt-2">
                  <span>Additional KM:</span>
                  <span className="font-bold text-slate-900">₹{fleet.extra_km_rate ?? fleet.per_km_rate ?? 16}/KM</span>
                </li>
                <li className="flex items-center justify-between border-t border-slate-100 pt-2">
                  <span>Driver allowance:</span>
                  <span className="font-bold text-slate-900">₹{fleet.driver_allowance ?? 400}</span>
                </li>
                <li className="flex items-center justify-between border-t border-slate-100 pt-2">
                  <span>Minimum KM:</span>
                  <span className="font-bold text-slate-900">{fleet.min_km ?? 300} KM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. VEHICLE FEATURES ─────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto container-p space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-[color:var(--brand-blue)]">
              AMENITIES & ADVANTAGES
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[color:var(--brand-navy)]">
              Vehicle Features
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <FeatureCard title="Comfortable seating" desc="Ergonomic pushback seat arrangement with plush cushioning for fatigue-free travel." icon={Sofa} />
            <FeatureCard title="Spacious cabin" desc="Well-designed interior offering ample legroom and head room for all passengers." icon={Car} />
            <FeatureCard title="Ample luggage space" desc="Dedicated rear boot space for large travel bags and luggage items." icon={Briefcase} />
            <FeatureCard title="Air conditioning" desc="Efficient dual air conditioning vents keeping the entire cabin evenly cooled." icon={Snowflake} />
            <FeatureCard title="Family-friendly interior" desc="Clean, hygienic, smooth riding environment suited for kids and senior citizens." icon={Heart} />
            <FeatureCard title="Suitable for long-distance travel" desc="Engineered for smooth highway stability on long outstation tours." icon={Navigation} />
            <FeatureCard title="Professional chauffeur service" desc="Uniformed, polite, background-verified chauffeur with highway experience." icon={UserCheck} />
            <FeatureCard title="Reliable outstation travel" desc="Regularly maintained vehicle ensuring a safe, punctual, hassle-free journey." icon={ShieldCheck} />
          </div>
        </div>
      </section>

      {/* ── 7. SUITABLE FOR / PERFECT FOR ───────────────────────────── */}
      <section className="py-14 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto container-p space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-[color:var(--brand-blue)]">
              USE CASES
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[color:var(--brand-navy)]">
              Perfect For
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            <UseCaseCard
              title="Outstation Trips"
              desc="Comfortable Ertiga travel for long-distance journeys."
              icon={Compass}
            />
            <UseCaseCard
              title="Family Travel"
              desc="Spacious seating suitable for family trips."
              icon={Users}
            />
            <UseCaseCard
              title="Airport Transfers"
              desc="Convenient airport pickup and drop services."
              icon={Plane}
            />
            <UseCaseCard
              title="Corporate Travel"
              desc="Comfortable transportation for corporate requirements."
              icon={Building}
            />
            <UseCaseCard
              title="Local Travel"
              desc="Suitable for city and local transportation."
              icon={Clock}
            />
            <UseCaseCard
              title="Tour Packages"
              desc="Ideal for sightseeing and multi-day tours."
              icon={Map}
            />
          </div>
        </div>
      </section>

      {/* ── 8. IMAGE GALLERY ────────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto container-p space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-[color:var(--brand-blue)]">
              INTERIOR & EXTERIOR PHOTOS
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[color:var(--brand-navy)]">
              Image Gallery
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {gallery.map((imgUrl, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md aspect-[4/3]"
              >
                <img
                  src={imgUrl}
                  alt={`${fleet.name} view ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4">
                  <span className="text-white text-[10px] sm:text-xs font-bold">
                    {i === 0 ? "Main Exterior View" : i === 1 ? "Front View" : i === 2 ? "Seating Interior" : "Cockpit & Dashboard"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. BOOKING / ENQUIRY CTA ─────────────────────────────────── */}
      <section id="book" className="py-16 bg-gradient-to-br from-[color:var(--brand-navy)] via-[#071933] to-[color:var(--brand-blue)] text-white">
        <div className="max-w-4xl mx-auto container-p text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-black uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> INSTANT RESERVATION ASSISTANCE
          </span>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Ready to Travel in an Ertiga?
          </h2>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Book our comfortable Ertiga for local travel, airport transfers, corporate requirements and outstation journeys.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() =>
                openEnquiryDialog({
                  source: "ertiga_cta_book_now",
                  vehicleType: fleet.name,
                  message: `Booking request for ${fleet.name}`,
                })
              }
              className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-base hover:from-amber-300 hover:to-amber-400 transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <Phone className="h-5 w-5" />
              <span>Book Now</span>
            </button>

            <button
              type="button"
              onClick={() =>
                openEnquiryDialog({
                  source: "ertiga_cta_send_enquiry",
                  vehicleType: fleet.name,
                  message: `Enquiry for ${fleet.name}`,
                })
              }
              className="py-3.5 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base transition-all border border-white/20 cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5 text-emerald-400" />
              <span>Send Enquiry</span>
            </button>
          </div>
        </div>
      </section>

      {/* Embedded Enquiry Form */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <div className="max-w-4xl mx-auto container-p space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-[color:var(--brand-blue)]">
              RESERVE ONLINE
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[color:var(--brand-navy)]">
              Submit Your Trip Details
            </h2>
            <p className="text-slate-600 text-sm">
              Fill out your trip specifications below and our booking team will reach out with your exact quote.
            </p>
          </div>

          <EnquiryForm selectedVehicle={fleet.name} />
        </div>
      </section>

      {/* Related vehicles */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-border">
          <div className="max-w-7xl mx-auto container-p space-y-8">
            <div className="flex items-end justify-between flex-wrap gap-3">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
                  EXPLORE OTHER MODELS
                </span>
                <h2 className="mt-1 font-display font-extrabold text-2xl md:text-3xl text-[color:var(--brand-navy)]">
                  Related Vehicles
                </h2>
              </div>
              <Link
                to="/fleets"
                className="text-sm font-semibold text-[color:var(--brand-blue)] hover:underline flex items-center gap-1"
              >
                <span>Explore Full Fleet</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((r) => (
                <FleetCard key={r.id} fleet={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] rounded-2xl bg-secondary grid place-items-center text-muted-foreground">
        No image
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 relative border border-slate-200 shadow-md">
        <img
          src={images[active]}
          alt={`${name} — photo ${active + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/10">
          {active + 1} / {images.length}
        </div>
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                active === i ? "border-[color:var(--brand-blue)] ring-2 ring-blue-300" : "border-slate-200 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <div className="flex text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <span className="font-semibold text-slate-700">4.9/5 Rating</span>
        <span>·</span>
        <span>500+ Trips Completed</span>
      </div>
    </div>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
      <Icon className="h-4 w-4 mx-auto text-[color:var(--brand-blue)]" />
      <div className="mt-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">{label}</div>
      <div className="text-xs font-black text-[color:var(--brand-navy)] truncate mt-0.5">{value}</div>
    </div>
  );
}

function HighlightCard({
  icon: Icon,
  title,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-2">
      <div>
        <div className="flex items-start gap-2 sm:gap-2.5">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 grid place-items-center shrink-0">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 leading-tight">{title}</div>
            <div className="text-xs sm:text-base font-extrabold text-[color:var(--brand-navy)] leading-snug mt-0.5 break-words">{value}</div>
          </div>
        </div>
      </div>
      <div className="text-[10px] sm:text-xs text-slate-500 leading-relaxed pt-1.5 border-t border-slate-100/80">{sub}</div>
    </div>
  );
}

function FeatureCard({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between space-y-2 sm:space-y-3">
      <div className="space-y-2">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-blue-50 text-blue-600 grid place-items-center shrink-0">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="font-extrabold text-xs sm:text-sm text-[color:var(--brand-navy)] leading-snug break-words">{title}</div>
      </div>
      <div className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">{desc}</div>
    </div>
  );
}

function UseCaseCard({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4">
      <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 grid place-items-center shrink-0 shadow-sm">
        <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
      </div>
      <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
        <div className="font-extrabold text-xs sm:text-base text-[color:var(--brand-navy)] leading-snug break-words">{title}</div>
        <div className="text-[10px] sm:text-xs text-slate-600 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}
