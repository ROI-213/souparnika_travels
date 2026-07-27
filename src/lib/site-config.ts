export const SITE = {
  name: "Souparnika Travels",
  tagline: "Travel Comfortably with Souparnika Travels",
  description:
    "Bengaluru's trusted travel partner for outstation cabs, local rentals, airport transfers and curated South India tour packages.",
  phone: "+91 98450 12345",
  phoneRaw: "+919845012345",
  supportPhone: "+91 98450 67890",
  supportPhoneRaw: "+919845067890",
  whatsapp: "919845012345",
  email: "hello@souparnikatravels.com",
  supportEmail: "support@souparnikatravels.com",
  address: "#12, 1st Main Road, Rajajinagar, Bengaluru, Karnataka 560010",
  hours: "24 x 7 Customer Support",
  mapsUrl: "https://maps.google.com/?q=Rajajinagar+Bengaluru",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Rajajinagar%2C+Bengaluru%2C+Karnataka&output=embed",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  },
};

export const NAV_LINKS = [
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Packages" },
  { to: "/experiences", label: "Experiences" },
  { to: "/about-us", label: "About Us" },
  { to: "/travel-info", label: "Travel Info" },
  { to: "/contact-us", label: "Contact" },
] as const;

export const TRIP_TYPES = [
  "Local Travel",
  "Airport Transfer",
  "Outstation",
  "One-Way",
  "Round Trip",
  "Corporate Travel",
  "Family Trip",
  "Group Tour",
  "Wedding Transportation",
  "Customized Package",
] as const;

export const VEHICLE_TYPES = [
  "Sedan",
  "SUV / Innova",
  "Tempo Traveller",
  "Luxury Van",
  "Luxury Sedan",
  "Bus",
] as const;

export const waLink = (msg = "Hi, I'd like to enquire about a trip.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
export const telLink = (raw = SITE.phoneRaw) => `tel:${raw}`;
