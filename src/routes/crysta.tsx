import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import {
  CheckCircle2,
  Users,
  Briefcase,
  Snowflake,
  MessageCircle,
  Phone,
  ArrowLeft,
  MapPin,
  Gauge,
  UserCheck,
  IndianRupee,
  Star,
  Shield,
  Fuel,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Zap,
  Heart,
  Camera,
} from "lucide-react";
import { waLink, telLink, SITE } from "@/lib/site-config";

export const Route = createFileRoute("/crysta")({
  head: () => ({
    meta: [
      { title: "Innova Crysta Rental Bangalore — Yellow Board Taxi | Souparnika Travels" },
      {
        name: "description",
        content:
          "Hire a premium white Innova Crysta with yellow board registration for outstation, airport transfer, local & wedding trips in Bangalore. Verified drivers, transparent pricing, 24/7 support.",
      },
    ],
  }),
  component: CrystaPage,
});

/* ── Crysta vehicle data ── */
const CRYSTA_INFO = {
  name: "Toyota Innova Crysta",
  tagline: "Bangalore's Most Trusted Premium 7-Seater",
  subtitle: "Yellow Board · Commercial Registration · All-India Permit",
  seating: 7,
  luggage: "3 Large + 2 Cabin Bags",
  fuelType: "Diesel / Petrol",
  transmission: "Automatic / Manual",
  ac: true,
  startingPrice: 14,
  perKmRate: 14,
  minKm: 250,
  driverAllowance: 400,
  heroImage: "/images/fleets/cars/crysta-white-yellowboard.png",
  gallery: [
    "/images/fleets/cars/crysta-white-yellowboard.png",
    "/images/fleets/cars/crysta-interior.png",
    "/images/fleets/cars/crysta-side-view.png",
  ],
  features: [
    "7 Spacious Reclining Seats",
    "Automatic Climate Control AC",
    "Premium Leather Upholstery",
    "Touchscreen Infotainment System",
    "USB Charging at Every Row",
    "Rear AC Vents for All Passengers",
    "Alloy Wheels & LED Headlamps",
    "Professional Uniformed Chauffeur",
  ],
  suitableFor: [
    "Airport Transfer",
    "Outstation Trips",
    "Local City Rental",
    "Wedding VIP",
    "Corporate Travel",
    "Family Tours",
    "Pilgrimage",
    "Hill Station Trips",
  ],
  highlights: [
    { icon: Users, label: "7 Seater", desc: "Comfortable seating for up to 7 passengers" },
    { icon: Gauge, label: "₹14/km", desc: "Transparent per-km pricing, no hidden charges" },
    { icon: Shield, label: "Yellow Board", desc: "Commercially registered with all-India permit" },
    { icon: Snowflake, label: "Powerful AC", desc: "Automatic dual-zone climate control" },
    { icon: Fuel, label: "Diesel", desc: "Fuel-efficient diesel engine for long drives" },
    { icon: UserCheck, label: "Pro Driver", desc: "Verified, experienced chauffeur included" },
  ],
  popularRoutes: [
    { destination: "Bangalore → Mysore", distance: "145 km", duration: "3h", price: "₹3,500" },
    { destination: "Bangalore → Coorg", distance: "265 km", duration: "6h", price: "₹5,200" },
    { destination: "Bangalore → Ooty", distance: "275 km", duration: "7h", price: "₹5,500" },
    { destination: "Bangalore → Tirupati", distance: "250 km", duration: "5h", price: "₹4,800" },
    { destination: "Bangalore → Chikmagalur", distance: "240 km", duration: "5h", price: "₹4,600" },
    { destination: "Bangalore → Wayanad", distance: "280 km", duration: "6.5h", price: "₹5,400" },
  ],
  localPackages: [
    { name: "4 Hour / 40 km", price: "₹1,800", desc: "Quick city errands & meetings" },
    { name: "8 Hour / 80 km", price: "₹3,200", desc: "Full-day Bangalore sightseeing" },
    { name: "12 Hour / 120 km", price: "₹4,500", desc: "Extended day, events & functions" },
    { name: "Airport Transfer", price: "₹1,500", desc: "One-way KIA Airport pickup/drop" },
  ],
};

function CrystaPage() {
  const [activeGallery, setActiveGallery] = useState(0);

  return (
    <SiteLayout>
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071525] via-[#0c2240] to-[#0f3460]">
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-500/3 to-transparent rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link to="/fleets" className="hover:text-white/80 transition-colors">Our Fleet</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-amber-400 font-semibold">Innova Crysta</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/15 border border-amber-500/30 rounded-full mb-4 sm:mb-5">
                <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-[11px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Yellow Board · All-India Permit
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                Toyota Innova
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                  Crysta
                </span>
              </h1>

              <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-white/70 leading-relaxed max-w-lg">
                {CRYSTA_INFO.tagline}. Commercially registered white Innova Crysta with yellow board,
                professional chauffeur, and transparent per-km billing.
              </p>

              {/* Quick Stats Row */}
              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { value: "7", label: "Passengers", icon: Users },
                  { value: "₹14", label: "Per Km", icon: IndianRupee },
                  { value: "24/7", label: "Available", icon: Clock },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-2.5 sm:px-4 py-2.5 sm:py-3 text-center hover:bg-white/10 transition-all duration-300"
                  >
                    <stat.icon className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                    <div className="text-lg sm:text-xl font-black text-white">{stat.value}</div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-white/50 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={waLink("Hi, I'd like to book an Innova Crysta with yellow board for a trip.")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Booking
                </a>
                <a
                  href={telLink()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-sm rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative mt-2 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
                <img
                  src={CRYSTA_INFO.heroImage}
                  alt="White Toyota Innova Crysta with Yellow Board"
                  className="w-full h-auto object-cover aspect-[4/3]"
                  loading="eager"
                />
                {/* Yellow Board Badge */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-yellow-400 text-[#071525] font-black text-[10px] sm:text-xs rounded-lg shadow-lg">
                  <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  YELLOW BOARD REGISTERED
                </div>
              </div>
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/15 via-transparent to-blue-500/10 rounded-3xl -z-10 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* HIGHLIGHTS STRIP */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-y border-amber-200/60 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
            {CRYSTA_INFO.highlights.map((h) => (
              <div
                key={h.label}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-amber-200/50 p-3 sm:p-4 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-9 w-9 sm:h-10 sm:w-10 mx-auto rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white grid place-items-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <h.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="mt-2 text-xs sm:text-sm font-black text-[#071525]">{h.label}</div>
                <div className="text-[10px] text-slate-500 leading-snug mt-0.5">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* IMAGE GALLERY + VEHICLE INFO */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Gallery */}
            <div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative group">
                <img
                  src={CRYSTA_INFO.gallery[activeGallery]}
                  alt={`Innova Crysta - View ${activeGallery + 1}`}
                  className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <Camera className="h-3 w-3" />
                  {activeGallery + 1} / {CRYSTA_INFO.gallery.length}
                </div>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-1">
                {CRYSTA_INFO.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveGallery(i)}
                    className={`flex-1 min-w-[70px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      i === activeGallery
                        ? "border-amber-500 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30"
                        : "border-slate-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Crysta thumbnail ${i + 1}`}
                      className="w-full h-16 sm:h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Info */}
            <div>
              <h2 className="font-display text-3xl font-black text-[#071525] tracking-tight">
                Vehicle Specifications
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                The Toyota Innova Crysta is India's most preferred premium MPV for taxi and rental services.
                With its spacious interiors, powerful diesel engine, and unmatched ride quality, it's the
                ideal vehicle for comfortable family and business travel.
              </p>

              {/* Specs Grid */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "Seating Capacity", value: `${CRYSTA_INFO.seating} Passengers`, icon: Users },
                  { label: "Luggage", value: CRYSTA_INFO.luggage, icon: Briefcase },
                  { label: "Air Conditioning", value: "Automatic Dual-Zone", icon: Snowflake },
                  { label: "Fuel Type", value: CRYSTA_INFO.fuelType, icon: Fuel },
                  { label: "Per Km Rate", value: `₹${CRYSTA_INFO.perKmRate}/km`, icon: IndianRupee },
                  { label: "Driver Allowance", value: `₹${CRYSTA_INFO.driverAllowance}/day`, icon: UserCheck },
                  { label: "Min Distance", value: `${CRYSTA_INFO.minKm} km/day`, icon: Gauge },
                  { label: "Registration", value: "Yellow Board", icon: Shield },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 hover:bg-amber-50/50 hover:border-amber-200/60 transition-all duration-300"
                  >
                    <spec.icon className="h-4 w-4 text-amber-600 mb-1.5" />
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{spec.label}</div>
                    <div className="text-sm font-extrabold text-[#071525] mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Yellow Board Callout */}
              <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-300/60 rounded-xl p-4 flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-yellow-400 text-[#071525] grid place-items-center shrink-0 shadow-md">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-black text-[#071525]">Yellow Board — Legally Registered</div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    All our Innova Crysta vehicles carry commercial yellow board registration with All-India Tourist
                    Permit. Fully compliant with RTO regulations for hassle-free interstate travel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* FEATURES SECTION */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 border border-amber-200 rounded-full mb-4">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Premium Features</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#071525] tracking-tight">
              Why Choose Innova Crysta?
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto">
              Every trip with our Crysta comes equipped with premium amenities for maximum comfort.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CRYSTA_INFO.features.map((feature, i) => (
              <div
                key={feature}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-xl hover:-translate-y-1 hover:border-amber-300/60 transition-all duration-300 group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#071525] to-[#155EEF] text-white grid place-items-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="text-sm font-bold text-[#071525]">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRICING / LOCAL PACKAGES */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#071525] tracking-tight">
              Rental Packages & Pricing
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto">
              Transparent pricing with no hidden charges. Choose the package that fits your trip.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CRYSTA_INFO.localPackages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl border p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  i === 1
                    ? "bg-gradient-to-br from-[#071525] to-[#0c2240] text-white border-amber-500/50 shadow-xl shadow-[#071525]/20 ring-2 ring-amber-400/20"
                    : "bg-white border-slate-200 hover:border-amber-300/60"
                }`}
              >
                {i === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-[#071525] text-[10px] font-black uppercase tracking-wider rounded-full">
                    Most Popular
                  </div>
                )}
                <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${i === 1 ? "text-amber-300" : "text-amber-600"}`}>
                  {pkg.name}
                </div>
                <div className={`text-3xl font-black ${i === 1 ? "text-white" : "text-[#071525]"}`}>
                  {pkg.price}
                </div>
                <p className={`text-xs mt-2 mb-4 ${i === 1 ? "text-white/60" : "text-slate-500"}`}>
                  {pkg.desc}
                </p>
                <a
                  href={waLink(`Hi, I'd like to book an Innova Crysta for ${pkg.name} package.`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    i === 1
                      ? "bg-amber-400 text-[#071525] hover:bg-amber-300"
                      : "bg-[#071525] text-white hover:bg-[#155EEF]"
                  }`}
                >
                  Book Now <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            * All prices are approximate. Toll, parking, and state permit charges are extra at actuals.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* POPULAR ROUTES */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#071525] tracking-tight">
              Popular Outstation Routes
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto">
              Estimated pricing for popular routes from Bangalore in Innova Crysta.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CRYSTA_INFO.popularRoutes.map((route) => (
              <div
                key={route.destination}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:-translate-y-0.5 hover:border-amber-300/60 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-600 grid place-items-center group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-black text-[#071525]">{route.destination}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Gauge className="h-3 w-3" /> {route.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {route.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="text-lg font-black text-[#071525]">
                    {route.price}
                    <span className="text-[10px] text-slate-400 font-bold ml-1">approx</span>
                  </div>
                  <a
                    href={waLink(`Hi, I'd like to book an Innova Crysta for ${route.destination}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#155EEF] hover:text-amber-600 transition-colors"
                  >
                    Book <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SUITABLE FOR */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-black text-[#071525] tracking-tight">
              Ideal For Every Occasion
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {CRYSTA_INFO.suitableFor.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-50 to-amber-50/50 border border-slate-200 rounded-full text-sm font-bold text-[#071525] hover:border-amber-400 hover:shadow-md transition-all duration-300 cursor-default"
              >
                <Heart className="h-3.5 w-3.5 text-amber-500" />
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* BOOKING ENQUIRY CTA */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#071525] via-[#0c2240] to-[#0f3460] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-20 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left CTA Text */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
                Ready to Book Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400"> Innova Crysta</span>?
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed max-w-lg">
                Get an instant quote for your trip. Our team responds within 5 minutes on WhatsApp.
                No advance needed for local city rentals!
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Transparent pricing — no hidden charges",
                  "Verified, background-checked professional driver",
                  "All-India permit yellow board registration",
                  "Free cancellation up to 24 hours before trip",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-white/80 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waLink("Hi, I need to book an Innova Crysta. Please share availability and quote.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
                <a
                  href={telLink()}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-400 text-[#071525] font-bold text-sm rounded-xl shadow-lg shadow-amber-400/25 hover:bg-amber-300 hover:scale-[1.02] transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                  {SITE.phone}
                </a>
              </div>
            </div>

            {/* Right: Enquiry Form */}
            <div className="bg-white rounded-2xl shadow-2xl border border-white/10 p-6 sm:p-8">
              <h3 className="text-xl font-black text-[#071525] mb-1">Quick Enquiry</h3>
              <p className="text-xs text-slate-500 mb-5">Fill the form and we'll call you within 5 minutes.</p>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TERMS & CONDITIONS */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-black text-[#071525] mb-3">Terms & Conditions</h3>
          <ul className="space-y-1.5 text-xs text-slate-500 leading-relaxed">
            <li>• Minimum {CRYSTA_INFO.minKm} km charged per calendar day for outstation trips.</li>
            <li>• Driver day allowance of ₹{CRYSTA_INFO.driverAllowance} covers 6 AM to 10 PM. Night charges apply beyond 10 PM.</li>
            <li>• Tolls, state permit tax, parking, and inter-state charges are extra at actuals.</li>
            <li>• Vehicle model guaranteed is Innova Crysta or equivalent. Specific color preference subject to availability.</li>
            <li>• All vehicles carry commercial yellow board registration and All-India Tourist Permit.</li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
