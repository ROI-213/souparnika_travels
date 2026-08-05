import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2 } from "lucide-react";
import { SITE, telLink, waLink } from "@/lib/site-config";
import { EnquiryForm } from "./EnquiryForm";

export function ContactBookingSection({
  selectedVehicle,
  onSelectVehicle,
}: {
  selectedVehicle?: string;
  onSelectVehicle?: (vehicleName: string) => void;
}) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#f8fafc] to-white" id="booking-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Info & Embedded Map */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[color:var(--brand-blue)] bg-[color:var(--brand-blue)]/10 px-3.5 py-1 rounded-full">
                GET IN TOUCH
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[color:var(--brand-navy)] mt-3">
                Book Your Ride With Us
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 leading-relaxed">
                Have questions about vehicle availability, outstation permits, or custom group packages? Reach out to our 24/7 reservation desk.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-white p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-[color:var(--brand-navy)] text-[color:var(--brand-gold)] grid place-items-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Office Address</div>
                  <div className="text-sm font-bold text-[color:var(--brand-navy)] mt-0.5">{SITE.address}</div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href={telLink()}
                  className="rounded-2xl border border-border bg-white p-4 flex items-center gap-3.5 shadow-sm hover:border-[color:var(--brand-blue)] transition-colors group"
                >
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-[color:var(--brand-blue)] grid place-items-center shrink-0 group-hover:bg-[color:var(--brand-blue)] group-hover:text-white transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-muted-foreground uppercase">Phone Call</div>
                    <div className="text-xs font-bold text-foreground">{SITE.phone}</div>
                  </div>
                </a>

                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-border bg-white p-4 flex items-center gap-3.5 shadow-sm hover:border-[color:var(--whatsapp)] transition-colors group"
                >
                  <div className="h-10 w-10 rounded-xl bg-green-50 text-[color:var(--whatsapp)] grid place-items-center shrink-0 group-hover:bg-[color:var(--whatsapp)] group-hover:text-white transition-colors">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-muted-foreground uppercase">WhatsApp</div>
                    <div className="text-xs font-bold text-[color:var(--whatsapp)]">Instant Chat</div>
                  </div>
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-white p-4 flex items-center gap-3.5 shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 grid place-items-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-muted-foreground uppercase">Email Support</div>
                    <div className="text-xs font-bold text-foreground line-clamp-1">{SITE.email}</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-white p-4 flex items-center gap-3.5 shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 grid place-items-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-muted-foreground uppercase">Service Hours</div>
                    <div className="text-xs font-bold text-foreground">{SITE.hours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Us Bullet Checklist */}
            <div className="rounded-2xl border border-border bg-secondary/40 p-5 space-y-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[color:var(--brand-navy)]">
                Why Book With Souparnika Travels?
              </div>
              <div className="grid sm:grid-cols-2 gap-2 text-xs text-foreground/80 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span>Instant Transparent Quotes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span>Clean & Sanitized Vehicles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span>Verified Highway Chauffeurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span>24/7 On-Trip Assistance</span>
                </div>
              </div>
            </div>

            {/* Responsive Google Map iframe */}
            <div className="rounded-2xl border border-border overflow-hidden shadow-sm h-56 bg-secondary relative">
              <iframe
                title="Souparnika Travels Office Location Rajajinagar Bengaluru"
                src={SITE.mapsEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7">
            <EnquiryForm
              selectedVehicle={selectedVehicle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
