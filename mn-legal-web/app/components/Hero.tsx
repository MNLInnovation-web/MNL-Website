'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Scale 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SLIDE_IMAGES = [
  {
    url: 'https://wp.mnlegal.net/wp-content/uploads/2024/01/MN-Legal-Representation.jpg',
    alt: 'MN Legal advocates in representation',
    caption: 'Courtroom & Regulatory Advocacy',
    subcaption: 'Advocates of the High Court of Kenya providing strategic trial and appellate representation',
    tag: 'Litigation & Superior Courts',
    badge: 'Senior Advocates',
  },
  {
    url: 'https://wp.mnlegal.net/wp-content/uploads/2026/03/hero-nairobi-skyline.png',
    alt: 'Nairobi Central Business District skyline',
    caption: "The Silicon Savannah's Legal Counsel",
    subcaption: 'Specialized advisory for pan-African fintechs, digital assets, and high-growth venture platforms',
    tag: 'Nairobi HQ · Regional Gateway',
    badge: 'Pan-African Hub',
  },
  {
    url: 'https://wp.mnlegal.net/wp-content/uploads/2026/03/hero-law-courts.png',
    alt: 'High Court of Kenya, Nairobi',
    caption: 'Institutional Gravitas & Legal Heritage',
    subcaption: 'Anchoring modern commercial transactions in constitutional integrity and precision',
    tag: 'High Court of Kenya',
    badge: 'Legal Heritage',
  },
  {
    url: 'https://wp.mnlegal.net/wp-content/uploads/2026/03/hero-boardroom.png',
    alt: 'MN Legal corporate boardroom, Nairobi',
    caption: 'Strategic Corporate & Tech Advisory',
    subcaption: 'Structuring cross-border capital, data governance audits, and enterprise AI compliance',
    tag: 'Corporate Boardroom · Kilimani',
    badge: 'Client Advisory',
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 6000; // 6s per slide

  const goToSlide = useCallback((idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % SLIDE_IMAGES.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
  }, [currentSlide, goToSlide]);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotating Decorative Rings
      gsap.to(circle1Ref.current, {
        rotation: 360,
        duration: 45,
        repeat: -1,
        ease: 'linear',
      });

      gsap.to(circle2Ref.current, {
        rotation: -360,
        duration: 55,
        repeat: -1,
        ease: 'linear',
      });

      // Left Column Content Stagger
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
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
          '.hero-tagline',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
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
        .fromTo(
          '.hero-proof',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '.hero-visual-card',
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
          '-=0.8'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Slide Rotation & Progress Bar Timer
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // Update progress bar every 50ms
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % SLIDE_IMAGES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1fr_1.25fr] gap-8 lg:gap-10 xl:gap-16 items-center px-6 sm:px-10 md:px-12 lg:px-12 xl:px-16 2xl:px-20 overflow-hidden bg-[linear-gradient(135deg,#1a2744_0%,#2d3e5f_50%,#1a2744_100%)] text-white pt-24 sm:pt-28 lg:pt-24 pb-16 lg:pb-20 hero-grid"
    >
      {/* Decorative Rotating Rings */}
      <div
        ref={circle1Ref}
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full border border-[rgba(139,28,63,0.25)] opacity-60 pointer-events-none"
      />
      <div
        ref={circle2Ref}
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full border border-[rgba(139,28,63,0.18)] opacity-40 pointer-events-none"
      />

      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,28,63,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,28,63,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%,black_40%,transparent_100%)] pointer-events-none" />

      {/* Left Column: Authoritative Editorial Copy */}
      <div className="hero-left relative z-10 max-w-[580px] xl:max-w-[620px] w-full py-6 lg:py-10" ref={contentRef}>
        <div className="hero-tag inline-flex items-center gap-2 bg-[rgba(139,28,63,0.12)] border border-[rgba(139,28,63,0.4)] px-4 py-2 mb-6 text-[13px] font-semibold tracking-[0.2em] text-[var(--mn-cream)] uppercase rounded-full">
          <span className="w-2 h-2 rounded-full bg-[var(--mn-burgundy)]" />
          <span>Advocates & Solicitors</span>
        </div>
        
        <div className="hero-divider w-24 h-[3px] bg-[var(--mn-burgundy)] mb-7" />
        
        <h1 className="hero-h1 font-display text-[clamp(32px,4.8vw,62px)] leading-[1.08] mb-3 font-bold uppercase tracking-wide">
          Your Creative, Innovative <br className="hidden md:block" />
          <span className="text-[var(--mn-cream)]">Legal Partner</span>
        </h1>

        <p className="hero-tagline font-display italic text-[clamp(18px,2vw,24px)] text-white/80 mb-6 tracking-widest">
          local expertise · global talent
        </p>
        
        <p className="hero-sub font-body text-[16px] sm:text-[18px] md:text-[19px] text-white/85 max-w-[560px] leading-relaxed mb-10 font-normal">
          MN Legal is a premier boutique law firm in Nairobi, providing sophisticated counsel for complex commercial ventures, data privacy governance, and high-stakes dispute resolution across East Africa.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <Link
            href="/contact"
            className="hero-btn btn-primary bg-[var(--mn-burgundy)] text-white text-[13px] sm:text-[14px] font-bold uppercase tracking-[1.8px] px-8 py-4 border border-[var(--mn-burgundy)] hover:bg-[var(--mn-burgundy-dark)] transition-all duration-300 min-w-[200px] text-center rounded-full shadow-[0_6px_20px_rgba(139,28,63,0.35)] hover:shadow-[0_8px_24px_rgba(139,28,63,0.55)] hover:scale-[1.02]"
          >
            Consult Our Team
          </Link>
          <Link
            href="/practice-areas"
            className="hero-btn btn-secondary bg-white/[0.05] text-white text-[13px] sm:text-[14px] font-bold uppercase tracking-[1.8px] px-8 py-4 border border-white/30 hover:border-white hover:bg-white/[0.12] transition-all duration-300 min-w-[200px] text-center rounded-full backdrop-blur-sm hover:scale-[1.02]"
          >
            Our Practice Areas
          </Link>
        </div>

        {/* Proof Row */}
        <div className="hero-proof mt-12 sm:mt-14 pt-7 border-t border-white/10 max-w-[540px]">
          <span className="text-[12px] uppercase tracking-[2.2px] text-white/60 font-bold block mb-4">
            Trusted by Leaders In:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-center opacity-90">
            <div className="text-left">
              <span className="text-[14px] font-display uppercase tracking-[1.5px] text-white font-semibold block">Fintech</span>
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[1px] text-[var(--mn-cream)]/75 block mt-0.5">Operators</span>
            </div>
            <div className="text-left border-l border-white/15 pl-4">
              <span className="text-[14px] font-display uppercase tracking-[1.5px] text-white font-semibold block">Digital</span>
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[1px] text-[var(--mn-cream)]/75 block mt-0.5">Assets</span>
            </div>
            <div className="text-left border-l border-white/15 pl-4">
              <span className="text-[14px] font-display uppercase tracking-[1.5px] text-white font-semibold block">Venture</span>
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[1px] text-[var(--mn-cream)]/75 block mt-0.5">Funds</span>
            </div>
            <div className="text-left border-l border-white/15 pl-4">
              <span className="text-[14px] font-display uppercase tracking-[1.5px] text-white font-semibold block">Corporate</span>
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[1px] text-[var(--mn-cream)]/75 block mt-0.5">Advisory</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Architectural Glassmorphic Media Canvas (Expansive Scale) */}
      <div className="hero-right relative w-full flex items-center justify-center lg:justify-end py-6 sm:py-8 lg:py-10">
        {/* Ambient Backlight Glow */}
        <div className="absolute w-[100%] h-[100%] bg-gradient-to-tr from-[var(--mn-burgundy)]/30 via-[#2d3e5f]/40 to-blue-500/15 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Main Architectural Card - Expansive Full Coverage */}
        <div
          className="hero-visual-card relative w-full max-w-full lg:max-w-[700px] xl:max-w-[780px] 2xl:max-w-[860px] h-[520px] sm:h-[620px] md:h-[660px] lg:h-[720px] xl:h-[760px] 2xl:h-[820px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_28px_72px_rgba(10,16,30,0.7)] bg-[rgba(19,29,51,0.6)] backdrop-blur-md group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Images Stack with Ken Burns Crossfade */}
          {SLIDE_IMAGES.map((slide, idx) => (
            <div
              key={slide.url}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 780px, 860px"
                priority={idx === 0}
                className={`object-cover object-center ${currentSlide === idx ? 'hero-kenburns' : ''}`}
              />
            </div>
          ))}

          {/* Vignette Gradient Overlay for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,20,36,0.96)] via-[rgba(13,20,36,0.25)] to-[rgba(13,20,36,0.35)] pointer-events-none z-10" />

          {/* Card Top Utility Bar: Location & Tag */}
          <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 z-20 flex items-center justify-between">
            {/* Top-Left Location Pill */}
            <div className="inline-flex items-center gap-2.5 bg-[rgba(19,29,51,0.85)] backdrop-blur-md border border-white/20 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[13px] sm:text-[14px] font-semibold text-white shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Nairobi, KE</span>
              <span className="text-white/40">·</span>
              <span className="text-[var(--mn-cream)]">{SLIDE_IMAGES[currentSlide].tag}</span>
            </div>

            {/* Top-Right Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 bg-[rgba(139,28,63,0.9)] backdrop-blur-md border border-white/20 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-xl">
              <Sparkles className="w-4 h-4 text-[var(--mn-cream)]" />
              <span>{SLIDE_IMAGES[currentSlide].badge}</span>
            </div>
          </div>

          {/* Card Bottom: Segmented Timer Bars + Editorial Captions + Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 xl:p-10 z-20 flex flex-col gap-4 sm:gap-5">
            {/* Segmented Progress Timer Bars */}
            <div className="grid grid-cols-4 gap-2.5 w-full">
              {SLIDE_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className="group/bar relative h-1.5 sm:h-2 rounded-full bg-white/25 overflow-hidden transition-all hover:h-2.5"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-100 ${
                      currentSlide === idx
                        ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]'
                        : currentSlide > idx
                        ? 'bg-white/70'
                        : 'bg-transparent'
                    }`}
                    style={{
                      width: currentSlide === idx ? `${progress}%` : currentSlide > idx ? '100%' : '0%',
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Editorial Caption & Slide Meta */}
            <div className="flex items-end justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="text-[13px] sm:text-[14px] font-bold tracking-[0.24em] uppercase text-white">
                    {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDE_IMAGES.length).padStart(2, '0')}
                  </span>
                  <span className="text-white/50 text-sm">•</span>
                  <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.18em] text-[var(--mn-cream)] font-bold truncate">
                    {SLIDE_IMAGES[currentSlide].tag}
                  </span>
                </div>

                <h3 className="font-display italic text-2xl sm:text-3xl xl:text-[34px] text-white font-normal leading-snug tracking-wide line-clamp-2">
                  {SLIDE_IMAGES[currentSlide].caption}
                </h3>

                <p className="text-[14px] sm:text-[15px] xl:text-[16px] text-white/90 mt-2 line-clamp-2 font-normal leading-relaxed">
                  {SLIDE_IMAGES[currentSlide].subcaption}
                </p>
              </div>

              {/* Minimal Interactive Chevrons & Pause */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-full bg-white/[0.12] hover:bg-white/[0.22] border border-white/20 flex items-center justify-center text-white transition-all active:scale-95 hover:scale-105 shadow-md"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-full bg-white/[0.12] hover:bg-white/[0.22] border border-white/20 flex items-center justify-center text-white transition-all active:scale-95 hover:scale-105 shadow-md"
                  aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
                >
                  {isPaused ? <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-full bg-white/[0.12] hover:bg-white/[0.22] border border-white/20 flex items-center justify-center text-white transition-all active:scale-95 hover:scale-105 shadow-md"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Secondary Authority Pill (Overlapping Bottom-Left on Desktop) */}
        <div className="hidden xl:flex absolute -bottom-4 -left-6 z-30 items-center gap-3 bg-[rgba(19,29,51,0.94)] backdrop-blur-2xl border border-white/20 px-5 py-3 rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
          <div className="p-2.5 rounded-xl bg-white/[0.1] border border-white/20 text-white shadow-sm">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[14px] sm:text-[15px] font-semibold text-white tracking-wide">
              Data Privacy & AI Law Pioneers
            </div>
            <div className="text-[12px] text-white/80 tracking-wider uppercase font-medium mt-0.5">
              ODPC Registered · Cross-Border Counsel
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

