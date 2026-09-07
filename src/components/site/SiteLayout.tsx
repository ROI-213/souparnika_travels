import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { EnquiryDialog } from "./EnquiryDialog";

export function SiteLayout({
  children,
  hideHeader = false,
  hideFooter = false,
  hideFloating = false,
}: {
  children: ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideFloating?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
      {!hideFloating && <FloatingActions />}
      <EnquiryDialog />
    </div>
  );
}


export function PageHero({
  title,
  subtitle,
  crumbs,
  image,
}: {
  title: string;
  subtitle?: string;
  crumbs?: { label: string; to?: string }[];
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#071525] via-[#071A33] to-[#0D315C] text-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto container-p relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
        <div className={image ? "lg:col-span-7 space-y-4" : "lg:col-span-12 space-y-4"}>
          {crumbs && (
            <nav className="text-xs text-white/70 mb-2 font-medium">
              {crumbs.map((c, i) => (
                <span key={i}>
                  {c.label}
                  {i < crumbs.length - 1 ? " / " : ""}
                </span>
              ))}
            </nav>
          )}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">{title}</h1>
          {subtitle && <p className="mt-3 text-slate-200/90 max-w-2xl text-sm sm:text-base leading-relaxed">{subtitle}</p>}
        </div>

        {image && (
          <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
            <img
              src={image}
              alt={title}
              className="w-full max-w-sm sm:max-w-md lg:max-w-xl h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
        )}
      </div>
    </section>
  );
}
