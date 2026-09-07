import { createServerFn } from "@tanstack/react-start";
import { query, queryOne } from "./db";
import type {
  Fleet,
  Package,
  Testimonial,
  HeroSlide,
  HomeSection,
  ServiceItem,
  Destination,
  WhyUsPoint,
  HowItWorksStep,
  StatItem,
  EnquiryPayload,
} from "./queries";
import type { BlogArticle, FAQItem } from "./data/vehicles";

// ==========================================
// FLEETS
// ==========================================
export const getFleetsServerFn = createServerFn({ method: "GET" })
  .validator((opts?: { featured?: boolean }) => opts)
  .handler(async ({ data: opts }) => {
    try {
      let sql = `SELECT * FROM public.fleets WHERE is_active = true`;
      const params: any[] = [];
      if (opts?.featured) {
        sql += ` AND is_featured = true`;
      }
      sql += ` ORDER BY display_order ASC;`;
      const rows = await query<Fleet>(sql, params);
      return rows;
    } catch (err) {
      console.error("Failed to fetch fleets from PostgreSQL:", err);
      return [];
    }
  });

export const getFleetBySlugServerFn = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      const row = await queryOne<Fleet>(
        `SELECT * FROM public.fleets WHERE slug = $1 OR lower(category) = lower($1) LIMIT 1;`,
        [slug]
      );
      return row;
    } catch (err) {
      console.error(`Failed to fetch fleet ${slug} from PostgreSQL:`, err);
      return null;
    }
  });

// ==========================================
// PACKAGES
// ==========================================
export const getPackagesServerFn = createServerFn({ method: "GET" })
  .validator((opts?: { featured?: boolean }) => opts)
  .handler(async ({ data: opts }) => {
    try {
      let sql = `SELECT * FROM public.packages WHERE is_active = true`;
      const params: any[] = [];
      if (opts?.featured) {
        sql += ` AND is_featured = true`;
      }
      sql += ` ORDER BY display_order ASC;`;
      return await query<Package>(sql, params);
    } catch (err) {
      console.error("Failed to fetch packages from PostgreSQL:", err);
      return [];
    }
  });

export const getPackageBySlugServerFn = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      return await queryOne<Package>(
        `SELECT * FROM public.packages WHERE slug = $1 LIMIT 1;`,
        [slug]
      );
    } catch (err) {
      console.error(`Failed to fetch package ${slug} from PostgreSQL:`, err);
      return null;
    }
  });

// ==========================================
// TESTIMONIALS
// ==========================================
export const getTestimonialsServerFn = createServerFn({ method: "GET" })
  .validator((opts?: { featured?: boolean }) => opts)
  .handler(async ({ data: opts }) => {
    try {
      let sql = `SELECT * FROM public.testimonials WHERE is_approved = true`;
      const params: any[] = [];
      if (opts?.featured) {
        sql += ` AND is_featured = true`;
      }
      sql += ` ORDER BY display_order ASC, created_at DESC;`;
      return await query<Testimonial>(sql, params);
    } catch (err) {
      console.error("Failed to fetch testimonials from PostgreSQL:", err);
      return [];
    }
  });

export const submitReviewServerFn = createServerFn({ method: "POST" })
  .validator((payload: Record<string, any>) => payload)
  .handler(async ({ data }) => {
    try {
      const sql = `
        INSERT INTO public.testimonials (
          customer_name, customer_location, rating, review,
          travel_type, destination, fleet_used, avatar_url,
          is_approved, is_featured, display_order,
          email, phone, package_used, title, service_category
        ) VALUES (
          $1, $2, $3, $4,
          $5, $6, $7, $8,
          false, false, 999,
          $9, $10, $11, $12, $13
        ) RETURNING id;
      `;
      const rows = await query(sql, [
        data.customer_name,
        data.customer_location || null,
        data.rating || 5,
        data.review,
        data.travel_type || data.service_category || null,
        data.destination || null,
        data.fleet_used || null,
        data.avatar_url || null,
        data.email || null,
        data.phone || null,
        data.package_used || null,
        data.title || null,
        data.service_category || null,
      ]);
      return { success: true, id: rows[0]?.id };
    } catch (err: any) {
      console.error("Failed to submit review to PostgreSQL:", err);
      throw new Error(err.message || "Failed to submit review");
    }
  });

// ==========================================
// HERO SLIDES & HOME SECTIONS
// ==========================================
export const getHeroSlidesServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      return await query<HeroSlide>(
        `SELECT * FROM public.hero_slides WHERE is_active = true ORDER BY display_order ASC;`
      );
    } catch (err) {
      console.error("Failed to fetch hero_slides from PostgreSQL:", err);
      return [];
    }
  }
);

export const getHomeSectionsServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const rows = await query<HomeSection>(
        `SELECT * FROM public.home_sections WHERE is_active = true;`
      );
      const map: Record<string, any> = {};
      for (const r of rows) map[r.key] = r;
      return map;
    } catch (err) {
      console.error("Failed to fetch home_sections from PostgreSQL:", err);
      return {};
    }
  }
);

// ==========================================
// SERVICES
// ==========================================
export const getServicesServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      return await query<ServiceItem>(
        `SELECT * FROM public.services WHERE is_active = true ORDER BY display_order ASC;`
      );
    } catch (err) {
      console.error("Failed to fetch services from PostgreSQL:", err);
      return [];
    }
  }
);

export const getServiceBySlugServerFn = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      return await queryOne<ServiceItem>(
        `SELECT * FROM public.services WHERE slug = $1 LIMIT 1;`,
        [slug]
      );
    } catch (err) {
      console.error(`Failed to fetch service ${slug} from PostgreSQL:`, err);
      return null;
    }
  });

// ==========================================
// DESTINATIONS
// ==========================================
export const getDestinationsServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      return await query<Destination>(
        `SELECT * FROM public.destinations WHERE is_active = true ORDER BY display_order ASC;`
      );
    } catch (err) {
      console.error("Failed to fetch destinations from PostgreSQL:", err);
      return [];
    }
  }
);

// ==========================================
// WHY US, HOW IT WORKS, STATS
// ==========================================
export const getWhyUsServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      return await query<WhyUsPoint>(
        `SELECT * FROM public.why_us_points WHERE is_active = true ORDER BY display_order ASC;`
      );
    } catch (err) {
      console.error("Failed to fetch why_us_points from PostgreSQL:", err);
      return [];
    }
  }
);

export const getHowItWorksServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      return await query<HowItWorksStep>(
        `SELECT * FROM public.how_it_works_steps WHERE is_active = true ORDER BY step_no ASC;`
      );
    } catch (err) {
      console.error("Failed to fetch how_it_works_steps from PostgreSQL:", err);
      return [];
    }
  }
);

export const getStatsServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      return await query<StatItem>(
        `SELECT * FROM public.stats WHERE is_active = true ORDER BY display_order ASC;`
      );
    } catch (err) {
      console.error("Failed to fetch stats from PostgreSQL:", err);
      return [];
    }
  }
);

// ==========================================
// FAQS & BLOGS
// ==========================================
export const getFaqsServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      return await query<FAQItem>(
        `SELECT * FROM public.faqs WHERE is_active = true ORDER BY display_order ASC;`
      );
    } catch (err) {
      console.error("Failed to fetch faqs from PostgreSQL:", err);
      return [];
    }
  }
);

export const getBlogsServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      return await query<BlogArticle>(
        `SELECT * FROM public.blogs WHERE is_published = true ORDER BY publish_date DESC;`
      );
    } catch (err) {
      console.error("Failed to fetch blogs from PostgreSQL:", err);
      return [];
    }
  }
);

export const getBlogBySlugServerFn = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      return await queryOne<BlogArticle>(
        `SELECT * FROM public.blogs WHERE slug = $1 LIMIT 1;`,
        [slug]
      );
    } catch (err) {
      console.error(`Failed to fetch blog ${slug} from PostgreSQL:`, err);
      return null;
    }
  });

// ==========================================
// ENQUIRIES (SUBMIT & ADMIN)
// ==========================================
export const submitEnquiryServerFn = createServerFn({ method: "POST" })
  .validator((payload: EnquiryPayload) => payload)
  .handler(async ({ data: p }) => {
    try {
      const reference = `ST-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      const sql = `
        INSERT INTO public.enquiries (
          reference, name, phone, email, pickup, destination,
          travel_date, return_date, passengers, vehicle_type,
          trip_type, message, source, status
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10,
          $11, $12, $13, 'new'
        ) RETURNING id, reference;
      `;
      const rows = await query(sql, [
        reference,
        p.name,
        p.phone,
        p.email || null,
        p.pickup_location || null,
        p.drop_location || null,
        p.travel_date ? new Date(p.travel_date) : null,
        p.return_date ? new Date(p.return_date) : null,
        p.passenger_count || null,
        p.vehicle_preference || null,
        p.trip_type || null,
        p.notes || null,
        p.source || "website",
      ]);
      return { success: true, reference: rows[0]?.reference || reference, id: rows[0]?.id };
    } catch (err: any) {
      console.error("Failed to insert enquiry into PostgreSQL:", err);
      return { success: false, error: err.message };
    }
  });

export const getAdminEnquiriesServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      return await query(
        `SELECT * FROM public.enquiries ORDER BY created_at DESC;`
      );
    } catch (err) {
      console.error("Failed to fetch admin enquiries from PostgreSQL:", err);
      return [];
    }
  }
);

// ==========================================
// FLEET ADMIN MUTATIONS
// ==========================================
export const createFleetServerFn = createServerFn({ method: "POST" })
  .validator((fleet: Partial<Fleet>) => fleet)
  .handler(async ({ data: f }) => {
    try {
      const sql = `
        INSERT INTO public.fleets (
          slug, name, category, seating, luggage, ac, suitable_for,
          starting_price, short_description, description, image_url,
          features, is_featured, is_active, display_order, model,
          min_km, per_km_rate, driver_allowance, additional_charges, terms
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10, $11,
          $12, $13, $14, $15, $16,
          $17, $18, $19, $20, $21
        ) RETURNING *;
      `;
      const rows = await query(sql, [
        f.slug || `f-${Date.now()}`,
        f.name,
        f.category || "Standard",
        f.seating || 4,
        f.luggage || "3 Bags",
        f.ac ?? true,
        f.suitable_for || [],
        f.starting_price || 0,
        f.short_description || null,
        f.description || null,
        f.image_url || "/images/fleets/cars/sedan-new.png",
        f.features || [],
        f.is_featured ?? true,
        f.is_active ?? true,
        f.display_order || 0,
        f.model || f.name,
        f.min_km || 250,
        f.per_km_rate || f.starting_price || 15,
        f.driver_allowance || 500,
        f.additional_charges || "Tolls & Parking extra.",
        f.terms || "Standard terms apply.",
      ]);
      return { success: true, fleet: rows[0] };
    } catch (err: any) {
      console.error("Failed to create fleet in PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

export const deleteFleetServerFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      await query(`DELETE FROM public.fleets WHERE id = $1;`, [id]);
      return { success: true };
    } catch (err: any) {
      console.error("Failed to delete fleet from PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

// ==========================================
// STORAGE OBJECTS (PostgreSQL Media Buckets)
// ==========================================
export const saveStorageObjectServerFn = createServerFn({ method: "POST" })
  .validator((payload: {
    bucket_id?: string;
    name: string;
    mime_type?: string;
    size_bytes?: number;
    content_base64: string;
  }) => payload)
  .handler(async ({ data }) => {
    try {
      const bucket = data.bucket_id || "public";
      const publicUrl = `/api/storage/${bucket}/${encodeURIComponent(data.name)}`;
      const sql = `
        INSERT INTO public.storage_objects (
          bucket_id, name, mime_type, size_bytes, content_base64, public_url
        ) VALUES (
          $1, $2, $3, $4, $5, $6
        ) ON CONFLICT (bucket_id, name) DO UPDATE SET
          mime_type = EXCLUDED.mime_type,
          size_bytes = EXCLUDED.size_bytes,
          content_base64 = EXCLUDED.content_base64,
          public_url = EXCLUDED.public_url,
          updated_at = now()
        RETURNING id, public_url;
      `;
      const rows = await query(sql, [
        bucket,
        data.name,
        data.mime_type || "application/octet-stream",
        data.size_bytes || 0,
        data.content_base64,
        publicUrl,
      ]);
      return { success: true, url: publicUrl, id: rows[0]?.id };
    } catch (err: any) {
      console.error("Failed to save storage object in PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

export const getStorageObjectServerFn = createServerFn({ method: "GET" })
  .validator((opts: { bucket_id?: string; name: string }) => opts)
  .handler(async ({ data }) => {
    try {
      const bucket = data.bucket_id || "public";
      const row = await queryOne(
        `SELECT * FROM public.storage_objects WHERE bucket_id = $1 AND name = $2 LIMIT 1;`,
        [bucket, data.name]
      );
      return row;
    } catch (err) {
      console.error("Failed to get storage object from PostgreSQL:", err);
      return null;
    }
  });
