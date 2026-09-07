export type PackageImageCategory = "destination" | "sightseeing" | "vehicle" | "stay" | "experience";

export interface PackageImage {
  id: string;
  url: string;
  alt: string;
  title: string;
  category: PackageImageCategory;
  featured?: boolean;
  displayOrder?: number;
  relatedVehicleId?: string;
  relatedItineraryDay?: number;
}

export interface PackageItineraryDay {
  day: number;
  title: string;
  description: string;
  places?: string[];
  image_url?: string;
}

export interface TravelPackage {
  id: string;
  slug: string;
  title: string;
  name: string;
  destination: string;
  location: string;
  state: "Karnataka" | "Tamil Nadu" | "Kerala" | "Andhra Pradesh" | "Pondicherry";
  category: "Local Sightseeing" | "Weekend" | "Family" | "Pilgrimage" | "Hill Station" | "Heritage" | "South India Tour";
  dropdownCategory:
    | "Bangalore & Local Tours"
    | "Karnataka Tours"
    | "Hill Stations & Nature"
    | "Pilgrimage Tours"
    | "Kerala Tours"
    | "Tamil Nadu & Pondicherry";
  duration: string;
  durationDays: number;
  durationNights?: number;
  short_description: string;
  description: string;
  image_url: string;
  thumbnail: string;
  gallery: string[];
  images: PackageImage[];
  price: number;
  starting_from?: string;
  ending_point?: string;
  travellers?: string;
  is_featured: boolean;
  is_popular: boolean;
  is_active: boolean;
  display_order: number;
  show_in_dropdown: boolean;
  badge?: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  important_info?: string[];
  booking_terms?: string;
  itinerary: PackageItineraryDay[];
  suggested_vehicles: string[];
}

export const DEFAULT_PACKAGES: TravelPackage[] = [
  // ── 1. MYSORE ──
  {
    id: "pkg-mysore",
    slug: "mysore",
    name: "Mysore Tour",
    title: "Mysore Tour Packages | Mysore Sightseeing & Travel",
    destination: "Mysore",
    location: "Mysore, Karnataka",
    state: "Karnataka",
    category: "Heritage",
    dropdownCategory: "Karnataka Tours",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    durationNights: 1,
    short_description: "Explore the royal heritage, magnificent palaces, temples and cultural attractions of Mysore.",
    description: "Experience the majestic charm of Mysore! From the world-famous Mysore Palace lit up in gold to the sacred Chamundi Hills and royal gardens, enjoy a heritage journey packed with culture, history, and architectural splendor.",
    image_url: "/images/destinations/mysore-palace.jpg",
    thumbnail: "/images/destinations/mysore-palace.jpg",
    gallery: [
      "/images/destinations/mysore-palace.jpg",
      "/images/destinations/mysore.png",
      "/images/fleets/urbania-10-seater.jpg",
      "/images/fleets/urbania-12-seater.jpg",
    ],
    images: [
      {
        id: "mysore-1",
        url: "/images/destinations/mysore-palace.jpg",
        alt: "Mysore Palace facade and royal gardens",
        title: "Mysore Palace & Royal Heritage",
        category: "destination",
        featured: true,
        displayOrder: 1,
      },
      {
        id: "mysore-2",
        url: "/images/destinations/mysore.png",
        alt: "Chamundi Hills and Brindavan Gardens Mysore",
        title: "Chamundi Hills & Brindavan Gardens",
        category: "sightseeing",
        displayOrder: 2,
      },
      {
        id: "mysore-3",
        url: "/images/fleets/urbania-10-seater.jpg",
        alt: "10 Seater Force Urbania for Mysore tour",
        title: "10 Seater Force Urbania Recliners",
        category: "vehicle",
        relatedVehicleId: "10-seater-urbania",
        displayOrder: 3,
      },
    ],
    price: 8500,
    starting_from: "Bangalore",
    ending_point: "Bangalore",
    travellers: "Families & Groups",
    is_featured: true,
    is_popular: true,
    is_active: true,
    display_order: 1,
    show_in_dropdown: true,
    badge: "Heritage Special",
    highlights: [
      "Mysore Palace",
      "Chamundi Hills",
      "Brindavan Gardens",
      "Heritage sightseeing",
      "Local markets",
    ],
    inclusions: [
      "Dedicated Chauffeur & Vehicle",
      "Fuel, Tolls & Parking Charges",
      "Interstate Permits (if applicable)",
      "Driver Night Allowance",
    ],
    exclusions: [
      "Palace & Garden entry fees",
      "Hotel stay & food expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Bangalore to Mysore & Royal Palace Sightseeing",
        description: "Morning departure from Bangalore. Arrive in Mysore and visit the magnificent Mysore Palace and St. Philomena's Church. Evening visit to Brindavan Gardens musical fountain show.",
        places: ["Mysore Palace", "St. Philomena's Church", "Brindavan Gardens"],
      },
      {
        day: 2,
        title: "Day 2: Chamundi Hills, Devaraja Market & Return",
        description: "Morning drive up Chamundi Hills to visit Chamundeshwari Temple. Explore Devaraja Market for silk, sandalwood and local sweets. Return drive to Bangalore in the evening.",
        places: ["Chamundi Hills", "Devaraja Market", "Mysore Zoo"],
      },
    ],
    suggested_vehicles: ["10-seater-urbania", "12-seater-urbania", "16-seater-urbania"],
  },

  // ── 2. KODAIKANAL ──
  {
    id: "pkg-kodaikanal",
    slug: "kodaikanal",
    name: "Kodaikanal Tour",
    title: "Kodaikanal Tour Packages | Kodaikanal Trips & Sightseeing",
    destination: "Kodaikanal",
    location: "Kodaikanal, Tamil Nadu",
    state: "Tamil Nadu",
    category: "Hill Station",
    dropdownCategory: "Hill Stations & Nature",
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    durationNights: 2,
    short_description: "Experience the beautiful hill station of Kodaikanal with its scenic lakes, valleys, viewpoints and pleasant climate.",
    description: "Escape to the Princess of Hill Stations! Kodaikanal offers refreshing mountain breezes, star-shaped lakes, misty pine forests, and dramatic cliff viewpoints.",
    image_url: "/images/destinations/kodaikanal-lake.jpg",
    thumbnail: "/images/destinations/kodaikanal-lake.jpg",
    gallery: [
      "/images/destinations/kodaikanal-lake.jpg",
      "/images/fleets/urbania-12-seater.jpg",
      "/images/fleets/urbania-16-seater.jpg",
    ],
    images: [
      {
        id: "kodai-1",
        url: "/images/destinations/kodaikanal-lake.jpg",
        alt: "Kodaikanal Lake and surrounding forest trail",
        title: "Kodaikanal Lake & Pine Forests",
        category: "destination",
        featured: true,
        displayOrder: 1,
      },
      {
        id: "kodai-2",
        url: "/images/fleets/urbania-12-seater.jpg",
        alt: "12 Seater Force Urbania for Kodaikanal hill trip",
        title: "12 Seater Force Urbania",
        category: "vehicle",
        relatedVehicleId: "12-seater-urbania",
        displayOrder: 2,
      },
    ],
    price: 14500,
    starting_from: "Bangalore",
    ending_point: "Bangalore",
    travellers: "Families & Couples",
    is_featured: true,
    is_popular: true,
    is_active: true,
    display_order: 2,
    show_in_dropdown: true,
    badge: "Misty Hills",
    highlights: [
      "Kodaikanal Lake",
      "Coaker's Walk",
      "Pillar Rocks",
      "Pine Forest",
      "Scenic viewpoints",
    ],
    inclusions: [
      "Private Vehicle with Professional Driver",
      "Tamil Nadu State Tax & Toll Fees",
      "Fuel & Chauffeur Allowance",
    ],
    exclusions: [
      "Boating tickets & entry passes",
      "Resort stay & personal meals",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Bangalore to Kodaikanal Drive",
        description: "Overnight or early morning drive from Bangalore to Kodaikanal. Check in to your resort and enjoy a tranquil evening by Kodaikanal Lake.",
        places: ["Kodaikanal Lake", "Bryant Park"],
      },
      {
        day: 2,
        title: "Day 2: Full Day Kodaikanal Sightseeing",
        description: "Visit Coaker's Walk for valley views, Pillar Rocks, Pine Forest, Green Valley View, and Kurinji Andavar Temple.",
        places: ["Coaker's Walk", "Pillar Rocks", "Pine Forest", "Green Valley View"],
      },
      {
        day: 3,
        title: "Day 3: Silver Cascade Falls & Return Drive",
        description: "Visit Bear Shola Falls and Silver Cascade Falls before commencing the return journey to Bangalore.",
        places: ["Bear Shola Falls", "Silver Cascade Falls"],
      },
    ],
    suggested_vehicles: ["10-seater-urbania", "12-seater-urbania", "16-seater-urbania"],
  },

  // ── 3. KERALA ──
  {
    id: "pkg-kerala",
    slug: "kerala",
    name: "Kerala Tour",
    title: "Kerala Tour Packages | Kerala Travel & Sightseeing",
    destination: "Kerala",
    location: "Munnar & Alleppey, Kerala",
    state: "Kerala",
    category: "South India Tour",
    dropdownCategory: "Kerala Tours",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    durationNights: 3,
    short_description: "Discover Kerala's beautiful backwaters, hill stations, beaches, wildlife and unique culture.",
    description: "Immerse in God's Own Country! Combine the tea garden mist of Munnar with peaceful houseboat cruises through the palm-fringed backwaters of Alleppey.",
    image_url: "/images/destinations/kerala-houseboat.jpg",
    thumbnail: "/images/destinations/kerala-houseboat.jpg",
    gallery: [
      "/images/destinations/kerala-houseboat.jpg",
      "/images/destinations/kerala.png",
      "/images/fleets/urbania-16-seater.jpg",
    ],
    images: [
      {
        id: "kerala-1",
        url: "/images/destinations/kerala-houseboat.jpg",
        alt: "Kerala houseboat floating on Alleppey backwaters",
        title: "Alleppey Backwater Houseboat Cruise",
        category: "destination",
        featured: true,
        displayOrder: 1,
      },
      {
        id: "kerala-2",
        url: "/images/destinations/kerala.png",
        alt: "Munnar tea estate green hills",
        title: "Munnar Tea Plantations",
        category: "sightseeing",
        displayOrder: 2,
      },
    ],
    price: 18500,
    starting_from: "Bangalore",
    ending_point: "Bangalore",
    travellers: "Group & Family Trips",
    is_featured: true,
    is_popular: true,
    is_active: true,
    display_order: 3,
    show_in_dropdown: true,
    badge: "God's Own Country",
    highlights: [
      "Backwaters",
      "Munnar",
      "Alleppey",
      "Tea plantations",
      "Houseboat experiences",
    ],
    inclusions: [
      "Dedicated Vehicle with Expert Driver",
      "Kerala State Permit & Toll Fares",
      "Chauffeur Stay Allowance & Fuel",
    ],
    exclusions: [
      "Houseboat stay & food charges",
      "National Park entry permits",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Bangalore to Munnar Scenic Drive",
        description: "Drive from Bangalore to Munnar through wildlife sanctuaries and tea garden valleys. Evening leisure at Munnar.",
        places: ["Cheeyappara Waterfalls", "Valara Waterfalls"],
      },
      {
        day: 2,
        title: "Day 2: Munnar Tea Gardens & Eravikulam",
        description: "Explore Tata Tea Museum, Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam, and Echo Point.",
        places: ["Eravikulam National Park", "Mattupetty Dam", "Echo Point"],
      },
      {
        day: 3,
        title: "Day 3: Munnar to Alleppey Backwaters",
        description: "Drive to Alleppey. Experience a serene backwater cruise past traditional villages and coconut groves.",
        places: ["Alleppey Backwaters", "Vembanad Lake"],
      },
      {
        day: 4,
        title: "Day 4: Return Drive to Bangalore",
        description: "Morning spice shopping in Alleppey/Kochi. Commence return journey back to Bangalore.",
        places: ["Kochi Fort Beach", "Bangalore Drop"],
      },
    ],
    suggested_vehicles: ["12-seater-urbania", "16-seater-urbania", "16-seater-modified-urbania"],
  },

  // ── 4. HAMPI ──
  {
    id: "pkg-hampi",
    slug: "hampi",
    name: "Hampi Tour",
    title: "Hampi Tour Packages | Hampi Sightseeing & Travel",
    destination: "Hampi",
    location: "Hampi, Vijayanagara, Karnataka",
    state: "Karnataka",
    category: "Heritage",
    dropdownCategory: "Karnataka Tours",
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    durationNights: 2,
    short_description: "Explore the magnificent ruins, temples, architecture and historic landscapes of Hampi.",
    description: "Step into the golden era of the Vijayanagara Empire! Hampi is a UNESCO World Heritage site filled with surreal boulder-strewn landscapes, ancient stone chariots, and grand riverbank monuments.",
    image_url: "/images/destinations/hampi-stone-chariot.jpg",
    thumbnail: "/images/destinations/hampi-stone-chariot.jpg",
    gallery: [
      "/images/destinations/hampi-stone-chariot.jpg",
      "/images/fleets/urbania-10-seater.jpg",
    ],
    images: [
      {
        id: "hampi-1",
        url: "/images/destinations/hampi-stone-chariot.jpg",
        alt: "Historic stone chariot and Virupaksha temple of Hampi",
        title: "Hampi Vijayanagara Architecture & Stone Chariot",
        category: "destination",
        featured: true,
        displayOrder: 1,
      },
    ],
    price: 13500,
    starting_from: "Bangalore",
    ending_point: "Bangalore",
    travellers: "History & Group Enthusiasts",
    is_featured: true,
    is_popular: true,
    is_active: true,
    display_order: 4,
    show_in_dropdown: true,
    badge: "UNESCO Heritage",
    highlights: [
      "Virupaksha Temple",
      "Stone Chariot",
      "Vijayanagara ruins",
      "Historic monuments",
      "Riverside landscapes",
    ],
    inclusions: [
      "AC Vehicle with Trained Chauffeur",
      "All Tolls, Parking & Fuel",
      "Driver Allowance & Night Charges",
    ],
    exclusions: [
      "ASI monument entry tickets",
      "Local guide fees & meals",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Bangalore to Hampi Drive",
        description: "Morning departure from Bangalore to Hampi (approx. 6-7 hours). Check in to hotel and evening walk by Tungabhadra River sunset.",
        places: ["Tungabhadra River", "Anegundi Village"],
      },
      {
        day: 2,
        title: "Day 2: Royal Center & Sacred Complex Monuments",
        description: "Full day sightseeing covering Virupaksha Temple, Vijaya Vittala Temple & Stone Chariot, Lotus Mahal, Elephant Stables, and Queen's Bath.",
        places: ["Virupaksha Temple", "Stone Chariot", "Lotus Mahal", "Elephant Stables"],
      },
      {
        day: 3,
        title: "Day 3: Hemakuta Hill Sunset & Return",
        description: "Visit Kadalekalu Ganesha and Hemakuta Hill temples before departing back to Bangalore.",
        places: ["Hemakuta Hill", "Kadalekalu Ganesha"],
      },
    ],
    suggested_vehicles: ["10-seater-urbania", "12-seater-urbania", "16-seater-urbania"],
  },

  // ── 5. PONDICHERRY ──
  {
    id: "pkg-pondicherry",
    slug: "pondicherry",
    name: "Pondicherry Tour",
    title: "Pondicherry Tour Packages | Pondicherry Trips & Sightseeing",
    destination: "Pondicherry",
    location: "Pondicherry (Puducherry)",
    state: "Pondicherry",
    category: "Weekend",
    dropdownCategory: "Tamil Nadu & Pondicherry",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    durationNights: 1,
    short_description: "Enjoy the French-inspired streets, beautiful beaches, cafés, heritage architecture and peaceful atmosphere of Pondicherry.",
    description: "Taste the French Riviera of the East! Walk through yellow mustard French colonial villas in White Town, relax at Rock Beach promenade, and explore spiritual Auroville.",
    image_url: "/images/destinations/pondicherry-french-quarter.jpg",
    thumbnail: "/images/destinations/pondicherry-french-quarter.jpg",
    gallery: [
      "/images/destinations/pondicherry-french-quarter.jpg",
      "/images/fleets/urbania-12-seater.jpg",
    ],
    images: [
      {
        id: "pondy-1",
        url: "/images/destinations/pondicherry-french-quarter.jpg",
        alt: "French Quarter Promenade beach in Pondicherry at sunset",
        title: "Pondicherry White Town & Beach Promenade",
        category: "destination",
        featured: true,
        displayOrder: 1,
      },
    ],
    price: 9500,
    starting_from: "Bangalore",
    ending_point: "Bangalore",
    travellers: "Friends & Couples",
    is_featured: true,
    is_popular: true,
    is_active: true,
    display_order: 5,
    show_in_dropdown: true,
    badge: "French Riviera",
    highlights: [
      "French Quarter",
      "Promenade Beach",
      "Auroville",
      "Heritage streets",
      "Cafés",
    ],
    inclusions: [
      "AC Urbania / Vehicle with Chauffeur",
      "Pondicherry Union Territory Toll & Tax",
      "Fuel & Driver Allowance",
    ],
    exclusions: [
      "Boating tickets at Paradise Beach",
      "Personal café expenses & hotel stay",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Bangalore to Pondicherry & White Town Walk",
        description: "Early departure from Bangalore via Hosur & Tiruvannamalai. Arrive in Pondicherry, explore White Town French Quarter, French bakeries, and Rock Beach promenade.",
        places: ["French Quarter", "Promenade Beach", "Sri Aurobindo Ashram"],
      },
      {
        day: 2,
        title: "Day 2: Auroville Matrimandir & Paradise Beach",
        description: "Morning visit to Auroville international township and Matrimandir viewpoint. Afternoon boat ride to Paradise Beach before starting return drive to Bangalore.",
        places: ["Auroville", "Paradise Beach", "Chunnambar Boat House"],
      },
    ],
    suggested_vehicles: ["10-seater-urbania", "12-seater-urbania", "16-seater-urbania"],
  },

  // ── 6. OOTY ──
  {
    id: "pkg-ooty",
    slug: "ooty",
    name: "Ooty Tour",
    title: "Ooty Tour Packages | Ooty Sightseeing & Travel",
    destination: "Ooty",
    location: "Ooty, Nilgiris, Tamil Nadu",
    state: "Tamil Nadu",
    category: "Hill Station",
    dropdownCategory: "Hill Stations & Nature",
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    durationNights: 2,
    short_description: "Experience the scenic beauty of Ooty with its tea gardens, mountains, lakes and colonial charm.",
    description: "Welcome to the Queen of Hill Stations! Nestled in the Nilgiri hills, Ooty charms visitors with vast tea gardens, cool mountain climate, botanical gardens, and vintage toy train heritage.",
    image_url: "/images/destinations/ooty-tea-gardens.jpg",
    thumbnail: "/images/destinations/ooty-tea-gardens.jpg",
    gallery: [
      "/images/destinations/ooty-tea-gardens.jpg",
      "/images/destinations/ooty.png",
      "/images/fleets/urbania-10-seater.jpg",
    ],
    images: [
      {
        id: "ooty-1",
        url: "/images/destinations/ooty-tea-gardens.jpg",
        alt: "Ooty rolling tea estate hills and winding mountain roads",
        title: "Ooty Nilgiri Tea Estates & Hills",
        category: "destination",
        featured: true,
        displayOrder: 1,
      },
      {
        id: "ooty-2",
        url: "/images/destinations/ooty.png",
        alt: "Ooty lake and pine valley view",
        title: "Ooty Lake & Botanical Gardens",
        category: "sightseeing",
        displayOrder: 2,
      },
    ],
    price: 12500,
    starting_from: "Bangalore",
    ending_point: "Bangalore",
    travellers: "Families & Vacationers",
    is_featured: true,
    is_popular: true,
    is_active: true,
    display_order: 6,
    show_in_dropdown: true,
    badge: "Queen of Hills",
    highlights: [
      "Tea estates",
      "Ooty Lake",
      "Botanical Gardens",
      "Nilgiri Mountain Railway",
      "Scenic viewpoints",
    ],
    inclusions: [
      "Private Chauffeur-Driven Vehicle",
      "Tamil Nadu Interstate Permit",
      "Fuel, Tolls & Driver Stay Allowance",
    ],
    exclusions: [
      "Toy Train tickets",
      "Boating & garden entrance tickets",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Bangalore to Ooty via Bandipur Tiger Reserve",
        description: "Scenic drive from Bangalore through Bandipur and Mudumalai forests. Arrive in Ooty, visit Ooty Lake for evening boating.",
        places: ["Bandipur Forest Route", "Ooty Lake"],
      },
      {
        day: 2,
        title: "Day 2: Doddabetta Peak, Tea Factory & Botanical Garden",
        description: "Visit Doddabetta Peak (highest in Nilgiris), Government Botanical Garden, Tea Factory & Museum, and Rose Garden.",
        places: ["Doddabetta Peak", "Botanical Garden", "Tea Factory"],
      },
      {
        day: 3,
        title: "Day 3: Coonoor Sightseeing & Return",
        description: "Drive to nearby Coonoor to visit Sim's Park, Dolphin's Nose viewpoint, and Tea Estates. Commence return journey to Bangalore.",
        places: ["Coonoor", "Sim's Park", "Dolphin's Nose"],
      },
    ],
    suggested_vehicles: ["10-seater-urbania", "12-seater-urbania", "16-seater-urbania"],
  },

  // ── 7. TIRUPATI ──
  {
    id: "pkg-tirupati",
    slug: "tirupati",
    name: "Tirupati Tour",
    title: "Tirupati Tour Packages | Tirupati Temple & Travel",
    destination: "Tirupati",
    location: "Tirupati, Andhra Pradesh",
    state: "Andhra Pradesh",
    category: "Pilgrimage",
    dropdownCategory: "Pilgrimage Tours",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    durationNights: 1,
    short_description: "Visit Tirupati and explore its famous temples and spiritual destinations with a comfortable travel experience.",
    description: "Embark on a sacred spiritual pilgrimage to Lord Venkateswara in Tirumala! Enjoy hassle-free group travel with experienced outstation drivers who know temple timings and routes thoroughly.",
    image_url: "/images/destinations/tirupati-temple-landscape.jpg",
    thumbnail: "/images/destinations/tirupati-temple-landscape.jpg",
    gallery: [
      "/images/destinations/tirupati-temple-landscape.jpg",
      "/images/fleets/urbania-12-seater.jpg",
    ],
    images: [
      {
        id: "tiru-1",
        url: "/images/destinations/tirupati-temple-landscape.jpg",
        alt: "Tirupati Tirumala Sri Venkateswara temple landscape at sunset",
        title: "Tirumala Sri Venkateswara Temple",
        category: "destination",
        featured: true,
        displayOrder: 1,
      },
    ],
    price: 9000,
    starting_from: "Bangalore",
    ending_point: "Bangalore",
    travellers: "Pilgrims & Families",
    is_featured: true,
    is_popular: true,
    is_active: true,
    display_order: 7,
    show_in_dropdown: true,
    badge: "Spiritual Yatra",
    highlights: [
      "Tirumala",
      "Sri Venkateswara Temple",
      "Tirupati attractions",
      "Temple surroundings",
      "Spiritual sightseeing",
    ],
    inclusions: [
      "AC Vehicle with Experienced Driver",
      "Andhra Pradesh Interstate Tax",
      "All Tolls, Parking & Driver Allowance",
    ],
    exclusions: [
      "Darshan tickets (Special Entry / Break)",
      "Accommodation & prasadam expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Bangalore to Tirupati & Padmavathi Temple",
        description: "Morning departure from Bangalore (approx 5 hours). Check into hotel at Tirupati. Visit Sri Padmavathi Ammavari Temple at Tiruchanur.",
        places: ["Tiruchanur Padmavathi Temple", "Kapila Theertham"],
      },
      {
        day: 2,
        title: "Day 2: Tirumala Temple Darshan & Return",
        description: "Early morning drive up Tirumala Hills for Sri Venkateswara Swamy Darshan. Visit Srivari Padaalu and Silathoranam. Afternoon return drive to Bangalore.",
        places: ["Tirumala Temple", "Silathoranam", "Srivari Padaalu"],
      },
    ],
    suggested_vehicles: ["10-seater-urbania", "12-seater-urbania", "16-seater-urbania"],
  },

  // ── 8. COORG ──
  {
    id: "pkg-coorg",
    slug: "coorg",
    name: "Coorg Tour",
    title: "Coorg Tour Packages | Coorg Sightseeing & Travel",
    destination: "Coorg",
    location: "Madikeri, Coorg, Karnataka",
    state: "Karnataka",
    category: "Hill Station",
    dropdownCategory: "Karnataka Tours",
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    durationNights: 2,
    short_description: "Discover Coorg's coffee plantations, waterfalls, forests, viewpoints and peaceful hill-country landscapes.",
    description: "Unwind in the Scotland of India! Coorg offers lush aromatic coffee estates, majestic waterfalls, golden Tibetan monasteries, and scenic hill country views.",
    image_url: "/images/destinations/coorg-coffee-plantation.jpg",
    thumbnail: "/images/destinations/coorg-coffee-plantation.jpg",
    gallery: [
      "/images/destinations/coorg-coffee-plantation.jpg",
      "/images/fleets/urbania-10-seater.jpg",
      "/images/fleets/urbania-12-seater.jpg",
    ],
    images: [
      {
        id: "coorg-1",
        url: "/images/destinations/coorg-coffee-plantation.jpg",
        alt: "Coorg coffee plantation berries road and misty hills",
        title: "Coorg Coffee Estates & Hills",
        category: "destination",
        featured: true,
        displayOrder: 1,
      },
    ],
    price: 11500,
    starting_from: "Bangalore",
    ending_point: "Bangalore",
    travellers: "Families & Groups",
    is_featured: true,
    is_popular: true,
    is_active: true,
    display_order: 8,
    show_in_dropdown: true,
    badge: "Coffee Capital",
    highlights: [
      "Coffee plantations",
      "Abbey Falls",
      "Raja's Seat",
      "Madikeri",
      "Scenic hill landscapes",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Karnataka Tolls & Fuel Allowance",
      "Doorstep Bangalore Pickup/Drop",
    ],
    exclusions: [
      "Homestay/Resort accommodation",
      "Sightseeing entry tickets",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Bangalore to Coorg via Bylakuppe",
        description: "Early morning drive from Bangalore. Visit Golden Temple Namdroling Monastery in Bylakuppe. Check into Coorg resort and visit Raja's Seat for sunset.",
        places: ["Bylakuppe Golden Temple", "Raja's Seat"],
      },
      {
        day: 2,
        title: "Day 2: Abbey Falls, Dubare & Coffee Estate Tour",
        description: "Visit Dubare Elephant Interaction Camp, Abbey Waterfalls, Madikeri Fort, and take a guided coffee plantation walk.",
        places: ["Dubare Elephant Camp", "Abbey Falls", "Madikeri Fort"],
      },
      {
        day: 3,
        title: "Day 3: Talakaveri / Omkareshwara & Return Drive",
        description: "Morning visit Omkareshwara Temple or Talakaveri (Kaveri river origin). Return drive back to Bangalore.",
        places: ["Omkareshwara Temple", "Talakaveri"],
      },
    ],
    suggested_vehicles: ["10-seater-urbania", "12-seater-urbania", "16-seater-urbania"],
  },
];

export function getPackageBySlug(slug: string): TravelPackage | undefined {
  return DEFAULT_PACKAGES.find((p) => p.slug === slug);
}

export function getAllPackages(): TravelPackage[] {
  return DEFAULT_PACKAGES;
}
