import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FleetCard } from "@/components/site/Cards";

import { PngVehicleShowcaseCard } from "@/components/site/fleets/PngVehicleShowcaseCard";
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
import { PickupDropLocationGroup } from "@/components/site/PickupDropLocationGroup";

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
  const [activeVehicleTitle, setActiveVehicleTitle] = useState<string>("");

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
      {/* ── SMALL CURVED RECTANGULAR LIGHT HERO SECTION ── */}
      <section className="py-2 sm:py-4 lg:py-6">
        <div className="max-w-7xl mx-auto container-p">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50 via-white to-amber-50/30 border border-slate-200/90 shadow-xl px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10 pt-4 sm:pt-5 lg:pt-6">
            {/* Subtle Warm Accent Background Pattern */}
            <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-amber-300/15 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10">
              {/* LEFT COLUMN: Service Details & Action CTAs */}
              <div className="lg:col-span-7 space-y-4 text-left">
                {/* Breadcrumb Navigation */}
                <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                  <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
                  <ChevronRight className="h-3 w-3 text-slate-400" />
                  <Link to="/services" className="hover:text-amber-600 transition-colors">Services</Link>
                  <ChevronRight className="h-3 w-3 text-slate-400" />
                  <span className="text-amber-600 font-bold">{service.name}</span>
                </nav>

                {/* Category Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300/70 text-amber-900 text-xs font-extrabold uppercase tracking-wider shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
                  <span>{service.category}</span>
                </div>

                {/* Hero Heading (Updates dynamically as vehicle image scrolls) */}
                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.15] transition-all duration-500">
                  {activeVehicleTitle ? `${activeVehicleTitle} Rental in Bangalore` : (service.hero_title || service.name)}
                </h1>

                {/* Subtitle / Tagline */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                  {service.hero_subtitle || service.tagline}
                </p>

                {/* Key Service Trust Badges Pill Bar - Continuously Sliding Marquee */}
                <div className="relative overflow-hidden w-full max-w-xl py-1">
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
                  <div className="flex gap-2 w-max animate-marquee hover:[animation-play-state:paused]">
                    {[
                      { icon: ShieldCheck, text: "100% Verified Fleet", color: "text-emerald-600" },
                      { icon: Clock, text: "24x7 Dispatch Support", color: "text-amber-600" },
                      { icon: Award, text: "Zero Hidden Fees", color: "text-blue-600" },
                      { icon: ShieldCheck, text: "Commercial Yellow Board", color: "text-amber-600" },
                      { icon: ShieldCheck, text: "100% Verified Fleet", color: "text-emerald-600" },
                      { icon: Clock, text: "24x7 Dispatch Support", color: "text-amber-600" },
                      { icon: Award, text: "Zero Hidden Fees", color: "text-blue-600" },
                      { icon: ShieldCheck, text: "Commercial Yellow Board", color: "text-amber-600" },
                    ].map((b, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-bold text-slate-700 shrink-0"
                      >
                        <b.icon className={`h-3.5 w-3.5 ${b.color}`} />
                        <span>{b.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Call To Actions - Displayed Inline on Mobile */}
                <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:gap-3 pt-2">
                  <a
                    href="#enquiry-form"
                    className="px-2 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-[11px] sm:text-sm transition-all duration-300 shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 inline-flex items-center justify-center gap-1 sm:gap-2 text-center"
                  >
                    <span>Instant Quote</span>
                    <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" />
                  </a>

                  <a
                    href={waLink(`Hi Souparnika Travels, I'd like to enquire about ${service.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#22C55E] hover:bg-emerald-600 text-white font-bold text-[11px] sm:text-sm transition-all shadow-md inline-flex items-center justify-center gap-1 sm:gap-2 text-center"
                  >
                    <MessageCircle className="h-3.5 w-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={telLink()}
                    className="px-2 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#071525] hover:bg-[#0A1F38] text-white font-bold text-[11px] sm:text-sm transition-all border border-slate-800 shadow-md inline-flex items-center justify-center gap-1 sm:gap-2 text-center truncate"
                  >
                    <Phone className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">Call Now</span>
                  </a>
                </div>
              </div>

              {/* RIGHT COLUMN: Featured Vehicle Showcase Card displaying vehicle images and changing title together */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <PngVehicleShowcaseCard
                  serviceName={service.name}
                  featuredFleet={featuredFleet}
                  onVehicleChange={(v) => setActiveVehicleTitle(v.name)}
                />
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
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {(service.package_options ?? []).map((opt, i) => (
                      <div key={i} className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="text-xs sm:text-sm font-extrabold text-[#071525] mb-0.5 sm:mb-1">{opt.name}</div>
                        <div className="text-[10px] sm:text-xs text-slate-500">{opt.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#071525]">Key Features &amp; Inclusions</h2>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-700">
                  {(service.features ?? []).map((feat, i) => (
                    <div key={i} className="flex items-start gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs">{feat}</span>
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

                    <div className="pt-1">
                      <PickupDropLocationGroup
                        pickupValue={form.pickup}
                        dropValue={form.destination}
                        onPickupChange={(val) => setForm((prev) => ({ ...prev, pickup: val }))}
                        onDropChange={(val) => setForm((prev) => ({ ...prev, destination: val }))}
                        pickupLabel="Pickup Point"
                        dropLabel="Destination"
                        pickupPlaceholder="e.g. Bangalore / Airport"
                        dropPlaceholder="e.g. Mysore / Coorg / Ooty"
                      />
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-8">
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
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
