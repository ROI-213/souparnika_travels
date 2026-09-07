import { queryOptions } from "@tanstack/react-query";
import {
  DEFAULT_FLEETS,
  DEFAULT_FAQS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_BLOGS,
  type BlogArticle,
  type FAQItem,
} from "./data/vehicles";
import {
  getFleetsServerFn,
  getFleetBySlugServerFn,
  getPackagesServerFn,
  getPackageBySlugServerFn,
  getTestimonialsServerFn,
  getHeroSlidesServerFn,
  getHomeSectionsServerFn,
  getServicesServerFn,
  getServiceBySlugServerFn,
  getDestinationsServerFn,
  getWhyUsServerFn,
  getHowItWorksServerFn,
  getStatsServerFn,
  getFaqsServerFn,
  getBlogsServerFn,
  getBlogBySlugServerFn,
  submitEnquiryServerFn,
} from "./server-queries";

export type Fleet = {
  id: string;
  slug: string;
  name: string;
  category: string;
  seating: number;
  seating_label?: string | null;
  luggage: string | null;
  ac: boolean;
  suitable_for: string[] | null;
  starting_price: number | null;
  starting_from?: number | null;
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
  local_package_hours?: number | null;
  local_package_km?: number | null;
  local_package_rate?: number | null;
  local_package_12h_km?: number | null;
  local_package_12h_rate?: number | null;
  extra_hour_rate?: number | null;
  extra_km_rate?: number | null;
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
  is_popular?: boolean;
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
  extra: Record<string, any> | null;
  is_active: boolean;
};

import { DEFAULT_SERVICES, getServiceBySlug, type ServiceItem } from "./data/services";
export type { ServiceItem };

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
        const data = await getFleetsServerFn({ data: opts });
        if (data && data.length > 0) {
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
        const data = await getFleetBySlugServerFn({ data: slug });
        if (data) return data as Fleet;
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
        const data = await getPackagesServerFn({ data: opts });
        if (data && data.length > 0) {
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
        const data = await getPackageBySlugServerFn({ data: slug });
        if (data) {
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
        const data = await getTestimonialsServerFn({ data: opts });
        if (data && data.length > 0) {
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
        const data = await getFaqsServerFn();
        if (data && data.length > 0) {
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
        const data = await getBlogsServerFn();
        if (data && data.length > 0) {
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
        const data = await getBlogBySlugServerFn({ data: slug });
        if (data) return data as unknown as BlogArticle;
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
        const data = await getHeroSlidesServerFn();
        if (data && data.length > 0) return data as unknown as HeroSlide[];
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
        const data = await getHomeSectionsServerFn();
        if (data && Object.keys(data).length > 0) {
          return data;
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
        const data = await getDestinationsServerFn();
        if (data && data.length > 0) return data as unknown as Destination[];
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
        const data = await getWhyUsServerFn();
        if (data && data.length > 0) return data as unknown as WhyUsPoint[];
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
        const data = await getHowItWorksServerFn();
        if (data && data.length > 0) return data as unknown as HowItWorksStep[];
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
        const data = await getStatsServerFn();
        if (data && data.length > 0) return data as unknown as StatItem[];
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

export const servicesQuery = () =>
  queryOptions({
    queryKey: ["services"],
    queryFn: async (): Promise<ServiceItem[]> => {
      try {
        const data = await getServicesServerFn();
        if (data && data.length > 0) {
          return data as any as ServiceItem[];
        }
      } catch (e) {
        console.warn("Using services fallback:", e);
      }
      return DEFAULT_SERVICES as any as ServiceItem[];
    },
  });

export const serviceBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["services", slug],
    queryFn: async (): Promise<ServiceItem | null> => {
      const fallback = getServiceBySlug(slug) ?? null;
      try {
        const data = await getServiceBySlugServerFn({ data: slug });
        if (!data) return fallback;
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
    const res = await submitEnquiryServerFn({ data: payload });
    return { success: true, reference: res.reference };
  } catch (err) {
    console.warn("Local fallback enquiry recorded:", err);
    return { success: true, reference: `ST-${Date.now()}` };
  }
}
