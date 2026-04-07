import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Users2, Lightbulb } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import { getPracticeAreaBySlug, practiceAreas } from '../../../lib/practice-areas';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);

  if (!area) return { title: 'Practice Area Not Found' };

  return {
    title: `${area.seoTitle} | MN Advocates LLP`,
    description: area.longDescription.substring(0, 160),
    keywords: area.keywords.join(', '),
  };
}

export async function generateStaticParams() {
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }));
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  return (
    <main className="bg-[var(--bg-primary)] min-h-screen">
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
                <div className="w-10 h-10 rounded-full bg-[var(--mn-burgundy)]/10 flex items-center justify-center">
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

            {/* Right Column: Who it's for & Unique Angle */}
            <div className="space-y-20">
              {/* Who it's for */}
              <div>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-full bg-[var(--mn-burgundy)]/10 flex items-center justify-center">
                    <Users2 className="text-[var(--mn-burgundy)]" size={20} />
                  </div>
                  <h2 className="text-[28px] font-display text-[var(--heading-primary)]">Who we serve</h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {area.whoItsFor.map((item, index) => (
                    <span
                      key={index}
                      className="px-5 py-3 bg-[var(--mn-cream)] border border-[var(--mn-burgundy)]/10 rounded-full text-[14px] font-semibold text-[var(--text-primary)] hover:border-[var(--mn-burgundy)]/30 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Unique Angle Card */}
              <div className="bg-[var(--mn-burgundy)] p-10 md:p-12 relative overflow-hidden group">
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
      <ContactSection />

      <Footer />
    </main>
  );
}
