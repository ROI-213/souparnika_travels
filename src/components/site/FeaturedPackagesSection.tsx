import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, MapPin, Clock, Sparkles } from "lucide-react";
import { packagesQuery } from "@/lib/queries";
import { DEFAULT_PACKAGES } from "@/lib/data/packages";
import { PackageCard } from "./Cards";
import { waLink } from "@/lib/site-config";

export function FeaturedPackagesSection() {
  const { data: packages = [] } = useQuery(packagesQuery());

  const allPkgs = packages.length > 0 ? packages : DEFAULT_PACKAGES;
  const featuredPkgs = allPkgs.filter((p) => p.is_featured || p.is_popular).slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80" id="tour-packages">
      <div className="max-w-7xl mx-auto container-p">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-extrabold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              CURATED HOLIDAY PACKAGES
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-[#071525] tracking-tight">
              Featured South India Tour Packages
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Explore hand-crafted holiday itineraries with dedicated luxury van chauffeur support from Bangalore.
            </p>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#155EEF] hover:text-[#071525] transition-colors shrink-0 group"
          >
            Explore All Tour Packages <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {featuredPkgs.map((pkg) => (
            <PackageCard key={pkg.id || pkg.slug} pkg={pkg} />
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-14 p-8 rounded-3xl bg-[#071525] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-display font-extrabold text-white">
              Need a Customized South India Tour Itinerary?
            </h3>
            <p className="text-slate-300 text-sm">
              We design custom routes for Coorg, Wayanad, Tirupati, Ooty, Mysore &amp; Kerala with custom halt points.
            </p>
          </div>

          <a
            href={waLink("Hi Souparnika Travels, I'd like to plan a customized tour package.")}
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#071525] font-extrabold text-sm transition-all shadow-lg shrink-0"
          >
            Custom Itinerary Desk
          </a>
        </div>
      </div>
    </section>
  );
}
