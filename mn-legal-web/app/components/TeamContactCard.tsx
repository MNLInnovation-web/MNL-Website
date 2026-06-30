'use client';

import { Mail, Phone, Linkedin } from 'lucide-react';
import VCardButton from './VCardButton';
import { TeamMember } from '../../lib/team';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function trackLead(source: string, memberName: string, memberTitle: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'team_profile',
      event_label: memberName,
      lead_source: source,
      team_member: memberName,
      team_member_title: memberTitle,
      value: 1.0,
      currency: 'KES',
    });
  }
}

interface Props {
  member: TeamMember;
}

export default function TeamContactCard({ member }: Props) {
  return (
    <div className="border border-[var(--mn-burgundy)]/10 bg-[var(--mn-cream)] p-8 rounded-none space-y-6">
      <h3 className="text-[16px] font-display text-[var(--heading-primary)] uppercase tracking-[1px] border-b border-[var(--mn-burgundy)]/10 pb-4 font-bold">
        Direct Contact
      </h3>
      <div className="space-y-4 text-[14px]">
        {member.email && (
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-[var(--mn-burgundy)] shrink-0" />
            <a
              href={`mailto:${member.email}`}
              onClick={() => trackLead('team_email_click', member.name, member.title)}
              className="text-[var(--mn-navy)] hover:text-[var(--mn-burgundy)] transition-colors font-medium break-all"
            >
              {member.email}
            </a>
          </div>
        )}
        {member.phone && (
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-[var(--mn-burgundy)] shrink-0" />
            <a
              href={`tel:${member.phone}`}
              onClick={() => trackLead('team_phone_click', member.name, member.title)}
              className="text-[var(--mn-navy)] hover:text-[var(--mn-burgundy)] transition-colors font-medium"
            >
              {member.phone}
            </a>
          </div>
        )}
        {member.linkedIn && (
          <div className="flex items-center gap-3">
            <Linkedin size={16} className="text-[var(--mn-burgundy)] shrink-0" />
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLead('team_linkedin_click', member.name, member.title)}
              className="text-[var(--mn-navy)] hover:text-[var(--mn-burgundy)] transition-colors font-medium"
            >
              Professional LinkedIn Profile
            </a>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-[var(--mn-burgundy)]/10">
        <VCardButton member={member} />
      </div>
    </div>
  );
}
