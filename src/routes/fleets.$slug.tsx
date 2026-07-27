import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { FleetCard } from "@/components/site/Cards";
import { fleetBySlugQuery, fleetsQuery, type Fleet } from "@/lib/queries";
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
} from "lucide-react";
import { waLink, telLink } from "@/lib/site-config";

export const Route = createFileRoute("/fleets/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${toTitle(params.slug)} — Sowparnika Travels` },
      {
        name: "description",
        content: `Book ${toTitle(params.slug)} with Sowparnika Travels. Verified driver, transparent per-km pricing, 24×7 support across South India.`,
      },
    ],
  }),
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

      {/* Main section */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto container-p grid lg:grid-cols-2 gap-10">
          <Gallery images={gallery} name={fleet.name} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[color:var(--brand-blue)]">
                {fleet.category}
              </span>
              {fleet.is_featured && (
                <span className="px-2 py-0.5 rounded-full bg-[color:var(--brand-gold)] text-[10px] font-bold text-[color:var(--brand-navy)] uppercase tracking-wider">
                  Featured
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Available
              </span>
            </div>

            <h1 className="mt-2 font-display font-extrabold text-3xl md:text-4xl text-[color:var(--brand-navy)]">
              {fleet.name}
            </h1>
            {fleet.short_description && (
              <p className="mt-3 text-lg text-muted-foreground">{fleet.short_description}</p>
            )}

            {/* Quick specs */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Spec icon={Users} label="Seating" value={`${fleet.seating} people`} />
              {fleet.luggage && <Spec icon={Briefcase} label="Luggage" value={fleet.luggage} />}
              <Spec icon={Snowflake} label="AC" value={fleet.ac ? "Yes" : "No"} />
            </div>

            {/* Suitable for */}
            {fleet.suitable_for && fleet.suitable_for.length > 0 && (
              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Suitable for
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {fleet.suitable_for.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-secondary px-3 py-1.5 rounded-full text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Price + CTAs */}
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-[color:var(--brand-navy)] to-[color:var(--brand-blue)] text-white p-5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-80">Starting from</div>
                  <div className="font-display font-black text-2xl">
                    {fleet.starting_price ? (
                      <>
                        ₹{fleet.starting_price}
                        <span className="text-base font-semibold opacity-80"> / km</span>
                      </>
                    ) : (
                      "Contact for price"
                    )}
                  </div>
                  {fleet.min_km && (
                    <div className="text-xs opacity-80 mt-1">Minimum {fleet.min_km} km/day</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <a
                    href="#book"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] font-bold text-sm"
                  >
                    Book Now
                  </a>
                  <a
                    href={waLink(`Hi, I'd like to book the ${fleet.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[color:var(--whatsapp)] font-semibold text-sm"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                  <a
                    href={telLink()}
                    className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 grid place-items-center"
                    aria-label="Call"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-[color:var(--brand-blue)]" />
              Verified drivers · Insured vehicle · Transparent pricing
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Information */}
      <section className="py-14 bg-[color:var(--brand-soft)] border-y border-border">
        <div className="max-w-7xl mx-auto container-p grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[color:var(--brand-navy)]">
              Vehicle information
            </h2>
            {fleet.description && (
              <p className="mt-3 text-muted-foreground leading-relaxed">{fleet.description}</p>
            )}

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <InfoRow icon={Wrench} label="Vehicle model" value={fleet.model ?? fleet.name} />
              <InfoRow icon={Users} label="Seating capacity" value={`${fleet.seating} people`} />
              {fleet.luggage && <InfoRow icon={Briefcase} label="Luggage capacity" value={fleet.luggage} />}
              <InfoRow
                icon={Snowflake}
                label="Air-conditioning"
                value={fleet.ac ? "Yes" : "Non-AC"}
              />
              {fleet.suitable_for && fleet.suitable_for.length > 0 && (
                <InfoRow
                  icon={MapPin}
                  label="Recommended for"
                  value={fleet.suitable_for.join(", ")}
                />
              )}
              <InfoRow
                icon={RouteIcon}
                label="Local travel"
                value={fleet.available_local ? "Available" : "Not available"}
              />
              <InfoRow
                icon={RouteIcon}
                label="Outstation"
                value={fleet.available_outstation ? "Available" : "Not available"}
              />
              <InfoRow icon={UserCheck} label="Driver" value="Included with every booking" />
              {fleet.min_km != null && (
                <InfoRow icon={Gauge} label="Minimum kilometres" value={`${fleet.min_km} km / day`} />
              )}
              {fleet.per_km_rate != null && (
                <InfoRow
                  icon={IndianRupee}
                  label="Per-km rate"
                  value={`₹${fleet.per_km_rate} / km`}
                />
              )}
              {fleet.driver_allowance != null && (
                <InfoRow
                  icon={Wallet}
                  label="Driver allowance"
                  value={`₹${fleet.driver_allowance} / day`}
                />
              )}
            </div>

            {(fleet.additional_charges || fleet.terms) && (
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {fleet.additional_charges && (
                  <div className="rounded-xl bg-white border border-border p-5">
                    <div className="flex items-center gap-2 text-[color:var(--brand-navy)] font-semibold">
                      <IndianRupee className="h-4 w-4" /> Additional charges
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {fleet.additional_charges}
                    </p>
                  </div>
                )}
                {fleet.terms && (
                  <div className="rounded-xl bg-white border border-border p-5">
                    <div className="flex items-center gap-2 text-[color:var(--brand-navy)] font-semibold">
                      <FileText className="h-4 w-4" /> Terms & conditions
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {fleet.terms}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Features side card */}
          <aside>
            <div className="rounded-2xl bg-white border border-border p-6 sticky top-24">
              <h3 className="font-display font-bold text-xl text-[color:var(--brand-navy)]">
                Fleet features
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Every vehicle in our fleet is equipped with:
              </p>
              <ul className="mt-4 space-y-2.5">
                {(fleet.features && fleet.features.length > 0
                  ? fleet.features
                  : [
                      "Comfortable seating",
                      "Air conditioning",
                      "Music system",
                      "Charging ports",
                      "GPS",
                      "First-aid kit",
                      "Ample luggage space",
                      "Pushback seats",
                      "Experienced driver",
                    ]
                ).map((f) => {
                  const Icon = featureIcon(f);
                  return (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <span className="h-8 w-8 rounded-lg bg-[color:var(--brand-navy)]/5 text-[color:var(--brand-navy)] grid place-items-center shrink-0">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-foreground/85">{f}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="book" className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto container-p">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
              Reserve this vehicle
            </span>
            <h2 className="mt-2 font-display font-extrabold text-3xl md:text-4xl text-[color:var(--brand-navy)]">
              Book the {fleet.name}
            </h2>
            <p className="mt-3 text-muted-foreground">
              Share a few details and our team will call you shortly to confirm your booking.
            </p>
          </div>
          <div className="mt-8">
            <EnquiryForm lockedVehicle={fleet.name} />
          </div>
        </div>
      </section>

      {/* Related vehicles */}
      {related.length > 0 && (
        <section className="py-16 bg-[color:var(--brand-soft)] border-t border-border">
          <div className="max-w-7xl mx-auto container-p">
            <div className="flex items-end justify-between flex-wrap gap-3">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
                  You may also like
                </span>
                <h2 className="mt-2 font-display font-extrabold text-2xl md:text-3xl text-[color:var(--brand-navy)]">
                  Related vehicles
                </h2>
              </div>
              <Link
                to="/fleets"
                className="text-sm font-semibold text-[color:var(--brand-blue)] hover:underline"
              >
                Explore full fleet →
              </Link>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <div>
      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-secondary relative">
        <img
          src={images[active]}
          alt={`${name} — photo ${active + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px]">
          {active + 1} / {images.length}
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-colors ${
                active === i ? "border-[color:var(--brand-navy)]" : "border-transparent"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="mt-3 flex items-center gap-2 text-sm">
        <div className="flex text-[color:var(--brand-gold)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <span className="text-muted-foreground">Rated 4.9 by our travellers</span>
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
    <div className="rounded-xl border border-border bg-white p-3 text-center">
      <Icon className="h-4 w-4 mx-auto text-[color:var(--brand-blue)]" />
      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold text-[color:var(--brand-navy)]">{value}</div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white border border-border p-4">
      <div className="h-9 w-9 rounded-lg bg-[color:var(--brand-navy)]/5 text-[color:var(--brand-navy)] grid place-items-center shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-semibold text-[color:var(--brand-navy)]">{value}</div>
      </div>
    </div>
  );
}
