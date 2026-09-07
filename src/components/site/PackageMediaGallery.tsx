import { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  Car,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Camera,
  Hotel,
  Compass,
  CheckCircle2,
} from "lucide-react";
import type { PackageImage, PackageImageCategory } from "@/lib/data/packages";
import { cn } from "@/lib/utils";

interface PackageMediaGalleryProps {
  images: PackageImage[];
  packageTitle: string;
  destinationName: string;
}

export function PackageMediaGallery({
  images = [],
  packageTitle,
  destinationName,
}: PackageMediaGalleryProps) {
  // Ensure we have at least one image fallback
  const safeImages: PackageImage[] = useMemo(() => {
    if (images && images.length > 0) return images;
    return [
      {
        id: "fallback-1",
        url: "/images/hero/mysore-palace-hero.webp",
        alt: destinationName || "Tour Destination",
        title: `${destinationName || "Tour"} Destination View`,
        category: "destination",
        featured: true,
        displayOrder: 1,
      },
    ];
  }, [images, destinationName]);

  // Priority sort: featured destination images first, then sightseeing, stay, vehicle
  const sortedImages = useMemo(() => {
    return [...safeImages].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      const categoryPriority: Record<PackageImageCategory, number> = {
        destination: 1,
        sightseeing: 2,
        experience: 3,
        stay: 4,
        vehicle: 5,
      };
      return (
        (categoryPriority[a.category] || 9) - (categoryPriority[b.category] || 9) ||
        (a.displayOrder || 0) - (b.displayOrder || 0)
      );
    });
  }, [safeImages]);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Available non-empty category tabs
  const categories = useMemo(() => {
    const set = new Set<string>();
    sortedImages.forEach((img) => set.add(img.category));
    const catList = Array.from(set);

    const labels: { id: string; label: string; icon: any }[] = [{ id: "all", label: "All Photos", icon: Camera }];
    if (catList.includes("destination")) labels.push({ id: "destination", label: "Destination", icon: MapPin });
    if (catList.includes("sightseeing")) labels.push({ id: "sightseeing", label: "Sightseeing", icon: Compass });
    if (catList.includes("experience")) labels.push({ id: "experience", label: "Experiences", icon: Sparkles });
    if (catList.includes("stay")) labels.push({ id: "stay", label: "Hotels & Stay", icon: Hotel });
    if (catList.includes("vehicle")) labels.push({ id: "vehicle", label: "Vehicles Included", icon: Car });

    return labels;
  }, [sortedImages]);

  // Images filtered by category tab
  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return sortedImages;
    return sortedImages.filter((img) => img.category === activeCategory);
  }, [sortedImages, activeCategory]);

  const currentImage = filteredImages[selectedIndex] || filteredImages[0] || sortedImages[0];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, filteredImages.length]);

  const getCategoryBadgeColor = (cat: PackageImageCategory) => {
    switch (cat) {
      case "destination":
        return "bg-amber-400 text-[#071525]";
      case "sightseeing":
        return "bg-blue-600 text-white";
      case "vehicle":
        return "bg-emerald-600 text-white";
      case "stay":
        return "bg-purple-600 text-white";
      case "experience":
        return "bg-rose-600 text-white";
      default:
        return "bg-slate-800 text-white";
    }
  };

  return (
    <div className="space-y-4">
      {/* ── SINGLE FEATURED DESTINATION IMAGE ── */}
      <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-slate-900 shadow-xl border border-slate-200/80 group">
        <img
          src={currentImage.url}
          alt={currentImage.alt || currentImage.title || packageTitle}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/90 via-[#071525]/20 to-transparent pointer-events-none" />

        {/* Top Badges & Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1",
                getCategoryBadgeColor(currentImage.category)
              )}
            >
              {currentImage.category === "vehicle" && <Car className="h-3 w-3" />}
              {currentImage.category === "destination" && <MapPin className="h-3 w-3" />}
              <span>{currentImage.category.toUpperCase()} PHOTO</span>
            </span>

            {currentImage.featured && (
              <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#071525] text-[10px] font-extrabold shadow-sm">
                ⭐ Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Expand Fullscreen Button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition-all border border-white/20 hover:scale-110"
              title="Expand Fullscreen Gallery"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom Caption Overlay */}
        <div className="absolute bottom-4 left-4 right-16 z-10 text-white pointer-events-none">
          <h4 className="text-lg font-display font-extrabold text-white leading-tight drop-shadow-md">
            {currentImage.title || destinationName}
          </h4>
          {currentImage.category === "vehicle" ? (
            <div className="text-xs text-amber-300 font-bold flex items-center gap-1 mt-1">
              <Car className="h-3.5 w-3.5" /> Vehicle Included for Package: {currentImage.title}
            </div>
          ) : (
            <div className="text-xs text-slate-300 font-medium flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5 text-amber-400" /> {destinationName} Sightseeing Highlight
            </div>
          )}
        </div>
      </div>



      {/* ── 4. FULLSCREEN LIGHTBOX MODAL ── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div>
              <div className="text-xs text-amber-400 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
                <span>{packageTitle}</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-white mt-0.5">
                {currentImage.title || destinationName}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono font-bold text-slate-300">
                {selectedIndex + 1} / {filteredImages.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image & Navigation */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
            />

            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/20 hover:scale-110"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/20 hover:scale-110"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Footer */}
          <div className="text-center text-xs text-slate-400 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={cn("px-2.5 py-0.5 rounded text-[10px] font-bold uppercase", getCategoryBadgeColor(currentImage.category))}>
                {currentImage.category}
              </span>
              <span>{currentImage.title}</span>
            </div>
            <span>Use Left/Right Keyboard Arrow keys to Navigate · Esc to Close</span>
          </div>
        </div>
      )}
    </div>
  );
}
