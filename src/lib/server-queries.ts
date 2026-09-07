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
import type { UrbaniaFleetRate } from "./data/urbania-pricing";

// ==========================================
// FLEETS
// ==========================================
export const getFleetsServerFn = createServerFn({ method: "GET" })
  .validator((opts?: { featured?: boolean; includeInactive?: boolean }) => opts)
  .handler(async ({ data: opts }) => {
    try {
      let sql = `SELECT * FROM public.fleets`;
      const conditions: string[] = [];
      const params: any[] = [];
      if (!opts?.includeInactive) {
        conditions.push(`is_active = true`);
      }
      if (opts?.featured) {
        conditions.push(`is_featured = true`);
      }
      if (conditions.length > 0) {
        sql += ` WHERE ` + conditions.join(" AND ");
      }
      sql += ` ORDER BY display_order ASC, created_at ASC;`;
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
        `SELECT * FROM public.fleets 
         WHERE slug = $1 
            OR slug = replace($1, 'toyota-', '') 
            OR slug = concat('toyota-', $1) 
            OR lower(category) = lower($1)
         ORDER BY (slug = $1) DESC 
         LIMIT 1;`,
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
// ==========================================
// FLEET ADMIN MUTATIONS
// ==========================================
export const createFleetServerFn = createServerFn({ method: "POST" })
  .validator((fleet: Partial<Fleet>) => fleet)
  .handler(async ({ data: f }) => {
    try {
      const sql = `
        INSERT INTO public.fleets (
          slug, name, category, seating, seating_label, luggage, ac, suitable_for,
          starting_price, short_description, description, image_url,
          features, is_featured, is_active, display_order, model,
          min_km, per_km_rate, driver_allowance, local_package_hours, local_package_km,
          local_package_rate, local_package_12h_km, local_package_12h_rate, extra_hour_rate,
          extra_km_rate, additional_charges, terms
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8,
          $9, $10, $11, $12,
          $13, $14, $15, $16, $17,
          $18, $19, $20, $21, $22,
          $23, $24, $25, $26,
          $27, $28, $29
        ) RETURNING *;
      `;
      const rows = await query(sql, [
        f.slug || `f-${Date.now()}`,
        f.name,
        f.category || "Standard",
        f.seating || 4,
        f.seating_label || `${f.seating || 4} Seater`,
        f.luggage || "3 Bags",
        f.ac ?? true,
        f.suitable_for || ["Local", "Outstation"],
        f.starting_price || f.per_km_rate || 15,
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
        f.local_package_hours || 8,
        f.local_package_km || 80,
        f.local_package_rate || 3500,
        f.local_package_12h_km || 100,
        f.local_package_12h_rate || null,
        f.extra_hour_rate || 200,
        f.extra_km_rate || f.per_km_rate || 15,
        f.additional_charges || "Tolls & Parking extra.",
        f.terms || "Standard terms apply.",
      ]);
      return { success: true, fleet: rows[0] };
    } catch (err: any) {
      console.error("Failed to create fleet in PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

export const updateFleetServerFn = createServerFn({ method: "POST" })
  .validator((fleet: Partial<Fleet> & { id: string }) => fleet)
  .handler(async ({ data: f }) => {
    try {
      const sql = `
        UPDATE public.fleets SET
          name = COALESCE($2, name),
          slug = COALESCE($3, slug),
          category = COALESCE($4, category),
          seating = COALESCE($5, seating),
          seating_label = COALESCE($6, seating_label),
          luggage = COALESCE($7, luggage),
          ac = COALESCE($8, ac),
          suitable_for = COALESCE($9, suitable_for),
          starting_price = COALESCE($10, starting_price),
          per_km_rate = COALESCE($11, per_km_rate),
          min_km = COALESCE($12, min_km),
          driver_allowance = COALESCE($13, driver_allowance),
          local_package_hours = COALESCE($14, local_package_hours),
          local_package_km = COALESCE($15, local_package_km),
          local_package_rate = COALESCE($16, local_package_rate),
          local_package_12h_km = COALESCE($17, local_package_12h_km),
          local_package_12h_rate = COALESCE($18, local_package_12h_rate),
          extra_hour_rate = COALESCE($19, extra_hour_rate),
          extra_km_rate = COALESCE($20, extra_km_rate),
          short_description = COALESCE($21, short_description),
          description = COALESCE($22, description),
          image_url = COALESCE($23, image_url),
          features = COALESCE($24, features),
          is_featured = COALESCE($25, is_featured),
          is_active = COALESCE($26, is_active),
          display_order = COALESCE($27, display_order),
          updated_at = now()
        WHERE id::text = $1 OR slug = $3
        RETURNING *;
      `;
      const rows = await query<Fleet>(sql, [
        f.id,
        f.name ?? null,
        f.slug ?? null,
        f.category ?? null,
        f.seating !== undefined ? Number(f.seating) : null,
        f.seating_label ?? null,
        f.luggage ?? null,
        f.ac !== undefined ? Boolean(f.ac) : null,
        f.suitable_for ?? null,
        f.starting_price !== undefined ? Number(f.starting_price) : null,
        f.per_km_rate !== undefined ? Number(f.per_km_rate) : null,
        f.min_km !== undefined ? Number(f.min_km) : null,
        f.driver_allowance !== undefined ? Number(f.driver_allowance) : null,
        f.local_package_hours !== undefined ? Number(f.local_package_hours) : null,
        f.local_package_km !== undefined ? Number(f.local_package_km) : null,
        f.local_package_rate !== undefined ? Number(f.local_package_rate) : null,
        f.local_package_12h_km !== undefined ? Number(f.local_package_12h_km) : null,
        f.local_package_12h_rate !== undefined ? Number(f.local_package_12h_rate) : null,
        f.extra_hour_rate !== undefined ? Number(f.extra_hour_rate) : null,
        f.extra_km_rate !== undefined ? Number(f.extra_km_rate) : null,
        f.short_description ?? null,
        f.description ?? null,
        f.image_url ?? null,
        f.features ?? null,
        f.is_featured !== undefined ? Boolean(f.is_featured) : null,
        f.is_active !== undefined ? Boolean(f.is_active) : null,
        f.display_order !== undefined ? Number(f.display_order) : null,
      ]);
      return { success: true, fleet: rows[0] };
    } catch (err: any) {
      console.error("Failed to update fleet in PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

export const deleteFleetServerFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      await query(`DELETE FROM public.fleets WHERE id::text = $1;`, [id]);
      return { success: true };
    } catch (err: any) {
      console.error("Failed to delete fleet from PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

// ==========================================
// URBANIA RATES CMS (PostgreSQL pricing_rules)
// ==========================================
export const getUrbaniaRatesServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const row = await queryOne<{ value_json: any }>(
        `SELECT value_json FROM public.pricing_rules WHERE key = 'urbania_rates' LIMIT 1;`
      );
      if (row && row.value_json && Array.isArray(row.value_json)) {
        return row.value_json as UrbaniaFleetRate[];
      }
      return null;
    } catch (err) {
      console.error("Failed to get urbania_rates from PostgreSQL:", err);
      return null;
    }
  }
);

export const saveUrbaniaRatesServerFn = createServerFn({ method: "POST" })
  .validator((rates: UrbaniaFleetRate[]) => rates)
  .handler(async ({ data: rates }) => {
    try {
      // 1. Upsert into pricing_rules
      await query(
        `INSERT INTO public.pricing_rules (key, value_json, description, updated_at)
         VALUES ('urbania_rates', $1, 'Force Urbania & Maharaja fleet rates', now())
         ON CONFLICT (key) DO UPDATE SET
           value_json = EXCLUDED.value_json,
           updated_at = now();`,
        [JSON.stringify(rates)]
      );

      // 2. Also update matching fleets in public.fleets
      for (const r of rates) {
        if (r.slug) {
          await query(
            `UPDATE public.fleets SET
              per_km_rate = COALESCE($2, per_km_rate),
              local_package_rate = COALESCE($3, local_package_rate),
              local_package_12h_rate = COALESCE($4, local_package_12h_rate),
              extra_km_rate = COALESCE($5, extra_km_rate),
              extra_hour_rate = COALESCE($6, extra_hour_rate),
              driver_allowance = COALESCE($7, driver_allowance),
              min_km = COALESCE($8, min_km),
              updated_at = now()
            WHERE slug = $1 OR slug LIKE '%' || $1 || '%'`,
            [
              r.slug,
              r.outstation_per_km || null,
              r.local_8hr_80km || null,
              r.local_12hr_100km || null,
              r.extra_km || null,
              r.extra_hour || null,
              r.driver_allowance || null,
              r.outstation_min_km_per_day || null,
            ]
          );
        }
      }
      return { success: true };
    } catch (err: any) {
      console.error("Failed to save urbania_rates to PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

// ==========================================
// FAQS MUTATIONS
// ==========================================
export const createFaqServerFn = createServerFn({ method: "POST" })
  .validator((faq: Partial<FAQItem>) => faq)
  .handler(async ({ data: f }) => {
    try {
      const rows = await query(
        `INSERT INTO public.faqs (question, answer, category, display_order, is_active)
         VALUES ($1, $2, $3, $4, true) RETURNING *;`,
        [f.question, f.answer, f.category || "General", f.display_order || 99]
      );
      return { success: true, faq: rows[0] };
    } catch (err: any) {
      console.error("Failed to create FAQ in PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

export const updateFaqServerFn = createServerFn({ method: "POST" })
  .validator((faq: Partial<FAQItem> & { id: string }) => faq)
  .handler(async ({ data: f }) => {
    try {
      const rows = await query(
        `UPDATE public.faqs SET
          question = COALESCE($2, question),
          answer = COALESCE($3, answer),
          category = COALESCE($4, category),
          updated_at = now()
         WHERE id::text = $1 RETURNING *;`,
        [f.id, f.question ?? null, f.answer ?? null, f.category ?? null]
      );
      return { success: true, faq: rows[0] };
    } catch (err: any) {
      console.error("Failed to update FAQ in PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

export const deleteFaqServerFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      await query(`DELETE FROM public.faqs WHERE id::text = $1;`, [id]);
      return { success: true };
    } catch (err: any) {
      console.error("Failed to delete FAQ from PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

// ==========================================
// PACKAGES MUTATIONS
// ==========================================
export const createPackageServerFn = createServerFn({ method: "POST" })
  .validator((pkg: Partial<Package>) => pkg)
  .handler(async ({ data: p }) => {
    try {
      const slug = p.slug || (p.name || "package").toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
      const rows = await query(
        `INSERT INTO public.packages (
          slug, name, location, duration, category, price, is_featured, is_active, display_order
        ) VALUES ($1, $2, $3, $4, $5, $6, true, true, $7) RETURNING *;`,
        [slug, p.name, p.location || "South India", p.duration || "2 Days / 1 Night", p.category || "Tour", p.price || 9999, p.display_order || 99]
      );
      return { success: true, package: rows[0] };
    } catch (err: any) {
      console.error("Failed to create package in PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

export const updatePackageServerFn = createServerFn({ method: "POST" })
  .validator((pkg: Partial<Package> & { id: string }) => pkg)
  .handler(async ({ data: p }) => {
    try {
      const rows = await query(
        `UPDATE public.packages SET
          name = COALESCE($2, name),
          location = COALESCE($3, location),
          duration = COALESCE($4, duration),
          category = COALESCE($5, category),
          price = COALESCE($6, price),
          updated_at = now()
         WHERE id::text = $1 RETURNING *;`,
        [p.id, p.name ?? null, p.location ?? null, p.duration ?? null, p.category ?? null, p.price !== undefined ? Number(p.price) : null]
      );
      return { success: true, package: rows[0] };
    } catch (err: any) {
      console.error("Failed to update package in PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

export const deletePackageServerFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      await query(`DELETE FROM public.packages WHERE id::text = $1;`, [id]);
      return { success: true };
    } catch (err: any) {
      console.error("Failed to delete package from PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

// ==========================================
// AREAS (Routes & Coverage)
// ==========================================
export const getAreasServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      return await query(
        `SELECT id, name, slug, city, state, airport_distance, is_active FROM public.areas ORDER BY name ASC;`
      );
    } catch (err) {
      console.error("Failed to fetch areas from PostgreSQL:", err);
      return [];
    }
  }
);

export const createAreaServerFn = createServerFn({ method: "POST" })
  .validator((area: { name: string; slug: string; airport_distance?: string }) => area)
  .handler(async ({ data: a }) => {
    try {
      const rows = await query(
        `INSERT INTO public.areas (name, slug, city, state, airport_distance, is_active)
         VALUES ($1, $2, 'Bengaluru', 'Karnataka', $3, true) RETURNING *;`,
        [a.name, a.slug, a.airport_distance || "~35 km"]
      );
      return { success: true, area: rows[0] };
    } catch (err: any) {
      console.error("Failed to create area in PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

export const updateAreaServerFn = createServerFn({ method: "POST" })
  .validator((area: { id: string; name?: string; slug?: string; airport_distance?: string; is_active?: boolean }) => area)
  .handler(async ({ data: a }) => {
    try {
      const rows = await query(
        `UPDATE public.areas SET
          name = COALESCE($2, name),
          slug = COALESCE($3, slug),
          airport_distance = COALESCE($4, airport_distance),
          is_active = COALESCE($5, is_active),
          updated_at = now()
         WHERE id::text = $1 RETURNING *;`,
        [a.id, a.name ?? null, a.slug ?? null, a.airport_distance ?? null, a.is_active !== undefined ? Boolean(a.is_active) : null]
      );
      return { success: true, area: rows[0] };
    } catch (err: any) {
      console.error("Failed to update area in PostgreSQL:", err);
      throw new Error(err.message);
    }
  });

export const deleteAreaServerFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      await query(`DELETE FROM public.areas WHERE id::text = $1;`, [id]);
      return { success: true };
    } catch (err: any) {
      console.error("Failed to delete area from PostgreSQL:", err);
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
