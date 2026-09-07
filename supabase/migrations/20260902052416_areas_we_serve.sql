-- ============ AREAS ============
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
GRANT SELECT ON public.areas TO anon, authenticated;
GRANT ALL ON public.areas TO authenticated;
GRANT ALL ON public.areas TO service_role;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active areas" ON public.areas FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write areas" ON public.areas FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_areas_updated BEFORE UPDATE ON public.areas FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ AREA LANDMARKS ============
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
GRANT SELECT ON public.area_landmarks TO anon, authenticated;
GRANT ALL ON public.area_landmarks TO authenticated;
GRANT ALL ON public.area_landmarks TO service_role;
ALTER TABLE public.area_landmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active landmarks" ON public.area_landmarks FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write landmarks" ON public.area_landmarks FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_area_landmarks_updated BEFORE UPDATE ON public.area_landmarks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ LOCAL PRICING ============
CREATE TABLE IF NOT EXISTS public.local_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  area_id UUID NOT NULL REFERENCES public.areas(id) ON DELETE CASCADE,
  vehicle_id UUID NOT NULL REFERENCES public.fleets(id) ON DELETE CASCADE,
  package_name TEXT NOT NULL, -- e.g. "8 Hours / 80 KM"
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
GRANT SELECT ON public.local_pricing TO anon, authenticated;
GRANT ALL ON public.local_pricing TO authenticated;
GRANT ALL ON public.local_pricing TO service_role;
ALTER TABLE public.local_pricing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active local pricing" ON public.local_pricing FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write local pricing" ON public.local_pricing FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_local_pricing_updated BEFORE UPDATE ON public.local_pricing FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ OUTSTATION ROUTES ============
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
GRANT SELECT ON public.outstation_routes TO anon, authenticated;
GRANT ALL ON public.outstation_routes TO authenticated;
GRANT ALL ON public.outstation_routes TO service_role;
ALTER TABLE public.outstation_routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active outstation routes" ON public.outstation_routes FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write outstation routes" ON public.outstation_routes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_outstation_routes_updated BEFORE UPDATE ON public.outstation_routes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ OUTSTATION ROUTE PRICING ============
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
GRANT SELECT ON public.outstation_route_pricing TO anon, authenticated;
GRANT ALL ON public.outstation_route_pricing TO authenticated;
GRANT ALL ON public.outstation_route_pricing TO service_role;
ALTER TABLE public.outstation_route_pricing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view active route pricing" ON public.outstation_route_pricing FOR SELECT USING (true);
CREATE POLICY "Admins write route pricing" ON public.outstation_route_pricing FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_route_pricing_updated BEFORE UPDATE ON public.outstation_route_pricing FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ PRICING RULES (GLOBAL SETTINGS) ============
CREATE TABLE IF NOT EXISTS public.pricing_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value_numeric NUMERIC,
  value_text TEXT,
  value_json JSONB,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pricing_rules TO anon, authenticated;
GRANT ALL ON public.pricing_rules TO authenticated;
GRANT ALL ON public.pricing_rules TO service_role;
ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view pricing rules" ON public.pricing_rules FOR SELECT USING (true);
CREATE POLICY "Admins write pricing rules" ON public.pricing_rules FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_pricing_rules_updated BEFORE UPDATE ON public.pricing_rules FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- SEED GLOBAL RULES
INSERT INTO public.pricing_rules (key, value_numeric, description) VALUES
('outstation_min_km_per_day', 300, 'Minimum kilometers charged per day for outstation trips.'),
('default_gst_percentage', 5, 'Default GST percentage to apply if not overridden.')
ON CONFLICT (key) DO NOTHING;
