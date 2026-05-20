export interface Publication {
  title: string;
  href: string;
  date: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  practice: string;
  image: string;
  email: string;
  phone: string;
  credentials: string[];
  bio: string;
  linkedIn?: string;
  publications?: Publication[];
}

export const teamMembers: TeamMember[] = [
  {
    slug: 'mbula-nzuki',
    name: 'Mbula Nzuki',
    title: 'Founder & Managing Partner',
    practice: 'Corporate Commercial Law and International Business Strategy',
    image: 'https://wp.mnlegal.net/wp-content/uploads/2024/01/Mbula-Nzuki-team.jpg',
    email: 'm.nzuki@mnlegal.net',
    phone: '+254 700 325 089',
    credentials: [
      'LL.M in International Trade & Investment Law',
      'Advocate of the High Court of Kenya',
      'Member of the Law Society of Kenya'
    ],
    bio: 'Mbula Nzuki is the Founder and Managing Partner of MNL Advocates LLP. With over a decade of experience advising global fintech platforms, venture capital funds, and multinational corporations, she specializes in cross-border capital structure, regulatory compliance, and market-entry strategy across East Africa.',
    linkedIn: 'https://www.linkedin.com/in/mbulanzuki/',
    publications: [
      {
        title: "The Silicon Savannah's Social Contract: A Critical Deep Dive into Kenya's Artificial Intelligence Bill 2026",
        href: '/insights/the-silicon-savannahs-social-contract-a-critical-deep-dive-into-kenyas-artificial-intelligence-bill-2026',
        date: 'March 2026'
      },
      {
        title: "Navigating CBK Compliance for Digital Credit Providers in Kenya",
        href: '/insights/kenyas-digital-credit-compliance-landscape',
        date: 'November 2025'
      }
    ]
  },
  {
    slug: 'sebie-salim',
    name: 'Sebie Salim',
    title: 'Chief Operations, Strategy & Growth',
    practice: 'Operational Excellence & Client Experience',
    image: 'https://wp.mnlegal.net/wp-content/uploads/2024/01/Sebie-Salim.jpg',
    email: 's.salim@mnlegal.net',
    phone: '+254 700 325 089',
    credentials: [
      'MSc in Business Administration',
      'Certified Legal Operations Professional',
      'BSc in Information Technology'
    ],
    bio: 'Sebie Salim directs operations, strategy, and business growth at MNL Advocates LLP. He focuses on scaling client service delivery systems, optimizing technology integration, and ensuring absolute excellence in commercial advisory pipelines.',
    linkedIn: 'https://www.linkedin.com/in/sebie/',
  },
  {
    slug: 'mutundu-chege',
    name: 'Mutundu Chege',
    title: 'Litigation Department, Co-Head',
    practice: 'Dispute Resolution & Appellate Litigation',
    image: 'https://wp.mnlegal.net/wp-content/uploads/2024/01/Mutundu-Chege.jpg',
    email: 'm.chege@mnlegal.net',
    phone: '+254 700 325 089',
    credentials: [
      'LL.B (Hons), University of Nairobi',
      'Advocate of the High Court of Kenya',
      'Member of the Chartered Institute of Arbitrators (CIArb)'
    ],
    bio: 'Mutundu co-heads the Litigation and Dispute Resolution practice group. He has represented commercial banks, manufacturing conglomerates, and telecom companies in landmark cases before the High Court and Court of Appeal of Kenya.',
    publications: [
      {
        title: 'Commercial Debt Recovery and Asset Tracing under the Civil Procedure Rules in Kenya',
        href: '#',
        date: 'September 2025'
      }
    ]
  },
  {
    slug: 'konstantina-zariou',
    name: 'Konstantina Zariou',
    title: 'Of Counsel - London 🇬🇧',
    practice: 'Maritime and Commercial Law + International Arbitration',
    image: 'https://wp.mnlegal.net/wp-content/uploads/2026/01/IMG_8790.jpeg',
    email: 'k.zariou@mnlegal.net',
    phone: '+44 20 7946 0192',
    credentials: [
      'Solicitor of the Senior Courts of England & Wales',
      'LL.M in Maritime Law (Southampton)',
      'Associate Member of the Chartered Institute of Arbitrators (ACIArb)'
    ],
    bio: 'Konstantina represents international shipping lines, multi-commodity traders, and sovereign entities in high-stakes arbitration and commercial litigation. Based in London, she serves as a strategic bridge for European capital and international corporate disputes.',
    linkedIn: 'https://www.linkedin.com/in/konstantina-zariou-aciarb/',
    publications: [
      {
        title: 'Enforcing London Arbitration Awards in East African Jurisdictions',
        href: '#',
        date: 'June 2025'
      }
    ]
  },
  {
    slug: 'husna-mohammed',
    name: 'Husna (A.) Mohammed',
    title: 'Senior Associate',
    practice: 'Corporate Commercial + Real Estate Law',
    image: 'https://wp.mnlegal.net/wp-content/uploads/2026/03/1771405050567.jpg',
    email: 'h.mohammed@mnlegal.net',
    phone: '+254 700 325 089',
    credentials: [
      'Advocate of the High Court of Kenya',
      'LL.B (Hons), Jomo Kenyatta University of Agriculture and Technology',
      'Postgraduate Diploma, Kenya School of Law'
    ],
    bio: 'Husna is a Senior Associate in the Corporate & Real Estate practice group. She counsels local real estate developers, foreign venture partners, and corporate boards on complex land-use planning, sectional properties, and capital structure advisory.',
    linkedIn: 'https://www.linkedin.com/in/husna-mohammed-94686317b/',
  },
  {
    slug: 'zachary-ongeri',
    name: 'Zachary Ongeri',
    title: 'AI & Digital transformation Associate',
    practice: 'Legal Technology & Frontier Regulation',
    image: 'https://wp.mnlegal.net/wp-content/uploads/2026/01/1000053692.jpg',
    email: 'z.ongeri@mnlegal.net',
    phone: '+254 700 325 089',
    credentials: [
      'LL.B (Hons), University of Nairobi',
      'Advocate of the High Court of Kenya',
      'Certified Legal Technology Professional'
    ],
    bio: "Zachary coordinates the firm's AI & Emerging Tech advisory group. He specializes in mapping operational parameters for generative AI systems, smart contracts compliance, and helping foreign platforms enter the East African regulatory sandbox.",
    publications: [
      {
        title: "Kenya's AI Bill 2026: Balancing Innovation with Ethical Guardrails",
        href: '/insights/the-silicon-savannahs-social-contract-a-critical-deep-dive-into-kenyas-artificial-intelligence-bill-2026',
        date: 'March 2026'
      }
    ]
  },
  {
    slug: 'nour-sheriff',
    name: 'Nour Sheriff',
    title: 'Associate',
    practice: 'Commercial Law & International Arbitration',
    image: 'https://wp.mnlegal.net/wp-content/uploads/2024/01/Nour-Sheriff.jpg',
    email: 'n.sheriff@mnlegal.net',
    phone: '+254 700 325 089',
    credentials: [
      'Advocate of the High Court of Kenya',
      'LL.B (Hons), Strathmore University Law School',
      'Certified Mediator (MAC)'
    ],
    bio: 'Nour specializes in domestic and regional commercial disputes, arbitration, and joint-venture advisory. She has active expertise in solving cross-border supply chain legal challenges and regulatory licensing in the East African Community.',
    linkedIn: 'https://www.linkedin.com/in/nour-sherif-%E4%B9%90-%E6%98%8E-7a59b6118/',
  },
  {
    slug: 'tyrus-muya-kamau',
    name: 'Tyrus Muya Kamau',
    title: 'Head of Cybersecurity',
    practice: 'Cybersecurity & Digital Forensics',
    image: 'https://wp.mnlegal.net/wp-content/uploads/2026/03/Tyrus-Muya-Kamau.jpg.jpeg',
    email: 't.kamau@mnlegal.net',
    phone: '+254 700 325 089',
    credentials: [
      'MSc in Information Security & Digital Forensics',
      'Certified Information Systems Security Professional (CISSP)',
      'Digital Forensics Lead Expert'
    ],
    bio: "Tyrus leads cybersecurity advisories at MNL Advocates LLP. He conducts critical infrastructure risk audits, digital forensics investigations, and works closely with our data privacy lawyers to verify corporate compliance under the Data Protection Act 2019.",
    linkedIn: 'https://www.linkedin.com/in/tyruskamau/',
    publications: [
      {
        title: "Fintech Vulnerabilities & The Regulatory Frontier under Kenya's Data Protection Act",
        href: '#',
        date: 'January 2026'
      }
    ]
  },
  {
    slug: 'keziah-mwangi',
    name: 'Keziah Mwangi',
    title: 'HRM and Tax Associate',
    practice: 'Human Resources & Taxation',
    image: 'https://wp.mnlegal.net/wp-content/uploads/2026/04/IMG_3394.JPG-1-scaled.jpeg',
    email: 'k.mwangi@mnlegal.net',
    phone: '+254 700 325 089',
    credentials: [
      'Certified Human Resource Practitioner (CHRP-K)',
      'Postgraduate Diploma in Tax Administration (KESRA)',
      'B.Com in Finance'
    ],
    bio: 'Keziah Mwangi heads our employment tax and workplace regulatory team. She assists scaling tech platforms and multinational companies in structuring compliant ESOPs, managing expat tax issues, and resolving KRA payroll audit matters.',
    linkedIn: 'https://www.linkedin.com/in/keziah-mwangi/',
  },
  {
    slug: 'nahashon-muhari',
    name: 'Nahashon Ian Muhari',
    title: 'Digital Marketing & Communications Lead',
    practice: 'Brand Strategy & Media Communications',
    image: 'https://wp.mnlegal.net/wp-content/uploads/2026/04/Nahashon.jpeg',
    email: 'n.muhari@mnlegal.net',
    phone: '+254 700 325 089',
    credentials: [
      'B.A. in Communication & Journalism',
      'Certified Digital Marketing Professional'
    ],
    bio: 'Nahashon directs brand communications and media engagement for the firm. He coordinates our public relations pipelines, publication outreach for legal briefs, and manages media logistics for our flagship MNL Africa Leadership Circle Summit.',
    linkedIn: 'https://www.linkedin.com/in/nahashon-muhari-474a0628b/',
  }
];
