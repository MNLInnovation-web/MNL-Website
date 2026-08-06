import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Confidential Consultation & Contact',
  description: 'Reach out to MN Legal for expert legal counsel in Data Privacy, Fintech, AI Law, and Corporate Commercial matters in Nairobi, Kenya.',
  path: '/contact',
});

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://mnlegal.net/contact#webpage",
        "url": "https://mnlegal.net/contact",
        "name": "Contact & Consultation | MN Advocates LLP",
        "isPartOf": { "@id": "https://mnlegal.net/#website" },
        "description": "Get in touch with Kenya's leading legal-tech and corporate lawyers for a private consultation."
      },
      {
        "@type": "ContactPage",
        "@id": "https://mnlegal.net/contact#contactpage",
        "url": "https://mnlegal.net/contact",
        "name": "MN Legal Contacts",
        "mainEntity": { "@id": "https://mnlegal.net/#legalservice" }
      }
    ]
  };

  return (
    <main className="bg-[var(--bg-primary)] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Navbar />

      {/* Spacer to push content below the fixed Navbar */}
      <div className="pt-24 bg-[var(--mn-cream)]"></div>

      <ContactSection
        defaultMatterType="Corporate Advisory & M&A"
        ctaPrompt="We advise global fintech platforms, venture capital funds, and multinational corporations on market entry, regulatory compliance, and dispute resolution across East Africa. Speak with our advocates today."
      />

      <Footer />
    </main>
  );
}
