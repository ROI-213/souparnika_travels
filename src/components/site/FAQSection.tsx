import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { DEFAULT_FAQS, type FAQItem } from "@/lib/data/vehicles";

export function FAQSection() {
  const faqs = DEFAULT_FAQS;
  const [openIds, setOpenIds] = useState<string[]>(["faq-1", "faq-3"]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Structured Data Schema for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="py-16 lg:py-24 bg-white" id="faqs">
      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[color:var(--brand-blue)] bg-[color:var(--brand-blue)]/10 px-3.5 py-1 rounded-full">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[color:var(--brand-navy)]">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Everything you need to know about vehicle bookings, pricing inclusions, payment terms, and outstation travel.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-[color:var(--brand-navy)] hover:text-[color:var(--brand-blue)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-[color:var(--brand-gold)] shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[color:var(--brand-blue)]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-foreground/80 leading-relaxed border-t border-border/40 bg-secondary/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
