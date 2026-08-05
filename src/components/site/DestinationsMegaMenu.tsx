import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { packagesQuery, type TravelPackage } from "@/lib/queries";
import { openEnquiryDialog } from "@/lib/enquiry-dialog";
import {
  MapPin,
  Search,
  ArrowRight,
  Sparkles,
  Compass,
  Mountain,
  Sun,
  Crown,
  Palmtree,
  Landmark,
  Clock,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DestinationsMegaMenuProps {
  onClose: () => void;
}

export function DestinationsMegaMenu({ onClose }: DestinationsMegaMenuProps) {
  const { data: packages = [] } = useQuery(packagesQuery());
  const [searchQuery, setSearchQuery] = useState("");

  // Filter active packages by search term
  const filteredPackages = useMemo(() => {
    if (!searchQuery.trim()) return packages;
    const q = searchQuery.toLowerCase();
    return packages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.dropdownCategory.toLowerCase().includes(q) ||
        p.duration.toLowerCase().includes(q)
    );
  }, [packages, searchQuery]);

  // Group packages by dropdownCategory
  const groupedCategories = useMemo(() => {
    const categories: Record<string, TravelPackage[]> = {
      "Bangalore & Local Tours": [],
      "Karnataka Tours": [],
      "Hill Stations & Nature": [],
      "Pilgrimage Tours": [],
      "Kerala Tours": [],
      "Tamil Nadu & Pondicherry": [],
    };

    filteredPackages.forEach((pkg) => {
      const cat = pkg.dropdownCategory || "Karnataka Tours";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(pkg);
    });

    return categories;
  }, [filteredPackages]);

  // Dynamic Featured Package (featured = true or first popular)
  const featuredPackage = useMemo(() => {
    return (
      packages.find((p) => p.is_featured) ||
      packages.find((p) => p.is_popular) ||
      packages[0]
    );
  }, [packages]);

  const categoryIcons: Record<string, any> = {
    "Bangalore & Local Tours": Landmark,
    "Karnataka Tours": Compass,
    "Hill Stations & Nature": Mountain,
    "Pilgrimage Tours": Sun,
    "Kerala Tours": Palmtree,
    "Tamil Nadu & Pondicherry": Crown,
  };

  return (
    <div
      id="destinations-dropdown"
      role="menu"
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: "-120px",
        left: "auto",
        width: "min(960px, calc(100vw - 32px))",
        zIndex: 9999,
      }}
      className="bg-white rounded-3xl shadow-[0_25px_60px_rgba(7,21,37,0.22)] border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200 text-left"
    >
      {/* ── 1. MEGA MENU HEADER ── */}
      <div className="bg-[#071525] text-white p-5 px-7 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
            <Sparkles className="h-3 w-3 fill-amber-400" />
            <span>Explore South India</span>
          </div>
          <h3 className="text-lg font-display font-extrabold text-white mt-0.5">
            Popular Tours &amp; Travel Packages
          </h3>
          <p className="text-xs text-slate-300 font-normal">
            Handpicked road journeys from Bangalore with Force Urbania &amp; Tempo Traveller.
          </p>
        </div>

        {/* Live Search Field */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search destination or package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── 2. SCROLLABLE PACKAGE CONTENT AREA ── */}
      <div className="p-6 max-h-[56vh] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Package Categories (Left 8 Cols) */}
          <div className="col-span-12 lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {Object.entries(groupedCategories).map(([catTitle, catPackages]) => {
              if (catPackages.length === 0) return null;
              const CategoryIcon = categoryIcons[catTitle] || Compass;

              return (
                <div key={catTitle} className="space-y-2">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#071525] border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                    <CategoryIcon className="h-3.5 w-3.5 text-[#155EEF]" />
                    <span>{catTitle}</span>
                    <span className="ml-auto text-[10px] text-slate-400 font-semibold bg-slate-100 px-1.5 py-0.2 rounded-full">
                      {catPackages.length}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {catPackages.map((pkg) => (
                      <Link
                        key={pkg.slug}
                        to="/packages/$slug"
                        params={{ slug: pkg.slug }}
                        onClick={onClose}
                        className="group flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-all duration-150 border border-transparent hover:border-slate-200/60"
                      >
                        <img
                          src={pkg.thumbnail || pkg.image_url}
                          alt={pkg.title}
                          className="h-9 w-9 rounded-lg object-cover shrink-0 border border-slate-200/80 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#155EEF] transition-colors truncate">
                            {pkg.title}
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-2">
                            <span>{pkg.duration}</span>
                            {pkg.badge && (
                              <span className="text-[9px] font-extrabold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded">
                                {pkg.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#155EEF] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Featured Package Card (Right 4 Cols) */}
          {featuredPackage && (
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-gradient-to-b from-slate-900 to-[#071525] rounded-2xl p-4 text-white border border-amber-400/30 shadow-md flex flex-col justify-between h-full relative overflow-hidden group">
                <div>
                  <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                    <img
                      src={featuredPackage.image_url}
                      alt={featuredPackage.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-amber-400 text-[#071525] text-[9px] font-black uppercase tracking-wider shadow-sm">
                      ✨ FEATURED ESCAPE
                    </div>
                  </div>

                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {featuredPackage.destination} · {featuredPackage.duration}
                  </div>
                  <h4 className="text-sm font-extrabold text-white mt-1 group-hover:text-amber-300 transition-colors line-clamp-1">
                    {featuredPackage.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-1 line-clamp-2">
                    {featuredPackage.short_description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase font-bold">Starting Price</div>
                    <div className="text-xs font-extrabold text-amber-400">
                      ₹{featuredPackage.price?.toLocaleString()} <span className="text-[9px] font-normal text-slate-300">/ package</span>
                    </div>
                  </div>

                  <Link
                    to="/packages/$slug"
                    params={{ slug: featuredPackage.slug }}
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#071525] text-xs font-extrabold transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Package</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 3. MEGA MENU FOOTER ── */}
      <div className="bg-slate-50 p-4 px-7 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="text-slate-600 text-[11px] font-medium flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          <span>Trips available from Bangalore with Urbania, Tempo Traveller &amp; Coaches.</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/packages"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#071525] hover:bg-[#155EEF] text-white text-xs font-extrabold transition-all shadow-sm inline-flex items-center gap-1.5"
          >
            <span>View All Travel Packages</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={() => {
              onClose();
              openEnquiryDialog({ defaultService: "Custom Tour Plan" });
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#071525] text-xs font-extrabold transition-all shadow-sm"
          >
            Plan a Custom Tour
          </button>
        </div>
      </div>
    </div>
  );
}
