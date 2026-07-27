
-- ============ ROLES ============
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

DROP POLICY IF EXISTS "Users view own roles" ON public.user_roles;
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ SHARED updated_at trigger ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ HERO SLIDES ============
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
GRANT SELECT ON public.hero_slides TO anon, authenticated;
GRANT ALL ON public.hero_slides TO authenticated;
GRANT ALL ON public.hero_slides TO service_role;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active hero_slides" ON public.hero_slides FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write hero_slides" ON public.hero_slides FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_hero_slides_updated BEFORE UPDATE ON public.hero_slides FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ HOME SECTIONS ============
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
GRANT SELECT ON public.home_sections TO anon, authenticated;
GRANT ALL ON public.home_sections TO authenticated;
GRANT ALL ON public.home_sections TO service_role;
ALTER TABLE public.home_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active home_sections" ON public.home_sections FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write home_sections" ON public.home_sections FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_home_sections_updated BEFORE UPDATE ON public.home_sections FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ SERVICES ============
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
GRANT SELECT ON public.services TO anon, authenticated;
GRANT ALL ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active services" ON public.services FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ DESTINATIONS ============
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
GRANT SELECT ON public.destinations TO anon, authenticated;
GRANT ALL ON public.destinations TO authenticated;
GRANT ALL ON public.destinations TO service_role;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active destinations" ON public.destinations FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write destinations" ON public.destinations FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_destinations_updated BEFORE UPDATE ON public.destinations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ WHY US POINTS ============
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
GRANT SELECT ON public.why_us_points TO anon, authenticated;
GRANT ALL ON public.why_us_points TO authenticated;
GRANT ALL ON public.why_us_points TO service_role;
ALTER TABLE public.why_us_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active why_us_points" ON public.why_us_points FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write why_us_points" ON public.why_us_points FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_why_us_updated BEFORE UPDATE ON public.why_us_points FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ HOW IT WORKS STEPS ============
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
GRANT SELECT ON public.how_it_works_steps TO anon, authenticated;
GRANT ALL ON public.how_it_works_steps TO authenticated;
GRANT ALL ON public.how_it_works_steps TO service_role;
ALTER TABLE public.how_it_works_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active how_it_works_steps" ON public.how_it_works_steps FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write how_it_works_steps" ON public.how_it_works_steps FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_how_it_works_updated BEFORE UPDATE ON public.how_it_works_steps FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ STATS ============
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
GRANT SELECT ON public.stats TO anon, authenticated;
GRANT ALL ON public.stats TO authenticated;
GRANT ALL ON public.stats TO service_role;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active stats" ON public.stats FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write stats" ON public.stats FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_stats_updated BEFORE UPDATE ON public.stats FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ SEED DATA ============
INSERT INTO public.hero_slides (badge, heading, highlight_word, rotating_words, description, desktop_image, mobile_image, primary_cta_label, primary_cta_url, secondary_cta_label, secondary_cta_url, display_order) VALUES
('Trusted Travel Partner in Bengaluru', 'Travel Comfortably with', 'Sowparnika Travels', ARRAY['Local Journeys','Airport Transfers','Family Holidays','Corporate Travel','South India Tours'], 'Reliable vehicles, experienced drivers and thoughtfully planned journeys for local travel, airport transfers, outstation trips and memorable holidays.', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80', 'Book Your Journey', '/booking', 'Explore Our Fleets', '/fleets', 1),
('Airport Transfers, 24×7', 'Reliable Rides to', 'Kempegowda Airport', ARRAY['On-Time Pickup','Meet & Greet','Fixed Fare'], 'Comfortable, punctual airport transfers with professional drivers and clean, well-maintained vehicles.', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', 'Book Airport Transfer', '/booking', 'View Packages', '/packages', 2);

INSERT INTO public.home_sections (key, label, heading, description, image, secondary_image, cta_label, cta_url, secondary_cta_label, secondary_cta_url, extra) VALUES
('about', 'About Sowparnika Travels', 'Journeys Planned with Care, Driven with Trust', 'For over a decade we have been helping Bengaluru families, professionals and travellers move safely and comfortably. Our fleet, drivers and support team are built around one idea — every journey deserves care.', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80', 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&q=80', 'Discover Our Story', '/about-us', 'Meet Our Fleet', '/fleets', '{"years":"10+","badge":"Years of Trusted Travel"}'::jsonb),
('cta', 'Ready to Travel', 'Planning Your Next Trip?', 'Tell us where you want to go and our travel team will help you choose the right vehicle, route and package.', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80', NULL, 'Request a Quote', '/booking', 'View Packages', '/packages', '{}'::jsonb),
('contact_preview', 'Visit or Reach Us', 'We''re Here, Around the Clock', 'Call, WhatsApp or drop by our Bengaluru office — our travel desk is ready to plan your next journey.', NULL, NULL, 'Contact Us', '/contact-us', 'Get Directions', 'https://maps.google.com/?q=Rajajinagar+Bengaluru', '{}'::jsonb);

INSERT INTO public.services (title, slug, short_desc, description, icon, image, link_url, display_order, is_featured) VALUES
('Local Travel', 'local-travel', 'Hourly and daily city rentals across Bengaluru.', 'Comfortable cabs for everyday city travel with hourly and full-day packages.', 'MapPin', 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80', '/fleets', 1, true),
('Airport Transfer', 'airport-transfer', 'Punctual pickup and drop to Kempegowda Airport.', 'Reliable and on-time airport transfers with fixed transparent pricing.', 'Plane', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80', '/booking', 2, true),
('Outstation Travel', 'outstation', 'One-way and round trips across South India.', 'Long-distance outstation trips with experienced drivers who know the routes.', 'Route', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80', '/packages', 3, true),
('Corporate Travel', 'corporate', 'Reliable transport for companies and teams.', 'Monthly billing, corporate accounts and dedicated fleets for business travel.', 'Briefcase', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80', '/booking', 4, true),
('Family Trips', 'family-trips', 'Comfortable holidays for the whole family.', 'Spacious vehicles and family-friendly itineraries across Karnataka and Kerala.', 'Users', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80', '/packages', 5, true),
('Group Tours', 'group-tours', 'Tempo travellers and buses for larger groups.', 'Group travel made simple with the right vehicle for every party size.', 'UsersRound', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80', '/fleets', 6, true),
('Wedding Transport', 'wedding-transport', 'Elegant vehicles for the big day.', 'Wedding-day transport for family, guests and the couple, coordinated end-to-end.', 'Heart', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', '/booking', 7, true),
('Custom Packages', 'custom-packages', 'Tailored tours designed around you.', 'Fully customized travel packages built around your interests, pace and budget.', 'Sparkles', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80', '/packages', 8, true);

INSERT INTO public.destinations (name, state, description, image, related_package_slug, display_order, is_featured) VALUES
('Mysuru', 'Karnataka', 'The city of palaces, gardens and heritage.', 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80', NULL, 1, true),
('Coorg', 'Karnataka', 'Misty hills, coffee estates and quiet trails.', 'https://images.unsplash.com/photo-1518509562904-e7ef99cddc85?w=1200&q=80', NULL, 2, true),
('Chikkamagaluru', 'Karnataka', 'Coffee country tucked into the Western Ghats.', 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=1200&q=80', NULL, 3, true),
('Hampi', 'Karnataka', 'Boulders, temples and a UNESCO World Heritage story.', 'https://images.unsplash.com/photo-1580500550469-4e5d90d8bd60?w=1200&q=80', NULL, 4, true),
('Ooty', 'Tamil Nadu', 'Queen of the hill stations, all year round.', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80', NULL, 5, true),
('Wayanad', 'Kerala', 'Waterfalls, wildlife and green plantations.', 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=1200&q=80', NULL, 6, true),
('Munnar', 'Kerala', 'Tea gardens carved into the mountains.', 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1200&q=80', NULL, 7, true),
('Kodaikanal', 'Tamil Nadu', 'Lakes, cliffs and cool mountain air.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80', NULL, 8, true);

INSERT INTO public.why_us_points (icon, title, description, display_order) VALUES
('ShieldCheck','Well-Maintained Vehicles','Every vehicle is regularly serviced and cleaned before each trip.',1),
('BadgeCheck','Experienced Drivers','Verified drivers with years of Bengaluru and outstation experience.',2),
('IndianRupee','Transparent Pricing','Clear quotations with no hidden surprises at the end of the trip.',3),
('Clock','On-Time Pickup','Punctual pickups for airports, offices and holidays.',4),
('Headphones','24/7 Support','A live travel desk available around the clock for any request.',5),
('Sparkle','Comfortable Travel','Clean interiors, working AC and well-planned rest stops.',6),
('Route','Customized Packages','Trips built around your interests, budget and travel pace.',7),
('CheckCircle','Trusted for Years','A long list of returning families and companies who travel with us.',8);

INSERT INTO public.how_it_works_steps (step_no, title, description, icon, display_order) VALUES
(1,'Choose a fleet or package','Browse vehicles or curated packages and pick one that suits your plan.','Compass',1),
(2,'Submit travel details','Share pickup, drop, dates and passengers using our quick enquiry form.','FileText',2),
(3,'Receive a quotation','Our team confirms availability and shares a clear, itemised quote.','MessageSquare',3),
(4,'Confirm your booking','Approve the quote and we lock the vehicle and driver for your dates.','Check',4),
(5,'Enjoy your journey','Meet your driver on time and travel comfortably from start to finish.','MapPinned',5);

INSERT INTO public.stats (prefix, value, suffix, label, display_order) VALUES
(NULL, 10, '+', 'Years of Experience', 1),
(NULL, 25000, '+', 'Happy Customers', 2),
(NULL, 50000, '+', 'Successful Trips', 3),
(NULL, 40, '+', 'Vehicles in Fleet', 4),
(NULL, 120, '+', 'Destinations Covered', 5);
