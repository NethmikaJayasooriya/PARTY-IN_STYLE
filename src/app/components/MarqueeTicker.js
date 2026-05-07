"use client";

const TICKER_ITEMS = [
  "Weddings",
  "Corporate Galas",
  "Private Parties",
  "Festivals",
  "Product Launches",
  "Charity Events",
  "Engagement Parties",
  "Award Ceremonies",
];

export default function MarqueeTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative overflow-hidden py-5 border-y border-outline/10 bg-surface-container-lowest/50">
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-headline-md text-lg md:text-xl text-on-surface-variant/30 uppercase tracking-[0.2em]">
              {item}
            </span>
            <span className="text-primary/30 text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
