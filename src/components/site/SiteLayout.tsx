import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { EnquiryDialog } from "./EnquiryDialog";

export function SiteLayout({ children, hideHeader = false }: { children: ReactNode; hideHeader?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
      <EnquiryDialog />
    </div>
  );
}


export function PageHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs?: { label: string; to?: string }[];
}) {
  return (
    <section className="bg-gradient-to-br from-[color:var(--brand-navy)] to-[color:var(--brand-blue)] text-white">
      <div className="max-w-7xl mx-auto container-p py-16 lg:py-24">
        {crumbs && (
          <nav className="text-xs text-white/70 mb-3">
            {crumbs.map((c, i) => (
              <span key={i}>
                {c.label}
                {i < crumbs.length - 1 ? " / " : ""}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-4xl lg:text-5xl font-extrabold">{title}</h1>
        {subtitle && <p className="mt-3 text-white/80 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
