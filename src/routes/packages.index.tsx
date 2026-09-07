import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PackageCard } from "@/components/site/Cards";
import { packagesQuery, type Package } from "@/lib/queries";
import { VEHICLE_TYPES } from "@/lib/site-config";
import { PackagesHero } from '@/components/site/PackagesHero';
import { Search, X, SlidersHorizontal, RotateCcw, Frown, Package as PackageIcon } from "lucide-react";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "Travel Packages — Souparnika Travels" },
      {
        name: "description",
        content:
          "Handcrafted South India tour packages from Bengaluru — weekend getaways, family holidays, pilgrimages and multi-day journeys across Karnataka, Kerala, Tamil Nadu and Andhra Pradesh.",
      },
      { property: "og:title", content: "Travel Packages — Souparnika Travels" },
      { property: "og:description", content: "Curated South India getaways from Bengaluru." },
    ],
  }),
  component: PackagesPage,
});

/* Categories that appear as filter options (per spec) plus any category present in current data. */
const CATEGORY_OPTIONS = [
  "Local Sightseeing",
  "Weekend",
  "Family",
  "Pilgrimage",
  "Adventure",
  "Group",
  "Corporate",
  "Customized",
  "South India Tour",
  "Karnataka Tour",
  "Hill Station",
  "Backwaters",
  "Heritage",
] as const;

const DURATION_BUCKETS = [
  { value: "any", label: "Any duration" },
  { value: "1", label: "1 day" },
  { value: "2-3", label: "2 – 3 days" },
  { value: "4-6", label: "4 – 6 days" },
  { value: "7+", label: "7+ days" },
] as const;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

type SortKey = "featured" | "price-asc" | "price-desc" | "duration-asc" | "duration-desc";

type Filters = {
  q: string;
  destination: string;
  category: string;
  duration: string;
  startingCity: string;
  travellers: string;
  priceMin: string;
  priceMax: string;
  vehicleType: string;
  month: string;
  availableOnly: boolean;
  sort: SortKey;
};

const INITIAL: Filters = {
  q: "",
  destination: "any",
  category: "any",
  duration: "any",
  startingCity: "any",
  travellers: "",
  priceMin: "",
  priceMax: "",
  vehicleType: "any",
  month: "any",
  availableOnly: false,
  sort: "featured",
};

function durationDays(d: string): number {
  const m = d.match(/(\d+)\s*day/i);
  return m ? parseInt(m[1], 10) : 1;
}

function inDurationBucket(days: number, bucket: string): boolean {
  switch (bucket) {
    case "1": return days === 1;
    case "2-3": return days >= 2 && days <= 3;
    case "4-6": return days >= 4 && days <= 6;
    case "7+": return days >= 7;
    default: return true;
  }
}

function PackagesPage() {
  const { data: rawPackages = [], isLoading } = useQuery(packagesQuery());
  const packages = rawPackages as unknown as Package[];
  const [f, setF] = useState<Filters>(INITIAL);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const destinations = useMemo(() => {
    const s = new Set<string>();
    packages.forEach((p) => s.add(p.location.split(",")[0].trim()));
    return Array.from(s).sort();
  }, [packages]);

  const startingCities = useMemo(() => {
    const s = new Set<string>();
    packages.forEach((p) => p.starting_from && s.add(p.starting_from));
    return Array.from(s).sort();
  }, [packages]);

  const filtered = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const travellers = f.travellers ? parseInt(f.travellers, 10) : NaN;
    const priceMin = f.priceMin ? parseInt(f.priceMin, 10) : -Infinity;
    const priceMax = f.priceMax ? parseInt(f.priceMax, 10) : Infinity;

    const list = packages.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.location} ${p.short_description ?? ""} ${p.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (f.destination !== "any" && !p.location.toLowerCase().includes(f.destination.toLowerCase())) return false;
      if (f.category !== "any" && p.category !== f.category) return false;
      if (f.duration !== "any" && !inDurationBucket(durationDays(p.duration), f.duration)) return false;
      if (f.startingCity !== "any" && p.starting_from !== f.startingCity) return false;
      if (!Number.isNaN(travellers)) {
        const min = p.min_travellers ?? 1;
        const max = p.max_travellers ?? 99;
        if (travellers < min || travellers > max) return false;
      }
      if (p.price != null) {
        if (p.price < priceMin || p.price > priceMax) return false;
      } else if (f.priceMin || f.priceMax) {
        return false;
      }
      if (f.vehicleType !== "any" && !(p.suggested_vehicles ?? []).includes(f.vehicleType)) return false;
      if (f.month !== "any" && !(p.available_months ?? []).includes(f.month)) return false;
      // availability: currently all fetched packages are is_active=true
      return true;
    });

    const sorted = [...list];
    switch (f.sort) {
      case "price-asc": sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity)); break;
      case "price-desc": sorted.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity)); break;
      case "duration-asc": sorted.sort((a, b) => durationDays(a.duration) - durationDays(b.duration)); break;
      case "duration-desc": sorted.sort((a, b) => durationDays(b.duration) - durationDays(a.duration)); break;
      default:
        sorted.sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || a.display_order - b.display_order);
    }
    return sorted;
  }, [packages, f]);

  const activeCount = countActive(f);
  const reset = () => setF(INITIAL);

  return (
    <SiteLayout>
      {/* Unique Custom Hero Section */}
      <PackagesHero packages={packages as any} filters={f as any} setFilters={setF as any} />

      {/* Search bar & Filter Anchor */}
      <section id="packages-results" className="py-6 border-b border-border bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto container-p flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={f.q}
              onChange={(e) => setF({ ...f, q: e.target.value })}
              placeholder="Search packages, destination or category…"
              className="w-full h-11 pl-10 pr-10 rounded-lg border border-border bg-white text-sm outline-none focus:border-[color:var(--brand-blue)]"
            />
            {f.q && (
              <button
                onClick={() => setF({ ...f, q: "" })}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-secondary"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 h-11 px-4 rounded-lg border border-border text-sm font-semibold"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
            {activeCount > 0 && (
              <span className="ml-1 h-5 min-w-5 px-1.5 rounded-full bg-[color:var(--brand-navy)] text-white text-[11px] grid place-items-center">
                {activeCount}
              </span>
            )}
          </button>
          <select
            value={f.sort}
            onChange={(e) => setF({ ...f, sort: e.target.value as SortKey })}
            className="hidden md:block h-11 px-3 rounded-lg border border-border bg-white text-sm"
          >
            <option value="featured">Featured first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="duration-asc">Duration: short to long</option>
            <option value="duration-desc">Duration: long to short</option>
          </select>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto container-p grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block">
            <FilterPanel
              f={f}
              setF={setF}
              destinations={destinations}
              startingCities={startingCities}
              onReset={reset}
              activeCount={activeCount}
            />
          </aside>

          <div>
            <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
              <div className="text-sm text-muted-foreground">
                {isLoading ? (
                  "Loading packages…"
                ) : (
                  <>
                    Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
                    <span className="font-semibold text-foreground">{packages.length}</span> packages
                  </>
                )}
              </div>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-sm text-[color:var(--brand-blue)] font-semibold hover:underline"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Clear filters
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-secondary/40 animate-pulse aspect-[16/10]" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState onReset={reset} />
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-6">
                {filtered.map((p: Package) => (
                  <PackageCard key={p.id} pkg={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border px-5 py-3 flex items-center justify-between">
              <div className="font-display font-bold text-[color:var(--brand-navy)]">Filters</div>
              <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded hover:bg-secondary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5">
              <FilterPanel
                f={f}
                setF={setF}
                destinations={destinations}
                startingCities={startingCities}
                onReset={reset}
                activeCount={activeCount}
              />
              <button
                onClick={() => setDrawerOpen(false)}
                className="mt-5 w-full h-11 rounded-lg bg-[color:var(--brand-navy)] text-white font-semibold"
              >
                Show {filtered.length} package{filtered.length === 1 ? "" : "s"}
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

function countActive(f: Filters): number {
  let n = 0;
  if (f.q) n++;
  if (f.destination !== "any") n++;
  if (f.category !== "any") n++;
  if (f.duration !== "any") n++;
  if (f.startingCity !== "any") n++;
  if (f.travellers) n++;
  if (f.priceMin || f.priceMax) n++;
  if (f.vehicleType !== "any") n++;
  if (f.month !== "any") n++;
  if (f.availableOnly) n++;
  return n;
}

function FilterPanel({
  f,
  setF,
  destinations,
  startingCities,
  onReset,
  activeCount,
}: {
  f: Filters;
  setF: (f: Filters) => void;
  destinations: string[];
  startingCities: string[];
  onReset: () => void;
  activeCount: number;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-display font-bold text-[color:var(--brand-navy)]">
          Filters {activeCount > 0 && <span className="text-muted-foreground font-normal">({activeCount})</span>}
        </div>
        {activeCount > 0 && (
          <button onClick={onReset} className="text-xs text-[color:var(--brand-blue)] font-semibold hover:underline">
            Reset
          </button>
        )}
      </div>

      <Field label="Destination">
        <select
          value={f.destination}
          onChange={(e) => setF({ ...f, destination: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm"
        >
          <option value="any">Any destination</option>
          {destinations.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </Field>

      <Field label="Package category">
        <select
          value={f.category}
          onChange={(e) => setF({ ...f, category: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm"
        >
          <option value="any">All categories</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Field>

      <Field label="Duration">
        <select
          value={f.duration}
          onChange={(e) => setF({ ...f, duration: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm"
        >
          {DURATION_BUCKETS.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
      </Field>

      <Field label="Starting city">
        <select
          value={f.startingCity}
          onChange={(e) => setF({ ...f, startingCity: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm"
        >
          <option value="any">Any city</option>
          {startingCities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Field>

      <Field label="Number of travellers">
        <input
          type="number"
          min={1}
          value={f.travellers}
          onChange={(e) => setF({ ...f, travellers: e.target.value })}
          placeholder="e.g. 4"
          className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm"
        />
      </Field>

      <Field label="Price range (₹)">
        <div className="flex gap-2">
          <input
            type="number"
            min={0}
            value={f.priceMin}
            onChange={(e) => setF({ ...f, priceMin: e.target.value })}
            placeholder="Min"
            className="w-1/2 h-10 px-3 rounded-lg border border-border bg-white text-sm"
          />
          <input
            type="number"
            min={0}
            value={f.priceMax}
            onChange={(e) => setF({ ...f, priceMax: e.target.value })}
            placeholder="Max"
            className="w-1/2 h-10 px-3 rounded-lg border border-border bg-white text-sm"
          />
        </div>
      </Field>

      <Field label="Vehicle type">
        <select
          value={f.vehicleType}
          onChange={(e) => setF({ ...f, vehicleType: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm"
        >
          <option value="any">Any vehicle</option>
          {VEHICLE_TYPES.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </Field>

      <Field label="Travel month">
        <select
          value={f.month}
          onChange={(e) => setF({ ...f, month: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm"
        >
          <option value="any">Any month</option>
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </Field>

      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={f.availableOnly}
          onChange={(e) => setF({ ...f, availableOnly: e.target.checked })}
          className="h-4 w-4 rounded border-border text-[color:var(--brand-navy)]"
        />
        <span>Show available packages only</span>
      </label>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
        {label}
      </div>
      {children}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center">
      <div className="mx-auto h-14 w-14 rounded-full bg-[color:var(--brand-navy)]/5 grid place-items-center text-[color:var(--brand-navy)]">
        <Frown className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display font-bold text-xl text-[color:var(--brand-navy)]">
        No packages match your filters
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try widening your date, price or destination filters — or reach out for a customised itinerary.
      </p>
      <button
        onClick={onReset}
        className="mt-5 inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-[color:var(--brand-navy)] text-white text-sm font-semibold"
      >
        <PackageIcon className="h-4 w-4" /> Show all packages
      </button>
    </div>
  );
}
