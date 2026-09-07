import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({ meta: [{ title: "Terms & Conditions — Souparnika Travels" }, { name: "description", content: "Terms of service governing your use of Souparnika Travels." }] }),
  component: () => (
    <LegalPage title="Terms & Conditions" crumb="Terms">
      <p>By using our website or booking a service with Souparnika Travels, you agree to the following terms.</p>
      <h2>Bookings</h2>
      <p>All bookings are subject to vehicle availability and confirmation. Quoted prices are indicative and confirmed after route details are finalised.</p>
      <h2>Rider conduct</h2>
      <p>Passengers are expected to treat drivers and vehicles with respect. Consumption of alcohol, smoking or damage to the vehicle may result in additional charges.</p>
      <h2>Liability</h2>
      <p>We take every precaution for safe travel, but we are not liable for delays caused by weather, traffic, road closures or events beyond our control.</p>
      <h2>Changes</h2>
      <p>These terms may be updated from time to time. Continued use of our services indicates acceptance of the current terms.</p>
    </LegalPage>
  ),
});
