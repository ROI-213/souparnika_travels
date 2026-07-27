import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/experiences")({
  component: ExperiencesPage,
});

function ExperiencesPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Curated Experiences"
        subtitle="Unique travel experiences designed to give you memories that last a lifetime."
        crumbs={[{ label: "Home", to: "/" }, { label: "Experiences" }]}
      />
      <div className="max-w-7xl mx-auto container-p py-16 min-h-[50vh]">
        <h2 className="text-3xl font-display font-bold text-[color:var(--brand-navy)] mb-6">Memorable Experiences</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Whether you want a spiritual journey, a wildlife adventure, or a relaxing staycation, we have it all.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "Wildlife Safaris", desc: "Experience the thrill of the jungle." },
            { name: "Heritage Walks", desc: "Step back in time with guided tours." },
            { name: "Spiritual Journeys", desc: "Visit ancient temples and sacred sites." },
            { name: "Hill Station Retreats", desc: "Relax and rejuvenate in the mountains." },
          ].map((exp) => (
            <div key={exp.name} className="p-6 rounded-2xl border border-border bg-white shadow-sm flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2 text-[#c9922e]">{exp.name}</h3>
              <p className="text-muted-foreground text-lg">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
