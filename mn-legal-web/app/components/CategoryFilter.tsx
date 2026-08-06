'use client';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  counts: Record<string, number>;
}

export default function CategoryFilter({ activeCategory, onCategoryChange, counts }: CategoryFilterProps) {
  // Build tabs from the categories that actually have published articles, so the
  // bar never shows an empty "(0)" tab and never omits a real WP category.
  const categories = [
    "All Articles",
    ...Object.keys(counts)
      .filter((cat) => cat !== "All Articles" && counts[cat] > 0)
      .sort((a, b) => a.localeCompare(b)),
  ];

  return (
    <div id="cat-bar" role="navigation" aria-label="Article categories" className="sticky top-[72px] z-[100] bg-[var(--bg-primary)] border-b border-[var(--mn-cream-dark)] overflow-x-auto no-scrollbar scroll-smooth">
      <div className="cat-inner flex gap-0 px-[60px] md:px-[60px] px-[24px] min-w-max">
        {categories.map((cat: string) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`cat-btn text-[11px] font-medium tracking-[1.2px] uppercase p-[18px_22px] border-b-[3px] transition-all duration-300 relative whitespace-nowrap bg-none ${
              activeCategory === cat
                ? "active text-[var(--mn-burgundy)] border-b-[var(--mn-burgundy)] font-semibold"
                : "text-[var(--text-secondary)] border-b-transparent hover:text-[var(--mn-burgundy)] hover:border-b-[rgba(139,28,63,.3)]"
            }`}
          >
            {cat}
            <span className={`cat-count text-[10px] p-[2px_6px] ml-[6px] transition-colors ${
              activeCategory === cat
                ? "bg-[var(--mn-burgundy-dim)] text-[var(--mn-burgundy)]"
                : "bg-[var(--mn-cream-dark)] text-[var(--text-secondary)]"
            }`}>
              {counts[cat] || 0}
            </span>
          </button>
        ))}
      </div>
      <style jsx>{`
        #cat-bar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
