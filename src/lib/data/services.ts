export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: "Rental Services" | "Group Travel" | "Personalised Solutions";
  tagline: string;
  short_description: string;
  full_description: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  card_image: string;
  gallery: string[];
  icon_name: string;
  features: string[];
  benefits: { title: string; desc: string }[];
  recommended_fleets: string[];
  popular_destinations?: { name: string; tag: string; image: string }[];
  package_options?: { name: string; detail: string }[];
  faqs: { question: string; answer: string }[];
  cta_text: string;
  is_featured: boolean;
  display_order: number;
  seo_title: string;
  seo_description: string;
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "srv-local-city",
    slug: "local-city-rental",
    name: "Local City Rental",
    category: "Rental Services",
    tagline: "Flexible hourly and full-day vehicle rentals across Bangalore",
    short_description: "Book comfortable vehicles for business meetings, city tours, shopping trips, functions, and hospital visits with zero hassle.",
    full_description: "Souparnika Travels offers premium local city rentals across Bengaluru. Whether you need an executive vehicle for full-day corporate meetings, a spacious Force Urbania for family functions, or a comfortable Tempo Traveller for city sightseeing, our flexible hourly packages ensure punctual chauffeur service and stress-free urban travel.",
    hero_title: "Local City Rental in Bangalore",
    hero_subtitle: "Hourly & full-day rental packages designed for flexible city travel.",
    hero_image: "/images/hero/user-hero-1.jpg",
    card_image: "/images/fleets/urbania-10-seater.jpg",
    gallery: [
      "/images/fleets/urbania-10-seater.jpg",
      "/images/fleets/urbania-12-seater.jpg",
      "/images/fleets/tempo-12-seater-interior.png",
    ],
    icon_name: "Car",
    package_options: [
      { name: "4 Hours / 40 KM", detail: "Ideal for short business meetings, airport drop, or quick city errands." },
      { name: "8 Hours / 80 KM", detail: "Standard full-day package for corporate visits, shopping, and family outings." },
      { name: "12 Hours / 120 KM", detail: "Extended city package for intense itineraries and multi-stop functions." },
      { name: "Full-Day Custom Rental", detail: "Tailored hourly and km limits for weddings and multi-day local events." },
    ],
    features: [
      "4 Hours / 40 KM, 8 Hours / 80 KM & 12 Hours / 120 KM packages",
      "Multiple pickup and drop points across Bangalore",
      "Clean, sanitized vehicles with dual air-conditioning",
      "Experienced chauffeurs with deep local route knowledge",
      "Zero hidden fees with transparent extra km/hr billing",
      "24/7 travel desk coordination support",
    ],
    benefits: [
      { title: "Punctual Doorstep Pickup", desc: "Our driver arrives 15 minutes before your schedule at your doorstep, hotel, or tech park." },
      { title: "Flexible Itinerary", desc: "Modify your stops on the go without rigid routes or extra administrative hassle." },
      { title: "Stress-Free Navigation", desc: "Skip traffic headaches and parking hassles while enjoying air-conditioned comfort." },
    ],
    recommended_fleets: [
      "10-seater-urbania",
      "12-seater-urbania",
      "9-seater-luxury-urbania",
      "12-seater-tempo-traveller",
    ],
    faqs: [
      { question: "What is included in the Local City Rental package?", answer: "Local rentals include the vehicle, professional driver, and base km/hours limit (e.g. 8h/80km). Tolls, parking fees, and extra km/hour charges beyond the package limit are billed at actuals." },
      { question: "Can we add multiple pickup points in Bangalore?", answer: "Yes, you can specify multiple pickup and drop locations anywhere in Bangalore including Indiranagar, Koramangala, Whitefield, Electronic City, and Yelahanka." },
      { question: "What happens if we exceed the 8 Hours or 80 KM limit?", answer: "Extra hours and extra kilometres are transparently charged at specified standard rates without surge pricing." },
    ],
    cta_text: "Book Local City Rental",
    is_featured: true,
    display_order: 1,
    seo_title: "Local City Rental Bangalore — Hourly Urbania & Tempo Traveller",
    seo_description: "Book 4h, 8h & 12h local city vehicle rentals in Bangalore. Premium Force Urbania, Tempo Traveller, and luxury cars with expert chauffeurs.",
  },
  {
    id: "srv-outstation",
    slug: "outstation-trips",
    name: "Outstation Trips",
    category: "Rental Services",
    tagline: "Comfortable long-distance travel from Bangalore across South India",
    short_description: "Travel to Mysore, Coorg, Ooty, Wayanad, Chikmagalur, and Tirupati with spacious vehicles and experienced outstation drivers.",
    full_description: "Embark on memorable road trips across South India with Souparnika Travels. We specialize in luxury outstation rentals for family holidays, hill station escapes, pilgrimage tours, and corporate retreats. Enjoy wide reclining seats, panoramic glass windows, large boot luggage space, and senior chauffeurs who know highway routes inside out.",
    hero_title: "South India Outstation Road Trips",
    hero_subtitle: "Unmatched long-distance travel comfort with transparent per-km billing.",
    hero_image: "/images/hero/mysore-palace-hero.webp",
    card_image: "/images/fleets/urbania-12-seater.jpg",
    gallery: [
      "/images/fleets/urbania-12-seater.jpg",
      "/images/fleets/urbania-16-seater.jpg",
      "/images/fleets/tempo-9-seater-interior.png",
    ],
    icon_name: "Compass",
    package_options: [
      { name: "One-Way Outstation", detail: "Point-to-point transfers to cities like Mysore, Chennai, or Hyderabad." },
      { name: "Round-Trip Outstation", detail: "Complete return journeys with dedicated vehicle and driver at your disposal." },
      { name: "Multi-Day Tour Packages", detail: "3 to 7 day South India road trips covering Coorg, Ooty, Chikmagalur & Wayanad." },
      { name: "Pilgrimage Specials", detail: "Direct comfort tours to Tirupati Balaji, Guruvayur, Kukke Subramanya & Udupi." },
    ],
    features: [
      "Transparent per-kilometre billing starting from 250-300 km/day minimum",
      "Plush pushback recliner seating with calf rests for highway comfort",
      "Roof luggage carriers and deep trunk boots for heavy group baggage",
      "Senior outstation chauffeurs trained for mountain ghauts and expressways",
      "State permit, toll, and parking guidance provided upfront",
      "24/7 GPS route assistance and roadside support",
    ],
    benefits: [
      { title: "Zero Highway Fatigue", desc: "Relax in spacious air-conditioned cabins while our seasoned driver handles long highway stretches." },
      { title: "Custom Sightseeing Stops", desc: "Pause for photos, local South Indian cuisine, or tea gardens whenever your group desires." },
      { title: "Transparent Pricing", desc: "No hidden charges — initial quote details minimum daily km, driver allowance, and toll estimates." },
    ],
    recommended_fleets: [
      "10-seater-urbania",
      "12-seater-urbania",
      "16-seater-urbania",
      "12-seater-tempo-traveller",
      "18-seater-coach",
    ],
    popular_destinations: [
      { name: "Coorg", tag: "Coffee Estates & Waterfalls", image: "/images/destinations/coorg-coffee-plantation.jpg" },
      { name: "Ooty", tag: "Nilgiri Hills & Tea Gardens", image: "/images/destinations/ooty-tea-gardens.jpg" },
      { name: "Chikmagalur", tag: "Mullayanagiri Peak Tours", image: "/images/destinations/chikmagalur.png" },
      { name: "Mysore", tag: "Heritage Palace & Zoo", image: "/images/destinations/mysore-palace.jpg" },
      { name: "Wayanad", tag: "Wildlife & Nature Trails", image: "/images/destinations/kerala-houseboat.jpg" },
      { name: "Tirupati", tag: "VIP Darshan Package", image: "/images/destinations/tirupati-temple-landscape.jpg" },
    ],
    faqs: [
      { question: "How is outstation trip billing calculated?", answer: "Outstation trips are billed on a per-km basis with a standard daily minimum requirement (usually 300 km/day). Driver allowance is charged per day." },
      { question: "Are toll, parking, and state permits included?", answer: "Tolls, parking fees, and interstate permits (for Tamil Nadu, Kerala, Andhra Pradesh) are paid by the customer at actuals or can be included in a lump-sum package quote." },
      { question: "Do drivers stay with us overnight during multi-day tours?", answer: "Yes, the dedicated chauffeur stays with the vehicle for the entire duration of your tour." },
    ],
    cta_text: "Plan Outstation Trip",
    is_featured: true,
    display_order: 2,
    seo_title: "Outstation Trip Rental Bangalore — Mysore, Coorg, Ooty & Tirupati",
    seo_description: "Rent Force Urbania, Tempo Traveller or Coach for outstation trips from Bangalore to Mysore, Coorg, Ooty, Chikmagalur, Wayanad and Tirupati.",
  },
  {
    id: "srv-airport",
    slug: "airport-transfer",
    name: "Airport Transfer",
    category: "Rental Services",
    tagline: "Reliable airport pickup and drop services, 24/7 day & night",
    short_description: "Punctual group transfers to Kempegowda International Airport (BLR) with flight tracking and ample luggage space.",
    full_description: "Never miss a flight or wait at the arrival gate again. Souparnika Travels delivers guaranteed on-time airport transfers between Bengaluru city and Kempegowda International Airport (KIAB / BLR). Whether you are coordinating travel for an international corporate delegation, family wedding guests, or tour groups, our spacious Urbania and Tempo Traveller vans provide smooth transit with deep luggage boots.",
    hero_title: "Bangalore Airport Express Transfers",
    hero_subtitle: "Punctual, stress-free transfers to & from Kempegowda International Airport.",
    hero_image: "/images/hero/user-hero-2.jpg",
    card_image: "/images/fleets/urbania-10-seater.jpg",
    gallery: [
      "/images/fleets/urbania-10-seater.jpg",
      "/images/fleets/urbania-12-seater.jpg",
      "/images/fleets/tempo-12-seater-interior.png",
    ],
    icon_name: "Plane",
    package_options: [
      { name: "City to Airport Drop", detail: "Punctual door-to-terminal drop from any residence, hotel, or tech park." },
      { name: "Airport to City Pickup", detail: "Chauffeur meet & greet at arrival terminal with passenger name placard." },
      { name: "Group Airport Shuttle", detail: "Spacious Force Urbania (9-16 seater) for delegative or family group flights." },
      { name: "Corporate Round-Trip Flight Transfer", detail: "Coordinated corporate shuttles for flight schedules." },
    ],
    features: [
      "24/7 availability for late-night and early-morning flights",
      "Real-time flight status tracking for updated arrival coordination",
      "Professional chauffeurs assisting with heavy luggage handling",
      "Large dedicated rear boots for 8-15 large suitcases",
      "Clean, sanitized, odor-free air-conditioned cabins",
      "Fixed transparent airport rates with no surge multiplier",
    ],
    benefits: [
      { title: "Zero Flight Delay Worry", desc: "We track your flight number live and adjust pickup timing automatically if flights are delayed." },
      { title: "Seamless Meet & Greet", desc: "Driver awaits you at BLR arrival exit with a personalized name card for swift boarding." },
      { title: "Supreme Luggage Space", desc: "No squishing bags on passenger seats — dedicated high-roof boots accommodate all luggage comfortably." },
    ],
    recommended_fleets: [
      "10-seater-urbania",
      "12-seater-urbania",
      "9-seater-luxury-urbania",
      "12-seater-tempo-traveller",
    ],
    faqs: [
      { question: "How early should we book an airport drop?", answer: "We recommend booking at least 6 hours in advance, though urgent transfers can often be fulfilled depending on vehicle location." },
      { question: "What if our flight lands late at night?", answer: "Our 24/7 airport desk tracks flight arrivals live. Your driver will be waiting regardless of landing delays." },
      { question: "Is airport toll included in the fare?", answer: "The Kempegowda Airport toll is billed at actual receipts." },
    ],
    cta_text: "Book Airport Transfer",
    is_featured: true,
    display_order: 3,
    seo_title: "Bangalore Airport Transfer — Force Urbania & Group Airport Shuttle",
    seo_description: "Punctual 24/7 airport transfers to Kempegowda International Airport BLR. Rent Urbania or Tempo Traveller for family & corporate airport pickup/drop.",
  },
  {
    id: "srv-corporate",
    slug: "corporate-travel",
    name: "Corporate Travel Solutions",
    category: "Group Travel",
    tagline: "Professional transportation for employees, executives, and events",
    short_description: "Premium fleet management for tech park commutes, VIP delegates, offsites, and conferences in Bangalore.",
    full_description: "Elevate your company's transportation experience with Souparnika Travels Corporate Mobility Solutions. Trusted by leading multinational corporations, IT firms in Manyata, Electronic City, and Whitefield, we provide executive Urbania vans, luxury Tempo Travellers, and premium coaches for corporate delegates, office commutes, business offsites, and annual summits.",
    hero_title: "Corporate Mobility & Delegate Fleet Support",
    hero_subtitle: "Reliable, executive-class group transportation for Bangalore businesses.",
    hero_image: "/images/hero/user-hero-2.jpg",
    card_image: "/images/fleets/urbania-maharaja-10-seater.jpg",
    gallery: [
      "/images/fleets/urbania-maharaja-10-seater.jpg",
      "/images/fleets/urbania-maharaja-12-seater.jpg",
      "/images/fleets/urbania-16-seater.jpg",
    ],
    icon_name: "Briefcase",
    package_options: [
      { name: "Executive VIP Transfers", detail: "Maharaja edition Urbania vans for senior leadership and international clients." },
      { name: "Corporate Offsite Mobility", detail: "Multi-vehicle fleet coordination for team retreats to Coorg, Kabini & Nandi Hills." },
      { name: "Event & Conference Shuttles", detail: "Scheduled loop shuttles between hotels, venues (BIEC), and tech parks." },
      { name: "Long-Term Corporate Contracts", detail: "Dedicated fleet arrangements with GST invoice compliance." },
    ],
    features: [
      "Maharaja & Luxury Force Urbania vans with VIP leather recliners",
      "Onboard Wi-Fi support, USB fast chargers, & reading lamps",
      "Formally dressed, courteous chauffeurs with non-disclosure training",
      "Dedicated corporate account manager for 24/7 dispatch coordination",
      "GSTR-compliant tax invoices & monthly billing options",
      "Strict vehicle maintenance and cleanliness protocols",
    ],
    benefits: [
      { title: "Executive Impression", desc: "Impress foreign delegates and C-suite executives with state-of-the-art Force Urbania Maharaja vans." },
      { title: "Productive Transit", desc: "Quiet NVH insulation and USB charging allow work and calls during transit." },
      { title: "Corporate Compliance", desc: "Full commercial permit compliance, insurance coverage, and verified driver credentials." },
    ],
    recommended_fleets: [
      "10-seater-maharaja-urbania",
      "12-seater-maharaja-urbania",
      "9-seater-luxury-urbania",
      "16-seater-urbania",
      "18-seater-coach",
    ],
    faqs: [
      { question: "Do you offer GST billing for corporate bookings?", answer: "Yes, we issue 100% GSTR-compliant tax invoices with complete trip details and corporate GSTIN." },
      { question: "Can you manage multi-vehicle fleets for 200+ delegates?", answer: "Yes, we specialize in multi-vehicle fleet coordination combining Force Urbanias, Tempo Travellers, and 50-seater Volvo buses." },
      { question: "Are drivers background verified?", answer: "All our corporate chauffeurs undergo background verification, route training, and formal etiquette checks." },
    ],
    cta_text: "Request Corporate Proposal",
    is_featured: true,
    display_order: 4,
    seo_title: "Corporate Travel Rental Bangalore — Executive Urbania & Delegate Fleet",
    seo_description: "Corporate transportation solutions in Bangalore. Rent Force Urbania Maharaja and luxury Tempo Travellers for employee commutes, conferences, and offsites.",
  },
  {
    id: "srv-wedding",
    slug: "wedding-transportation",
    name: "Wedding Transportation",
    category: "Group Travel",
    tagline: "Coordinated guest and family transportation for your special day",
    short_description: "Seamless guest logistics, railway/airport shuttles, and luxury family travel for royal wedding celebrations.",
    full_description: "Make your wedding day extra memorable and stress-free for your guests. Souparnika Travels offers end-to-end wedding logistics management in Bangalore and outstation resort destinations. From welcoming out-of-town relatives at airport terminals to shuttling baraat guests between hotels, convention halls, and mandaps, our pristine fleet of Force Urbanias and coaches guarantees regal comfort.",
    hero_title: "Royal Wedding Guest & Family Transportation",
    hero_subtitle: "Elegantly coordinated vehicle fleets for grand South Indian weddings.",
    hero_image: "/images/hero/user-hero-1.jpg",
    card_image: "/images/fleets/urbania-maharaja-12-seater.jpg",
    gallery: [
      "/images/fleets/urbania-maharaja-12-seater.jpg",
      "/images/fleets/urbania-maharaja-10-seater.jpg",
      "/images/fleets/urbania-16-seater.jpg",
    ],
    icon_name: "Heart",
    package_options: [
      { name: "Baraat & Guest Shuttles", detail: "Continuous hotel-to-venue shuttles for wedding guests." },
      { name: "Outstation Destination Weddings", detail: "Multi-day fleet support for weddings in Palace venues or Palace Grounds." },
      { name: "Family VIP Urbania Movement", detail: "Plush 10-12 Seater Maharaja Urbanias for bride & groom immediate family." },
      { name: "Airport & Station Pickup Squad", detail: "Dedicated dispatch team welcoming outstation relatives." },
    ],
    features: [
      "Spotless, freshly decorated vehicles matching your wedding theme",
      "Maharaja VIP seaters for bride/groom family members",
      "Dedicated wedding logistics coordinator managing driver schedules",
      "High luggage capacity for wedding wardrobes and gifts",
      "Flexible standby timing during morning and evening muhurtham",
      "Uniformed drivers trained for warm hospitalities",
    ],
    benefits: [
      { title: "Stress-Free Family Mobility", desc: "Focus on your celebration while our fleet coordinator ensures every guest arrives on time." },
      { title: "Regal Aesthetic", desc: "Pristine white and metallic grey Force Urbanias add a luxurious touch to wedding video films." },
      { title: "24/7 Standby Support", desc: "Vehicles remain on standby for emergency errands, hotel returns, and airport drops." },
    ],
    recommended_fleets: [
      "10-seater-maharaja-urbania",
      "12-seater-maharaja-urbania",
      "16-seater-modified-urbania",
      "12-seater-tempo-traveller",
      "25-seater-coach",
    ],
    faqs: [
      { question: "Can we book a mix of Urbanias, Tempo Travellers, and Buses?", answer: "Yes! We specialize in custom wedding fleet packages combining Maharaja Urbanias for family and 30-50 seater buses for guests." },
      { question: "How far in advance should we reserve wedding fleets?", answer: "We advise booking 2 to 4 weeks prior to major muhurtham dates to lock in your preferred vehicle models." },
      { question: "Can vehicles be decorated with flowers?", answer: "Yes, flower decoration can be coordinated upon request." },
    ],
    cta_text: "Plan Wedding Fleet",
    is_featured: true,
    display_order: 5,
    seo_title: "Wedding Transportation Bangalore — Guest Shuttles & Luxury Urbania",
    seo_description: "Seamless wedding guest transportation in Bangalore. Rent Force Urbania Maharaja, Tempo Travellers, and coaches for luxury wedding logistics.",
  },
  {
    id: "srv-family-tours",
    slug: "family-group-tours",
    name: "Family & Group Tours",
    category: "Group Travel",
    tagline: "Comfortable group journeys planned for every generation",
    short_description: "Memorable holiday tours, hill station getaways, and spiritual pilgrimage packages for all group sizes.",
    full_description: "Reconnect with family and friends on curated group journeys. Whether planning an extended multi-family holiday to Coorg and Ooty, a college reunion weekend in Chikmagalur, or a senior citizen pilgrimage tour to Tirupati and Temple circuits, Souparnika Travels provides spacious, ultra-comfortable vehicles engineered for relaxed group travel.",
    hero_title: "Family & Group Road Holiday Tours",
    hero_subtitle: "Spacious multi-seater vehicles designed for joyful group journeys.",
    hero_image: "/images/hero/mysore-palace-hero.webp",
    card_image: "/images/fleets/urbania-16-seater.jpg",
    gallery: [
      "/images/fleets/urbania-16-seater.jpg",
      "/images/fleets/urbania-10-seater.jpg",
      "/images/fleets/tempo-12-seater-interior.png",
    ],
    icon_name: "Users",
    package_options: [
      { name: "Small Group Holiday (9-12 Pax)", detail: "Ideal for 2-3 families traveling together in Force Urbania 12-Seater." },
      { name: "Medium Group Tour (13-17 Pax)", detail: "Force Urbania 16-Seater or Tempo Traveller for reunion & office groups." },
      { name: "Large Group Excursion (18-30 Pax)", detail: "Mini Coaches and Luxury Buses for college or extended community tours." },
      { name: "Senior Citizen Special Circuit", detail: "Extra-gentle air suspension and low step boarding for elderly comfort." },
    ],
    features: [
      "Reclining seats with individual AC vents & armrests",
      "High-definition LED screens & bluetooth music systems for road games",
      "Deep rear boot luggage storage for multi-day suitcases",
      "Experienced outstation drivers who assist seniors and children",
      "Customizable halt points for meals, tea breaks, and photo stops",
      "Clean, sanitized, odor-free cabin interiors",
    ],
    benefits: [
      { title: "Comfort for All Ages", desc: "Soft leather recliners and smooth suspension ensure grandparents and kids travel without fatigue." },
      { title: "Shared Joy & Fun", desc: "Enjoy music, movies, and family bonding together in a unified spacious cabin." },
      { title: "Tailored Route Map", desc: "Travel at your own pace without rigid bus tour timetables." },
    ],
    recommended_fleets: [
      "12-seater-urbania",
      "16-seater-urbania",
      "9-seater-tempo-traveller",
      "12-seater-tempo-traveller",
      "21-seater-coach",
    ],
    popular_destinations: [
      { name: "Coorg", tag: "Coffee Estates & Waterfalls", image: "/images/destinations/coorg.png" },
      { name: "Ooty", tag: "Nilgiri Hills & Tea Gardens", image: "/images/destinations/ooty.png" },
      { name: "Chikmagalur", tag: "Mullayanagiri Peak Tours", image: "/images/destinations/chikmagalur.png" },
      { name: "Mysore", tag: "Heritage Palace & Zoo", image: "/images/destinations/mysore.png" },
      { name: "Wayanad", tag: "Wildlife & Nature Trails", image: "/images/destinations/kerala.png" },
      { name: "Tirupati", tag: "VIP Darshan Package", image: "/images/destinations/tirupati.png" },
    ],
    faqs: [
      { question: "Which vehicle is best for 12 passengers with heavy luggage?", answer: "We highly recommend the Force Urbania 12-Seater or 16-Seater, as both feature generous rear luggage boots." },
      { question: "Can we play music and videos during the journey?", answer: "Yes! All our Urbanias and Tempo Travellers are equipped with Bluetooth audio, USB ports, and HD LED screens." },
    ],
    cta_text: "Explore Group Packages",
    is_featured: true,
    display_order: 6,
    seo_title: "Family & Group Tour Rentals Bangalore — Urbania & Tempo Traveller",
    seo_description: "Rent Force Urbania & Tempo Traveller for family holidays, group reunions, and pilgrimage tours from Bangalore.",
  },
  {
    id: "srv-luxury-support",
    slug: "luxury-fleet-support",
    name: "Luxury Fleet Support",
    category: "Personalised Solutions",
    tagline: "A dedicated travel desk for customised and high-priority journeys",
    short_description: "Bespoke fleet planning, multi-city itineraries, VIP delegation support, and custom travel solutions.",
    full_description: "When standard rental options are not enough, Souparnika Travels Luxury Fleet Support delivers personalized logistics execution. Our dedicated travel desk designs bespoke transportation itineraries, multi-vehicle fleet combinations, VIP security coordination, and custom pickup schedules for high-profile events, government delegations, film shoots, and luxury tours across South India.",
    hero_title: "Bespoke Luxury Fleet Support",
    hero_subtitle: "Custom-tailored vehicle solutions & 24/7 dedicated travel desk support.",
    hero_image: "/images/hero/user-hero-2.jpg",
    card_image: "/images/fleets/urbania-9-seater-luxury.jpg",
    gallery: [
      "/images/fleets/urbania-9-seater-luxury.jpg",
      "/images/fleets/urbania-maharaja-10-seater.jpg",
      "/images/fleets/urbania-maharaja-12-seater.jpg",
    ],
    icon_name: "Sparkles",
    package_options: [
      { name: "Multi-Vehicle Delegation", detail: "Synchronized convoy of Maharaja Urbanias and luxury SUVs." },
      { name: "VIP Protocol Transfer", detail: "Discreet, high-security transfers with trained protocol chauffeurs." },
      { name: "Film Production & Media Fleet", detail: "Dedicated standby vehicles for cast, crew, and equipment movement." },
      { name: "Tailor-Made South India Safari", detail: "Bespoke 10-day luxury road tour across Karnataka, Kerala & Tamil Nadu." },
    ],
    features: [
      "Custom vehicle combinations (Urbania + Luxury Cars + Coaches)",
      "Dedicated 24/7 Travel Desk Officer assigned to your booking",
      "Special vehicle customization & custom branding support",
      "Onboard refreshments, mini-fridge, & luxury amenities",
      "Priority maintenance checks and fallback vehicle assurance",
      "Confidentiality & non-disclosure compliance",
    ],
    benefits: [
      { title: "Flawless Execution", desc: "Every detail from route timing to driver attire is meticulously planned in advance." },
      { title: "Single Point Contact", desc: "Direct phone line to your senior travel desk manager for real-time adjustments." },
      { title: "Complete Flexibility", desc: "Change dates, routes, or fleet size seamlessly with our responsive team." },
    ],
    recommended_fleets: [
      "9-seater-luxury-urbania",
      "10-seater-maharaja-urbania",
      "12-seater-maharaja-urbania",
      "16-seater-modified-urbania",
    ],
    faqs: [
      { question: "How does Custom Fleet Support work?", answer: "Submit your requirement via our custom planner or call +91 90086 44559. A senior travel desk manager will analyze your schedule and send a comprehensive fleet proposal within 30 minutes." },
      { question: "Can we request specific driver uniforms or language skills?", answer: "Yes, we can assign English, Hindi, Kannada, Tamil, or Telugu speaking chauffeurs in formal corporate attire." },
    ],
    cta_text: "Request Custom Plan",
    is_featured: true,
    display_order: 7,
    seo_title: "Luxury Fleet Support Bangalore — VIP Delegate & Custom Travel Desk",
    seo_description: "Custom luxury travel desk & fleet management in Bangalore. Maharaja Force Urbania, multi-vehicle convoys, and VIP delegation support.",
  },
];

export function getServiceBySlug(slug?: string): ServiceItem | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  const aliasMap: Record<string, string> = {
    "local-travel": "local-city-rental",
    "local-rental": "local-city-rental",
    "outstation-travel": "outstation-trips",
    "outstation": "outstation-trips",
    "family-tours": "family-group-tours",
    "family-tours-group": "family-group-tours",
    "luxury-support": "luxury-fleet-support",
    "luxury-fleet": "luxury-fleet-support",
  };
  const targetSlug = aliasMap[normalized] || normalized;
  return DEFAULT_SERVICES.find((s) => s.slug === targetSlug || s.id === targetSlug);
}

export function getAllServices(): ServiceItem[] {
  return DEFAULT_SERVICES;
}
