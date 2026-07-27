import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { TRIP_TYPES, VEHICLE_TYPES, waLink } from "@/lib/site-config";
import { Check, Loader2, MessageCircle } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(20),
  email: z.string().trim().email().max(120).optional().or(z.literal("")),
  pickup: z.string().trim().max(120).optional(),
  destination: z.string().trim().max(120).optional(),
  travel_date: z.string().optional(),
  return_date: z.string().optional(),
  passengers: z.string().optional(),
  adults: z.string().optional(),
  children: z.string().optional(),
  vehicle_type: z.string().optional(),
  trip_type: z.string().optional(),
  message: z.string().trim().max(600).optional(),
});

type Props = {
  compact?: boolean;
  defaultTripType?: string;
  title?: string;
  lockedVehicle?: string;
  lockedPackage?: string;
  showPax?: boolean;
  source?: string;
  onSuccess?: (reference: string) => void;
};

function generateReference() {
  const year = new Date().getFullYear();
  const n = Math.floor(10000 + Math.random() * 90000);
  return `ST-${year}-${n}`;
}

export function EnquiryForm({
  compact = false,
  defaultTripType,
  title,
  lockedVehicle,
  lockedPackage,
  showPax = false,
  source = "website",
  onSuccess,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<null | { reference: string }>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const iss of parsed.error.issues) errs[iss.path[0] as string] = iss.message;
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    const reference = generateReference();
    const adults = parsed.data.adults ? Number(parsed.data.adults) : 0;
    const children = parsed.data.children ? Number(parsed.data.children) : 0;
    const passengers = parsed.data.passengers
      ? Number(parsed.data.passengers)
      : (adults + children) || null;
    const sourcePage =
      typeof window !== "undefined" ? window.location.pathname + window.location.search : null;
    const extraLines = [
      lockedPackage ? `Package: ${lockedPackage}` : null,
      showPax && (adults || children) ? `Adults: ${adults}, Children: ${children}` : null,
      sourcePage ? `Page: ${sourcePage}` : null,
      `Source: ${source}`,
    ].filter(Boolean).join("\n");
    const combinedMessage = [extraLines, parsed.data.message].filter(Boolean).join("\n\n") || null;
    const payload = {
      reference,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      pickup: parsed.data.pickup || null,
      destination: parsed.data.destination || lockedPackage || null,
      travel_date: parsed.data.travel_date || null,
      return_date: parsed.data.return_date || null,
      passengers,
      vehicle_type: parsed.data.vehicle_type || null,
      trip_type: parsed.data.trip_type || null,
      message: combinedMessage,
      source,
      source_page: sourcePage,
    };
    const { error } = await supabase.from("enquiries").insert(payload);
    setSubmitting(false);
    if (error) {
      setErrors({ _root: "Something went wrong. Please try again or WhatsApp us." });
      return;
    }
    setDone({ reference });
    onSuccess?.(reference);
  }


  if (done) {
    const msg = `Hi, my enquiry reference is ${done.reference}. Please share a quote.`;
    return (
      <div className="rounded-2xl bg-white border border-border p-6 lg:p-8 text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-green-100 text-green-600 grid place-items-center">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display font-bold text-xl text-[color:var(--brand-navy)]">
          Enquiry received!
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your reference number is{" "}
          <span className="font-mono font-semibold text-foreground">{done.reference}</span>. Our team will call you
          shortly.
        </p>
        <a
          href={waLink(msg)}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[color:var(--whatsapp)] text-white text-sm font-semibold"
        >
          <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
        </a>
      </div>
    );
  }

  const inputCls =
    "w-full h-11 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)]/40 focus:border-[color:var(--brand-blue)]";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white border border-border shadow-[0_20px_50px_-30px_rgba(11,35,65,0.4)] p-5 lg:p-7"
    >
      {title && (
        <div className="mb-4">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-blue)]">
            Quick Enquiry
          </div>
          <h3 className="font-display font-extrabold text-xl text-[color:var(--brand-navy)] mt-1">
            {title}
          </h3>
        </div>
      )}

      {lockedPackage && (
        <div className="mb-4 rounded-lg border border-[color:var(--brand-gold)]/50 bg-[color:var(--brand-gold)]/10 px-3 py-2 text-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--brand-blue)]">Selected package</span>
          <div className="font-semibold text-[color:var(--brand-navy)]">{lockedPackage}</div>
        </div>
      )}

      <div className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        <Field label="Full name*" error={errors.name}>
          <input name="name" className={inputCls} placeholder="Your name" />
        </Field>
        <Field label="Phone*" error={errors.phone}>
          <input name="phone" className={inputCls} placeholder="+91 …" />
        </Field>
        <Field label="Email" error={errors.email}>
          <input name="email" type="email" className={inputCls} placeholder="you@example.com" />
        </Field>
        <Field label="Pickup location">
          <input name="pickup" className={inputCls} placeholder="e.g. Bengaluru airport" />
        </Field>
        {!lockedPackage && (
          <Field label="Destination">
            <input name="destination" className={inputCls} placeholder="e.g. Coorg" />
          </Field>
        )}
        <Field label="Trip type">
          <select name="trip_type" defaultValue={defaultTripType ?? ""} className={inputCls}>
            <option value="">Select trip type</option>
            {TRIP_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Travel date">
          <input name="travel_date" type="date" className={inputCls} />
        </Field>
        <Field label="Return date">
          <input name="return_date" type="date" className={inputCls} />
        </Field>
        {showPax ? (
          <>
            <Field label="Adults">
              <input name="adults" type="number" min={1} max={60} className={inputCls} placeholder="e.g. 2" />
            </Field>
            <Field label="Children">
              <input name="children" type="number" min={0} max={40} className={inputCls} placeholder="e.g. 1" />
            </Field>
          </>
        ) : (
          <Field label="Passengers">
            <input name="passengers" type="number" min={1} max={60} className={inputCls} placeholder="e.g. 4" />
          </Field>
        )}
        <Field label={lockedVehicle ? "Selected vehicle" : "Vehicle type"} className="sm:col-span-2 lg:col-span-3">
          {lockedVehicle ? (
            <>
              <input type="hidden" name="vehicle_type" value={lockedVehicle} />
              <div className={`${inputCls} flex items-center bg-secondary/60 font-semibold text-[color:var(--brand-navy)]`}>
                {lockedVehicle}
              </div>
            </>
          ) : (
            <select name="vehicle_type" className={inputCls}>
              <option value="">Any suitable vehicle</option>
              {VEHICLE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Additional details" className="sm:col-span-2 lg:col-span-3">
          <textarea
            name="message"
            rows={3}
            className={`${inputCls} h-auto py-2.5`}
            placeholder="Anything else we should know…"
          />
        </Field>
      </div>

      {errors._root && <p className="mt-3 text-sm text-destructive">{errors._root}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-[color:var(--brand-navy)] text-white font-semibold hover:bg-[color:var(--brand-blue)] transition-colors disabled:opacity-70"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Submitting…" : "Submit Enquiry"}
      </button>
      <p className="mt-2 text-[11px] text-muted-foreground text-center">
        We'll never share your details. You'll receive a call/WhatsApp shortly.
      </p>
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
    <label className={`block ${className}`}>
      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <div className="mt-1">{children}</div>
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </label>
  );
}
