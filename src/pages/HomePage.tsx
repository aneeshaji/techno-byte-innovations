import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ParticleField from '../components/ParticleField';
import Testimonials from '../components/Testimonials';
import { homePageSchema } from '../utils/seo';
import { useLeadModal } from '../context/LeadModalContext';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from '../utils/siteConfig';
import './HomePage.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

/* Masked per-line hero headline reveal */
const lineReveal: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const linesStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

/* Section heading entrance */
const headingReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const marqueeItems = [
  'React', 'Next.js', 'Node.js', 'Flutter', 'React Native',
  'AWS', 'Docker', 'TensorFlow', 'PostgreSQL', 'TypeScript',
  'Figma', 'GraphQL', 'Redis', 'Kubernetes', 'Python',
  'React', 'Next.js', 'Node.js', 'Flutter', 'React Native',
  'AWS', 'Docker', 'TensorFlow', 'PostgreSQL', 'TypeScript',
  'Figma', 'GraphQL', 'Redis', 'Kubernetes', 'Python',
];

const services = [
  {
    num: '01',
    icon: '🌐',
    title: 'Web Development',
    desc: 'Custom web apps built with React, Next.js and Node.js for performance and scale.',
  },
  {
    num: '02',
    icon: '📱',
    title: 'Mobile Apps',
    desc: 'Native iOS & Android apps plus cross-platform solutions with Flutter and React Native.',
  },
  {
    num: '03',
    icon: '🤖',
    title: 'AI & Machine Learning',
    desc: 'Intelligent systems powered by TensorFlow, PyTorch and cutting-edge LLM integrations.',
  },
];

interface ProjectItem {
  title: string;
  cat: string;
  blurb: string;
  tech: string[];
  url: string;
  featured?: boolean;
  impact: string;
  badge: string;
  previewType: 'atsense' | 'framezlabs' | 'balancely' | 'erp' | 'paperstall' | 'temple';
}

const projects: ProjectItem[] = [
  {
    title: 'ATSense',
    cat: 'AI · SaaS Platform',
    blurb: 'Enterprise AI hiring engine that automates candidate screening, parses thousands of resumes in seconds, and matches ideal talent to roles.',
    tech: ['AI/ML', 'React', 'Cloud', 'FastAPI'],
    url: 'https://atsense.online/',
    featured: true,
    impact: '98% Candidate Match · 10x Faster Hiring',
    badge: '★ Flagship AI Product',
    previewType: 'atsense',
  },
  {
    title: 'FramezLabs Store',
    cat: 'E-Commerce · Marketplace',
    blurb: 'High-volume custom photo frame & personalized gift marketplace featuring dynamic real-time frame customizer and automated order fulfillment across India.',
    tech: ['React', 'Node.js', 'Razorpay', 'MongoDB'],
    url: 'https://framezlabs.store/',
    impact: '10,000+ Orders Shipped Pan-India',
    badge: 'High-Volume D2C',
    previewType: 'framezlabs',
  },
  {
    title: 'Thurayilkunnu Temple',
    cat: 'Cultural · Digital Heritage',
    blurb: 'Official digital heritage portal and online vazhipadu booking platform for Thurayilkunnu Sree Subrahmanya Swami Temple, serving devotees globally with darshan schedules and seva offerings.',
    tech: ['React', 'PWA', 'Cloud', 'PostgreSQL'],
    url: 'https://thurayilkunnutemple.com/',
    impact: 'Online Darshan & Seva Booking · 10,000+ Devotees',
    badge: 'Cultural Heritage Portal',
    previewType: 'temple',
  },
  {
    title: 'Balancely CRM',
    cat: 'B2B SaaS · Financial CRM',
    blurb: 'Comprehensive customer management & billing panel with multi-tenant accounting, automated invoicing, and real-time revenue projection metrics.',
    tech: ['Next.js', 'PostgreSQL', 'AWS', 'Tailwind'],
    url: 'https://balancely-crm.technobyteinnovations.in/',
    impact: 'Automated Billing · 40% Admin Time Saved',
    badge: 'Enterprise Cloud',
    previewType: 'balancely',
  },
  {
    title: 'FramezLabs ERP',
    cat: 'Enterprise ERP · Supply Chain',
    blurb: 'Full-stack enterprise resource planning suite powering manufacturing floor operations, inventory logistics, automated dispatch, and multi-tier reporting.',
    tech: ['React', 'Node.js', 'MongoDB', 'Docker'],
    url: 'https://erp.framezlabs.store/',
    impact: 'Zero Dispatch Delays · 100% Traceability',
    badge: 'Industry 4.0 ERP',
    previewType: 'erp',
  },
  {
    title: 'Paperstall',
    cat: 'Web Platform · Marketplace',
    blurb: 'Next-generation reading destination connecting independent book sellers and avid readers with curated catalogs, verified reviews, and instant checkout.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    url: 'https://paperstall.com/',
    impact: '50,000+ Titles · Thriving Reader Network',
    badge: 'Content Platform',
    previewType: 'paperstall',
  },
];

const ProjectMockup = ({ type }: { type: string }) => {
  if (type === 'atsense') {
    return (
      <div className="mockup-window">
        <div className="mockup-header">
          <div className="window-dots" aria-hidden="true">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="mockup-url">atsense.online/dashboard</span>
          <span className="mockup-badge">● AI Screening Active</span>
        </div>
        <div className="mockup-body mockup-atsense">
          <div className="atsense-match-card">
            <div className="candidate-avatar">
              <span className="avatar-icon">👨‍💻</span>
              <div>
                <div className="candidate-name">Lead Full-Stack Architect</div>
                <div className="candidate-exp">8+ Yrs Exp · React, Cloud, Python</div>
              </div>
            </div>
            <div className="match-pill">98% Match</div>
          </div>
          <div className="atsense-tags">
            <span className="ai-tag">✓ Resume Parsed (0.3s)</span>
            <span className="ai-tag">✓ Skills Verified</span>
            <span className="ai-tag">✓ Shortlisted</span>
          </div>
          <div className="atsense-metric-bar">
            <span>Filter Velocity: <strong>1,200 Resumes in 4.2s</strong></span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'framezlabs') {
    return (
      <div className="mockup-window">
        <div className="mockup-header">
          <div className="window-dots" aria-hidden="true">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="mockup-url">framezlabs.store</span>
          <span className="mockup-badge">● Storefront Live</span>
        </div>
        <div className="mockup-body mockup-framez">
          <div className="framez-preview-box">
            <div className="framez-inner-frame">
              <span className="framez-art-icon">🖼️</span>
              <span className="framez-size-tag">12" × 16" Custom Gallery Frame</span>
            </div>
          </div>
          <div className="framez-checkout-strip">
            <div>
              <div className="framez-price">₹1,499</div>
              <div className="framez-stock">In Stock · Pan-India Dispatch</div>
            </div>
            <div className="framez-cart-btn">Customizer Active</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'balancely') {
    return (
      <div className="mockup-window">
        <div className="mockup-header">
          <div className="window-dots" aria-hidden="true">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="mockup-url">balancely-crm...</span>
          <span className="mockup-badge">● Cloud CRM</span>
        </div>
        <div className="mockup-body mockup-balancely">
          <div className="crm-stats-row">
            <div className="crm-mini-stat">
              <span className="label">Monthly Pipeline</span>
              <span className="val">$248,500</span>
            </div>
            <div className="crm-mini-stat">
              <span className="label">Active Subscriptions</span>
              <span className="val">320 Paid</span>
            </div>
          </div>
          <div className="crm-chart-bar">
            <div className="chart-line-svg">
              <svg viewBox="0 0 200 40" fill="none" className="sparkline" aria-hidden="true">
                <path d="M0 32 Q 40 8, 80 22 T 140 10 T 200 4" stroke="#00f2fe" strokeWidth="2.5" fill="none" />
              </svg>
            </div>
            <span className="crm-growth-tag">+32% MoM Revenue</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'erp') {
    return (
      <div className="mockup-window">
        <div className="mockup-header">
          <div className="window-dots" aria-hidden="true">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="mockup-url">erp.framezlabs.store</span>
          <span className="mockup-badge">● Factory Operations</span>
        </div>
        <div className="mockup-body mockup-erp">
          <div className="erp-order-row">
            <span className="erp-pill">Order #FL-8821</span>
            <span className="erp-status">Laser Cut & Packed</span>
          </div>
          <div className="erp-pipeline">
            <div className="pipeline-step done">Raw Material</div>
            <div className="pipeline-step done">CNC Milling</div>
            <div className="pipeline-step active">Quality QA</div>
          </div>
          <div className="erp-efficiency">
            <span>Dispatch Readiness: <strong>99.4% On-Schedule</strong></span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'temple') {
    return (
      <div className="mockup-window">
        <div className="mockup-header">
          <div className="window-dots" aria-hidden="true">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="mockup-url">thurayilkunnutemple.com</span>
          <span className="mockup-badge">● Darshan Portal Live</span>
        </div>
        <div className="mockup-body mockup-temple">
          <div className="temple-header-row">
            <span className="temple-diety-icon">🛕</span>
            <div>
              <div className="temple-name-title">Thurayilkunnu Sree Subrahmanya Swami Temple</div>
              <div className="temple-loc-tag">Karunagappally, Kollam, Kerala</div>
            </div>
          </div>
          <div className="temple-darshan-badge">
            <span>Darshan: <strong>05:00 AM – 10:30 AM</strong> · <strong>05:30 PM – 08:00 PM</strong></span>
          </div>
          <div className="temple-services-strip">
            <span className="seva-pill">Ganapathy Homam</span>
            <span className="seva-pill">Subrahmanya Pooja</span>
            <span className="seva-pill online">✓ Online Vazhipadu Active</span>
          </div>
        </div>
      </div>
    );
  }

  // Paperstall
  return (
    <div className="mockup-window">
      <div className="mockup-header">
        <div className="window-dots" aria-hidden="true">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="mockup-url">paperstall.com</span>
        <span className="mockup-badge">● Marketplace Live</span>
      </div>
      <div className="mockup-body mockup-paperstall">
        <div className="book-shelf">
          <div className="book-spine book-1">📚 Tech & AI</div>
          <div className="book-spine book-2">📖 Leadership</div>
          <div className="book-spine book-3">📙 Architecture</div>
        </div>
        <div className="paperstall-feed">
          <div className="feed-text">50,000+ Curated Titles · Verified Sellers</div>
          <div className="feed-rating">★★★★★ 4.9 (8.4k Community Members)</div>
        </div>
      </div>
    </div>
  );
};

const features = [
  { icon: '⚡', title: 'Rapid Delivery', desc: 'Agile sprints with weekly demos — ship faster without sacrificing quality.' },
  { icon: '🔒', title: 'Security First', desc: 'Every project follows OWASP best practices and modern security standards.' },
  { icon: '📈', title: 'Built to Scale', desc: 'Architecture designed for growth — from MVP to millions of users.' },
  { icon: '🤝', title: 'Dedicated Support', desc: 'Post-launch maintenance, monitoring and feature updates.' },
];

const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="counter-value">
      {display}
      {suffix}
    </span>
  );
};

const HomePage = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion() === true;
  const { openLeadModal } = useLeadModal();

  // Mouse parallax (normalized -0.5..0.5).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  const parallaxSpring = { stiffness: 60, damping: 20 };
  const sx = useSpring(mx, parallaxSpring);
  const sy = useSpring(my, parallaxSpring);
  const orbX = useTransform(sx, (v) => v * 50);
  const orbY = useTransform(sy, (v) => v * 50);
  const contentX = useTransform(sx, (v) => v * 14);
  const contentY = useTransform(sy, (v) => v * 14);

  // Scroll-linked hero fade as you scroll away.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="home-page">
      <SEO
        title="Top Software & AI Development Company in Kerala | Web & Mobile Apps"
        description="Technobyte Innovations delivers enterprise-grade software development in Trivandrum, Kerala. Custom web apps, mobile applications, cloud solutions, and AI/ML systems. 50+ projects delivered with 100% on-time guarantee. Request a free estimate."
        canonicalUrl="/"
        keywords="software development company Kerala, web development Trivandrum, mobile app development India, AI ML solutions Kerala, custom software developers, hire react developers India, enterprise ERP CRM developers"
        schema={homePageSchema}
      />

      {/* ── Hero ── */}
      <section id="hero" ref={heroRef} className="hero">
        <ParticleField />
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <motion.div
          className="hero-parallax"
          style={reduceMotion ? undefined : { x: orbX, y: orbY }}
          aria-hidden="true"
        >
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </motion.div>

        <div className="container">
          <motion.div
            className="hero-scroll"
            style={reduceMotion ? undefined : { y: scrollY, opacity: scrollOpacity }}
          >
            <div className="hero-inner">
              {/* Left Content */}
              <motion.div
                className="hero-content"
                initial={reduceMotion ? false : 'hidden'}
                animate="visible"
                variants={stagger}
                style={reduceMotion ? undefined : { x: contentX, y: contentY }}
              >
                <motion.div className="hero-badge" variants={fadeUp} custom={0}>
                  <span className="hero-badge-dot" />
                  <span className="hero-badge-text">
                    ★ 4.9/5 RATED SOFTWARE COMPANY · TRIVANDRUM, KERALA
                  </span>
                </motion.div>

                <motion.h1 className="hero-title" variants={linesStagger}>
                  <span className="hero-line">
                    <motion.span className="hero-line-inner" variants={lineReveal}>Engineering Software That</motion.span>
                  </span>
                  <span className="hero-line">
                    <motion.span className="hero-line-inner line-lime line-shine" variants={lineReveal}>
                      Scales Your Revenue.
                    </motion.span>
                  </span>
                </motion.h1>

                <motion.p className="hero-desc" variants={fadeUp} custom={2}>
                  From funded startups to enterprise operators — we architect scalable web platforms, high-performance mobile apps, and custom AI systems delivered on time with fixed pricing and complete IP code ownership.
                </motion.p>

                {/* Key Decision-Maker Guarantees */}
                <motion.div className="hero-trust-checklist" variants={fadeUp} custom={2.5}>
                  <span className="trust-pill-check">✓ 100% Code & IP Ownership</span>
                  <span className="trust-pill-check">✓ First Demo in 14 Days</span>
                  <span className="trust-pill-check">✓ Fixed-Price Guarantee</span>
                  <span className="trust-pill-check">✓ 15-Min Response Time</span>
                </motion.div>

                {/* High-Converting CTA Buttons */}
                <motion.div className="hero-actions" variants={fadeUp} custom={3}>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg hero-cta-lead"
                    onClick={() => openLeadModal('Web & Mobile Application')}
                  >
                    <span>Get a Free Project Proposal →</span>
                  </button>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp-hero btn-lg"
                    title="Direct WhatsApp chat with lead architect"
                  >
                    <span>💬 Chat on WhatsApp</span>
                  </a>

                  <a href={PHONE_TEL} className="hero-phone-call">
                    <span>📞 {PHONE_DISPLAY}</span>
                  </a>
                </motion.div>
              </motion.div>

              {/* Right — Interactive Lead Estimator & Social Proof Card */}
              <motion.div
                className="hero-right"
                initial={reduceMotion ? false : 'hidden'}
                animate="visible"
                variants={stagger}
                style={reduceMotion ? undefined : { x: contentX, y: contentY }}
              >
                <motion.div className="hero-lead-card glass" variants={fadeUp} custom={2}>
                  <div className="lead-card-header">
                    <div className="lead-card-tag">Fast Scope & Architecture Plan</div>
                    <h3 className="lead-card-title">Ready to Build Your Next Product?</h3>
                    <p className="lead-card-sub">
                      Select your service requirement below to receive a detailed technical proposal and transparent estimate within 24 hours.
                    </p>
                  </div>

                  <div className="lead-card-options">
                    <button
                      type="button"
                      className="option-chip"
                      onClick={() => openLeadModal('Custom Web Application / SaaS')}
                    >
                      <span>🌐 Web App / SaaS</span>
                      <span className="arrow">→</span>
                    </button>
                    <button
                      type="button"
                      className="option-chip"
                      onClick={() => openLeadModal('Mobile App (iOS & Android)')}
                    >
                      <span>📱 iOS & Android Mobile App</span>
                      <span className="arrow">→</span>
                    </button>
                    <button
                      type="button"
                      className="option-chip"
                      onClick={() => openLeadModal('AI & Machine Learning Integration')}
                    >
                      <span>🤖 AI / Machine Learning System</span>
                      <span className="arrow">→</span>
                    </button>
                    <button
                      type="button"
                      className="option-chip"
                      onClick={() => openLeadModal('Enterprise ERP / CRM System')}
                    >
                      <span>🏢 Enterprise ERP / CRM System</span>
                      <span className="arrow">→</span>
                    </button>
                  </div>

                  <div className="lead-card-stats">
                    <div className="card-stat-item">
                      <div className="stat-big"><Counter value={50} suffix="+" /></div>
                      <div className="stat-label">Shipped Systems</div>
                    </div>
                    <div className="card-stat-item">
                      <div className="stat-big">99.4%</div>
                      <div className="stat-label">On-Time Delivery</div>
                    </div>
                    <div className="card-stat-item">
                      <div className="stat-big">4.9/5</div>
                      <div className="stat-label">Client Rating</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          aria-hidden="true"
        >
          <span className="hero-scroll-mouse" />
          <span className="hero-scroll-text">Scroll</span>
        </motion.div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee-section">
        <div className="marquee-track">
          <div className="marquee-inner">
            {marqueeItems.map((item, i) => (
              <span key={i} className="marquee-item">
                {item}
                {i < marqueeItems.length - 1 && <span className="dot">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services ── */}
      <section className="services-preview">
        <div className="container">
          <div className="services-header">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={headingReveal}
            >
              <div className="section-label">What We Do</div>
              <h2 className="services-heading">
                Our Core<br /><span style={{ color: 'var(--color-indigo)' }}>Services</span>
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={headingReveal}
              transition={{ delay: 0.12 }}
            >
              <Link to="/services" className="btn btn-outline">
                All Services →
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="services-cards"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {services.map((s, i) => (
              <motion.div key={i} className="svc-reveal" variants={fadeUp} custom={i}>
                <div className="service-preview-card">
                  <div className="svc-num">{s.num}</div>
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-title">{s.title}</div>
                  <p className="svc-desc">{s.desc}</p>
                  <Link to="/services" className="svc-arrow">
                    Learn more <span>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Projects / Case Studies ── */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-header">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={headingReveal}
            >
              <div className="section-label">Proven Client Impact</div>
              <h2 className="projects-heading">
                Featured Case Studies &<br /><span style={{ color: 'var(--color-lime)' }}>Client Success Stories</span>
              </h2>
              <p className="projects-sub">
                Explore real software platforms and enterprise applications we have architected and shipped for startups and global operators.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={headingReveal}
              transition={{ delay: 0.12 }}
              className="projects-header-actions"
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openLeadModal('Custom Software Project')}
              >
                Discuss Your Project →
              </button>
              <Link to="/portfolio" className="btn btn-outline">
                All Case Studies
              </Link>
            </motion.div>
          </div>

          {/* Flagship Spotlight Feature: ATSense */}
          <motion.div
            className="flagship-project-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <div className="flagship-left">
              <div className="flagship-badge-row">
                <span className="flagship-star-tag">★ Flagship AI Platform</span>
                <span className="flagship-cat">{projects[0].cat}</span>
              </div>
              <h3 className="flagship-title">{projects[0].title}</h3>
              <p className="flagship-blurb">{projects[0].blurb}</p>

              <div className="flagship-impact-box">
                <span className="impact-icon">⚡</span>
                <div>
                  <div className="impact-val">{projects[0].impact}</div>
                  <div className="impact-desc">High-volume automated candidate screening & matching</div>
                </div>
              </div>

              <div className="flagship-tech-row">
                {projects[0].tech.map((t, idx) => (
                  <span key={idx} className="tech-chip">{t}</span>
                ))}
              </div>

              <div className="flagship-actions">
                <a
                  href={projects[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <span>Visit atsense.online</span>
                  <span>↗</span>
                </a>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => openLeadModal('AI & Machine Learning System')}
                >
                  Build Similar AI System
                </button>
              </div>
            </div>

            <div className="flagship-right">
              <a
                href={projects[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="mockup-link-wrapper"
                aria-label="Visit ATSense Live Platform"
              >
                <ProjectMockup type="atsense" />
              </a>
            </div>
          </motion.div>

          {/* 2x2 Showcase Cards Grid */}
          <motion.div
            className="projects-grid-cards"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {projects.slice(1).map((p, i) => (
              <motion.div key={p.title} className="showcase-card" variants={fadeUp} custom={i}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="showcase-preview-link"
                  aria-label={`Visit ${p.title}`}
                >
                  <ProjectMockup type={p.previewType} />
                </a>

                <div className="showcase-card-content">
                  <div className="showcase-card-meta">
                    <span className="showcase-index">0{i + 2}</span>
                    <span className="showcase-cat">{p.cat}</span>
                    <span className="showcase-badge-pill">{p.badge}</span>
                  </div>

                  <h3 className="showcase-title">
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      {p.title} <span className="open-icon">↗</span>
                    </a>
                  </h3>

                  <p className="showcase-desc">{p.blurb}</p>

                  <div className="showcase-impact-chip">
                    <span className="bolt">⚡</span> {p.impact}
                  </div>

                  <div className="showcase-footer">
                    <div className="showcase-tech-list">
                      {p.tech.map((t, j) => (
                        <span key={j} className="tech-chip-small">{t}</span>
                      ))}
                    </div>

                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="showcase-visit-btn"
                    >
                      <span>Visit Live</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="why-section">
        <div className="container">
          <div className="why-grid">
            <motion.div
              className="why-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="section-label">Why Choose Us</div>
              <h2>
                Built on<br /><span style={{ color: 'var(--color-lime)' }}>Trust</span> &<br />
                <span style={{ color: 'var(--color-indigo)' }}>Expertise</span>
              </h2>
              <p>
                We don't just write code — we partner with you to understand your business,
                define the right solution, and deliver it on time.
              </p>
              <Link to="/about" className="btn btn-indigo">
                About Us →
              </Link>
            </motion.div>

            <motion.div
              className="why-features"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              {features.map((f, i) => (
                <motion.div key={i} className="why-feature" variants={fadeUp} custom={i}>
                  <div className="feature-icon-box">{f.icon}</div>
                  <div className="feature-text">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />
    </div>
  );
};

export default HomePage;
