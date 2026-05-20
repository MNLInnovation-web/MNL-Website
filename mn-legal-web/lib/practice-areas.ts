export interface PracticeArea {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  longDescription: string;
  keywords: string[];
  whatWeCover: string[];
  whoItsFor: string[];
  uniqueAngle: {
    title: string;
    content: string;
    link?: {
      label: string;
      href: string;
    };
  };
  leadAttorneySlug: string;
}

export const practiceAreas: PracticeArea[] = [
  {
    id: '01',
    slug: 'data-privacy',
    title: 'Data Privacy & Protection',
    seoTitle: 'Data Privacy & Data Protection Lawyers in Nairobi, Kenya',
    description: 'Specialized legal counsel for Data Protection Act 2019 compliance, DPIAs, and AI governance.',
    longDescription: 'In an increasingly digital economy, data is your most valuable yet vulnerable asset. We provide end-to-end data privacy and protection legal services, ensuring your business remains compliant with Kenya\'s Data Protection Act 2019 and international standards like GDPR. Our expertise extends to the frontier of technology, including AI governance and digital transformation.',
    keywords: [
      'data privacy lawyer Nairobi',
      'data protection lawyer Kenya',
      'Data Protection Act 2019 compliance Kenya',
      'data protection officer Kenya',
      'DPIA Kenya',
      'AI governance legal advisory Kenya',
      'Kenya AI Bill 2026 legal implications',
      'GDPR compliance Kenya'
    ],
    whatWeCover: [
      'Data Protection Act 2019 Compliance Audits',
      'Data Protection Impact Assessments (DPIA)',
      'Drafting Privacy Policies & Data Processing Agreements',
      'AI Governance & Regulatory Advisory',
      'Cross-border Data Transfer Legal Frameworks',
      'Data Breach Response & Management',
      'Registration with the Office of the Data Protection Commissioner (ODPC)'
    ],
    whoItsFor: [
      'Tech Startups & Scaling Platforms',
      'Financial Institutions & Fintechs',
      'E-commerce & Retail Enterprises',
      'Multinational Corporations operating in East Africa',
      'Government Agencies & NGOs'
    ],
    uniqueAngle: {
      title: 'The AI Governance Frontier',
      content: 'We are at the forefront of AI regulation in East Africa. Our team has deeply analyzed the emerging legal landscape, including the Kenya AI Bill 2026, to help businesses innovate responsibly.',
      link: {
        label: 'Read our Deep Dive into the Kenya AI Bill 2026',
        href: '/insights/the-silicon-savannahs-social-contract-a-critical-deep-dive-into-kenyas-artificial-intelligence-bill-2026'
      }
    },
    leadAttorneySlug: 'tyrus-muya-kamau'
  },
  {
    id: '02',
    slug: 'corporate-commercial',
    title: 'Corporate & Commercial Law',
    seoTitle: 'Corporate & Commercial Lawyers in Nairobi | Mergers, Acquisitions & Compliance',
    description: 'Comprehensive legal counsel for business formation, mergers, acquisitions, and regulatory compliance.',
    longDescription: 'We provide strategic legal solutions that power business growth. From the initial spark of incorporation to complex cross-border mergers and acquisitions, our corporate team ensures your commercial interests are protected and your operations are fully compliant with Kenyan and regional laws.',
    keywords: [
      'corporate lawyer Nairobi',
      'business formation lawyer Kenya',
      'mergers and acquisitions Kenya',
      'company incorporation Kenya',
      'regulatory compliance Kenya law firm',
      'East Africa commercial law firm',
      'startup legal advisory Nairobi',
      'investor-ready legal audit Kenya'
    ],
    whatWeCover: [
      'Company Incorporation & Business Setup',
      'Mergers, Acquisitions & Divestitures',
      'Corporate Governance & Secretarial Services',
      'Commercial Contract Drafting & Negotiation',
      'Joint Ventures & Private Equity Transactions',
      'Regulatory Compliance & Licensing',
      'Corporate Restructuring'
    ],
    whoItsFor: [
      'Local & International Investors',
      'SMEs & Growing Businesses',
      'Public & Private Companies',
      'Venture Capital & Private Equity Firms',
      'Entrepreneurs & Startups'
    ],
    uniqueAngle: {
      title: 'Investor-Ready Legal Health Checks',
      content: 'We specialize in "investor-ready" legal audits for startups. We identify and fix legal gaps in your IP, contracts, and compliance, making your business more attractive to venture capital and institutional investors.'
    },
    leadAttorneySlug: 'mbula-nzuki'
  },
  {
    id: '03',
    slug: 'litigation-dispute-resolution',
    title: 'Litigation & Dispute Resolution',
    seoTitle: 'Commercial Litigation & Dispute Resolution Advocates in Nairobi, Kenya',
    description: 'Strategic representation in commercial litigation, arbitration, and mediation across all superior courts.',
    longDescription: 'When disputes arise, you need a legal partner who prioritizes your commercial objectives. We provide robust representation in high-stakes litigation while exploring efficient Alternative Dispute Resolution (ADR) mechanisms like arbitration and mediation to achieve the best possible outcomes.',
    keywords: [
      'commercial litigation lawyer Nairobi',
      'dispute resolution Kenya',
      'arbitration lawyer Kenya',
      'commercial arbitration Nairobi',
      'debt recovery lawyer Kenya',
      'mediation services Nairobi',
      'international arbitration East Africa'
    ],
    whatWeCover: [
      'Commercial & Civil Litigation',
      'Domestic & International Arbitration',
      'Mediation & Negotiation',
      'Debt Recovery & Insolvency Proceedings',
      'Employment Disputes',
      'Shareholder & Partnership Disputes',
      'Judicial Review & Constitutional Litigation'
    ],
    whoItsFor: [
      'Corporations facing Commercial Disputes',
      'Financial Institutions',
      'Property Developers & Landowners',
      'Employers & Employees',
      'Individual Clients with Complex Legal Claims'
    ],
    uniqueAngle: {
      title: 'Global Expertise in Arbitration',
      content: 'Our dispute resolution practice is bolstered by international expertise. Our Of Counsel in London, Konstantina Zariou, specializes in International Arbitration, providing our clients with a sophisticated edge in global commercial disputes.'
    },
    leadAttorneySlug: 'mutundu-chege'
  },
  {
    id: '04',
    slug: 'conveyancing-property',
    title: 'Conveyancing & Property Law',
    seoTitle: 'Conveyancing & Property Lawyers in Nairobi | Real Estate Law Kenya',
    description: 'Expert handling of real estate transactions, property development, and land use planning.',
    longDescription: 'Real estate transactions in Kenya require meticulous attention to detail and a deep understanding of local land laws. We facilitate seamless property transfers, development projects, and leasing arrangements, ensuring your investments are secure and your projects stay on schedule.',
    keywords: [
      'conveyancing lawyer Nairobi',
      'property lawyer Kenya',
      'real estate lawyer Nairobi',
      'land transfer lawyer Kenya',
      'property development legal advisory Kenya',
      'lease agreement lawyer Nairobi',
      'land use planning Kenya'
    ],
    whatWeCover: [
      'Sale & Purchase of Residential & Commercial Property',
      'Real Estate Development Projects',
      'Commercial & Residential Leases',
      'Sectional Properties & Long-term Leases',
      'Land Due Diligence & Search Services',
      'Land Use Planning & Change of User',
      'Mortgages & Charges'
    ],
    whoItsFor: [
      'Property Buyers & Sellers',
      'Real Estate Developers',
      'Commercial Landlords & Tenants',
      'Institutional Investors',
      'Lending Institutions'
    ],
    uniqueAngle: {
      title: 'Speed & Reliability in Real Estate',
      content: 'In the fast-moving real estate market, delays can cost deals. We pride ourselves on our responsiveness and proactive approach, ensuring that your conveyancing matters are processed efficiently without compromising on legal due diligence.'
    },
    leadAttorneySlug: 'husna-mohammed'
  },
  {
    id: '05',
    slug: 'intellectual-property',
    title: 'Intellectual Property',
    seoTitle: 'Intellectual Property Lawyers in Kenya | Trademarks, Patents & Copyright',
    description: 'Protection and enforcement of trademarks, patents, and copyrights for innovative businesses.',
    longDescription: 'Your ideas are your competitive advantage. We help you identify, protect, and monetize your intellectual property assets in Kenya and across Africa. From trademark registration to defending your IP in court, we ensure your innovations remain yours.',
    keywords: [
      'intellectual property lawyer Kenya',
      'trademark registration Kenya',
      'patent attorney Nairobi',
      'copyright lawyer Kenya',
      'trade secret protection Kenya',
      'IP protection for startups Kenya',
      'AI intellectual property Kenya'
    ],
    whatWeCover: [
      'Trademark Registration & Brand Protection',
      'Patent Filing & Advisory',
      'Copyright Protection & Licensing',
      'IP Due Diligence & Audits',
      'Trade Secret Management',
      'IP Litigation & Enforcement',
      'Technology Transfer Agreements'
    ],
    whoItsFor: [
      'Innovators & Inventors',
      'Creative Agencies & Artists',
      'Software Developers & Tech Firms',
      'Consumer Goods Brands',
      'Startups with Proprietary Technology'
    ],
    uniqueAngle: {
      title: 'Leading the Way in AI & IP',
      content: 'The intersection of AI and Intellectual Property is the new frontier. We are one of the few firms in East Africa equipped to handle the unique IP challenges posed by AI-generated content and software-based innovations.'
    },
    leadAttorneySlug: 'zachary-ongeri'
  },
  {
    id: '06',
    slug: 'banking-finance-fintech',
    title: 'Banking, Finance & Fintech Law',
    seoTitle: 'Banking, Finance & Fintech Lawyers in Nairobi | CBK Compliance & Regulation',
    description: 'Legal support for fintech regulation, project finance, and capital markets transactions.',
    longDescription: 'The financial landscape is being redefined by technology. We provide expert legal guidance on traditional banking, complex project finance, and the rapidly evolving fintech sector, including CBK compliance and emerging VASP regulations.',
    keywords: [
      'fintech lawyer Kenya',
      'fintech regulation Kenya',
      'banking law firm Nairobi',
      'CBK compliance Kenya',
      'VASP Act Kenya legal advisory',
      'capital markets lawyer Kenya',
      'crypto regulation lawyer Kenya',
      'fintech startup legal Kenya',
      'mobile money regulation Kenya'
    ],
    whatWeCover: [
      'Fintech Licensing & Regulatory Sandbox Entry',
      'CBK Compliance for Digital Credit Providers',
      'Virtual Asset Service Provider (VASP) Advisory',
      'Secured Lending & Structured Finance',
      'Capital Markets & Securities Regulation',
      'Project Finance & Infrastructure Funding',
      'Mobile Money & Payment Systems Regulation'
    ],
    whoItsFor: [
      'Fintech Startups & Scaleups',
      'Commercial Banks & Microfinance Institutions',
      'Asset Managers & Investment Firms',
      'Digital Asset Platforms & VASP Operators',
      'Development Finance Institutions (DFIs)'
    ],
    uniqueAngle: {
      title: 'Specialized VASP & Fintech Expertise',
      content: 'We are active contributors to the discourse on fintech regulation in Kenya. Our analysis of the VASP Act 2025 demonstrates our deep commitment to helping digital asset firms navigate the complex regulatory environment.',
      link: {
        label: 'Read our Guide on Kenya\'s VASP Act 2025',
        href: '/insights/kenyas-vasp-act-2025-what-it-means-for-foreign-investors-and-operators'
      }
    },
    leadAttorneySlug: 'mbula-nzuki'
  },
  {
    id: '07',
    slug: 'employment-labour',
    title: 'Employment & Labour Law',
    seoTitle: 'Employment & Labour Law Advocates in Nairobi, Kenya',
    description: 'Advisory on employment contracts, workplace policies, and dispute resolution.',
    longDescription: 'Managing a workforce requires a balance of legal compliance and strategic HR management. We advise on all aspects of the employment lifecycle, ensuring your business adheres to Kenya\'s Employment Act while fostering a productive and legally secure workplace.',
    keywords: [
      'employment lawyer Nairobi',
      'labour law Kenya',
      'HR legal compliance Kenya',
      'workplace dispute resolution Nairobi',
      'employment contracts Kenya',
      'redundancy legal advisory Kenya'
    ],
    whatWeCover: [
      'Drafting Employment Contracts & HR Policies',
      'Advisory on Redundancy & Restructuring',
      'Employee Share Ownership Plans (ESOPs)',
      'Workplace Investigations & Disciplinary Procedures',
      'Employment Litigation & ADR',
      'Occupational Health & Safety Compliance',
      'Immigration & Work Permits'
    ],
    whoItsFor: [
      'Corporate Employers',
      'Human Resource Departments',
      'Multinational Firms with Local Staff',
      'Senior Executives',
      'Startups Building Teams'
    ],
    uniqueAngle: {
      title: 'Modern Workforce Legalities',
      content: 'The workplace is changing. We provide specialized advice on remote work frameworks, gig economy contracts, and the impact of automation on the modern Kenyan workforce.'
    },
    leadAttorneySlug: 'keziah-mwangi'
  }
];

export function getPracticeAreaBySlug(slug: string) {
  return practiceAreas.find(area => area.slug === slug);
}
