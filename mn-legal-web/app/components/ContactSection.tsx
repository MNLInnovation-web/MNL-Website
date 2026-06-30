'use client';

import { useState } from 'react';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

import { ArrowRight, ArrowLeft, Shield } from 'lucide-react';

interface ContactSectionProps {
  defaultMatterType?: string;
  ctaPrompt?: string;
}

export default function ContactSection({ defaultMatterType, ctaPrompt }: ContactSectionProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    jobTitle: '',
    phone: '',
    matterType: defaultMatterType || 'Fintech & Regulation',
    summary: '',
    contactPreference: 'email',
    honeypot: '', // Hidden field to catch bots
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePracticeSelect = (label: string) => {
    setFormData((prev) => ({ ...prev, matterType: label }));
    // Auto-advance to Step 3 for rapid mobile flow
    setTimeout(() => setCurrentStep(3), 250);
  };

  const isStep1Valid = () => {
    return (
      formData.fullName.trim().length >= 2 &&
      formData.email.includes('@') &&
      formData.companyName.trim().length >= 2 &&
      formData.jobTitle.trim().length >= 2
    );
  };

  const isStep3Valid = () => {
    return formData.summary.trim().length >= 10;
  };

  const isGenericEmail = formData.email.length > 3 && (
    formData.email.endsWith('@gmail.com') ||
    formData.email.endsWith('@yahoo.com') ||
    formData.email.endsWith('@outlook.com') ||
    formData.email.endsWith('@hotmail.com') ||
    formData.email.endsWith('@icloud.com')
  );

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

      // Fire GA4 generate_lead event on successful form submission
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: formData.matterType,
          lead_source: 'contact_form',
          matter_type: formData.matterType,
          company_name: formData.companyName,
          job_title: formData.jobTitle,
          contact_preference: formData.contactPreference,
          value: 1.0,
          currency: 'KES'
        });
      }

      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        companyName: '',
        jobTitle: '',
        phone: '',
        matterType: defaultMatterType || 'Fintech & Regulation',
        summary: '',
        contactPreference: 'email',
        honeypot: '',
      });
      setCurrentStep(1);
    } catch (error: any) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  const practiceAreas = [
    { label: "Fintech & Regulation", icon: "🪙" },
    { label: "Data Privacy & Protection", icon: "🛡️" },
    { label: "Capital Markets & VC", icon: "📈" },
    { label: "Corporate Advisory & M&A", icon: "🤝" },
    { label: "Corporate & Commercial", icon: "💼" },
    { label: "Litigation", icon: "⚖️" },
    { label: "Intellectual Property", icon: "💡" },
    { label: "Conveyancing", icon: "🔑" },
    { label: "Other", icon: "🌐" }
  ];

  const connectionPreferences = [
    { value: 'email', label: 'Email Advisory' },
    { value: 'teams', label: 'Teams Video' },
    { value: 'whatsapp', label: 'WhatsApp Secure' },
    { value: 'inperson-nairobi', label: 'Nairobi Office' },
    { value: 'inperson-london', label: 'London Office' },
  ];

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
              {ctaPrompt || "Our partners are available for urgent legal matters and strategic advisory. Reach out to discuss your specific requirements."}
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
              <div className="group">
                <span className="block text-[11px] uppercase text-white/60 tracking-[2px] mb-1 font-bold">Secure WhatsApp</span>
                <a 
                  href="https://wa.me/254700325089?text=Hello%20MNL%20Advocates%2C%20I%20would%20like%20to%20schedule%20a%20corporate%20legal%20consultation%20regarding%20our%20business%20in%20Kenya." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[24px] font-display text-white group-hover:text-[var(--mn-burgundy)] transition-colors border-none p-0 flex items-center gap-2"
                >
                  💬 +254 700 325 089
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/20 p-8 md:p-12 relative flex flex-col justify-between">
            {status === 'success' ? (
              <div className="absolute inset-0 bg-[#1a2744] z-50 flex flex-col items-center justify-center p-12 text-center">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#8b1c3f 1px, transparent 1px), linear-gradient(90deg, #8b1c3f 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="relative mb-10">
                  <div className="w-24 h-24 border border-[var(--mn-burgundy)] rounded-none flex items-center justify-center animate-[pulse_3s_infinite]">
                    <div className="w-16 h-16 bg-[var(--mn-burgundy)] text-white flex items-center justify-center rounded-none">
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
                  className="bg-transparent border border-white/30 text-white text-[11px] font-bold uppercase tracking-[3px] px-10 py-4 hover:bg-white hover:text-[var(--mn-navy)] transition-all duration-500 rounded-none"
                >
                  New Consultation
                </button>
              </div>
            ) : null}

            {/* Step Header */}
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <span className="text-[10px] uppercase tracking-[3px] text-white/50 font-bold">
                Step {currentStep} of 3 — {currentStep === 1 ? 'Vitals' : currentStep === 2 ? 'Specialism' : 'Brief & Channel'}
              </span>
              <div className="flex gap-2">
                <div className={`h-[2px] w-6 transition-colors duration-300 ${currentStep >= 1 ? 'bg-[var(--mn-burgundy)]' : 'bg-white/10'}`}></div>
                <div className={`h-[2px] w-6 transition-colors duration-300 ${currentStep >= 2 ? 'bg-[var(--mn-burgundy)]' : 'bg-white/10'}`}></div>
                <div className={`h-[2px] w-6 transition-colors duration-300 ${currentStep >= 3 ? 'bg-[var(--mn-burgundy)]' : 'bg-white/10'}`}></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
              {/* Honeypot field */}
              <input 
                type="text" 
                name="honeypot" 
                value={formData.honeypot} 
                onChange={handleChange} 
                className="hidden" 
                autoComplete="off" 
              />

              {/* STEP 1: CORPORATE VITALS */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Full Name</label>
                      <input 
                        required
                        type="text" 
                        name="fullName"
                        placeholder="e.g. Mbula Nzuki"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors placeholder:text-white/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Email Address</label>
                      <input 
                        required
                        type="email" 
                        name="email"
                        placeholder="e.g. founder@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors placeholder:text-white/20" 
                      />
                      {isGenericEmail && (
                        <p className="text-[10px] text-white/50 italic mt-1 font-medium">
                          Please use a corporate email for expedited priority routing, if available.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Company Name</label>
                      <input 
                        required
                        type="text" 
                        name="companyName"
                        placeholder="e.g. FinTech Africa Ltd"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors placeholder:text-white/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Job Title</label>
                      <input 
                        required
                        type="text" 
                        name="jobTitle"
                        placeholder="e.g. Chief Executive Officer"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors placeholder:text-white/20" 
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={!isStep1Valid()}
                      onClick={() => setCurrentStep(2)}
                      className="bg-[var(--mn-burgundy)] hover:bg-[var(--mn-burgundy-dark)] text-white text-[11px] font-bold uppercase tracking-[2px] px-8 py-4 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 rounded-none"
                    >
                      Next: Alignment <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PRACTICE ALIGNMENT */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <span className="block text-[11px] uppercase tracking-[2px] text-white/80 font-bold mb-2">Select Your Specialized Sector / Practice Group</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                    {practiceAreas.map((area) => (
                      <button
                        key={area.label}
                        type="button"
                        onClick={() => handlePracticeSelect(area.label)}
                        className={`text-left p-4 border transition-all duration-300 flex items-center gap-3 cursor-pointer rounded-none ${
                          formData.matterType === area.label 
                            ? 'border-[var(--mn-burgundy)] bg-[var(--mn-burgundy)]/10 text-white' 
                            : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                        }`}
                      >
                        <span className="text-lg">{area.icon}</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider">{area.label}</span>
                        {formData.matterType === area.label && (
                          <span className="ml-auto text-[10px] bg-[var(--mn-burgundy)] px-2 py-0.5 font-bold">SELECTED</span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-between border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="border border-white/20 hover:border-white/40 text-white/80 text-[11px] font-bold uppercase tracking-[2px] px-6 py-4 transition-all rounded-none flex items-center gap-2"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="bg-[var(--mn-burgundy)] hover:bg-[var(--mn-burgundy-dark)] text-white text-[11px] font-bold uppercase tracking-[2px] px-8 py-4 transition-all rounded-none flex items-center gap-2"
                    >
                      Next: Consultation Brief <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONSULTATION BRIEF & CHANNELS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Contact Number (Optional)</label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="e.g. +254 700 325 089"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors placeholder:text-white/20 text-sm" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Communication Channel</label>
                      <select 
                        name="contactPreference"
                        value={formData.contactPreference}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors appearance-none text-sm cursor-pointer"
                      >
                        {connectionPreferences.map((pref) => (
                          <option key={pref.value} value={pref.value} className="bg-[var(--mn-navy)]">
                            {pref.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[2px] text-white/80 font-bold">Inquiry Summary (Minimum 10 Characters)</label>
                    <textarea 
                      required
                      rows={3} 
                      name="summary"
                      placeholder="Briefly describe your commercial context or legal regulatory challenges in East Africa..."
                      value={formData.summary}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[var(--mn-burgundy)] transition-colors resize-none placeholder:text-white/20 text-sm leading-relaxed"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-[var(--mn-burgundy)]/10 border-l-2 border-[var(--mn-burgundy)] text-[12px] text-white/80">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-4 flex justify-between border-t border-white/10 gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="border border-white/20 hover:border-white/40 text-white/80 text-[11px] font-bold uppercase tracking-[2px] px-6 py-4 transition-all rounded-none flex items-center gap-2"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>

                    <button 
                      disabled={status === 'loading' || !isStep3Valid()}
                      className="bg-[var(--mn-burgundy)] text-white text-[11px] font-bold uppercase tracking-[2px] px-8 py-4 hover:bg-[var(--mn-burgundy-dark)] transition-colors duration-500 border border-[var(--mn-burgundy)] disabled:opacity-40 disabled:cursor-not-allowed flex-1 text-center rounded-none flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? 'Transmitting...' : 'Submit Inquiry'} <Shield size={14} />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
