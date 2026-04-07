'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const practices = [
  {
    id: '01',
    slug: 'data-privacy',
    title: 'Data Privacy & Protection',
    description: 'Specialized legal counsel for Data Protection Act 2019 compliance, DPIAs, and AI governance in East Africa.',
  },
  {
    id: '02',
    slug: 'corporate-commercial',
    title: 'Corporate & Commercial Law',
    description: 'Comprehensive legal counsel for business formation, mergers, acquisitions, and regulatory compliance in Kenya.',
  },
  {
    id: '03',
    slug: 'litigation-dispute-resolution',
    title: 'Litigation & Dispute Resolution',
    description: 'Strategic representation in high-stakes commercial litigation, arbitration, and mediation across all superior courts.',
  },
  {
    id: '04',
    slug: 'conveyancing-property',
    title: 'Conveyancing & Property Law',
    description: 'Expert handling of real estate transactions, property development, leases, and land use planning matters.',
  },
  {
    id: '05',
    slug: 'intellectual-property',
    title: 'Intellectual Property',
    description: 'Protection and enforcement of trademarks, patents, copyrights, and trade secrets for innovative businesses.',
  },
  {
    id: '06',
    slug: 'banking-finance-fintech',
    title: 'Banking, Finance & Fintech Law',
    description: 'Legal support for secured lending, project finance, fintech regulation, and capital markets transactions.',
  },
  {
    id: '07',
    slug: 'employment-labour',
    title: 'Employment & Labour Law',
    description: 'Advisory services on employment contracts, workplace policies, restructuring, and dispute resolution.',
  },
];

export default function PracticeAreas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.practice-card');
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="practice" className="bg-[var(--bg-white)] py-24 px-6 md:px-16" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 max-w-[800px]">
          <span className="text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-[clamp(32px,5vw,48px)] font-display text-[var(--heading-primary)] leading-tight border-b-2 border-[var(--mn-burgundy)] pb-6 inline-block">
            Practice Areas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(139,28,63,0.1)] border border-[rgba(139,28,63,0.1)]">
          {practices.map((practice) => (
            <div
              key={practice.title}
              className="practice-card bg-[var(--bg-primary)] p-10 md:p-12 hover:bg-[var(--mn-cream)] transition-all duration-400 group relative overflow-hidden"
            >
              <span className="block text-[14px] font-display text-[var(--mn-burgundy)] font-semibold tracking-[0.1em] mb-6">
                {practice.id}
              </span>
              
              <h3 className="text-[24px] font-display text-[var(--heading-primary)] mb-4 font-medium group-hover:text-[var(--mn-burgundy)] transition-colors">
                {practice.title}
              </h3>
              
              <p className="text-[15px] text-[#333] leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                {practice.description}
              </p>
              
              <Link
                href={`/practice-areas/${practice.slug}`}
                className="inline-flex items-center text-[13px] uppercase font-semibold text-[var(--mn-burgundy)] tracking-widest group/link"
              >
                Learn More
                <ArrowRight size={16} className="ml-2 transform group-hover/link:-rotate-45 transition-transform duration-300" />
              </Link>
              
              {/* Top border on hover effect (optional but nice) */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--mn-burgundy)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
