import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Trip — Sowparnika Travels" },
      { name: "description", content: "Book a cab, outstation trip or tour package with Sowparnika Travels. Get a quick quote in minutes." },
      { property: "og:title", content: "Book a Trip — Sowparnika Travels" },
      { property: "og:description", content: "Get a quick quote in minutes." },
    ],
  }),
  component: Booking,
});

function Booking() {
  return (
    <SiteLayout>
      <PageHero
        title="Book a Trip"
        subtitle="Tell us where you're going and we'll take care of the rest."
        crumbs={[{ label: "Home" }, { label: "Book" }]}
      />
      <section className="py-14">
        <div className="max-w-3xl mx-auto container-p">
          <EnquiryForm title="Your booking details" />
        </div>
      </section>
    </SiteLayout>
  );
}
