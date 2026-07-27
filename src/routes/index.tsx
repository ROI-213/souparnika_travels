import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Award,
  Car,
  CheckCircle2,
  Clock,
  Compass,
  Headphones,
  IndianRupee,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  ShieldCheck,
  Star,
  Users,
  Wrench,
  UserRound,
  UsersRound,
  BusFront,
  Sparkles,
  Route as RouteIcon,
} from "lucide-react";

import heroImg from "@/assets/hero-travel.jpg";
import aboutImg from "@/assets/about-driver.jpg";
import ctaImg from "@/assets/cta-banner.jpg";

import { SiteLayout } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { HomeHero } from "@/components/site/hero/HomeHero";
import { FleetCard, PackageCard } from "@/components/site/Cards";
import { FleetsSection } from "@/components/site/fleets/FleetsSection";
import { BengaluruPlacesSection } from "@/components/site/bengaluru/BengaluruPlacesSection";
import { fleetsQuery, packagesQuery, testimonialsQuery } from "@/lib/queries";
import { SITE, telLink, waLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  {
    title: "Local Travel",
    description: "Comfortable city rides across Bengaluru.",
    image: "/images/packages/mysore-day-trip.webp",
    icon: MapPin,
    href: "/contact-us",
  },
  {
    title: "Airport Transfers",
    description: "On-time pickup & drop, 24 × 7.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/17/BLRT2_IntlDep.jpg",
    icon: Plane,
    href: "/contact-us",
  },
  {
    title: "Outstation Trips",
    description: "One-way & round-trip journeys.",
    image: "/images/packages/chikmagalur-2d1n.webp",
    icon: Compass,
    href: "/contact-us",
  },
  {
    title: "Corporate Travel",
    description: "Executive & staff transportation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Manyata_Embassy_Business_Park.jpg",
    icon: UserRound,
    href: "/contact-us",
  },
  {
    title: "Family Trips",
    description: "Safe, spacious vehicles for families.",
    image: "/images/packages/kerala-backwaters-4d3n.webp",
    icon: UsersRound,
    href: "/contact-us",
  },
  {
    title: "Group Tours",
    description: "Tempo travellers and mini-buses.",
    image: "/images/packages/coorg-getaway-3d2n.webp",
    icon: BusFront,
    href: "/contact-us",
  },
  {
    title: "Wedding Transport",
    description: "Luxury fleets for the big day.",
    image: "/images/packages/tirupati-darshan.webp",
    icon: Sparkles,
    href: "/contact-us",
  },
  {
    title: "Custom Packages",
    description: "Tailored itineraries, your way.",
    image: "/images/packages/kerala-backwaters-4d3n.webp",
    icon: RouteIcon,
    href: "/packages",
  },
];

const whyUs = [
  { icon: Car, title: "Well-maintained vehicles", desc: "Regularly serviced, spotless interiors." },
  { icon: ShieldCheck, title: "Verified drivers", desc: "Experienced, background-checked chauffeurs." },
  { icon: IndianRupee, title: "Transparent pricing", desc: "No hidden charges. Ever." },
  { icon: Clock, title: "On-time, every time", desc: "We track every trip, start to finish." },
  { icon: Headphones, title: "24 x 7 support", desc: "Reach us anytime — day or night." },
  { icon: Award, title: "Safe & comfortable", desc: "Your safety is non-negotiable." },
  { icon: Compass, title: "Customized packages", desc: "Trips designed around you." },
  { icon: Wrench, title: "Trusted since day one", desc: "Thousands of happy travellers." },
];

const destinations = [
  { 
    name: "Coorg", region: "Karnataka", 
    images: [
      "/images/destinations/coorg.png", 
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/Blue%2C_Green_%26_White.jpg", 
      "https://images.unsplash.com/photo-1566109974939-9fa72c000c89?auto=format&fit=crop&w=1000&q=80", 
      "https://upload.wikimedia.org/wikipedia/commons/c/c6/Raja_seat_madikeri.JPG"
    ] 
  },
  { 
    name: "Ooty", region: "Tamil Nadu", 
    images: [
      "/images/destinations/ooty.png", 
      "https://images.unsplash.com/photo-1650884986392-984358536050?auto=format&fit=crop&w=1000&q=80", 
      "https://upload.wikimedia.org/wikipedia/commons/7/76/Arboretum.westonbirt.750pix.jpg", 
      "https://upload.wikimedia.org/wikipedia/commons/9/97/Angadippuram_Railway_station_.jpg"
    ] 
  },
  { 
    name: "Chikmagalur", region: "Karnataka", 
    images: [
      "/images/destinations/chikmagalur.png", 
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/A_scenery_from_bababudan_hill.jpg", 
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/Blue%2C_Green_%26_White.jpg",
      "https://images.unsplash.com/photo-1566109974939-9fa72c000c89?auto=format&fit=crop&w=1000&q=80"
    ] 
  },
  { 
    name: "Kerala Backwaters", region: "Kerala", 
    images: [
      "/images/destinations/kerala.png", 
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/House_Boat_DSW.jpg", 
      "https://upload.wikimedia.org/wikipedia/commons/5/5d/Cranganore_in_Cranganore.jpg", 
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Alappuzha_Boat_Beauty_W.jpg"
    ] 
  },
  { 
    name: "Mysore", region: "Karnataka", 
    images: [
      "/images/destinations/mysore.png", 
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mysore_Palace_Morning.jpg", 
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Mysore_Palace_-_Amba_Vilas_Palace.jpg", 
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/A_view_of_Jaganmohan_Palace.jpg"
    ] 
  },
  { 
    name: "Tirupati", region: "Andhra Pradesh", 
    images: [
      "/images/destinations/tirupati.png", 
      "https://upload.wikimedia.org/wikipedia/commons/d/de/Malekallu_Tirupathi-balaji%2C_Arsikere.jpg", 
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_Anand_nilayam4653.jpg", 
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg"
    ] 
  },
];

const stats = [
  { value: "12+", label: "Years of Experience" },
  { value: "25,000+", label: "Happy Customers" },
  { value: "60,000+", label: "Successful Trips" },
  { value: "80+", label: "Vehicles in Fleet" },
  { value: "40+", label: "Destinations" },
];

const sliderImages = [
  "/images/bengaluru/vidhana_soudha.png",
  "/images/bengaluru/lalbagh.png",
  "/images/bengaluru/palace.png",
  "/images/bengaluru/cubbon.png",
  "/images/bengaluru/nandi.png",
];

function Home() {
  const { data: fleets = [] } = useQuery(fleetsQuery({ featured: true }));
  const { data: packages = [] } = useQuery(packagesQuery());
  const { data: testimonials = [] } = useQuery(testimonialsQuery({ featured: true }));

  return (
    <SiteLayout>
      <HomeHero />

      {/* SERVICE CATEGORIES */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-eyebrow">WHAT WE DO</div>
          <h2 className="services-heading">Every kind of journey, done right</h2>
          <p className="services-subtitle">From daily airport runs to multi-day South India tours.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {services.map((s) => (
              <Link to={s.href as any} key={s.title} className="service-image-card group">
                <img src={s.image} alt={s.title} loading="lazy" />
                <div className="service-card-content">
                  <div className="service-icon">
                    <s.icon className="h-6 w-6 stroke-[1.5]" />
                  </div>
                  <h3 className="service-card-title">{s.title}</h3>
                  <p className="service-card-desc">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FleetsSection />

      {/* ABOUT PREVIEW */}
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
                  <div className="text-xs text-muted-foreground">Serving South India since 2013</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
              About Sowparnika Travels
            </span>
            <h2 className="mt-3 font-display font-extrabold text-3xl md:text-4xl text-[color:var(--brand-navy)]">
              Journeys built on trust, comfort and care.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We're a Bengaluru-born travel company specialising in safe, comfortable and thoughtfully planned trips
              across South India. Our fleet is regularly serviced, our chauffeurs are seasoned professionals, and our
              pricing is always transparent.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Verified, background-checked drivers",
                "Well-maintained and freshly cleaned vehicles",
                "24 x 7 customer support",
                "Transparent pricing — no surprises",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--brand-blue)] shrink-0" /> {t}
                </li>
              ))}
            </ul>
            <Link
              to="/about-us"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[color:var(--brand-navy)] text-white font-semibold hover:bg-[color:var(--brand-blue)]"
            >
              Read More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* FEATURED PACKAGES */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto container-p">
          <SectionHead
            eyebrow="Popular packages"
            title="Handcrafted South India getaways"
            subtitle="Explore misty hills, temple towns and serene backwaters."
            action={{ to: "/packages", label: "View all packages" }}
          />
          
          {/* New Bengaluru Tourist Places Subsection */}
          <BengaluruPlacesSection />

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.slice(0, 6).map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 lg:py-24 bg-[color:var(--brand-navy)] text-white">
        <div className="max-w-7xl mx-auto container-p">
          <SectionHead
            eyebrow="Why choose us"
            title="The Sowparnika difference"
            subtitle="Small details that make a big impact on your journey."
            variant="dark"
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-colors">
                <div className="h-11 w-11 rounded-xl bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] grid place-items-center">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display font-bold">{w.title}</h3>
                <p className="mt-1 text-sm text-white/70">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-16 lg:py-24 bg-[color:var(--brand-soft)]">
        <div className="max-w-7xl mx-auto container-p">
          <SectionHead
            eyebrow="Popular destinations"
            title="Where would you like to go?"
            subtitle="Some of the most-loved routes from Bengaluru."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {destinations.map((d) => (
              <DestinationCard key={d.name} dest={d} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto container-p">
          <SectionHead
            eyebrow="How it works"
            title="Booking your trip is simple"
            subtitle="Five steps between you and a great journey."
          />
          <div className="mt-12 grid md:grid-cols-5 gap-5 relative">
            {[
              "Select a fleet or package",
              "Submit travel details",
              "Get a quote & confirmation",
              "Complete the booking",
              "Enjoy the journey",
            ].map((step, i) => (
              <div key={step} className="relative">
                <div className="h-12 w-12 rounded-xl bg-[color:var(--brand-navy)] text-white font-display font-extrabold grid place-items-center text-lg">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-4 font-display font-bold text-[color:var(--brand-navy)]">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 lg:py-24 bg-[color:var(--brand-soft)]">
        <div className="max-w-7xl mx-auto container-p">
          <SectionHead
            eyebrow="Testimonials"
            title="Loved by travellers across India"
            action={{ to: "/testimonials", label: "See all reviews" }}
          />
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="rounded-2xl bg-white border border-border p-6 flex flex-col">
                <div className="flex gap-0.5 text-[color:var(--brand-gold)]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">"{t.review}"</p>
                <div className="mt-5 pt-4 border-t border-border">
                  <div className="font-semibold text-[color:var(--brand-navy)]">{t.customer_name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.customer_location} · {t.travel_type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 bg-[color:var(--brand-navy)] text-white">
        <div className="max-w-7xl mx-auto container-p grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display font-black text-3xl md:text-4xl text-[color:var(--brand-gold)]">
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-white/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <img src={ctaImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[color:var(--brand-navy)]/75" />
        <div className="relative max-w-4xl mx-auto container-p py-20 lg:py-28 text-center text-white">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl">Planning your next trip?</h2>
          <p className="mt-4 text-white/85 max-w-2xl mx-auto">
            Tell us where you'd like to go and we'll take care of the rest — vehicle, driver, route, everything.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href={telLink()} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] font-bold">
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[color:var(--whatsapp)] text-white font-semibold">
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
            <Link to="/booking" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 backdrop-blur border border-white/30 text-white font-semibold">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHead({
  eyebrow,
  title,
  subtitle,
  action,
  variant = "light",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: { to: string; label: string };
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${isDark ? "text-[color:var(--brand-gold)]" : "text-[color:var(--brand-blue)]"}`}>
          {eyebrow}
        </span>
        <h2 className={`mt-2 font-display font-extrabold text-3xl md:text-4xl ${isDark ? "text-white" : "text-[color:var(--brand-navy)]"}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-2 max-w-2xl ${isDark ? "text-white/70" : "text-muted-foreground"}`}>{subtitle}</p>
        )}
      </div>
      {action && (
        <Link
          to={action.to as "/fleets"}
          className={`inline-flex items-center gap-2 text-sm font-semibold ${isDark ? "text-[color:var(--brand-gold)]" : "text-[color:var(--brand-blue)]"} hover:gap-3 transition-all`}
        >
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function DestinationCard({
  dest,
}: {
  dest: { name: string; region: string; images: string[] };
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dest.images.length);
    }, 3000 + Math.random() * 2000); // Randomize interval slightly so they don't sync
    return () => clearInterval(timer);
  }, [dest.images.length]);

  return (
    <Link
      to="/packages"
      className="group relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden block"
    >
      <div className="absolute inset-0 w-full h-full transition-transform duration-[2000ms] group-hover:scale-110">
        {dest.images.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`${dest.name} - view ${idx + 1}`}
            loading="lazy"
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
              idx === currentIndex ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      
      {/* Dots indicator */}
      <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5 z-10">
        {dest.images.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-1 rounded-full transition-all duration-500",
              idx === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
            )}
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-white z-10">
        <div className="text-[11px] uppercase tracking-widest opacity-80">{dest.region}</div>
        <div className="font-display font-extrabold text-xl md:text-2xl">{dest.name}</div>
      </div>
    </Link>
  );
}
