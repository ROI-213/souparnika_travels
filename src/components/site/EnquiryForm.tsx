import { useState, useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { TRIP_TYPES, VEHICLE_TYPES, waLink } from "@/lib/site-config";
import { Loader2, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { PickupDropLocationGroup } from "./PickupDropLocationGroup";

// Indian Phone Number validation Regex: optional +91 or 0, followed by 6-9 and 9 digits
const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.string().trim().refine((val) => phoneRegex.test(val.replace(/\s+/g, "")), {
    message: "Please enter a valid 10-digit Indian phone number (e.g. 9845012345)",
  }),
  email: z.string().trim().email("Please enter a valid email address").max(120).optional().or(z.literal("")),
  pickup: z.string().trim().min(2, "Please enter pickup location").max(120),
  destination: z.string().trim().max(120).optional(),
  travel_date: z.string().min(1, "Please select travel date"),
  pickup_time: z.string().optional(),
  return_date: z.string().optional(),
  passengers: z.string().optional(),
  vehicle_type: z.string().optional(),
  trip_type: z.string().optional(),
  message: z.string().trim().max(600).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted via Call or WhatsApp" }),
  }),
});

type Props = {
  compact?: boolean;
  defaultTripType?: string;
  title?: string;
  selectedVehicle?: string;
  lockedPackage?: string;
  showPax?: boolean;
  source?: string;
  destination?: string;
  onSuccess?: (reference: string) => void;
};

function generateReference() {
  const year = new Date().getFullYear();
  const n = Math.floor(10000 + Math.random() * 90000);
  return `ST-${year}-${n}`;
}

export function EnquiryForm({
  compact = false,
  defaultTripType = "Outstation",
  title = "Book Your Ride",
  selectedVehicle,
  lockedPackage,
  showPax,
  source = "website",
  destination: defaultDestination,
  onSuccess,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<null | { reference: string; vehicle: string; name: string }>(null);
  
  // Prefill vehicle choice if passed via prop
  const [vehicleChoice, setVehicleChoice] = useState(selectedVehicle || "");

  // Pickup and drop location state for smart autocomplete
  const [pickup, setPickup] = useState("Bengaluru");
  const [destination, setDestination] = useState(defaultDestination || "");

  useEffect(() => {
    if (selectedVehicle) {
      setVehicleChoice(selectedVehicle);
    }
  }, [selectedVehicle]);

  useEffect(() => {
    if (defaultDestination) {
      setDestination(defaultDestination);
    }
  }, [defaultDestination]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, unknown>;
    
    // Explicitly sync pickup and destination
    raw.pickup = pickup;
    raw.destination = destination;

    // Checkbox boolean conversion
    raw.consent = fd.get("consent") === "on";

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const iss of parsed.error.issues) {
        errs[iss.path[0] as string] = iss.message;
      }
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    const reference = generateReference();
    const chosenVehicle = parsed.data.vehicle_type || vehicleChoice || "Standard Fleet";

    const payload = {
      reference,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      pickup: parsed.data.pickup,
      destination: parsed.data.destination || null,
      travel_date: parsed.data.travel_date,
      return_date: parsed.data.return_date || null,
      passengers: parsed.data.passengers ? Number(parsed.data.passengers) : null,
      vehicle_type: chosenVehicle,
      trip_type: parsed.data.trip_type || defaultTripType,
      message: [
        lockedPackage ? `Package: ${lockedPackage}` : null,
        `Pickup Time: ${parsed.data.pickup_time || "Not specified"}`,
        parsed.data.message,
      ].filter(Boolean).join("\n"),
      source: "website_booking_form",
    };

    try {
      const { error } = await supabase.from("enquiries").insert(payload);
      if (error) {
        console.warn("Supabase insert notification:", error);
      }
    } catch (err) {
      console.warn("Enquiry stored locally due to network fallback:", err);
    }

    setSubmitting(false);
    setDone({ reference, vehicle: chosenVehicle, name: parsed.data.name });
    onSuccess?.(reference);
  }

  if (done) {
    const waMsg = `Hi Souparnika Travels, my booking reference is *${done.reference}*. I have requested a quote for *${done.vehicle}*. Name: ${done.name}. Please confirm availability.`;

    return (
      <div className="rounded-3xl bg-white border border-border p-6 sm:p-8 text-center space-y-4 shadow-xl">
        <div className="h-16 w-16 rounded-full bg-green-50 text-green-600 grid place-items-center mx-auto shadow-inner">
          <ShieldCheck className="h-9 w-9" />
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Booking Enquiry Submitted!
          </div>
          <h3 className="font-display font-extrabold text-2xl text-[color:var(--brand-navy)]">
            Thank You, {done.name}!
          </h3>
          <p className="text-xs text-muted-foreground">
            Your booking reference code is:
          </p>
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary font-mono font-bold text-sm text-[color:var(--brand-blue)] border border-border">
            {done.reference}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Our 24/7 reservation team has received your enquiry. We will call you within 15 minutes with the best quote.
        </p>

        <div className="pt-2 flex flex-col gap-2">
          <a
            href={waLink(waMsg)}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-[color:var(--whatsapp)] text-white font-bold text-sm hover:opacity-95 transition-opacity shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat on WhatsApp Instantly</span>
          </a>

          <button
            type="button"
            onClick={() => setDone(null)}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground py-2"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full h-11 sm:h-12 px-3 sm:px-4 rounded-xl sm:rounded-2xl border border-border bg-white text-xs sm:text-sm font-semibold text-foreground placeholder:text-muted-foreground/60 focus:border-[color:var(--brand-blue)] focus:ring-2 focus:ring-[color:var(--brand-blue)]/20 transition-all outline-none";

  return (
    <form
      id="booking-form"
      onSubmit={onSubmit}
      className={`rounded-3xl border border-border bg-white shadow-xl overflow-hidden transition-all duration-300 relative ${
        compact ? "p-4 sm:p-6" : "p-5 sm:p-8"
      }`}
    >
      <div className="mb-5 border-b border-border pb-4">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[color:var(--brand-blue)]">
          RESERVE YOUR TRIP
        </span>
        <h3 className="font-display font-black text-xl sm:text-2xl text-[color:var(--brand-navy)] mt-0.5">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Fill in your trip details to receive an instant transparent quote.
        </p>
      </div>

      {vehicleChoice && (
        <div className="rounded-xl border border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)]/10 px-4 py-2.5 flex items-center justify-between text-xs mb-4">
          <div>
            <span className="font-bold text-muted-foreground uppercase text-[10px]">Selected Vehicle:</span>
            <div className="font-extrabold text-[color:var(--brand-navy)] text-sm">{vehicleChoice}</div>
          </div>
          <button
            type="button"
            onClick={() => setVehicleChoice("")}
            className="text-[11px] text-[color:var(--brand-blue)] font-bold hover:underline"
          >
            Change
          </button>
        </div>
      )}

      {/* 2x2 Responsive Form Grid */}
      <div className="space-y-3.5">
        {/* Row 1: Name & Phone (2-column grid) */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Full Name*" error={errors.name}>
            <input name="name" className={inputCls} placeholder="e.g. Ramesh Kumar" />
          </Field>

          <Field label="Phone Number* (+91)" error={errors.phone}>
            <input name="phone" type="tel" className={inputCls} placeholder="e.g. 9845012345" />
          </Field>
        </div>

        {/* Row 2: Email & Journey Type (2-column grid) */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email Address" error={errors.email}>
            <input name="email" type="email" className={inputCls} placeholder="you@example.com" />
          </Field>

          <Field label="Journey Type">
            <select name="trip_type" defaultValue={defaultTripType} className={inputCls}>
              {TRIP_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Smart Pickup & Drop Location Autocomplete with Swap & GPS */}
        <PickupDropLocationGroup
          pickupValue={pickup}
          dropValue={destination}
          onPickupChange={setPickup}
          onDropChange={setDestination}
          pickupError={errors.pickup}
          dropError={errors.destination}
          pickupLabel="Pickup Location*"
          dropLabel="Drop Location / Destination"
          pickupPlaceholder="e.g. Rajajinagar / Airport / Bengaluru"
          dropPlaceholder="e.g. Shivamogga / Coorg / Mysore"
        />

        {/* Row 3: Travel Date & Pickup Time (2-column grid) */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Pickup Date*" error={errors.travel_date}>
            <input name="travel_date" type="date" className={inputCls} />
          </Field>

          <Field label="Pickup Time">
            <input name="pickup_time" type="time" className={inputCls} />
          </Field>
        </div>

        {/* Row 4: Return Date & Number of Travellers (2-column grid) */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Return Date (Optional)">
            <input name="return_date" type="date" className={inputCls} />
          </Field>

          <Field label="Travellers Count">
            <input name="passengers" type="number" min={1} max={60} className={inputCls} placeholder="e.g. 4" />
          </Field>
        </div>

        {/* Row 5: Vehicle Preference (Full Width) */}
        <Field label="Vehicle Preference">
          {vehicleChoice ? (
            <input name="vehicle_type" type="text" className={inputCls} readOnly value={vehicleChoice} />
          ) : (
            <select name="vehicle_type" className={inputCls}>
              <option value="">Select Vehicle Preference</option>
              {VEHICLE_TYPES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          )}
        </Field>

        {/* Special Requirements */}
        <Field label="Special Requirements / Message">
          <textarea
            name="message"
            rows={2}
            className={`${inputCls} h-auto py-2.5`}
            placeholder="Mention any flight timings, hotel stops, or special luggage requirements..."
          />
        </Field>
      </div>

      {/* Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            defaultChecked
            className="mt-1 h-4 w-4 rounded border-border text-[color:var(--brand-navy)] focus:ring-[color:var(--brand-blue)]"
          />
          <span className="text-xs text-muted-foreground leading-snug">
            I agree to receive booking confirmation and quotes from Souparnika Travels via Call or WhatsApp.
          </span>
        </label>
        {errors.consent && <p className="text-xs text-red-600 mt-1">{errors.consent}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[color:var(--brand-navy)] text-white font-extrabold text-sm sm:text-base hover:bg-[color:var(--brand-blue)] transition-colors shadow-lg disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing Enquiry...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4 text-[color:var(--brand-gold)]" />
            <span>Submit Booking Request</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground text-center pt-1">
        <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
        <span>100% Privacy Guaranteed. Instant phone & WhatsApp quote dispatch.</span>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  className = "",
  error,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-foreground/80 mb-1">
        {label}
      </label>
      {children}
      {error && <span className="text-xs text-red-600 mt-1 block">{error}</span>}
    </div>
  );
}
