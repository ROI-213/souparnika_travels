export const SITE = {
  name: "Souparnika Travels",
  brandName: "Souparnika Travels",
  tagline: "Luxury Vehicle & Force Urbania Rentals Bangalore",
  description:
    "Bangalore's #1 premium Force Urbania, Tempo Traveller, and luxury coach rental provider for corporate events, weddings, airport transfers, local travel, and outstation tours.",
  phone: "+91 97407 96070",
  phoneRaw: "+919740796070",
  altPhone: "+91 97405 25656",
  altPhoneRaw: "+919740525656",
  supportPhone: "+91 63615 07060",
  supportPhoneRaw: "+916361507060",
  whatsapp: "919740796070",
  email: "info@urbaniarentalsbangalore.com",
  supportEmail: "support@urbaniarentalsbangalore.com",
  address: "MG Road, Indiranagar, Bengaluru, Karnataka 560001",
  hours: "24 x 7 Booking & Customer Support",
  mapsUrl: "https://maps.google.com/?q=MG+Road+Bangalore",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=MG+Road%2C+Bangalore%2C+Karnataka&output=embed",
  social: {
    facebook: "https://facebook.com/urbaniarentalsbangalore",
    instagram: "https://instagram.com/urbaniarentalsbangalore",
    youtube: "https://youtube.com/@urbaniarentalsbangalore",
    linkedin: "https://linkedin.com/company/urbaniarentalsbangalore",
  },
};

export const URBANIA_MODELS = [
  { label: "9 Seater Luxury Urbania", slug: "9-seater-luxury-urbania", category: "Urbania", seating: 9, price: "₹32/km" },
  { label: "10 Seater Urbania", slug: "10-seater-urbania", category: "Urbania", seating: 10, price: "₹33/km" },
  { label: "10 Seater Luxury Urbania", slug: "10-seater-luxury-urbania", category: "Urbania", seating: 10, price: "₹35/km" },
  { label: "10 Seater Maharaja Urbania", slug: "10-seater-maharaja-urbania", category: "Urbania", seating: 10, price: "₹38/km" },
  { label: "12 Seater Urbania", slug: "12-seater-urbania", category: "Urbania", seating: 12, price: "₹36/km" },
  { label: "12 Seater Luxury Urbania", slug: "12-seater-luxury-urbania", category: "Urbania", seating: 12, price: "₹38/km" },
  { label: "12 Seater Maharaja Urbania", slug: "12-seater-maharaja-urbania", category: "Urbania", seating: 12, price: "₹42/km" },
  { label: "16 Seater Urbania", slug: "16-seater-urbania", category: "Urbania", seating: 16, price: "₹38/km" },
  { label: "16 Seater Modified Urbania", slug: "16-seater-modified-urbania", category: "Urbania", seating: 16, price: "₹40/km" },
] as const;

export const TEMPO_MODELS = [
  { label: "12 Seater Tempo Traveller", slug: "12-seater-tempo-traveller", category: "Tempo Traveller", seating: 12, price: "₹22/km" },
  { label: "9 Seater Tempo Traveller", slug: "9-seater-tempo-traveller", category: "Tempo Traveller", seating: 9, price: "₹20/km" },
] as const;

export const COACH_MODELS = [
  { label: "18 Seater Mini Coach", slug: "18-seater-coach", category: "Coach", seating: 18, price: "₹30/km" },
  { label: "21 Seater Mini Coach", slug: "21-seater-coach", category: "Coach", seating: 21, price: "₹32/km" },
  { label: "25 Seater Coach", slug: "25-seater-coach", category: "Coach", seating: 25, price: "₹35/km" },
  { label: "30 Seater Coach", slug: "30-seater-coach", category: "Coach", seating: 30, price: "₹38/km" },
  { label: "35 Seater Luxury Coach", slug: "35-seater-coach", category: "Coach", seating: 35, price: "₹42/km" },
  { label: "40 Seater Bus Coach", slug: "40-seater-coach", category: "Coach", seating: 40, price: "₹45/km" },
  { label: "45 Seater Volvo Coach", slug: "45-seater-coach", category: "Coach", seating: 45, price: "₹48/km" },
  { label: "50 Seater Scania Coach", slug: "50-seater-coach", category: "Coach", seating: 50, price: "₹52/km" },
] as const;

export const SERVICE_ITEMS = [
  { label: "Local City Rental", slug: "local-city-rental", desc: "4h, 8h & 12h Packages within Bangalore" },
  { label: "Outstation Trips", slug: "outstation-trips", desc: "Flexible per-km packages across South India" },
  { label: "Airport Transfer", slug: "airport-transfer", desc: "24/7 transfers to Kempegowda Intl Airport" },
  { label: "Corporate Travel", slug: "corporate-travel", desc: "Employee commute & delegate transportation" },
  { label: "Wedding Transportation", slug: "wedding-transportation", desc: "VIP guest movement & luxury car support" },
  { label: "Family & Group Tours", slug: "family-group-tours", desc: "Custom holiday packages with top comfort" },
  { label: "Luxury Fleet Support", slug: "luxury-fleet-support", desc: "Bespoke VIP delegate & travel desk support" },
] as const;

export const VEHICLE_DROPDOWN_CATEGORIES = [
  { label: "Force Urbania", category: "Urbania", slug: "force-urbania-luxury-van", desc: "9-16 Passengers · Executive Luxury" },
  { label: "Tempo Travellers", category: "Tempo Traveller", slug: "tempo-traveller-12-seater", desc: "9-20 Passengers · Group Favourite" },
  { label: "Mini & Luxury Coaches", category: "Coach", slug: "luxury-coach-50-seater", desc: "18-50 Passengers · Large Group Travel" },
  { label: "Luxury Cars", category: "Luxury", slug: "luxury-sedan", desc: "VIP & Wedding Transportation" },
] as const;

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/fleets", label: "Urbania", dropdownType: "urbania" },
  { to: "/fleets", label: "Tempo Traveller", dropdownType: "tempo" },
  { to: "/crysta", label: "Crysta" },
  { to: "/services", label: "Services", dropdownType: "services" },
  { to: "/packages", label: "Destinations", dropdownType: "destinations" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
] as const;

export const TRIP_TYPES = [
  "Local",
  "Outstation",
  "One Way",
  "Round Trip",
  "Airport Transfer",
  "Corporate",
  "Wedding",
  "Group Tour",
] as const;

export const VEHICLE_TYPES = [
  "Sedan (4 Seater)",
  "SUV (6-7 Seater)",
  "Innova Crysta (7 Seater)",
  "Force Urbania (10-17 Seater)",
  "Tempo Traveller (12-17 Seater)",
  "Mini Bus (21-32 Seater)",
  "Luxury Coach (50 Seater)",
  "Luxury Car",
] as const;

export const waLink = (msg = "Hi, I'd like to enquire about renting a vehicle with Souparnika Travels.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
export const telLink = (raw = SITE.phoneRaw) => `tel:${raw}`;

