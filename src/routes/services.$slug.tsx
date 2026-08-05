import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FleetCard } from "@/components/site/Cards";
import { serviceBySlugQuery, fleetsQuery, servicesQuery, submitEnquiry, type ServiceItem } from "@/lib/queries";
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
  Send,
  HelpCircle,
  Award,
  ArrowLeft,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { getServiceBySlug } from "@/lib/data/services";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const s = getServiceBySlug(params.slug);
    const title = s?.seo_title || `${toTitle(params.slug)} — Souparnika Travels`;
    const description = s?.seo_description || `Book ${toTitle(params.slug)} in Bangalore with Souparnika Travels. Verified drivers, transparent per-km pricing, 24×7 support.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
      ],
    };
  },
  component: ServiceDetailPage,
});

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const fallbackService = getServiceBySlug(slug);
  const { data: service = fallbackService } = useQuery(serviceBySlugQuery(slug));
  const { data: fleets = [] } = useQuery(fleetsQuery());
  const { data: allServices = [] } = useQuery(servicesQuery());

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    pickup: "",
    destination: "",
    date: "",
    vehicle: service?.recommended_fleets?.[0] || "Force Urbania 12 Seater",
    notes: "",
  });
  const [status, setStatus] = useState<{ loading: boolean; ref?: string; msg?: string } | null>(null);

  if (!service) {
    return (
      <SiteLayout>
        <div className="py-32 text-center container-p">
          <h1 className="text-3xl font-bold mb-4 text-[#071525]">Service Not Found</h1>
          <p className="text-slate-600 mb-8">The service route "{slug}" could not be located.</p>
          <Link to="/services" className="px-6 py-3 bg-[#071525] text-white rounded-xl text-xs font-bold">
            Back to All Services
          </Link>
        </div>
      </SiteLayout>
    );
  }

  // Filter recommended fleets matching service safely
  const recList = service.recommended_fleets || [];
  const recommendedFleets = fleets.filter((f) =>
    recList.includes(f.slug) || recList.includes(f.id)
  );
  const displayFleets = recommendedFleets.length > 0 ? recommendedFleets : fleets.slice(0, 3);
  const featuredFleet = displayFleets[0];
  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    setStatus({ loading: true });
    const res = await submitEnquiry({
      name: form.name,
      phone: form.phone,
      email: form.email,
      pickup_location: form.pickup,
      drop_location: form.destination,
      travel_date: form.date,
      vehicle_preference: form.vehicle,
      trip_type: service.name,
      notes: form.notes,
      source: `service_detail_${service.slug}`,
    });
    setStatus({ loading: false, ref: res.reference, msg: `Thank you! Your quote request for ${service.name} has been received. Reference ID: ${res.reference}` });
  };

  return (
    <SiteLayout>
      {/* ── CURVED RECTANGULAR HERO SECTION ── */}
      <section className="relative w-full bg-[#071525] text-white pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden rounded-b-[2.5rem] sm:rounded-b-[3.5rem] lg:rounded-b-[4.5rem] shadow-2xl border-b border-amber-500/20">
        {/* Full-bleed Background Image with Dark Gradient & Ambient Glow */}
        <div className="absolute inset-0 z-0">
          <img
            src={service.hero_image || "/images/hero/user-hero-1.jpg"}
            alt={service.name}
            className="w-full h-full object-cover object-center opacity-30 scale-105 transform transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071525] via-[#071525]/90 via-55% to-[#071525]/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,176,0,0.18),transparent_60%)]" />
        </div>

        {/* Decorative Ambient Curved Accent Line at Bottom Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        {/* 2-Column Responsive Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto container-p flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          {/* LEFT COLUMN: Service Details & Action CTAs */}
          <div className="flex-1 max-w-xl">
            {/* Breadcrumb Navigation */}
            <nav className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-300 mb-4 uppercase tracking-widest">
              <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-slate-500" />
              <Link to="/services" className="hover:text-amber-400 transition-colors">Services</Link>
              <ChevronRight className="h-3 w-3 text-slate-500" />
              <span className="text-amber-400 font-extrabold">{service.name}</span>
            </nav>

            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm shadow-inner">
              <Sparkles className="h-3 w-3 fill-amber-400" />
              <span>{service.category}</span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight tracking-tight mb-4">
              {service.hero_title || service.name}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg font-normal">
              {service.hero_subtitle || service.tagline}
            </p>

            {/* Key Service Trust Badges Pill Bar */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6 text-[11px] font-bold text-slate-200">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>100% Verified Fleet</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>24x7 Dispatch Support</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <Award className="h-3.5 w-3.5 text-blue-400" />
                <span>Zero Hidden Fees</span>
              </div>
            </div>

            {/* Action Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#enquiry-form"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#071525] font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-amber-500/20 inline-flex items-center gap-2"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={waLink(`Hi Souparnika Travels, I'd like to enquire about ${service.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-[#22C55E] hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg inline-flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>WhatsApp Desk</span>
              </a>

              <a
                href={telLink()}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-sm inline-flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-amber-400" />
                <span>Call {SITE.phone}</span>
              </a>
            </div>
          </div>

              {/* RIGHT COLUMN: Featured Vehicle Showcase Card */}
              <div className="w-full lg:w-[360px] shrink-0">
                <div className="w-full rounded-2xl p-3.5 bg-[#051326]/95 border border-amber-500/35 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col gap-2.5">
                  {/* Top Header inside Vehicle Card */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-black text-white">4.9/5</span>
                      <span className="text-[10px] text-slate-400 font-medium">(1.2k+ Journeys)</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/40">
                      RECOMMENDED FLEET
                    </span>
                  </div>

                  {/* Main Featured Vehicle Image Box */}
                  <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden border border-white/15 bg-slate-900 group">
                    <img
                      src={featuredFleet?.image_url || service.card_image || service.hero_image}
                      alt={featuredFleet?.name || service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030C18] via-transparent to-transparent opacity-80" />

                    {/* Vehicle Tag Badge */}
                    <div className="absolute top-2 left-2 bg-[#030C18]/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[9px] font-black text-amber-300 border border-amber-400/30 shadow-md">
                      {featuredFleet?.name || "Force Urbania Luxury"}
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-2 right-2 bg-emerald-500/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-black text-white shadow-md">
                      {featuredFleet?.starting_from || "Best Standard Rate"}
                    </div>
                  </div>

                  {/* Vehicle Title & Seating */}
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="text-xs font-extrabold text-white truncate max-w-[190px]">
                      {featuredFleet?.name || service.name}
                    </div>
                    <div className="text-xs font-black text-amber-400">
                      {featuredFleet?.seating ? `${featuredFleet.seating} Seats` : "Available"}
                    </div>
                  </div>

                  {/* Specs Pill List */}
                  <div className="flex flex-wrap gap-1 text-[9px] text-slate-300">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10">✓ Pushback Recliners</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10">✓ AC Vents</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10">✓ Ambient Light</span>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => openEnquiryDialog({ defaultService: service.name, vehiclePreference: featuredFleet?.name })}
                      className="flex-1 py-2 rounded-xl font-extrabold text-[#030C18] text-xs transition-all shadow-md bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Instant Quote</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <a
                      href={waLink(`Hi, I'd like to book ${featuredFleet?.name || service.name} for ${service.name}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center transition-colors"
                      title="WhatsApp Booking"
                    >
                      <MessageCircle className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto container-p">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-12">
              {/* Detailed Overview */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
                <h2 className="text-2xl font-display font-bold text-[#071525]">Service Overview</h2>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {service.full_description}
                </p>
              </div>

              {/* Package Options if available */}
              {service.package_options && (service.package_options ?? []).length > 0 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
                  <h2 className="text-2xl font-display font-bold text-[#071525]">Package &amp; Rental Options</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(service.package_options ?? []).map((opt, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="text-sm font-extrabold text-[#071525] mb-1">{opt.name}</div>
                        <div className="text-xs text-slate-500">{opt.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
                <h2 className="text-2xl font-display font-bold text-[#071525]">Key Features &amp; Inclusions</h2>
                <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  {(service.features ?? []).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Destinations if available */}
              {service.popular_destinations && (service.popular_destinations ?? []).length > 0 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
                  <h2 className="text-2xl font-display font-bold text-[#071525]">Popular Destinations Covered</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {(service.popular_destinations ?? []).map((dest, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm relative group bg-slate-900 aspect-[4/3]">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-95"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/95 via-[#071525]/40 to-transparent p-3.5 flex flex-col justify-end text-white">
                          <div className="text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors">
                            {dest.name}
                          </div>
                          <div className="text-[11px] font-semibold text-amber-300/90 line-clamp-1">
                            {dest.tag}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Form & Contact Sticky Column */}
            <div id="enquiry-form" className="lg:col-span-5 scroll-mt-28 space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-[#071525]">Book {service.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">Get an instant quote &amp; vehicle recommendation.</p>
                </div>

                {status?.msg ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs leading-relaxed">
                    ✅ {status.msg}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 Mobile"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Pickup Point</label>
                        <input
                          type="text"
                          placeholder="e.g. Bangalore"
                          value={form.pickup}
                          onChange={(e) => setForm({ ...form, pickup: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Destination</label>
                        <input
                          type="text"
                          placeholder="e.g. Mysore"
                          value={form.destination}
                          onChange={(e) => setForm({ ...form, destination: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Travel Date</label>
                        <input
                          type="date"
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Vehicle</label>
                        <select
                          value={form.vehicle}
                          onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#155EEF]"
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

                    <button
                      type="submit"
                      disabled={status?.loading}
                      className="w-full py-3.5 rounded-xl bg-[#071525] hover:bg-[#155EEF] text-white font-extrabold text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4 text-amber-400" />
                      <span>{status?.loading ? "Submitting..." : "Submit Quote Request"}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Direct Call Card */}
              <div className="bg-[#071525] text-white rounded-3xl p-6 shadow-md text-center space-y-3 border border-slate-800">
                <div className="text-xs font-bold text-amber-400 uppercase">Need Immediate Dispatch?</div>
                <div className="text-sm">Speak directly with our senior travel coordinator</div>
                <a
                  href={telLink()}
                  className="w-full py-3 rounded-xl bg-amber-400 text-[#071525] font-extrabold text-xs inline-flex items-center justify-center gap-2 transition-colors hover:bg-amber-300"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call {SITE.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Fleets for this Service */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto container-p">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Recommended Fleets</div>
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-[#071525]">
                Vehicles Ideal for {service.name}
              </h2>
            </div>
            <Link to="/fleets" className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1">
              <span>View All Vehicles</span> <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayFleets.map((fleet) => (
              <FleetCard key={fleet.id} fleet={fleet} />
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQs */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto container-p">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-extrabold text-[#071525]">
              {service.name} FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {(service.faqs ?? []).map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-[#071525] hover:text-[#155EEF] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-200", isOpen && "rotate-180 text-[#155EEF]")} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-display font-bold text-[#071525]">Related Travel Services</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <div key={rel.slug} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#155EEF] transition-all flex flex-col justify-between">
                <div>
                  <div className="text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-2">{rel.category}</div>
                  <h3 className="text-lg font-bold text-[#071525] mb-2">{rel.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">{rel.short_description}</p>
                </div>
                <Link
                  to="/services/$slug"
                  params={{ slug: rel.slug }}
                  className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1"
                >
                  <span>Explore Service</span> <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#071525] text-white">
        <div className="max-w-4xl mx-auto container-p text-center space-y-6">
          <h2 className="text-3xl font-display font-extrabold text-white">
            Ready to Book {service.name}?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Contact our 24/7 travel desk now for instant vehicle confirmation and transparent pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => openEnquiryDialog({ defaultService: service.name })}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#071525] font-extrabold text-xs rounded-xl shadow-lg"
            >
              Get Custom Quote
            </button>
            <a
              href={waLink(`Hi, I'd like to book ${service.name}.`)}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>WhatsApp Booking</span>
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
