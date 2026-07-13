'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const SLIDE_IMAGES = [
  {
    url: 'https://wp.mnlegal.net/wp-content/uploads/2024/01/MN-Legal-Representation.jpg',
    alt: 'MN Legal advocates in representation',
    caption: 'MN Advocates LLP'
  },
  {
    url: 'https://wp.mnlegal.net/wp-content/uploads/2026/03/hero-nairobi-skyline.png',
    alt: 'Nairobi Central Business District skyline',
    caption: "Nairobi's Legal Centre"
  },
  {
    url: 'https://wp.mnlegal.net/wp-content/uploads/2026/03/hero-law-courts.png',
    alt: 'High Court of Kenya, Nairobi',
    caption: 'High Court of Kenya'
  },
  {
    url: 'https://wp.mnlegal.net/wp-content/uploads/2026/03/hero-boardroom.png',
    alt: 'MN Legal corporate boardroom, Nairobi',
    caption: 'The MN Legal Boardroom'
  }
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ADDED: slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circle Animations
      gsap.to(circle1Ref.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'linear',
      });

      gsap.to(circle2Ref.current, {
        rotation: -360,
        duration: 50,
        repeat: -1,
        ease: 'linear',
      });

      // Content Stagger
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          '.hero-divider',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '.hero-h1',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.4'
        )
        .fromTo(
          '.hero-sub',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          '.hero-btn',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          '-=0.4'
        )
        // ADDED: slideshow
        .fromTo(
          '.slide-dots',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ADDED: slideshow logic
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setPrevSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
      
      // Clear prevSlide class after transition
      setTimeout(() => {
        setPrevSlide(null);
      }, 1700);
    }, 5500);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  const goToSlide = (idx: number) => {
    if (idx === currentSlide) return;
    setPrevSlide(currentSlide);
    setCurrentSlide(idx);
    setTimeout(() => {
      setPrevSlide(null);
    }, 1700);
  };

  // ADDED: Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToSlide((currentSlide + 1) % SLIDE_IMAGES.length);
      if (e.key === 'ArrowLeft') goToSlide((currentSlide - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <section
      ref={heroRef}
      /* MODIFIED: two-column hero */
      className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 md:px-16 overflow-hidden bg-[linear-gradient(135deg,#1a2744_0%,#2d3e5f_50%,#1a2744_100%)] text-white pt-20 hero-grid"
    >
      {/* Decorative Circles */}
      <div
        ref={circle1Ref}
        className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full border border-[rgba(139,28,63,0.3)] opacity-60 pointer-events-none"
      ></div>
      <div
        ref={circle2Ref}
        className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full border border-[rgba(139,28,63,0.2)] opacity-40 pointer-events-none"
      ></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,28,63,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,28,63,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%,black_40%,transparent_100%)] pointer-events-none"></div>

      {/* MODIFIED: two-column hero */}
      <div className="hero-left relative z-10 max-w-[600px] w-full py-20 lg:py-0" ref={contentRef}>
        <div className="hero-tag inline-block bg-[rgba(139,28,63,0.1)] border border-[rgba(139,28,63,0.4)] px-4 py-1.5 mb-6 text-[11px] font-semibold tracking-[0.2em] text-[var(--mn-cream)] uppercase">
          Advocates & Solicitors
        </div>
        
        <div className="hero-divider w-24 h-[3px] bg-[var(--mn-burgundy)] mb-8"></div>
        
        <h1 className="hero-h1 font-display text-[clamp(32px,5vw,62px)] leading-[1.1] mb-3 font-bold uppercase tracking-wide">
          Your Creative, Innovative <br className="hidden md:block" />
          <span className="text-[var(--mn-cream)]">Legal Partner</span>
        </h1>
        <p className="font-display italic text-[clamp(15px,1.8vw,22px)] text-white/70 mb-8 tracking-widest">
          local expertise · global talent
        </p>
        
        <p className="hero-sub font-body text-[18px] md:text-[20px] text-white max-w-[600px] leading-relaxed mb-12 drop-shadow-sm font-medium">
          MN Legal is a premier law firm in Nairobi, providing sophisticated legal solutions for complex commercial and dispute resolution matters across East Africa.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/contact"
            className="hero-btn btn-primary bg-[var(--mn-burgundy)] text-white text-[13px] font-bold uppercase tracking-[1.5px] px-8 py-4 border border-[var(--mn-burgundy)] hover:bg-[var(--mn-burgundy-dark)] transition-colors duration-300 min-w-[200px] text-center"
          >
            Consult Our Team
          </Link>
          <Link
            href="/practice-areas"
            className="hero-btn btn-secondary bg-transparent text-white text-[13px] font-bold uppercase tracking-[1.5px] px-8 py-4 border border-white hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 min-w-[200px] text-center"
          >
            Our Practice Areas
          </Link>
        </div>

        {/* Proof Row */}
        <div className="hero-btn mt-16 pt-8 border-t border-white/10 max-w-[500px]">
          <span className="text-[10px] uppercase tracking-[2px] text-white/40 font-bold block mb-4">
            Trusted by Leaders In:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center opacity-65">
            <div className="text-left">
              <span className="text-[11px] font-display uppercase tracking-[1.5px] text-white/80 font-semibold block">Fintech</span>
              <span className="text-[9px] uppercase tracking-[1px] text-[var(--mn-cream)]/50 block mt-0.5">Operators</span>
            </div>
            <div className="text-left border-l border-white/10 pl-4">
              <span className="text-[11px] font-display uppercase tracking-[1.5px] text-white/80 font-semibold block">Digital</span>
              <span className="text-[9px] uppercase tracking-[1px] text-[var(--mn-cream)]/50 block mt-0.5">Assets</span>
            </div>
            <div className="text-left border-l border-white/10 pl-4">
              <span className="text-[11px] font-display uppercase tracking-[1.5px] text-white/80 font-semibold block">Venture</span>
              <span className="text-[9px] uppercase tracking-[1px] text-[var(--mn-cream)]/50 block mt-0.5">Funds</span>
            </div>
            <div className="text-left border-l border-white/10 pl-4">
              <span className="text-[11px] font-display uppercase tracking-[1.5px] text-white/80 font-semibold block">Corporate</span>
              <span className="text-[9px] uppercase tracking-[1px] text-[var(--mn-cream)]/50 block mt-0.5">Advisory</span>
            </div>
          </div>
        </div>

        {/* ADDED: slideshow dots */}
        <div className="slide-dots mt-8" id="slide-dots">
          {SLIDE_IMAGES.map((_, idx) => (
            <div 
              key={idx}
              className={`dot cursor-pointer ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            ></div>
          ))}
        </div>
      </div>

      {/* ADDED: slideshow column */}
      <div className="hero-right hidden lg:flex" aria-hidden="true">
        <div 
          className="img-stage" 
          id="img-stage"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {SLIDE_IMAGES.map((slide, idx) => (
            <div 
              key={idx}
              className={`img-slide ${currentSlide === idx ? 'active' : ''} ${prevSlide === idx ? 'prev' : ''}`}
              id={`slide-${idx}`}
            >
              <img
                src={slide.url}
                alt={slide.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                loading={idx === 0 ? "eager" : "lazy"}
                {...(idx === 0 ? { fetchPriority: "high" } as any : {})}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(160deg,#1a2744,#2d3e5f)';
                }}
              />
            </div>
          ))}
        </div>

        <div className="slide-caption">
          <div className="cap-num" id="cap-num">
            {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDE_IMAGES.length).padStart(2, '0')}
          </div>
          <div className="cap-text" id="cap-text" style={{ opacity: prevSlide !== null ? 0 : 1 }}>
            {SLIDE_IMAGES[currentSlide].caption}
          </div>
        </div>
      </div>
    </section>
  );
}
