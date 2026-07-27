import { supabase } from "@/integrations/supabase/client";
import { queryOptions } from "@tanstack/react-query";

export type Fleet = {
  id: string;
  slug: string;
  name: string;
  category: string;
  seating: number;
  luggage: string | null;
  ac: boolean;
  suitable_for: string[] | null;
  starting_price: number | null;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  features: string[] | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  model: string | null;
  min_km: number | null;
  per_km_rate: number | null;
  driver_allowance: number | null;
  additional_charges: string | null;
  terms: string | null;
  available_local: boolean;
  available_outstation: boolean;
  gallery: string[] | null;
};

export type ItineraryDay = {
  day: number;
  title: string;
  description?: string | null;
  places?: string[] | null;
  image_url?: string | null;
};

export type Package = {
  id: string;
  slug: string;
  name: string;
  location: string;
  duration: string;
  starting_from: string | null;
  ending_point: string | null;
  category: string;
  travellers: string | null;
  short_description: string | null;
  description: string | null;
  highlights: string[] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  important_info: string[] | null;
  booking_terms: string | null;
  itinerary: ItineraryDay[] | null;
  price: number | null;
  image_url: string | null;
  gallery: string[] | null;
  is_featured: boolean;
  display_order: number;
  available_months: string[] | null;
  suggested_vehicles: string[] | null;
  min_travellers: number | null;
  max_travellers: number | null;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  customer_location: string | null;
  rating: number;
  review: string;
  travel_type: string | null;
  destination: string | null;
  fleet_used: string | null;
  avatar_url: string | null;
  is_featured: boolean;
  display_order: number;
  email?: string | null;
  phone?: string | null;
  package_used?: string | null;
  travel_date?: string | null;
  is_video?: boolean;
  video_url?: string | null;
  video_thumbnail?: string | null;
  title?: string | null;
  service_category?: string | null;
};

export type HeroSlide = {
  id: string;
  badge: string | null;
  heading: string;
  highlight_word: string | null;
  rotating_words: string[] | null;
  description: string | null;
  desktop_image: string | null;
  tablet_image: string | null;
  mobile_image: string | null;
  video_url: string | null;
  primary_cta_label: string | null;
  primary_cta_url: string | null;
  secondary_cta_label: string | null;
  secondary_cta_url: string | null;
  overlay_color: string | null;
  overlay_opacity: number | null;
  text_position: string | null;
  duration_ms: number | null;
  display_order: number | null;
  is_active: boolean;
};

export type HomeSection = {
  id: string;
  key: string;
  label: string | null;
  heading: string | null;
  description: string | null;
  image: string | null;
  secondary_image: string | null;
  cta_label: string | null;
  cta_url: string | null;
  secondary_cta_label: string | null;
  secondary_cta_url: string | null;
  extra: Record<string, unknown> | null;
  is_active: boolean;
};

export type ServiceItem = {
  id: string;
  title: string;
  slug: string | null;
  short_desc: string | null;
  description: string | null;
  icon: string | null;
  image: string | null;
  link_url: string | null;
  enquiry_defaults: Record<string, unknown> | null;
  display_order: number | null;
  is_featured: boolean | null;
  is_active: boolean;
};

export type Destination = {
  id: string;
  name: string;
  state: string | null;
  description: string | null;
  image: string | null;
  related_package_slug: string | null;
  display_order: number | null;
  is_featured: boolean | null;
  is_active: boolean;
};

export type WhyUsPoint = {
  id: string;
  icon: string | null;
  title: string;
  description: string | null;
  display_order: number | null;
  is_active: boolean;
};

export type HowItWorksStep = {
  id: string;
  step_no: number;
  title: string;
  description: string | null;
  icon: string | null;
  display_order: number | null;
  is_active: boolean;
};

export type StatItem = {
  id: string;
  prefix: string | null;
  value: number;
  suffix: string | null;
  label: string;
  icon: string | null;
  display_order: number | null;
  is_active: boolean;
};

export const fleetsQuery = (opts?: { featured?: boolean }) =>
  queryOptions({
    queryKey: ["fleets", opts?.featured ?? "all"],
    queryFn: async () => {
      let q = supabase.from("fleets").select("*").eq("is_active", true).order("display_order");
      if (opts?.featured) q = q.eq("is_featured", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Fleet[];
    },
  });

export const fleetBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["fleet", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("fleets").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return data as Fleet | null;
    },
  });

export const packagesQuery = (opts?: { featured?: boolean }) =>
  queryOptions({
    queryKey: ["packages", opts?.featured ?? "all"],
    queryFn: async () => {
      let q = supabase.from("packages").select("*").eq("is_active", true).order("display_order");
      if (opts?.featured) q = q.eq("is_featured", true);
      const { data, error } = await q;
      if (error) throw error;
      const packages = (data ?? []) as Package[];
      return packages.map(pkg => ({
        ...pkg,
        image_url: `/images/packages/${pkg.slug}.webp`
      }));
    },
  });

export const packageBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["package", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("packages").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      if (!data) return null;
      const pkg = data as Package;
      return {
        ...pkg,
        image_url: `/images/packages/${pkg.slug}.webp`
      };
    },
  });

export const testimonialsQuery = (opts?: { featured?: boolean }) =>
  queryOptions({
    queryKey: ["testimonials", opts?.featured ?? "all"],
    queryFn: async () => {
      let q = supabase.from("testimonials").select("*").eq("is_approved", true).order("display_order");
      if (opts?.featured) q = q.eq("is_featured", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Testimonial[];
    },
  });

export const heroSlidesQuery = () =>
  queryOptions({
    queryKey: ["hero_slides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return (data ?? []) as unknown as HeroSlide[];
    },
  });

export const homeSectionsQuery = () =>
  queryOptions({
    queryKey: ["home_sections"],
    queryFn: async () => {
      const { data, error } = await supabase.from("home_sections").select("*").eq("is_active", true);
      if (error) throw error;
      const map: Record<string, HomeSection> = {};
      for (const row of (data ?? []) as unknown as HomeSection[]) map[row.key] = row;
      return map;
    },
  });

export const servicesQuery = (opts?: { featured?: boolean }) =>
  queryOptions({
    queryKey: ["services", opts?.featured ?? "all"],
    queryFn: async () => {
      let q = supabase.from("services").select("*").eq("is_active", true).order("display_order");
      if (opts?.featured) q = q.eq("is_featured", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as unknown as ServiceItem[];
    },
  });

export const destinationsQuery = () =>
  queryOptions({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return (data ?? []) as unknown as Destination[];
    },
  });

export const whyUsQuery = () =>
  queryOptions({
    queryKey: ["why_us_points"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("why_us_points")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return (data ?? []) as unknown as WhyUsPoint[];
    },
  });

export const howItWorksQuery = () =>
  queryOptions({
    queryKey: ["how_it_works_steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("how_it_works_steps")
        .select("*")
        .eq("is_active", true)
        .order("step_no");
      if (error) throw error;
      return (data ?? []) as unknown as HowItWorksStep[];
    },
  });

export const statsQuery = () =>
  queryOptions({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stats")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return (data ?? []) as unknown as StatItem[];
    },
  });
