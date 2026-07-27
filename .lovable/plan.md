
# Home Redesign + Full CMS

Scope confirmed: **Home page only**, **subtle** journey-route motif, **full admin CMS** for home content. Fleets/Packages/Testimonials already exist and stay as-is.

## 1. Database (single migration)

New tables (all with GRANTs, RLS, updated_at trigger). Public `SELECT` where `is_active = true`; admin (role=`admin`) full write.

- `hero_slides` — badge, heading, highlight_word, rotating_words[], description, desktop_image, tablet_image, mobile_image, video_url, primary_cta_{label,url}, secondary_cta_{label,url}, overlay_color, overlay_opacity, text_position, duration_ms, display_order, is_active
- `home_sections` — key (unique: about, why_us, cta, contact_preview, stats_band), label, heading, description, image, cta_label, cta_url, is_active
- `services` — title, slug, short_desc, description, icon, image, link_url, enquiry_defaults (jsonb), display_order, is_featured, is_active
- `destinations` — name, state, description, image, related_package_slug, display_order, is_featured, is_active
- `why_us_points` — icon, title, description, display_order, is_active
- `how_it_works_steps` — step_no, title, description, icon, display_order, is_active
- `stats` — prefix, value (int), suffix, label, icon, display_order, is_active
- `user_roles` — (user_id, role app_role) + `has_role()` security-definer fn

Seed each table with the demo content described in the prompt so the page is immediately populated.

## 2. Public home page — `src/routes/index.tsx`

Rebuild in these sections, each fed by TanStack Query + a server publishable client fetcher:

1. Cinematic hero carousel (from `hero_slides`) — rotating heading word, badge, dual CTAs, autoplay w/ pause-on-hover, keyboard + swipe, prefers-reduced-motion honored.
2. Floating quick-enquiry card (overlaps hero on desktop) — reuses `EnquiryForm` with `source="home_quick_enquiry"`.
3. Quick booking categories (from `services`, featured) — asymmetric grid, hover reveals, per-card Enquire button.
4. About preview (from `home_sections['about']`) — editorial split with experience badge.
5. Featured fleets — existing `fleets` where `is_featured`.
6. Popular packages — existing `packages` where `is_featured`.
7. Why Choose Us (from `why_us_points`) — curved SVG route with milestones (desktop), vertical timeline (mobile).
8. Services overview (from `services`) — vertical navigator on desktop, accordion on mobile.
9. Popular destinations (from `destinations`) — mosaic layout.
10. How it works (from `how_it_works_steps`) — 5 steps on subtle curved SVG.
11. Testimonials preview — existing approved+featured `testimonials`.
12. Stats band (from `stats`) — animated counters on scroll into view.
13. High-impact CTA (from `home_sections['cta']`).
14. Contact preview (from `home_sections['contact_preview']`) — map + info.

### Signature "journey route" (subtle)
A single SVG `<path>` per section acting as a divider/accent (gold or blue), animated with `stroke-dasharray` on IntersectionObserver. Mobile: vertical, shorter. Reduced-motion: static path. No moving vehicle sprite — kept restrained per the "Subtle" choice.

### Motion
Fade-up + stagger via existing Tailwind animation utilities and small IntersectionObserver hooks. No new heavy libraries.

## 3. Admin CMS

- Auth: enable email/password + Google OAuth (through Lovable broker). Public `/auth` route with sign-in/sign-up.
- Roles: `user_roles` table + `has_role(uid, role)`. First admin promoted via SQL comment in migration.
- Protected layout: `src/routes/_authenticated/route.tsx` (managed) + `_authenticated/admin.tsx` gate checking `has_role(user, 'admin')`.
- Admin pages under `/admin/*`:
  - `/admin` — dashboard with counts + recent enquiries
  - `/admin/hero` — CRUD hero slides (drag-reorder, active toggle, image URL, mobile/tablet variants)
  - `/admin/sections` — edit `home_sections` (about, cta, contact_preview, etc.)
  - `/admin/services` — CRUD
  - `/admin/destinations` — CRUD
  - `/admin/why-us` — CRUD
  - `/admin/how-it-works` — CRUD
  - `/admin/stats` — CRUD
  - `/admin/enquiries` — read enquiries, mark status
  - (fleets/packages/testimonials admin: out of scope for this pass — say so)
- Writes go through `createServerFn` with `requireSupabaseAuth` + role check, then `supabaseAdmin` for the mutation.
- Header: show "Admin" link when signed-in admin.

## 4. Technical details

- Server fns in `src/lib/home.functions.ts` (public reads via publishable client) and `src/lib/admin.functions.ts` (writes, auth-gated).
- Home route loader: `ensureQueryData` for all home content in parallel.
- `errorComponent` + `notFoundComponent` on every route with a loader.
- Register `attachSupabaseAuth` in `src/start.ts` if not already.
- New route files under `src/routes/_authenticated/admin.*.tsx` for each admin page.
- `zod` for admin form validation.

## 5. Out of scope (call out to user)

- Fleet/Package/Testimonial admin CRUD (already have public tables + seeded rows; keep as-is).
- About Us page redesign (user opted out).
- Full asset pipeline / image uploads — admin uses image URL fields (users can host on Lovable Assets or paste external URLs). Storage bucket + upload UI can be added on request.
- Email/WhatsApp notifications on admin submissions (would need a connector).

## Rough size

~1 large migration, ~15 new route files, ~10 new components, updates to `queries.ts`, `Header.tsx`, `EnquiryForm.tsx`. Expect several long build turns. I'll ship it in this order: migration → auth/roles → server fns → public home sections → admin shell → admin CRUD pages.

Approve and I'll start with the migration.
