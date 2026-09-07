import React from "react";

interface SlidingFeatureCarouselProps {
  features: string[];
}

export const SlidingFeatureCarousel: React.FC<SlidingFeatureCarouselProps> = ({ features }) => {
  if (!features || features.length === 0) return null;

  // Parse each feature string — extract leading emoji if present
  const items = features.map((f) => {
    const emojiMatch = f.match(/^([\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|\p{Emoji_Presentation})\s*(.*)/u);
    if (emojiMatch) {
      return { icon: emojiMatch[1], title: emojiMatch[2] || f };
    }
    return { icon: "✦", title: f };
  });

  // Duplicate for seamless infinite loop
  const loopItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-4 -mx-1">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent" />

      <div className="flex animate-marquee" style={{ width: "max-content" }}>
        {loopItems.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2.5 mx-2 px-4 py-2.5 rounded-2xl
              bg-gradient-to-br from-slate-50 to-blue-50/60
              border border-slate-200 shadow-sm
              hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5
              transition-all duration-200 cursor-default shrink-0"
            style={{ minWidth: "180px" }}
          >
            <span className="text-lg leading-none shrink-0">{item.icon}</span>
            <span className="font-bold text-xs text-slate-800 whitespace-nowrap">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
