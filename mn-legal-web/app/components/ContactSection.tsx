'use client';

import { useState } from 'react';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    matterType: 'Corporate & Commercial',
    summary: '',
    honeypot: '', // Hidden field to catch bots
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact Form',
          matter_type: formData.matterType,
        });
      }
      setFormData({
        fullName: '',
        email: '',
        matterType: 'Corporate & Commercial',
        summary: '',
        honeypot: '',
      });
    } catch (error: any) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <section id="contact" className="bg-[var(--mn-navy)] py-24 px-6 md:px-16 relative overflow-hidden">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,28,63,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,28,63,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 block">
              Direct Access
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-display italic text-white leading-tight border-none pb-0 mb-8">
              Initiate a Confidential <br /> Consultation
            </h2>
            <p className="text-[18px] text-white font-body leading-relaxed max-w-[500px] mb-12 font-medium">
              Our partners are available for urgent legal matters and strategic advisory. Reach out to discuss your specific requirements.
            </p>
            
            <div className="space-y-8">
              <div className="group">
                <span className="block text-[11px] uppercase text-white/60 tracking-[2px] mb-1 font-bold">General Inquiry</span>
                <a href="mailto:info@mnlegal.net" className="text-[24px] font-display text-white group-hover:text-[var(--mn-burgundy)] transition-colors border-none p-0">
                  info@mnlegal.net
                </a>
              </div>
              <div className="group">
                <span className="block text-[11px] uppercase text-white/60 tracking-[2px] mb-1 font-bold">Nairobi Office</span>
                <a href="tel:+254700325089" className="text-[24px] font-display text-white group-hover:text-[var(--mn-burgundy)] transition-colors border-none p-0">
                  +254 700 325 089
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/20 p-10 md:p-12 relative">
            {status === 'success' ? (
              <div className="absolute inset-0 bg-[#1a2744] z-50 flex flex-col items-center justify-center p-12 text-center">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#8b1c3f 1px, transparent 1px), linear-gradient(90deg, #8b1c3f 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="relative mb-10">
                  <div className="w-24 h-24 border border-[var(--mn-burgundy)] rounded-full flex items-center justify-center animate-[pulse_3s_infinite]">
                    <div className="w-16 h-16 bg-[var(--mn-burgundy)] text-white flex items-center justify-center">
                      <span className="text-3xl">✓</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-display italic text-3xl text-white mb-6 tracking-wide">Inquiry Transmitted</h3>
                
                <p className="text-white/60 text-[15px] leading-relaxed mb-12 max-w-[340px] font-medium uppercase tracking-wider">
                  Our partners have been notified. <br /> expect a response within <br /> 24 business hours.
                </p>

                <div className="h-[1px] w-24 bg-white/20 mb-12"></div>

                <button 
                  onClick={() => setStatus('idle')}
                  className="bg-transparent border border-white/30 text-white text-[11px] font-bold uppercase tracking-[3px] px-10 py-4 hover:bg-white hover:text-[var(--mn-navy)] transition-all duration-500"
                >
                  New Consultation
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Honeypot field - hidden from users, caught by bots */}
              <input 
                type="text" 
                name="honeypot" 
                value={formData.honeypot} 
                onChange={handleChange} 
                className="hidden" 
                autoComplete="off" 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Full Name</label>
                  <input 
                    required
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/40 py-3 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Email Address</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/40 py-3 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Legal Matter Type</label>
                <select 
                  name="matterType"
                  value={formData.matterType}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/40 py-3 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors appearance-none"
                >
                  <option value="Corporate & Commercial" className="bg-[var(--mn-navy)]">Corporate & Commercial</option>
                  <option value="Litigation" className="bg-[var(--mn-navy)]">Litigation</option>
                  <option value="Conveyancing" className="bg-[var(--mn-navy)]">Conveyancing</option>
                  <option value="Intellectual Property" className="bg-[var(--mn-navy)]">Intellectual Property</option>
                  <option value="Other" className="bg-[var(--mn-navy)]">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Brief Summary</label>
                <textarea 
                  required
                  rows={4} 
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/40 py-3 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors resize-none"
                ></textarea>
              </div>
              
              {status === 'error' && (
                <div className="p-4 bg-[var(--mn-burgundy)]/10 border-l-2 border-[var(--mn-burgundy)] text-[12px] text-white/80">
                  {errorMessage}
                </div>
              )}

              <button 
                disabled={status === 'loading'}
                className="w-full bg-[var(--mn-burgundy)] text-white text-[13px] font-bold uppercase tracking-[3px] py-5 hover:bg-[var(--mn-burgundy-dark)] transition-colors duration-500 border border-[var(--mn-burgundy)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Transmitting...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
