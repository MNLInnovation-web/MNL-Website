import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import PracticeAreas from '../components/PracticeAreas';
import Footer from '../components/Footer';
import UIExtras from '../components/UIExtras';
import ContactSection from '../components/ContactSection';
import { generateSEO } from '@/lib/seo';
import { practiceAreas } from '@/lib/practice-areas';

export const metadata: Metadata = generateSEO({
  title: 'Our Practice Areas & Legal Services',
  description: 'Explore MN Legal\'s specialized practice groups, including Data Privacy, AI governance, Fintech, Corporate Commercial, Real Estate, and Dispute Resolution in Nairobi.',
  path: '/practice-areas',
});

export default function PracticeAreasPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://mnlegal.net/practice-areas#webpage",
        "url": "https://mnlegal.net/practice-areas",
        "name": "Our Practice Areas & Legal Services | MN Advocates LLP",
        "isPartOf": { "@id": "https://mnlegal.net/#website" },
        "description": "Explore MN Legal's specialized practice groups in Kenya and East Africa."
      },
      {
        "@type": "ItemList",
        "@id": "https://mnlegal.net/practice-areas#servicelist",
        "name": "MN Legal Practice Areas",
        "numberOfItems": practiceAreas.length,
        "itemListElement": practiceAreas.map((area, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "name": area.title,
            "url": `https://mnlegal.net/practice-areas/${area.slug}`,
            "description": area.description
          }
        }))
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
              Core Practice Groups
            </span>
            <h1 className="text-[clamp(40px,7vw,80px)] font-display italic text-[var(--heading-primary)] leading-[1.1] mb-8">
              Surgical Legal Expertise
            </h1>
            <p className="text-[18px] md:text-[22px] text-[var(--text-primary)] font-body leading-relaxed max-w-[700px] opacity-90">
              We focus on areas where business, technology, and regulation intersect. Our advocates bring sharp commercial acumen to help you manage risk, protect intellectual assets, and win disputes.
            </p>
          </div>
        </div>
      </section>

      {/* Reusing Home Components */}
      <PracticeAreas />

      <ContactSection
        defaultMatterType="Other"
        ctaPrompt="Tell us about your legal needs. Select the most relevant practice area in the dropdown below."
      />

      <Footer />
    </main>
  );
}
