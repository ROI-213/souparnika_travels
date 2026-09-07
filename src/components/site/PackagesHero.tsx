import React, { useState, useEffect } from 'react';
import { Package } from '@/lib/queries';
import { Link } from '@tanstack/react-router';
import { Search, MapPin, Calendar, Clock, Sparkles, ShieldCheck, Star, Car, ArrowRight, ChevronLeft, ChevronRight, Compass, CheckCircle2 } from 'lucide-react';

interface FiltersState {
  q: string;
  destination: string;
  category: string;
  duration: string;
  [key: string]: any;
}

interface PackagesHeroProps {
  packages?: Package[];
  filters?: FiltersState;
  setFilters?: React.Dispatch<React.SetStateAction<FiltersState>>;
}

const POPULAR_DESTINATIONS = [
  { name: 'Coorg', icon: '⛰️', label: 'Misty Hills' },
  { name: 'Kerala', icon: '🌴', label: 'Backwaters' },
  { name: 'Mysore', icon: '🏰', label: 'Royal Heritage' },
  { name: 'Ooty', icon: '🍵', label: 'Tea Gardens' },
  { name: 'Chikmagalur', icon: '☕', label: 'Coffee Estates' },
  { name: 'Tirupati', icon: '🛕', label: 'Pilgrimage' },
  { name: 'Hampi', icon: '🏛️', label: 'Ancient Ruins' },
];

export const PackagesHero: React.FC<PackagesHeroProps> = ({ packages = [], filters, setFilters }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Filter top featured packages for spotlight card
  const featuredPackages = React.useMemo(() => {
    if (!packages || packages.length === 0) return [];
    return packages.filter((p) => p.is_featured || p.is_popular).slice(0, 5);
  }, [packages]);

  // Auto-advance spotlight slide every 6 seconds
  useEffect(() => {
    if (featuredPackages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredPackages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredPackages.length]);

  const handleDestinationClick = (destName: string) => {
    if (setFilters) {
      setFilters((prev) => ({
        ...prev,
        destination: destName,
        q: '',
      }));
    }
    const resultsElement = document.getElementById('packages-results');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resultsElement = document.getElementById('packages-results');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentPkg = featuredPackages[activeSlide] || packages[0];

  return (
    <div className="max-w-7xl mx-auto container-p pt-3 sm:pt-5">
      <section className="relative overflow-hidden bg-[color:var(--brand-navy)] text-white pt-8 pb-14 lg:pt-12 lg:pb-20 rounded-[2.5rem] md:rounded-[3.5rem] lg:rounded-[4.5rem] shadow-2xl border border-white/10">
      {/* Dynamic Background Images with Soft Gradient Overlays */}
      <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-1000">
        {currentPkg?.image_url && (
          <img
            src={currentPkg.image_url}
            alt={currentPkg.name}
            className="w-full h-full object-cover filter blur-[2px] scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--brand-navy)] via-[color:var(--brand-navy)]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--brand-navy)] via-transparent to-black/40" />
      </div>

      {/* Decorative Gold & Blue Ambient Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto container-p">
        {/* Top Breadcrumb & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm text-slate-300">
          <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span className="text-slate-500">/</span>
            <span className="text-amber-400 font-semibold">Tour Packages</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-amber-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Handcrafted South India Getaways</span>
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Subtitle & Interactive Trip Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Curated South India <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                  Journeys & Road Trips
                </span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
                From 1-day Bengaluru sightseeing to multi-day family holidays across Karnataka, Kerala, Tamil Nadu, and Andhra Pradesh in premium chauffeured fleets.
              </p>
            </div>

            {/* Quick Trip Finder Bar Card */}
            <div className="bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/30 space-y-3">
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Search Text Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Search className="w-3 h-3 text-[color:var(--brand-blue)]" /> Destination or Keyword
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Coorg, Ooty, Kerala"
                    value={filters?.q || ''}
                    onChange={(e) => setFilters && setFilters((prev) => ({ ...prev, q: e.target.value }))}
                    className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg bg-slate-100 border border-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)] focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {/* Destination Dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[color:var(--brand-blue)]" /> Select Region
                  </label>
                  <select
                    value={filters?.destination || 'any'}
                    onChange={(e) => setFilters && setFilters((prev) => ({ ...prev, destination: e.target.value }))}
                    className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg bg-slate-100 border border-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)] focus:bg-white transition-all text-slate-900"
                  >
                    <option value="any">All Destinations</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Mysore">Mysore</option>
                    <option value="Coorg">Coorg</option>
                    <option value="Ooty">Ooty</option>
                    <option value="Chikmagalur">Chikmagalur</option>
                  </select>
                </div>

                {/* Duration Dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[color:var(--brand-blue)]" /> Duration
                  </label>
                  <select
                    value={filters?.duration || 'any'}
                    onChange={(e) => setFilters && setFilters((prev) => ({ ...prev, duration: e.target.value }))}
                    className="w-full h-10 px-3 text-xs sm:text-sm rounded-lg bg-slate-100 border border-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)] focus:bg-white transition-all text-slate-900"
                  >
                    <option value="any">Any Duration</option>
                    <option value="1">1 Day Sightseeing</option>
                    <option value="2-3">2 – 3 Days Getaway</option>
                    <option value="4-6">4 – 6 Days Tour</option>
                    <option value="7+">7+ Days Grand Tour</option>
                  </select>
                </div>
              </form>

              <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/80">
                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Customizable itineraries & doorstep pickup in Bengaluru</span>
                </div>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="w-full sm:w-auto h-10 px-5 rounded-lg bg-[color:var(--brand-navy)] hover:bg-[#163a66] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all group"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Popular Destination Quick Pills */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Popular Destinations:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_DESTINATIONS.map((dest) => {
                  const isActive = filters?.destination?.toLowerCase() === dest.name.toLowerCase();
                  return (
                    <button
                      key={dest.name}
                      type="button"
                      onClick={() => handleDestinationClick(dest.name)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-400/20 scale-105'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-amber-400/40'
                      }`}
                    >
                      <span className="text-sm">{dest.icon}</span>
                      <span>{dest.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Featured Destination Spotlight Showcase */}
          {currentPkg && (
            <div className="lg:col-span-5 relative">
              <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900">
                {/* Image Aspect ratio container */}
                <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] relative overflow-hidden">
                  <img
                    src={currentPkg.image_url}
                    alt={currentPkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider shadow">
                      {currentPkg.category || 'Featured Tour'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-semibold flex items-center gap-1 border border-white/10">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9 ★ Rating
                    </span>
                  </div>

                  {/* Bottom Package Info Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 space-y-2 text-white">
                    <div className="text-xs text-amber-300 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{currentPkg.duration}</span>
                      <span className="text-slate-400">•</span>
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{currentPkg.location}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug text-white">
                      {currentPkg.name}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {currentPkg.short_description}
                    </p>

                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/15">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Starting From</div>
                        <div className="text-lg font-bold text-amber-400">
                          {currentPkg.price ? `₹${currentPkg.price.toLocaleString('en-IN')}` : 'Custom Pricing'}
                          <span className="text-[11px] font-normal text-slate-300"> / trip</span>
                        </div>
                      </div>

                      <Link
                        to="/packages/$slug"
                        params={{ slug: currentPkg.slug }}
                        className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow flex items-center gap-1.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Slide Controls if multiple featured packages */}
                {featuredPackages.length > 1 && (
                  <div className="absolute top-1/2 -translate-y-1/2 inset-x-2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => setActiveSlide((prev) => (prev === 0 ? featuredPackages.length - 1 : prev - 1))}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md pointer-events-auto transition-transform hover:scale-110"
                      aria-label="Previous destination"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSlide((prev) => (prev + 1) % featuredPackages.length)}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md pointer-events-auto transition-transform hover:scale-110"
                      aria-label="Next destination"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Dot Indicators */}
                {featuredPackages.length > 1 && (
                  <div className="absolute bottom-2 right-4 flex items-center gap-1.5 z-20">
                    {featuredPackages.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          activeSlide === idx ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/40'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Elegant Curved Bottom Divider */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden leading-none pointer-events-none z-10">
        <svg
          className="relative block w-full h-8 sm:h-12 md:h-16 lg:h-20 text-white fill-current"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,32 C360,110 1080,110 1440,32 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  </div>
  );
};

