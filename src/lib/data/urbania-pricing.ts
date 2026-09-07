export type UrbaniaCategory = "Luxury / Maharaja" | "Premium";

export type FeatureDetail = {
  title: string;
  subtitle: string;
  icon: string;
};

export interface UrbaniaFleetRate {
  id: string;
  name: string;
  slug: string;
  category: UrbaniaCategory;
  seating_capacity: number;
  seating_layout: string; // e.g. "(4-2-2-2)"
  image: string;
  gallery?: string[];
  description: string;
  features: string[];
  detailed_features: FeatureDetail[];
  ideal_for: string[];
  ac: boolean;
  professional_driver: boolean;
  luggage_info: string;
  
  // Local Pricing
  local_8hr_80km: number | null; // e.g., 5000 or null if rate on request
  local_12hr_100km: number | null; // e.g., 6500 or null
  extra_km: number | null; // e.g., 33 or null
  extra_hour: number | null; // e.g., 500 or null

  // Outstation Pricing
  outstation_per_km: number | null; // e.g., 33 or null
  outstation_min_km_per_day: number; // default 300
  driver_allowance: number; // default 700

  // Additional Charges & Policies
  night_charges?: number | string;
  airport_transfer_rate?: number | string;
  toll_policy: string;
  parking_policy: string;
  permit_policy: string;
  gst_policy: string;
  other_notes?: string;

  is_active: boolean;
  display_order: number;
}

export const INITIAL_URBANIA_RATES: UrbaniaFleetRate[] = [
  // ── 1. PREMIUM 10 SEATER (4-2-2-2) ─────────────────────────────────────────
  {
    id: "urb-prem-10",
    name: "PREMIUM 10 SEATER",
    slug: "10-seater-urbania",
    category: "Premium",
    seating_capacity: 10,
    seating_layout: "(4-2-2-2)",
    image: "/images/fleets/urbania-maharaja-10-seater.jpg",
    gallery: [
      "/images/fleets/urbania-maharaja-10-seater.jpg",
      "/images/fleets/urbania-maharaja-10-seater-interior.jpg",
    ],
    description: "Executive 10-seater Force Urbania with plush pushback recliners, individual AC vents, and ambient LED cabin lighting in a 4-2-2-2 seating configuration.",
    features: [
      "Plush Seating (Reclining)",
      "Personalized Airflow AC Vents",
      "Device USB Charging Ports",
      "Intelligent Safety (ABS, Hill Hold)",
      "Generous Luggage Space",
      "Skilled Professional Chauffeurs",
    ],
    detailed_features: [
      {
        title: "Plush Seating",
        subtitle: "Well-cushioned reclining seats with generous legroom, offering a relaxed and comfortable ride on every journey.",
        icon: "💺",
      },
      {
        title: "Personalized Airflow",
        subtitle: "Dedicated AC vents for each passenger provide consistent cooling and individual comfort in every season.",
        icon: "❄️",
      },
      {
        title: "Device Charging",
        subtitle: "Convenient USB charging ports are available throughout the cabin to keep everyone's devices powered.",
        icon: "🔋",
      },
      {
        title: "Intelligent Safety",
        subtitle: "Equipped with ABS, Hill Hold Assist, and modern safety technologies for a confident and secure travel experience.",
        icon: "🛡️",
      },
      {
        title: "Generous Luggage Space",
        subtitle: "Large storage area accommodates suitcases and travel essentials, making it ideal for airport and outstation trips.",
        icon: "🧳",
      },
      {
        title: "Skilled Chauffeurs",
        subtitle: "Professional, well-trained drivers with excellent route knowledge ensure a smooth and reliable journey.",
        icon: "👨‍✈️",
      },
    ],
    ideal_for: [
      "Small families",
      "Airport transfers",
      "Executive travel",
      "Corporate meetings",
      "Business delegations",
      "Sightseeing tours",
      "Premium outstation trips with up to 10 passengers",
    ],
    ac: true,
    professional_driver: true,
    luggage_info: "Large Luggage Boot",
    local_8hr_80km: 5000,
    local_12hr_100km: 6500,
    extra_km: 33,
    extra_hour: 500,
    outstation_per_km: 33,
    outstation_min_km_per_day: 300,
    driver_allowance: 700,
    night_charges: 300,
    airport_transfer_rate: 3500,
    toll_policy: "Extra as per actual receipts",
    parking_policy: "Extra as per actual receipts",
    permit_policy: "State Tax / Entry Permit Extra at actuals",
    gst_policy: "GST Extra as applicable (5%)",
    other_notes: "Billing is calculated from garage to garage.",
    is_active: true,
    display_order: 1,
  },

  // ── 2. PREMIUM 12 SEATER (4-3-3-2) ─────────────────────────────────────────
  {
    id: "urb-prem-12",
    name: "PREMIUM 12 SEATER",
    slug: "12-seater-urbania",
    category: "Premium",
    seating_capacity: 12,
    seating_layout: "(4-3-3-2)",
    image: "/images/fleets/urbania-12-seater-v2.jpg",
    gallery: [
      "/images/fleets/urbania-12-seater-v2.jpg",
      "/images/fleets/urbania-12-seater-interior-v2.jpg",
    ],
    description: "Spacious 12-seater Force Urbania with 4-3-3-2 ergonomic seating layout, premium recliners, and efficient dual-zone climate control.",
    features: [
      "Ergonomic Lumbar Support Recliners",
      "Smart Dual-Zone Climate Control",
      "Stay Connected USB & Power Ports",
      "Comprehensive ABS/EBD Protection",
      "Refined High-Performance Engine",
      "Spacious Luggage Compartment",
    ],
    detailed_features: [
      {
        title: "Ergonomic Comfort",
        subtitle: "Premium reclining seats with enhanced lumbar support and spacious legroom for fatigue-free long-distance travel.",
        icon: "💺",
      },
      {
        title: "Smart Climate Control",
        subtitle: "Efficient dual-zone air conditioning with individual vents keeps every passenger comfortable throughout the trip.",
        icon: "🌡️",
      },
      {
        title: "Stay Connected",
        subtitle: "USB charging ports and power outlets allow passengers to conveniently charge phones, tablets, and other devices.",
        icon: "🔌",
      },
      {
        title: "Comprehensive Protection",
        subtitle: "Advanced safety systems including ABS, EBD, Hill Hold Assist, and three-point seat belts for every passenger.",
        icon: "🛡️",
      },
      {
        title: "Refined Performance",
        subtitle: "Powerful engine and smooth transmission deliver effortless performance across city roads and highways alike.",
        icon: "⚙️",
      },
      {
        title: "Spacious Storage",
        subtitle: "A roomy luggage compartment provides ample space for bags and travel essentials during extended journeys.",
        icon: "🧳",
      },
    ],
    ideal_for: [
      "Medium-sized family vacations",
      "Wedding guest transportation",
      "Corporate team travel",
      "Pilgrimage tours",
      "Weekend getaways",
      "Airport transfers with extra luggage",
    ],
    ac: true,
    professional_driver: true,
    luggage_info: "Roomy Rear Cargo Boot",
    local_8hr_80km: 5500,
    local_12hr_100km: 7000,
    extra_km: 36,
    extra_hour: 550,
    outstation_per_km: 36,
    outstation_min_km_per_day: 300,
    driver_allowance: 700,
    night_charges: 300,
    airport_transfer_rate: 4000,
    toll_policy: "Extra as per actual receipts",
    parking_policy: "Extra as per actual receipts",
    permit_policy: "State Tax / Entry Permit Extra at actuals",
    gst_policy: "GST Extra as applicable (5%)",
    other_notes: "Billing is calculated from garage to garage.",
    is_active: true,
    display_order: 2,
  },

  // ── 3. PREMIUM 16 SEATER (MODIFIED) (4-3-3-3-3) ───────────────────────────
  {
    id: "urb-prem-16",
    name: "PREMIUM 16 SEATER (MODIFIED)",
    slug: "16-seater-urbania",
    category: "Premium",
    seating_capacity: 16,
    seating_layout: "(4-3-3-3-3)",
    image: "/images/fleets/urbania-16-seater.jpg",
    gallery: [
      "/images/fleets/urbania-16-seater.jpg",
      "/images/fleets/urbania-16-seater-interior-v2.jpg",
    ],
    description: "High-capacity custom-modified 16-seater Force Urbania featuring elegant 4-3-3-3-3 layout, ambient roof lighting, immersive audio, and wide center walkway.",
    features: [
      "Custom Premium Cabin Design",
      "Superior Padded Reclining Comfort",
      "Immersive Sound & Audio System",
      "High-Capacity Dual Evaporator Cooling",
      "Personal Charging Access at All Seats",
      "Spacious Wide Center Walkway",
    ],
    detailed_features: [
      {
        title: "Premium Cabin Design",
        subtitle: "Custom-built interiors featuring elegant upholstery and ambient lighting create a refined travel atmosphere.",
        icon: "✨",
      },
      {
        title: "Superior Seating Comfort",
        subtitle: "Extra-padded reclining seats with improved support ensure exceptional comfort during longer journeys.",
        icon: "💺",
      },
      {
        title: "Immersive Audio",
        subtitle: "Upgraded sound system delivers rich audio quality, enhancing the onboard entertainment experience.",
        icon: "🎵",
      },
      {
        title: "High-Capacity Cooling",
        subtitle: "Powerful air conditioning maintains a pleasant cabin temperature even during hot summer travel.",
        icon: "❄️",
      },
      {
        title: "Personal Charging Access",
        subtitle: "Convenient charging ports are available for every passenger to keep electronic devices ready throughout the trip.",
        icon: "🔋",
      },
      {
        title: "Spacious Walkway",
        subtitle: "Wide center aisle allows effortless movement inside the vehicle while improving passenger convenience.",
        icon: "🚶",
      },
    ],
    ideal_for: [
      "Large family gatherings",
      "Destination weddings",
      "Corporate outings",
      "School and college groups",
      "Sightseeing tours",
      "Pilgrimage travel",
      "Long-distance group journeys requiring maximum comfort",
    ],
    ac: true,
    professional_driver: true,
    luggage_info: "Large Boot & Roof Carrier Option",
    local_8hr_80km: 6500,
    local_12hr_100km: 8000,
    extra_km: 40,
    extra_hour: 650,
    outstation_per_km: 40,
    outstation_min_km_per_day: 300,
    driver_allowance: 800,
    night_charges: 400,
    airport_transfer_rate: 4500,
    toll_policy: "Extra as per actual receipts",
    parking_policy: "Extra as per actual receipts",
    permit_policy: "State Tax / Entry Permit Extra at actuals",
    gst_policy: "GST Extra as applicable (5%)",
    other_notes: "Billing is calculated from garage to garage.",
    is_active: true,
    display_order: 3,
  },

  // ── 4. LUXURY 9 SEATER MAHARAJA (3-2-2-2) ──────────────────────────────────
  {
    id: "urb-mah-9",
    name: "LUXURY 9 SEATER MAHARAJA",
    slug: "9-seater-luxury-urbania",
    category: "Luxury / Maharaja",
    seating_capacity: 9,
    seating_layout: "(3-2-2-2)",
    image: "/images/fleets/urbania-9-seater-luxury.jpg",
    gallery: [
      "/images/fleets/urbania-9-seater-luxury.jpg",
      "/images/fleets/urbania-9-seater-luxury-interior.jpg",
    ],
    description: "First-class executive 9-seater Maharaja Urbania with 3-2-2-2 seating layout, royal leather recliners, multi-zone climate control, LCD entertainment, and ambient mood lighting.",
    features: [
      "Executive Leather Reclining Seats",
      "Individual Multi-Zone Climate Comfort",
      "Luxury Audio, Wi-Fi & LCD Screens",
      "Premium USB & Wireless Docks",
      "Elite ABS/EBD Airbag Safety Systems",
      "Refined Ambient Lighting & Privacy Glass",
    ],
    detailed_features: [
      {
        title: "Executive Leather Seating",
        subtitle: "Premium leather reclining seats with plush cushioning, adjustable headrests, and generous space for every passenger.",
        icon: "👑",
      },
      {
        title: "Individual Climate Comfort",
        subtitle: "Multi-zone air conditioning allows personalized temperature settings, ensuring maximum comfort throughout the cabin.",
        icon: "🌡️",
      },
      {
        title: "Luxury Entertainment",
        subtitle: "Premium audio, Bluetooth connectivity, Wi-Fi, and LCD displays keep passengers entertained during every journey.",
        icon: "🎬",
      },
      {
        title: "Premium Connectivity",
        subtitle: "USB charging ports, wireless charging pads, and power outlets keep all your devices fully powered on the go.",
        icon: "⚡",
      },
      {
        title: "Elite Safety Systems",
        subtitle: "Advanced features including ABS, EBD, multiple airbags, electronic stability control, and intelligent driver assistance.",
        icon: "🛡️",
      },
      {
        title: "Refined Luxury",
        subtitle: "Ambient lighting, privacy glass, and premium interior finishes create an exclusive first-class travel experience.",
        icon: "✨",
      },
    ],
    ideal_for: [
      "VIP travel",
      "Luxury family vacations",
      "Business executives",
      "Celebrity transportation",
      "Airport transfers",
      "Honeymoon trips",
      "Golf outings",
      "Guests seeking a first-class travel experience",
    ],
    ac: true,
    professional_driver: true,
    luggage_info: "6 Large Suitcases + Boot Space",
    local_8hr_80km: 4800,
    local_12hr_100km: 6000,
    extra_km: 32,
    extra_hour: 450,
    outstation_per_km: 32,
    outstation_min_km_per_day: 300,
    driver_allowance: 700,
    night_charges: 300,
    airport_transfer_rate: 3500,
    toll_policy: "Extra as per actual receipts",
    parking_policy: "Extra as per actual receipts",
    permit_policy: "State Tax / Entry Permit Extra at actuals",
    gst_policy: "GST Extra as applicable (5%)",
    other_notes: "Billing is calculated from garage to garage.",
    is_active: true,
    display_order: 4,
  },

  // ── 5. LUXURY 10 SEATER MAHARAJA (2-2-2-2-2) ───────────────────────────────
  {
    id: "urb-mah-10",
    name: "LUXURY 10 SEATER MAHARAJA",
    slug: "10-seater-maharaja-urbania",
    category: "Luxury / Maharaja",
    seating_capacity: 10,
    seating_layout: "(2-2-2-2-2)",
    image: "/images/fleets/urbania-maharaja-10-seater.jpg",
    gallery: [
      "/images/fleets/urbania-maharaja-10-seater.jpg",
      "/images/fleets/urbania-maharaja-10-seater-interior.jpg",
    ],
    description: "Royal 10-seater Maharaja edition with 2-2-2-2 layout, plush recliner seats, dual-zone intelligent climate vents, high-end media system, and expansive luggage space.",
    features: [
      "Luxury Recliner Seats & Headrests",
      "Intelligent Dual-Zone Climate Control",
      "Premium Sound & HD Media Displays",
      "Convenient Multi-Point Charging",
      "Advanced Hill-Start & ABS Protection",
      "Large Expansive Storage Capacity",
    ],
    detailed_features: [
      {
        title: "Luxury Recliner Seats",
        subtitle: "Premium reclining seats with enhanced cushioning, supportive headrests, and spacious legroom for exceptional comfort.",
        icon: "👑",
      },
      {
        title: "Intelligent Climate Control",
        subtitle: "Dual-zone air conditioning with individual vents delivers balanced cooling across the entire cabin.",
        icon: "❄️",
      },
      {
        title: "Premium Media System",
        subtitle: "High-quality sound system with Bluetooth connectivity and LCD displays offers enjoyable onboard entertainment.",
        icon: "🎵",
      },
      {
        title: "Convenient Charging",
        subtitle: "Multiple USB charging ports and power outlets ensure your devices remain charged throughout the journey.",
        icon: "🔌",
      },
      {
        title: "Advanced Protection",
        subtitle: "Equipped with ABS, EBD, airbags, hill-start assist, and modern safety technologies for complete peace of mind.",
        icon: "🛡️",
      },
      {
        title: "Large Luggage Capacity",
        subtitle: "Expansive storage space easily accommodates luggage for every passenger on long-distance trips.",
        icon: "🧳",
      },
    ],
    ideal_for: [
      "Premium corporate travel",
      "Executive board meetings",
      "Luxury family holidays",
      "Hotel guest transfers",
      "High-profile events",
      "Airport pickups",
      "Clients who expect exceptional comfort and style",
    ],
    ac: true,
    professional_driver: true,
    luggage_info: "Large Luggage Cargo Boot",
    local_8hr_80km: 6000,
    local_12hr_100km: 7500,
    extra_km: 38,
    extra_hour: 500,
    outstation_per_km: 38,
    outstation_min_km_per_day: 300,
    driver_allowance: 700,
    night_charges: 400,
    airport_transfer_rate: 4200,
    toll_policy: "Extra as per actual receipts",
    parking_policy: "Extra as per actual receipts",
    permit_policy: "State Tax / Entry Permit Extra at actuals",
    gst_policy: "GST Extra as applicable (5%)",
    other_notes: "Billing is calculated from garage to garage.",
    is_active: true,
    display_order: 5,
  },

  // ── 6. LUXURY 12 SEATER MAHARAJA (3-2-2-2-2-1) ─────────────────────────────
  {
    id: "urb-mah-12",
    name: "LUXURY 12 SEATER MAHARAJA",
    slug: "12-seater-maharaja-urbania",
    category: "Luxury / Maharaja",
    seating_capacity: 12,
    seating_layout: "(3-2-2-2-2-1)",
    image: "/images/fleets/urbania-maharaja-12-seater.jpg",
    gallery: [
      "/images/fleets/urbania-maharaja-12-seater.jpg",
      "/images/fleets/urbania-maharaja-12-seater-interior.jpg",
    ],
    description: "The pinnacle of luxury group travel. 12-seater Maharaja van with 3-2-2-2-2-1 layout, signature Italian leather recliners, personalized multi-zone climate, smart charging docks, and executive interior craftsmanship.",
    features: [
      "Signature Italian Leather Recliners",
      "Personalized Multi-Zone Climate System",
      "Premium Entertainment Hub & Screens",
      "Smart USB & Wireless Charging Solutions",
      "Complete Safety Package (ABS, EBD, ESC)",
      "Executive Privacy & Wood Finish Interior",
    ],
    detailed_features: [
      {
        title: "Signature Leather Seating",
        subtitle: "Premium leather recliners with luxurious cushioning, adjustable headrests, and spacious seating for all passengers.",
        icon: "👑",
      },
      {
        title: "Personalized Climate System",
        subtitle: "Advanced multi-zone air conditioning ensures every passenger enjoys their preferred level of comfort.",
        icon: "🌡️",
      },
      {
        title: "Premium Entertainment Hub",
        subtitle: "High-quality audio, Bluetooth, Wi-Fi, and strategically positioned LCD screens enhance every journey.",
        icon: "🎬",
      },
      {
        title: "Smart Charging Solutions",
        subtitle: "USB charging ports, wireless charging, and power outlets keep phones, laptops, and other devices ready for use.",
        icon: "⚡",
      },
      {
        title: "Complete Safety Package",
        subtitle: "Comprehensive protection with ABS, EBD, multiple airbags, electronic stability control, and advanced driver assistance.",
        icon: "🛡️",
      },
      {
        title: "Executive Interior Finish",
        subtitle: "Ambient lighting, privacy glass, and premium craftsmanship provide a sophisticated luxury travel environment.",
        icon: "✨",
      },
    ],
    ideal_for: [
      "Luxury group vacations",
      "Destination weddings",
      "VIP guest transportation",
      "Corporate delegations",
      "International tourist groups",
      "Premium pilgrimage tours",
      "Executive team travel with superior comfort",
    ],
    ac: true,
    professional_driver: true,
    luggage_info: "8-10 Large Luggage Suitcases",
    local_8hr_80km: 6800,
    local_12hr_100km: 8500,
    extra_km: 42,
    extra_hour: 550,
    outstation_per_km: 42,
    outstation_min_km_per_day: 300,
    driver_allowance: 700,
    night_charges: 400,
    airport_transfer_rate: 4800,
    toll_policy: "Extra as per actual receipts",
    parking_policy: "Extra as per actual receipts",
    permit_policy: "State Tax / Entry Permit Extra at actuals",
    gst_policy: "GST Extra as applicable (5%)",
    other_notes: "Billing is calculated from garage to garage.",
    is_active: true,
    display_order: 6,
  },
];

const LOCAL_STORAGE_KEY = "st_urbania_fleet_rates_v4";

/**
 * Load Urbania rates from local storage if edited in Admin, else fallback to initial published data.
 */
export function getUrbaniaRates(): UrbaniaFleetRate[] {
  if (typeof window === "undefined") return INITIAL_URBANIA_RATES;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load saved Urbania rates:", e);
  }
  return INITIAL_URBANIA_RATES;
}

/**
 * Save updated Urbania rates from Admin portal.
 */
export function saveUrbaniaRates(rates: UrbaniaFleetRate[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rates));
  } catch (e) {
    console.error("Failed to save Urbania rates:", e);
  }
}

/**
 * Reset rates back to official published defaults.
 */
export function resetUrbaniaRates(): UrbaniaFleetRate[] {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
  return INITIAL_URBANIA_RATES;
}

/**
 * Outstation fare estimation calculator
 */
export function calculateOutstationEstimate(params: {
  fleet: UrbaniaFleetRate;
  estimatedKm: number;
  days: number;
  isRoundTrip: boolean;
}): {
  billableKm: number;
  kmCost: number | null;
  driverAllowanceTotal: number;
  estimatedTotal: number | null;
  hasRate: boolean;
  notes: string[];
} {
  const { fleet, estimatedKm, days, isRoundTrip } = params;
  const minKmPerDay = fleet.outstation_min_km_per_day || 300;
  const driverAllowancePerDay = fleet.driver_allowance || 700;

  // Total min km required for the trip
  const minRequiredKm = minKmPerDay * Math.max(1, days);
  // Actual billable km is max of estimated km or minimum daily requirement
  const billableKm = Math.max(estimatedKm, minRequiredKm);

  const driverAllowanceTotal = driverAllowancePerDay * Math.max(1, days);

  if (fleet.outstation_per_km !== null && fleet.outstation_per_km > 0) {
    const kmCost = billableKm * fleet.outstation_per_km;
    const estimatedTotal = kmCost + driverAllowanceTotal;
    return {
      billableKm,
      kmCost,
      driverAllowanceTotal,
      estimatedTotal,
      hasRate: true,
      notes: [
        `Min billing ${minKmPerDay} KM/day (${minRequiredKm} KM for ${days} day${days > 1 ? "s" : ""})`,
        `Driver Allowance: ₹${driverAllowancePerDay}/day (Total ₹${driverAllowanceTotal})`,
        "Toll, Parking, State Permits & GST extra at actuals",
        isRoundTrip ? "Round Trip Billing" : "One-Way Rental (Available on Request)",
      ],
    };
  }

  return {
    billableKm,
    kmCost: null,
    driverAllowanceTotal,
    estimatedTotal: null,
    hasRate: false,
    notes: [
      `Minimum billing rule: ${minKmPerDay} KM/day`,
      `Driver Allowance: ₹${driverAllowancePerDay}/day`,
      "Outstation rate on request — Contact reservation desk for exact quotation",
    ],
  };
}
