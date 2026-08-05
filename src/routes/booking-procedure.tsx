import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/booking-procedure")({
  head: () => ({
    meta: [
      { title: "Booking Procedure & Policy — Urbania Rentals Bangalore" },
      { name: "description", content: "Step by step booking procedure and rental guidelines for Urbania Rentals Bangalore." },
    ],
  }),
  component: () => (
    <LegalPage title="Booking Procedure" crumb="Booking Procedure">
      <h2>7-Step Transparent Booking Procedure</h2>
      <ol>
        <li><strong>Step 1: Submit Travel Requirements</strong> — Fill out our online booking form, request a quote via WhatsApp, or call our 24/7 reservation desk.</li>
        <li><strong>Step 2: Quotation &amp; Vehicle Confirmation</strong> — Receive an official itemized quotation including base rate, driver allowance, included kilometers, and statutory tax estimates.</li>
        <li><strong>Step 3: Advance Payment</strong> — Pay a minimal advance deposit via UPI, Credit Card, or Net Banking to lock your vehicle calendar.</li>
        <li><strong>Step 4: Reservation Confirmation</strong> — Receive an instant booking confirmation voucher with your unique reference code.</li>
        <li><strong>Step 5: Driver &amp; Vehicle Allotment</strong> — Chauffeur details and vehicle registration numbers are dispatched 4 to 12 hours prior to journey pickup time.</li>
        <li><strong>Step 6: Journey &amp; Outstation Travel</strong> — Enjoy your smooth journey with our professional uniformed driver and well-maintained vehicle.</li>
        <li><strong>Step 7: Final Settlement</strong> — Settle any remaining balance at the end of the trip directly with the driver or online.</li>
      </ol>

      <h2>Key Rental Terms</h2>
      <ul>
        <li>Outstation trips require a daily minimum billing of 250 km to 350 km depending on vehicle size.</li>
        <li>Driver allowance (BATA) covers driver meals and daily service from 6:00 AM to 10:00 PM.</li>
        <li>Night driving charges apply for travel extending between 10:00 PM and 6:00 AM.</li>
        <li>Tolls, parking fees, interstate permit taxes, and GST are extra at actuals.</li>
      </ul>
    </LegalPage>
  ),
});
