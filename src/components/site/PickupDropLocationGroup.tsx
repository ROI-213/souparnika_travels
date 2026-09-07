import { useState } from "react";
import { ArrowUpDown, AlertCircle } from "lucide-react";
import { LocationAutocomplete } from "./LocationAutocomplete";
import type { LocationItem } from "@/lib/locationData";

export interface PickupDropLocationGroupProps {
  pickupValue: string;
  dropValue: string;
  onPickupChange: (val: string, item?: LocationItem | null) => void;
  onDropChange: (val: string, item?: LocationItem | null) => void;
  pickupError?: string;
  dropError?: string;
  pickupLabel?: string;
  dropLabel?: string;
  pickupPlaceholder?: string;
  dropPlaceholder?: string;
  pickupName?: string;
  dropName?: string;
  required?: boolean;
  className?: string;
}

export function PickupDropLocationGroup({
  pickupValue,
  dropValue,
  onPickupChange,
  onDropChange,
  pickupError,
  dropError,
  pickupLabel = "Pickup Location",
  dropLabel = "Drop Location / Destination",
  pickupPlaceholder = "e.g. Rajajinagar / Airport / Bengaluru",
  dropPlaceholder = "e.g. Shivamogga / Coorg / Mysore / Ooty",
  pickupName = "pickup",
  dropName = "destination",
  required = true,
  className = "",
}: PickupDropLocationGroupProps) {
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  const checkDuplicate = (p: string, d: string) => {
    if (p && d && p.trim().toLowerCase() === d.trim().toLowerCase()) {
      setDuplicateWarning("Pickup and drop locations cannot be the same.");
    } else {
      setDuplicateWarning(null);
    }
  };

  const handleSwap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const tempPickup = pickupValue;
    const tempDrop = dropValue;
    onPickupChange(tempDrop);
    onDropChange(tempPickup);
    checkDuplicate(tempDrop, tempPickup);
  };

  const handlePickupChange = (val: string, item?: LocationItem | null) => {
    onPickupChange(val, item);
    checkDuplicate(val, dropValue);
  };

  const handleDropChange = (val: string, item?: LocationItem | null) => {
    onDropChange(val, item);
    checkDuplicate(pickupValue, val);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
        {/* Pickup Autocomplete */}
        <LocationAutocomplete
          name={pickupName}
          label={pickupLabel}
          placeholder={pickupPlaceholder}
          value={pickupValue}
          onChange={handlePickupChange}
          error={pickupError}
          required={required}
          iconType="pickup"
        />

        {/* Swap Button (Absolute Center on Desktop, Inline on Mobile) */}
        <div className="hidden sm:flex absolute left-1/2 top-[34px] -translate-x-1/2 z-10">
          <button
            type="button"
            onClick={handleSwap}
            title="Swap Pickup and Drop Locations"
            className="h-8 w-8 rounded-full bg-white border border-slate-300 shadow-md hover:bg-amber-400 hover:border-amber-500 hover:text-[#071525] text-slate-600 grid place-items-center transition-all hover:scale-110 active:scale-95"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Drop Autocomplete */}
        <LocationAutocomplete
          name={dropName}
          label={dropLabel}
          placeholder={dropPlaceholder}
          value={dropValue}
          onChange={handleDropChange}
          error={dropError}
          iconType="drop"
        />
      </div>

      {/* Mobile Swap Button */}
      <div className="flex sm:hidden justify-end pr-1">
        <button
          type="button"
          onClick={handleSwap}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#155EEF] hover:text-[#071525] transition-colors py-1"
        >
          <ArrowUpDown className="h-3 w-3" />
          <span>Swap Pickup &amp; Drop</span>
        </button>
      </div>

      {/* Duplicate Warning */}
      {duplicateWarning && (
        <div className="rounded-xl bg-amber-50 border border-amber-300 p-2.5 flex items-center gap-2 text-xs font-bold text-amber-900 animate-in fade-in">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
          <span>{duplicateWarning}</span>
        </div>
      )}
    </div>
  );
}
