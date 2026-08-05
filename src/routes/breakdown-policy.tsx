import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/breakdown-policy")({
  head: () => ({
    meta: [
      { title: "Vehicle Breakdown & Emergency Policy — Urbania Rentals Bangalore" },
      { name: "description", content: "Breakdown replacement and emergency roadside support policy of Urbania Rentals Bangalore." },
    ],
  }),
  component: () => (
    <LegalPage title="Vehicle Breakdown Policy" crumb="Breakdown Policy">
      <h2>Emergency Roadside Guarantee</h2>
      <p>
        At Urbania Rentals Bangalore, every Force Urbania, Tempo Traveller, and luxury coach undergoes thorough pre-trip mechanics and safety inspection. In the rare event of a mechanical breakdown during your journey, our emergency control room operates 24/7.
      </p>

      <h2>Resolution Protocol</h2>
      <ol>
        <li><strong>Immediate Control Room Alert:</strong> Driver notifies our 24/7 dispatch desk within 15 minutes of any mechanical issue.</li>
        <li><strong>On-Site Support / Repairs:</strong> If a minor issue can be resolved within 30-45 minutes, certified technicians are dispatched immediately.</li>
        <li><strong>Replacement Vehicle Dispatch:</strong> For major breakdowns or delays exceeding 60 minutes, an equivalent or upgraded vehicle (Urbania/Tempo Traveller) is dispatched from the nearest service hub at zero extra cost.</li>
        <li><strong>Pro-rata Adjustment &amp; Compensation:</strong> If journey time is significantly impacted, unutilized hours or kilometers are credited or refunded.</li>
      </ol>

      <h2>Customer Hotline</h2>
      <p>
        During your trip, you can contact our emergency dispatch hotline anytime at <strong>+91 97407 96070</strong> or WhatsApp your live location.
      </p>
    </LegalPage>
  ),
});
