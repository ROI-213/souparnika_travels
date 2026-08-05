import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, MapPin, Clock, Sparkles } from "lucide-react";
import { packagesQuery } from "@/lib/queries";
import { DEFAULT_PACKAGES } from "@/lib/data/packages";
import { PackageCard } from "./Cards";

export function FeaturedPackagesSection() {
  const { data: packages = [] } = useQuery(packagesQuery());

  const allPkgs = packages.length > 0 ? packages : DEFAULT_PACKAGES;
  const featuredPkgs = allPkgs.filter((p) => p.is_featured || p.is_popular).slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80" id="tour-packages">
      <div className="max-w-7xl mx-auto container-p">
        {/* Header Title Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-600 text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>HANDCRAFTED ITINERARIES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#071525] tracking-tight">
              Featured Tour Packages
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Curated outstation holiday packages from Bangalore with dedicated luxury vehicles &amp; professional chauffeurs.
            </p>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#071525] font-extrabold text-sm transition-all border border-slate-200 self-start md:self-auto"
          >
            <span>View All Packages</span>
            <ArrowRight className="h-4 w-4 text-amber-500" />
          </Link>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPkgs.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
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
            href="https://wa.me/919740796070?text=Hi%20Souparnika%20Travels,%20I'd%20like%20to%20plan%20a%20customized%20tour%20package."
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
