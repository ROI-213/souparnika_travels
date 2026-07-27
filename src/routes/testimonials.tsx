import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { testimonialsQuery } from "@/lib/queries";
import { supabase } from "@/integrations/supabase/client";
import { Star, MapPin, Calendar, Car, Package as PkgIcon, PlayCircle, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const SERVICE_CATEGORIES = [
  "All",
  "Fleet Service",
  "Package",
  "Family Trip",
  "Corporate Travel",
  "Airport Service",
  "Group Tour",
];

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Sowparnika Travels" },
      { name: "description", content: "Real stories from real travellers who chose Sowparnika Travels — reviews, ratings and video testimonials." },
      { property: "og:title", content: "Customer Testimonials — Sowparnika Travels" },
      { property: "og:description", content: "Loved by thousands of travellers across India." },
    ],
  }),
  component: TestimonialsPage,
});

function youtubeEmbed(url: string) {
  try {
    const u = new URL(url);
    let id = u.searchParams.get("v");
    if (!id && u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
    if (!id && u.pathname.includes("/embed/")) id = u.pathname.split("/embed/")[1];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch { return url; }
}

function TestimonialsPage() {
  const { data: items = [] } = useQuery(testimonialsQuery());
  const [filter, setFilter] = useState("All");

  const written = items.filter((t) => !t.is_video);
  const videos = items.filter((t) => t.is_video && (t.video_url || t.video_thumbnail));

  const filtered = useMemo(() => {
    if (filter === "All") return written;
    return written.filter((t) => (t.service_category ?? "").toLowerCase() === filter.toLowerCase());
  }, [written, filter]);

  return (
    <SiteLayout>
      <PageHero
        title="What Our Travellers Say"
        subtitle="Genuine stories, ratings and videos from customers across India."
        crumbs={[{ label: "Home" }, { label: "Testimonials" }]}
      />

      {/* Filters */}
      <section className="py-8 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto container-p flex flex-wrap gap-2">
          {SERVICE_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                filter === c
                  ? "bg-[color:var(--brand-navy)] text-white border-[color:var(--brand-navy)]"
                  : "bg-white text-foreground border-border hover:border-[color:var(--brand-navy)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Written Reviews */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto container-p">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl lg:text-3xl font-serif text-[color:var(--brand-navy)]">Customer Reviews</h2>
              <p className="text-sm text-muted-foreground mt-1">{filtered.length} {filtered.length === 1 ? "review" : "reviews"}</p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No reviews match this filter yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((t) => (
                <article key={t.id} className="rounded-2xl border border-border bg-white p-6 flex flex-col relative">
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-[color:var(--brand-gold)]/30" />
                  <div className="flex items-center gap-3">
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.customer_name} className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-[color:var(--brand-navy)]/10 flex items-center justify-center text-[color:var(--brand-navy)] font-semibold">
                        {t.customer_name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-[color:var(--brand-navy)]">{t.customer_name}</div>
                      {t.customer_location && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />{t.customer_location}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-0.5 text-[color:var(--brand-gold)]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  {t.title && <div className="mt-2 font-medium text-foreground">{t.title}</div>}
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85 flex-1">"{t.review}"</p>
                  <div className="mt-5 pt-4 border-t border-border space-y-1 text-xs text-muted-foreground">
                    {t.destination && (
                      <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{t.destination}</div>
                    )}
                    {t.fleet_used && (
                      <div className="flex items-center gap-1.5"><Car className="h-3.5 w-3.5" />{t.fleet_used}</div>
                    )}
                    {t.package_used && (
                      <div className="flex items-center gap-1.5"><PkgIcon className="h-3.5 w-3.5" />{t.package_used}</div>
                    )}
                    {t.travel_date && (
                      <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />
                        {new Date(t.travel_date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Testimonials */}
      {videos.length > 0 && (
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto container-p">
            <h2 className="text-2xl lg:text-3xl font-serif text-[color:var(--brand-navy)] mb-2">Video Testimonials</h2>
            <p className="text-sm text-muted-foreground mb-8">Hear directly from our travellers.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v) => (
                <VideoCard key={v.id} v={v} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Submit review */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto container-p">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-serif text-[color:var(--brand-navy)]">Share Your Experience</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Submitted reviews are reviewed by our team before appearing on this page.
            </p>
          </div>
          <SubmitReviewForm />
        </div>
      </section>
    </SiteLayout>
  );
}

function VideoCard({ v }: { v: any }) {
  const [play, setPlay] = useState(false);
  const isYT = v.video_url && /youtu/.test(v.video_url);
  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-white shadow-sm">
      <div className="relative aspect-video bg-black">
        {play && v.video_url ? (
          isYT ? (
            <iframe
              src={youtubeEmbed(v.video_url) + "?autoplay=1"}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={v.title ?? v.customer_name}
            />
          ) : (
            <video src={v.video_url} className="w-full h-full" controls autoPlay />
          )
        ) : (
          <button onClick={() => setPlay(true)} className="w-full h-full group relative">
            {v.video_thumbnail && (
              <img src={v.video_thumbnail} alt={v.title ?? v.customer_name} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition">
              <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
            </div>
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="font-semibold text-[color:var(--brand-navy)]">{v.customer_name}</div>
        {v.title && <div className="text-sm text-muted-foreground">{v.title}</div>}
        {v.destination && <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" />{v.destination}</div>}
      </div>
    </div>
  );
}

function SubmitReviewForm() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    phone: "",
    rating: 5,
    title: "",
    review: "",
    service_category: "Fleet Service",
    package_used: "",
    avatar_url: "",
    customer_location: "",
  });

  const update = (k: keyof typeof form, v: any) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.customer_name.trim() || !form.review.trim()) {
      toast.error("Please fill in your name and review.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("testimonials").insert({
      customer_name: form.customer_name.trim(),
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      rating: form.rating,
      title: form.title.trim() || null,
      review: form.review.trim(),
      service_category: form.service_category,
      package_used: form.package_used.trim() || null,
      avatar_url: form.avatar_url.trim() || null,
      customer_location: form.customer_location.trim() || null,
      travel_type: form.service_category,
      is_approved: false,
      is_featured: false,
      display_order: 999,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit your review. Please try again.");
      return;
    }
    toast.success("Thanks! Your review is pending admin approval.");
    setForm({
      customer_name: "", email: "", phone: "", rating: 5, title: "", review: "",
      service_category: "Fleet Service", package_used: "", avatar_url: "", customer_location: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-6 lg:p-8 space-y-4 shadow-sm">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cn">Your Name *</Label>
          <Input id="cn" value={form.customer_name} onChange={(e) => update("customer_name", e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="loc">Location</Label>
          <Input id="loc" value={form.customer_location} onChange={(e) => update("customer_location", e.target.value)} placeholder="City" />
        </div>
        <div>
          <Label htmlFor="em">Email</Label>
          <Input id="em" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="ph">Phone</Label>
          <Input id="ph" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div>
          <Label>Service / Package</Label>
          <Select value={form.service_category} onValueChange={(v) => update("service_category", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SERVICE_CATEGORIES.filter((s) => s !== "All").map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="pk">Package / Vehicle used</Label>
          <Input id="pk" value={form.package_used} onChange={(e) => update("package_used", e.target.value)} placeholder="e.g. Coorg 3D2N, Innova Crysta" />
        </div>
        <div>
          <Label>Rating</Label>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => update("rating", n)}>
                <Star className={`h-6 w-6 ${n <= form.rating ? "text-[color:var(--brand-gold)] fill-current" : "text-muted-foreground/30"}`} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="av">Your Photo URL (optional)</Label>
          <Input id="av" value={form.avatar_url} onChange={(e) => update("avatar_url", e.target.value)} placeholder="https://..." />
        </div>
      </div>
      <div>
        <Label htmlFor="ti">Review Title</Label>
        <Input id="ti" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Sum up your trip in a few words" />
      </div>
      <div>
        <Label htmlFor="rv">Your Review *</Label>
        <Textarea id="rv" rows={5} value={form.review} onChange={(e) => update("review", e.target.value)} required />
      </div>
      <Button type="submit" disabled={submitting} className="w-full bg-[color:var(--brand-navy)] hover:bg-[color:var(--brand-navy)]/90">
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Your review will appear here after our team approves it.
      </p>
    </form>
  );
}
