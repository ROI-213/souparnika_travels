import type { Fleet, Package, Testimonial } from "../queries";

export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publish_date: string;
  read_time: string;
  featured_image: string;
  excerpt: string;
  content: string;
  meta_description: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};

export const DEFAULT_FLEETS: Fleet[] = [
  // ── URBANIA FLEETS ────────────────────────────────────────────────────────
  {
    id: "f-urb-10",
    slug: "10-seater-urbania",
    name: "10 Seater Force Urbania",
    category: "Urbania",
    seating: 10,
    luggage: "6 Large Bags + Rear Boot",
    ac: true,
    suitable_for: ["Outstation", "Corporate", "Airport Transfer", "Family Tour", "Wedding"],
    starting_price: 33,
    short_description: "Executive 10-seater Force Urbania with plush pushback recliners, individual AC vents, and ambient LED cabin lighting.",
    description: "The 10 Seater Force Urbania offers a world-class luxury road travel experience. Equipped with European-styled plush leatherette reclining seats, individual passenger AC controls, USB charging ports at every seat, panoramic sealed glass windows, wide legroom, and a high-roof standing aisle.",
    image_url: "/images/fleets/urbania-10-seater.jpg",
    gallery: [
      "/images/fleets/urbania-10-seater.jpg",
      "/images/fleets/urbania-12-seater.jpg",
      "/images/fleets/urbania-16-seater.jpg",
    ],
    features: [
      "10 Aircraft-Style Reclining Seats",
      "Individual Passenger AC Vents & Lamps",
      "USB Quick Charging at Every Seat",
      "Wide Panoramic Windows with Curtains",
      "High Ceiling Standing Room Aisle",
      "Professional Uniformed Highway Driver",
    ],
    is_featured: true,
    is_active: true,
    display_order: 1,
    model: "Force Urbania Executive 10 Seater",
    min_km: 300,
    per_km_rate: 33,
    driver_allowance: 700,
    additional_charges: "Tolls, Parking, Interstate Permit extra at actuals.",
    terms: "Minimum 300 km charged per calendar day for outstation trips. Driver day allowance covers 6 AM to 10 PM.",
    available_local: true,
    available_outstation: true,
  },
  {
    id: "f-urb-12",
    slug: "12-seater-urbania",
    name: "12 Seater Force Urbania",
    category: "Urbania",
    seating: 12,
    luggage: "8 Large Bags + Rear Cargo Area",
    ac: true,
    suitable_for: ["Outstation", "Corporate", "Airport Transfer", "Family Tour", "Pilgrimage"],
    starting_price: 36,
    short_description: "Spacious 12-seater Force Urbania with 2x1 seating layout, premium recliners, and powerful multi-zone AC.",
    description: "Ideal for family vacations and corporate delegations across South India. The 12 Seater Force Urbania combines whisper-quiet NVH insulation, smooth independent front suspension, individual reading lights, twin AC evaporators, and smart infotainment screens.",
    image_url: "/images/fleets/urbania-12-seater.jpg",
    gallery: [
      "/images/fleets/urbania-12-seater.jpg",
      "/images/fleets/urbania-10-seater.jpg",
      "/images/fleets/urbania-16-seater.jpg",
    ],
    features: [
      "2x1 Ergonomic Recliner Seating",
      "Dual Evaporator Air Conditioning",
      "Smart HD LED Screen & Sound System",
      "Spacious Aisle & Sealed Panoramic Glass",
      "Individual Passenger USB Sockets",
      "Senior Outstation Chauffeur",
    ],
    is_featured: true,
    is_active: true,
    display_order: 2,
    model: "Force Urbania Executive 12 Seater",
    min_km: 300,
    per_km_rate: 36,
    driver_allowance: 700,
    additional_charges: "Tolls, Parking, Interstate Permit extra at actuals.",
    terms: "Minimum 300 km daily outstation billing.",
    available_local: true,
    available_outstation: true,
  },
  {
    id: "f-urb-16",
    slug: "16-seater-urbania",
    name: "16 Seater Force Urbania",
    category: "Urbania",
    seating: 16,
    luggage: "10 Large Bags + Roof Carrier",
    ac: true,
    suitable_for: ["Outstation", "Group Tour", "Wedding", "Corporate Event"],
    starting_price: 38,
    short_description: "High-capacity 16-seater Force Urbania van offering supreme group comfort for outstation tours and events.",
    description: "Designed to transport large groups without compromising luxury. The 16 Seater Force Urbania features 16 plush pushback seats, individual AC blowers, wide window views, rear luggage space, and heavy-duty suspension built for smooth mountain driving.",
    image_url: "/images/fleets/urbania-16-seater.jpg",
    gallery: [
      "/images/fleets/urbania-16-seater.jpg",
      "/images/fleets/urbania-12-seater.jpg",
      "/images/fleets/urbania-10-seater.jpg",
    ],
    features: [
      "16 Comfortable Pushback Recliners",
      "Individual Passenger AC Control",
      "Heavy Luggage Boot & Roof Carrier",
      "Audio/Video Entertainment System",
      "ABS with Electronic Brakeforce Distribution",
      "Experienced Hill Highway Captain",
    ],
    is_featured: true,
    is_active: true,
    display_order: 3,
    model: "Force Urbania Long Wheelbase 16 Seater",
    min_km: 300,
    per_km_rate: 38,
    driver_allowance: 750,
    additional_charges: "Tolls, Parking, State Permits extra at actuals.",
    terms: "Minimum 300 km charged per calendar day.",
    available_local: true,
    available_outstation: true,
  },
  {
    id: "f-urb-16-mod",
    slug: "16-seater-modified-urbania",
    name: "16 Seater Urbania Modified",
    category: "Urbania",
    seating: 16,
    luggage: "12 Large Bags + Custom Boot",
    ac: true,
    suitable_for: ["VIP Travel", "Wedding", "Outstation", "Corporate Delegations"],
    starting_price: 40,
    short_description: "Custom modified 16-seater Urbania with Maharaja seats, ambient roof lighting, and extra legroom.",
    description: "Customized for luxury seekers. The 16 Seater Modified Urbania includes ultra-soft leather Maharaja recliner seats, star-light LED ceiling design, wooden finish floor panels, high-end JBL audio, and extra leg stretch room.",
    image_url: "/images/fleets/urbania-16-seater.jpg",
    gallery: [
      "/images/fleets/urbania-16-seater.jpg",
      "/images/fleets/urbania-12-seater.jpg",
    ],
    features: [
      "Custom Maharaja Soft Leather Recliners",
      "Starlight LED Ceiling & Ambient Glow",
      "Wooden Finish Flooring & Curtains",
      "High-end JBL Audio & Smart TV",
      "Individual Mobile Charging Docks",
      "Uniformed Chauffeur in Formals",
    ],
    is_featured: false,
    is_active: true,
    display_order: 4,
    model: "Force Urbania Modified 16 Seater",
    min_km: 300,
    per_km_rate: 40,
    driver_allowance: 800,
    additional_charges: "State Tax, Tolls, Parking extra.",
    terms: "Minimum 300 km daily outstation requirement.",
    available_local: true,
    available_outstation: true,
  },
  {
    id: "f-urb-10-mah",
    slug: "10-seater-maharaja-urbania",
    name: "10 Seater Urbania Maharaja",
    category: "Urbania",
    seating: 10,
    luggage: "6 Large Bags + Rear Trunk",
    ac: true,
    suitable_for: ["VIP Travel", "Wedding", "Corporate VIP", "Outstation"],
    starting_price: 38,
    short_description: "Maharaja edition 10-seater Urbania with extra-wide sofa recliners, massage cushions, and VIP privacy glass.",
    description: "The pinnacle of VIP road travel. Featuring 10 wide sofa-style Maharaja seats with calf supports, individual reading lights, multi-zone climate control, and privacy curtains for royal travel comfort.",
    image_url: "/images/fleets/urbania-maharaja-10-seater.jpg",
    gallery: [
      "/images/fleets/urbania-maharaja-10-seater.jpg",
      "/images/fleets/urbania-10-seater.jpg",
    ],
    features: [
      "Maharaja Sofa Recliners with Calf Rests",
      "Individual Climate Vents & Reading Lights",
      "Smart TV with Netflix / Prime Streaming",
      "Onboard Refrigerator & Water Dispenser",
      "VIP Dark Privacy Glass & Curtains",
      "Executive Chauffeur with 10+ Years Experience",
    ],
    is_featured: true,
    is_active: true,
    display_order: 5,
    model: "Force Urbania Maharaja VIP 10 Seater",
    min_km: 300,
    per_km_rate: 38,
    driver_allowance: 800,
    additional_charges: "Toll, Parking, Interstate Permit extra.",
    terms: "Minimum 300 km daily outstation billing.",
    available_local: true,
    available_outstation: true,
  },
  {
    id: "f-urb-12-mah",
    slug: "12-seater-maharaja-urbania",
    name: "12 Seater Urbania Maharaja",
    category: "Urbania",
    seating: 12,
    luggage: "8 Large Bags + Trunk",
    ac: true,
    suitable_for: ["VIP Travel", "Wedding", "Outstation", "Delegates"],
    starting_price: 42,
    short_description: "Luxury Maharaja 12-seater Urbania van built for high-end family tours and executive VIP transport.",
    description: "Designed for discerning travelers who demand maximum space and luxury. The 12 Seater Urbania Maharaja features Italian leather pushback recliners, wood-grain interior accents, ambient cabin mood lights, and USB fast chargers.",
    image_url: "/images/fleets/urbania-maharaja-12-seater.jpg",
    gallery: [
      "/images/fleets/urbania-maharaja-12-seater.jpg",
      "/images/fleets/urbania-12-seater.jpg",
    ],
    features: [
      "Italian Leather Maharaja Pushback Seats",
      "Ambient Mood Lighting & Wood Accents",
      "Individual Passenger AC Outlets",
      "Heavy Luggage Capacity",
      "Smart LED TV & Surround Sound",
      "Dedicated Senior Driver",
    ],
    is_featured: true,
    is_active: true,
    display_order: 6,
    model: "Force Urbania Maharaja 12 Seater",
    min_km: 300,
    per_km_rate: 42,
    driver_allowance: 800,
    additional_charges: "Tolls & Permits at actuals.",
    terms: "Minimum 300 km per calendar day.",
    available_local: true,
    available_outstation: true,
  },
  {
    id: "f-urb-9-lux",
    slug: "9-seater-luxury-urbania",
    name: "9 Seater Urbania Luxury",
    category: "Urbania",
    seating: 9,
    luggage: "6 Large Bags + Boot",
    ac: true,
    suitable_for: ["Small Family", "Airport Transfer", "Outstation", "Local"],
    starting_price: 32,
    short_description: "Compact luxury 9-seater Urbania offering ultra-wide seating and personal space for small groups.",
    description: "Perfect for small family getaways or executive airport shuttles. The 9 Seater Urbania Luxury offers generous elbow room, wide reclining seats, silent air conditioning, and superior suspension comfort.",
    image_url: "/images/fleets/urbania-9-seater-luxury.jpg",
    gallery: [
      "/images/fleets/urbania-9-seater-luxury.jpg",
      "/images/fleets/urbania-10-seater.jpg",
    ],
    features: [
      "9 Ultra-Wide Reclining Seats",
      "Individual Passenger AC Vents",
      "Fast USB Phone Chargers",
      "Quiet Cabin NVH Insulation",
      "Panoramic Viewing Windows",
      "Polite Experienced Chauffeur",
    ],
    is_featured: false,
    is_active: true,
    display_order: 7,
    model: "Force Urbania Luxury 9 Seater",
    min_km: 250,
    per_km_rate: 32,
    driver_allowance: 700,
    additional_charges: "Toll, Parking, Permit extra.",
    terms: "Minimum 250 km daily outstation requirement.",
    available_local: true,
    available_outstation: true,
  },
  {
    id: "f-urbania",
    slug: "force-urbania-luxury-van",
    name: "Force Urbania (13 Seater Luxury)",
    category: "Urbania",
    seating: 13,
    luggage: "8 Large Bags + Dedicated Storage",
    ac: true,
    suitable_for: ["Outstation", "Group Tour", "Corporate", "Wedding", "Airport Transfer"],
    starting_price: 28,
    short_description: "European-inspired ultra-luxury 13-seater van with recliners, panoramic windows, and individual AC vents.",
    description: "Force Urbania redefined group luxury travel. Featuring aircraft-style recliner seats, individual reading lamps, USB charging sockets at every seat, wide panoramic windows, whisper-quiet cabin insulation, and automatic step entrance.",
    image_url: "/images/fleets/urbania-12-seater.jpg",
    gallery: [
      "/images/fleets/urbania-12-seater.jpg",
      "/images/fleets/urbania-10-seater.jpg",
      "/images/fleets/urbania-16-seater.jpg",
    ],
    features: [
      "Aircraft Reclining Plush Seats",
      "Individual Passenger AC Vents & Lighting",
      "Large LED TV & Premium Sound System",
      "Wide Panoramic Windows for Scenic Views",
      "High Ceiling & Easy Stand-up Aisles",
      "Specialized Tour Chauffeur",
    ],
    is_featured: true,
    is_active: true,
    display_order: 8,
    model: "Force Urbania Executive 13 Seater",
    min_km: 300,
    per_km_rate: 28,
    driver_allowance: 700,
    additional_charges: "State tax, Tolls & Parking fees extra.",
    terms: "300 km daily minimum for Force Urbania outstation bookings.",
    available_local: true,
    available_outstation: true,
  },

  // ── TEMPO TRAVELLER FLEETS ────────────────────────────────────────────────
  {
    id: "f-tempo-9",
    slug: "9-seater-tempo-traveller",
    name: "9 Seater Tempo Traveller",
    category: "Tempo Traveller",
    seating: 9,
    luggage: "5 Large Bags + Rear Space",
    ac: true,
    suitable_for: ["Local", "Airport Transfer", "Outstation", "Family Trip"],
    starting_price: 20,
    short_description: "Economical 9-seater Tempo Traveller with pushback seats, perfect for small group travel.",
    description: "The 9 Seater Tempo Traveller is ideal for small families or compact groups traveling around Bangalore or heading to hill stations like Coorg and Ooty. Comes with comfortable 1x1 / 2x1 seating and clean interiors.",
    image_url: "/images/fleets/tempo-9-seater-interior.png",
    gallery: [
      "/images/fleets/tempo-9-seater-interior.png",
    ],
    features: [
      "9 Comfortable Pushback Seats",
      "Effective Air Conditioning Unit",
      "Music System & Mobile Charging",
      "Spacious Rear Luggage Area",
      "Sanitized & Well-Maintained",
      "Punctual Uniformed Driver",
    ],
    is_featured: false,
    is_active: true,
    display_order: 9,
    model: "Force Deluxe 9 Seater",
    min_km: 250,
    per_km_rate: 20,
    driver_allowance: 550,
    additional_charges: "Tolls & Parking extra.",
    terms: "Minimum 250 km per day.",
    available_local: true,
    available_outstation: true,
  },
  {
    id: "f-tempo-12",
    slug: "12-seater-tempo-traveller",
    name: "12 Seater Tempo Traveller",
    category: "Tempo Traveller",
    seating: 12,
    luggage: "6 Large Bags + Rear Storage",
    ac: true,
    suitable_for: ["Outstation", "Group Tour", "Corporate", "Family Trip"],
    starting_price: 22,
    short_description: "The classic choice for medium family groups, pilgrimage tours, and corporate team outings.",
    description: "12 Seater Deluxe Tempo Traveller with 2x1 seating arrangement, spacious aisle, individual AC vents, and high roof for comfortable standing room.",
    image_url: "/images/fleets/tempo-12-seater-interior.png",
    gallery: [
      "/images/fleets/tempo-12-seater-interior.png",
    ],
    features: [
      "2x1 Pushback Comfortable Seating",
      "Dedicated Air Conditioner Cooling",
      "Flat Screen LCD & Music System",
      "Rear Boot & Roof Rack Storage",
      "Cleaned & Sanitized Interiors",
      "Experienced Outstation Driver",
    ],
    is_featured: true,
    is_active: true,
    display_order: 10,
    model: "Force Deluxe Tempo Traveller",
    min_km: 300,
    per_km_rate: 22,
    driver_allowance: 600,
    additional_charges: "Toll, Parking, Permit extra.",
    terms: "Minimum 300 km per calendar day.",
  },
];

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Booking",
    question: "How do I book a vehicle with Souparnika Travels?",
    answer: "Booking is simple! You can fill out our website booking form, click the WhatsApp button to chat with our reservation team instantly, or call us at +91 98450 12345. We will provide an instant transparent quote and confirm your booking immediately.",
  },
  {
    id: "faq-2",
    category: "Payment",
    question: "What payment methods are accepted?",
    answer: "We accept UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash. A minimal advance deposit is required to confirm your booking, and the balance can be paid directly to the driver or online upon trip completion.",
  },
  {
    id: "faq-3",
    category: "Vehicle Features",
    question: "Are all your rental vehicles air-conditioned?",
    answer: "Yes, 100% of our fleet—from Sedans and SUVs to Force Urbania and 50-seater Luxury Coaches—are equipped with powerful, fully functional air conditioning systems to ensure maximum comfort.",
  },
  {
    id: "faq-4",
    category: "Pricing",
    question: "Are toll, parking, and state tax charges included in the fare?",
    answer: "Base fares cover vehicle rental, fuel, and driver allowances. Tolls, parking fees, and interstate permit taxes are calculated at actuals during the trip based on your exact travel route.",
  },
  {
    id: "faq-5",
    category: "Services",
    question: "Do you provide outstation rental services from Bangalore?",
    answer: "Yes! We specialize in outstation journeys across South India, including Coorg, Ooty, Chikmagalur, Mysore, Wayanad, Kerala backwaters, Tirupati, Pondicherry, and Goa with experienced highway drivers.",
  },
  {
    id: "faq-6",
    category: "Safety",
    question: "Are your drivers experienced and verified?",
    answer: "Absolutely. All Souparnika Travels drivers undergo strict background checks, verification, and regular defensive driving training. They possess thorough knowledge of South Indian routes and tourist landmarks.",
  },
  {
    id: "faq-7",
    category: "Policy",
    question: "What is your cancellation policy?",
    answer: "Free cancellation is available up to 24 hours prior to scheduled pickup time for standard vehicles. For details on last-minute cancellations or refund procedures, please refer to our Cancellation Policy page.",
  },
  {
    id: "faq-8",
    category: "Corporate",
    question: "Can I book a vehicle for corporate events or employee commuting?",
    answer: "Yes, we provide dedicated corporate car rental solutions, airport executive transfers, monthly transport agreements, and conference delegate shuttles with GST invoicing.",
  },
  {
    id: "faq-9",
    category: "Airport",
    question: "Do you provide 24/7 airport pickup and drop services?",
    answer: "Yes! We offer 24x7 reliable airport transfers to and from Kempegowda International Airport Bengaluru (BLR) with flight tracking to ensure zero waiting time.",
  },
  {
    id: "faq-10",
    category: "Vehicle Selection",
    question: "Can I choose a specific vehicle model when booking?",
    answer: "Yes, when you enquire or select a vehicle (e.g. Innova Crysta, Force Urbania, Dzire), we guarantee the requested vehicle model or an equivalent upgraded vehicle in pristine condition.",
  },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    customer_name: "Venkatesh Murthy",
    customer_location: "Bengaluru",
    rating: 5,
    review: "We booked a Force Urbania for our family trip of 14 members to Coorg and Wayanad. The vehicle was spotlessly clean and very spacious. Our driver Mr. Ramesh was polite, drove safely, and knew all the best routes. The entire experience was hassle-free and we will definitely book again for our next trip.",
    travel_type: "Family Outstation Trip",
    destination: "Coorg & Wayanad",
    fleet_used: "Force Urbania 13 Seater",
    avatar_url: "/images/testimonials/avatar-1.png",
    is_featured: true,
    display_order: 1,
  },
  {
    id: "t-2",
    customer_name: "Lakshmi Narayanan",
    customer_location: "Bengaluru",
    rating: 5,
    review: "We hired an Innova Crysta for a 3-day Mysore and Ooty tour with our parents who are senior citizens. The car was very comfortable, the driver was always on time, and there were no hidden charges at all. Souparnika Travels made our family vacation truly memorable.",
    travel_type: "Tour Package",
    destination: "Mysore & Ooty",
    fleet_used: "Toyota Innova Crysta",
    avatar_url: "/images/testimonials/avatar-2.png",
    is_featured: true,
    display_order: 2,
  },
  {
    id: "t-3",
    customer_name: "Suresh Iyer",
    customer_location: "Bengaluru",
    rating: 5,
    review: "Our company regularly uses Souparnika Travels for picking up executive delegates from the airport. The drivers are always well-dressed, vehicles are maintained in excellent condition, and the pickups have never been late even once. Very professional service for corporate needs.",
    travel_type: "Corporate Transport",
    destination: "Bangalore Airport & Tech Parks",
    fleet_used: "Innova Crysta & Urbania",
    avatar_url: "/images/testimonials/avatar-3.png",
    is_featured: true,
    display_order: 3,
  },
  {
    id: "t-4",
    customer_name: "Ramachandran K",
    customer_location: "Bengaluru",
    rating: 5,
    review: "We needed a 21-seater Mini Bus for transporting wedding guests between the hotel and the marriage hall. The Souparnika team coordinated everything smoothly without any delays. The bus was clean, air-conditioned, and our guests were very happy with the service.",
    travel_type: "Wedding Transportation",
    destination: "Bangalore Palace Grounds",
    fleet_used: "21 Seater Mini Bus",
    avatar_url: "/images/testimonials/avatar-4.png",
    is_featured: true,
    display_order: 4,
  },
];

export const DEFAULT_BLOGS: BlogArticle[] = [
  {
    id: "b-1",
    slug: "complete-guide-to-force-urbania-rental-bangalore",
    title: "Complete Guide to Renting Force Urbania in Bangalore for Group Travels",
    category: "Vehicle Advice",
    author: "Travel Desk",
    publish_date: "2026-07-15",
    read_time: "5 min read",
    featured_image: "/images/fleets/tempo/tempo-luxury-new.png",
    excerpt: "Discover why Force Urbania is fast becoming the #1 choice for group road trips, corporate retreats, and family outstation travel from Bangalore.",
    meta_description: "Learn about Force Urbania seating configurations, luggage capacity, rental rates per km, and amenities for outstation trips from Bangalore.",
    content: `
# Complete Guide to Renting Force Urbania in Bangalore

When travelling in groups of 10 to 17 people, standard cars like Innova are too small, while large 50-seater buses feel cumbersome on narrow hill station roads. **Force Urbania** bridges this exact gap with European design, monocoque chassis stability, and luxury airliner comfort.

## Why Force Urbania is the Preferred Choice

1. **Recliner Seating**: Aircraft-style pushback seats with armrests, headrests, and ample legroom.
2. **Individual AC Vents**: Every passenger gets personal cooling controls.
3. **Smooth Suspension**: Independent front suspension means a bump-free ride even on rough ghat roads to Coorg or Chikmagalur.
4. **Panoramic Windows**: Large glass area offers breathtaking views of tea gardens and misty mountain ranges.

## Pricing & Kilometre Billing

Force Urbania rentals typically start at **₹28/km** with a daily minimum threshold of 300 km for outstation trips. Driver allowance is calculated daily.

## Best Routes for Urbania in South India

- **Bangalore to Coorg**: 265 km · 6 hours
- **Bangalore to Ooty & Coonoor**: 275 km · 7 hours
- **Bangalore to Wayanad**: 280 km · 6.5 hours
- **Bangalore to Tirupati**: 250 km · 5 hours

Contact **Souparnika Travels** to reserve your Force Urbania with a verified outstation chauffeur today!
    `,
  },
  {
    id: "b-2",
    slug: "top-10-weekend-getaways-from-bangalore-by-road",
    title: "Top 10 Road Trip Destinations from Bangalore for 2026",
    category: "Travel Guides",
    author: "Editorial Team",
    publish_date: "2026-07-02",
    read_time: "7 min read",
    featured_image: "/images/destinations/coorg.png",
    excerpt: "From coffee plantations in Chikmagalur to serene beaches in Gokarna, explore the best weekend road trip routes from Bengaluru.",
    meta_description: "Top 10 weekend road trip destinations from Bangalore with distance, ideal vehicle choices, and best travel months.",
    content: `
# Top 10 Road Trip Destinations from Bangalore

Bangalore's central location makes it the gateway to some of India's most scenic destinations. Here are the top routes to explore in comfort:

## 1. Coorg (The Scotland of India)
- **Distance**: 265 km
- **Best Vehicle**: Innova Crysta or Tempo Traveller
- **Highlights**: Abbey Falls, Raja's Seat, Coffee Estates, Dubare Elephant Camp.

## 2. Chikmagalur
- **Distance**: 240 km
- **Best Vehicle**: SUV / Ertiga / Urbania
- **Highlights**: Mullayanagiri Peak, Baba Budangiri, Hebbe Falls.

## 3. Ooty & Nilgiris
- **Distance**: 275 km
- **Best Vehicle**: Sedan or SUV
- **Highlights**: Botanical Garden, Pykara Lake, Nilgiri Mountain Railway.

## 4. Mysore & Kabini
- **Distance**: 145 km
- **Best Vehicle**: Sedan or Innova
- **Highlights**: Mysore Palace, Chamundi Hill, Kabini Wildlife Safari.

Planning your trip? Rent a sanitized vehicle with an experienced driver from **Souparnika Travels**.
    `,
  },
  {
    id: "b-3",
    slug: "innova-crysta-vs-tempo-traveller-which-should-you-choose",
    title: "Innova Crysta vs Tempo Traveller: Which Vehicle Fits Your Trip?",
    category: "Vehicle Advice",
    author: "Fleet Manager",
    publish_date: "2026-06-20",
    read_time: "4 min read",
    featured_image: "/images/fleets/cars/innova-new.png",
    excerpt: "Comparing passenger capacity, luggage room, fuel economy, per-km costs, and comfort between Innova Crysta and 12-seater Tempo Traveller.",
    meta_description: "Detailed comparison between Innova Crysta and Tempo Traveller for family and group travel from Bangalore.",
    content: `
# Innova Crysta vs Tempo Traveller: Choosing the Right Ride

Choosing between a 7-seater **Toyota Innova Crysta** and a 12/17-seater **Tempo Traveller** depends on group size, luggage requirements, and travel style.

| Feature | Toyota Innova Crysta | Tempo Traveller |
| --- | --- | --- |
| **Seating Capacity** | Up to 7 Passengers | 12 to 17 Passengers |
| **Luggage Space** | 3-4 Medium Bags | Dedicated Rear/Roof Bay |
| **Highway Speed** | High Cruise Speed | Steady Scenic Speed |
| **Ideal For** | Small Families / VIPs | Group Tours / Families |
| **Starting Rate** | ~₹19/km | ~₹22-25/km |

For expert recommendations based on your exact itinerary, call **Souparnika Travels** at +91 98450 12345.
    `,
  },
];
