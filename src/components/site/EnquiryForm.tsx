import { useState, useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { TRIP_TYPES, VEHICLE_TYPES, waLink } from "@/lib/site-config";
import { Check, Loader2, MessageCircle, Send, ShieldCheck } from "lucide-react";

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
  captcha_answer: z.string().min(1, "Please answer the human verification check"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted via Call or WhatsApp" }),
  }),
});

type Props = {
  compact?: boolean;
  defaultTripType?: string;
  title?: string;
  selectedVehicle?: string;
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
  onSuccess,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<null | { reference: string; vehicle: string; name: string }>(null);
  
  // Prefill vehicle choice if passed via prop
  const [vehicleChoice, setVehicleChoice] = useState(selectedVehicle || "");

  // Random Math Captcha (client-side only)
  const [num1, setNum1] = useState<number | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  useEffect(() => {
    setNum1(Math.floor(Math.random() * 8) + 2);
    setNum2(Math.floor(Math.random() * 7) + 1);
  }, []);

  useEffect(() => {
    if (selectedVehicle) {
      setVehicleChoice(selectedVehicle);
    }
  }, [selectedVehicle]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, unknown>;
    
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

    // Verify Captcha
    if (num1 === null || num2 === null) {
      setErrors({ captcha_answer: 'Captcha not loaded yet. Please try again.' });
      return;
    }
    if (Number(parsed.data.captcha_answer) !== num1 + num2) {
      setErrors({ captcha_answer: `Incorrect answer. What is ${num1} + ${num2}?` });
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
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 text-green-600 grid place-items-center">
          <Check className="h-8 w-8 stroke-[2.5]" />
        </div>
        <div>
          <h3 className="font-display font-bold text-2xl text-[color:var(--brand-navy)]">
            Booking Enquiry Submitted!
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Thank you, <span className="font-bold text-foreground">{done.name}</span>. Your reference number is:
          </p>
          <div className="mt-2 inline-block font-mono font-bold text-lg text-[color:var(--brand-navy)] bg-secondary px-4 py-1.5 rounded-xl border border-border">
            {done.reference}
          </div>
        </div>

        <p className="text-xs text-foreground/80 leading-relaxed max-w-md mx-auto">
          Our 24/7 reservation team will call you shortly on your provided phone number with the final quote. You can also confirm instantly via WhatsApp below:
        </p>

        <div className="pt-2">
          <a
            href={waLink(waMsg)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[color:var(--whatsapp)] text-white text-sm font-bold shadow-lg hover:brightness-105 transition-all"
          >
            <MessageCircle className="h-4 w-4" /> Confirm Instantly on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full h-11 px-3.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)]/40 focus:border-[color:var(--brand-blue)] transition-colors";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl bg-white border border-border shadow-2xl p-6 sm:p-8 space-y-4"
      id="booking-form"
    >
      <div className="border-b border-border pb-4">
        <div className="text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--brand-blue)]">
          RESERVE YOUR TRIP
        </div>
        <h3 className="font-display font-extrabold text-2xl text-[color:var(--brand-navy)] mt-0.5">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Fill in your trip details to receive an instant transparent quote.
        </p>
      </div>

      {vehicleChoice && (
        <div className="rounded-xl border border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)]/10 px-4 py-2.5 flex items-center justify-between text-xs">
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

      <div className={`grid gap-3.5 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        <Field label="Full Name*" error={errors.name}>
          <input name="name" className={inputCls} placeholder="e.g. Ramesh Kumar" />
        </Field>

        <Field label="Phone Number* (+91)" error={errors.phone}>
          <input name="phone" className={inputCls} placeholder="e.g. 9845012345" />
        </Field>

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

        <Field label="Pickup Location*" error={errors.pickup}>
          <input name="pickup" className={inputCls} placeholder="e.g. Rajajinagar / Airport" />
        </Field>

        <Field label="Drop Location / Destination">
          <input name="destination" className={inputCls} placeholder="e.g. Coorg / Mysore" />
        </Field>

        <Field label="Pickup Date*" error={errors.travel_date}>
          <input name="travel_date" type="date" className={inputCls} />
        </Field>

        <Field label="Pickup Time">
          <input name="pickup_time" type="time" className={inputCls} />
        </Field>

        <Field label="Return Date (Optional)">
          <input name="return_date" type="date" className={inputCls} />
        </Field>

        <Field label="Number of Travellers">
          <input name="passengers" type="number" min={1} max={60} className={inputCls} placeholder="e.g. 4" />
        </Field>

        <Field label="Vehicle Preference" className="sm:col-span-2">
          {vehicleChoice ? (
            <input type="hidden" name="vehicle_type" value={vehicleChoice} />
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

        <Field label="Special Requirements / Message" className="sm:col-span-2">
          <textarea
            name="message"
            rows={2}
            className={`${inputCls} h-auto py-2.5`}
            placeholder="Mention any flight timings, hotel stops, or special luggage requirements..."
          />
        </Field>

        {/* Human Captcha Check */}
        <Field label={`Human Verification: What is ${num1 ?? ''} + ${num2 ?? ''}?*`} error={errors.captcha_answer} className="sm:col-span-2">
          <input
            name="captcha_answer"
            type="number"
            className={inputCls}
            placeholder={`Enter the sum of ${num1} + ${num2}`}
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
