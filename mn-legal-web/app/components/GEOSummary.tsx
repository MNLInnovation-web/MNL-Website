'use client';

import { Sparkles } from 'lucide-react';

interface GEOSummaryProps {
  excerpt: string;
}

export default function GEOSummary({ excerpt }: GEOSummaryProps) {
  if (!excerpt) return null;

  // Clean excerpt and limit to approx 45-60 words to fit the GEO best practice
  const cleanExcerpt = excerpt.replace(/<[^>]*>?/gm, '').trim();
  const words = cleanExcerpt.split(/\s+/);
  const wordCount = words.length;

  let displaySummary = cleanExcerpt;
  if (wordCount > 60) {
    displaySummary = words.slice(0, 55).join(' ') + '...';
  } else if (wordCount < 30) {
    // If summary is too short, we can use it as is, or fallback to first part of content if needed, 
    // but usually the excerpt has enough length.
    displaySummary = cleanExcerpt;
  }

  return (
    <div className="my-10 bg-[var(--mn-cream)] border-l-4 border-[var(--mn-burgundy)] p-8 md:p-10 relative overflow-hidden group">
      {/* Background Micro-animation/Effect */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--mn-burgundy)]/5 rounded-full pointer-events-none transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-[var(--mn-burgundy)] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[3px] text-[var(--mn-burgundy)] font-bold">
            Executive AI Summary & Key Takeaway
          </span>
        </div>
        
        <p className="font-display italic text-[18px] md:text-[20px] text-[#333333] leading-relaxed font-medium">
          "{displaySummary}"
        </p>
      </div>
    </div>
  );
}
