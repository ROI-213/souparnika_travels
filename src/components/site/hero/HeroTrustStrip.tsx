import { Headphones, ShieldCheck, CheckCircle2, IndianRupee } from "lucide-react";

export function HeroTrustStrip() {
  return (
    <div className="hero-trust-strip animate-fade-up lg:divide-x divide-[rgba(232,225,213,0.6)] py-5 px-6">
      <div className="flex items-center gap-3 lg:px-4">
        <Headphones className="h-6 w-6 text-[#c9922e] stroke-[1.5]" />
        <div>
          <div className="text-xs font-bold text-[#171914] mb-0.5">24/7 Customer Support</div>
          <div className="text-[10px] text-[#62645f]">We're here, anytime you need us.</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 lg:px-6">
        <ShieldCheck className="h-6 w-6 text-[#c9922e] stroke-[1.5]" />
        <div>
          <div className="text-xs font-bold text-[#171914] mb-0.5">Verified Local Experts</div>
          <div className="text-[10px] text-[#62645f]">Trusted guides. Authentic experiences.</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 lg:px-6">
        <CheckCircle2 className="h-6 w-6 text-[#c9922e] stroke-[1.5]" />
        <div>
          <div className="text-xs font-bold text-[#171914] mb-0.5">Flexible & Secure Booking</div>
          <div className="text-[10px] text-[#62645f]">Book with confidence and flexibility.</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 lg:px-6">
        <IndianRupee className="h-6 w-6 text-[#c9922e] stroke-[1.5]" />
        <div>
          <div className="text-xs font-bold text-[#171914] mb-0.5">Best Price Guarantee</div>
          <div className="text-[10px] text-[#62645f]">Top value for every journey.</div>
        </div>
      </div>
    </div>
  );
}
