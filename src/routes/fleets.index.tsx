import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { FleetCard } from "@/components/site/Cards";
import { UrbaniaFleetPricingSection } from "@/components/site/fleets/UrbaniaFleetPricingSection";
import { fleetsQuery, type Fleet } from "@/lib/queries";
import { TRIP_TYPES } from "@/lib/site-config";
import {
  Search,
  SlidersHorizontal,
  X,
  Car,
  RotateCcw,
  Frown,
} from "lucide-react";

export const Route = createFileRoute("/fleets/")({
  head: () => ({
    meta: [
      { title: "Our Fleet — Souparnika Travels" },
      {
        name: "description",
        content:
          "Explore our fleet of hatchbacks, sedans, SUVs, tempo travellers, mini buses and luxury vehicles for local, airport and outstation travel across South India.",
      },
      { property: "og:title", content: "Fleets — Souparnika Travels" },
      { property: "og:description", content: "Hatchbacks, sedans, SUVs, tempo travellers and luxury vehicles." },
    ],
  }),
  component: FleetsPage,
});

type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

type Filters = {
  q: string;
  category: string;
  acOnly: "any" | "ac" | "non";
  seatingBucket: "any" | "1-4" | "5-7" | "8-14" | "15+";
  minPassengers: string;
  local: boolean;
  outstation: boolean;
  priceMin: string;
  priceMax: string;
  tripType: string;
  sort: SortKey;
};

const DEFAULT_FILTERS: Filters = {
  q: "",
  category: "all",
  acOnly: "any",
  seatingBucket: "any",
  minPassengers: "",
  local: false,
  outstation: false,
  priceMin: "",
  priceMax: "",
  tripType: "all",
  sort: "featured",
};

function seatingMatches(bucket: Filters["seatingBucket"], seats: number) {
  switch (bucket) {
    case "1-4":
      return seats >= 1 && seats <= 4;
    case "5-7":
      return seats >= 5 && seats <= 7;
    case "8-14":
      return seats >= 8 && seats <= 14;
    case "15+":
      return seats >= 15;
    default:
      return true;
  }
}

function applyFilters(fleets: Fleet[], f: Filters): Fleet[] {
  const q = f.q.trim().toLowerCase();
  const min = f.priceMin ? Number(f.priceMin) : null;
  const max = f.priceMax ? Number(f.priceMax) : null;
  const pax = f.minPassengers ? Number(f.minPassengers) : null;

  const out = fleets.filter((v) => {
    if (q && !`${v.name} ${v.category} ${v.short_description ?? ""}`.toLowerCase().includes(q)) return false;
    if (f.category !== "all" && v.category !== f.category) return false;
    if (f.acOnly === "ac" && !v.ac) return false;
    if (f.acOnly === "non" && v.ac) return false;
    if (!seatingMatches(f.seatingBucket, v.seating)) return false;
    if (pax != null && v.seating < pax) return false;
    if (f.local && !v.available_local) return false;
    if (f.outstation && !v.available_outstation) return false;
    if (min != null && (v.starting_price ?? 0) < min) return false;
    if (max != null && (v.starting_price ?? Number.POSITIVE_INFINITY) > max) return false;
    if (f.tripType !== "all") {
      const s = v.suitable_for ?? [];
      if (!s.some((x) => x.toLowerCase() === f.tripType.toLowerCase())) return false;
    }
    return true;
  });

  const sorted = [...out];
  switch (f.sort) {
    case "price-asc":
      sorted.sort((a, b) => (a.starting_price ?? Infinity) - (b.starting_price ?? Infinity));
      break;
    case "price-desc":
      sorted.sort((a, b) => (b.starting_price ?? -1) - (a.starting_price ?? -1));
      break;
    case "newest":
      // display_order asc is used elsewhere; treat higher display_order as newer for demo
      sorted.sort((a, b) => (b.display_order ?? 0) - (a.display_order ?? 0));
      break;
    case "featured":
    default:
      sorted.sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || a.display_order - b.display_order);
  }
  return sorted;
}

function FleetsPage() {
  const { data: fleets = [], isLoading } = useQuery(fleetsQuery());
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(fleets.map((f) => f.category))).sort(),
    [fleets],
  );

  const filtered = useMemo(() => applyFilters(fleets, filters), [fleets, filters]);
  const isDirty = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((s) => ({ ...s, [key]: value }));
  }

  return (
    <SiteLayout>
      <PageHero
        title="Our Fleet"
        subtitle="From compact hatchbacks to luxury mini-buses — find the perfect vehicle for your journey. Every fleet vehicle is serviced regularly and driven by a verified chauffeur."
        crumbs={[{ label: "Home", to: "/" }, { label: "Fleets" }]}
      />

      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto container-p grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                update={update}
                categories={categories}
                onReset={() => setFilters(DEFAULT_FILTERS)}
                isDirty={isDirty}
              />
            </div>
          </aside>

          {/* Results */}
          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <div className="text-sm text-muted-foreground">
                {isLoading ? (
                  "Loading fleets…"
                ) : (
                  <>
                    Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
                    <span className="font-semibold text-foreground">{fleets.length}</span> vehicles
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-border bg-white text-sm font-semibold"
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                  {isDirty && <span className="h-2 w-2 rounded-full bg-[color:var(--brand-gold)]" />}
                </button>
                <label className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-border bg-white">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider hidden sm:inline">
                    Sort
                  </span>
                  <select
                    value={filters.sort}
                    onChange={(e) => update("sort", e.target.value as SortKey)}
                    className="text-sm font-semibold bg-transparent focus:outline-none"
                  >
                    <option value="featured">Featured first</option>
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Search */}
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={filters.q}
                onChange={(e) => update("q", e.target.value)}
                placeholder="Search by vehicle name (e.g. Innova, Etios, Tempo…)"
                className="w-full h-11 pl-9 pr-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)]/40 focus:border-[color:var(--brand-blue)]"
              />
            </div>

            {/* Active chips */}
            {isDirty && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {activeChips(filters).map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[color:var(--brand-navy)] text-white"
                  >
                    {c}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--brand-blue)] hover:underline"
                >
                  <RotateCcw className="h-3 w-3" /> Clear filters
                </button>
              </div>
            )}

            {/* Grid */}
            <div className="mt-6">
              {isLoading ? (
                <div className="grid grid-cols-2 gap-3.5 sm:gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-border bg-white p-5 animate-pulse h-72" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <EmptyState onReset={() => setFilters(DEFAULT_FILTERS)} />
              ) : (
                <div className="grid grid-cols-2 gap-3.5 sm:gap-6">
                  {filtered.map((f) => (
                    <FleetCard key={f.id} fleet={f} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Urbania Fleet Pricing System ("Pick your cabin. See your rate.") */}
      <UrbaniaFleetPricingSection />

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="relative w-full max-h-[85vh] rounded-t-3xl bg-white overflow-hidden flex flex-col animate-in slide-in-from-bottom-8">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="font-display font-bold text-lg text-[color:var(--brand-navy)]">
                Filter fleets
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="h-9 w-9 grid place-items-center rounded-full border border-border"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 overflow-auto">
              <FilterPanel
                filters={filters}
                update={update}
                categories={categories}
                onReset={() => setFilters(DEFAULT_FILTERS)}
                isDirty={isDirty}
              />
            </div>
            <div className="p-4 border-t border-border grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="h-11 rounded-lg border border-border font-semibold text-sm"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="h-11 rounded-lg bg-[color:var(--brand-navy)] text-white font-semibold text-sm"
              >
                Show {filtered.length} vehicles
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

function FilterPanel({
  filters,
  update,
  categories,
  onReset,
  isDirty,
}: {
  filters: Filters;
  update: <K extends keyof Filters>(k: K, v: Filters[K]) => void;
  categories: string[];
  onReset: () => void;
  isDirty: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="font-display font-bold text-[color:var(--brand-navy)]">Filters</div>
        {isDirty && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-[color:var(--brand-blue)] hover:underline inline-flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      <FilterGroup label="Category">
        <select
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
          className={fieldCls}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Seating capacity">
        <select
          value={filters.seatingBucket}
          onChange={(e) => update("seatingBucket", e.target.value as Filters["seatingBucket"])}
          className={fieldCls}
        >
          <option value="any">Any</option>
          <option value="1-4">1 – 4 seats</option>
          <option value="5-7">5 – 7 seats</option>
          <option value="8-14">8 – 14 seats</option>
          <option value="15+">15+ seats</option>
        </select>
      </FilterGroup>

      <FilterGroup label="Minimum passengers">
        <input
          type="number"
          min={1}
          value={filters.minPassengers}
          onChange={(e) => update("minPassengers", e.target.value)}
          placeholder="e.g. 6"
          className={fieldCls}
        />
      </FilterGroup>

      <FilterGroup label="AC preference">
        <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-border p-1 bg-secondary/40">
          {(["any", "ac", "non"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => update("acOnly", v)}
              className={`h-8 text-xs font-semibold rounded ${
                filters.acOnly === v
                  ? "bg-white text-[color:var(--brand-navy)] shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {v === "any" ? "Any" : v === "ac" ? "AC" : "Non-AC"}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Availability">
        <div className="space-y-2">
          <Toggle
            label="Local availability"
            checked={filters.local}
            onChange={(v) => update("local", v)}
          />
          <Toggle
            label="Outstation availability"
            checked={filters.outstation}
            onChange={(v) => update("outstation", v)}
          />
        </div>
      </FilterGroup>

      <FilterGroup label="Price range (₹/km)">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min={0}
            value={filters.priceMin}
            onChange={(e) => update("priceMin", e.target.value)}
            placeholder="Min"
            className={fieldCls}
          />
          <input
            type="number"
            min={0}
            value={filters.priceMax}
            onChange={(e) => update("priceMax", e.target.value)}
            placeholder="Max"
            className={fieldCls}
          />
        </div>
      </FilterGroup>

      <FilterGroup label="Suitable travel type">
        <select
          value={filters.tripType}
          onChange={(e) => update("tripType", e.target.value)}
          className={fieldCls}
        >
          <option value="all">Any travel type</option>
          {TRIP_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </FilterGroup>
    </div>
  );
}

function activeChips(f: Filters): string[] {
  const chips: string[] = [];
  if (f.q) chips.push(`Search: "${f.q}"`);
  if (f.category !== "all") chips.push(f.category);
  if (f.seatingBucket !== "any") chips.push(`${f.seatingBucket} seats`);
  if (f.minPassengers) chips.push(`≥ ${f.minPassengers} pax`);
  if (f.acOnly !== "any") chips.push(f.acOnly === "ac" ? "AC only" : "Non-AC only");
  if (f.local) chips.push("Local");
  if (f.outstation) chips.push("Outstation");
  if (f.priceMin) chips.push(`₹${f.priceMin}+/km`);
  if (f.priceMax) chips.push(`≤ ₹${f.priceMax}/km`);
  if (f.tripType !== "all") chips.push(f.tripType);
  return chips;
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
        {label}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm cursor-pointer">
      <span className="text-foreground/80">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? "bg-[color:var(--brand-navy)]" : "bg-secondary border border-border"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </label>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center">
      <div className="mx-auto h-14 w-14 rounded-full bg-secondary grid place-items-center text-[color:var(--brand-navy)]">
        <Frown className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display font-bold text-xl text-[color:var(--brand-navy)]">
        No vehicles match your filters
      </h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
        Try widening your search — remove a filter or two, or contact us directly and we'll help
        you find the right vehicle.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-[color:var(--brand-navy)] text-white text-sm font-semibold"
      >
        <Car className="h-4 w-4" /> Reset filters
      </button>
    </div>
  );
}

const fieldCls =
  "w-full h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)]/40 focus:border-[color:var(--brand-blue)]";
