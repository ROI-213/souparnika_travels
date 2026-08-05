import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HomeHero } from "@/components/site/hero/HomeHero";
import { RentalServicesSection } from "@/components/site/fleets/RentalServicesSection";
import { PremiumFeatures } from "@/components/site/PremiumFeatures";
import { PricingPackagesSection } from "@/components/site/PricingPackagesSection";
import { FeaturedPackagesSection } from "@/components/site/FeaturedPackagesSection";
import { WhyUsSection } from "@/components/site/WhyUsSection";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { ContactBookingSection } from "@/components/site/ContactBookingSection";
import { FAQSection } from "@/components/site/FAQSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Souparnika Travels — Premium Vehicle Rental Services in Bangalore" },
      {
        name: "description",
        content:
          "Book Force Urbania, Innova Crysta, Tempo Travellers, Sedans, SUVs, Mini Buses & Luxury Coaches in Bangalore for local, airport, corporate, and South India outstation travel.",
      },
      { property: "og:title", content: "Souparnika Travels — Premium Vehicle Rental Services in Bangalore" },
      {
        property: "og:description",
        content:
          "Book clean, comfortable, and professionally maintained vehicles for local travel, airport transfers, corporate events, weddings, group tours, and outstation journeys.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  const handleSelectVehicle = (vName: string) => {
    setSelectedVehicle(vName);
  };

  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <HomeHero />

      {/* 2. OUR RENTAL SERVICES (VEHICLE CATEGORIES & SLIDERS) */}
      <RentalServicesSection onSelectVehicle={handleSelectVehicle} />

      {/* 3. PREMIUM FEATURES SECTION */}
      <PremiumFeatures />

      {/* 4. RENTAL PACKAGES AND PRICING SECTION */}
      <PricingPackagesSection onSelectVehicle={handleSelectVehicle} />

      {/* 5. WHY CHOOSE US (ABOUT US) SECTION */}
      <WhyUsSection />

      {/* 6. FEATURED TOUR PACKAGES SECTION */}
      <FeaturedPackagesSection />

      {/* 7. CUSTOMER REVIEWS SECTION */}
      <ReviewsSection />

      {/* 8. CONTACT AND BOOKING SECTION */}
      <ContactBookingSection
        selectedVehicle={selectedVehicle}
        onSelectVehicle={handleSelectVehicle}
      />

      {/* 9. FAQ ACCORDION SECTION */}
      <FAQSection />

    </SiteLayout>
  );
}
