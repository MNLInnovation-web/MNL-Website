'use client';

import Link from 'next/link';

interface ArticleCTAProps {
  category: string;
  title: string;
}

export default function ArticleCTA({ category, title }: ArticleCTAProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_cta', {
        event_category: 'conversion',
        event_label: title,
        category: category,
        destination: '/#contact'
      });
    }
  };

  return (
    <div className="mt-12 relative overflow-hidden bg-[var(--mn-navy-deep)] p-12 text-white">
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full border border-white/5 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 rounded-full border border-[var(--mn-burgundy)]/20 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-[500px]">
        <h3 className="font-display italic text-3xl text-white mb-4 border-none p-0">Need legal advice on this topic?</h3>
        <p className="text-white/60 text-base mb-8">Our {category} team is ready to help you navigate the complexities of Kenyan law.</p>
        <Link 
          href="/#contact" 
          onClick={handleClick}
          className="inline-block bg-[var(--mn-burgundy)] px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[var(--mn-burgundy-dark)] transition-all"
        >
          Consult our Experts
        </Link>
      </div>
    </div>
  );
}
