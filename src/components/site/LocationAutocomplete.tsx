import React, { useState, useEffect, useRef, useId } from "react";
import { MapPin, Navigation, Loader2, X, Plane, Train, Building2, Palmtree } from "lucide-react";
import { searchLocations, SOUTH_INDIA_LOCATIONS, type LocationItem } from "@/lib/locationData";

export interface LocationAutocompleteProps {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string, structured?: LocationItem | null) => void;
  error?: string;
  required?: boolean;
  iconType?: "pickup" | "drop" | "general";
  allowCurrentLocation?: boolean;
  className?: string;
  inputClassName?: string;
  id?: string;
}

export function LocationAutocomplete({
  name,
  label,
  placeholder = "Search area, city or landmark...",
  value,
  onChange,
  error,
  required,
  iconType = "general",
  allowCurrentLocation = true,
  className = "",
  inputClassName = "",
  id,
}: LocationAutocompleteProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  const [inputValue, setInputValue] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationItem[]>([]);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<any>(null);

  // Sync internal state if prop value changes externally (e.g. from swap button)
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val, null);
    setLocationError(null);
    setIsOpen(true);
    setActiveIndex(-1);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      if (!val || val.trim().length === 0) {
        setSuggestions(SOUTH_INDIA_LOCATIONS.slice(0, 6));
        return;
      }

      // Local fast fuzzy search
      const localResults = searchLocations(val, 8);
      setSuggestions(localResults);

      // If local matches are few, fetch from OpenStreetMap Nominatim for complete coverage
      if (localResults.length < 3 && val.trim().length >= 3) {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              val + " Karnataka India"
            )}&addressdetails=1&limit=4`,
            { headers: { "Accept-Language": "en" } }
          );
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              const onlineItems: LocationItem[] = data.map((item: any) => ({
                id: `osm-${item.place_id}`,
                name: item.name || item.display_name.split(",")[0],
                locality: item.address?.suburb || item.address?.neighbourhood || item.address?.city_district || "",
                city: item.address?.city || item.address?.town || item.address?.state_district || "Bengaluru",
                district: item.address?.county || item.address?.state_district,
                state: item.address?.state || "Karnataka",
                country: item.address?.country || "India",
                type: "locality",
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lon),
              }));

              // Combine unique results
              setSuggestions((prev) => {
                const existingIds = new Set(prev.map((p) => p.name.toLowerCase()));
                const filteredOnline = onlineItems.filter((o) => !existingIds.has(o.name.toLowerCase()));
                return [...prev, ...filteredOnline].slice(0, 8);
              });
            }
          }
        } catch {
          // Keep local suggestions on network error
        }
      }
    }, 280);
  };

  const handleSelectLocation = (loc: LocationItem) => {
    const formatted = loc.locality && loc.locality !== loc.name
      ? `${loc.name}, ${loc.city}, ${loc.state}`
      : `${loc.name}, ${loc.state}`;

    setInputValue(formatted);
    onChange(formatted, loc);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  // Live Location ("Use Current Location")
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // Reverse geocode with OpenStreetMap Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { headers: { "Accept-Language": "en" } }
          );

          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const area =
              addr.suburb ||
              addr.neighbourhood ||
              addr.residential ||
              addr.road ||
              addr.city_district ||
              "Current Location";
            const city = addr.city || addr.town || addr.village || addr.state_district || "Bengaluru";
            const state = addr.state || "Karnataka";

            const formattedAddress = `${area}, ${city}, ${state}`;
            const structuredLoc: LocationItem = {
              id: `geo-${Date.now()}`,
              name: area,
              locality: area,
              city,
              district: addr.state_district,
              state,
              country: addr.country || "India",
              type: "locality",
              lat: latitude,
              lng: longitude,
            };

            setInputValue(formattedAddress);
            onChange(formattedAddress, structuredLoc);
            setIsOpen(false);
          } else {
            fallbackNearestLocation(latitude, longitude);
          }
        } catch {
          fallbackNearestLocation(latitude, longitude);
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError("Location permission was denied. Please enter your location manually.");
        } else {
          setLocationError("Unable to detect your live location. Please enter manually.");
        }
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  // Nearest fallback calculation
  const fallbackNearestLocation = (lat: number, lng: number) => {
    let nearest = SOUTH_INDIA_LOCATIONS[0];
    let minDistance = Infinity;

    for (const loc of SOUTH_INDIA_LOCATIONS) {
      if (loc.lat && loc.lng) {
        const dist = Math.hypot(loc.lat - lat, loc.lng - lng);
        if (dist < minDistance) {
          minDistance = dist;
          nearest = loc;
        }
      }
    }

    const formatted = `${nearest.name}, ${nearest.city}, ${nearest.state}`;
    setInputValue(formatted);
    onChange(formatted, nearest);
    setIsOpen(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        if (suggestions.length === 0) {
          setSuggestions(searchLocations(inputValue, 6));
        }
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelectLocation(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const getCategoryIcon = (type: LocationItem["type"]) => {
    switch (type) {
      case "airport":
        return <Plane className="h-4 w-4 text-sky-600 shrink-0" />;
      case "transit":
        return <Train className="h-4 w-4 text-purple-600 shrink-0" />;
      case "tourist":
        return <Palmtree className="h-4 w-4 text-emerald-600 shrink-0" />;
      case "city":
        return <Building2 className="h-4 w-4 text-amber-600 shrink-0" />;
      default:
        return <MapPin className="h-4 w-4 text-blue-600 shrink-0" />;
    }
  };

  return (
    <div ref={containerRef} className={`relative flex flex-col ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Left Icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          {iconType === "pickup" ? (
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
          ) : iconType === "drop" ? (
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-amber-100" />
          ) : (
            <MapPin className="h-4 w-4 text-slate-400" />
          )}
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="text"
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            if (suggestions.length === 0) {
              setSuggestions(searchLocations(inputValue, 6));
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full h-11 sm:h-12 pl-10 pr-10 rounded-xl sm:rounded-2xl border ${
            error ? "border-red-400 ring-1 ring-red-400" : "border-slate-200 focus:border-[#155EEF] focus:ring-2 focus:ring-blue-100"
          } bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 transition-all outline-none ${inputClassName}`}
        />

        {/* Clear Button */}
        {inputValue && (
          <button
            type="button"
            aria-label="Clear location"
            onClick={() => {
              setInputValue("");
              onChange("", null);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Location Error Message */}
      {locationError && (
        <div className="mt-1 text-[11px] text-amber-700 font-medium px-1 flex items-center gap-1">
          <span>⚠️ {locationError}</span>
        </div>
      )}

      {/* Field Validation Error */}
      {error && (
        <div className="mt-1 text-[11px] text-red-600 font-bold px-1">
          {error}
        </div>
      )}

      {/* ── AUTOCOMPLETE DROPDOWN ── */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-2xl max-h-72 overflow-y-auto divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Live Location Option */}
          {allowCurrentLocation && (
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="w-full px-4 py-3 flex items-center gap-3 bg-blue-50/60 hover:bg-blue-100/70 text-left text-xs sm:text-sm font-extrabold text-[#155EEF] transition-colors border-b border-blue-100 group"
            >
              {isLocating ? (
                <Loader2 className="h-4 w-4 text-[#155EEF] animate-spin" />
              ) : (
                <div className="h-7 w-7 rounded-lg bg-blue-600 text-white grid place-items-center shadow-sm group-hover:scale-105 transition-transform">
                  <Navigation className="h-3.5 w-3.5 fill-white" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span>{isLocating ? "Detecting Live Location..." : "Use My Current Location"}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-200/60 text-blue-800 px-1.5 py-0.2 rounded">
                    GPS
                  </span>
                </div>
                <div className="text-[10px] font-normal text-blue-600">Detect automatically via device sensor</div>
              </div>
            </button>
          )}

          {/* Suggestions List */}
          {suggestions.length > 0 ? (
            suggestions.map((loc, idx) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => handleSelectLocation(loc)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                  activeIndex === idx ? "bg-slate-100 text-[#071525]" : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="h-8 w-8 rounded-xl bg-slate-100 grid place-items-center shrink-0">
                  {getCategoryIcon(loc.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-[#071525] truncate">
                    {loc.name}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                    {loc.locality && loc.locality !== loc.name ? `${loc.locality}, ` : ""}
                    {loc.city}, {loc.state}
                  </div>
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                  {loc.type}
                </span>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-center text-xs text-slate-500">
              No matching locations found. You can still type custom pickup/drop details.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
