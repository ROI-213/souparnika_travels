import { useEffect, useRef, useState } from "react";

/** Subtle animated journey line — a curved dashed SVG that draws itself
 * when the section enters the viewport. Honors prefers-reduced-motion. */
export function JourneyLine({
  variant = "gold",
  className = "",
}: {
  variant?: "gold" | "blue";
  className?: string;
}) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setDrawn(true);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const stroke =
    variant === "gold" ? "var(--brand-gold)" : "var(--brand-blue)";
  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`w-full h-10 md:h-14 pointer-events-none ${className}`}
    >
      <path
        d="M0,50 C200,10 400,80 600,40 S1000,10 1200,50"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeDashoffset={drawn ? 0 : 800}
        style={{
          transition: "stroke-dashoffset 1400ms ease-out",
          opacity: 0.7,
        }}
      />
      <circle
        cx="600"
        cy="40"
        r="4"
        fill={stroke}
        style={{ opacity: drawn ? 0.9 : 0, transition: "opacity 900ms 900ms" }}
      />
    </svg>
  );
}

export function useInView<T extends Element = HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, ...options },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

export function AnimatedCounter({
  value,
  duration = 1600,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setN(value);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return (
    <span ref={ref} className={className}>
      {n.toLocaleString("en-IN")}
    </span>
  );
}
