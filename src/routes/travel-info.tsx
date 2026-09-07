import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/travel-info")({
  component: TravelInfoPage,
});

function TravelInfoPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Travel Information"
        subtitle="Everything you need to know before you travel with us."
        crumbs={[{ label: "Home", to: "/" }, { label: "Travel Info" }]}
      />
      <div className="max-w-4xl mx-auto container-p py-16 min-h-[50vh]">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-display font-bold text-[color:var(--brand-navy)] mb-4">Booking Process</h2>
            <p className="text-muted-foreground leading-relaxed">
              Booking your trip with Souparnika Travels is simple. You can reach out to us via our Plan My Trip form, call us directly, or send us a message on WhatsApp. Our travel experts will assist you in crafting the perfect itinerary and selecting the ideal vehicle for your journey.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[color:var(--brand-navy)] mb-4">What to Expect</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
              <li>Clean, well-maintained vehicles.</li>
              <li>Professional, courteous, and experienced drivers.</li>
              <li>Transparent pricing with no hidden charges.</li>
              <li>24/7 on-trip support for any assistance you might need.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-[color:var(--brand-navy)] mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6 mt-6">
              <div>
                <h3 className="font-bold text-lg">Do you provide outstation cabs?</h3>
                <p className="text-muted-foreground mt-1">Yes, we provide outstation cabs to all major destinations across South India.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Are driver allowances included?</h3>
                <p className="text-muted-foreground mt-1">Driver allowance is generally included in our package quotes unless stated otherwise. Tolls and parking are usually extra.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
