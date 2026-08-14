import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import CoreValues from '../components/CoreValues';
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

      {/* Custom SEO Header / Hero */}
      <section className="py-20 px-6 md:px-16 bg-[var(--mn-cream)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-[900px]">
            <span className="text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.3em] mb-6 block">
              MN Advocates LLP
            </span>
            <h1 className="text-[clamp(40px,7vw,80px)] font-display italic text-[var(--heading-primary)] leading-[1.1] mb-8">
              Precision. Counsel. Resolve.
            </h1>
            <p className="text-[18px] md:text-[22px] text-[var(--text-primary)] font-body leading-relaxed max-w-[700px] opacity-90">
              We are a modern, dynamic East African law firm designed to help innovators, corporations, and scaling platforms navigate complex commercial landscapes with absolute confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Reusing Home Components */}
      <AboutSection />

      {/* Narrative Expansion Section */}
      <section className="bg-white py-24 px-6 md:px-16 border-t border-b border-[rgba(26,39,68,0.05)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-[28px] font-display text-[var(--heading-primary)] border-b-2 border-[var(--mn-burgundy)] pb-3 mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-[16px] leading-relaxed text-neutral-600 font-body font-medium mb-6">
                Our vision is to redefine legal services in East Africa by integrating cutting-edge LegalTech with traditional advocacy. We believe legal advisory should be a partner in business growth, not just a defensive shield.
              </p>
              <p className="text-[16px] leading-relaxed text-neutral-600 font-body font-medium">
                Through deep expertise in emerging technologies, cybersecurity, data protection, and cross-border commercial frameworks, we guide our clients through complex regulatory terrains efficiently and flawlessly.
              </p>
            </div>
            <div>
              <h2 className="text-[28px] font-display text-[var(--heading-primary)] border-b-2 border-[var(--mn-burgundy)] pb-3 mb-6">
                Why Partners Choose MN Legal
              </h2>
              <ul className="space-y-4 font-body font-medium text-neutral-600 text-[15px]">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[var(--mn-burgundy)] shrink-0 mt-2"></span>
                  <span><strong>Elite Specialized Expertise:</strong> Pioneering legal counsel in Data Protection Act 2019 compliance, AI governance, and digital finance.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[var(--mn-burgundy)] shrink-0 mt-2"></span>
                  <span><strong>Business-First Advisory:</strong> Aligning legal strategy with your capitalization, product timelines, and commercial goals.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-[var(--mn-burgundy)] shrink-0 mt-2"></span>
                  <span><strong>Global Standards:</strong> A stellar team with local roots and international certifications, ensuring sophisticated local execution.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CoreValues />

      <ContactSection
        defaultMatterType="Other"
        ctaPrompt="Ready to discuss your legal needs? Speak to one of our expert advocates in Nairobi today."
      />

      <Footer />
    </main>
  );
}
