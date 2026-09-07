import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import aboutImg from "@/assets/about-driver.jpg";
import heroImg from "@/assets/hero-travel.jpg";
import ctaImg from "@/assets/cta-banner.jpg";
import { SITE, telLink, waLink } from "@/lib/site-config";
import {
  CheckCircle2,
  ShieldCheck,
  Users,
  Award,
  Clock,
  Compass,
  Target,
  Eye,
  Sparkles,
  BadgeCheck,
  Car,
  Wallet,
  CalendarCheck,
  Headphones,
  Timer,
  Star,
  MapPin,
  Route as RouteIcon,
  Phone,
  Crown,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — Souparnika Travels" },
      {
        name: "description",
        content:
          "Since 2013, Souparnika Travels has been Bengaluru's trusted travel partner — safe cabs, curated South India tour packages and reliable outstation service.",
      },
      { property: "og:title", content: "About Souparnika Travels" },
      { property: "og:description", content: "Bengaluru's trusted travel partner since 2013." },
    ],
  }),
  component: About,
});

const sliderImages = [
  "/images/bengaluru/vidhana_soudha.png",
  "/images/bengaluru/lalbagh.png",
  "/images/bengaluru/palace.png",
  "/images/bengaluru/cubbon.png",
  "/images/bengaluru/nandi.png",
];

const missions = [
  { icon: ShieldCheck, title: "Safe Travel", desc: "Verified drivers, insured vehicles and rigorous safety audits on every trip." },
  { icon: BadgeCheck, title: "Reliable Service", desc: "Show-up on time, every time — with backup vehicles and 24×7 support." },
  { icon: Wallet, title: "Affordable Pricing", desc: "Transparent fares with no hidden charges, tolls or last-minute surprises." },
  { icon: Sparkles, title: "Customer Satisfaction", desc: "We measure success by repeat customers and heartfelt reviews." },
  { icon: Car, title: "Comfortable Journeys", desc: "Spotless interiors, chilled AC, courteous drivers and thoughtful details." },
];

const values = [
  { icon: ShieldCheck, title: "Safety", desc: "Verified drivers, GPS-tracked vehicles, safety-first culture." },
  { icon: BadgeCheck, title: "Reliability", desc: "We show up on time — every pickup, every route." },
  { icon: CheckCircle2, title: "Transparency", desc: "Clear pricing, honest advice, zero hidden charges." },
  { icon: Users, title: "Customer Satisfaction", desc: "Every trip planned around your comfort." },
  { icon: Award, title: "Professional Service", desc: "Trained, well-groomed drivers and support staff." },
  { icon: Timer, title: "Punctuality", desc: "Time-bound pickups and disciplined driving." },
  { icon: Car, title: "Travel Comfort", desc: "Clean, well-maintained fleet across every category." },
];

const trustPoints = [
  { icon: BadgeCheck, title: "Verified Drivers", desc: "Background-checked, licensed and trained professionals." },
  { icon: Car, title: "Clean Vehicles", desc: "Sanitised after every trip, serviced on schedule." },
  { icon: Wallet, title: "Transparent Charges", desc: "Written quotes, itemised bills, no surprise add-ons." },
  { icon: CalendarCheck, title: "Easy Booking", desc: "Book in minutes over call, WhatsApp or website." },
  { icon: Headphones, title: "Professional Support", desc: "24×7 helpline for changes, questions or emergencies." },
  { icon: Timer, title: "Timely Service", desc: "On-time pickups tracked live by our operations team." },
];

const team = [
  {
    name: "Naveen S",
    role: "Managing Director",
    phone: "9008644559",
    image: "/images/team/naveen-s.jpg",
    desc: "Naveen S is the visionary Managing Director of Urbania Rentals Bengaluru, committed to redefining luxury group transportation with professionalism and trust.",
  },
  {
    name: "Girish G",
    role: "Manager",
    phone: "9901103869",
    image: "/images/team/girish-g.jpg",
    desc: "Girish, Manager at Urbania Rentals Bengaluru, ensures seamless operations, exceptional customer service, and reliable transportation experiences with professionalism and efficiency.",
  },
  {
    name: "Chakresh N Acharya",
    role: "Marketing Manager",
    phone: "9916777769",
    image: "/images/team/chakresh-n-acharya.jpg",
    desc: "Chakresh N Acharya oversees marketing initiatives, building brand visibility, generating leads, and delivering impactful campaigns that drive business growth.",
  },
];

const achievements = [
  { value: "25,000+", label: "Trips completed" },
  { value: "12,000+", label: "Happy customers served" },
  { value: "40+", label: "Vehicles in our fleet" },
  { value: "60+", label: "Destinations covered" },
  { value: "12+", label: "Years of service" },
];

const storyMilestones = [
  {
    year: "2013",
    title: "A small start in Bengaluru",
    desc: "Founded with just 3 cabs and a promise — every passenger arrives safely, on time.",
  },
  {
    year: "2016",
    title: "Outstation expansion",
    desc: "Introduced dedicated outstation service across Karnataka, Tamil Nadu and Kerala.",
  },
  {
    year: "2019",
    title: "Curated tour packages",
    desc: "Launched hand-crafted South India packages built from a decade of route expertise.",
  },
  {
    year: "2022",
    title: "40-vehicle fleet",
    desc: "Grew to sedans, SUVs, Tempo Travellers and luxury vans to serve every group size.",
  },
  {
    year: "Today",
    title: "12,000+ happy travellers",
    desc: "A trusted travel partner for families, corporates and holidaymakers across India.",
  },
];

const SLIDING_FLEETS = [
  {
    image: "/images/fleets/urbania-10-seater.jpg",
    name: "Force Urbania 10 Seater",
    desc: "Ultra-luxury pushback recliners & ambient LED lighting for hill station getaways.",
  },
  {
    image: "/images/fleets/urbania-12-seater.jpg",
    name: "Force Urbania Executive 12 Seater",
    desc: "Plush leather seating, individual AC vents, and spacious boot for airport & city express.",
  },
  {
    image: "/images/fleets/urbania-maharaja-10-seater.jpg",
    name: "Maharaja Urbania VIP Recliner",
    desc: "Royal VIP recliner seats with panoramic windows and surround sound entertainment.",
  },
  {
    image: "/images/fleets/urbania-16-seater.jpg",
    name: "Force Urbania 16 Seater",
    desc: "Spacious group travel coach for large families, corporate teams, and weddings.",
  },
  {
    image: "/images/fleets/tempo-12-seater-interior.png",
    name: "Luxury Recliner Cabin Interior",
    desc: "100% sanitized, clean, odor-free plush interiors engineered for maximum comfort.",
  },
];

function AboutHero() {
  return (
    <section className="py-1 sm:py-2">
      <div className="max-w-7xl mx-auto container-p">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50 via-white to-amber-50/30 border border-slate-200/90 shadow-xl px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10 pt-3 sm:pt-4 lg:pt-4">
          {/* Subtle Warm Accent Background Pattern */}
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-amber-300/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 relative z-10">
            {/* Left Column Text Content */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/70 text-amber-900 text-xs font-extrabold uppercase tracking-wider shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
                <span>BENGALURU'S PREMIER TRAVEL PARTNER SINCE 2013</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.15]">
                Crafting Unforgettable <br className="hidden sm:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
                  Journeys Across South India
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Travel comfortably with Souparnika Travels — Bengaluru&apos;s trusted partner since 2013. From royal Maharaja Force Urbania rentals to luxury outstation tours, we deliver verified chauffeurs, transparent pricing, and world-class fleet comfort.
              </p>
            </div>

            {/* Right Column: PNG Vehicle Image + Stats Cards & CTAs Directly Below */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-5">
              {/* Direct Transparent PNG Vehicle Image */}
              <div className="relative w-full group flex items-center justify-center py-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-amber-300/25 to-amber-500/15 blur-3xl rounded-full pointer-events-none scale-110" />

                <img
                  src="/images/urbania-side-view.png"
                  alt="Souparnika Travel Force Urbania Fleet"
                  className="w-full h-auto max-w-md lg:max-w-lg object-contain filter drop-shadow-[0_18px_22px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-700 ease-out z-10"
                />

                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[85%] h-5 bg-slate-900/15 rounded-[100%] blur-md pointer-events-none" />
              </div>

              {/* Quick Stat Pill Chips Below PNG Image */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
                <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-md text-center">
                  <div className="text-xl sm:text-2xl font-black text-amber-600 font-display">12+</div>
                  <div className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider mt-0.5">Years Experience</div>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-md text-center">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">25,000+</div>
                  <div className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider mt-0.5">Trips Completed</div>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-md text-center">
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 font-display">4.9★</div>
                  <div className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider mt-0.5">Customer Rating</div>
                </div>
              </div>

              {/* Hero CTA Buttons Below Stats - Displayed Side-by-Side without overlap */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-3.5 w-full max-w-lg pt-1">
                <Link
                  to="/fleets"
                  className="px-2.5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-[11px] sm:text-sm transition-all duration-300 shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 inline-flex items-center justify-center gap-1.5 group text-center"
                >
                  <span className="truncate">Explore Fleet</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 shrink-0" />
                </Link>
                <a
                  href={telLink(SITE.phone)}
                  className="px-2.5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#071525] hover:bg-[#0A1F38] text-white font-bold text-[11px] sm:text-sm transition-all border border-slate-800 shadow-md inline-flex items-center justify-center gap-1.5 text-center"
                >
                  <Phone className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Call Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const [currentFleetIndex, setCurrentFleetIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFleetIndex((prev) => (prev + 1) % SLIDING_FLEETS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
  return (
    <SiteLayout>
      <AboutHero />

      {/* 6.2 Company Introduction */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto container-p grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white relative z-0">
              <div className="flex h-full animate-marquee" style={{ width: `${sliderImages.length * 200}%` }}>
                {[...sliderImages, ...sliderImages].map((src, idx) => (
                  <div key={idx} className="flex-1 h-full relative">
                    <img src={src} alt="South India Destination" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-2xl border border-border shadow-xl p-5 max-w-xs z-10 transition-transform duration-500 group-hover:-translate-y-2">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-[color:var(--brand-gold)] grid place-items-center text-[color:var(--brand-navy)] font-black text-xl">12+</div>
                <div>
                  <div className="font-display font-bold text-sm text-[color:var(--brand-navy)]">Years of trust</div>
                  <div className="text-xs text-muted-foreground">Serving Bengaluru & South India</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
              Who we are
            </span>
            <h2 className="mt-2 font-display font-extrabold text-3xl md:text-4xl text-[color:var(--brand-navy)]">
              A Bengaluru travel company built on trust, comfort and care.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Urbania Rentals Bengaluru is a professionally managed transportation company providing employee transportation, airport transfers, executive travel, outstation travel and chauffeur-driven mobility solutions. We focus on punctuality, safety, professionalism and customer satisfaction.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                "Based in Bengaluru, Karnataka",
                "Serving all of South India",
                "Chauffeur-driven mobility solutions",
                "Cabs, outstation & tour packages",
                "24×7 customer support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="h-5 w-5 text-[color:var(--brand-gold)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Whatever the journey — an airport run at 4 AM or a week-long family holiday — our
              commitment is the same: safe vehicles, courteous drivers and journeys that feel
              effortless.
            </p>
          </div>
        </div>
      </section>

      {/* 6.3 Our Story */}
      <section className="py-16 lg:py-24 bg-[color:var(--brand-soft)]">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
              Our journey
            </span>
            <h2 className="mt-2 font-display font-extrabold text-3xl md:text-4xl text-[color:var(--brand-navy)]">
              The Souparnika story
            </h2>
            <p className="mt-3 text-muted-foreground">
              How three cabs on a Bengaluru street grew into a trusted South India travel partner.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] bg-slate-950 w-full">
              {SLIDING_FLEETS.map((fleet, index) => (
                <div
                  key={fleet.image}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentFleetIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
                  }`}
                >
                  <img
                    src={fleet.image}
                    alt={fleet.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85" />
                  
                  {/* Overlay text at the bottom */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 p-3.5">
                    <div className="text-xs font-bold text-amber-400">{fleet.name}</div>
                    <div className="text-[10px] text-white/80 line-clamp-2 mt-0.5 leading-relaxed">{fleet.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <ol className="relative border-l-2 border-[color:var(--brand-gold)]/40 pl-6 space-y-8">
              {storyMilestones.map((m) => (
                <li key={m.year} className="relative">
                  <span className="absolute -left-[35px] top-1 h-6 w-6 rounded-full bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] grid place-items-center text-[10px] font-bold ring-4 ring-[color:var(--brand-soft)]">
                    <RouteIcon className="h-3 w-3" />
                  </span>
                  <div className="text-xs font-bold tracking-wider uppercase text-[color:var(--brand-blue)]">
                    {m.year}
                  </div>
                  <h3 className="mt-1 font-display font-bold text-xl text-[color:var(--brand-navy)]">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-muted-foreground leading-relaxed">{m.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 6.7 Team / Leadership Network - Displayed Directly Below The Souparnika Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              MEET THE TEAM
            </span>
            <h2 className="mt-3 font-display font-black text-3xl md:text-4xl text-slate-900 tracking-tight">
              The People Behind Every Journey
            </h2>
            <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
              Meet our leadership team dedicated to providing exceptional luxury group travel and rental experiences across South India.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {team.map((m) => (
              <div
                key={m.name}
                className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-6 sm:p-8 text-center hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between group"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Photo Frame */}
                  <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full overflow-hidden ring-4 ring-amber-400/50 shadow-lg mb-5 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Name & Role */}
                  <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">
                    {m.name}
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-amber-100/90 text-amber-950 font-extrabold text-[11px] uppercase tracking-wider mt-1.5 mb-3 border border-amber-300/60">
                    {m.role}
                  </div>

                  {/* Phone Badge */}
                  <a
                    href={`tel:+91${m.phone}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition-colors mb-4 shadow-sm"
                  >
                    <Phone className="h-3.5 w-3.5 text-amber-400" />
                    <span>+91 {m.phone}</span>
                  </a>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.4 Mission and Vision */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto container-p">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Mission */}
            <div className="rounded-3xl bg-gradient-to-br from-[color:var(--brand-navy)] to-[color:var(--brand-blue)] text-white p-8 md:p-10 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] grid place-items-center">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-display font-extrabold text-2xl md:text-3xl">Our Mission</h3>
              </div>
              <p className="mt-4 text-white/85 leading-relaxed">
                To make every journey safe, reliable and comfortable — delivering thoughtful travel
                experiences at fair, transparent prices.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
                {missions.map((m) => (
                  <div
                    key={m.title}
                    className="rounded-xl bg-white/10 backdrop-blur border border-white/15 p-3 sm:p-4 flex flex-col justify-between"
                  >
                    <m.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[color:var(--brand-gold)] shrink-0" />
                    <div className="mt-2">
                      <div className="font-bold text-xs sm:text-sm text-white leading-snug">{m.title}</div>
                      <p className="text-[11px] sm:text-xs text-white/70 mt-1 leading-snug break-words">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="rounded-3xl bg-white border border-border p-8 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[color:var(--brand-gold)]/15 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-[color:var(--brand-navy)] text-white grid place-items-center">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl md:text-3xl text-[color:var(--brand-navy)]">
                    Our Vision
                  </h3>
                </div>
                <blockquote className="mt-6 font-display text-2xl md:text-3xl leading-snug text-[color:var(--brand-navy)]">
                  <span className="text-5xl text-[color:var(--brand-gold)] leading-none mr-1">“</span>
                  To become a trusted and preferred travel and transportation service provider.
                  <span className="text-5xl text-[color:var(--brand-gold)] leading-none ml-1">”</span>
                </blockquote>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  We're building a travel company that customers recommend without hesitation — one
                  clean vehicle, courteous driver and on-time pickup at a time.
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm">
                  <div className="flex -space-x-1 text-[color:var(--brand-gold)]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">Rated 4.9 by 2,500+ travellers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5 Company Values - Continuous Infinite Sliding Marquee */}
      <section className="py-16 lg:py-20 bg-[color:var(--brand-soft)] overflow-hidden">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
              What we stand for
            </span>
            <h2 className="mt-2 font-display font-extrabold text-3xl md:text-4xl text-[color:var(--brand-navy)]">
              Our core values
            </h2>
          </div>
        </div>

        {/* Continuous Infinite Sliding Marquee */}
        <div className="relative overflow-hidden w-full py-2">
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[color:var(--brand-soft)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[color:var(--brand-soft)] to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
            {[...values, ...values].map((v, i) => (
              <div
                key={`${v.title}-${i}`}
                className="w-64 sm:w-72 rounded-2xl border border-border bg-white p-5 text-center shadow-sm shrink-0 flex flex-col items-center justify-between"
              >
                <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-900 grid place-items-center mx-auto mb-3 shadow-inner">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-base text-[color:var(--brand-navy)] mb-1">
                  {v.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.6 Why Customers Trust Us */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto container-p">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
                Why customers trust us
              </span>
              <h2 className="mt-2 font-display font-extrabold text-3xl md:text-4xl text-[color:var(--brand-navy)]">
                Six reasons travellers come back to Souparnika.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Over 70% of our monthly bookings come from repeat customers and their referrals.
                Here's what keeps them coming back — trip after trip.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/testimonials"
                  className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-navy)] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[color:var(--brand-blue)] transition-colors"
                >
                  Read customer reviews
                </Link>
                <a
                  href={telLink()}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-navy)] text-[color:var(--brand-navy)] px-5 py-2.5 text-sm font-semibold hover:bg-[color:var(--brand-navy)] hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call {SITE.phone}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {trustPoints.map((t) => (
                <div key={t.title} className="rounded-2xl border border-border bg-white p-3 sm:p-5 flex flex-col sm:flex-row gap-2.5 sm:gap-4">
                  <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-xl bg-[color:var(--brand-gold)]/15 text-[color:var(--brand-navy)] grid place-items-center shrink-0">
                    <t.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-xs sm:text-base text-[color:var(--brand-navy)] leading-snug">{t.title}</h3>
                    <p className="text-[11px] sm:text-sm text-muted-foreground mt-1 leading-snug break-words">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
