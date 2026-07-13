'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import UIExtras from '@/app/components/UIExtras';

export default function NotFound() {
  useEffect(() => {
    // Track 404 error event in GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_not_found', {
        event_category: 'error',
        event_label: window.location.pathname,
        non_interaction: true
      });
    }
  }, []);

  return (
    <main className="relative bg-[var(--mn-navy)] min-h-screen flex flex-col justify-between">
      <UIExtras />
      <Navbar />

      <section className="relative flex-grow flex items-center justify-center pt-40 pb-24 px-6 md:px-16 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,28,63,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,28,63,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-[10%] w-[300px] h-[300px] rounded-full border border-white/5 pointer-events-none animate-[pulse_6s_infinite]"></div>
        <div className="absolute bottom-1/4 right-[10%] w-[200px] h-[200px] rounded-full border border-[var(--mn-burgundy)]/10 pointer-events-none animate-[pulse_8s_infinite]"></div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <span className="text-[var(--mn-burgundy)] text-[12px] font-semibold uppercase tracking-[0.3em] mb-6 block animate-bounce">
            Error 404 - Not Found
          </span>
          <h1 className="text-[clamp(36px,6vw,64px)] font-display italic text-white leading-tight mb-8">
            The page you seek <br /> does not exist.
          </h1>
          <p className="text-[17px] text-white/70 font-body leading-relaxed max-w-[500px] mx-auto mb-12">
            The resource may have been relocated, deleted, or the link may be broken. Please return to the homepage or initiate a consultation with our experts.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="/"
              className="bg-[var(--mn-burgundy)] text-white text-[11px] font-bold uppercase tracking-[2.5px] px-10 py-5 hover:bg-[var(--mn-burgundy-dark)] transition-all duration-500 border border-[var(--mn-burgundy)]"
            >
              Return to Homepage
            </Link>
            <Link 
              href="/contact"
              className="bg-transparent border border-white/30 text-white text-[11px] font-bold uppercase tracking-[2.5px] px-10 py-5 hover:bg-white hover:text-[var(--mn-navy)] transition-all duration-500"
            >
              Initiate Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
