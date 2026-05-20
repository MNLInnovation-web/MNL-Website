'use client';

import { Download } from 'lucide-react';
import { TeamMember } from '../../lib/team';

interface VCardButtonProps {
  member: TeamMember;
}

export default function VCardButton({ member }: VCardButtonProps) {
  const handleDownload = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${member.name}`,
      'ORG:MN Advocates LLP',
      `TITLE:${member.title}`,
      `EMAIL;TYPE=PREF,INTERNET:${member.email}`,
      `TEL;TYPE=CELL,VOICE:${member.phone}`,
      `URL:https://www.mnlegal.net/team/${member.slug}`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${member.slug}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 border border-[var(--mn-burgundy)] text-[12px] font-bold uppercase tracking-[2px] text-[var(--mn-burgundy)] bg-transparent hover:bg-[var(--mn-burgundy)] hover:text-white px-6 py-4 rounded-none transition-all duration-300 w-full sm:w-auto justify-center"
    >
      <Download size={14} /> Download vCard
    </button>
  );
}
