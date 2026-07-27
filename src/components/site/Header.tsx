import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ArrowRight, Compass, X, Phone, MessageCircle, Send } from "lucide-react";
import { openEnquiryDialog } from "@/lib/enquiry-dialog";
import { useEffect, useState } from "react";
import { NAV_LINKS, telLink, waLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Main nav */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-[#f7f3ea] py-4"
        )}
      >
        <div 
          className={cn(
            "mx-auto flex items-center justify-between transition-all duration-300",
            scrolled 
              ? "w-full px-4 sm:px-6 py-2 sm:py-3" 
              : "w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl mt-4 px-4 sm:px-6 py-3 sm:py-4 bg-white rounded-full shadow-sm"
          )}
        >
        {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2 lg:gap-3 shrink-0">
            <Compass className="h-10 w-10 md:h-12 md:w-12 text-[#c9922e] stroke-[1.5]" />
            <div className="leading-tight">
              <div className="font-[Cormorant_Garamond,Playfair_Display,serif] font-bold text-[#243321] text-lg lg:text-xl tracking-tight uppercase">
                Souparnika
              </div>
              <div className="text-[9px] font-semibold tracking-[0.25em] text-[#c9922e] uppercase mt-0.5">
                Travels
              </div>
            </div>
          </Link>

          {/* Center: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-[14px] font-medium text-[#171914] hover:text-[#243321] transition-colors py-1 relative group"
                activeProps={{
                  className: "text-[#243321] font-semibold",
                }}
              >
                {link.label}
                {link.label === "Destinations" && (
                  <span className="ml-1 text-[10px] opacity-70">▼</span>
                )}
                <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#c9922e] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-3 lg:gap-4">
            <button
              onClick={() => openEnquiryDialog({ source: "header" })}
              className="hidden sm:flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[#243321] text-white hover:bg-[#182417] transition-all group shadow-sm"
            >
              <span className="text-[13px] font-medium tracking-wide">Plan My Trip</span>
              <span className="h-7 w-7 rounded-full bg-[#c9922e] grid place-items-center text-[#243321] group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden h-10 w-10 rounded-full border border-black/10 bg-white/60 backdrop-blur grid place-items-center hover:bg-white transition-colors shadow-sm"
            >
              {open ? <X className="h-5 w-5 text-[#171914]" /> : <Menu className="h-5 w-5 text-[#171914]" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl z-40 flex flex-col border-t border-black/5">
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-base py-3 px-3 rounded-lg font-medium hover:bg-secondary text-[#171914]"
                  activeProps={{ className: "bg-secondary text-[#c9922e]" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <a
                  href={telLink()}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-lg border border-border font-semibold text-[#171914]"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[color:var(--whatsapp)] text-white font-semibold"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
              <button
                type="button"
                onClick={() => { setOpen(false); openEnquiryDialog({ source: "header_mobile" }); }}
                className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#243321] text-white font-bold"
              >
                <Send className="h-4 w-4" /> Enquire Now
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
