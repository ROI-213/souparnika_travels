import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle } from "lucide-react";

export function HeroContent() {
  return (
    <div className="hero-copy animate-fade-up">
      {/* Eyebrow */}
      <div className="hero-eyebrow mb-6">
        <div className="h-[1px] w-8 bg-[#c9922e]" />
        <span>JOURNEYS THAT STAY WITH YOU</span>
      </div>

      {/* Main Heading */}
      <h1 className="hero-title mb-6">
        <span className="text-[#243321] block">Plan the Perfect</span>
        <span className="text-[#c9922e] block">South India Journey</span>
      </h1>

      {/* Supporting Text */}
      <p className="text-[#62645f] text-[17px] mb-10 leading-[1.6]">
        Handpicked experiences, seamless travel, and unforgettable moments across South India.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/packages"
          className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#243321] text-white hover:bg-[#182417] transition-all group shadow-md"
        >
          <span className="text-[14px] font-medium tracking-wide">Explore Packages</span>
          <span className="h-8 w-8 rounded-full bg-[#c9922e] grid place-items-center text-[#243321] group-hover:translate-x-1 transition-transform">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
        

      </div>
    </div>
  );
}
