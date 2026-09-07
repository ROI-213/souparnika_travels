import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ContactHero } from "@/components/site/ContactHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE, telLink, waLink } from "@/lib/site-config";
import { submitEnquiry } from "@/lib/queries";
import { toast } from "sonner";
import {
  Clock, Mail, MapPin, MessageCircle, Phone, HeadphonesIcon, Globe,
  Facebook, Instagram, Youtube, Linkedin, PhoneCall, Navigation, X, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Souparnika Travels — 24×7 Booking & Support" },
      { name: "description", content: "Call, WhatsApp or email Souparnika Travels for bookings, quotes and support. Visit our Malleswaram Bengaluru office or send an enquiry online." },
      { property: "og:title", content: "Contact Souparnika Travels" },
      { property: "og:description", content: "We're here 24×7 for your travel needs." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <ContactHero />

      {/* Quick contact options - 2x2 Card Grid on Mobile */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white via-slate-50/80 to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto container-p grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <QuickAction
            icon={Phone}
            badge="Instant Hotline"
            label="Click to Call"
            sub={SITE.phone}
            actionText="Call Direct"
            href={telLink(SITE.phoneRaw)}
            tone="navy"
          />
          <QuickAction
            icon={MessageCircle}
            badge="24×7 Active Desk"
            label="WhatsApp Chat"
            sub="+91 90086 44559"
            actionText="Open WhatsApp"
            href={waLink()}
            tone="whatsapp"
            external
          />
          <QuickAction
            icon={Mail}
            badge="Fast Response"
            label="Email Support"
            sub={SITE.email}
            actionText="Send Email"
            href={`mailto:${SITE.email}`}
            tone="blue"
          />
          <CallbackAction />
        </div>
      </section>

      {/* Info + Form */}
      <section className="py-12 lg:py-20">
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
            
            {/* 2x2 Contact Info Grid on Mobile */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <InfoRow icon={MapPin} title="Office Address" value={SITE.address} link={SITE.mapsUrl} />
              <InfoRow icon={Phone} title="Primary Enquiry & WhatsApp" value={SITE.phone} link={telLink(SITE.phoneRaw)} />
              <InfoRow icon={MessageCircle} title="WhatsApp Desk" value="+91 90086 44559" link={waLink()} />
              <InfoRow icon={Phone} title="Secondary Phone" value={SITE.altPhone} link={telLink(SITE.altPhoneRaw)} />
              <InfoRow icon={HeadphonesIcon} title="Support Line" value={SITE.supportPhone} link={telLink(SITE.supportPhoneRaw)} />
              <InfoRow icon={Mail} title="Email" value={SITE.email} link={`mailto:${SITE.email}`} />
              <InfoRow icon={Globe} title="Alternate Website" value={SITE.alternateWebsite} link={SITE.alternateWebsiteUrl} />
              <InfoRow icon={Clock} title="Business Hours" value={SITE.hours} />
            </div>

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
                title="Souparnika Travels office location"
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
    <div className="flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4 rounded-2xl border border-border bg-white p-3.5 sm:p-4 hover:border-[color:var(--brand-blue)] hover:shadow-sm transition h-full justify-between">
      <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-xl bg-[color:var(--brand-navy)] text-white grid place-items-center shrink-0">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div className="min-w-0 w-full">
        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-bold">{title}</div>
        <div className="font-bold text-[color:var(--brand-navy)] mt-0.5 text-xs sm:text-sm leading-snug break-words">{value}</div>
      </div>
    </div>
  );
  return link ? (
    <a href={link} target={link.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block h-full">
      {inner}
    </a>
  ) : inner;
}

function QuickAction({
  icon: Icon, badge, label, sub, actionText, href, tone, external, onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  label: string;
  sub: string;
  actionText?: string;
  href?: string;
  tone: "navy" | "blue" | "whatsapp" | "gold";
  external?: boolean;
  onClick?: () => void;
}) {
  const toneStyles: Record<string, { cardBg: string; borderHover: string; iconBg: string; iconColor: string; badgeCls: string }> = {
    navy: {
      cardBg: "from-white via-slate-50 to-blue-50/30",
      borderHover: "hover:border-amber-400 hover:shadow-amber-500/10",
      iconBg: "bg-gradient-to-br from-[#0B2341] to-[#163a66]",
      iconColor: "text-amber-400",
      badgeCls: "bg-amber-100 text-amber-900 border-amber-200",
    },
    whatsapp: {
      cardBg: "from-white via-slate-50 to-emerald-50/30",
      borderHover: "hover:border-emerald-500 hover:shadow-emerald-500/10",
      iconBg: "bg-gradient-to-br from-emerald-600 to-emerald-700",
      iconColor: "text-white",
      badgeCls: "bg-emerald-100 text-emerald-900 border-emerald-200",
    },
    blue: {
      cardBg: "from-white via-slate-50 to-blue-50/30",
      borderHover: "hover:border-blue-500 hover:shadow-blue-500/10",
      iconBg: "bg-gradient-to-br from-blue-600 to-indigo-700",
      iconColor: "text-white",
      badgeCls: "bg-blue-100 text-blue-900 border-blue-200",
    },
    gold: {
      cardBg: "from-white via-slate-50 to-amber-50/30",
      borderHover: "hover:border-amber-500 hover:shadow-amber-500/10",
      iconBg: "bg-gradient-to-br from-amber-400 to-amber-500",
      iconColor: "text-slate-950",
      badgeCls: "bg-amber-100 text-amber-900 border-amber-200",
    },
  };

  const style = toneStyles[tone] || toneStyles.navy;

  const body = (
    <div className={`group relative rounded-3xl border border-slate-200/90 bg-gradient-to-b ${style.cardBg} p-3.5 sm:p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full ${style.borderHover} overflow-hidden`}>
      {/* Glow Accent Effect */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/10 to-amber-400/10 blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 mb-2.5 sm:mb-4">
        <div className={`h-9 w-9 sm:h-12 sm:w-12 rounded-2xl grid place-items-center shadow-md ${style.iconBg} ${style.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        {badge && (
          <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider border ${style.badgeCls}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-0.5 sm:space-y-1 mt-1">
        <h3 className="font-display font-extrabold text-slate-900 text-xs sm:text-base group-hover:text-[color:var(--brand-blue)] transition-colors leading-snug">
          {label}
        </h3>
        <p className="text-[10px] sm:text-xs text-slate-600 font-semibold truncate">
          {sub}
        </p>
      </div>

      {/* Bottom CTA Arrow */}
      <div className="mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-slate-200/60 flex items-center justify-between text-[10px] sm:text-xs font-bold text-[color:var(--brand-blue)]">
        <span className="truncate">{actionText || "Connect Now"}</span>
        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform shrink-0 ml-1" />
      </div>
    </div>
  );

  if (onClick) return <button type="button" onClick={onClick} className="text-left w-full h-full">{body}</button>;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="block h-full"
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
      <QuickAction
        icon={PhoneCall}
        badge="Free Callback"
        label="Request a Callback"
        sub="We'll call you back"
        actionText="Schedule Call"
        tone="gold"
        onClick={() => setOpen(true)}
      />
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
    try {
      await submitEnquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        trip_type: "Callback Request",
        notes: form.preferred_time ? `Preferred callback time: ${form.preferred_time}` : "Please call back at your earliest.",
        source: "contact_us_callback",
      });
      setSubmitting(false);
      toast.success("Thanks! We'll call you back shortly.");
      onClose();
    } catch (err) {
      setSubmitting(false);
      toast.error("Could not submit. Please try again.");
    }
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
