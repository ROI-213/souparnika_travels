import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/destinations")({
  component: DestinationsPage,
});

function DestinationsPage() {
  return (
    <SiteLayout>
      <PageHero
        title="South India Destinations"
        subtitle="Explore the most beautiful and culturally rich locations across South India."
        crumbs={[{ label: "Home", to: "/" }, { label: "Destinations" }]}
      />
      <div className="max-w-7xl mx-auto container-p py-16 min-h-[50vh]">
        <h2 className="text-3xl font-display font-bold text-[color:var(--brand-navy)] mb-6">Popular Destinations</h2>
        <p className="text-muted-foreground text-lg mb-8">
          From the misty hills of Coorg to the historic palaces of Mysore, discover our top destinations.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Placeholder for destinations */}
          {[
            { name: "Coorg", desc: "The Scotland of India" },
            { name: "Mysore", desc: "City of Palaces" },
            { name: "Ooty", desc: "Queen of Hill Stations" },
          ].map((dest) => (
            <div key={dest.name} className="p-6 rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
              <p className="text-muted-foreground">{dest.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
