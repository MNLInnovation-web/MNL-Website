import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import AboutStats from '../components/AboutStats';
import AboutReveal from '../components/AboutReveal';
import CoreValues from '../components/CoreValues';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import UIExtras from '../components/UIExtras';
import ContactSection from '../components/ContactSection';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'About Our Firm',
  description: 'Learn about MN Legal (MN Advocates LLP), a premier full-service law firm in Nairobi, Kenya. Our mission is delivering precise, innovative legal solutions with integrity.',
  path: '/about',
});

export default function AboutPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.mnlegal.net/about#webpage",
        "url": "https://www.mnlegal.net/about",
        "name": "About Our Firm | MN Advocates LLP",
        "isPartOf": { "@id": "https://www.mnlegal.net/#website" },
        "description": "Learn about MN Legal (MN Advocates LLP), a premier full-service law firm in Nairobi, Kenya."
      }
    ]
  };

  return (
    <main className="bg-[var(--bg-primary)] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <UIExtras />
      <Navbar />

      {/* Breadcrumbs Banner */}
      <section className="pt-32 pb-6 px-6 md:px-16 bg-[var(--mn-cream)] border-b border-[var(--mn-burgundy)]/5">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-[11px] uppercase font-bold text-[var(--mn-burgundy)] tracking-widest hover:gap-2 transition-all"
          >
            <ArrowLeft size={12} className="mr-2" /> Back to Home
          </Link>
        </div>
      </section>

      <AboutReveal />

      {/* 1. Hero / positioning */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-[var(--mn-cream)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-[980px]">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[var(--mn-burgundy)]" />
              <span className="text-[var(--mn-burgundy)] text-[11px] font-bold uppercase tracking-[0.25em]">
                MN Advocates LLP · Nairobi
              </span>
            </div>
            <h1 className="text-[clamp(44px,7vw,84px)] font-display italic text-[var(--heading-primary)] leading-[1.08] mb-8">
              Precision. Counsel. Resolve.
            </h1>
            <p className="text-[18px] md:text-[22px] text-[var(--text-primary)] font-body leading-[1.75] max-w-[760px] opacity-90">
              We are a modern, dynamic East African law firm designed to help innovators, corporations, and scaling platforms navigate complex commercial landscapes with absolute confidence.
            </p>
            <div className="mt-10 pt-8 border-t border-[rgba(26,39,68,0.12)] flex flex-wrap gap-x-10 gap-y-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--heading-primary)]">
              <span>Advocates of the High Court of Kenya</span>
              <span>Data Protection Act 2019</span>
              <span>Nairobi · London</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ethos / philosophy + differentiators */}
      <section className="bg-white py-24 px-6 md:px-16 border-b border-[rgba(26,39,68,0.06)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5" data-reveal>
            <span className="text-[var(--mn-burgundy)] text-[11px] font-bold uppercase tracking-[0.25em] mb-4 block">
              Our Mission &amp; Vision
            </span>
            <h2 className="font-display italic text-[clamp(32px,4vw,46px)] text-[var(--heading-primary)] leading-[1.15] mb-8">
              Advocacy, rebuilt for a digital economy
            </h2>
            <div className="space-y-6 text-[16px] leading-[1.85] text-[var(--text-primary)] font-body max-w-[740px]">
              <p>
                Our vision is to redefine legal services in East Africa by integrating cutting-edge LegalTech with traditional advocacy. We believe legal advisory should be a partner in business growth, not just a defensive shield.
              </p>
              <p>
                Through deep expertise in emerging technologies, cybersecurity, data protection, and cross-border commercial frameworks, we guide our clients through complex regulatory terrains efficiently and flawlessly.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[var(--mn-cream)] border border-[var(--mn-cream-dark)] p-8 md:p-12" data-reveal>
            <span className="text-[var(--mn-burgundy)] text-[11px] font-bold uppercase tracking-[0.25em] mb-4 block">
              Why Partners Choose MN Legal
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 mt-8">
              {[
                ['Elite Specialized Expertise', 'Pioneering legal counsel in Data Protection Act 2019 compliance, AI governance, and digital finance.'],
                ['Business-First Advisory', 'Aligning legal strategy with your capitalization, product timelines, and commercial goals.'],
                ['Global Standards', 'A team with local roots and international certifications, ensuring sophisticated local execution.'],
                ['Cross-Border Reach', 'Nairobi counsel complemented by London-based Of Counsel for international arbitration and maritime matters.'],
              ].map(([title, body]) => (
                <div key={title} className="group border-l-2 border-[var(--mn-gray-light)] hover:border-[var(--mn-burgundy)] pl-5 transition-colors duration-300">
                  <h3 className="font-display text-[20px] font-semibold text-[var(--heading-primary)] mb-2 group-hover:text-[var(--mn-burgundy)] transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats */}
      <section className="bg-[var(--mn-navy)] py-20 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto" data-reveal>
          <AboutStats />
        </div>
      </section>

      {/* 4. Values */}
      <CoreValues />

      {/* 5. Leadership */}
      <TeamSection />

      {/* 6. Admissions & affiliations (drawn from team credentials) */}
      <section className="bg-[var(--mn-navy)] py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14" data-reveal>
            <span className="text-[var(--mn-burgundy)] text-[11px] font-bold uppercase tracking-[0.25em] mb-4 block">
              Standing &amp; Affiliations
            </span>
            <h2 className="font-display italic text-[clamp(32px,4vw,46px)] text-white leading-[1.15]">
              Admissions &amp; Bar Standing
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 border border-white/10" data-reveal>
            {[
              ['High Court of Kenya', 'Advocates admitted to practise before the High Court of Kenya.'],
              ['Law Society of Kenya', 'Members of the statutory professional body for advocates.'],
              ['Chartered Institute of Arbitrators', 'CIArb-qualified practitioners in domestic and international arbitration.'],
              ['Senior Courts of England & Wales', 'London-based Of Counsel admitted as a Solicitor.'],
            ].map(([name, desc]) => (
              <div key={name} className="bg-[var(--mn-navy)] p-8 hover:bg-[#1d2b4c] transition-colors duration-300">
                <h3 className="font-display text-[20px] text-white font-semibold mb-3">{name}</h3>
                <p className="text-[13px] text-white/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection
        defaultMatterType="Other"
        ctaPrompt="Ready to discuss your legal needs? Speak to one of our expert advocates in Nairobi today."
      />

      <Footer />
    </main>
  );
}
