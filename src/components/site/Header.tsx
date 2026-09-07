import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ChevronDown,
  Compass,
  ArrowRight,
  Shield,
  Sparkles,
  Bus,
  MapPin,
  Car,
  Users,
  Search,
} from "lucide-react";
import { openEnquiryDialog } from "@/lib/enquiry-dialog";
import { useEffect, useState, useRef } from "react";
import {
  NAV_LINKS,
  SITE,
  SERVICE_ITEMS,
  FLEETS_DROPDOWN_ITEMS,
  telLink,
  waLink,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { DestinationsMegaMenu } from "@/components/site/DestinationsMegaMenu";
import { DEFAULT_PACKAGES } from "@/lib/data/packages";

const URBANIA_PREMIUM = [
  { label: "10 Seater Urbania", slug: "10-seater-urbania" },
  { label: "12 Seater Urbania", slug: "12-seater-urbania" },
  { label: "16 Seater Urbania", slug: "16-seater-urbania" },
  { label: "16 Seater Urbania Modified", slug: "16-seater-modified-urbania" },
];

const URBANIA_LUXURY = [
  { label: "9 Seater Urbania Maharaja", slug: "9-seater-luxury-urbania" },
  { label: "10 Seater Urbania Maharaja", slug: "10-seater-maharaja-urbania" },
  { label: "12 Seater Urbania Maharaja", slug: "12-seater-maharaja-urbania" },
];

const TEMPO_ITEMS = [
  { label: "12 Seater Tempo Traveller", slug: "12-seater-tempo-traveller" },
  { label: "9 Seater Tempo Traveller", slug: "9-seater-tempo-traveller" },
];

const COACHES_MINI = [
  { label: "18 Seater Mini Coach", slug: "18-seater-coach" },
  { label: "21 Seater Mini Coach", slug: "21-seater-coach" },
  { label: "25 Seater Coach", slug: "25-seater-coach" },
  { label: "30 Seater Coach", slug: "30-seater-coach" },
];

const COACHES_LUXURY = [
  { label: "35 Seater Luxury Coach", slug: "35-seater-coach" },
  { label: "40 Seater Bus Coach", slug: "40-seater-coach" },
  { label: "45 Seater Volvo Coach", slug: "45-seater-coach" },
  { label: "50 Seater Scania Coach", slug: "50-seater-coach" },
];

const DESTINATIONS_POPULAR = [
  { label: "Mysore Tour", slug: "mysore" },
  { label: "Kodaikanal Tour", slug: "kodaikanal" },
  { label: "Kerala Tour", slug: "kerala" },
  { label: "Hampi Tour", slug: "hampi" },
  { label: "Pondicherry Tour", slug: "pondicherry" },
  { label: "Ooty Tour", slug: "ooty" },
  { label: "Tirupati Tour", slug: "tirupati" },
  { label: "Coorg Tour", slug: "coorg" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveAccordion, setMobileActiveAccordion] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close dropdown on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    if (activeDropdown) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [activeDropdown]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (type: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveDropdown(type);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const isLinkActive = (to: string) => {
    if (to === "/" && pathname === "/") return true;
    if (to !== "/" && pathname.startsWith(to)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full pt-2 sm:pt-3 px-3 sm:px-5 lg:px-6 pointer-events-none transition-all duration-300">
      <div
        className={cn(
          "max-w-[1400px] mx-auto pointer-events-auto transition-all duration-300 ease-in-out",
          "rounded-2xl sm:rounded-full border",
          "flex items-center justify-between gap-2 lg:grid lg:grid-cols-[auto_1fr_auto] xl:gap-4 px-3 sm:px-5 lg:px-6",
          scrolled
            ? "bg-white/98 backdrop-blur-xl py-2 shadow-[0_14px_35px_rgba(15,23,42,0.14)] border-slate-300/90"
            : "bg-white/96 backdrop-blur-md py-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border-slate-200/80"
        )}
      >
        
        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 1. Left Area: Brand Logo & Title */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group py-1">
          <div className="h-9 w-9 rounded-xl bg-[#071525] text-amber-400 grid place-items-center shadow-md group-hover:scale-105 transition-all duration-300">
            <Compass className="h-5 w-5 stroke-[2]" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-extrabold text-[#071525] text-sm md:text-base tracking-tight uppercase flex items-center gap-1">
              <span className="truncate">SOUPARNIKA TRAVELS</span>
              <span className="text-[8px] md:text-[9px] font-black tracking-normal text-amber-700 bg-amber-100/90 px-1 py-0.5 rounded border border-amber-300/60 shrink-0">
                PRO
              </span>
            </div>
            <div className="text-[8px] md:text-[9px] font-extrabold tracking-[0.18em] text-[#155EEF] uppercase">
              JOURNEYS UNFOLD
            </div>
          </div>
        </Link>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 2. Center Area: Desktop Dynamic Navigation */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <nav className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1" ref={dropdownRef}>
          {NAV_LINKS.map((link) => {
            const dropdownType = (link as { dropdownType?: string }).dropdownType;
            const active = isLinkActive(link.to);

            /* ── URBANIA: Simple single-column dropdown ── */
            if (dropdownType === "urbania") {
              const isOpen = activeDropdown === "urbania";
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("urbania")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls="urbania-dropdown"
                    onClick={() => setActiveDropdown(isOpen ? null : "urbania")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveDropdown(isOpen ? null : "urbania");
                      }
                    }}
                    className={cn(
                      "inline-flex items-center gap-0.5 px-2 py-1.5 text-[13px] font-bold rounded-lg transition-all duration-200 hover:bg-slate-100 text-slate-700 hover:text-[#071525] whitespace-nowrap",
                      (isOpen || active) && "bg-[#071525]/10 text-[#071525] font-black"
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 text-slate-500",
                        isOpen && "rotate-180 text-[#071525]"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id="urbania-dropdown"
                      role="menu"
                      style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, width: 295, zIndex: 9999 }}
                      className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-200/80 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      {/* Premium Urbania heading */}
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#071525]">
                          Premium Urbania
                        </span>
                      </div>
                      <div className="py-1">
                        {URBANIA_PREMIUM.map((item) => (
                          <Link
                            key={item.slug}
                            role="menuitem"
                            to="/fleets/$slug"
                            params={{ slug: item.slug }}
                            onClick={() => setActiveDropdown(null)}
                            className="block text-[14px] font-semibold text-slate-700 no-underline transition-all duration-150 hover:bg-slate-50 hover:text-[#155EEF] px-5 py-3 hover:pl-7 min-h-[42px] flex items-center"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      {/* Luxury Urbania heading */}
                      <div className="bg-slate-50 px-4 py-3 border-t border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#071525]">
                          Luxury Urbania
                        </span>
                      </div>
                      <div className="py-1">
                        {URBANIA_LUXURY.map((item) => (
                          <Link
                            key={item.slug}
                            role="menuitem"
                            to="/fleets/$slug"
                            params={{ slug: item.slug }}
                            onClick={() => setActiveDropdown(null)}
                            className="block text-[14px] font-semibold text-slate-700 no-underline transition-all duration-150 hover:bg-slate-50 hover:text-[#155EEF] px-5 py-3 hover:pl-7 min-h-[42px] flex items-center"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            /* ── TEMPO TRAVELLER Dropdown ── */
            if (dropdownType === "tempo") {
              const isOpen = activeDropdown === "tempo";
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("tempo")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls="tempo-dropdown"
                    onClick={() => setActiveDropdown(isOpen ? null : "tempo")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveDropdown(isOpen ? null : "tempo");
                      }
                    }}
                    className={cn(
                      "inline-flex items-center gap-0.5 px-2 py-1.5 text-[13px] font-bold rounded-lg transition-all duration-200 hover:bg-slate-100 text-slate-700 hover:text-[#071525] whitespace-nowrap",
                      (isOpen || active) && "bg-[#071525]/10 text-[#071525] font-black"
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 text-slate-500",
                        isOpen && "rotate-180 text-[#071525]"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id="tempo-dropdown"
                      role="menu"
                      style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, width: 295, zIndex: 9999 }}
                      className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-200/80 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#071525]">
                          Tempo Traveller Options
                        </span>
                      </div>
                      <div className="py-1">
                        {TEMPO_ITEMS.map((item) => (
                          <Link
                            key={item.slug}
                            role="menuitem"
                            to="/fleets/$slug"
                            params={{ slug: item.slug }}
                            onClick={() => setActiveDropdown(null)}
                            className="block text-[14px] font-semibold text-slate-700 no-underline transition-all duration-150 hover:bg-slate-50 hover:text-[#155EEF] px-5 py-3 hover:pl-7 min-h-[42px] flex items-center"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            /* ── FLEETS Dropdown ── */
            if (dropdownType === "fleets") {
              const isOpen = activeDropdown === "fleets";
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("fleets")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls="fleets-dropdown"
                    onClick={() => setActiveDropdown(isOpen ? null : "fleets")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveDropdown(isOpen ? null : "fleets");
                      }
                    }}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-1.5 text-[13px] font-bold rounded-lg transition-all duration-200 hover:bg-slate-100 text-slate-700 hover:text-[#071525] whitespace-nowrap cursor-pointer",
                      (isOpen || active) && "bg-[#071525]/10 text-[#071525] font-black"
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 text-slate-500",
                        isOpen && "rotate-180 text-[#071525]"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id="fleets-dropdown"
                      role="menu"
                      style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, width: 310, zIndex: 9999 }}
                      className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-200/80 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#071525]">
                          Select Vehicle Fleet
                        </span>
                        <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300/50">
                          {FLEETS_DROPDOWN_ITEMS.length} Models
                        </span>
                      </div>
                      <div className="py-1.5">
                        {FLEETS_DROPDOWN_ITEMS.map((item) => {
                          const isCurrentPage = pathname === `/fleets/${item.slug}`;
                          return (
                            <Link
                              key={item.slug}
                              role="menuitem"
                              to="/fleets/$slug"
                              params={{ slug: item.slug }}
                              onClick={() => {
                                setActiveDropdown(null);
                                window.scrollTo(0, 0);
                              }}
                              className={cn(
                                "group block text-[14px] font-bold text-slate-800 no-underline transition-all duration-150 hover:bg-slate-50 hover:text-[#155EEF] px-5 py-3 min-h-[44px] border-b border-slate-50 last:border-0",
                                isCurrentPage && "bg-amber-500/10 text-[#155EEF] font-black border-l-4 border-l-[#155EEF]"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <span>{item.label}</span>
                                <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#155EEF]" />
                              </div>
                              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{item.desc}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }


            /* ── SERVICES Mega Menu ── */
            if (dropdownType === "services") {
              const isOpen = activeDropdown === "services";
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("services")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/services"
                    className={cn(
                      "inline-flex items-center gap-0.5 px-2 py-1.5 text-[13px] font-bold rounded-lg transition-all duration-200 hover:bg-slate-100 text-slate-700 hover:text-[#071525] whitespace-nowrap",
                      (isOpen || active) && "bg-[#071525]/10 text-[#071525] font-black"
                    )}
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 text-slate-500",
                        isOpen && "rotate-180 text-[#071525]"
                      )}
                    />
                  </Link>

                  {isOpen && (
                    <div
                      id="services-dropdown"
                      role="menu"
                      style={{ position: "absolute", top: "calc(100% + 6px)", left: "-150px", width: 680, zIndex: 9999 }}
                      className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-200/80 p-5 grid grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      <div>
                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2 px-2 flex items-center gap-1.5">
                          <Car className="h-3.5 w-3.5 text-[#155EEF]" />
                          Rental Services
                        </div>
                        <div className="space-y-0.5">
                          {[
                            { label: "Local City Rental", slug: "local-city-rental", desc: "Hourly & full-day packages within Bangalore" },
                            { label: "Outstation Trips", slug: "outstation-trips", desc: "Flexible South India holiday road trips" },
                            { label: "Airport Transfer", slug: "airport-transfer", desc: "24/7 transfers to Kempegowda Airport" },
                          ].map((item) => (
                            <Link
                              key={item.slug}
                              to="/services/$slug"
                              params={{ slug: item.slug }}
                              onClick={() => setActiveDropdown(null)}
                              className="block p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                            >
                              <div className="text-xs font-bold text-slate-900 group-hover:text-[#155EEF]">
                                {item.label}
                              </div>
                              <div className="text-[10px] text-slate-500 line-clamp-1">
                                {item.desc}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2 px-2 flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-amber-500" />
                          Group Travel
                        </div>
                        <div className="space-y-0.5">
                          {[
                            { label: "Corporate Travel", slug: "corporate-travel", desc: "Employee commute & delegate transport" },
                            { label: "Wedding Transportation", slug: "wedding-transportation", desc: "Guest shuttles & VIP luxury support" },
                            { label: "Family & Group Tours", slug: "family-group-tours", desc: "Comfortable holiday packages for groups" },
                          ].map((item) => (
                            <Link
                              key={item.slug}
                              to="/services/$slug"
                              params={{ slug: item.slug }}
                              onClick={() => setActiveDropdown(null)}
                              className="block p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                            >
                              <div className="text-xs font-bold text-slate-900 group-hover:text-[#155EEF]">
                                {item.label}
                              </div>
                              <div className="text-[10px] text-slate-500 line-clamp-1">
                                {item.desc}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-extrabold text-[#071525] mb-1 flex items-center gap-1">
                            <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
                            Luxury Fleet Support
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                            Need custom itineraries, VIP multi-vehicle fleets, or corporate delegate plans?
                          </p>
                          <Link
                            to="/services/$slug"
                            params={{ slug: "luxury-fleet-support" }}
                            onClick={() => setActiveDropdown(null)}
                            className="text-[11px] font-bold text-[#155EEF] hover:underline"
                          >
                            Explore Luxury Support →
                          </Link>
                        </div>
                        <Link
                          to="/services"
                          hash="custom-trip-planner"
                          onClick={() => setActiveDropdown(null)}
                          className="mt-3 w-full py-2 px-3 rounded-lg bg-[#071525] text-white text-xs font-bold hover:bg-[#155EEF] transition-colors text-center inline-flex items-center justify-center gap-1"
                        >
                          Custom Quote <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            /* ── DESTINATIONS Dropdown ── */
            if (dropdownType === "destinations") {
              const isOpen = activeDropdown === "destinations";
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("destinations")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/packages"
                    onMouseEnter={() => handleMouseEnter("destinations")}
                    onClick={() => setActiveDropdown(null)}
                    className={cn(
                      "inline-flex items-center gap-0.5 px-2 py-1.5 text-[13px] font-bold rounded-lg transition-all duration-200 hover:bg-slate-100 text-slate-700 hover:text-[#071525] whitespace-nowrap",
                      (isOpen || active) && "bg-[#071525]/10 text-[#071525] font-black"
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 text-slate-500",
                        isOpen && "rotate-180 text-[#071525]"
                      )}
                    />
                  </Link>

                  {isOpen && <DestinationsMegaMenu onClose={() => setActiveDropdown(null)} />}
                </div>
              );
            }

            /* Regular Navigation Links */
            return (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "px-2 py-1.5 text-[13px] font-bold rounded-lg transition-all duration-200 hover:bg-slate-100 text-slate-700 hover:text-[#071525] whitespace-nowrap",
                  active && "bg-[#071525]/10 text-[#071525] font-black shadow-2xs"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* 3. Right Area: Call + Menu (mobile) / Phone CTA + Menu (desktop) */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
          
          {/* Mobile + Tablet: Call + Menu shortcut buttons */}
          <div className="flex lg:hidden items-center gap-1.5">
            <a
              href={telLink()}
              className="h-9 w-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 grid place-items-center"
              title="Call Us"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="h-9 w-9 rounded-xl border border-slate-200 bg-slate-100 grid place-items-center"
            >
              {mobileOpen ? <X className="h-5 w-5 text-slate-900" /> : <Menu className="h-5 w-5 text-slate-900" />}
            </button>
          </div>

          {/* Desktop: Call Now Button */}
          <a
            href={telLink()}
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#071525] text-white font-bold text-sm hover:bg-[#155EEF] transition-colors shrink-0"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>


      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* MOBILE DRAWER NAVIGATION */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-white z-50 pointer-events-auto flex flex-col border-t border-slate-200 overflow-y-auto animate-in slide-in-from-top-2">
          <div className="p-4 space-y-2 flex-1">
            {NAV_LINKS.map((link) => {
              const dropdownType = (link as { dropdownType?: string }).dropdownType;
              if (dropdownType) {
                const isAccordionOpen = mobileActiveAccordion === dropdownType;
                return (
                  <div key={link.label} className="border-b border-slate-100 pb-2">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileActiveAccordion(isAccordionOpen ? null : dropdownType)
                      }
                      className="w-full flex items-center justify-between text-base font-extrabold py-3 px-3 rounded-xl hover:bg-slate-100 text-slate-900 text-left"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform text-slate-400",
                          isAccordionOpen && "rotate-180 text-slate-900"
                        )}
                      />
                    </button>

                    {isAccordionOpen && (
                      <div className="pl-3 pr-2 py-2 space-y-1 bg-slate-50 rounded-xl mt-1 max-h-72 overflow-y-auto border border-slate-100">

                        {/* Urbania Accordion */}
                        {dropdownType === "urbania" && (
                          <>
                            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 px-3 pt-2 pb-1">
                              Premium Urbania
                            </div>
                            {URBANIA_PREMIUM.map((u) => (
                              <Link
                                key={u.slug}
                                to="/fleets/$slug"
                                params={{ slug: u.slug }}
                                onClick={() => setMobileOpen(false)}
                                className="block text-sm font-semibold py-2.5 px-4 rounded-lg text-slate-800 hover:bg-white min-h-[44px] flex items-center"
                              >
                                {u.label}
                              </Link>
                            ))}
                            <div className="border-t border-slate-200 mt-1 pt-1" />
                            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 px-3 pt-2 pb-1">
                              Luxury Urbania
                            </div>
                            {URBANIA_LUXURY.map((u) => (
                              <Link
                                key={u.slug}
                                to="/fleets/$slug"
                                params={{ slug: u.slug }}
                                onClick={() => setMobileOpen(false)}
                                className="block text-sm font-semibold py-2.5 px-4 rounded-lg text-slate-800 hover:bg-white min-h-[44px] flex items-center"
                              >
                                {u.label}
                              </Link>
                            ))}
                          </>
                        )}

                        {/* Tempo Traveller Accordion */}
                        {dropdownType === "tempo" && (
                          <>
                            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 px-3 pt-2 pb-1">
                              Tempo Traveller Options
                            </div>
                            {TEMPO_ITEMS.map((t) => (
                              <Link
                                key={t.slug}
                                to="/fleets/$slug"
                                params={{ slug: t.slug }}
                                onClick={() => setMobileOpen(false)}
                                className="block text-sm font-semibold py-2.5 px-4 rounded-lg text-slate-800 hover:bg-white min-h-[44px] flex items-center"
                              >
                                {t.label}
                              </Link>
                            ))}
                          </>
                        )}

                        {/* Fleets Accordion */}
                        {dropdownType === "fleets" && (
                          <>
                            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 px-3 pt-2 pb-1">
                              Select Vehicle Fleet
                            </div>
                            {FLEETS_DROPDOWN_ITEMS.map((item) => (
                              <Link
                                key={item.slug}
                                to="/fleets/$slug"
                                params={{ slug: item.slug }}
                                onClick={() => setMobileOpen(false)}
                                className="block text-sm font-semibold py-2.5 px-4 rounded-lg text-slate-800 hover:bg-white min-h-[44px] flex items-center"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </>
                        )}

                        {/* Services Accordion */}
                        {dropdownType === "services" && (
                          <>
                            <Link
                              to="/services"
                              onClick={() => setMobileOpen(false)}
                              className="block text-sm font-extrabold py-2.5 px-4 rounded-lg bg-slate-100 text-[#071525] min-h-[44px] flex items-center gap-2 mb-1"
                            >
                              <span>View All Services</span>
                              <ArrowRight className="h-4 w-4 text-[#155EEF]" />
                            </Link>
                            {[
                              { label: "Local City Rental", slug: "local-city-rental" },
                              { label: "Outstation Trips", slug: "outstation-trips" },
                              { label: "Airport Transfer", slug: "airport-transfer" },
                              { label: "Corporate Travel", slug: "corporate-travel" },
                              { label: "Wedding Transportation", slug: "wedding-transportation" },
                              { label: "Family & Group Tours", slug: "family-group-tours" },
                              { label: "Luxury Fleet Support", slug: "luxury-fleet-support" },
                            ].map((s) => (
                              <Link
                                key={s.slug}
                                to="/services/$slug"
                                params={{ slug: s.slug }}
                                onClick={() => setMobileOpen(false)}
                                className="block text-sm font-semibold py-2.5 px-4 rounded-lg text-slate-800 hover:bg-white min-h-[44px] flex items-center"
                              >
                                {s.label}
                              </Link>
                            ))}
                          </>
                        )}

                        {/* Destinations Accordion */}
                        {dropdownType === "destinations" && (
                          <>
                            <Link
                              to="/packages"
                              onClick={() => setMobileOpen(false)}
                              className="block text-sm font-extrabold py-2.5 px-4 rounded-lg bg-slate-100 text-[#071525] min-h-[44px] flex items-center gap-2 mb-1"
                            >
                              <span>View All Travel Packages</span>
                              <ArrowRight className="h-4 w-4 text-[#155EEF]" />
                            </Link>

                            {DEFAULT_PACKAGES.map((pkg) => (
                              <Link
                                key={pkg.slug}
                                to="/packages/$slug"
                                params={{ slug: pkg.slug }}
                                onClick={() => setMobileOpen(false)}
                                className="block text-sm font-semibold py-2.5 px-4 rounded-lg text-slate-800 hover:bg-white min-h-[44px] flex items-center justify-between"
                              >
                                <span className="truncate">{pkg.title}</span>
                                <span className="text-[10px] text-[#155EEF] font-bold shrink-0 ml-2">{pkg.duration}</span>
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-extrabold py-3 px-3 rounded-xl hover:bg-slate-100 text-slate-900 border-b border-slate-100"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Drawer Bottom Action CTAs */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2.5">
            <a
              href={telLink()}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#071525] text-white font-extrabold text-sm shadow-md"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>

            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#22C55E] text-white font-extrabold text-sm shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Booking</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
