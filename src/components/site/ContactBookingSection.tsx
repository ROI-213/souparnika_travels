import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2, Globe } from "lucide-react";
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
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#071525] via-[#0A1F38] to-[#071525] text-white" id="booking-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Info & Embedded Map */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3.5 py-1 rounded-full inline-block">
                GET IN TOUCH
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-3">
                Book Your Ride With Us
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                Have questions about vehicle availability, outstation permits, or custom group packages? Reach out to our 24/7 reservation desk.
              </p>
            </div>

            {/* Contact Details Cards - 2x2 Grid on Mobile */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-[#0D233F] p-3 sm:p-4 flex flex-col justify-between shadow-md hover:border-amber-400/50 hover:shadow-lg transition-all group"
              >
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-amber-400 text-slate-950 grid place-items-center shrink-0 mb-2 shadow-sm">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Office Address</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5 group-hover:text-amber-300 transition-colors leading-snug">
                    {SITE.address}
                  </div>
                </div>
              </a>

              <a
                href={telLink(SITE.phoneRaw)}
                className="rounded-2xl border border-white/10 bg-[#0D233F] p-3 sm:p-4 flex flex-col justify-between shadow-md hover:border-blue-400/50 transition-all group"
              >
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 grid place-items-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Primary / Enquiry</div>
                  <div className="text-xs sm:text-sm font-black text-white mt-0.5">{SITE.phone}</div>
                </div>
              </a>

              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-[#0D233F] p-3 sm:p-4 flex flex-col justify-between shadow-md hover:border-emerald-400/50 transition-all group"
              >
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 grid place-items-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors mb-2">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Chat</div>
                  <div className="text-xs sm:text-sm font-black text-emerald-400 mt-0.5">+91 90086 44559</div>
                </div>
              </a>

              <a
                href={telLink(SITE.altPhoneRaw)}
                className="rounded-2xl border border-white/10 bg-[#0D233F] p-3 sm:p-4 flex flex-col justify-between shadow-md hover:border-blue-400/50 transition-all group"
              >
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 grid place-items-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-2">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Alternate Contact</div>
                  <div className="text-xs sm:text-sm font-black text-white mt-0.5">{SITE.altPhone}</div>
                </div>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="rounded-2xl border border-white/10 bg-[#0D233F] p-3 sm:p-4 flex flex-col justify-between shadow-md hover:border-amber-400/50 transition-all group"
              >
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 grid place-items-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors mb-2">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Email Desk</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{SITE.email}</div>
                </div>
              </a>

              <a
                href={SITE.alternateWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-[#0D233F] p-3 sm:p-4 flex flex-col justify-between shadow-md hover:border-blue-400/50 transition-all group"
              >
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 grid place-items-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors mb-2">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Website</div>
                  <div className="text-xs sm:text-sm font-bold text-blue-300 mt-0.5 truncate">{SITE.alternateWebsite}</div>
                </div>
              </a>
            </div>

            {/* Responsive Google Map iframe */}
            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-sm h-56 bg-slate-900 relative">
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
