'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { label: 'Years of Excellence', sub: 'Continuous East African practice', value: 7, suffix: '+' },
  { label: 'Matters Resolved', sub: 'Commercial, regulatory & disputes', value: 500, suffix: '+' },
  { label: 'Legal Professionals', sub: 'Advocates, counsel & specialists', value: 15, suffix: '' },
  { label: 'Jurisdictions', sub: 'Kenya & England and Wales', value: 2, suffix: '' },
];

export default function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = gsap.utils.toArray<HTMLElement>('.stat-number', ref.current);
    if (reduced) {
      els.forEach((el) => (el.innerText = el.getAttribute('data-target') || '0'));
      return;
    }
    const ctx = gsap.context(() => {
      els.forEach((el) => {
        gsap.to(el, {
          innerText: parseInt(el.getAttribute('data-target') || '0', 10),
          duration: 1.8,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[rgba(139,28,63,0.3)] border border-[rgba(139,28,63,0.3)]"
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="relative group bg-[var(--mn-navy)] p-8 md:p-12 hover:bg-[#1d2b4c] transition-colors duration-300"
        >
          <div className="flex items-baseline mb-3">
            <span
              className="stat-number font-display text-[48px] md:text-[60px] text-white leading-none"
              data-target={s.value}
            >
              {s.value}
            </span>
            <span className="font-display text-[38px] md:text-[46px] text-[var(--mn-burgundy)] leading-none ml-1">
              {s.suffix}
            </span>
          </div>
          <span className="block text-[11px] uppercase font-bold text-white tracking-[0.2em] mb-1">
            {s.label}
          </span>
          <span className="block text-[12px] text-white/60">{s.sub}</span>
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--mn-burgundy)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      ))}
    </div>
  );
}
