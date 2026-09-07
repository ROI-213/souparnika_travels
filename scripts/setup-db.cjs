const { Client } = require('pg');

const client = new Client({
  host: process.env.PGHOST || '168.119.64.101',
  port: parseInt(process.env.PGPORT || '5432'),
  user: process.env.PGUSER || 'soupa839',
  password: process.env.PGPASSWORD || '5yLMTWjNFmPByXLA8d47Zvdnz',
  database: process.env.PGDATABASE || 'soupa839',
  ssl: false,
  connectionTimeoutMillis: 15000,
});

async function run() {
  console.log('Connecting to PostgreSQL at 168.119.64.101:5432 (soupa839)...');
  await client.connect();
  console.log('Connected successfully!');

  // Enable extensions if available
  try {
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
  } catch (e) {
    console.log('Extension note (non-fatal):', e.message);
  }

  console.log('Creating database schemas and tables...');

  const schemaSQL = `
    -- 1. FLEETS
    CREATE TABLE IF NOT EXISTS public.fleets (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      seating INT NOT NULL,
      seating_label TEXT,
      luggage TEXT,
      ac BOOLEAN NOT NULL DEFAULT true,
      suitable_for TEXT[] DEFAULT '{}',
      starting_price INT,
      starting_from INT,
      short_description TEXT,
      description TEXT,
      image_url TEXT,
      features TEXT[] DEFAULT '{}',
      is_featured BOOLEAN NOT NULL DEFAULT false,
      is_active BOOLEAN NOT NULL DEFAULT true,
      display_order INT NOT NULL DEFAULT 0,
      model TEXT,
      min_km INT,
      per_km_rate INT,
      driver_allowance INT,
      additional_charges TEXT,
      terms TEXT,
      available_local BOOLEAN NOT NULL DEFAULT true,
      available_outstation BOOLEAN NOT NULL DEFAULT true,
      gallery TEXT[] NOT NULL DEFAULT '{}',
      local_package_hours INT,
      local_package_km INT,
      local_package_rate INT,
      local_package_12h_km INT,
      local_package_12h_rate INT,
      extra_hour_rate INT,
      extra_km_rate INT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 2. PACKAGES
    CREATE TABLE IF NOT EXISTS public.packages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      duration TEXT NOT NULL,
      starting_from TEXT,
      ending_point TEXT,
      category TEXT NOT NULL,
      travellers TEXT,
      short_description TEXT,
      description TEXT,
      highlights TEXT[] DEFAULT '{}',
      itinerary JSONB DEFAULT '[]'::jsonb,
      inclusions TEXT[] DEFAULT '{}',
      exclusions TEXT[] DEFAULT '{}',
      important_info TEXT[] DEFAULT '{}',
      booking_terms TEXT,
      price INT,
      image_url TEXT,
      gallery TEXT[] NOT NULL DEFAULT '{}',
      is_featured BOOLEAN NOT NULL DEFAULT false,
      is_active BOOLEAN NOT NULL DEFAULT true,
      display_order INT NOT NULL DEFAULT 0,
      available_months TEXT[] DEFAULT '{}',
      suggested_vehicles TEXT[] DEFAULT '{}',
      min_travellers INT,
      max_travellers INT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 3. TESTIMONIALS
    CREATE TABLE IF NOT EXISTS public.testimonials (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      customer_name TEXT NOT NULL,
      customer_location TEXT,
      rating INT NOT NULL DEFAULT 5,
      review TEXT NOT NULL,
      travel_type TEXT,
      destination TEXT,
      fleet_used TEXT,
      avatar_url TEXT,
      is_approved BOOLEAN NOT NULL DEFAULT true,
      is_featured BOOLEAN NOT NULL DEFAULT false,
      display_order INT NOT NULL DEFAULT 0,
      email TEXT,
      phone TEXT,
      package_used TEXT,
      travel_date DATE,
      is_video BOOLEAN NOT NULL DEFAULT false,
      video_url TEXT,
      video_thumbnail TEXT,
      title TEXT,
      service_category TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 4. ENQUIRIES
    CREATE TABLE IF NOT EXISTS public.enquiries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      reference TEXT UNIQUE NOT NULL DEFAULT 'ST-' || upper(substr(md5(random()::text), 1, 8)),
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      pickup TEXT,
      destination TEXT,
      travel_date DATE,
      return_date DATE,
      passengers INT,
      vehicle_type TEXT,
      trip_type TEXT,
      message TEXT,
      source TEXT DEFAULT 'website',
      source_page TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 5. HERO SLIDES
    CREATE TABLE IF NOT EXISTS public.hero_slides (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      badge TEXT,
      heading TEXT NOT NULL,
      highlight_word TEXT,
      rotating_words TEXT[] DEFAULT '{}',
      description TEXT,
      desktop_image TEXT,
      tablet_image TEXT,
      mobile_image TEXT,
      video_url TEXT,
      primary_cta_label TEXT,
      primary_cta_url TEXT,
      secondary_cta_label TEXT,
      secondary_cta_url TEXT,
      overlay_color TEXT DEFAULT '#071B33',
      overlay_opacity NUMERIC DEFAULT 0.55,
      text_position TEXT DEFAULT 'left',
      duration_ms INT DEFAULT 6000,
      display_order INT DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 6. HOME SECTIONS
    CREATE TABLE IF NOT EXISTS public.home_sections (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      key TEXT NOT NULL UNIQUE,
      label TEXT,
      heading TEXT,
      description TEXT,
      image TEXT,
      secondary_image TEXT,
      cta_label TEXT,
      cta_url TEXT,
      secondary_cta_label TEXT,
      secondary_cta_url TEXT,
      extra JSONB DEFAULT '{}'::jsonb,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 7. SERVICES
    CREATE TABLE IF NOT EXISTS public.services (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      slug TEXT UNIQUE,
      short_desc TEXT,
      description TEXT,
      icon TEXT,
      image TEXT,
      link_url TEXT,
      enquiry_defaults JSONB DEFAULT '{}'::jsonb,
      display_order INT DEFAULT 0,
      is_featured BOOLEAN DEFAULT false,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 8. DESTINATIONS
    CREATE TABLE IF NOT EXISTS public.destinations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      state TEXT,
      description TEXT,
      image TEXT,
      related_package_slug TEXT,
      display_order INT DEFAULT 0,
      is_featured BOOLEAN DEFAULT false,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 9. WHY US POINTS
    CREATE TABLE IF NOT EXISTS public.why_us_points (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      icon TEXT,
      title TEXT NOT NULL,
      description TEXT,
      display_order INT DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 10. HOW IT WORKS STEPS
    CREATE TABLE IF NOT EXISTS public.how_it_works_steps (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      step_no INT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      display_order INT DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 11. STATS
    CREATE TABLE IF NOT EXISTS public.stats (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      prefix TEXT,
      value INT NOT NULL DEFAULT 0,
      suffix TEXT,
      label TEXT NOT NULL,
      icon TEXT,
      display_order INT DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 12. AREAS
    CREATE TABLE IF NOT EXISTS public.areas (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      city TEXT DEFAULT 'Bengaluru',
      state TEXT DEFAULT 'Karnataka',
      description TEXT,
      hero_image TEXT,
      thumbnail_image TEXT,
      airport_distance TEXT,
      latitude NUMERIC,
      longitude NUMERIC,
      seo_title TEXT,
      seo_description TEXT,
      seo_keywords TEXT,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 13. AREA LANDMARKS
    CREATE TABLE IF NOT EXISTS public.area_landmarks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      area_id UUID NOT NULL REFERENCES public.areas(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      image TEXT,
      google_maps_url TEXT,
      display_order INT DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 14. LOCAL PRICING
    CREATE TABLE IF NOT EXISTS public.local_pricing (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      area_id UUID NOT NULL REFERENCES public.areas(id) ON DELETE CASCADE,
      vehicle_id UUID NOT NULL REFERENCES public.fleets(id) ON DELETE CASCADE,
      package_name TEXT NOT NULL,
      hours INT NOT NULL,
      km_limit INT NOT NULL,
      base_price NUMERIC NOT NULL,
      extra_km_rate NUMERIC NOT NULL,
      extra_hour_rate NUMERIC NOT NULL,
      driver_bata NUMERIC NOT NULL,
      night_charge NUMERIC DEFAULT 0,
      gst_percentage NUMERIC DEFAULT 5,
      toll_included BOOLEAN DEFAULT false,
      parking_included BOOLEAN DEFAULT false,
      permit_included BOOLEAN DEFAULT false,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 15. OUTSTATION ROUTES
    CREATE TABLE IF NOT EXISTS public.outstation_routes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      area_id UUID NOT NULL REFERENCES public.areas(id) ON DELETE CASCADE,
      destination TEXT NOT NULL,
      destination_slug TEXT NOT NULL,
      distance_km NUMERIC,
      estimated_time_hrs NUMERIC,
      driver_bata_per_day NUMERIC,
      toll_estimated NUMERIC,
      parking_estimated NUMERIC,
      permit_estimated NUMERIC,
      gst_percentage NUMERIC DEFAULT 5,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE(area_id, destination_slug)
    );

    -- 16. OUTSTATION ROUTE PRICING
    CREATE TABLE IF NOT EXISTS public.outstation_route_pricing (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      route_id UUID NOT NULL REFERENCES public.outstation_routes(id) ON DELETE CASCADE,
      vehicle_id UUID NOT NULL REFERENCES public.fleets(id) ON DELETE CASCADE,
      base_price NUMERIC NOT NULL,
      extra_km_rate NUMERIC,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE(route_id, vehicle_id)
    );

    -- 17. PRICING RULES
    CREATE TABLE IF NOT EXISTS public.pricing_rules (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      key TEXT UNIQUE NOT NULL,
      value_numeric NUMERIC,
      value_text TEXT,
      value_json JSONB,
      description TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 18. BLOGS
    CREATE TABLE IF NOT EXISTS public.blogs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      summary TEXT,
      content TEXT,
      image_url TEXT,
      author TEXT DEFAULT 'Souparnika Travels',
      category TEXT,
      tags TEXT[] DEFAULT '{}',
      publish_date DATE DEFAULT CURRENT_DATE,
      read_time_minutes INT DEFAULT 5,
      is_published BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 19. FAQS
    CREATE TABLE IF NOT EXISTS public.faqs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT,
      display_order INT DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    -- 20. STORAGE OBJECTS (PostgreSQL Media Buckets)
    CREATE TABLE IF NOT EXISTS public.storage_objects (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      bucket_id TEXT NOT NULL DEFAULT 'public',
      name TEXT NOT NULL,
      mime_type TEXT,
      size_bytes BIGINT,
      content_base64 TEXT,
      public_url TEXT,
      metadata JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE(bucket_id, name)
    );
  `;

  await client.query(schemaSQL);
  console.log('All 20 tables created or verified successfully!');

  // Now seed data
  console.log('Seeding default data into PostgreSQL tables...');

  // Seed pricing rules
  await client.query(`
    INSERT INTO public.pricing_rules (key, value_numeric, description) VALUES
    ('outstation_min_km_per_day', 300, 'Minimum kilometers charged per day for outstation trips.'),
    ('default_gst_percentage', 5, 'Default GST percentage to apply if not overridden.')
    ON CONFLICT (key) DO NOTHING;
  `);

  // Seed fleets
  await client.query(`
    INSERT INTO public.fleets (slug, name, category, seating, seating_label, luggage, ac, suitable_for, starting_price, per_km_rate, driver_allowance, local_package_hours, local_package_km, local_package_rate, extra_hour_rate, extra_km_rate, short_description, description, image_url, gallery, features, is_featured, is_active, display_order)
    VALUES
    ('urbania-9-seater-maharaja', '9 Seater Urbania Maharaja', 'LUXURY / MAHARAJA', 9, '9 Seater', '5 Bags', true, ARRAY['VIP Travel', 'Corporate Delegates', 'Airport Transfer', 'Executive Outstation'], 32, 32, 500, 8, 80, 4800, 450, 32, 'Ultra-luxury Pushback Maharaja Seats with premium interiors and ample legroom.', 'Ultra-luxury Pushback Maharaja Seats with premium interiors, executive comfort, and ample legroom for VIP travel.', '/images/fleets/urbania-9-seater-luxury.jpg', ARRAY['/images/fleets/urbania-9-seater-luxury.jpg'], ARRAY['Maharaja Pushback Seats', 'Individual AC Vents', 'Charging Ports', 'Executive Ambient Lighting'], true, true, 1),
    ('urbania-10-seater-maharaja', '10 Seater Urbania Maharaja', 'LUXURY / MAHARAJA', 10, '10 Seater', '6 Bags', true, ARRAY['Family VIP', 'Corporate Travel', 'Outstation'], 38, 38, 500, 8, 80, 6000, 500, 38, 'Premium luxury seating with pushback comfort, ideal for corporate and family VIP travel.', 'Premium luxury seating with pushback comfort, ideal for corporate and family VIP travel across South India.', '/images/fleets/urbania-maharaja-10-seater.jpg', ARRAY['/images/fleets/urbania-maharaja-10-seater.jpg'], ARRAY['Pushback Seats', 'Smart Entertainment System', 'Dual AC', 'Chauffeur Protocol Trained'], true, true, 2),
    ('urbania-12-seater-maharaja', '12 Seater Urbania Maharaja', 'LUXURY / MAHARAJA', 12, '12 Seater', '8 Bags', true, ARRAY['VIP Delegates', 'Wedding Transport', 'Outstation Tour'], 42, 42, 550, 8, 80, 6800, 550, 42, 'Flagship luxury Force Urbania with 12 pushback maharaja seats, premium interiors, and executive comfort.', 'Flagship luxury Force Urbania with 12 pushback maharaja seats, premium interiors, and executive comfort.', '/images/fleets/urbania-maharaja-12-seater.jpg', ARRAY['/images/fleets/urbania-maharaja-12-seater.jpg'], ARRAY['12 Pushback Maharaja Seats', 'Air Suspension Comfort', 'Hi-Fi Audio', 'Panoramic Windows'], true, true, 3),
    ('urbania-10-seater-premium', '10 Seater Urbania Premium', 'PREMIUM', 10, '10 Seater', '6 Bags', true, ARRAY['Corporate Groups', 'Family Trips', 'Airport Drop'], 33, 33, 500, 8, 80, 5000, 500, 33, 'Comfortable premium seating with modern amenities, perfect for corporate groups and family trips.', 'Comfortable premium seating with modern amenities, perfect for corporate groups and family trips.', '/images/fleets/urbania-10-seater.jpg', ARRAY['/images/fleets/urbania-10-seater.jpg'], ARRAY['High-Back Seats', 'Powerful Dual AC', 'USB Ports', 'Smooth Ride'], true, true, 4),
    ('urbania-12-seater-premium', '12 Seater Urbania Premium', 'PREMIUM', 12, '12 Seater', '7 Bags', true, ARRAY['Family Vacations', 'Group Outings'], 36, 36, 550, 8, 80, 5500, 550, 36, 'Spacious premium seating with extra legroom and modern comfort for group travel.', 'Spacious premium seating with extra legroom and modern comfort for group travel.', '/images/fleets/urbania-12-seater.jpg', ARRAY['/images/fleets/urbania-12-seater.jpg'], ARRAY['Spacious Legroom', 'Individual USB Outlets', 'Overhead Luggage Racks'], true, true, 5),
    ('urbania-16-seater-modified', '16 Seater Urbania Modified', 'PREMIUM', 16, '16 Seater', '10 Bags', true, ARRAY['Large Groups', 'Corporate Tours', 'Pilgrimages'], 40, 40, 600, 8, 80, 6500, 650, 40, 'Maximum capacity with comfortable 16-seater configuration, ideal for large groups and outstation trips.', 'Maximum capacity with comfortable 16-seater configuration, ideal for large groups and outstation trips.', '/images/fleets/urbania-16-seater.jpg', ARRAY['/images/fleets/urbania-16-seater.jpg'], ARRAY['16 Pushback Seats', 'Dual Blower AC', 'Ample Boot Space', 'Microphone System'], true, true, 6),
    ('toyota-fortuner', 'Toyota Fortuner', 'PREMIUM LUXURY SUV', 7, '6+1 Seater', '4 Large Suitcases', true, ARRAY['VIP Delegates', 'Executive Travel', 'Wedding Transport', 'High-Commanding Outstation'], 65, 65, 500, 8, 80, 6500, 650, 65, 'The ultimate high-commanding 6+1 seater luxury SUV offering imposing road presence, premium leather interior, and unstoppable capability.', 'Command the road in prestige with the Toyota Fortuner. Built with a muscular high-stature body, luxury dark chamois leather upholstery, high-potency 2.8L diesel engine, and pitch-quiet cabin ergonomics. Perfect for executive corporate CEOs, VIP wedding transportation, and high-profile outstation journeys.', '/images/fleets/cars/fortuner.jpg', ARRAY['/images/fleets/cars/fortuner.jpg', '/images/fleets/fortuner/fortuner-interior-cockpit.png'], ARRAY['Imposing High-Stature Road Stance', 'Dark Chamois Premium Leather Interior', 'High-Output Dual-Zone Climate Control', 'JBL 11-Speaker Premium Audio', 'Vehicle Stability Control & 7 Airbags', 'Elite Chauffeur Protocol Trained'], true, true, 7),
    ('toyota-innova-crysta', 'Toyota Innova Crysta', 'SUV / MPV', 7, '6+1 Seater', '4 Large Bags', true, ARRAY['Family Trip', 'Outstation', 'Airport Transfer'], 18, 18, 500, 8, 80, 3500, 350, 18, 'The most trusted family travel vehicle in India.', 'Spacious 7-seater with premium leather interiors, powerful diesel engine and excellent ride comfort — the go-to choice for outstation and family trips.', '/images/fleets/cars/innova-crysta.jpg', ARRAY['/images/fleets/cars/innova-crysta.jpg'], ARRAY['Push-button start', 'Captain seats', 'USB charging', 'Music system'], true, true, 8)
    ON CONFLICT (slug) DO UPDATE SET
      name = EXCLUDED.name,
      category = EXCLUDED.category,
      per_km_rate = EXCLUDED.per_km_rate,
      starting_price = EXCLUDED.starting_price,
      local_package_rate = EXCLUDED.local_package_rate,
      extra_km_rate = EXCLUDED.extra_km_rate,
      extra_hour_rate = EXCLUDED.extra_hour_rate,
      driver_allowance = EXCLUDED.driver_allowance,
      image_url = EXCLUDED.image_url,
      description = EXCLUDED.description;
  `);

  // Seed Packages
  await client.query(`
    INSERT INTO public.packages (slug, name, location, duration, starting_from, category, travellers, short_description, description, highlights, inclusions, exclusions, price, image_url, is_featured, display_order)
    VALUES
    ('coorg-getaway-3d2n', 'Coorg Weekend Getaway', 'Coorg, Karnataka', '3 Days / 2 Nights', 'Bengaluru', 'Hill Station', '2-6', 'Coffee estates, waterfalls and misty mornings.', 'A relaxed 3-day escape through Coorg coffee country — Raja Seat, Abbey Falls, Dubare Elephant Camp and the tranquil Cauvery valley.', ARRAY['Abbey Falls', 'Dubare Elephant Camp', 'Raja Seat', 'Coffee plantation tour'], ARRAY['AC vehicle with driver', 'Fuel & tolls', 'Driver bata'], ARRAY['Stay & meals', 'Entry tickets'], 11999, 'https://images.unsplash.com/photo-1580889272861-dc2dbfa7c40b?w=1200&q=80', true, 1),
    ('ooty-kodaikanal-5d4n', 'Ooty & Kodaikanal Twin Hills', 'Ooty & Kodaikanal, Tamil Nadu', '5 Days / 4 Nights', 'Bengaluru', 'Hill Station', '2-8', 'Two of South India most iconic hill stations in one trip.', 'Explore the Nilgiris and Palani hills — botanical gardens, boating on Kodai lake, the toy train and endless tea estates.', ARRAY['Nilgiri Toy Train', 'Kodai Lake boating', 'Doddabetta Peak', 'Coaker Walk'], ARRAY['AC vehicle with driver', 'Fuel & tolls'], ARRAY['Stays', 'Meals', 'Sightseeing tickets'], 19999, 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=1200&q=80', true, 2),
    ('chikmagalur-2d1n', 'Chikmagalur Coffee Trail', 'Chikmagalur, Karnataka', '2 Days / 1 Night', 'Bengaluru', 'Weekend', '2-6', 'Baba Budangiri, Mullayanagiri and coffee tastings.', 'A short, scenic run through Karnataka coffee capital — perfect for a rejuvenating weekend.', ARRAY['Mullayanagiri Peak', 'Baba Budangiri', 'Hebbe Falls'], ARRAY['AC vehicle with driver', 'Fuel & tolls'], ARRAY['Stay', 'Meals'], 7999, 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80', true, 3),
    ('kerala-backwaters-4d3n', 'Kerala Backwaters', 'Alleppey & Kumarakom, Kerala', '4 Days / 3 Nights', 'Bengaluru', 'Backwaters', '2-8', 'Houseboats, coconut lagoons and Kerala hospitality.', 'Cruise the backwaters of Alleppey and Kumarakom in a traditional houseboat, and unwind with Ayurveda in God own country.', ARRAY['Houseboat stay', 'Kumarakom bird sanctuary', 'Marari beach'], ARRAY['AC vehicle with driver', 'Fuel & tolls'], ARRAY['Houseboat', 'Meals'], 17999, 'https://images.unsplash.com/photo-1602642458631-cf7c76e79f28?w=1200&q=80', true, 4),
    ('tirupati-darshan', 'Tirupati Darshan', 'Tirupati, Andhra Pradesh', '1 Day', 'Bengaluru', 'Pilgrimage', '2-13', 'Same-day Tirupati Balaji darshan.', 'Early-morning pickup from Bengaluru, VIP darshan assistance and return the same day.', ARRAY['Tirumala temple', 'Padmavathi temple', 'Kapila Theertham'], ARRAY['AC vehicle with driver', 'Toll & parking'], ARRAY['Darshan tickets', 'Meals'], 5999, 'https://images.unsplash.com/photo-1621996659490-3275b4d0d951?w=1200&q=80', false, 5),
    ('mysore-day-trip', 'Mysore Heritage Day Trip', 'Mysore, Karnataka', '1 Day', 'Bengaluru', 'Heritage', '2-13', 'Palace city in a single day.', 'A comfortable day trip covering Mysore Palace, Chamundi Hills, Brindavan Gardens and Srirangapatna.', ARRAY['Mysore Palace', 'Chamundi Hills', 'Brindavan Gardens'], ARRAY['AC vehicle with driver', 'Fuel & tolls'], ARRAY['Entry tickets', 'Meals'], 4499, 'https://images.unsplash.com/photo-1600505574087-8c15c206c07f?w=1200&q=80', false, 6)
    ON CONFLICT (slug) DO NOTHING;
  `);

  // Seed Testimonials
  await client.query(`
    INSERT INTO public.testimonials (customer_name, customer_location, rating, review, travel_type, destination, fleet_used, is_approved, is_featured, display_order)
    VALUES
    ('Ramesh Iyer', 'Bengaluru', 5, 'Booked an Innova for our Coorg trip. Driver was punctual, well-mannered and knew the roads inside out. Highly recommended!', 'Family Trip', 'Coorg', 'Toyota Innova Crysta', true, true, 1),
    ('Priya Nair', 'Chennai', 5, 'Souparnika arranged a Tempo Traveller for our family wedding in Mysore. Clean vehicle, professional driver — smooth end to end.', 'Wedding Transportation', 'Mysore', 'Tempo Traveller', true, true, 2),
    ('Vikram Shetty', 'Mangalore', 5, 'Their airport pickup service is incredibly reliable. Never had a late arrival in six months of daily travel.', 'Airport Transfer', 'Bengaluru', 'Toyota Fortuner', true, true, 3),
    ('Ananya Rao', 'Hyderabad', 5, 'Our Ooty–Kodaikanal package was flawlessly planned. The driver was patient with our kids and we felt safe throughout.', 'Outstation', 'Ooty & Kodaikanal', 'Toyota Innova Crysta', true, true, 4),
    ('Sunil Kamath', 'Bengaluru', 5, 'Used their Urbania for a corporate offsite. Everyone was impressed with the vehicle and the service.', 'Corporate Travel', 'Chikmagalur', 'Force Urbania Maharaja', true, false, 5),
    ('Meera Balachandran', 'Kochi', 5, 'Very transparent pricing — no surprises later. Will book again for our next pilgrimage.', 'Pilgrimage', 'Tirupati', 'Toyota Innova Crysta', true, false, 6)
    ON CONFLICT DO NOTHING;
  `);

  // Seed Hero Slides
  await client.query(`
    INSERT INTO public.hero_slides (badge, heading, highlight_word, rotating_words, description, desktop_image, mobile_image, primary_cta_label, primary_cta_url, secondary_cta_label, secondary_cta_url, display_order)
    VALUES
    ('Trusted Travel Partner in Bengaluru', 'Travel Comfortably with', 'Souparnika Travels', ARRAY['Local Journeys', 'Airport Transfers', 'Family Holidays', 'Corporate Travel', 'South India Tours'], 'Reliable vehicles, experienced drivers and thoughtfully planned journeys for local travel, airport transfers, outstation trips and memorable holidays.', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80', 'Book Your Journey', '/booking', 'Explore Our Fleets', '/fleets', 1),
    ('Airport Transfers, 24×7', 'Reliable Rides to', 'Kempegowda Airport', ARRAY['On-Time Pickup', 'Meet & Greet', 'Fixed Fare'], 'Comfortable, punctual airport transfers with professional drivers and clean, well-maintained vehicles.', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', 'Book Airport Transfer', '/booking', 'View Packages', '/packages', 2)
    ON CONFLICT DO NOTHING;
  `);

  // Seed Services
  await client.query(`
    INSERT INTO public.services (title, slug, short_desc, description, icon, image, link_url, display_order, is_featured)
    VALUES
    ('Local Travel', 'local-travel', 'Hourly and daily city rentals across Bengaluru.', 'Comfortable cabs for everyday city travel with hourly and full-day packages.', 'MapPin', 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80', '/fleets', 1, true),
    ('Airport Transfer', 'airport-transfer', 'Punctual pickup and drop to Kempegowda Airport.', 'Reliable and on-time airport transfers with fixed transparent pricing.', 'Plane', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80', '/booking', 2, true),
    ('Outstation Travel', 'outstation', 'One-way and round trips across South India.', 'Long-distance outstation trips with experienced drivers who know the routes.', 'Route', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80', '/packages', 3, true),
    ('Corporate Travel', 'corporate', 'Reliable transport for companies and teams.', 'Monthly billing, corporate accounts and dedicated fleets for business travel.', 'Briefcase', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80', '/booking', 4, true),
    ('Family Trips', 'family-trips', 'Comfortable holidays for the whole family.', 'Spacious vehicles and family-friendly itineraries across Karnataka and Kerala.', 'Users', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80', '/packages', 5, true),
    ('Group Tours', 'group-tours', 'Tempo travellers and buses for larger groups.', 'Group travel made simple with the right vehicle for every party size.', 'UsersRound', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80', '/fleets', 6, true),
    ('Wedding Transport', 'wedding-transport', 'Elegant vehicles for the big day.', 'Wedding-day transport for family, guests and the couple, coordinated end-to-end.', 'Heart', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', '/booking', 7, true),
    ('Custom Packages', 'custom-packages', 'Tailored tours designed around you.', 'Fully customized travel packages built around your interests, pace and budget.', 'Sparkles', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80', '/packages', 8, true)
    ON CONFLICT (slug) DO NOTHING;
  `);

  // Seed Destinations
  await client.query(`
    INSERT INTO public.destinations (name, state, description, image, display_order, is_featured)
    VALUES
    ('Mysuru', 'Karnataka', 'The city of palaces, gardens and heritage.', 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80', 1, true),
    ('Coorg', 'Karnataka', 'Misty hills, coffee estates and quiet trails.', 'https://images.unsplash.com/photo-1518509562904-e7ef99cddc85?w=1200&q=80', 2, true),
    ('Chikkamagaluru', 'Karnataka', 'Coffee country tucked into the Western Ghats.', 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=1200&q=80', 3, true),
    ('Hampi', 'Karnataka', 'Boulders, temples and a UNESCO World Heritage story.', 'https://images.unsplash.com/photo-1580500550469-4e5d90d8bd60?w=1200&q=80', 4, true),
    ('Ooty', 'Tamil Nadu', 'Queen of the hill stations, all year round.', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80', 5, true),
    ('Wayanad', 'Kerala', 'Waterfalls, wildlife and green plantations.', 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=1200&q=80', 6, true)
    ON CONFLICT DO NOTHING;
  `);

  // Seed Why Us Points
  await client.query(`
    INSERT INTO public.why_us_points (icon, title, description, display_order)
    VALUES
    ('ShieldCheck', 'Well-Maintained Vehicles', 'Every vehicle is regularly serviced and cleaned before each trip.', 1),
    ('BadgeCheck', 'Experienced Drivers', 'Verified drivers with years of Bengaluru and outstation experience.', 2),
    ('IndianRupee', 'Transparent Pricing', 'Clear quotations with no hidden surprises at the end of the trip.', 3),
    ('Clock', 'On-Time Pickup', 'Punctual pickups for airports, offices and holidays.', 4),
    ('Headphones', '24/7 Support', 'A live travel desk available around the clock for any request.', 5),
    ('Sparkles', 'Comfortable Travel', 'Clean interiors, working AC and well-planned rest stops.', 6),
    ('Route', 'Customized Packages', 'Trips built around your interests, budget and travel pace.', 7),
    ('CheckCircle', 'Trusted for Years', 'A long list of returning families and companies who travel with us.', 8)
    ON CONFLICT DO NOTHING;
  `);

  // Seed Stats
  await client.query(`
    INSERT INTO public.stats (prefix, value, suffix, label, display_order)
    VALUES
    (NULL, 10, '+', 'Years of Experience', 1),
    (NULL, 25000, '+', 'Happy Customers', 2),
    (NULL, 50000, '+', 'Successful Trips', 3),
    (NULL, 40, '+', 'Vehicles in Fleet', 4),
    (NULL, 120, '+', 'Destinations Covered', 5)
    ON CONFLICT DO NOTHING;
  `);

  // Seed Areas We Serve (Bengaluru hubs)
  await client.query(`
    INSERT INTO public.areas (slug, name, city, state, description, airport_distance, is_active)
    VALUES
    ('whitefield', 'Whitefield', 'Bengaluru', 'Karnataka', 'Force Urbania rentals in Whitefield for IT corridor commutes, corporate events, airport transfers and outstation trips.', '~37 km', true),
    ('koramangala', 'Koramangala', 'Bengaluru', 'Karnataka', 'Chauffeur driven tempo travellers and Urbania rentals in Koramangala for family trips and business travel.', '~41 km', true),
    ('electronic-city', 'Electronic City', 'Bengaluru', 'Karnataka', 'Reliable tempo traveller and Urbania rentals in Electronic City for IT corridor commutes and outstation travel.', '~55 km', true),
    ('hsr-layout', 'HSR Layout', 'Bengaluru', 'Karnataka', 'Affordable Force Urbania rentals in HSR Layout for local and outstation trips with professional drivers.', '~44 km', true),
    ('indiranagar', 'Indiranagar', 'Bengaluru', 'Karnataka', 'Luxury tempo traveller rentals in Indiranagar for weddings, corporate events and airport transfers.', '~38 km', true),
    ('marathahalli', 'Marathahalli', 'Bengaluru', 'Karnataka', 'Quick and easy Force Urbania bookings in Marathahalli for local sightseeing and outstation journeys.', '~35 km', true),
    ('hebbal', 'Hebbal', 'Bengaluru', 'Karnataka', 'Premium Urbania rentals near Hebbal for airport transfers, corporate travel and weekend getaways.', '~30 km', true),
    ('jayanagar', 'Jayanagar', 'Bengaluru', 'Karnataka', 'Trusted tempo traveller services in Jayanagar for family outings, temple visits and outstation trips.', '~40 km', true)
    ON CONFLICT (slug) DO NOTHING;
  `);

  // Seed initial sample enquiry for admin testing
  await client.query(`
    INSERT INTO public.enquiries (reference, name, phone, email, pickup, destination, travel_date, vehicle_type, trip_type, message, status)
    VALUES
    ('ST-TEST-001', 'Anand Rao', '9845012345', 'anand.rao@example.com', 'Whitefield, Bengaluru', 'Mysore', CURRENT_DATE + INTERVAL '3 days', 'Toyota Fortuner', 'Outstation', 'Weekend trip to Mysore Palace with family. Need vehicle with luggage space.', 'new')
    ON CONFLICT (reference) DO NOTHING;
  `);

  // Verify counts
  const tableCounts = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);

  console.log('\\n======================================================');
  console.log('SUCCESS: All tables created in PostgreSQL database:');
  console.log(tableCounts.rows.map(r => r.table_name));
  console.log('======================================================\\n');

  await client.end();
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
