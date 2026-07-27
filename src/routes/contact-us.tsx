import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE, telLink, waLink } from "@/lib/site-config";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Clock, Mail, MapPin, MessageCircle, Phone, HeadphonesIcon,
  Facebook, Instagram, Youtube, Linkedin, PhoneCall, Navigation, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Sowparnika Travels — 24×7 Booking & Support" },
      { name: "description", content: "Call, WhatsApp or email Sowparnika Travels for bookings, quotes and support. Visit our Bengaluru office or send an enquiry online." },
      { property: "og:title", content: "Contact Sowparnika Travels" },
      { property: "og:description", content: "We're here 24×7 for your travel needs." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Get in Touch"
        subtitle="We're here 24×7 — reach out anytime for bookings, quotes or a friendly chat."
        crumbs={[{ label: "Home" }, { label: "Contact" }]}
      />

      {/* Quick contact options */}
      <section className="py-10 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto container-p grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickAction icon={Phone} label="Click to Call" sub={SITE.phone} href={telLink()} tone="navy" />
          <QuickAction icon={MessageCircle} label="WhatsApp Chat" sub="Instant reply" href={waLink()} tone="whatsapp" external />
          <QuickAction icon={Mail} label="Email Us" sub={SITE.email} href={`mailto:${SITE.email}`} tone="blue" />
          <CallbackAction />
        </div>
      </section>

      {/* Info + Form */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto container-p grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <div>
              <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-[color:var(--brand-navy)]">
                Contact Information
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">
                Reach us whichever way is easiest for you — we respond fast.
              </p>
            </div>
            <InfoRow icon={MapPin} title="Office Address" value={SITE.address} link={SITE.mapsUrl} />
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoRow icon={Phone} title="Phone" value={SITE.phone} link={telLink()} />
              <InfoRow icon={MessageCircle} title="WhatsApp" value={SITE.phone} link={waLink()} />
              <InfoRow icon={Mail} title="Email" value={SITE.email} link={`mailto:${SITE.email}`} />
              <InfoRow icon={HeadphonesIcon} title="Support" value={SITE.supportPhone} link={telLink(SITE.supportPhoneRaw)} />
            </div>
            <InfoRow icon={Clock} title="Business Hours" value={SITE.hours} />

            {/* Social */}
            <div className="rounded-2xl border border-border bg-white p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Follow us</div>
              <div className="flex flex-wrap gap-2">
                <Social icon={Facebook} href={SITE.social.facebook} label="Facebook" />
                <Social icon={Instagram} href={SITE.social.instagram} label="Instagram" />
                <Social icon={Youtube} href={SITE.social.youtube} label="YouTube" />
                <Social icon={Linkedin} href={SITE.social.linkedin} label="LinkedIn" />
                <Social icon={MessageCircle} href={waLink()} label="WhatsApp" tone="whatsapp" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <EnquiryForm title="Send us a message" />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto container-p">
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-white">
            <div className="p-5 lg:p-6 flex flex-wrap gap-4 items-center justify-between border-b border-border">
              <div>
                <h3 className="font-display font-bold text-lg text-[color:var(--brand-navy)]">Find our office</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{SITE.address}</p>
              </div>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 h-11 rounded-lg bg-[color:var(--brand-navy)] text-white text-sm font-semibold hover:bg-[color:var(--brand-blue)] transition"
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            </div>
            <div className="aspect-[16/8] w-full bg-slate-100">
              <iframe
                title="Sowparnika Travels office location"
                src={SITE.mapsEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function InfoRow({
  icon: Icon, title, value, link,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  link?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-4 hover:border-[color:var(--brand-blue)] hover:shadow-sm transition h-full">
      <div className="h-11 w-11 rounded-xl bg-[color:var(--brand-navy)] text-white grid place-items-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="font-semibold text-[color:var(--brand-navy)] mt-0.5 text-sm leading-snug">{value}</div>
      </div>
    </div>
  );
  return link ? (
    <a href={link} target={link.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
      {inner}
    </a>
  ) : inner;
}

function QuickAction({
  icon: Icon, label, sub, href, tone, external, onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  href?: string;
  tone: "navy" | "blue" | "whatsapp" | "gold";
  external?: boolean;
  onClick?: () => void;
}) {
  const toneCls: Record<string, string> = {
    navy: "bg-[color:var(--brand-navy)]",
    blue: "bg-[color:var(--brand-blue)]",
    whatsapp: "bg-[color:var(--whatsapp)]",
    gold: "bg-[color:var(--brand-gold)]",
  };
  const body = (
    <div className="group rounded-2xl border border-border bg-white p-5 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-0.5 transition h-full">
      <div className={`h-12 w-12 rounded-full grid place-items-center text-white ${toneCls[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-3 font-semibold text-[color:var(--brand-navy)] text-sm">{label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
  if (onClick) return <button type="button" onClick={onClick} className="text-left">{body}</button>;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >{body}</a>
  );
}

function Social({ icon: Icon, href, label, tone }: {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
  tone?: "whatsapp";
}) {
  const cls = tone === "whatsapp"
    ? "bg-[color:var(--whatsapp)] text-white"
    : "bg-secondary text-[color:var(--brand-navy)] hover:bg-[color:var(--brand-navy)] hover:text-white";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`h-11 w-11 rounded-full grid place-items-center transition ${cls}`}
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

function CallbackAction() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <QuickAction icon={PhoneCall} label="Request a Callback" sub="We'll call you back" tone="gold" onClick={() => setOpen(true)} />
      {open && <CallbackDialog onClose={() => setOpen(false)} />}
    </>
  );
}

function CallbackDialog({ onClose }: { onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", preferred_time: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please enter your name and phone");
      return;
    }
    setSubmitting(true);
    const reference = "CB-" + Math.random().toString(36).slice(2, 6).toUpperCase() + Date.now().toString(36).slice(-4).toUpperCase();
    const { error } = await supabase.from("enquiries").insert({
      reference,
      name: form.name.trim(),
      phone: form.phone.trim(),
      trip_type: "Callback Request",
      message: form.preferred_time ? `Preferred callback time: ${form.preferred_time}` : "Please call back at your earliest.",
    });
    setSubmitting(false);
    if (error) { toast.error("Could not submit. Please try again."); return; }
    toast.success("Thanks! We'll call you back shortly.");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-[color:var(--brand-navy)]">Request a Callback</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <Label htmlFor="cb-name">Full Name *</Label>
            <Input id="cb-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="cb-phone">Phone *</Label>
            <Input id="cb-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 …" required />
          </div>
          <div>
            <Label htmlFor="cb-time">Preferred Time</Label>
            <Input id="cb-time" value={form.preferred_time} onChange={(e) => setForm({ ...form, preferred_time: e.target.value })} placeholder="e.g. Today 5–6 PM" />
          </div>
          <Button type="submit" disabled={submitting} className="w-full bg-[color:var(--brand-navy)] hover:bg-[color:var(--brand-blue)]">
            {submitting ? "Submitting…" : "Request Callback"}
          </Button>
        </form>
      </div>
    </div>
  );
}
