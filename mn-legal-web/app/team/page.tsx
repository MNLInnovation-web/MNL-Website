import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import UIExtras from '../components/UIExtras';
import ContactSection from '../components/ContactSection';
import { generateSEO } from '@/lib/seo';
import { teamMembers } from '@/lib/team';

export const metadata: Metadata = generateSEO({
  title: 'Our Team of Legal Professionals',
  description: 'Meet the experienced advocates, partners, and legal technologists at MN Legal. Bringing precision, technical excellence, and strategic counsel to Nairobi.',
  path: '/team',
});

export default function TeamPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.mnlegal.net/team#webpage",
        "url": "https://www.mnlegal.net/team",
        "name": "Our Team of Legal Professionals | MN Advocates LLP",
        "isPartOf": { "@id": "https://www.mnlegal.net/#website" },
        "description": "Meet the experienced advocates, partners, and legal technologists at MN Legal."
      },
      {
        "@type": "ItemList",
        "@id": "https://www.mnlegal.net/team#teamlist",
        "name": "MN Advocates LLP Legal Professionals",
        "numberOfItems": teamMembers.length,
        "itemListElement": teamMembers.map((member, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Person",
            "name": member.name,
            "jobTitle": member.title,
            "url": `https://www.mnlegal.net/team/${member.slug}`,
            "image": member.image
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
              Our Attorneys & Technologists
            </span>
            <h1 className="text-[clamp(40px,7vw,80px)] font-display italic text-[var(--heading-primary)] leading-[1.1] mb-8">
              The Minds Behind MN Legal
            </h1>
            <p className="text-[18px] md:text-[22px] text-[var(--text-primary)] font-body leading-relaxed max-w-[700px] opacity-90">
              Meet our team of forward-thinking advocates, operational leaders, and technology experts. Together, we provide sophisticated legal guidance structured for modern business demands.
            </p>
          </div>
        </div>
      </section>

      {/* Reusing Home Components */}
      <TeamSection />

      <ContactSection
        defaultMatterType="Other"
        ctaPrompt="Would you like to schedule a consultation with a specific advocate? Let us know in your intake notes."
      />

      <Footer />
    </main>
  );
}
