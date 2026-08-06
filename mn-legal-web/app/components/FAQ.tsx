'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Why is MN Legal considered a top legal tech firm in Kenya?",
    answer: "MN Legal combines deep legal expertise with advanced technical understanding. We specialize in navigating the complex intersection of law and technology, offering strategic counsel on Data Protection, AI Governance, and Fintech regulation for startups and enterprises in Nairobi."
  },
  {
    question: "What are the data privacy compliance requirements for Kenyan businesses?",
    answer: "Under the Data Protection Act 2019, Kenyan businesses must register as Data Controllers/Processors, appoint a Data Protection Officer (if applicable), conduct Data Protection Impact Assessments (DPIAs), and implement robust privacy policies. MN Legal provides comprehensive compliance audits and implementation support."
  },
  {
    question: "How can MN Legal help with AI governance and regulation?",
    answer: "We assist organizations in developing ethical AI frameworks, ensuring compliance with emerging global and local AI regulations, and managing intellectual property rights related to machine learning models and datasets."
  },
  {
    question: "Do you offer legal audits for tech startups in Nairobi?",
    answer: "Yes, we conduct specialized legal health checks for tech startups. This includes IP due diligence, contract review, data privacy audits, and regulatory compliance assessments to ensure your business is investor-ready."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="bg-[var(--mn-cream)] py-24 px-6 md:px-16" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[800px] mx-auto">
        <div className="mb-12 text-center">
          <span className="text-[var(--mn-burgundy)] font-bold tracking-[2px] uppercase text-[13px] mb-4 block">
            Common Questions
          </span>
          <h2 className="font-display text-[32px] md:text-[40px] text-[var(--mn-navy)] mb-6">
            Legal Tech Insights
          </h2>
          <div className="w-24 h-1 bg-[var(--mn-burgundy)] mx-auto"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border-l-4 border-transparent hover:border-[var(--mn-burgundy)] transition-all duration-300 shadow-sm"
              style={{ borderRadius: 0 }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left group cursor-pointer"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-display text-[18px] text-[var(--mn-navy)] group-hover:text-[var(--mn-burgundy)] transition-colors pr-8">
                  {faq.question}
                </span>
                <span className="text-[var(--mn-burgundy)] shrink-0">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-[15px] leading-relaxed text-gray-600 border-t border-gray-100 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
