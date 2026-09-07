import React from 'react';
import { Link } from '@tanstack/react-router';
import { Phone, MessageCircle, Mail, Sparkles, Clock, MapPin } from 'lucide-react';
import { SITE, telLink, waLink } from '@/lib/site-config';

export const ContactHero: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto container-p pt-3 sm:pt-5">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50 text-slate-900 py-6 sm:py-8 px-6 sm:px-10 rounded-[2rem] sm:rounded-[2.5rem] border border-blue-100 shadow-sm">
        {/* Soft Blue Radial Background Accents */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Top Breadcrumbs & Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <nav className="flex items-center gap-2 font-medium uppercase tracking-wider text-slate-500">
              <Link to="/" className="hover:text-[color:var(--brand-blue)] transition-colors">Home</Link>
              <span className="text-slate-300">/</span>
              <span className="text-[color:var(--brand-blue)] font-bold">Contact Us</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-[color:var(--brand-blue)] font-bold text-[11px] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>24×7 Customer Support</span>
            </div>
          </div>

          {/* Text Headline & Subtitle */}
          <div className="space-y-2 max-w-3xl">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[color:var(--brand-navy)] tracking-tight leading-tight">
              Get in Touch with Our Travel Desk
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              We're here 24×7 — reach out anytime for instant Force Urbania rentals, customized South India tour packages, outstation fares, or corporate mobility quotes.
            </p>
          </div>

          {/* Quick Action CTAs & Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80">
            <div className="flex flex-wrap gap-2.5">
              <a
                href={telLink(SITE.phoneRaw)}
                className="px-4 py-2 rounded-lg bg-[color:var(--brand-navy)] hover:bg-[#163a66] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call: {SITE.phone}</span>
              </a>

              <a
                href={waLink("Hi, I want to inquire about Force Urbania & Tour Package bookings.")}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                <span>WhatsApp Desk</span>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs uppercase tracking-wider border border-slate-300 transition-all flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-[color:var(--brand-blue)]" />
                <span>Email Support</span>
              </a>
            </div>

            <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[color:var(--brand-blue)]" /> 24/7 Availability
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[color:var(--brand-blue)]" /> Malleswaram, Bengaluru
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
