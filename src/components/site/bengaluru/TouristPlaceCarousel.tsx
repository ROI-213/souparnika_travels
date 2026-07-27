import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useCallback, useEffect, useState } from "react";
import { TouristPlaceCard } from "./TouristPlaceCard";
import { TouristPlace } from "@/lib/data/bengaluru-places";

export function TouristPlaceCarousel({ 
  places,
  featuredCard,
}: { 
  places: TouristPlace[];
  featuredCard?: React.ReactNode;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    },
    [
      AutoScroll({ 
        playOnInit: true, 
        speed: 0.8, 
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      })
    ]
  );

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    
    const autoScroll = emblaApi.plugins().autoScroll;
    if (!autoScroll) return;

    const onPointerDown = () => {
      setIsDragging(true);
      autoScroll.stop();
    };
    
    const onPointerUp = () => {
      setIsDragging(false);
      autoScroll.play();
    };

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);

    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[color:var(--brand-soft)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[color:var(--brand-soft)] to-transparent z-10 pointer-events-none" />

      <div 
        className={`overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`} 
        ref={emblaRef}
      >
        <div className="flex backface-hidden touch-pan-y">
          {featuredCard && (
            <div className="flex-none w-[82vw] sm:w-[320px] mr-4 lg:hidden">
              {featuredCard}
            </div>
          )}
          {places.map((place) => (
            <div 
              key={place.id} 
              className="flex-none w-[75vw] sm:w-[260px] md:w-[280px] lg:w-[290px] mr-4 lg:mr-6 h-[420px]"
            >
              <TouristPlaceCard place={place} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
