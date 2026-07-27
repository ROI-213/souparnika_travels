import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone, Send } from "lucide-react";
import { SITE, telLink, waLink } from "@/lib/site-config";
import { openEnquiryDialog } from "@/lib/enquiry-dialog";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 400);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      {/* Desktop / tablet floating stack */}
      <div className="floating-contact-actions hidden md:flex flex-col gap-3">
        <a
          href={telLink()}
          aria-label={`Call ${SITE.phone}`}
          className="h-12 w-12 grid place-items-center rounded-full bg-[color:var(--brand-navy)] text-white shadow-lg hover:scale-105 transition-transform"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="h-14 w-14 grid place-items-center rounded-full bg-[color:var(--whatsapp)] text-white shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={cn(
            "h-11 w-11 grid place-items-center rounded-full bg-white border border-border text-[color:var(--brand-navy)] shadow-md transition-all",
            showTop ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-2",
          )}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile bottom action bar */}
      <div
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border shadow-[0_-8px_24px_-16px_rgba(11,35,65,0.35)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-3">
          <a
            href={telLink()}
            className="flex flex-col items-center justify-center py-2.5 gap-1 text-[11px] font-semibold text-[color:var(--brand-navy)] active:bg-secondary"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center py-2.5 gap-1 text-[11px] font-semibold text-white bg-[color:var(--whatsapp)]"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button
            type="button"
            onClick={() => openEnquiryDialog({ source: "mobile_bottom_bar" })}
            className="flex flex-col items-center justify-center py-2.5 gap-1 text-[11px] font-bold bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)]"
          >
            <Send className="h-4 w-4" /> Enquire
          </button>
        </div>
      </div>

      {/* Spacer so content is not hidden by mobile bar */}
      <div className="md:hidden h-16" aria-hidden />
    </>
  );
}
