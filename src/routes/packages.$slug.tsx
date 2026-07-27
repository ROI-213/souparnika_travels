import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PackageCard } from "@/components/site/Cards";
import { packageBySlugQuery, packagesQuery, type ItineraryDay } from "@/lib/queries";
import { waLink } from "@/lib/site-config";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  MapPin,
  MapPinned,
  MessageCircle,
  Users,
  XCircle,
  Car,
  Info,
  Sparkles,
  Phone,
} from "lucide-react";

export const Route = createFileRoute("/packages/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Sowparnika Travels` },
    ],
  }),
  component: PackageDetail,
});

function PackageDetail() {
  const { slug } = Route.useParams();
  const { data: pkg, isLoading } = useQuery(packageBySlugQuery(slug));
  const { data: all = [] } = useQuery(packagesQuery());

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="max-w-7xl mx-auto container-p py-20 text-muted-foreground">Loading…</div>
      </SiteLayout>
    );
  }
  if (!pkg) throw notFound();

  const related = all
    .filter((p) => p.id !== pkg.id)
    .map((p) => {
      let score = 0;
      if (p.category === pkg.category) score += 3;
      if (p.location.split(",")[0].trim() === pkg.location.split(",")[0].trim()) score += 3;
      if (p.duration === pkg.duration) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.p);

  const gallery =
    pkg.gallery && pkg.gallery.length > 0
      ? pkg.gallery
      : pkg.image_url
        ? [pkg.image_url]
        : [];

  return (
    <SiteLayout>
      <div className="bg-[color:var(--brand-soft)] border-b border-border">
        <div className="max-w-7xl mx-auto container-p py-4">
          <Link to="/packages" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to packages
          </Link>
        </div>
      </div>

      <PackageHero pkg={pkg} gallery={gallery} />

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto container-p grid lg:grid-cols-[1fr_400px] gap-10">
          <div className="space-y-10 min-w-0">
            {/* Overview */}
            {pkg.description && (
              <Block title="Package Overview" icon={<Sparkles className="h-5 w-5" />}>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{pkg.description}</p>
                {pkg.highlights && pkg.highlights.length > 0 && (
                  <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[color:var(--brand-blue)] mt-0.5 shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>
                )}
              </Block>
            )}

            {/* Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <Block title="Day-Wise Itinerary" icon={<Calendar className="h-5 w-5" />}>
                <Itinerary days={pkg.itinerary} />
              </Block>
            )}

            {/* Inclusions / Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              {pkg.inclusions && pkg.inclusions.length > 0 && (
                <div className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="font-display font-bold text-lg text-[color:var(--brand-navy)] flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" /> Inclusions
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {pkg.inclusions.map((i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.exclusions && pkg.exclusions.length > 0 && (
                <div className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="font-display font-bold text-lg text-[color:var(--brand-navy)] flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-destructive" /> Exclusions
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {pkg.exclusions.map((i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Important Information */}
            {((pkg.important_info && pkg.important_info.length > 0) || pkg.booking_terms) && (
              <Block title="Important Information" icon={<Info className="h-5 w-5" />}>
                {pkg.important_info && pkg.important_info.length > 0 && (
                  <ul className="space-y-2">
                    {pkg.important_info.map((i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-gold)] shrink-0" /> {i}
                      </li>
                    ))}
                  </ul>
                )}
                {pkg.booking_terms && (
                  <p className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {pkg.booking_terms}
                  </p>
                )}
              </Block>
            )}

            {/* Enquiry — mobile / stacked */}
            <div id="enquire" className="lg:hidden">
              <EnquiryForm
                title="Package enquiry"
                defaultTripType="Customized Package"
                lockedPackage={pkg.name}
                showPax
              />
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24 self-start">
            <SummaryCard pkg={pkg} />
            <div className="hidden lg:block">
              <EnquiryForm
                title="Package enquiry"
                defaultTripType="Customized Package"
                lockedPackage={pkg.name}
                showPax
                compact
              />
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-14 bg-[color:var(--brand-soft)] border-t border-border">
          <div className="max-w-7xl mx-auto container-p">
            <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
              <div>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[color:var(--brand-navy)]">
                  Related packages
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Similar getaways you might love, based on destination and duration.
                </p>
              </div>
              <Link
                to="/packages"
                className="text-sm font-semibold text-[color:var(--brand-blue)] hover:underline"
              >
                View all packages →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {related.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

function PackageHero({
  pkg,
  gallery,
}: {
  pkg: any;
  gallery: string[];
}) {
  const [active, setActive] = useState(0);
  const main = gallery[active] ?? pkg.image_url;
  const whatsappMsg = `Hi, I'd like to enquire about the ${pkg.name} package.`;

  return (
    <section className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto container-p py-8 lg:py-12 grid lg:grid-cols-2 gap-10 items-start">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
            {main && <img src={main} alt={pkg.name} className="w-full h-full object-cover" />}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] text-xs font-bold">
                {pkg.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/95 text-[color:var(--brand-navy)] text-xs font-bold">
                {pkg.duration}
              </span>
            </div>
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {gallery.slice(0, 8).map((g, i) => (
                <button
                  key={g + i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition ${
                    i === active ? "border-[color:var(--brand-navy)]" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <nav className="text-xs text-muted-foreground mb-3">
            <Link to="/" className="hover:underline">Home</Link> ·{" "}
            <Link to="/packages" className="hover:underline">Packages</Link> ·{" "}
            <span className="text-foreground">{pkg.name}</span>
          </nav>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-[color:var(--brand-navy)]">
            {pkg.name}
          </h1>
          <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> {pkg.location}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <MetaTile icon={<Calendar />} label="Duration" value={pkg.duration} />
            {pkg.starting_from && (
              <MetaTile icon={<MapPinned />} label="Starts from" value={pkg.starting_from} />
            )}
            {pkg.ending_point && (
              <MetaTile icon={<MapPinned />} label="Ends at" value={pkg.ending_point} />
            )}
            {(pkg.min_travellers || pkg.max_travellers) && (
              <MetaTile
                icon={<Users />}
                label="Travellers"
                value={`${pkg.min_travellers ?? 1}–${pkg.max_travellers ?? "∞"} pax`}
              />
            )}
            {pkg.suggested_vehicles && pkg.suggested_vehicles.length > 0 && (
              <MetaTile
                icon={<Car />}
                label="Vehicles"
                value={pkg.suggested_vehicles.join(", ")}
                span2
              />
            )}
          </div>

          <div className="mt-6 rounded-2xl bg-[color:var(--brand-navy)] text-white p-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest opacity-80">Package price</div>
              <div className="mt-0.5 font-display font-black text-3xl">
                {pkg.price ? `₹${pkg.price.toLocaleString("en-IN")}` : "On request"}
              </div>
              <div className="text-xs opacity-75">per person onwards</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest opacity-80">Ref</div>
              <div className="font-mono font-bold text-sm">{pkg.slug.toUpperCase().slice(0, 10)}</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="#enquire"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] font-semibold text-sm"
            >
              <Phone className="h-4 w-4" /> Enquire Now
            </a>
            <a
              href={waLink(whatsappMsg)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[color:var(--whatsapp)] text-white font-semibold text-sm"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaTile({
  icon,
  label,
  value,
  span2,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  span2?: boolean;
}) {
  return (
    <div className={`rounded-lg border border-border bg-white px-3 py-2.5 ${span2 ? "col-span-2" : ""}`}>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <span className="h-3.5 w-3.5 text-[color:var(--brand-blue)]">{icon}</span>
        {label}
      </div>
      <div className="text-sm font-semibold text-[color:var(--brand-navy)] mt-0.5">{value}</div>
    </div>
  );
}

function SummaryCard({ pkg }: { pkg: any }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="text-xs font-bold uppercase tracking-wider text-[color:var(--brand-blue)]">Quick summary</div>
      <dl className="mt-3 space-y-2 text-sm">
        <Row label="Destination" value={pkg.location} />
        <Row label="Duration" value={pkg.duration} />
        {pkg.starting_from && <Row label="Starts from" value={pkg.starting_from} />}
        {pkg.ending_point && <Row label="Ends at" value={pkg.ending_point} />}
        {pkg.travellers && <Row label="Group size" value={`${pkg.travellers} pax`} />}
        <Row label="Category" value={pkg.category} />
        {pkg.price != null && (
          <Row label="Price" value={`₹${pkg.price.toLocaleString("en-IN")} onwards`} />
        )}
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-semibold text-[color:var(--brand-navy)]">{value}</dd>
    </div>
  );
}

function Block({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display font-extrabold text-2xl text-[color:var(--brand-navy)] flex items-center gap-2">
        {icon && <span className="text-[color:var(--brand-gold)]">{icon}</span>}
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Itinerary({ days }: { days: ItineraryDay[] }) {
  const sorted = useMemo(() => [...days].sort((a, b) => a.day - b.day), [days]);
  return (
    <ol className="relative border-l-2 border-[color:var(--brand-gold)]/40 pl-6 space-y-6">
      {sorted.map((d) => (
        <li key={d.day} className="relative">
          <span className="absolute -left-[34px] top-0 grid place-items-center h-9 w-9 rounded-full bg-[color:var(--brand-navy)] text-white text-xs font-bold">
            D{d.day}
          </span>
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--brand-blue)]">
              Day {d.day}
            </div>
            <h3 className="font-display font-bold text-lg text-[color:var(--brand-navy)] mt-0.5">
              {d.title}
            </h3>
            {d.image_url && (
              <img
                src={d.image_url}
                alt={d.title}
                className="mt-3 w-full aspect-[16/7] object-cover rounded-lg"
              />
            )}
            {d.description && (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.description}</p>
            )}
            {d.places && d.places.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {d.places.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[color:var(--brand-soft)] text-[11px] font-semibold text-[color:var(--brand-navy)]"
                  >
                    <MapPin className="h-3 w-3" /> {p}
                  </span>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
