import { useState } from "react";
import { Plane, Calendar, Users, Car, ArrowRight, ArrowRightLeft, MapPin } from "lucide-react";

export function TripSearchPanel() {
  const [activeTab, setActiveTab] = useState<"one-way" | "round-trip" | "multi-city">("one-way");

  return (
    <div className="trip-search-panel animate-fade-up">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-6 mb-6 border-b border-[rgba(232,225,213,0.6)] pb-4">
        <button 
          onClick={() => setActiveTab("one-way")}
          className={`flex items-center gap-2 pb-4 -mb-[18px] transition-colors ${
            activeTab === "one-way" 
              ? "text-[#c9922e] font-semibold border-b-2 border-[#c9922e]" 
              : "text-[#62645f] font-medium hover:text-[#171914] border-b-2 border-transparent"
          }`}
        >
          <Plane className="h-4 w-4" />
          <span className="text-[13px]">One Way</span>
        </button>
        <button 
          onClick={() => setActiveTab("round-trip")}
          className={`flex items-center gap-2 pb-4 -mb-[18px] transition-colors ${
            activeTab === "round-trip" 
              ? "text-[#c9922e] font-semibold border-b-2 border-[#c9922e]" 
              : "text-[#62645f] font-medium hover:text-[#171914] border-b-2 border-transparent"
          }`}
        >
          <ArrowRightLeft className="h-4 w-4" />
          <span className="text-[13px]">Round Trip</span>
        </button>
        <button 
          onClick={() => setActiveTab("multi-city")}
          className={`flex items-center gap-2 pb-4 -mb-[18px] transition-colors ${
            activeTab === "multi-city" 
              ? "text-[#c9922e] font-semibold border-b-2 border-[#c9922e]" 
              : "text-[#62645f] font-medium hover:text-[#171914] border-b-2 border-transparent"
          }`}
        >
          <MapPin className="h-4 w-4" />
          <span className="text-[13px]">Multi City</span>
        </button>
      </div>

      {/* Form Fields Row */}
      <div className="trip-fields flex flex-col lg:flex-row gap-4 lg:gap-0 lg:divide-x divide-[rgba(232,225,213,0.6)] w-full">
        {/* FROM */}
        <div className="lg:pr-4 flex-1 w-full">
          <div className="text-[9px] font-bold tracking-[0.1em] text-[#62645f] mb-1.5 uppercase">FROM</div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-[2.5px] border-[#c9922e] shrink-0" />
            <input type="text" placeholder="Where from?" className="w-full bg-transparent font-semibold text-[#171914] text-sm placeholder:text-[#62645f]/60 outline-none" />
          </div>
        </div>
        
        {/* SWAP */}
        <div className="relative flex justify-center items-center py-2 lg:py-0">
          <button className="h-8 w-8 rounded-full bg-[#fbf8f1] border border-[rgba(232,225,213,0.8)] grid place-items-center hover:bg-white hover:border-[#c9922e] transition-colors z-10 text-[#62645f] shadow-sm rotate-90 lg:rotate-0">
            <ArrowRightLeft className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* TO */}
        <div className="lg:pl-6 lg:pr-4 flex-1 w-full">
          <div className="text-[9px] font-bold tracking-[0.1em] text-[#62645f] mb-1.5 uppercase">TO</div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[#c9922e] shrink-0" />
            <input type="text" placeholder="Where to?" className="w-full bg-transparent font-semibold text-[#171914] text-sm placeholder:text-[#62645f]/60 outline-none" />
          </div>
        </div>

        {/* DATE */}
        <div className="lg:px-4 flex-1 w-full">
          <div className="text-[9px] font-bold tracking-[0.1em] text-[#62645f] mb-1.5 uppercase">TRAVEL DATE</div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#c9922e] shrink-0" />
            <input type="text" placeholder="Select dates" className="w-full bg-transparent font-semibold text-[#171914] text-sm placeholder:text-[#62645f]/60 outline-none" />
          </div>
        </div>

        {/* TRAVELERS */}
        <div className="lg:px-4 flex-1 w-full">
          <div className="text-[9px] font-bold tracking-[0.1em] text-[#62645f] mb-1.5 uppercase">TRAVELERS</div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#c9922e] shrink-0" />
            <input type="text" placeholder="2 Adults, 0 Children" className="w-full bg-transparent font-semibold text-[#171914] text-sm placeholder:text-[#62645f]/60 outline-none" />
          </div>
        </div>

        {/* PREFERENCE */}
        <div className="lg:px-4 flex-1 w-full">
          <div className="text-[9px] font-bold tracking-[0.1em] text-[#62645f] mb-1.5 uppercase">PREFERENCE</div>
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-[#c9922e] shrink-0" />
            <select className="bg-transparent font-semibold text-[#171914] text-sm outline-none cursor-pointer appearance-none w-full">
              <option>Any Vehicle</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Tempo Traveler</option>
            </select>
          </div>
        </div>
        
        {/* SEARCH BUTTON */}
        <div className="flex items-center lg:justify-end lg:pr-0 pl-2 py-4 lg:py-0">
          <button className="w-full sm:w-auto shrink-0 flex items-center justify-between sm:justify-start gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-[#c9922e] text-white hover:brightness-105 transition-all group shadow-md">
            <span className="text-[13px] font-semibold tracking-wide">Search Now</span>
            <span className="h-8 w-8 rounded-full bg-white grid place-items-center text-[#c9922e] group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
