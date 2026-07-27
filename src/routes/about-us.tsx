import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
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
} from "lucide-react";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — Sowparnika Travels" },
      {
        name: "description",
        content:
          "Since 2013, Sowparnika Travels has been Bengaluru's trusted travel partner — safe cabs, curated South India tour packages and reliable outstation service.",
      },
      { property: "og:title", content: "About Sowparnika Travels" },
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
    name: "Ravi Kumar",
    role: "Founder & Chief Driver",
    experience: "18+ years",
    desc: "Started Sowparnika in 2013 and still personally handles our most important trips.",
    verified: true,
  },
  {
    name: "Suresh Naik",
    role: "Senior Outstation Driver",
    experience: "14 years",
    desc: "Expert on the Bengaluru–Coorg–Ooty circuit with a spotless safety record.",
    verified: true,
  },
  {
    name: "Manjunath R.",
    role: "Airport Transfer Specialist",
    experience: "10 years",
    desc: "Handles early-morning and late-night airport runs with unfailing punctuality.",
    verified: true,
  },
  {
    name: "Deepa Shetty",
    role: "Customer Support Lead",
    experience: "7 years",
    desc: "Runs our 24×7 helpline — the calm voice on the other end of every call.",
    verified: true,
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

function About() {
  return (
    <SiteLayout>
      <PageHero
        title="About Sowparnika Travels"
        subtitle="Travel Comfortably with Sowparnika Travels — Bengaluru's trusted travel and transportation partner since 2013."
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

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
                  <div className="text-xs text-muted-foreground">Serving South India since 2013</div>
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
              Founded in <strong>2013</strong>, {SITE.name} is a full-service travel and transportation
              company headquartered in Bengaluru. From daily city cabs to curated multi-day South India
              tours, we've spent over a decade helping families, corporates and holidaymakers travel
              with total peace of mind.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                "Established in 2013",
                "Based in Bengaluru, Karnataka",
                "Serving all of South India",
                "Cabs, outstation & tour packages",
                "40+ vehicle fleet",
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
              The Sowparnika story
            </h2>
            <p className="mt-3 text-muted-foreground">
              How three cabs on a Bengaluru street grew into a trusted South India travel partner.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
            <img
              src={heroImg}
              alt="Sowparnika on the road"
              className="rounded-2xl w-full aspect-[4/5] object-cover shadow-xl"
            />
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
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {missions.map((m) => (
                  <div
                    key={m.title}
                    className="rounded-xl bg-white/10 backdrop-blur border border-white/15 p-4"
                  >
                    <m.icon className="h-5 w-5 text-[color:var(--brand-gold)]" />
                    <div className="mt-2 font-semibold">{m.title}</div>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">{m.desc}</p>
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

      {/* 6.5 Company Values */}
      <section className="py-16 lg:py-20 bg-[color:var(--brand-soft)]">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
              What we stand for
            </span>
            <h2 className="mt-2 font-display font-extrabold text-3xl md:text-4xl text-[color:var(--brand-navy)]">
              Our core values
            </h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-white border border-border p-6 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="h-11 w-11 rounded-xl bg-[color:var(--brand-navy)] text-white grid place-items-center">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display font-bold text-[color:var(--brand-navy)]">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{v.desc}</p>
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
                Six reasons travellers come back to Sowparnika.
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
            <div className="grid sm:grid-cols-2 gap-4">
              {trustPoints.map((t) => (
                <div key={t.title} className="rounded-2xl border border-border bg-white p-5 flex gap-4">
                  <div className="h-11 w-11 rounded-xl bg-[color:var(--brand-gold)]/15 text-[color:var(--brand-navy)] grid place-items-center shrink-0">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-[color:var(--brand-navy)]">{t.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6.7 Team / Driver Network */}
      <section className="py-16 lg:py-24 bg-[color:var(--brand-soft)]">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
              Meet the team
            </span>
            <h2 className="mt-2 font-display font-extrabold text-3xl md:text-4xl text-[color:var(--brand-navy)]">
              The people behind every journey
            </h2>
            <p className="mt-3 text-muted-foreground">
              Verified, trained and background-checked — meet a few of the drivers and support
              staff who keep Sowparnika running.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl bg-white border border-border p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-[color:var(--brand-navy)] to-[color:var(--brand-blue)] text-white grid place-items-center font-display font-extrabold text-3xl relative">
                  {m.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  {m.verified && (
                    <span
                      title="Verified driver"
                      className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] grid place-items-center ring-4 ring-white"
                    >
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display font-bold text-[color:var(--brand-navy)]">{m.name}</h3>
                <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-blue)] mt-1">
                  {m.role}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Experience: {m.experience}</div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.8 Achievements */}
      <section className="py-16 lg:py-20 bg-[color:var(--brand-navy)] text-white">
        <div className="max-w-7xl mx-auto container-p">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-gold)]">
              By the numbers
            </span>
            <h2 className="mt-2 font-display font-extrabold text-3xl md:text-4xl">
              12 years, thousands of happy travellers.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-6">
            {achievements.map((a) => (
              <div key={a.label} className="text-center">
                <div className="font-display font-extrabold text-4xl md:text-5xl text-[color:var(--brand-gold)]">
                  {a.value}
                </div>
                <div className="text-sm text-white/70 mt-2">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.9 Final CTA */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <img
          src={ctaImg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--brand-navy)]/95 to-[color:var(--brand-navy)]/70" />
        <div className="relative max-w-5xl mx-auto container-p text-center text-white">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-gold)]">
            Ready when you are
          </span>
          <h2 className="mt-2 font-display font-extrabold text-3xl md:text-5xl">
            Let's plan your next journey.
          </h2>
          <p className="mt-4 text-white/85 max-w-2xl mx-auto">
            Whether it's a quick airport transfer or a week-long South India holiday — our team is
            standing by 24×7 to make it effortless.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/fleets"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] px-6 py-3 text-sm font-bold hover:brightness-110 transition"
            >
              <Car className="h-4 w-4" /> Explore Fleets
            </Link>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--brand-navy)] px-6 py-3 text-sm font-bold hover:brightness-95 transition"
            >
              <MapPin className="h-4 w-4" /> View Packages
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 text-white px-6 py-3 text-sm font-bold hover:bg-white/10 transition"
            >
              <Compass className="h-4 w-4" /> Contact Us
            </Link>
            <a
              href={waLink("Hi, I'd like to book a journey with Sowparnika Travels.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--whatsapp)] text-white px-6 py-3 text-sm font-bold hover:brightness-110 transition"
            >
              <Phone className="h-4 w-4" /> Book Your Journey
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
