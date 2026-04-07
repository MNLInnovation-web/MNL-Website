'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Image from 'next/image';

const navLinks = [
  { label: 'Home',           href: '/' },
  { label: 'Practice Areas', href: '/#practice' },
  { label: 'About',          href: '/#about' },
  { label: 'Our Team',       href: '/#team' },
  { label: 'Insights',       href: '/insights' },
  { label: 'Contact',        href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = scrolled || pathname !== '/';

  return (
    <nav 
      id="nav" 
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-400 ease-[var(--ease-expo)] md:px-[60px] px-[24px] ${
        scrolled ? 'p-[12px_60px] bg-[rgba(26,39,68,0.98)] backdrop-blur-[20px] border-b border-[rgba(139,28,63,0.14)]' : 'p-[20px_60px] bg-transparent'
      }`}
    >
      <Link href="/" className="nav-brand relative transition-transform duration-500 hover:scale-105 bg-white p-2 inline-flex items-center">
        <div className="relative w-[180px] h-[45px]">
          <Image 
            src="https://wp.mnlegal.net/wp-content/uploads/2021/11/MNL-ADVOCATES-LLP-MN-LEGAL-x2.png"
            alt="MN Legal - MN Advocates LLP"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>

      <ul className="nav-links hidden md:flex gap-[36px]">
        {navLinks.map(({ label, href }) => (
          <li key={label}>
            <Link 
              href={href}
              className={`text-[11px] font-medium tracking-[1.2px] uppercase transition-colors duration-300 relative pb-[4px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[var(--mn-burgundy)] after:transition-all after:duration-400 after:ease-[var(--ease-expo)] ${
                isDark ? 'text-[#1a2744] hover:text-[var(--mn-burgundy)]' : 'text-white/60 hover:text-white'
              } after:w-0 hover:after:w-full`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          className="nav-btn hidden md:block bg-[var(--mn-burgundy)] border-2 border-[var(--mn-burgundy)] text-white p-[10px_26px] text-[11px] font-semibold tracking-[1.5px] uppercase relative overflow-hidden group"
          onClick={() => window.location.href = '/#contact'}
        >
          <span className="relative z-10">Consult Now</span>
          <div className="absolute inset-0 bg-[var(--mn-burgundy-dark)] translate-x-[-101%] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0"></div>
        </button>

        <button 
          className={`nav-ham md:hidden flex flex-col gap-[5px] p-[4px] ml-2 relative z-[1001] ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span className={`block w-[22px] h-[1.5px] ${isDark ? 'bg-[#1a2744]' : 'bg-white'} transition-all duration-400 ease-[var(--ease-expo)] ${isOpen ? 'translate-y-[6.5px] rotate-45 !bg-white' : ''}`}></span>
          <span className={`block w-[22px] h-[1.5px] ${isDark ? 'bg-[#1a2744]' : 'bg-white'} transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-[22px] h-[1.5px] ${isDark ? 'bg-[#1a2744]' : 'bg-white'} transition-all duration-400 ease-[var(--ease-expo)] ${isOpen ? 'translate-y-[-6.5px] -rotate-45 !bg-white' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[var(--mn-navy-deep)] transition-transform duration-500 ease-[var(--ease-expo)] md:hidden flex flex-col items-center justify-center gap-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         {navLinks.map(({ label, href }) => (
           <Link 
             key={label} 
             href={href}
             className="text-white text-xl uppercase tracking-widest font-display italic"
             onClick={() => setIsOpen(false)}
           >
             {label}
           </Link>
         ))}
      </div>
    </nav>
  );
}
