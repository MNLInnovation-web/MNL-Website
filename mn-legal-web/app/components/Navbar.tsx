'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  ChevronDown, 
  ArrowUpRight, 
  MessageCircle, 
  Phone, 
  Shield, 
  Scale, 
  Cpu, 
  Building2, 
  Landmark, 
  Briefcase, 
  Layers, 
  X, 
  Menu,
  Clock,
  MapPin
} from 'lucide-react';
import { practiceAreas } from '@/lib/practice-areas';

// Practice area icon helper for the flyout - pure white on dark navy
const getPracticeIcon = (slug: string) => {
  switch (slug) {
    case 'data-privacy':
      return <Shield className="w-4 h-4 text-white" />;
    case 'corporate-commercial':
      return <Building2 className="w-4 h-4 text-white" />;
    case 'litigation-dispute-resolution':
      return <Scale className="w-4 h-4 text-white" />;
    case 'conveyancing-property':
      return <Landmark className="w-4 h-4 text-white" />;
    case 'intellectual-property':
      return <Cpu className="w-4 h-4 text-white" />;
    case 'banking-finance-fintech':
      return <Layers className="w-4 h-4 text-white" />;
    case 'employment-labour':
      return <Briefcase className="w-4 h-4 text-white" />;
    default:
      return <Scale className="w-4 h-4 text-white" />;
  }
};

const navLinks = [
  { label: 'Home',           href: '/' },
  { label: 'Practice Areas', href: '/practice-areas', hasDropdown: true },
  { label: 'About',          href: '/about' },
  { label: 'Our Team',       href: '/team' },
  { label: 'Insights',       href: '/insights' },
  { label: 'Contact',        href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [mobilePracticeOpen, setMobilePracticeOpen] = useState(false);
  const flyoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setPracticeOpen(false);
    setMobilePracticeOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleMouseEnterPractice = () => {
    if (flyoutTimeoutRef.current) clearTimeout(flyoutTimeoutRef.current);
    setPracticeOpen(true);
  };

  const handleMouseLeavePractice = () => {
    flyoutTimeoutRef.current = setTimeout(() => {
      setPracticeOpen(false);
    }, 180);
  };

  const trackLead = (source: string) => {
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'generate_lead', {
        lead_source: source,
        value: 1.0,
        currency: 'KES',
      });
    }
  };

  // Determine active route
  const isRouteActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Floating Island Navigation Container */}
      <header
        className="fixed top-3 sm:top-4 md:top-5 left-3 sm:left-6 md:left-8 lg:left-12 right-3 sm:right-6 md:right-8 lg:right-12 z-[1000] max-w-[1360px] mx-auto transition-all duration-500 ease-[var(--ease-expo)]"
      >
        <nav
          id="nav"
          aria-label="Main Navigation"
          className={`w-full flex items-center justify-between rounded-2xl md:rounded-full px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-[var(--ease-expo)] ${
            scrolled
              ? 'py-2.5 sm:py-3 bg-[rgba(19,29,51,0.95)] backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(10,16,30,0.65)]'
              : 'py-3 sm:py-3.5 bg-[rgba(19,29,51,0.85)] backdrop-blur-xl border border-white/20 shadow-[0_12px_36px_rgba(10,16,30,0.45)]'
          }`}
        >
          {/* Brand Logo - Integrated Luxury Frosted Pill Container */}
          <Link
            href="/"
            className="nav-brand relative inline-flex items-center transition-all duration-400 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
            aria-label="MN Legal - Home"
          >
            <div className="relative flex items-center justify-center bg-white/95 hover:bg-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/50 shadow-[0_2px_12px_rgba(0,0,0,0.18)] transition-all duration-300">
              <div className="relative w-[130px] sm:w-[155px] h-[30px] sm:h-[34px]">
                <Image
                  src="https://wp.mnlegal.net/wp-content/uploads/2021/11/MNL-ADVOCATES-LLP-MN-LEGAL-x2.png"
                  alt="MN Legal - MN Advocates LLP"
                  fill
                  sizes="(max-width: 640px) 130px, 155px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav-links hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(({ label, href, hasDropdown }) => {
              const active = isRouteActive(href);

              if (hasDropdown) {
                return (
                  <li
                    key={label}
                    className="relative"
                    onMouseEnter={handleMouseEnterPractice}
                    onMouseLeave={handleMouseLeavePractice}
                  >
                    <Link
                      href={href}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] xl:text-[13px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 ${
                        active
                          ? 'text-white bg-white/[0.15] shadow-inner'
                          : 'text-white/85 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] animate-pulse" />
                      )}
                      <span>{label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          practiceOpen ? 'rotate-180 text-white' : 'text-white/70'
                        }`}
                      />
                    </Link>

                    {/* Interactive Practice Areas Mega Flyout */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[780px] transition-all duration-300 ${
                        practiceOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-[rgba(19,29,51,0.98)] backdrop-blur-3xl border border-white/20 rounded-2xl p-6 shadow-[0_24px_64px_rgba(0,0,0,0.7)]">
                        {/* Flyout Header */}
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                          <div>
                            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-white/95 block mb-1">
                              MN Legal Practice Groups
                            </span>
                            <h4 className="font-display italic text-white text-xl">
                              Specialized Legal Counsel & Advisory
                            </h4>
                          </div>
                          <Link
                            href="/practice-areas"
                            className="inline-flex items-center gap-1.5 text-[12px] xl:text-[13px] font-semibold uppercase tracking-wider text-white hover:text-[var(--mn-cream)] transition-colors"
                          >
                            <span>All Disciplines</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                          </Link>
                        </div>

                        {/* Two-Column Practice Area Grid */}
                        <div className="grid grid-cols-2 gap-3.5 mb-4">
                          {practiceAreas.map((area) => (
                            <Link
                              key={area.slug}
                              href={`/practice-areas/${area.slug}`}
                              className="group flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.1] border border-transparent hover:border-white/20 transition-all duration-300"
                            >
                              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.1] border border-white/20 group-hover:scale-105 group-hover:bg-white/20 group-hover:border-white/40 text-white transition-all duration-300 shadow-sm shrink-0">
                                {getPracticeIcon(area.slug)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[14px] font-semibold text-white group-hover:text-[var(--mn-cream)] transition-colors flex items-center justify-between">
                                  <span className="truncate">{area.title}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-all -translate-x-1 group-hover:translate-x-0" />
                                </div>
                                <p className="text-[12px] text-white/80 line-clamp-1 mt-0.5 font-normal">
                                  {area.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Bottom Flyout Banner */}
                        <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[12px] sm:text-[13px] text-white/85">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>Advising clients in Nairobi, East Africa & London</span>
                          </span>
                          <Link
                            href="/contact"
                            onClick={() => trackLead('nav_flyout_cta')}
                            className="text-white hover:text-[var(--mn-cream)] hover:underline font-semibold inline-flex items-center gap-1.5"
                          >
                            <span>Speak to a Partner</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={label}>
                  <Link
                    href={href}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] xl:text-[13px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 ${
                      active
                        ? 'text-white bg-white/[0.15] shadow-inner'
                        : 'text-white/85 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] animate-pulse" />
                    )}
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Action Utilities (WhatsApp + Consult Now CTA + Mobile Toggle) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick WhatsApp Micro-Action */}
            <a
              href="https://wa.me/254700325089?text=Hello%20MN%20Legal,%20I%20would%20like%20to%20inquire%20about%20legal%20services"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLead('whatsapp_click')}
              className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 transition-all duration-300 hover:scale-105"
              aria-label="Chat with MN Legal on WhatsApp"
              title="Direct WhatsApp: +254 700 325 089"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Direct Telephone Micro-Action */}
            <a
              href="tel:+254700325089"
              onClick={() => trackLead('general_phone_click')}
              className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-white/75 hover:text-white transition-all duration-300 hover:scale-105"
              aria-label="Call MN Legal Office"
              title="Call +254 700 325 089"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>

            {/* High-Prestige "Consult Now" CTA */}
            <Link
              href="/contact"
              onClick={() => trackLead('contact_form')}
              className="group relative inline-flex items-center gap-1.5 sm:gap-2 bg-[var(--mn-burgundy)] hover:bg-[var(--mn-burgundy-dark)] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[12px] sm:text-[13px] font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(139,28,63,0.35)] hover:shadow-[0_6px_22px_rgba(139,28,63,0.55)] hover:scale-[1.02] active:scale-[0.98] border border-white/10"
            >
              <span>Consult Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Hamburger Button for Mobile / Tablet */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white transition-all duration-300 active:scale-95"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Luxury Full-Screen Mobile Drawer */}
      <div
        id="mobile-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`fixed inset-0 z-[1050] bg-[rgba(13,20,36,0.98)] backdrop-blur-3xl flex flex-col justify-between transition-all duration-500 ease-[var(--ease-expo)] lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center bg-white/95 px-3.5 py-1.5 rounded-full border border-white/50 shadow-sm"
          >
            <div className="relative w-[130px] h-[30px]">
              <Image
                src="https://wp.mnlegal.net/wp-content/uploads/2021/11/MNL-ADVOCATES-LLP-MN-LEGAL-x2.png"
                alt="MN Legal - MN Advocates LLP"
                fill
                sizes="130px"
                className="object-contain"
              />
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center text-white border border-white/20"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body - Primary Links & Accordion */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <nav className="flex flex-col gap-5">
            {navLinks.map(({ label, href, hasDropdown }) => {
              const active = isRouteActive(href);

              if (hasDropdown) {
                return (
                  <div key={label} className="border-b border-white/10 pb-4">
                    <button
                      type="button"
                      onClick={() => setMobilePracticeOpen(!mobilePracticeOpen)}
                      className="w-full flex items-center justify-between text-left font-display italic text-2xl text-white hover:text-[var(--mn-cream)] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span>{label}</span>
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] animate-pulse" />
                        )}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-white/70 transition-transform duration-300 ${
                          mobilePracticeOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>

                    {/* Mobile Practice Areas Accordion Content */}
                    {mobilePracticeOpen && (
                      <div className="mt-3 pl-3 flex flex-col gap-3 animate-in fade-in duration-300">
                        {practiceAreas.map((area) => (
                          <Link
                            key={area.slug}
                            href={`/practice-areas/${area.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 py-1 text-[15px] text-white/90 hover:text-white"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                            <span>{area.title}</span>
                          </Link>
                        ))}
                        <Link
                          href="/practice-areas"
                          onClick={() => setIsOpen(false)}
                          className="mt-1 text-[13px] font-semibold uppercase tracking-wider text-white hover:text-[var(--mn-cream)] hover:underline inline-flex items-center gap-1.5"
                        >
                          <span>View All Practice Areas</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={label} className="border-b border-white/10 pb-4">
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between font-display italic text-2xl text-white hover:text-[var(--mn-cream)] transition-colors"
                  >
                    <span>{label}</span>
                    {active ? (
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] animate-pulse" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-white/50" />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Quick Connect Buttons in Mobile Drawer */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/254700325089?text=Hello%20MN%20Legal,%20I%20would%20like%20to%20inquire%20about%20legal%20services"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLead('whatsapp_click')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600/25 border border-emerald-500/40 text-emerald-300 font-semibold text-[13px] uppercase tracking-wider shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us Directly</span>
            </a>

            <a
              href="tel:+254700325089"
              onClick={() => trackLead('general_phone_click')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.1] border border-white/25 text-white font-semibold text-[13px] uppercase tracking-wider shadow-sm"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call +254 700 325 089</span>
            </a>
          </div>
        </div>

        {/* Drawer Footer with Office Info */}
        <div className="p-6 bg-black/40 border-t border-white/15 flex flex-col gap-2.5 text-[12px] sm:text-[13px] text-white/70">
          <div className="flex items-center gap-2.5 text-white/90">
            <MapPin className="w-4 h-4 text-white shrink-0" />
            <span>Global Center, 1st Fl, CBC Bldg, Argwings Kodhek Rd, Kilimani, Nairobi</span>
          </div>
          <div className="flex items-center gap-2.5 text-white/90">
            <Clock className="w-4 h-4 text-white shrink-0" />
            <span>Monday – Friday: 08:00 – 17:00 EAT</span>
          </div>
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-white/50 text-[10px]">
            <span>© {new Date().getFullYear()} MN Advocates LLP</span>
            <div className="flex gap-3">
              <a href="https://linkedin.com/company/mn-legal" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
              <a href="https://twitter.com/mnlegaladvocate" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter / X</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

