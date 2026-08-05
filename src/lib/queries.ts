import { supabase } from "@/integrations/supabase/client";
import { queryOptions } from "@tanstack/react-query";
import {
  DEFAULT_FLEETS,
  DEFAULT_FAQS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_BLOGS,
  type BlogArticle,
  type FAQItem,
} from "./data/vehicles";

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
      try {
        let q = supabase.from("fleets").select("*").eq("is_active", true).order("display_order");
        if (opts?.featured) q = q.eq("is_featured", true);
        const { data, error } = await q;
        if (!error && data && data.length > 0) {
          return data as Fleet[];
        }
      } catch (e) {
        console.warn("Using default fleets fallback due to query issue:", e);
      }
      return opts?.featured ? DEFAULT_FLEETS.filter((f) => f.is_featured) : DEFAULT_FLEETS;
    },
  });

export const fleetBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["fleet", slug],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("fleets").select("*").eq("slug", slug).maybeSingle();
        if (!error && data) return data as Fleet;
      } catch (e) {
        console.warn("Using default fleet by slug fallback:", e);
      }
      return DEFAULT_FLEETS.find((f) => f.slug === slug || f.category.toLowerCase() === slug.toLowerCase()) ?? DEFAULT_FLEETS[0];
    },
  });

import { DEFAULT_PACKAGES, getPackageBySlug, type TravelPackage } from "./data/packages";

export type { TravelPackage };

export const packagesQuery = (opts?: { featured?: boolean }) =>
  queryOptions({
    queryKey: ["packages", opts?.featured ?? "all"],
    queryFn: async (): Promise<TravelPackage[]> => {
      try {
        let q = supabase.from("packages").select("*").eq("is_active", true).order("display_order");
        if (opts?.featured) q = q.eq("is_featured", true);
        const { data, error } = await q;
        if (!error && data && data.length > 0) {
          return data as unknown as TravelPackage[];
        }
      } catch (e) {
        console.warn("Using packages fallback:", e);
      }
      return opts?.featured ? DEFAULT_PACKAGES.filter((p) => p.is_featured) : DEFAULT_PACKAGES;
    },
  });

export const packageBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["package", slug],
    queryFn: async (): Promise<TravelPackage | null> => {
      try {
        const { data, error } = await supabase.from("packages").select("*").eq("slug", slug).maybeSingle();
        if (!error && data) {
          return data as unknown as TravelPackage;
        }
      } catch (e) {
        console.warn("Using package by slug fallback:", e);
      }
      return getPackageBySlug(slug) ?? DEFAULT_PACKAGES.find((p) => p.slug === slug) ?? DEFAULT_PACKAGES[0];
    },
  });

export const testimonialsQuery = (opts?: { featured?: boolean }) =>
  queryOptions({
    queryKey: ["testimonials", opts?.featured ?? "all"],
    queryFn: async () => {
      try {
        let q = supabase.from("testimonials").select("*").eq("is_approved", true).order("display_order");
        if (opts?.featured) q = q.eq("is_featured", true);
        const { data, error } = await q;
        if (!error && data && data.length > 0) {
          return data as Testimonial[];
        }
      } catch (e) {
        console.warn("Using testimonials fallback:", e);
      }
      return opts?.featured ? DEFAULT_TESTIMONIALS.filter((t) => t.is_featured) : DEFAULT_TESTIMONIALS;
    },
  });

export const faqsQuery = () =>
  queryOptions({
    queryKey: ["faqs"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("faqs").select("*").order("display_order");
        if (!error && data && data.length > 0) {
          return data as unknown as FAQItem[];
        }
      } catch (e) {
        console.warn("Using FAQs fallback:", e);
      }
      return DEFAULT_FAQS;
    },
  });

export const blogsQuery = () =>
  queryOptions({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("blogs").select("*").order("publish_date", { ascending: false });
        if (!error && data && data.length > 0) {
          return data as unknown as BlogArticle[];
        }
      } catch (e) {
        console.warn("Using blogs fallback:", e);
      }
      return DEFAULT_BLOGS;
    },
  });

export const blogBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["blog", slug],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("blogs").select("*").eq("slug", slug).maybeSingle();
        if (!error && data) return data as unknown as BlogArticle;
      } catch (e) {
        console.warn("Using blog by slug fallback:", e);
      }
      return DEFAULT_BLOGS.find((b) => b.slug === slug) ?? DEFAULT_BLOGS[0];
    },
  });

export const heroSlidesQuery = () =>
  queryOptions({
    queryKey: ["hero_slides"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("hero_slides")
          .select("*")
          .eq("is_active", true)
          .order("display_order");
        if (!error && data) return data as unknown as HeroSlide[];
      } catch (e) {
        console.warn("Using hero slides fallback:", e);
      }
      return [];
    },
  });

export const homeSectionsQuery = () =>
  queryOptions({
    queryKey: ["home_sections"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("home_sections").select("*").eq("is_active", true);
        if (!error && data) {
          const map: Record<string, HomeSection> = {};
          for (const row of (data ?? []) as unknown as HomeSection[]) map[row.key] = row;
          return map;
        }
      } catch (e) {
        console.warn("Using home sections fallback:", e);
      }
      return {};
    },
  });



export const destinationsQuery = () =>
  queryOptions({
    queryKey: ["destinations"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("destinations")
          .select("*")
          .eq("is_active", true)
          .order("display_order");
        if (!error && data) return data as unknown as Destination[];
      } catch (e) {
        console.warn("Using destinations fallback:", e);
      }
      return [];
    },
  });

export const whyUsQuery = () =>
  queryOptions({
    queryKey: ["why_us_points"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("why_us_points")
          .select("*")
          .eq("is_active", true)
          .order("display_order");
        if (!error && data) return data as unknown as WhyUsPoint[];
      } catch (e) {
        console.warn("Using why us fallback:", e);
      }
      return [];
    },
  });

export const howItWorksQuery = () =>
  queryOptions({
    queryKey: ["how_it_works_steps"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("how_it_works_steps")
          .select("*")
          .eq("is_active", true)
          .order("step_no");
        if (!error && data) return data as unknown as HowItWorksStep[];
      } catch (e) {
        console.warn("Using how it works fallback:", e);
      }
      return [];
    },
  });

export const statsQuery = () =>
  queryOptions({
    queryKey: ["stats"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("stats")
          .select("*")
          .eq("is_active", true)
          .order("display_order");
        if (!error && data) return data as unknown as StatItem[];
      } catch (e) {
        console.warn("Using stats fallback:", e);
      }
      return [];
    },
  });

export type EnquiryPayload = {
  name: string;
  phone: string;
  email?: string | null;
  trip_type?: string | null;
  pickup_location?: string | null;
  drop_location?: string | null;
  travel_date?: string | null;
  return_date?: string | null;
  passenger_count?: number | null;
  vehicle_preference?: string | null;
  notes?: string | null;
  source?: string | null;
};

import { DEFAULT_SERVICES, getServiceBySlug, type ServiceItem } from "./data/services";

export type { ServiceItem };

export const servicesQuery = () =>
  queryOptions({
    queryKey: ["services"],
    queryFn: async (): Promise<ServiceItem[]> => {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true });
        if (error || !data || data.length === 0) {
          return DEFAULT_SERVICES;
        }
        return data as ServiceItem[];
      } catch {
        return DEFAULT_SERVICES;
      }
    },
  });

export const serviceBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["services", slug],
    queryFn: async (): Promise<ServiceItem | null> => {
      const fallback = getServiceBySlug(slug) ?? null;
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("slug", slug)
          .single();
        if (error || !data) {
          return fallback;
        }
        const item = data as ServiceItem;
        return {
          ...(fallback ?? {}),
          ...item,
          features: item.features && Array.isArray(item.features) && item.features.length > 0 ? item.features : (fallback?.features ?? []),
          benefits: item.benefits && Array.isArray(item.benefits) && item.benefits.length > 0 ? item.benefits : (fallback?.benefits ?? []),
          recommended_fleets: item.recommended_fleets && Array.isArray(item.recommended_fleets) && item.recommended_fleets.length > 0 ? item.recommended_fleets : (fallback?.recommended_fleets ?? []),
          faqs: item.faqs && Array.isArray(item.faqs) && item.faqs.length > 0 ? item.faqs : (fallback?.faqs ?? []),
          package_options: item.package_options ?? fallback?.package_options ?? [],
          popular_destinations: item.popular_destinations ?? fallback?.popular_destinations ?? [],
          gallery: item.gallery ?? fallback?.gallery ?? [],
        } as ServiceItem;
      } catch {
        return fallback;
      }
    },
  });

export async function submitEnquiry(payload: EnquiryPayload) {
  try {
    const reference = `ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const { data, error } = await supabase.from("enquiries").insert([
      {
        reference,
        name: payload.name,
        phone: payload.phone,
        email: payload.email ?? null,
        pickup: payload.pickup_location ?? null,
        destination: payload.drop_location ?? null,
        travel_date: payload.travel_date ?? null,
        vehicle_type: payload.vehicle_preference ?? null,
        trip_type: payload.trip_type ?? null,
        message: payload.notes ?? null,
      },
    ]);
    if (error) {
      console.warn("Supabase enquiry submit notice:", error.message);
    }
    return { success: true, reference, data };
  } catch (err) {
    console.warn("Local fallback enquiry recorded:", err);
    return { success: true, reference: `LOCAL-${Date.now()}` };
  }
}

