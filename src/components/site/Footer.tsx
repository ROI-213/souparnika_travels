import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Youtube, Clock } from "lucide-react";
import { SITE, telLink, waLink } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[color:var(--brand-navy)] text-white/90 mt-20">
      <div className="max-w-7xl mx-auto container-p py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Company Information */}
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Sowparnika Travels"
              className="h-12 w-12 object-contain"
            />
            <div>
              <div className="font-display font-extrabold text-white text-lg">Souparnika Travels</div>
              <div className="text-[10px] tracking-[0.2em] text-white/60 uppercase">Bengaluru · South India</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            {SITE.description}
          </p>
          <div className="mt-5 flex items-start gap-2.5 text-sm text-white/80">
            <MapPin className="h-4 w-4 mt-0.5 text-[color:var(--brand-gold)] shrink-0" />
            <span>{SITE.address}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Facebook className="h-4 w-4" /></a>
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Instagram className="h-4 w-4" /></a>
            <a href={SITE.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Youtube className="h-4 w-4" /></a>
            <a href={SITE.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><Linkedin className="h-4 w-4" /></a>
            <a href={waLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="p-2 rounded-lg bg-white/10 hover:bg-white/20"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>

        {/* Quick Links + Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:col-span-1 lg:col-span-2">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-[color:var(--brand-gold)]">Home</Link></li>
              <li><Link to="/about-us" className="hover:text-[color:var(--brand-gold)]">About Us</Link></li>
              <li><Link to="/fleets" className="hover:text-[color:var(--brand-gold)]">Fleets</Link></li>
              <li><Link to="/packages" className="hover:text-[color:var(--brand-gold)]">Packages</Link></li>
              <li><Link to="/testimonials" className="hover:text-[color:var(--brand-gold)]">Testimonials</Link></li>
              <li><Link to="/contact-us" className="hover:text-[color:var(--brand-gold)]">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/fleets" className="hover:text-[color:var(--brand-gold)]">Local Travel</Link></li>
              <li><Link to="/fleets" className="hover:text-[color:var(--brand-gold)]">Airport Transfer</Link></li>
              <li><Link to="/fleets" className="hover:text-[color:var(--brand-gold)]">Outstation Travel</Link></li>
              <li><Link to="/fleets" className="hover:text-[color:var(--brand-gold)]">Corporate Travel</Link></li>
              <li><Link to="/packages" className="hover:text-[color:var(--brand-gold)]">Tour Packages</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li><a href={telLink()} className="flex gap-3 hover:text-[color:var(--brand-gold)]"><Phone className="h-4 w-4 mt-0.5 text-[color:var(--brand-gold)] shrink-0" />{SITE.phone}</a></li>
            <li><a href={waLink()} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-[color:var(--brand-gold)]"><MessageCircle className="h-4 w-4 mt-0.5 text-[color:var(--brand-gold)] shrink-0" />WhatsApp Chat</a></li>
            <li><a href={`mailto:${SITE.email}`} className="flex gap-3 hover:text-[color:var(--brand-gold)]"><Mail className="h-4 w-4 mt-0.5 text-[color:var(--brand-gold)] shrink-0" />{SITE.email}</a></li>
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-[color:var(--brand-gold)] shrink-0" /><span>{SITE.address}</span></li>
            <li className="flex gap-3"><Clock className="h-4 w-4 mt-0.5 text-[color:var(--brand-gold)] shrink-0" /><span>{SITE.hours}</span></li>
          </ul>
        </div>
      </div>

      {/* Legal + copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto container-p py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-white/60">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-[color:var(--brand-gold)]">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-[color:var(--brand-gold)]">Terms and Conditions</Link>
            <Link to="/cancellation-policy" className="hover:text-[color:var(--brand-gold)]">Cancellation Policy</Link>
            <Link to="/refund-policy" className="hover:text-[color:var(--brand-gold)]">Refund Policy</Link>
          </div>
          <div>© {year} Sowparnika Travels. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
