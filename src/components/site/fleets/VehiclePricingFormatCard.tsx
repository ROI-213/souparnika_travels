import type { Fleet } from "@/lib/queries";

export function VehiclePricingFormatCard({
  fleet,
  variant = "dark",
}: {
  fleet: Fleet;
  variant?: "dark" | "light";
}) {
  const seatingText = fleet.seating_label || (fleet as any).seating_layout || `${fleet.seating || (fleet as any).seating_capacity || 10}+1 seater`;
  const localHours = fleet.local_package_hours ?? 8;
  const localKm = fleet.local_package_km ?? 80;
  const localRate = fleet.local_package_rate ?? (fleet as any).local_8hr_80km ?? (fleet.per_km_rate ? fleet.per_km_rate * 100 : 5000);
  const local12hKm = fleet.local_package_12h_km ?? ((fleet as any).local_12hr_100km ? 100 : null);
  const local12hRate = fleet.local_package_12h_rate ?? (fleet as any).local_12hr_100km;
  const extraHour = fleet.extra_hour_rate ?? (fleet as any).extra_hour ?? (fleet.per_km_rate ? fleet.per_km_rate * 10 : 500);
  const extraKm = fleet.extra_km_rate ?? (fleet as any).extra_km ?? fleet.per_km_rate ?? (fleet as any).outstation_per_km ?? 33;
  const perKm = fleet.per_km_rate ?? (fleet as any).outstation_per_km ?? 33;
  const driverAllowance = fleet.driver_allowance ?? (fleet as any).driver_allowance ?? 700;
  const minKm = fleet.min_km ?? (fleet as any).outstation_min_km_per_day ?? 300;

  if (variant === "dark") {
    return (
      <div className="rounded-2xl bg-[#121212] border border-[#2a2a2a] text-white p-6 sm:p-8 font-sans shadow-2xl space-y-6">
        {/* Vehicle Title */}
        <h3 className="font-bold text-xl sm:text-2xl text-white tracking-tight">
          {fleet.name}, {seatingText}
        </h3>

        {/* Side by side layout for Local and Inter-State Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Local Transportation Package */}
          <div className="space-y-2">
            <h4 className="font-semibold text-base sm:text-lg text-slate-100">
              Local Transportation Package:
            </h4>
            <ul className="space-y-1.5 text-sm sm:text-base text-slate-200 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-slate-400 select-none">•</span>
                <span className="font-semibold">
                  {localHours} Hours / {localKm} Kms – ₹{localRate.toLocaleString("en-IN")}
                </span>
              </li>
              {local12hKm && (
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 select-none">•</span>
                  <span className="font-semibold">
                    12 Hours / {local12hKm} Kms – {local12hRate ? `₹${local12hRate.toLocaleString("en-IN")}` : "On Request"}
                  </span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <span className="text-slate-400 select-none">•</span>
                <span>Additional Charges:</span>
              </li>
              <li className="pl-5 flex items-start gap-2">
                <span className="text-slate-400 select-none">•</span>
                <span>Extra Hour: ₹{extraHour.toLocaleString("en-IN")} per hour</span>
              </li>
              <li className="pl-5 flex items-start gap-2">
                <span className="text-slate-400 select-none">•</span>
                <span>Extra Distance: ₹{extraKm.toLocaleString("en-IN")} per km</span>
              </li>
              <li className="pl-5 flex items-start gap-2">
                <span className="text-slate-400 select-none">•</span>
                <span>Billing is done from garage to garage.</span>
              </li>
            </ul>
          </div>

          {/* Inter-State Transportation Package */}
          <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#2a2a2a] pt-4 md:pt-0 md:pl-6">
            <h4 className="font-semibold text-base sm:text-lg text-slate-100">
              Inter-State Transportation Package:
            </h4>
            <ul className="space-y-1.5 text-sm sm:text-base text-slate-200 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-slate-400 select-none">•</span>
                <span className="font-semibold">₹{perKm.toLocaleString("en-IN")} per km</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 select-none">•</span>
                <span>
                  Driver Allowance: ₹{driverAllowance.toLocaleString("en-IN")} per day (Additional charges for night travel)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 select-none">•</span>
                <span>Minimum Billing: {minKm} kms per day</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 select-none">•</span>
                <span>Toll, Parking & State Permit Charges: As Actuals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 select-none">•</span>
                <span>Billing is done from garage to garage.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-200 text-slate-900 p-6 sm:p-8 font-sans shadow-lg space-y-6">
      {/* Vehicle Title */}
      <h3 className="font-bold text-xl sm:text-2xl text-[color:var(--brand-navy)] tracking-tight">
        {fleet.name}, {seatingText}
      </h3>

      {/* Side by side layout for Local and Inter-State Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
        {/* Local Transportation Package */}
        <div className="space-y-2">
          <h4 className="font-bold text-base sm:text-lg text-slate-900">
            Local Transportation Package:
          </h4>
          <ul className="space-y-1.5 text-sm sm:text-base text-slate-800 pl-1">
            <li className="flex items-start gap-2">
              <span className="text-slate-500 select-none">•</span>
              <span className="font-extrabold text-[#071525]">
                {localHours} Hours / {localKm} Kms – ₹{localRate.toLocaleString("en-IN")}
              </span>
            </li>
            {local12hKm && (
              <li className="flex items-start gap-2">
                <span className="text-slate-500 select-none">•</span>
                <span className="font-extrabold text-[#071525]">
                  12 Hours / {local12hKm} Kms – {local12hRate ? `₹${local12hRate.toLocaleString("en-IN")}` : "On Request"}
                </span>
              </li>
            )}
            <li className="flex items-start gap-2">
              <span className="text-slate-500 select-none">•</span>
              <span className="font-bold">Additional Charges:</span>
            </li>
            <li className="pl-5 flex items-start gap-2">
              <span className="text-slate-500 select-none">•</span>
              <span>Extra Hour: ₹{extraHour.toLocaleString("en-IN")} per hour</span>
            </li>
            <li className="pl-5 flex items-start gap-2">
              <span className="text-slate-500 select-none">•</span>
              <span>Extra Distance: ₹{extraKm.toLocaleString("en-IN")} per km</span>
            </li>
            <li className="pl-5 flex items-start gap-2">
              <span className="text-slate-500 select-none">•</span>
              <span className="text-slate-600">Billing is done from garage to garage.</span>
            </li>
          </ul>
        </div>

        {/* Inter-State Transportation Package */}
        <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
          <h4 className="font-bold text-base sm:text-lg text-slate-900">
            Inter-State Transportation Package:
          </h4>
          <ul className="space-y-1.5 text-sm sm:text-base text-slate-800 pl-1">
            <li className="flex items-start gap-2">
              <span className="text-slate-500 select-none">•</span>
              <span className="font-extrabold text-[#071525]">₹{perKm.toLocaleString("en-IN")} per km</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-500 select-none">•</span>
              <span>
                Driver Allowance: ₹{driverAllowance.toLocaleString("en-IN")} per day (Additional charges for night travel)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-500 select-none">•</span>
              <span>Minimum Billing: {minKm} kms per day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-500 select-none">•</span>
              <span>Toll, Parking & State Permit Charges: As Actuals</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-500 select-none">•</span>
              <span className="text-slate-600">Billing is done from garage to garage.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
