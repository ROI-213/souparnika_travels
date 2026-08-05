import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from "lucide-react";
import { DEFAULT_TESTIMONIALS, type Testimonial } from "@/lib/data/vehicles";

export function ReviewsSection() {
  const reviews = DEFAULT_TESTIMONIALS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    autoSlideTimer.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    };
  }, [isPaused, reviews.length]);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-secondary/30 to-white" id="customer-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-border">
          <div className="space-y-3">
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[color:var(--brand-blue)] bg-[color:var(--brand-blue)]/10 px-3.5 py-1 rounded-full">
              CUSTOMER TESTIMONIALS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[color:var(--brand-navy)]">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              Real travel experiences from families, corporate delegates, and tour groups across South India.
            </p>
          </div>

          {/* Rating Summary Badge */}
          <div className="flex items-center gap-4 bg-white border border-border p-4 rounded-2xl shadow-sm shrink-0">
            <div className="text-center">
              <div className="text-3xl font-black text-[color:var(--brand-navy)]">4.9</div>
              <div className="flex text-amber-400 gap-0.5 mt-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="flex items-center gap-1 text-xs font-extrabold text-green-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verified Customer Reviews
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Based on 500+ happy trip reviews
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Slider Container */}
        <div
          className="mt-10 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const reviewIdx = (currentIndex + offset) % reviews.length;
              const item = reviews[reviewIdx];

              return (
                <div
                  key={item.id + offset}
                  className={`rounded-3xl border border-border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                    offset >= 1 ? "hidden md:flex" : ""
                  } ${offset >= 2 ? "hidden lg:flex" : ""}`}
                >
                  <div className="space-y-4">
                    {/* Header: Avatar, Name, Rating */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar_url ?? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                          alt={item.customer_name}
                          className="h-11 w-11 rounded-full object-cover border border-border"
                        />
                        <div>
                          <h3 className="font-display font-bold text-sm text-[color:var(--brand-navy)]">
                            {item.customer_name}
                          </h3>
                          <div className="text-[11px] text-muted-foreground">
                            {item.customer_location ?? "Bengaluru"}
                          </div>
                        </div>
                      </div>

                      <Quote className="h-7 w-7 text-[color:var(--brand-gold)]/40 shrink-0" />
                    </div>

                    {/* Star Rating */}
                    <div className="flex text-amber-400 gap-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    {/* Review Body */}
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                      {item.review}
                    </p>
                  </div>

                  {/* Footer Tag */}
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
                    <span className="bg-secondary px-2.5 py-1 rounded-md text-[color:var(--brand-navy)]">
                      {item.fleet_used ?? "Force Urbania"}
                    </span>
                    <span>{item.travel_type ?? "Outstation Trip"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider Prev / Next Controls */}
          <div className="mt-8 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? "w-6 bg-[color:var(--brand-navy)]" : "w-2 bg-black/20"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous review"
                onClick={prevReview}
                className="h-10 w-10 rounded-full border border-border bg-white grid place-items-center text-foreground hover:bg-[color:var(--brand-navy)] hover:text-white transition-colors shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Next review"
                onClick={nextReview}
                className="h-10 w-10 rounded-full border border-border bg-white grid place-items-center text-foreground hover:bg-[color:var(--brand-navy)] hover:text-white transition-colors shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
