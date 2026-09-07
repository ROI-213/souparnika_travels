export const SITE = {
  name: "Souparnika Travels",
  brandName: "Souparnika Travels",
  tagline: "Luxury Vehicle & Force Urbania Rentals Bangalore",
  description:
    "Bangalore's #1 premium Force Urbania, Tempo Traveller, and luxury coach rental provider for corporate events, weddings, airport transfers, local travel, and outstation tours.",
  phone: "+91 90086 44559",
  phoneRaw: "+919008644559",
  altPhone: "+91 99167 77769",
  altPhoneRaw: "+919916777769",
  supportPhone: "+91 99011 03869",
  supportPhoneRaw: "+919901103869",
  whatsapp: "919008644559",
  email: "urbaniarentalsblr@gmail.com",
  supportEmail: "urbaniarentalsblr@gmail.com",
  alternateWebsite: "www.urbaniarentalsbengaluru.com",
  alternateWebsiteUrl: "https://www.urbaniarentalsbengaluru.com",
  address: "#109, Malleswaram 11th cross pipeline road. Bangalore-560003",
  hours: "24 x 7 Booking & Customer Support",
  mapsUrl:
    "https://www.google.com/maps?client=opera-gx&hs=eEd&sca_esv=a6e07816c90ab268&sxsrf=APpeQnv6R6BfuAxcP47MEH4rQ8bB67Z8PA:1786081832647&mat=CeFDewbefiqr&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KUu3swp5SitmMSm3EXhL6t3f&daddr=109,+Vyalikaval,+Kodandarampura,+Malleshwaram,+Bengaluru,+Karnataka+560003",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=109%2C+Vyalikaval%2C+Kodandarampura%2C+Malleshwaram%2C+Bengaluru%2C+Karnataka+560003&t=&z=15&ie=UTF-8&iwloc=&output=embed",
  social: {
    facebook: "https://facebook.com/urbaniarentalsbangalore",
    instagram: "https://instagram.com/urbaniarentalsbangalore",
    youtube: "https://youtube.com/@urbaniarentalsbangalore",
    linkedin: "https://linkedin.com/company/urbaniarentalsbangalore",
  },
};

export const URBANIA_MODELS = [
  { label: "9 Seater Maharaja Urbania", slug: "9-seater-luxury-urbania", category: "Urbania", seating: 9, price: "₹32/km" },
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

export const FLEETS_DROPDOWN_ITEMS = [
  { label: "Toyota Innova Crysta", slug: "innova-crysta", desc: "7-Seater Premium MPV" },
  { label: "Toyota Innova Hycross Hybrid", slug: "innova-hycross-hybrid", desc: "7-Seater Hybrid Luxury MPV" },
  { label: "Toyota Fortuner", slug: "fortuner", desc: "7-Seater Premium SUV" },
  { label: "Ertiga", slug: "ertiga", desc: "6+1 Seater Comfortable MUV" },
] as const;

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/fleets", label: "Urbania", dropdownType: "urbania" },
  { to: "/fleets", label: "Tempo Travellers", dropdownType: "tempo" },
  { to: "/fleets", label: "Fleets", dropdownType: "fleets" },
  { to: "/services", label: "Services", dropdownType: "services" },
  { to: "/areas", label: "Areas We Serve" },
  { to: "/packages", label: "Tour Packages", dropdownType: "destinations" },
  { to: "/about-us", label: "About" },
  { to: "/contact-us", label: "Contact" },
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
  "9 Seater Maharaja",
  "10 Seater Maharaja",
  "12 Seater Maharaja",
  "10 Seater Premium",
  "12 Seater Premium",
  "16 Seater Modified",
  "Toyota Fortuner",
  "Innova Crysta",
  "Innova Hycross Hybrid",
  "Sedan",
  "SUV",
  "Tempo Traveller",
  "Mini Bus",
  "Luxury Coach",
] as const;

export const waLink = (msg = "Hi, I'd like to enquire about renting a vehicle with Souparnika Travels.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
export const telLink = (raw = SITE.phoneRaw) => `tel:${raw}`;

