'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BlogHeroProps {
  title: string;
  subtitle: string;
}

export default function BlogHero({ title, subtitle }: BlogHeroProps) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/insights/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section id="hero" className="min-h-[72vh] bg-[linear-gradient(135deg,#1a2744_0%,#2d3e5f_50%,#1a2744_100%)] flex flex-col justify-center padding-[140px_60px_100px] md:px-[60px] px-[24px] relative overflow-hidden pt-[140px] pb-[100px]">
      {/* ── DECORATIVE ── */}
      <div className="absolute inset-0 opacity-1 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(139,28,63,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,28,63,.04) 1px,transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,black 25%,transparent 100%)' }}></div>
      <div className="absolute w-[280px] h-[280px] top-[-60px] right-[-40px] border-2 border-[rgba(139,28,63,.28)] rounded-full pointer-events-none animate-[spin_40s_linear_infinite]"></div>
      <div className="absolute w-[200px] h-[200px] bottom-[-40px] left-[-30px] border-[1.5px] border-[rgba(139,28,63,.18)] rounded-full pointer-events-none animate-[spin_50s_linear_infinite_reverse]"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── LEFT: Text Content ── */}
        <div className="max-w-[820px]">
          {/* Breadcrumb */}
          <div className="text-[11px] color-[rgba(255,255,255,.4)] tracking-[.5px] mb-[20px] animate-[fup_.7s_var(--ease-expo)_.1s_both]">
             <Link href="/" className="text-white/40 hover:text-white/80 transition-colors">Home</Link>
             <span className="mx-2">/</span>
             <span className="text-white/40">Legal Insights</span>
          </div>

          {/* Tag */}
          <div className="inline-flex items-center gap-[10px] text-[11px] font-medium tracking-[3px] uppercase text-[rgba(255,255,255,.6)] mb-[28px] animate-[fup_.8s_var(--ease-expo)_.15s_both]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--mn-burgundy)] animate-[pd_2s_ease-in-out_infinite]"></span>
            Legal Insights &amp; Commentary
          </div>

          {/* Divider */}
          <div className="w-[56px] h-[3px] bg-[var(--mn-burgundy)] mb-[32px] origin-left animate-[sxi_.9s_var(--ease-expo)_.35s_both]"></div>

          <h1 className="font-display text-[clamp(32px,5.5vw,58px)] font-medium italic leading-[1.1] text-white mb-[28px]">
            <span className="block overflow-hidden">
              <span className="block animate-[su_1.1s_var(--ease-expo)_.4s_both]" dangerouslySetInnerHTML={{ __html: title.split('<br>')[0] }}></span>
            </span>
            {title.includes('<br>') && (
              <span className="block overflow-hidden">
                <span className="block animate-[su_1.1s_var(--ease-expo)_.52s_both]" dangerouslySetInnerHTML={{ __html: title.split('<br>')[1] }}></span>
              </span>
            )}
          </h1>

          <p className="text-[17px] font-light leading-[1.75] text-[rgba(255,255,255,.65)] max-w-[500px] mb-[40px] animate-[fup_.9s_var(--ease-expo)_.85s_both]">
            {subtitle}
          </p>

          <form onSubmit={handleSearch} className="flex max-w-[480px] animate-[fup_.9s_var(--ease-expo)_1.05s_both]">
            <input 
              type="search" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles - Companies Act, Property, Litigation…" 
              className="flex-1 bg-[rgba(255,255,255,.08)] border border-[rgba(255,255,255,.18)] border-r-0 p-[13px_20px] font-body text-[14px] text-white outline-none transition-all focus:bg-[rgba(255,255,255,.13)] focus:border-[rgba(139,28,63,.6)] placeholder:text-white/35"
            />
            <button type="submit" className="bg-[var(--mn-burgundy)] border border-[var(--mn-burgundy)] p-[13px_20px] text-white text-[15px] hover:bg-[var(--mn-burgundy-dark)] transition-colors">
              ⌕
            </button>
          </form>
        </div>

        {/* ── RIGHT: Animated Legal Visualization ── */}
        <div className="hidden lg:flex items-center justify-center relative animate-[fup_1s_var(--ease-expo)_.6s_both] min-h-[420px]">

          {/* Outer slow-spinning ring */}
          <div className="absolute w-[380px] h-[380px] rounded-full border border-[rgba(139,28,63,.18)] animate-[spin_60s_linear_infinite]"
            style={{borderStyle:'dashed'}}></div>
          {/* Mid ring */}
          <div className="absolute w-[290px] h-[290px] rounded-full border border-[rgba(255,255,255,.07)] animate-[spin_40s_linear_infinite_reverse]"></div>
          {/* Inner pulse ring */}
          <div className="absolute w-[200px] h-[200px] rounded-full border-2 border-[rgba(139,28,63,.3)] animate-[pulse-ring_3s_ease-in-out_infinite]"></div>

          {/* Centre — Scales of Justice SVG */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="animate-[float_4s_ease-in-out_infinite] drop-shadow-[0_0_18px_rgba(139,28,63,0.5)]">
              {/* Beam */}
              <line x1="10" y1="30" x2="80" y2="30" stroke="#8b1c3f" strokeWidth="2.5" strokeLinecap="round"/>
              {/* Centre pole */}
              <line x1="45" y1="10" x2="45" y2="78" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
              {/* Top cap */}
              <circle cx="45" cy="10" r="4" fill="#8b1c3f"/>
              {/* Left pan chain */}
              <line x1="18" y1="30" x2="14" y2="50" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
              <line x1="18" y1="30" x2="22" y2="50" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
              {/* Left pan */}
              <path d="M10 50 Q18 56 26 50" stroke="#8b1c3f" strokeWidth="2" fill="none" strokeLinecap="round"/>
              {/* Right pan chain */}
              <line x1="72" y1="30" x2="68" y2="54" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
              <line x1="72" y1="30" x2="76" y2="54" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
              {/* Right pan (slightly lower = justice tipping) */}
              <path d="M64 54 Q72 60 80 54" stroke="#8b1c3f" strokeWidth="2" fill="none" strokeLinecap="round"/>
              {/* Base */}
              <line x1="34" y1="78" x2="56" y2="78" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-[9px] uppercase tracking-[3px] font-bold text-[rgba(255,255,255,0.35)]">Lex · Iustitia · Veritas</span>
          </div>

          {/* Orbiting dot 1 — burgundy */}
          <div className="absolute w-[380px] h-[380px] animate-[spin_12s_linear_infinite]" style={{borderRadius:'50%'}}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#8b1c3f] shadow-[0_0_12px_#8b1c3f]"></div>
          </div>
          {/* Orbiting dot 2 — white slow */}
          <div className="absolute w-[290px] h-[290px] animate-[spin_20s_linear_infinite_reverse]" style={{borderRadius:'50%'}}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
          </div>

          {/* Floating document card 1 */}
          <div className="absolute top-[18px] right-[-20px] w-[150px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] backdrop-blur-sm p-3 rounded-none animate-[float_5s_ease-in-out_infinite]"
            style={{animationDelay:'0.5s'}}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-[rgba(139,28,63,0.3)] border border-[rgba(139,28,63,0.5)] flex items-center justify-center">
                <span className="text-[8px] font-bold text-[#8b1c3f]">§</span>
              </div>
              <span className="text-[8px] uppercase tracking-[2px] text-white/50 font-bold">Legal Brief</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-[4px] bg-white/15 rounded-full w-full animate-[shimmer_2.5s_ease-in-out_infinite]"></div>
              <div className="h-[4px] bg-white/10 rounded-full w-4/5 animate-[shimmer_2.5s_ease-in-out_infinite_.3s]"></div>
              <div className="h-[4px] bg-white/10 rounded-full w-3/5 animate-[shimmer_2.5s_ease-in-out_infinite_.6s]"></div>
            </div>
          </div>

          {/* Floating document card 2 */}
          <div className="absolute bottom-[30px] left-[-10px] w-[140px] bg-[rgba(139,28,63,0.08)] border border-[rgba(139,28,63,0.25)] backdrop-blur-sm p-3 rounded-none animate-[float_6s_ease-in-out_infinite]"
            style={{animationDelay:'1.2s'}}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-[rgba(255,255,255,0.07)] border border-white/15 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white/40">⚖</span>
              </div>
              <span className="text-[8px] uppercase tracking-[2px] text-white/40 font-bold">Ruling</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-[4px] bg-[rgba(139,28,63,0.4)] rounded-full w-full animate-[shimmer_3s_ease-in-out_infinite_.4s]"></div>
              <div className="h-[4px] bg-white/10 rounded-full w-3/4 animate-[shimmer_3s_ease-in-out_infinite_.7s]"></div>
              <div className="h-[4px] bg-white/10 rounded-full w-1/2 animate-[shimmer_3s_ease-in-out_infinite_1s]"></div>
            </div>
          </div>

          {/* Floating stat pill */}
          <div className="absolute top-[110px] right-[-30px] bg-[rgba(139,28,63,0.15)] border border-[rgba(139,28,63,0.4)] px-4 py-2 animate-[float_7s_ease-in-out_infinite]"
            style={{animationDelay:'2s'}}>
            <span className="text-[18px] font-display font-bold text-white">12+</span>
            <span className="text-[8px] uppercase tracking-[2px] text-white/40 font-bold block">Practice Areas</span>
          </div>

        </div>

      </div>

      <style jsx>{`
        @keyframes pd { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }
        @keyframes sxi { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes su { from{transform:translateY(110%)} to{transform:translateY(0)} }
        @keyframes fup { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0%,100% { transform: scale(1); opacity: 0.4; }
          50%      { transform: scale(1.08); opacity: 0.9; }
        }
        @keyframes shimmer {
          0%,100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
