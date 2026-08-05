import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FleetCard } from "@/components/site/Cards";
import { servicesQuery, fleetsQuery, submitEnquiry, type ServiceItem, type Fleet } from "@/lib/queries";
import { openEnquiryDialog } from "@/lib/enquiry-dialog";
import { SITE, telLink, waLink } from "@/lib/site-config";
import {
  Car,
  Compass,
  Plane,
  Briefcase,
  Heart,
  Users,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Star,
  Calendar,
  User,
  Send,
  HelpCircle,
  Award,
  Layers,
  Sparkle,
  Settings,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Premium Travel Services — Souparnika Travels Bangalore" },
      {
        name: "description",
        content:
          "Explore complete travel & fleet solutions in Bangalore: Local City Rentals, Outstation Trips, Airport Transfers, Corporate Mobility, Wedding Guest Transportation, and Luxury Urbania Fleet Support.",
      },
    ],
  }),
  component: ServicesOverviewPage,
});

function ServicesOverviewPage() {
  const { data: services = [] } = useQuery(servicesQuery());
  const { data: fleets = [] } = useQuery(fleetsQuery());

  const [activeFleetFilter, setActiveFleetFilter] = useState<string>("All");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form states for Airport Quick Enquiry
  const [airportForm, setAirportForm] = useState({
    pickup: "",
    drop: "",
    type: "Drop to Airport",
    date: "",
    time: "",
    flightNo: "",
    passengers: "4",
    vehicle: "Force Urbania 10 Seater",
    name: "",
    phone: "",
  });
  const [airportStatus, setAirportStatus] = useState<{ loading: boolean; ref?: string; msg?: string } | null>(null);

  // Form states for Custom Trip Planner
  const [plannerForm, setPlannerForm] = useState({
    serviceType: "Outstation Trips",
    pickup: "",
    destination: "",
    travelDate: "",
    returnDate: "",
    passengers: "6",
    preferredVehicle: "Force Urbania 12 Seater",
    tripType: "Round Trip",
    specialReq: "",
    name: "",
    phone: "",
    email: "",
  });
  const [plannerStatus, setPlannerStatus] = useState<{ loading: boolean; ref?: string; msg?: string } | null>(null);

  // Filter fleets based on category selection
  const filteredFleets = useMemo(() => {
    if (activeFleetFilter === "All") return fleets.slice(0, 8);
    if (activeFleetFilter === "Local Travel") return fleets.filter((f) => f.available_local).slice(0, 6);
    if (activeFleetFilter === "Outstation") return fleets.filter((f) => f.available_outstation).slice(0, 6);
    if (activeFleetFilter === "Corporate") return fleets.filter((f) => f.suitable_for?.includes("Corporate") || f.category === "Urbania").slice(0, 6);
    if (activeFleetFilter === "Wedding") return fleets.filter((f) => f.suitable_for?.includes("Wedding") || f.slug.includes("maharaja")).slice(0, 6);
    if (activeFleetFilter === "Airport") return fleets.filter((f) => f.category === "Urbania" || f.seating <= 12).slice(0, 6);
    if (activeFleetFilter === "Group Tours") return fleets.filter((f) => f.seating >= 12).slice(0, 6);
    return fleets.slice(0, 8);
  }, [fleets, activeFleetFilter]);

  const handleAirportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!airportForm.name || !airportForm.phone) {
      alert("Please enter your name and contact phone number.");
      return;
    }
    setAirportStatus({ loading: true });
    const res = await submitEnquiry({
      name: airportForm.name,
      phone: airportForm.phone,
      pickup_location: airportForm.pickup,
      drop_location: airportForm.drop,
      travel_date: `${airportForm.date} at ${airportForm.time}`,
      vehicle_preference: airportForm.vehicle,
      trip_type: `Airport Transfer (${airportForm.type})`,
      notes: `Flight No: ${airportForm.flightNo}, Passengers: ${airportForm.passengers}`,
      source: "services_airport_form",
    });
    setAirportStatus({ loading: false, ref: res.reference, msg: "Airport transfer enquiry submitted successfully! Our dispatch desk will contact you immediately." });
  };

  const handlePlannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plannerForm.name || !plannerForm.phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    setPlannerStatus({ loading: true });
    const res = await submitEnquiry({
      name: plannerForm.name,
      phone: plannerForm.phone,
      email: plannerForm.email,
      pickup_location: plannerForm.pickup,
      drop_location: plannerForm.destination,
      travel_date: plannerForm.travelDate,
      return_date: plannerForm.returnDate,
      vehicle_preference: plannerForm.preferredVehicle,
      trip_type: `${plannerForm.serviceType} (${plannerForm.tripType})`,
      passenger_count: parseInt(plannerForm.passengers) || 1,
      notes: plannerForm.specialReq,
      source: "services_custom_planner",
    });
    setPlannerStatus({ loading: false, ref: res.reference, msg: "Custom trip quote request received! Reference ID: " + res.reference });
  };

  const generateWhatsAppPlannerMsg = () => {
    const text = `Hi Souparnika Travels, I want to book a trip:
- Service: ${plannerForm.serviceType}
- Trip Type: ${plannerForm.tripType}
- Pickup: ${plannerForm.pickup || "Bangalore"}
- Destination: ${plannerForm.destination || "Not specified"}
- Travel Date: ${plannerForm.travelDate || "Flexible"}
- Passengers: ${plannerForm.passengers}
- Vehicle: ${plannerForm.preferredVehicle}
- Name: ${plannerForm.name || "Customer"}
- Phone: ${plannerForm.phone || "Not specified"}`;
    return waLink(text);
  };

  return (
    <SiteLayout>
      {/* ── 1. HERO SECTION ── */}
      <section className="relative bg-[#071525] text-white pt-32 pb-24 overflow-hidden border-b border-slate-800">
        {/* Background visual with subtle dark navy gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/user-hero-1.jpg"
            alt="Souparnika Travels Services"
            className="w-full h-full object-cover object-center opacity-25 scale-105 transform transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071525] via-[#071525]/90 to-[#071525]/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(21,94,239,0.2),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto container-p">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6 uppercase tracking-widest">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-slate-500" />
            <span className="text-amber-400 font-extrabold">Services</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
              Complete Travel &amp; Fleet Solutions
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight tracking-tight mb-6">
              <span className="text-amber-400">Premium</span> Travel Services <br className="hidden sm:block" />
              Designed Around <span className="text-amber-400">Your Journey</span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
              From local city rentals and airport transfers to corporate transport, wedding travel, and custom group tours, Souparnika Travels provides reliable vehicles, professional chauffeurs, and personalized travel solutions across Bangalore and South India.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#quick-nav"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#071525] font-extrabold text-sm transition-all shadow-lg hover:shadow-amber-500/20 inline-flex items-center gap-2"
              >
                <span>Explore Services</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#custom-trip-planner"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm border border-white/20 transition-all backdrop-blur-sm inline-flex items-center gap-2"
              >
                <span>Get Custom Quote</span>
              </a>

              <a
                href={waLink("Hi, I would like to book a travel service with Souparnika Travels.")}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all shadow-lg hover:shadow-emerald-600/20 inline-flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>WhatsApp Booking</span>
              </a>
            </div>

            {/* Hero Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-xs font-bold text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Verified Fleet</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Professional Chauffeurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                <span>24/7 Booking Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Transparent Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. QUICK SERVICE NAVIGATION (STICKY / HORIZONTALLY SCROLLABLE) ── */}
      <section id="quick-nav" className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3 transition-all">
        <div className="max-w-7xl mx-auto container-p">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 shrink-0 mr-2 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-[#155EEF]" /> Quick Nav:
            </span>
            {[
              { label: "Local City Rental", href: "#local-city-rental" },
              { label: "Outstation Trips", href: "#outstation-trips" },
              { label: "Airport Transfer", href: "#airport-transfer" },
              { label: "Corporate Travel", href: "#corporate-travel" },
              { label: "Wedding Transportation", href: "#wedding-transportation" },
              { label: "Family & Group Tours", href: "#family-group-tours" },
              { label: "Luxury Fleet Support", href: "#luxury-fleet-support" },
            ].map((nav) => (
              <a
                key={nav.href}
                href={nav.href}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-[#071525] hover:text-white text-slate-700 text-xs font-bold whitespace-nowrap transition-all shrink-0 border border-slate-200/80"
              >
                {nav.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. RENTAL SERVICES CATEGORY ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#155EEF]/10 text-[#155EEF] text-xs font-extrabold uppercase tracking-wider mb-3">
              <Car className="h-3.5 w-3.5" /> Primary Rental Solutions
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#071525]">
              Rental Services
            </h2>
            <p className="text-slate-600 text-base mt-3">
              Flexible hourly local rentals, outstation South India tours, and guaranteed 24/7 airport express shuttles.
            </p>
          </div>

          <div className="space-y-16">
            {/* ── LOCAL CITY RENTAL ── */}
            <div id="local-city-rental" className="scroll-mt-36 bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-md grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-600 text-xs font-extrabold">
                  <Clock className="h-3.5 w-3.5" /> 4h, 8h &amp; 12h Hourly Packages
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-[#071525]">
                  Local City Rental
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Book comfortable and well-maintained vehicles for business meetings, sightseeing, shopping, family functions, hospital visits, and multiple local stops across Bangalore.
                </p>

                {/* Package Pills */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { title: "4 Hours / 40 KM", desc: "Quick business or airport drops" },
                    { title: "8 Hours / 80 KM", desc: "Full-day city & shopping tours" },
                    { title: "12 Hours / 120 KM", desc: "Extended multi-stop local trips" },
                    { title: "Full-Day Custom Rental", desc: "Flexible wedding & event usage" },
                  ].map((pkg) => (
                    <div key={pkg.title} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-xs font-extrabold text-[#071525]">{pkg.title}</div>
                      <div className="text-[11px] text-slate-500">{pkg.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    to="/services/$slug"
                    params={{ slug: "local-city-rental" }}
                    className="px-5 py-2.5 rounded-xl bg-[#071525] hover:bg-[#155EEF] text-white text-xs font-bold transition-all inline-flex items-center gap-1.5"
                  >
                    <span>View Local Packages</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => openEnquiryDialog({ defaultService: "Local City Rental" })}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#071525] text-xs font-extrabold transition-all"
                  >
                    Get Local Quote
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                <img
                  src="/images/fleets/urbania-10-seater.jpg"
                  alt="Local City Rental Bangalore"
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/80 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Recommended Vehicle</span>
                  <h4 className="text-lg font-bold">10-12 Seater Force Urbania</h4>
                  <p className="text-xs text-slate-300">Perfect for family functions &amp; tech park commutes.</p>
                </div>
              </div>
            </div>

            {/* ── OUTSTATION TRIPS ── */}
            <div id="outstation-trips" className="scroll-mt-36 bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-md grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                <img
                  src="/images/hero/mysore-palace-hero.webp"
                  alt="Outstation Trips from Bangalore"
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/80 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Popular Destination</span>
                  <h4 className="text-lg font-bold">Mysore, Coorg &amp; Ooty Specials</h4>
                  <p className="text-xs text-slate-300">Spacious pushback recliners with large luggage boot.</p>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-600 text-xs font-extrabold">
                  <Compass className="h-3.5 w-3.5" /> South India Road Trips
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-[#071525]">
                  Outstation Trips
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Travel to popular hill stations, heritage cities, and pilgrimage shrines across South India with spacious vehicles, experienced outstation drivers, and flexible itineraries.
                </p>

                {/* Popular Destinations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  {["Mysore", "Coorg", "Ooty", "Chikmagalur", "Wayanad", "Tirupati", "Pondicherry", "Hampi"].map((dest) => (
                    <div key={dest} className="p-2.5 rounded-xl bg-slate-50 text-center border border-slate-100 text-xs font-extrabold text-slate-800">
                      📍 {dest}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    to="/services/$slug"
                    params={{ slug: "outstation-trips" }}
                    className="px-5 py-2.5 rounded-xl bg-[#071525] hover:bg-[#155EEF] text-white text-xs font-bold transition-all inline-flex items-center gap-1.5"
                  >
                    <span>View Outstation Trips</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => openEnquiryDialog({ defaultService: "Outstation Trips" })}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#071525] text-xs font-extrabold transition-all"
                  >
                    Plan Outstation Trip
                  </button>
                </div>
              </div>
            </div>

            {/* ── AIRPORT TRANSFER ── */}
            <div id="airport-transfer" className="scroll-mt-36 bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-md grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-600 text-xs font-extrabold">
                  <Plane className="h-3.5 w-3.5" /> 24/7 Airport Express (BLR)
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-[#071525]">
                  Airport Transfer
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Guaranteed on-time airport pickup and drop services for delegates, families, and tour groups traveling to Kempegowda International Airport (BLR).
                </p>

                <div className="grid sm:grid-cols-2 gap-3 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Live Flight Status Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Placard Meet &amp; Greet</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Large Trunk Luggage Boots</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Fixed Rates, No Surge Multipliers</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/services/$slug"
                    params={{ slug: "airport-transfer" }}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#155EEF] hover:underline"
                  >
                    <span>Read Full Airport Transfer Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Airport Enquiry Form */}
              <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
                <h4 className="text-base font-extrabold mb-1 text-amber-400 flex items-center gap-2">
                  <Plane className="h-4 w-4" /> Quick Airport Booking
                </h4>
                <p className="text-xs text-slate-300 mb-4">Fast response from our 24/7 airport dispatch desk.</p>

                {airportStatus?.msg ? (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs leading-relaxed">
                    ✅ {airportStatus.msg}
                  </div>
                ) : (
                  <form onSubmit={handleAirportSubmit} className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={airportForm.type}
                        onChange={(e) => setAirportForm({ ...airportForm, type: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Drop to Airport">Drop to Airport</option>
                        <option value="Pickup from Airport">Pickup from Airport</option>
                        <option value="Round Trip Airport Transfer">Round Trip Transfer</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Pickup Location"
                        value={airportForm.pickup}
                        onChange={(e) => setAirportForm({ ...airportForm, pickup: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={airportForm.date}
                        onChange={(e) => setAirportForm({ ...airportForm, date: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="time"
                        value={airportForm.time}
                        onChange={(e) => setAirportForm({ ...airportForm, time: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Flight Number (Optional)"
                        value={airportForm.flightNo}
                        onChange={(e) => setAirportForm({ ...airportForm, flightNo: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                      />
                      <select
                        value={airportForm.vehicle}
                        onChange={(e) => setAirportForm({ ...airportForm, vehicle: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Force Urbania 10 Seater">Force Urbania 10 Seater</option>
                        <option value="Force Urbania 12 Seater">Force Urbania 12 Seater</option>
                        <option value="Tempo Traveller 12 Seater">Tempo Traveller 12 Seater</option>
                        <option value="Luxury Coach 25 Seater">Luxury Coach 25 Seater</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={airportForm.name}
                        onChange={(e) => setAirportForm({ ...airportForm, name: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        required
                        value={airportForm.phone}
                        onChange={(e) => setAirportForm({ ...airportForm, phone: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={airportStatus?.loading}
                      className="w-full mt-2 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#071525] font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      {airportStatus?.loading ? "Submitting..." : "Submit Airport Request"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. GROUP TRAVEL CATEGORY ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-extrabold uppercase tracking-wider mb-3">
              <Users className="h-3.5 w-3.5" /> Tailored Group Solutions
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#071525]">
              Group Travel &amp; Special Events
            </h2>
            <p className="text-slate-600 text-base mt-3">
              Specialized transportation for corporate offsites, wedding baraats, and family reunions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Corporate Travel Card */}
            <div id="corporate-travel" className="scroll-mt-36 bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#071525] text-amber-400 flex items-center justify-center mb-6 shadow-md">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#071525] mb-2">Corporate Travel</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Executive transfers, corporate offsite mobility, delegate transportation, and tech park commutes with GSTR billing compliance.
                </p>
                <ul className="space-y-2 text-xs font-medium text-slate-700 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-500" /> Maharaja Urbania VIP recliners</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-500" /> Dedicated account manager</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-500" /> GST invoice compliance</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <Link to="/services/$slug" params={{ slug: "corporate-travel" }} className="text-xs font-extrabold text-[#155EEF] hover:underline flex items-center gap-1">
                  <span>Details</span> <ArrowRight className="h-3 w-3" />
                </Link>
                <button onClick={() => openEnquiryDialog({ defaultService: "Corporate Travel" })} className="px-3.5 py-1.5 rounded-lg bg-[#071525] text-white text-xs font-bold hover:bg-[#155EEF] transition-colors">
                  Quote
                </button>
              </div>
            </div>

            {/* Wedding Transportation Card */}
            <div id="wedding-transportation" className="scroll-mt-36 bg-amber-500/5 rounded-3xl p-8 border border-amber-400/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 bg-amber-400 text-[#071525] font-extrabold text-[10px] uppercase rounded-bl-2xl">
                Royal Wedding
              </div>
              <div>
                <div className="h-12 w-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-6 shadow-md">
                  <Heart className="h-6 w-6 fill-white" />
                </div>
                <h3 className="text-xl font-bold text-[#071525] mb-2">Wedding Transportation</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Coordinated guest shuttles, hotel-to-venue transfers, and family VIP Urbania travel for royal South Indian wedding celebrations.
                </p>
                <ul className="space-y-2 text-xs font-medium text-slate-700 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Multi-vehicle fleet coordination</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Flower decoration support</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> 24/7 Muhurtham standby</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-amber-300/40 flex items-center justify-between">
                <Link to="/services/$slug" params={{ slug: "wedding-transportation" }} className="text-xs font-extrabold text-amber-700 hover:underline flex items-center gap-1">
                  <span>Details</span> <ArrowRight className="h-3 w-3" />
                </Link>
                <button onClick={() => openEnquiryDialog({ defaultService: "Wedding Transportation" })} className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-[#071525] text-xs font-extrabold hover:bg-amber-400 transition-colors">
                  Plan Wedding
                </button>
              </div>
            </div>

            {/* Family & Group Tours Card */}
            <div id="family-group-tours" className="scroll-mt-36 bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#155EEF] text-white flex items-center justify-center mb-6 shadow-md">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#071525] mb-2">Family &amp; Group Tours</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Spacious 9 to 25 seater vehicles engineered for comfortable group holidays, pilgrimage tours, and hill station excursions.
                </p>
                <ul className="space-y-2 text-xs font-medium text-slate-700 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 9, 12, 16 &amp; 25 seater options</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Senior citizen low-step entry</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Audio-visual entertainment systems</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <Link to="/services/$slug" params={{ slug: "family-group-tours" }} className="text-xs font-extrabold text-[#155EEF] hover:underline flex items-center gap-1">
                  <span>Details</span> <ArrowRight className="h-3 w-3" />
                </Link>
                <button onClick={() => openEnquiryDialog({ defaultService: "Family & Group Tours" })} className="px-3.5 py-1.5 rounded-lg bg-[#071525] text-white text-xs font-bold hover:bg-[#155EEF] transition-colors">
                  Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. LUXURY FLEET SUPPORT CATEGORY ── */}
      <section id="luxury-fleet-support" className="scroll-mt-36 py-20 bg-[#071525] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto container-p">
          <div className="bg-gradient-to-r from-slate-900 via-[#071525] to-slate-900 rounded-3xl p-8 md:p-12 border border-amber-400/30 shadow-2xl relative overflow-hidden grid lg:grid-cols-12 gap-8 items-center">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-8 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 fill-amber-400" /> VIP Travel Desk
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">
                Luxury Fleet Support &amp; Custom Desk
              </h2>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Need a special vehicle combination, executive fleet convoy, multi-day VIP itinerary, or corporate delegation plan? Our senior travel desk can build a bespoke solution based on your exact passenger count and timing.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div className="font-extrabold text-amber-400 mb-1">Multi-Vehicle Convoys</div>
                  <div className="text-slate-400">Urbania + Luxury Cars + Coaches</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div className="font-extrabold text-amber-400 mb-1">Protocol Drivers</div>
                  <div className="text-slate-400">Formally dressed multilingual chauffeurs</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div className="font-extrabold text-amber-400 mb-1">Dedicated Officer</div>
                  <div className="text-slate-400">24/7 direct dispatch line</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/services/$slug"
                  params={{ slug: "luxury-fleet-support" }}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#071525] font-extrabold text-xs transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <span>Explore VIP Support</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#custom-trip-planner"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-all inline-flex items-center gap-2"
                >
                  <span>Build Custom Plan</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 relative z-10 text-center bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="text-4xl font-extrabold text-amber-400 mb-2">24 / 7</div>
              <div className="text-sm font-bold text-white mb-4">VIP Desk Helpline</div>
              <a
                href={telLink()}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071525] font-extrabold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{SITE.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. INTERACTIVE SERVICE DETAIL CARDS SHOWCASE ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#071525]">
              Explore All 7 Services
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Select any service below to view detailed route options, suitable fleets, and instant quotes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv) => (
              <div
                key={srv.slug}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={srv.card_image}
                      alt={srv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#071525] text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      {srv.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#071525] mb-2 group-hover:text-[#155EEF] transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                      {srv.short_description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-700 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="font-extrabold text-slate-900 text-[11px] uppercase tracking-wider mb-1 text-amber-600">Key Highlights:</div>
                      {srv.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <Link
                    to="/services/$slug"
                    params={{ slug: srv.slug }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-[#071525] hover:text-white text-[#071525] text-xs font-bold text-center transition-all"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => openEnquiryDialog({ defaultService: srv.name })}
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#071525] text-xs font-extrabold text-center transition-all"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. RECOMMENDED FLEET SECTION ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto container-p">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider mb-3">
                <Car className="h-3.5 w-3.5 text-[#155EEF]" /> Verified Vehicles
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#071525]">
                Choose the Right Fleet for Your Journey
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Local Travel", "Outstation", "Corporate", "Wedding", "Airport", "Group Tours"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFleetFilter(f)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all border",
                    activeFleetFilter === f
                      ? "bg-[#071525] text-amber-400 border-[#071525] shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFleets.map((fleet) => (
              <FleetCard key={fleet.id} fleet={fleet} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. WHY CHOOSE SOUPARNIKA TRAVELS ── */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">
              Why Choose <span className="text-amber-400">Souparnika Travels</span>
            </h2>
            <p className="text-slate-300 text-base mt-2">
              The preferred vehicle rental choice for corporate firms, wedding organizers, and families across South India.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Verified Clean Fleet", desc: "100% sanitized, well-maintained vehicles with regular safety audits.", icon: ShieldCheck },
              { title: "Professional Chauffeurs", desc: "Uniformed, background-verified senior drivers with route expertise.", icon: User },
              { title: "Transparent Billing", desc: "Clear upfront quotes with zero hidden charges or surge multipliers.", icon: Award },
              { title: "24/7 Booking Support", desc: "Round-the-clock dispatch desk for emergency changes and updates.", icon: Clock },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. BOOKING PROCESS TIMELINE ── */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider mb-3">
              <Layers className="h-3.5 w-3.5 text-[#155EEF]" /> Simple 6-Step Booking
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#071525]">
              How to Book Your Service
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: "01", title: "Select Service", desc: "Local, Outstation, Airport, or Group Travel." },
              { step: "02", title: "Share Details", desc: "Travel date, pickup, & passenger count." },
              { step: "03", title: "Choose Vehicle", desc: "Urbania, Tempo Traveller, or Coach." },
              { step: "04", title: "Get Quote", desc: "Receive transparent per-km quote." },
              { step: "05", title: "Confirm Booking", desc: "Instant booking confirmation & driver details." },
              { step: "06", title: "Travel Comfortably", desc: "Enjoy doorstep pickup & air-conditioned ride." },
            ].map((s) => (
              <div key={s.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center relative group hover:border-[#155EEF] transition-all">
                <div className="text-2xl font-black text-amber-500 mb-2 font-display">{s.step}</div>
                <h3 className="text-sm font-bold text-[#071525] mb-1">{s.title}</h3>
                <p className="text-[11px] text-slate-500 leading-tight">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CUSTOM TRIP PLANNER ── */}
      <section id="custom-trip-planner" className="scroll-mt-36 py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto container-p">
          <div className="bg-gradient-to-br from-slate-900 via-[#071525] to-slate-950 p-8 md:p-12 rounded-3xl border border-amber-400/30 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3">
                <Sparkles className="h-3.5 w-3.5 fill-amber-400" /> Interactive Planner
              </span>
              <h2 className="text-3xl font-display font-extrabold text-white">
                Tell Us Your Plan — We’ll Arrange the Journey
              </h2>
              <p className="text-slate-300 text-xs md:text-sm mt-2">
                Fill in your trip details below for a customized travel quote &amp; instant WhatsApp confirmation.
              </p>
            </div>

            {plannerStatus?.msg ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center text-emerald-300 text-sm leading-relaxed">
                🎉 {plannerStatus.msg}
              </div>
            ) : (
              <form onSubmit={handlePlannerSubmit} className="space-y-4 text-xs">
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Service Type</label>
                    <select
                      value={plannerForm.serviceType}
                      onChange={(e) => setPlannerForm({ ...plannerForm, serviceType: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Local City Rental">Local City Rental</option>
                      <option value="Outstation Trips">Outstation Trips</option>
                      <option value="Airport Transfer">Airport Transfer</option>
                      <option value="Corporate Travel">Corporate Travel</option>
                      <option value="Wedding Transportation">Wedding Transportation</option>
                      <option value="Family & Group Tours">Family &amp; Group Tours</option>
                      <option value="Luxury Fleet Support">Luxury Fleet Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Pickup Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Indiranagar, Bangalore"
                      value={plannerForm.pickup}
                      onChange={(e) => setPlannerForm({ ...plannerForm, pickup: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Destination</label>
                    <input
                      type="text"
                      placeholder="e.g. Coorg / Mysore"
                      value={plannerForm.destination}
                      onChange={(e) => setPlannerForm({ ...plannerForm, destination: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Travel Date</label>
                    <input
                      type="date"
                      value={plannerForm.travelDate}
                      onChange={(e) => setPlannerForm({ ...plannerForm, travelDate: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Return Date</label>
                    <input
                      type="date"
                      value={plannerForm.returnDate}
                      onChange={(e) => setPlannerForm({ ...plannerForm, returnDate: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Passengers</label>
                    <input
                      type="number"
                      min="1"
                      value={plannerForm.passengers}
                      onChange={(e) => setPlannerForm({ ...plannerForm, passengers: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Preferred Fleet</label>
                    <select
                      value={plannerForm.preferredVehicle}
                      onChange={(e) => setPlannerForm({ ...plannerForm, preferredVehicle: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Force Urbania 10 Seater">Force Urbania 10 Seater</option>
                      <option value="Force Urbania 12 Seater">Force Urbania 12 Seater</option>
                      <option value="Force Urbania 16 Seater">Force Urbania 16 Seater</option>
                      <option value="Urbania Maharaja VIP">Urbania Maharaja VIP</option>
                      <option value="Tempo Traveller 12 Seater">Tempo Traveller 12 Seater</option>
                      <option value="Mini Coach 25 Seater">Mini Coach 25 Seater</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={plannerForm.name}
                      onChange={(e) => setPlannerForm({ ...plannerForm, name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Phone"
                      value={plannerForm.phone}
                      onChange={(e) => setPlannerForm({ ...plannerForm, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="email@domain.com"
                      value={plannerForm.email}
                      onChange={(e) => setPlannerForm({ ...plannerForm, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Special Requirements</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Flower decoration, luggage boot required, elderly passengers"
                    value={plannerForm.specialReq}
                    onChange={(e) => setPlannerForm({ ...plannerForm, specialReq: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={plannerStatus?.loading}
                    className="flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#071525] font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>{plannerStatus?.loading ? "Submitting..." : "Get Custom Quote"}</span>
                  </button>

                  <a
                    href={generateWhatsAppPlannerMsg()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                    <span>Continue on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 11. POPULAR USE CASES ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#071525]">
              Popular Travel Use Cases
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Frequent trip scenarios tailored to perfection by Souparnika Travels.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Bangalore City Sightseeing", fleet: "Force Urbania 10 Seater", image: "/images/hero/user-hero-1.jpg" },
              { title: "Airport Pickup & Drop", fleet: "Force Urbania 12 Seater", image: "/images/hero/user-hero-2.jpg" },
              { title: "Corporate Offsite Retreat", fleet: "Urbania Maharaja VIP", image: "/images/hero/user-hero-2.jpg" },
              { title: "Wedding Guest Transfer", fleet: "16 Seater Urbania & Coaches", image: "/images/hero/user-hero-1.jpg" },
              { title: "Coorg Family Vacation", fleet: "Force Urbania 12 Seater", image: "/images/hero/mysore-palace-hero.webp" },
              { title: "Tirupati Pilgrimage Tour", fleet: "Tempo Traveller 12 Seater", image: "/images/hero/mysore-palace-hero.webp" },
              { title: "Ooty & Nilgiri Excursion", fleet: "Force Urbania 16 Seater", image: "/images/hero/user-hero-1.jpg" },
              { title: "Conference Shuttle", fleet: "Mini Coach 25 Seater", image: "/images/hero/user-hero-2.jpg" },
            ].map((uc, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all group">
                <div className="h-36 overflow-hidden relative">
                  <img src={uc.image} alt={uc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/80 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-[#071525] mb-1">{uc.title}</h3>
                  <div className="text-[11px] text-amber-600 font-extrabold mb-3">Fleet: {uc.fleet}</div>
                  <button onClick={() => openEnquiryDialog({ defaultService: uc.title })} className="text-[11px] font-bold text-[#155EEF] hover:underline flex items-center gap-1">
                    Book This Trip →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. SAFETY & COMFORT ── */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto container-p">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200/80 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-extrabold uppercase">
                <ShieldCheck className="h-3.5 w-3.5" /> Safety &amp; Quality First
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-[#071525]">
                Uncompromising Passenger Safety &amp; Comfort Standards
              </h2>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                Every vehicle in our fleet undergoes rigorous maintenance checks before departure. Enjoy dual air-conditioning evaporators, soft leather pushback seats, sanitized cabin environments, and senior highway chauffeurs.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
              <a
                href={telLink()}
                className="px-6 py-3.5 rounded-xl bg-[#071525] text-white font-extrabold text-xs hover:bg-[#155EEF] transition-all inline-flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-amber-400" />
                <span>Call Safety Desk: {SITE.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. SERVICE FAQS ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto container-p">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-extrabold uppercase mb-3">
              <HelpCircle className="h-3.5 w-3.5 text-[#155EEF]" /> Got Questions?
            </div>
            <h2 className="text-3xl font-display font-extrabold text-[#071525]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { q: "How can I book a vehicle for a local or outstation service?", a: "You can book directly by filling our online trip planner, calling +91 97407 96070, or messaging our 24/7 WhatsApp dispatch desk." },
              { q: "Which vehicle is best suited for 10-12 passengers?", a: "The Force Urbania 10-12 Seater or Maharaja Urbania is ideal, offering wide reclining seats, dual AC blowers, and deep trunk luggage boots." },
              { q: "Are toll, parking, and driver allowance charges included?", a: "Quotes clearly outline minimum daily km, per-km rates, and daily driver allowance. Tolls and state entry permits are billed at actual receipts." },
              { q: "Do you provide guaranteed 24/7 airport pickup and drop?", a: "Yes, our airport desk operates 24x7 with real-time flight tracking for timely pickup at Kempegowda International Airport (BLR)." },
              { q: "Can we book multiple vehicles for wedding guest transfers?", a: "Yes, we specialize in multi-vehicle fleet coordination combining Force Urbanias, Tempo Travellers, and luxury coaches." },
              { q: "Do you provide GSTR tax invoices for corporate bookings?", a: "Yes, 100% GSTR-compliant tax invoices are issued for all corporate bookings." },
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-[#071525] hover:text-[#155EEF] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-200", isOpen && "rotate-180 text-[#155EEF]")} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 14. FINAL BOOKING CTA ── */}
      <section className="py-20 bg-[#071525] text-white">
        <div className="max-w-5xl mx-auto container-p text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 fill-amber-400" /> Ready to Travel?
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">
            Ready to Plan Your Journey?
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Tell us where you are traveling, how many passengers are joining, and what type of experience you need. Our team will recommend the right vehicle and transparent plan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openEnquiryDialog()}
              className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#071525] font-extrabold text-sm transition-all shadow-xl hover:shadow-amber-500/20"
            >
              Get Custom Quote
            </button>

            <a
              href={waLink("Hi, I want to plan a vehicle booking with Souparnika Travels.")}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all shadow-xl hover:shadow-emerald-600/20 flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>WhatsApp Booking</span>
            </a>

            <a
              href={telLink()}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm border border-white/20 transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              <span>Call +91 97407 96070</span>
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
