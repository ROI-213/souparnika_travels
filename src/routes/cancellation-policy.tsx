import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({ meta: [{ title: "Cancellation Policy — Sowparnika Travels" }, { name: "description", content: "How cancellations are handled at Sowparnika Travels." }] }),
  component: () => (
    <LegalPage title="Cancellation Policy" crumb="Cancellation">
      <h2>Local & airport transfers</h2>
      <ul>
        <li>Free cancellation up to 4 hours before pickup.</li>
        <li>50% charge for cancellations within 4 hours.</li>
        <li>No-show is charged in full.</li>
      </ul>
      <h2>Outstation trips</h2>
      <ul>
        <li>Free cancellation up to 24 hours before pickup.</li>
        <li>30% charge for cancellations within 24 hours.</li>
      </ul>
      <h2>Tour packages</h2>
      <p>Cancellation terms for packages are shared at the time of booking and may vary based on the itinerary and third-party bookings involved.</p>
      <p>To cancel, WhatsApp us or call our support number. We'll confirm the cancellation and any applicable charges in writing.</p>
    </LegalPage>
  ),
});
