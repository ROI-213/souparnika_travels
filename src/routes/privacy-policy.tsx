import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Sowparnika Travels" }, { name: "description", content: "How Sowparnika Travels handles your personal information." }] }),
  component: () => (
    <LegalPage title="Privacy Policy" crumb="Privacy Policy">
      <p>This Privacy Policy describes how Sowparnika Travels ("we", "us") collects, uses and safeguards the information you share with us when you use our website or book a trip.</p>
      <h2>Information we collect</h2>
      <p>We collect information you provide directly — such as your name, phone number, email, pickup/drop details and travel preferences — to process your enquiry and booking.</p>
      <h2>How we use your information</h2>
      <ul>
        <li>To confirm bookings and coordinate your trip.</li>
        <li>To send trip updates, quotations and support messages.</li>
        <li>To improve our services and website experience.</li>
      </ul>
      <h2>Sharing</h2>
      <p>We do not sell your personal data. We share information only with drivers/partners assigned to your trip, and where required by law.</p>
      <h2>Contact</h2>
      <p>Questions about this policy? Email us at hello@sowparnikatravels.com.</p>
    </LegalPage>
  ),
});
