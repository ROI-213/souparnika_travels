import { type ReactNode } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

export function LegalPage({
  title,
  crumb,
  children,
}: {
  title: string;
  crumb: string;
  children: ReactNode;
}) {
  return (
    <SiteLayout>
      <PageHero title={title} crumbs={[{ label: "Home" }, { label: crumb }]} />
      <section className="py-16">
        <article className="max-w-3xl mx-auto container-p space-y-4 text-muted-foreground leading-relaxed [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-[color:var(--brand-navy)] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_li]:leading-relaxed">
          {children}
        </article>
      </section>
    </SiteLayout>
  );
}
