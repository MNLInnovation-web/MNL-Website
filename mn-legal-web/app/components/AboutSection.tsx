'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import AboutStats from './AboutStats';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About MN Advocates LLP"
      className="relative bg-[var(--mn-navy)] py-24 md:py-32 px-6 md:px-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(139,28,63,0.25) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.4,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-20">
          {/* Narrative: cols 1-5 */}
          <div className="lg:col-span-5 max-w-[580px]">
            <div className="about-reveal inline-flex items-center gap-3 mb-5">
              <span className="w-8 h-[1px] bg-[var(--mn-burgundy)]" />
              <span className="text-[var(--mn-burgundy)] text-[11px] font-bold uppercase tracking-[0.25em]">
                Est. Nairobi · Advocates LLP
              </span>
            </div>

            <h2 className="about-reveal font-display italic text-white text-[clamp(34px,4.5vw,52px)] leading-[1.12] mb-8 border-none p-0">
              A Legacy of Precision and Legal Authority
            </h2>

            <div className="about-reveal space-y-6 text-white/90 font-body text-[16px] md:text-[17px] leading-[1.8]">
              <p>
                Founded on integrity and technical excellence, MN Legal has established itself as a
                cornerstone of the East African legal landscape, serving domestic and international
                clients with surgical precision.
              </p>

              <blockquote className="pl-6 border-l-[3px] border-[var(--mn-burgundy)] py-2 my-8 font-display italic text-white text-[19px] md:text-[21px] leading-snug">
                &ldquo;Our mission is to be an innovative, dynamic, client-oriented &ndash; 21st
                century firm geared toward growth and recognized for excellence in our service
                delivery.&rdquo;
              </blockquote>

              <p className="text-white/65">
                Our approach combines deep-rooted local knowledge with international standards, so
                every counsel we provide is both strategically sound and commercially viable.
              </p>
            </div>

            <div className="about-reveal pt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-4 bg-[var(--mn-burgundy)] text-white text-[12px] font-bold uppercase tracking-[0.22em] px-9 py-5 border border-[var(--mn-burgundy)] hover:bg-[var(--mn-burgundy-dark)] transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span>Explore Our Firm</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>

          {/* Monolith: cols 6-12 */}
          <div className="lg:col-span-7">
            <div className="about-reveal relative aspect-[4/3] lg:aspect-[1.25/1] overflow-hidden group border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)] [clip-path:polygon(0_0,100%_0,100%_100%,3%_100%)]">
              <Image
                src="https://wp.mnlegal.net/wp-content/uploads/2026/03/DSC3081-98-scaled.jpg"
                alt="The MN Legal team in Nairobi"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--mn-navy)] via-transparent to-transparent opacity-70 lg:opacity-60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--mn-navy)] via-transparent to-transparent opacity-50 pointer-events-none" />

              <div className="absolute bottom-8 right-8 z-10 text-right bg-[var(--mn-navy-deep)]/90 px-6 py-4 border-l-2 border-[var(--mn-burgundy)] translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-display italic text-[20px] text-white block leading-tight">
                  Tradition &amp; Innovation
                </span>
                <span className="text-[10px] uppercase tracking-[3px] text-white/60 font-bold block mt-1">
                  Nairobi, Kenya
                </span>
              </div>
            </div>
          </div>
        </div>

        <AboutStats />
      </div>
    </section>
  );
}
