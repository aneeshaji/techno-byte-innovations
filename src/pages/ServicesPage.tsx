import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import SEO from '../components/SEO';
import Magnetic from '../components/Magnetic';
import PageHero from '../components/PageHero';
import TiltCard from '../components/TiltCard';
import { useLeadModal } from '../context/LeadModalContext';
import { servicesPageSchema, breadcrumbSchema } from '../utils/seo';
import { WHATSAPP_URL, PHONE_DISPLAY, PHONE_TEL } from '../utils/siteConfig';
import './ServicesPage.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
};

/* ── Modern Handcrafted Vector Icons (Clean & Scalable, No Cheap Emojis) ── */
const WebIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="m7 8 3 3-3 3" />
    <path d="M13 14h4" />
  </svg>
);

const MobileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
    <path d="M12 18h.01" />
    <path d="M9 5h6" />
  </svg>
);

const CloudIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <polyline points="12 12 12 16" />
    <polyline points="10 14 12 12 14 14" />
  </svg>
);

const AiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const DesignIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19 7-7 3 3-7 7-3-3z" />
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="m2 2 7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const DevopsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    <circle cx="12" cy="12" r="3" />
    <path d="m4.93 4.93 2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <path d="M8 12a4 4 0 0 1 8 0" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feat-check">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Rich Services Data ── */
const services = [
  {
    id: 'web-development',
    categoryFilter: 'web',
    num: '01',
    category: 'Full-Stack & Cloud',
    title: 'Custom Web & SaaS Engineering',
    tagline: 'High-performance web apps, responsive portals, and enterprise SaaS platforms.',
    description: 'We architect and build enterprise-grade web applications designed from day one for sub-second page loads, elastic cloud scaling, and intuitive user experiences.',
    icon: <WebIcon />,
    features: [
      'Next.js & React High-Speed Platforms',
      'Scalable Multi-Tenant SaaS Architecture',
      'Real-Time WebSockets & API Integrations',
      'Headless CMS & High-Volume E-Commerce',
      'PWA (Progressive Web App) Capabilities',
      'Enterprise RBAC & Identity Security'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'PostgreSQL', 'GraphQL'],
    metrics: '99.9% Uptime · <500ms TTFB · SEO Ready',
    modalPreset: 'Custom Web Application / SaaS'
  },
  {
    id: 'mobile-apps',
    categoryFilter: 'mobile',
    num: '02',
    category: 'Cross-Platform & Native',
    title: 'Mobile App Development',
    tagline: 'Native and cross-platform apps that users love on iOS & Android.',
    description: 'From consumer apps with viral traction to mission-critical field operations tools. We develop cross-platform Flutter and React Native apps that feel truly native, fast, and responsive.',
    icon: <MobileIcon />,
    features: [
      'iOS & Android Cross-Platform Mastery',
      'Smooth 60fps Native Gestures & UX',
      'Offline-First Data Sync & Storage',
      'Push Notifications & Deep Linking',
      'Biometric Auth (FaceID / Fingerprint)',
      'App Store & Play Store Launch Support'
    ],
    techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'SQLite', 'REST APIs'],
    metrics: 'iOS & Android · 60fps UI · Store Guaranteed',
    modalPreset: 'Mobile App (iOS & Android)'
  },
  {
    id: 'cloud-solutions',
    categoryFilter: 'cloud',
    num: '03',
    category: 'Cloud Architecture & Scale',
    title: 'Cloud Infrastructure & Serverless',
    tagline: 'Resilient, secure, and auto-scaling cloud foundations on AWS & GCP.',
    description: 'Modernize your infrastructure with cloud-native architectures. We design fault-tolerant, auto-scaling environments that reduce hosting costs and eliminate midnight server downtime.',
    icon: <CloudIcon />,
    features: [
      'AWS, Azure & Google Cloud Architecture',
      'Microservices & Containerization',
      'Zero-Downtime Database Migration',
      'Serverless Lambda / Edge Computing',
      'Cost Optimization & FinOps Audits',
      'DDoS Protection & SOC2 Compliance'
    ],
    techStack: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Redis', 'Nginx'],
    metrics: 'Zero-Downtime · Auto-Scale · SOC2 Ready',
    modalPreset: 'Cloud Architecture & DevOps'
  },
  {
    id: 'ai-ml',
    categoryFilter: 'ai',
    num: '04',
    category: 'Applied AI & Automation',
    title: 'Enterprise AI & Machine Learning',
    tagline: 'Practical AI systems, custom LLMs, and automated intelligence.',
    description: 'Transform raw data into competitive advantages. We integrate state-of-the-art Large Language Models, custom RAG search pipelines, and predictive algorithms into your business workflow.',
    icon: <AiIcon />,
    features: [
      'Custom LLM Integration (OpenAI / Claude / Llama)',
      'RAG (Retrieval-Augmented Generation) Knowledge Bases',
      'Predictive Analytics & Forecasting Models',
      'Intelligent Document & Vision Processing',
      'Automated Customer Service AI Agents',
      'Private On-Premise Vector Databases'
    ],
    techStack: ['Python', 'OpenAI', 'LangChain', 'PyTorch', 'Pinecone', 'FastAPI', 'HuggingFace'],
    metrics: 'Custom LLMs · Private Data RAG · 10x Automation',
    modalPreset: 'AI & Machine Learning Integration'
  },
  {
    id: 'ui-ux',
    categoryFilter: 'design',
    num: '05',
    category: 'Product Design & Design Systems',
    title: 'UI/UX Design & Prototyping',
    tagline: 'World-class digital product design that converts visitors into customers.',
    description: 'We create frictionless digital experiences backed by user psychology and data. Every interface is crafted with precision design systems, micro-interactions, and conversion-focused flows.',
    icon: <DesignIcon />,
    features: [
      'User Journey Mapping & Wireframing',
      'Interactive Figma Clickable Prototypes',
      'Production-Ready Tokenized Design Systems',
      'Conversion Rate Optimization (CRO)',
      'Design Audits & Usability Testing',
      'Pixel-Perfect Responsive Hand-offs'
    ],
    techStack: ['Figma', 'Design Systems', 'Micro-Interactions', 'User Testing', 'WCAG AAA'],
    metrics: 'Interactive Prototype · Figma Tokens · WCAG Compliant',
    modalPreset: 'UI/UX Design & Prototyping'
  },
  {
    id: 'devops-automation',
    categoryFilter: 'devops',
    num: '06',
    category: 'Continuous Delivery & Reliability',
    title: 'DevOps & CI/CD Automation',
    tagline: 'Accelerate deployment cycles with automated, bulletproof pipelines.',
    description: 'Eliminate manual deployment errors. We build automated CI/CD testing pipelines, Infrastructure-as-Code (IaC), and real-time observability dashboards so you can deploy with confidence.',
    icon: <DevopsIcon />,
    features: [
      'Automated GitHub Actions / GitLab CI/CD',
      'Infrastructure as Code with Terraform',
      'Automated Unit, E2E & Security Testing',
      'Real-Time APM & Distributed Tracing',
      'Blue-Green & Canary Zero-Downtime Deploys',
      'Disaster Recovery & Automated Backups'
    ],
    techStack: ['GitHub Actions', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana', 'Datadog'],
    metrics: 'Automated CI/CD · Zero Deploy Friction · 24/7 Monitoring',
    modalPreset: 'DevOps & CI/CD Pipelines'
  }
];

const filterCategories = [
  { id: 'all', label: 'All Solutions', count: 6 },
  { id: 'web', label: 'Web & SaaS', count: 1 },
  { id: 'mobile', label: 'Mobile Apps', count: 1 },
  { id: 'cloud', label: 'Cloud Systems', count: 1 },
  { id: 'ai', label: 'AI & Data', count: 1 },
  { id: 'design', label: 'UI/UX Design', count: 1 },
  { id: 'devops', label: 'DevOps & SRE', count: 1 },
];

const ServicesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { openLeadModal } = useLeadModal();

  const filteredServices = activeFilter === 'all'
    ? services
    : services.filter(s => s.categoryFilter === activeFilter);

  return (
    <div className="services-page">
      <SEO
        title="Software Development Services in Kerala | Web, Mobile & AI Solutions"
        description="Enterprise software development services in Trivandrum, Kerala. Custom web applications, iOS/Android mobile apps, cloud infrastructure, and AI/ML engineering. Fixed-price contracts & on-time delivery."
        canonicalUrl="/services"
        keywords="software development services Kerala, web development company Trivandrum, mobile app development Kerala, AI ML development India, hire dedicated developers Kerala, cloud computing services Trivandrum, custom software development agency"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            servicesPageSchema(services),
            breadcrumbSchema([{ name: 'Services', url: '/services' }]),
          ],
        }}
      />

      {/* Hero */}
      <PageHero
        label="Engineering Capabilities"
        line1="Modern Software"
        line2="Engineering"
        subtitle="End-to-end software development engineered for performance, scale, and clear business ROI — from initial prototype to enterprise deployment."
      />

      {/* Engineering Value Proposition Strip */}
      <section className="services-pillars-strip">
        <div className="container">
          <div className="pillars-grid">
            <div className="pillar-item">
              <span className="pillar-bullet">✓</span>
              <div>
                <strong>100% IP & Code Ownership</strong>
                <span>All repositories, licenses, and architecture transfer to you</span>
              </div>
            </div>
            <div className="pillar-item">
              <span className="pillar-bullet">✓</span>
              <div>
                <strong>Working Demo in 14 Days</strong>
                <span>Rapid iterative development with weekly milestone demos</span>
              </div>
            </div>
            <div className="pillar-item">
              <span className="pillar-bullet">✓</span>
              <div>
                <strong>Fixed-Price Guarantee</strong>
                <span>Zero surprise fees — predictable timeline & budget control</span>
              </div>
            </div>
            <div className="pillar-item">
              <span className="pillar-bullet">✓</span>
              <div>
                <strong>99.9% Production SLA</strong>
                <span>Enterprise grade security, monitoring, and ongoing support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Service Grid */}
      <section className="services-showcase-section">
        <div className="container">
          {/* Header & Filter Controls */}
          <div className="showcase-header">
            <div>
              <div className="section-label">Core Capabilities</div>
              <h2 className="showcase-title">Specialized Technology Services</h2>
              <p className="showcase-desc">
                Select a category to explore our tech stack, deliverables, and engineering standards.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="services-filter-bar">
              {filterCategories.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(tab.id)}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid (Using TiltCard for 3D Spotlight Glow) */}
          <motion.div
            className="services-cards-grid"
            layout
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  layout
                  variants={fadeUp}
                  custom={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="service-card-wrapper"
                >
                  <TiltCard className="service-bento-card" maxTilt={6}>
                    {/* Top Bar: Icon, Category & Serial */}
                    <div className="card-top-bar">
                      <div className="svc-icon-box">
                        {svc.icon}
                      </div>
                      <div className="card-badge-group">
                        <span className="svc-category-badge">{svc.category}</span>
                        <span className="svc-num-tag">{svc.num}</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="card-headline-block">
                      <h3 className="svc-title">{svc.title}</h3>
                      <p className="svc-tagline">{svc.tagline}</p>
                      <p className="svc-description">{svc.description}</p>
                    </div>

                    {/* Deliverables / Capabilities Checkmarks */}
                    <div className="svc-features-block">
                      <div className="features-header">Key Deliverables & Standards:</div>
                      <ul className="svc-features-list">
                        {svc.features.map((feat, idx) => (
                          <li key={idx} className="feat-item">
                            <CheckIcon />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="svc-tech-block">
                      <div className="tech-header">Tech Stack & Frameworks:</div>
                      <div className="tech-pills-row">
                        {svc.techStack.map((tech, idx) => (
                          <span key={idx} className="tech-pill">{tech}</span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Metrics & CTA */}
                    <div className="card-footer-action">
                      <div className="card-metric-pill">
                        <span className="metric-dot" />
                        <span>{svc.metrics}</span>
                      </div>

                      <div className="card-cta-group">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm svc-btn-lead"
                          onClick={() => openLeadModal(svc.modalPreset)}
                        >
                          <span>Get Free Proposal →</span>
                        </button>
                        <a
                          href={`${WHATSAPP_URL}&text=${encodeURIComponent(`Hi Technobyte Innovations, I would like to consult on ${svc.title}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-sm svc-btn-wa"
                          title="Direct WhatsApp chat"
                        >
                          <span>💬 Chat</span>
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4-Step Engineering Process (Interactive & Connected) */}
      <section className="process-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="process-header-wrap"
          >
            <div className="section-label">Proven Methodology</div>
            <h2 className="process-heading">How We Engineer Your Software</h2>
            <p className="process-subhead">
              A transparent, battle-tested software development lifecycle with zero ambiguity and full weekly visibility.
            </p>
          </motion.div>

          <motion.div
            className="process-steps-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            {[
              {
                num: '01',
                step: 'Phase 1',
                title: 'Architecture & Discovery',
                desc: 'We conduct a technical deep dive into user journeys, database schemas, API specs, and cloud architecture to produce a fixed-scope blueprint.',
                deliverable: 'Scope Specification & Wireframes'
              },
              {
                num: '02',
                step: 'Phase 2',
                title: 'Interactive Prototyping',
                desc: 'Figma interactive prototypes and system design. You validate every screen, user flow, and interaction before engineering begins.',
                deliverable: 'Clickable Prototype & Design System'
              },
              {
                num: '03',
                step: 'Phase 3',
                title: 'Agile Sprint Engineering',
                desc: '2-week sprint cycles with live staging environments, weekly video demos, automated test suites, and continuous stakeholder review.',
                deliverable: 'Working Software Demos Every 7 Days'
              },
              {
                num: '04',
                step: 'Phase 4',
                title: 'Production Deploy & Scale',
                desc: 'Zero-downtime deployment, automated backups, APM telemetry, security hardening, and dedicated post-launch SLA maintenance.',
                deliverable: '100% IP Transfer & Live Launch'
              },
            ].map((step, i) => (
              <motion.div key={i} className="process-step-col" variants={fadeUp} custom={i}>
                <div className="process-step-card glass">
                  <div className="step-card-top">
                    <span className="step-number-badge">{step.num}</span>
                    <span className="step-phase-pill">{step.step}</span>
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                  <div className="step-deliverable">
                    <span className="deliv-label">Deliverable:</span>
                    <span className="deliv-text">{step.deliverable}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* High-Converting Bottom CTA Banner */}
      <section className="services-cta-banner">
        <div className="container">
          <motion.div
            className="services-cta-box glass"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="cta-box-glow" />
            <div className="cta-box-content">
              <span className="cta-badge">★ Let's Build Something Exceptional</span>
              <h2 className="cta-box-heading">
                Ready to Transform Your Vision Into a Market-Leading Product?
              </h2>
              <p className="cta-box-sub">
                Speak directly with a lead solution architect in Trivandrum. Receive a comprehensive scope document and transparent project proposal within 24 hours.
              </p>
              <div className="cta-box-actions">
                <Magnetic>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => openLeadModal('Custom Web Application / SaaS')}
                  >
                    <span>Request Free Technical Proposal →</span>
                  </button>
                </Magnetic>
                <Magnetic>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp-hero btn-lg"
                  >
                    <span>💬 Chat on WhatsApp (+91 99950 64344)</span>
                  </a>
                </Magnetic>
                <a href={PHONE_TEL} className="cta-phone-link">
                  <span>📞 Call: {PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
