import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, GraduationCap, BookOpen } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TeamContactCard from '../../components/TeamContactCard';
import { teamMembers, getTeamMemberBySlug } from '../../../lib/team';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);

  if (!member) return { title: 'Team Member Not Found' };

  return {
    title: `${member.name} | ${member.title}`,
    description: member.bio.substring(0, 160),
  };
}

export async function generateStaticParams() {
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  const summitSpeakers = ['mbula-nzuki', 'sebie-salim', 'mutundu-chege', 'konstantina-zariou', 'tyrus-muya-kamau'];
  const isSummitSpeaker = summitSpeakers.includes(member.slug);

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://www.mnlegal.net/team/${member.slug}`,
    "name": member.name,
    "jobTitle": member.title,
    "worksFor": {
      "@type": "LegalService",
      "name": "MN Advocates LLP",
      "url": "https://www.mnlegal.net"
    },
    ...(member.email ? { "email": member.email } : {}),
    ...(member.phone ? { "telephone": member.phone } : {}),
    "image": member.image,
    "url": `https://www.mnlegal.net/team/${member.slug}`
  };

  return (
    <main className="bg-[var(--bg-primary)] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Navbar />

      {/* Breadcrumbs Banner */}
      <section className="pt-32 pb-6 px-6 md:px-16 bg-[var(--mn-cream)] border-b border-[var(--mn-burgundy)]/5">
        <div className="max-w-[1400px] mx-auto">
          <Link 
            href="/#team" 
            className="inline-flex items-center text-[11px] uppercase font-bold text-[var(--mn-burgundy)] tracking-widest hover:gap-2 transition-all"
          >
            <ArrowLeft size={12} className="mr-2" /> Back to Team
          </Link>
        </div>
      </section>

      {/* Profile Main Section */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Image, Info Cards, admissions */}
            <div className="lg:col-span-4 space-y-10">
              {/* Image */}
              <div className="relative aspect-[4/5] bg-[var(--mn-cream)] border border-neutral-100 rounded-none overflow-hidden">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Direct Details Card */}
              <TeamContactCard member={member} />

              {/* Credentials / Admissions */}
              <div className="space-y-6">
                <h3 className="text-[18px] font-display text-[var(--heading-primary)] uppercase tracking-[1px] flex items-center gap-2 font-bold">
                  <GraduationCap size={20} className="text-[var(--mn-burgundy)]" /> Credentials
                </h3>
                <ul className="space-y-3.5 pl-1">
                  {member.credentials.map((cred, i) => (
                    <li key={i} className="flex gap-3 text-[14px] text-neutral-600 font-medium items-start">
                      <span className="w-1.5 h-1.5 bg-[var(--mn-burgundy)] rounded-none shrink-0 mt-2"></span>
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Bio, publications, summit participation */}
            <div className="lg:col-span-8 space-y-16">
              <div>
                <span className="text-[var(--mn-burgundy)] text-[11px] font-bold uppercase tracking-[2px] mb-2 block">
                  {member.title}
                </span>
                <h1 className="text-[48px] md:text-[64px] font-display text-[var(--heading-primary)] leading-tight mb-4">
                  {member.name}
                </h1>
                <p className="text-[18px] font-display italic text-[var(--mn-burgundy)] font-medium max-w-[600px] leading-relaxed">
                  Focus: {member.practice}
                </p>
              </div>

              {/* Bio Content */}
              <div className="border-t border-neutral-100 pt-10">
                <h2 className="text-[20px] font-display text-[var(--heading-primary)] uppercase tracking-[1px] mb-6 font-bold">
                  Professional Biography
                </h2>
                <div className="text-[16px] leading-relaxed text-neutral-600 space-y-6 font-body font-medium">
                  {member.bio.split('\n\n').map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Summit Speaker Alert Banner */}
              {isSummitSpeaker && (
                <div className="bg-[var(--mn-navy)] text-white p-8 md:p-10 border-l-4 border-[var(--mn-burgundy)] rounded-none">
                  <span className="text-[var(--mn-burgundy)] text-[10px] font-bold uppercase tracking-[2.5px] mb-3 block">
                    MNL Africa Leadership Circle Summit
                  </span>
                  <h4 className="text-[22px] font-display italic text-white mb-3">
                    Steering Regulatory & Fintech Forums
                  </h4>
                  <p className="text-white/80 text-[14px] leading-relaxed mb-6 font-medium">
                    {member.name} is a key facilitator for panel debates and private advisory roundtables at our upcoming flagship summit in Nairobi. Connect directly to request delegate access or agenda coordination.
                  </p>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center text-[11px] uppercase font-bold text-[var(--mn-burgundy)] tracking-widest hover:text-white transition-colors border-b border-[var(--mn-burgundy)] pb-1"
                  >
                    Request Summit Invitation &rarr;
                  </a>
                </div>
              )}

              {/* Selected Publications & Insights */}
              {member.publications && member.publications.length > 0 && (
                <div className="border-t border-neutral-100 pt-10">
                  <h2 className="text-[20px] font-display text-[var(--heading-primary)] uppercase tracking-[1px] flex items-center gap-2 mb-8 font-bold">
                    <BookOpen size={20} className="text-[var(--mn-burgundy)]" /> Selected Insights & Briefings
                  </h2>
                  <div className="space-y-6">
                    {member.publications.map((pub, idx) => (
                      <div 
                        key={idx} 
                        className="group border border-neutral-100 hover:border-[var(--mn-burgundy)]/20 bg-white p-6 md:p-8 rounded-none transition-all duration-300"
                      >
                        <span className="text-[11px] uppercase font-bold text-neutral-400 tracking-[1.5px] mb-2 block">
                          {pub.date}
                        </span>
                        <h3 className="text-[20px] font-display text-[var(--heading-primary)] group-hover:text-[var(--mn-burgundy)] transition-colors mb-4">
                          {pub.href !== '#' ? (
                            <Link href={pub.href}>
                              {pub.title}
                            </Link>
                          ) : (
                            <span>{pub.title}</span>
                          )}
                        </h3>
                        {pub.href !== '#' && (
                          <Link 
                            href={pub.href}
                            className="text-[11px] uppercase font-bold tracking-[2px] text-[var(--mn-navy)] group-hover:text-[var(--mn-burgundy)] transition-colors inline-flex items-center gap-2"
                          >
                            Read Briefing &rarr;
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Contextual Contact Section */}
      <ContactSection 
        defaultMatterType="Other" 
        ctaPrompt={`Brief ${member.name} or request advice regarding ${member.practice.split(' and ')[0]} by completing our brief intake form.`} 
      />

      <Footer />
    </main>
  );
}
