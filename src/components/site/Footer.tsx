import { Link } from "@tanstack/react-router";
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Globe,
} from "lucide-react";
import { SITE, telLink, waLink } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0e1726] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Logo & Brand Description */}
          <div className="md:col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] grid place-items-center font-bold">
                <Compass className="h-6 w-6" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-extrabold text-white text-lg tracking-tight uppercase">
                  Souparnika
                </div>
                <div className="text-[10px] font-bold tracking-[0.25em] text-[color:var(--brand-gold)] uppercase">
                  Travels
                </div>
              </div>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed">
              Bengaluru's trusted vehicle rental platform. Specialized in clean, luxury, and reliable vehicles for local travel, airport transfers, corporate tours, and South India outstation journeys.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-white/80 hover:bg-[color:var(--brand-gold)] hover:text-[color:var(--brand-navy)] transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-white/80 hover:bg-[color:var(--brand-gold)] hover:text-[color:var(--brand-navy)] transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-white/80 hover:bg-[color:var(--brand-gold)] hover:text-[color:var(--brand-navy)] transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-white/80 hover:bg-[color:var(--brand-gold)] hover:text-[color:var(--brand-navy)] transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Side-by-side on Mobile: Our Services & Quick Links */}
          <div className="grid grid-cols-2 gap-6 md:contents">
            {/* Column 2: Our Services */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[color:var(--brand-gold)]">
                Our Services
              </h3>
              <ul className="space-y-2.5 text-xs text-white/75">
                <li>
                  <Link to="/fleets" search={{ category: "Sedan" }} className="hover:text-white transition-colors">
                    Car Rentals (Sedan / SUV)
                  </Link>
                </li>
                <li>
                  <Link to="/fleets" search={{ category: "Urbania" }} className="hover:text-white transition-colors">
                    Force Urbania Luxury Rental
                  </Link>
                </li>
                <li>
                  <Link to="/fleets" search={{ category: "Tempo Traveller" }} className="hover:text-white transition-colors">
                    Tempo Traveller Rental
                  </Link>
                </li>
                <li>
                  <Link to="/fleets" search={{ category: "Mini Bus" }} className="hover:text-white transition-colors">
                    Mini Bus Rental (21-32 Seats)
                  </Link>
                </li>
                <li>
                  <Link to="/fleets" search={{ category: "Coach" }} className="hover:text-white transition-colors">
                    Luxury Coach Rental (50 Seats)
                  </Link>
                </li>
                <li>
                  <Link to="/experiences" className="hover:text-white transition-colors">
                    24/7 Airport Transfer
                  </Link>
                </li>
                <li>
                  <Link to="/experiences" className="hover:text-white transition-colors">
                    Corporate Executive Travel
                  </Link>
                </li>
                <li>
                  <Link to="/packages" className="hover:text-white transition-colors">
                    Curated Tour Packages
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[color:var(--brand-gold)]">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-xs text-white/75">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/fleets" className="hover:text-white transition-colors">
                    All Vehicles & Fleets
                  </Link>
                </li>
                <li>
                  <Link to="/packages" className="hover:text-white transition-colors">
                    South India Tour Packages
                  </Link>
                </li>
                <li>
                  <Link to="/experiences" className="hover:text-white transition-colors">
                    Rental Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Policies */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[color:var(--brand-gold)]">
              Policies
            </h3>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="hover:text-white transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/travel-info" className="hover:text-white transition-colors">
                  Vehicle Breakdown Policy
                </Link>
              </li>
              <li>
                <Link to="/travel-info" className="hover:text-white transition-colors">
                  Booking Guidelines & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[color:var(--brand-gold)]">
              Contact Support
            </h3>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[color:var(--brand-gold)] shrink-0 mt-0.5" />
                <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="hover:underline hover:text-amber-300">
                  {SITE.address}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[color:var(--brand-gold)] shrink-0" />
                <div className="flex flex-col">
                  <a href={telLink(SITE.phoneRaw)} className="hover:underline font-bold text-white">
                    {SITE.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-[color:var(--whatsapp)] shrink-0" />
                <a href={waLink()} target="_blank" rel="noreferrer" className="hover:underline font-bold text-[color:var(--whatsapp)]">
                  WhatsApp: +91 90086 44559
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[color:var(--brand-gold)]/70 shrink-0" />
                <div className="flex flex-wrap gap-x-2 text-[11px]">
                  <a href={telLink(SITE.altPhoneRaw)} className="hover:underline text-white/90">
                    {SITE.altPhone}
                  </a>
                  <span>•</span>
                  <a href={telLink(SITE.supportPhoneRaw)} className="hover:underline text-white/90">
                    {SITE.supportPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[color:var(--brand-gold)] shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:underline font-medium">
                  {SITE.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-[color:var(--brand-gold)] shrink-0" />
                <a href={SITE.alternateWebsiteUrl} target="_blank" rel="noreferrer" className="hover:underline font-medium text-amber-300">
                  {SITE.alternateWebsite}
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="h-4 w-4 text-[color:var(--brand-gold)] shrink-0" />
                <span>{SITE.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div>
            © {currentYear} {SITE.name}. All rights reserved. Premium Vehicle Rental Services in Bangalore.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
