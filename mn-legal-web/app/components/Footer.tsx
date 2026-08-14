import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories } from '@/lib/wp';

export default async function Footer() {
  const categories = await getAllCategories();

  const socialLinks = [
    { icon: '𝕏', url: 'https://twitter.com/mnlegaladvocate' },
    { icon: 'in', url: 'https://linkedin.com/company/mn-legal' },
    { icon: 'ig', url: 'https://www.instagram.com/mnlegaladvocates/' },
    { icon: '✉', url: 'mailto:info@mnlegal.net' }
  ];

  return (
    <footer className="bg-[var(--mn-navy-deep)] p-[64px_60px_36px] border-t border-[rgba(139,28,63,.22)] md:px-[60px] px-[24px]">
      <div className="foot-top grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[52px] mb-[52px]">
        <div>
          <Link href="/" className="foot-brand relative inline-block bg-white p-3 mb-6 transition-transform duration-500 hover:scale-105">
            <div className="relative w-[180px] h-[45px]">
              <Image 
                src="https://wp.mnlegal.net/wp-content/uploads/2021/11/MNL-ADVOCATES-LLP-MN-LEGAL-x2.png"
                alt="MN Legal – MN Advocates LLP"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <p className="foot-tagline text-[13px] leading-[1.7] text-white/45 max-w-[400px] mb-[24px]">We are a full–service firm that endeavors to take genuine interest in our clients, understand their objectives and provide a network of innovative legal solutions, excellent legal representation and a growth partner for their businesses.</p>
          <div className="foot-social flex gap-[10px]">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.url}
                className="soc-btn w-[34px] h-[34px] border border-[rgba(139,28,63,.3)] flex items-center justify-center text-white/45 text-[12px] transition-all duration-300 hover:bg-[var(--mn-burgundy)] hover:border-[var(--mn-burgundy)] hover:text-white"
                target={social.icon !== '✉' ? "_blank" : undefined}
                rel={social.icon !== '✉' ? "noopener" : undefined}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <div className="foot-col-ttl text-[10px] font-semibold tracking-[2.5px] uppercase text-white/30 mb-[20px]">Practice Areas</div>
          <ul className="foot-links flex flex-col gap-[11px]">
            {[
              { name: 'Data Privacy & Protection', slug: 'data-privacy' },
              { name: 'Corporate & Commercial', slug: 'corporate-commercial' },
              { name: 'Litigation & Dispute Resolution', slug: 'litigation-dispute-resolution' },
              { name: 'Conveyancing & Property', slug: 'conveyancing-property' },
              { name: 'Banking & Finance (Fintech)', slug: 'banking-finance-fintech' },
              { name: 'Intellectual Property', slug: 'intellectual-property' },
              { name: 'Employment & Labour', slug: 'employment-labour' }
            ].map((item) => (
              <li key={item.slug}>
                <Link href={`/practice-areas/${item.slug}`} className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/85">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="foot-col-ttl text-[10px] font-semibold tracking-[2.5px] uppercase text-white/30 mb-[20px]">Insights</div>
          <ul className="foot-links flex flex-col gap-[11px]">
            <li>
              <Link href="/insights" className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/85">
                All Articles
              </Link>
            </li>
            {categories.map((category: any) => (
              <li key={category.slug}>
                <Link href={`/insights?category=${category.slug}`} className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/85">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="foot-col-ttl text-[10px] font-semibold tracking-[2.5px] uppercase text-white/30 mb-[20px]">Contact</div>
          <address className="not-italic" itemScope itemType="http://schema.org/LegalService">
            <ul className="foot-links flex flex-col gap-[11px]">
              <li>
                <a href="tel:+254700325089" itemProp="telephone" className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/85">
                  +254 700 325 089
                </a>
              </li>
              <li>
                <a href="mailto:info@mnlegal.net" itemProp="email" className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/85">
                  info@mnlegal.net
                </a>
              </li>
              <li>
                <a href="https://www.mnlegal.net" itemProp="url" className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/85" target="_blank" rel="noopener">
                  mnlegal.net
                </a>
              </li>
              <li>
                <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                  <span itemProp="streetAddress" className="text-[13px] text-white/35 block">Nairobi, Kenya</span>
                </div>
              </li>
            </ul>
          </address>
        </div>
      </div>

      <div className="foot-bottom border-t border-white/5 pt-[28px] flex flex-wrap items-center justify-between gap-[12px]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <p className="foot-copy text-[11px] text-white/30">© 2026 MN Advocates LLP. All rights reserved.</p>
          <Link href="/privacy" className="text-[11px] text-white/40 hover:text-[var(--mn-burgundy)] transition-colors duration-300 underline underline-offset-4 decoration-white/10">
            Privacy Policy
          </Link>
          <Link href="/sitemap.xml" className="text-[11px] text-white/40 hover:text-[var(--mn-burgundy)] transition-colors duration-300 underline underline-offset-4 decoration-white/10">
            Sitemap
          </Link>
        </div>
        <p className="foot-disc text-[11px] italic text-white/20 max-w-[560px] md:text-right text-left">The content on this website is for general information only and does not constitute legal advice. Consult a qualified advocate for advice specific to your circumstances.</p>
      </div>
    </footer>
  );
}
