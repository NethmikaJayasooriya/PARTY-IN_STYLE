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
    <div className="relative overflow-hidden py-4 border-y border-[#C9A24B]/25" style={{ background: "linear-gradient(90deg, #14100A 0%, #221A11 50%, #14100A 100%)" }}>
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-headline-md text-lg md:text-xl text-[#EAD8BC]/85 uppercase tracking-[0.2em]">
              {item}
            </span>
            <span className="text-[#E6C766] text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
