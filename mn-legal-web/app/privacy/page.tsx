import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: "Privacy Policy",
  description: "MN Legal's Privacy Policy and data protection standards in compliance with Kenya's Data Protection Act.",
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-[var(--mn-cream)] min-h-screen">
      <Navbar />
      
      <section className="pt-40 pb-32 px-6 md:px-16">
        <div className="max-w-[800px] mx-auto">
          <span className="text-[var(--mn-burgundy)] text-[11px] font-semibold uppercase tracking-[0.3em] mb-6 block">
            Legal Transparency
          </span>
          <h1 className="text-[clamp(40px,6vw,64px)] font-display italic text-[var(--heading-primary)] leading-[1.1] mb-12">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none text-[var(--text-primary)] font-body space-y-12">
            <div>
              <h2 className="text-[22px] font-display text-[var(--heading-primary)] border-b-2 border-[var(--mn-burgundy)] pb-3 mb-6">
                1. Data Protection Commitment
              </h2>
              <p className="text-[15px] leading-relaxed font-medium">
                At MN Advocates LLP (trading as "MN Legal"), we are committed to safeguarding the privacy and confidentiality of our clients and website visitors. This policy outlines how we collect, use, and protect your personal data in accordance with Kenya's Data Protection Act, 2019.
              </p>
            </div>

            <div>
              <h2 className="text-[22px] font-display text-[var(--heading-primary)] border-b-2 border-[var(--mn-burgundy)] pb-3 mb-6">
                2. Information Collection via Contact Form
              </h2>
              <p className="text-[15px] leading-relaxed font-medium mb-4">
                When you initiate a consultation via our "Confidential Consultation" form, we collect the following personal information:
              </p>
              <ul className="list-disc pl-5 text-[15px] space-y-2 font-medium">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Nature of Legal Matter</li>
                <li>Summary of your Inquiry</li>
              </ul>
              <p className="text-[15px] leading-relaxed font-medium mt-4">
                This data is transmitted securely to our partners via the Resend API and is used solely for the purpose of evaluating your legal needs and contacting you regarding your inquiry.
              </p>
            </div>

            <div>
              <h2 className="text-[22px] font-display text-[var(--heading-primary)] border-b-2 border-[var(--mn-burgundy)] pb-3 mb-6">
                3. Chatwoot Live Support Integration
              </h2>
              <p className="text-[15px] leading-relaxed font-medium">
                Our website uses Chatwoot, an open-source customer engagement platform, to provide real-time support. When you interact with our chatbot:
              </p>
              <ul className="list-disc pl-5 text-[15px] space-y-2 font-medium mt-4">
                <li>Chat history is stored to provide context for follow-up support.</li>
                <li>Browser-level information and IP addresses may be processed to enhance security and technical performance.</li>
                <li>Your chat data is managed with strict access controls and is never shared with third parties for marketing purposes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[22px] font-display text-[var(--heading-primary)] border-b-2 border-[var(--mn-burgundy)] pb-3 mb-6">
                4. Data Retention and Security
              </h2>
              <p className="text-[15px] leading-relaxed font-medium">
                All data collected is subject to the attorney-client privilege once a professional relationship is established. We implement industry-standard security measures, including SSL encryption and secure API integrations, to prevent unauthorized access.
              </p>
            </div>

            <div>
              <h2 className="text-[22px] font-display text-[var(--heading-primary)] border-b-2 border-[var(--mn-burgundy)] pb-3 mb-6">
                5. Your Legal Rights
              </h2>
              <p className="text-[15px] leading-relaxed font-medium">
                Under Kenyan law, you have the right to access, correct, or request the deletion of your personal data. To exercise these rights or for any privacy-related inquiries, please contact our Data Protection Officer at <a href="mailto:privacy@mnlegal.net" className="text-[var(--mn-burgundy)] underline">privacy@mnlegal.net</a>.
              </p>
            </div>

            <div className="pt-12 border-t border-black/5">
              <p className="text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">
                Last Updated: March 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
