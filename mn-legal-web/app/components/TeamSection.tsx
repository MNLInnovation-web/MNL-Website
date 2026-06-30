'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin } from 'lucide-react';
import { teamMembers, TeamMember } from '@/lib/team';

gsap.registerPlugin(ScrollTrigger);

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <div className="team-card group bg-[var(--bg-primary)] p-4 transition-all duration-500 hover:shadow-2xl relative border border-transparent hover:border-[var(--mn-cream-dark)]">
      <Link href={`/team/${member.slug}`} className="block relative aspect-[4/5] mb-8 overflow-hidden bg-[var(--mn-cream)] rounded-none">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-all duration-1000 scale-100 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
          priority={index < 4}
        />
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,39,68,0.4),transparent)] opacity-60 group-hover:opacity-0 transition-opacity duration-500"></div>
      </Link>
      
      <div className="relative pl-5 border-l-0 group-hover:border-l-[3px] border-[var(--mn-burgundy)] transition-all duration-300 ease-out">
        <h3 className="text-[22px] font-display text-[var(--heading-primary)] mb-1 font-semibold leading-tight group-hover:text-[var(--mn-burgundy)] transition-colors duration-300">
          <Link href={`/team/${member.slug}`}>
            {member.name}
          </Link>
        </h3>
        <span className="block text-[10px] uppercase text-[var(--mn-burgundy)] tracking-[2.5px] font-bold mb-3">
          {member.title}
        </span>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[13px] text-[var(--text-secondary)] font-medium tracking-wide">
            {member.practice}
          </p>
          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex-shrink-0 w-7 h-7 flex items-center justify-center border border-[var(--mn-gray-light)] text-[var(--text-secondary)] hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/5 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'generate_lead', {
                    event_category: 'team_card',
                    event_label: member.name,
                    lead_source: 'team_card_linkedin_click',
                    team_member: member.name,
                    team_member_title: member.title,
                    value: 1.0,
                    currency: 'KES',
                  });
                }
              }}
            >
              <Linkedin size={13} strokeWidth={1.8} />
            </a>
          )}
        </div>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-transparent group-hover:border-b-[var(--mn-burgundy)] group-hover:border-r-[var(--mn-burgundy)] transition-all duration-500 opacity-10"></div>
    </div>
  );
}

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-card', 
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    // Refresh ScrollTrigger after a short delay to account for any layout shifts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="team" className="bg-[var(--mn-cream)] py-32 px-6 md:px-16" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-[700px]">
            <span className="text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.3em] mb-4 block">
              Our Professionals
            </span>
            <h2 className="text-[clamp(36px,5vw,52px)] font-display text-[var(--heading-primary)] leading-[1.1] mb-0">
              The People Behind<br/>
              <span className="italic text-[var(--mn-burgundy)]">MN Legal</span>
            </h2>
          </div>
          <div className="hidden lg:block pb-2">
            <p className="text-[14px] text-[var(--text-secondary)] font-medium max-w-[300px] leading-relaxed italic border-l-2 border-[var(--mn-burgundy)] pl-6">
              "Precision, excellence, and unwavering dedication to our clients' success."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {teamMembers.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} index={i} />
          ))}

          {/* Careers Placeholder Card */}
          <div className="team-card group bg-[var(--mn-navy)] p-10 flex flex-col justify-center items-center text-center border border-[rgba(255,255,255,0.05)] transition-all duration-500 hover:bg-[var(--mn-navy-deep)] min-h-[400px]">
            <div className="w-16 h-16 rounded-none border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
               <span className="text-[var(--mn-burgundy)] text-3xl font-display italic">§</span>
            </div>
            <h3 className="text-xl font-display text-white mb-4">Join Our Team</h3>
            <p className="text-sm text-white/50 mb-8 leading-relaxed">
              We are always looking for exceptional legal talent to join our growing firm.
            </p>
            <a 
              href="#contact" 
              className="text-[10px] uppercase font-bold text-[var(--mn-burgundy)] tracking-[2px] border-b border-[var(--mn-burgundy)] pb-1 hover:text-white hover:border-white transition-all duration-300"
            >
              Send Application
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
