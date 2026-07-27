import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({ meta: [{ title: "Refund Policy — Sowparnika Travels" }, { name: "description", content: "Our refund process and timelines." }] }),
  component: () => (
    <LegalPage title="Refund Policy" crumb="Refund">
      <p>If your booking is eligible for a refund per our Cancellation Policy, we process refunds as follows:</p>
      <ul>
        <li>Refunds are issued to the original payment method.</li>
        <li>Processing typically takes 5–7 business days after confirmation.</li>
        <li>Non-refundable third-party charges (permits, houseboats, hotel prepayments) are deducted before refund.</li>
      </ul>
      <p>For refund status updates, WhatsApp us with your booking reference.</p>
    </LegalPage>
  ),
});
