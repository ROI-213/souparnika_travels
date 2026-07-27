import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FleetCard, FleetCardProps } from "./FleetCard";

interface FleetSliderSectionProps {
  title: string;
  description?: string;
  items: FleetCardProps[];
}

export function FleetSliderSection({ title, description, items }: FleetSliderSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps"
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = React.useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = React.useState(false);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Determine if we actually need slider controls based on breakpoints.
  // In a real app we'd use a window resize listener to show/hide strictly, 
  // but showing them if items > 4 (or > 1 on mobile) is safe.
  const showControls = items.length > 4 || (items.length > 1);

  return (
    <div className="mb-16 md:mb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 px-2 md:px-0">
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-[color:var(--brand-navy)] mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              {description}
            </p>
          )}
        </div>
        
        {/* Navigation Arrows */}
        {showControls && (
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className="h-10 w-10 flex items-center justify-center rounded-full border border-border bg-white text-[color:var(--brand-navy)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className="h-10 w-10 flex items-center justify-center rounded-full border border-border bg-white text-[color:var(--brand-navy)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="relative -mx-4 md:mx-0">
        <div className="overflow-hidden px-4 md:px-0" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-6">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pl-4 md:pl-6"
              >
                <div className="h-full py-2">
                  <FleetCard {...item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
