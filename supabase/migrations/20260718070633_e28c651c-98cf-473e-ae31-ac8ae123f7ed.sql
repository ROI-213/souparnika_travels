
-- FLEETS
CREATE TABLE public.fleets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  seating int NOT NULL,
  luggage text,
  ac boolean NOT NULL DEFAULT true,
  suitable_for text[] DEFAULT '{}',
  starting_price int,
  short_description text,
  description text,
  image_url text,
  features text[] DEFAULT '{}',
  is_featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.fleets TO anon, authenticated;
GRANT ALL ON public.fleets TO service_role;
ALTER TABLE public.fleets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active fleets" ON public.fleets FOR SELECT USING (is_active = true);

-- PACKAGES
CREATE TABLE public.packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  location text NOT NULL,
  duration text NOT NULL,
  starting_from text,
  category text NOT NULL,
  travellers text,
  short_description text,
  description text,
  highlights text[] DEFAULT '{}',
  itinerary jsonb DEFAULT '[]'::jsonb,
  inclusions text[] DEFAULT '{}',
  exclusions text[] DEFAULT '{}',
  price int,
  image_url text,
  is_featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.packages TO anon, authenticated;
GRANT ALL ON public.packages TO service_role;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active packages" ON public.packages FOR SELECT USING (is_active = true);

-- TESTIMONIALS
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_location text,
  rating int NOT NULL DEFAULT 5,
  review text NOT NULL,
  travel_type text,
  destination text,
  fleet_used text,
  avatar_url text,
  is_approved boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view approved testimonials" ON public.testimonials FOR SELECT USING (is_approved = true);

-- ENQUIRIES
CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text UNIQUE NOT NULL DEFAULT 'ST-' || upper(substr(md5(random()::text), 1, 8)),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  pickup text,
  destination text,
  travel_date date,
  return_date date,
  passengers int,
  vehicle_type text,
  trip_type text,
  message text,
  source text DEFAULT 'website',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can view enquiries" ON public.enquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can update enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- SEED FLEETS
INSERT INTO public.fleets (slug,name,category,seating,luggage,ac,suitable_for,starting_price,short_description,description,image_url,features,is_featured,display_order) VALUES
('toyota-innova-crysta','Toyota Innova Crysta','SUV / MPV',7,'4 large bags',true,ARRAY['Family Trip','Outstation','Airport Transfer'],14,'The most trusted family travel vehicle in India.','Spacious 7-seater with premium leather interiors, powerful diesel engine and excellent ride comfort — the go-to choice for outstation and family trips.','https://images.unsplash.com/photo-1549927681-0b673b8243ab?w=1200&q=80',ARRAY['Push-button start','Captain seats','USB charging','Music system'],true,1),
('toyota-etios','Toyota Etios',' Sedan',4,'2 medium bags',true,ARRAY['Local Travel','Airport Transfer','One-Way'],9,'Comfortable sedan for city travel and airport transfers.','Fuel-efficient sedan with generous boot space and smooth ride — ideal for airport pickups and city travel.','https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80',ARRAY['Ample boot','Reclining seats','AC'],true,2),
('tempo-traveller-12','Tempo Traveller 12+1','Mini Van',13,'6 large bags',true,ARRAY['Group Tour','Family Trip','Wedding Transportation'],22,'Perfect for group tours and family reunions.','Roomy 13-seater with pushback seats and generous luggage capacity, tailor-made for group outstation trips and pilgrimages.','https://images.unsplash.com/photo-1600661653561-629509216228?w=1200&q=80',ARRAY['Pushback seats','LED TV','Curtains','Roof AC'],true,3),
('force-urbania-luxury','Force Urbania Luxury','Luxury Van',17,'8 large bags',true,ARRAY['Wedding Transportation','Corporate Travel','Group Tour'],32,'Premium luxury van for corporate and wedding travel.','Business-class interior, individual reading lights and premium recliners — the top pick for corporate offsites and wedding processions.','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80',ARRAY['Recliners','Charging ports','Ambient lighting','Mini fridge'],true,4),
('swift-dzire','Maruti Swift Dzire','Sedan',4,'2 medium bags',true,ARRAY['Local Travel','Airport Transfer'],9,'Nimble sedan for daily city rides.','A dependable everyday sedan — perfect for local rides across Bengaluru and short airport trips.','https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80',ARRAY['AC','Music system','Comfortable seats'],false,5),
('mercedes-benz-e-class','Mercedes-Benz E-Class','Luxury Sedan',3,'2 large bags',true,ARRAY['Corporate Travel','Wedding Transportation','Airport Transfer'],45,'Executive luxury for VIP transfers.','Chauffeur-driven luxury sedan for VIP airport transfers, weddings and executive travel.','https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80',ARRAY['Leather seats','Rear climate control','Wi-Fi ready'],false,6);

-- SEED PACKAGES
INSERT INTO public.packages (slug,name,location,duration,starting_from,category,travellers,short_description,description,highlights,inclusions,exclusions,price,image_url,is_featured,display_order) VALUES
('coorg-getaway-3d2n','Coorg Weekend Getaway','Coorg, Karnataka','3 Days / 2 Nights','Bengaluru','Hill Station','2-6','Coffee estates, waterfalls and misty mornings.','A relaxed 3-day escape through Coorg''s coffee country — Raja''s Seat, Abbey Falls, Dubare Elephant Camp and the tranquil Cauvery valley.',ARRAY['Abbey Falls','Dubare Elephant Camp','Raja''s Seat','Coffee plantation tour'],ARRAY['AC vehicle with driver','Fuel & tolls','Driver bata'],ARRAY['Stay & meals','Entry tickets'],11999,'https://images.unsplash.com/photo-1580889272861-dc2dbfa7c40b?w=1200&q=80',true,1),
('ooty-kodaikanal-5d4n','Ooty & Kodaikanal Twin Hills','Ooty & Kodaikanal, Tamil Nadu','5 Days / 4 Nights','Bengaluru','Hill Station','2-8','Two of South India''s most iconic hill stations in one trip.','Explore the Nilgiris and Palani hills — botanical gardens, boating on Kodai lake, the toy train and endless tea estates.',ARRAY['Nilgiri Toy Train','Kodai Lake boating','Doddabetta Peak','Coaker''s Walk'],ARRAY['AC vehicle with driver','Fuel & tolls'],ARRAY['Stays','Meals','Sightseeing tickets'],19999,'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=1200&q=80',true,2),
('chikmagalur-2d1n','Chikmagalur Coffee Trail','Chikmagalur, Karnataka','2 Days / 1 Night','Bengaluru','Weekend','2-6','Baba Budangiri, Mullayanagiri and coffee tastings.','A short, scenic run through Karnataka''s coffee capital — perfect for a rejuvenating weekend.',ARRAY['Mullayanagiri Peak','Baba Budangiri','Hebbe Falls'],ARRAY['AC vehicle with driver','Fuel & tolls'],ARRAY['Stay','Meals'],7999,'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80',true,3),
('kerala-backwaters-4d3n','Kerala Backwaters','Alleppey & Kumarakom, Kerala','4 Days / 3 Nights','Bengaluru','Backwaters','2-8','Houseboats, coconut lagoons and Kerala hospitality.','Cruise the backwaters of Alleppey and Kumarakom in a traditional houseboat, and unwind with Ayurveda in God''s own country.',ARRAY['Houseboat stay','Kumarakom bird sanctuary','Marari beach'],ARRAY['AC vehicle with driver','Fuel & tolls'],ARRAY['Houseboat','Meals'],17999,'https://images.unsplash.com/photo-1602642458631-cf7c76e79f28?w=1200&q=80',true,4),
('tirupati-darshan','Tirupati Darshan','Tirupati, Andhra Pradesh','1 Day','Bengaluru','Pilgrimage','2-13','Same-day Tirupati Balaji darshan.','Early-morning pickup from Bengaluru, VIP darshan assistance and return the same day.',ARRAY['Tirumala temple','Padmavathi temple','Kapila Theertham'],ARRAY['AC vehicle with driver','Toll & parking'],ARRAY['Darshan tickets','Meals'],5999,'https://images.unsplash.com/photo-1621996659490-3275b4d0d951?w=1200&q=80',false,5),
('mysore-day-trip','Mysore Heritage Day Trip','Mysore, Karnataka','1 Day','Bengaluru','Heritage','2-13','Palace city in a single day.','A comfortable day trip covering Mysore Palace, Chamundi Hills, Brindavan Gardens and Srirangapatna.',ARRAY['Mysore Palace','Chamundi Hills','Brindavan Gardens'],ARRAY['AC vehicle with driver','Fuel & tolls'],ARRAY['Entry tickets','Meals'],4499,'https://images.unsplash.com/photo-1600505574087-8c15c206c07f?w=1200&q=80',false,6);

-- SEED TESTIMONIALS
INSERT INTO public.testimonials (customer_name,customer_location,rating,review,travel_type,destination,fleet_used,is_featured,display_order) VALUES
('Ramesh Iyer','Bengaluru',5,'Booked an Innova for our Coorg trip. Driver was punctual, well-mannered and knew the roads inside out. Highly recommended!','Family Trip','Coorg','Toyota Innova Crysta',true,1),
('Priya Nair','Chennai',5,'Sowparnika arranged a Tempo Traveller for our family wedding in Mysore. Clean vehicle, professional driver — smooth end to end.','Wedding Transportation','Mysore','Tempo Traveller',true,2),
('Vikram Shetty','Mangalore',5,'Their airport pickup service is incredibly reliable. Never had a late arrival in six months of daily travel.','Airport Transfer','Bengaluru','Toyota Etios',true,3),
('Ananya Rao','Hyderabad',5,'Our Ooty–Kodaikanal package was flawlessly planned. The driver was patient with our kids and we felt safe throughout.','Outstation','Ooty & Kodaikanal','Toyota Innova Crysta',true,4),
('Sunil Kamath','Bengaluru',5,'Used their Urbania for a corporate offsite. Everyone was impressed with the vehicle and the service.','Corporate Travel','Chikmagalur','Force Urbania',false,5),
('Meera Balachandran','Kochi',5,'Very transparent pricing — no surprises later. Will book again for our next pilgrimage.','Pilgrimage','Tirupati','Toyota Innova Crysta',false,6);
