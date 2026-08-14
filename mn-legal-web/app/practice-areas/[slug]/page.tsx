import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Users2, Lightbulb, Mail, Phone } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import { getPracticeAreaBySlug, practiceAreas } from '../../../lib/practice-areas';
import { teamMembers } from '../../../lib/team';

interface Props {
  params: Promise<{ slug: string }>;
}

import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);

  if (!area) return { title: 'Practice Area Not Found' };

  const baseMeta = generateSEO({
    title: area.seoTitle,
    description: area.longDescription.substring(0, 160),
    path: `/practice-areas/${slug}`,
  });

  return {
    ...baseMeta,
    keywords: area.keywords.join(', '),
  };
}

export async function generateStaticParams() {
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }));
}

const getContactMatterType = (slug: string): string => {
  switch (slug) {
    case 'data-privacy':
      return 'Data Privacy & Protection';
    case 'corporate-commercial':
      return 'Corporate & Commercial';
    case 'litigation-dispute-resolution':
      return 'Litigation';
    case 'conveyancing-property':
      return 'Conveyancing';
    case 'intellectual-property':
      return 'Intellectual Property';
    case 'banking-finance-fintech':
      return 'Fintech & Regulation';
    case 'employment-labour':
      return 'Other';
    default:
      return 'Other';
  }
};

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const leadAttorney = teamMembers.find(t => t.slug === area.leadAttorneySlug);
  const defaultMatterType = getContactMatterType(slug);
  const ctaPrompt = leadAttorney 
    ? `Connect directly with ${leadAttorney.name} or submit your briefing details below. Our partners are available for urgent corporate and regulatory consultations.`
    : undefined;

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": "https://www.mnlegal.net/#legalservice"
      },
      {
        "@type": "WebPage",
        "@id": `https://www.mnlegal.net/practice-areas/${area.slug}#webpage`,
        "url": `https://www.mnlegal.net/practice-areas/${area.slug}`,
        "name": `${area.seoTitle} | MN Advocates LLP`,
        "isPartOf": { "@id": "https://www.mnlegal.net/#website" },
        "description": area.description
      },
      {
        "@type": "OfferCatalog",
        "@id": `https://www.mnlegal.net/practice-areas/${area.slug}#catalog`,
        "name": area.title,
        "description": area.longDescription,
        "itemListElement": area.whatWeCover.map((service, index) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service,
            "description": `Professional ${service} legal counsel from MN Advocates LLP in Nairobi, Kenya.`,
            "provider": { "@id": "https://www.mnlegal.net/#legalservice" }
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
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 md:px-16 bg-[var(--mn-cream)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-[900px]">
            <span className="text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.3em] mb-6 block">
              Expertise / {area.id}
            </span>
            <h1 className="text-[clamp(40px,7vw,80px)] font-display italic text-[var(--heading-primary)] leading-[1.1] mb-8">
              {area.title}
            </h1>
            <p className="text-[18px] md:text-[22px] text-[var(--text-primary)] font-body leading-relaxed max-w-[700px] opacity-90">
              {area.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Left Column: What we cover */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-none bg-[var(--mn-burgundy)]/10 flex items-center justify-center">
                  <CheckCircle2 className="text-[var(--mn-burgundy)]" size={20} />
                </div>
                <h2 className="text-[28px] font-display text-[var(--heading-primary)]">What we cover</h2>
              </div>

              <ul className="space-y-6">
                {area.whatWeCover.map((item, index) => (
                  <li key={index} className="flex gap-4 group">
                    <span className="text-[var(--mn-burgundy)] font-display font-bold mt-1 text-[14px]">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <p className="text-[16px] text-[var(--text-primary)] font-medium leading-relaxed group-hover:translate-x-1 transition-transform">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Who we serve, Lead Counsel & Unique Angle */}
            <div className="space-y-20">
              {/* Who we serve */}
              <div>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-none bg-[var(--mn-burgundy)]/10 flex items-center justify-center">
                    <Users2 className="text-[var(--mn-burgundy)]" size={20} />
                  </div>
                  <h2 className="text-[28px] font-display text-[var(--heading-primary)]">Who we serve</h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {area.whoItsFor.map((item, index) => (
                    <span
                      key={index}
                      className="px-5 py-3 bg-[var(--mn-cream)] border border-[var(--mn-burgundy)]/10 rounded-none text-[14px] font-semibold text-[var(--text-primary)] hover:border-[var(--mn-burgundy)]/30 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lead Counsel Card */}
              {leadAttorney && (
                <div className="border border-[var(--mn-burgundy)]/20 bg-white p-8 md:p-10 relative overflow-hidden rounded-none shadow-sm">
                  <span className="text-[var(--mn-burgundy)] text-[10px] font-bold uppercase tracking-[2px] mb-6 block">
                    Practice Group Lead
                  </span>
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
                    <div className="w-24 h-24 relative overflow-hidden bg-[var(--mn-cream)] border border-neutral-100 rounded-none shrink-0">
                      <img 
                        src={leadAttorney.image} 
                        alt={leadAttorney.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="text-[22px] font-display text-[var(--heading-primary)] mb-1 hover:text-[var(--mn-burgundy)] transition-colors">
                        <Link href={`/team/${leadAttorney.slug}`}>
                          {leadAttorney.name}
                        </Link>
                      </h3>
                      <p className="text-[12px] uppercase tracking-wider text-neutral-500 font-bold mb-3">
                        {leadAttorney.title}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {leadAttorney.credentials.slice(0, 2).map((cred, i) => (
                          <span key={i} className="text-[10px] font-semibold bg-[var(--mn-cream)] text-[var(--mn-burgundy)] px-2.5 py-1 rounded-none border border-[var(--mn-burgundy)]/10">
                            {cred}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] text-neutral-600 leading-relaxed mb-6 font-medium">
                    {leadAttorney.bio}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-neutral-100">
                    {leadAttorney.email && (
                      <a href={`mailto:${leadAttorney.email}`} className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--mn-navy)] hover:text-[var(--mn-burgundy)] transition-colors flex items-center gap-1.5 rounded-none">
                        <Mail size={12} /> Direct Email
                      </a>
                    )}
                    {leadAttorney.phone && (
                      <a href={`tel:${leadAttorney.phone}`} className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--mn-navy)] hover:text-[var(--mn-burgundy)] transition-colors flex items-center gap-1.5 rounded-none">
                        <Phone size={12} /> Contact Line
                      </a>
                    )}
                    <Link href={`/team/${leadAttorney.slug}`} className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--mn-burgundy)] hover:underline ml-auto rounded-none">
                      Full Biography &rarr;
                    </Link>
                  </div>
                </div>
              )}

              {/* Unique Angle Card */}
              <div className="bg-[var(--mn-burgundy)] p-10 md:p-12 relative overflow-hidden group rounded-none">
                <Lightbulb className="absolute -right-8 -top-8 w-40 h-40 text-white/5 transform -rotate-12 group-hover:scale-110 transition-transform duration-700" />

                <h3 className="text-[24px] font-display text-white italic mb-6 relative z-10">
                  {area.uniqueAngle.title}
                </h3>

                <p className="text-white/80 text-[16px] leading-relaxed mb-8 relative z-10">
                  {area.uniqueAngle.content}
                </p>

                {area.uniqueAngle.link && (
                  <Link
                    href={area.uniqueAngle.link.href}
                    className="inline-flex items-center text-[13px] uppercase font-bold text-white tracking-widest hover:gap-3 transition-all relative z-10"
                  >
                    {area.uniqueAngle.link.label}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ContactSection defaultMatterType={defaultMatterType} ctaPrompt={ctaPrompt} />

      <Footer />
    </main>
  );
}
