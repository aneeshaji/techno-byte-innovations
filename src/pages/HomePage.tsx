import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Magnetic from '../components/Magnetic';
import ParticleField from '../components/ParticleField';
import Testimonials from '../components/Testimonials';
import { homePageSchema } from '../utils/seo';
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

const projects = [
  {
    title: 'ATSense',
    cat: 'AI · SaaS',
    blurb: 'Our flagship AI hiring platform that clears candidate filters instantly, matching the right talent to the right role.',
    tech: ['AI/ML', 'React', 'Cloud'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    url: 'https://atsense.online/',
    featured: true,
  },
  {
    title: 'FramezLabs',
    cat: 'E-Commerce',
    blurb: 'Custom photo frames & personalized gifts marketplace — a complete storefront serving customers across India.',
    tech: ['React', 'Node.js', 'Payments'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    url: 'https://framezlabs.store/',
  },
  {
    title: 'Balancely CRM',
    cat: 'CRM · Cloud',
    blurb: 'Accounts panel and CRM for managing customers, billing and relationships from a single dashboard.',
    tech: ['Next.js', 'PostgreSQL', 'AWS'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    url: 'https://balancely-crm.technobyteinnovations.in/',
  },
  {
    title: 'FramezLabs ERP',
    cat: 'ERP · Enterprise',
    blurb: 'Enterprise resource planning system powering operations — inventory, orders, production and reporting.',
    tech: ['React', 'Node.js', 'MongoDB'],
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    url: 'https://erp.framezlabs.store/',
  },
  {
    title: 'Paperstall',
    cat: 'Platform',
    blurb: 'A reading destination where sellers and readers connect to discover and shop their next great book.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    url: 'https://paperstall.com/',
  },
];

const features = [
  { icon: '⚡', title: 'Rapid Delivery', desc: 'Agile sprints with weekly demos — ship faster without sacrificing quality.' },
  { icon: '🔒', title: 'Security First', desc: 'Every project follows OWASP best practices and modern security standards.' },
  { icon: '📈', title: 'Built to Scale', desc: 'Architecture designed for growth — from MVP to millions of users.' },
  { icon: '🤝', title: 'Dedicated Support', desc: 'Post-launch maintenance, monitoring and feature updates.' },
];

const ROTATING_WORDS = ['Products.', 'Experiences.', 'Systems.'];

const RotatingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING_WORDS.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="rotating-word" key={index} aria-live="polite">
      {ROTATING_WORDS[index]}
    </span>
  );
};

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
        title="Software Development Company in Trivandrum, Kerala"
        description="TechnoByteInnovations delivers cutting-edge software solutions including web development, mobile apps, cloud solutions, and AI/ML services. Transform your business with innovative technology in Trivandrum, Kerala."
        canonicalUrl="/"
        keywords="software development company Kerala, web development Trivandrum, mobile app development India, AI ML solutions Kerala, cloud solutions"
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
              {/* Left */}
              <motion.div
                className="hero-content"
                initial={reduceMotion ? false : 'hidden'}
                animate="visible"
                variants={stagger}
                style={reduceMotion ? undefined : { x: contentX, y: contentY }}
              >
                <motion.div className="hero-badge" variants={fadeUp} custom={0}>
                  <span className="hero-badge-dot" />
                  <span className="hero-badge-text">Trivandrum, Kerala — Est. 2019</span>
                </motion.div>

                <motion.h1 className="hero-title" variants={linesStagger}>
                  <span className="hero-line">
                    <motion.span className="hero-line-inner" variants={lineReveal}>We Build</motion.span>
                  </span>
                  <span className="hero-line">
                    <motion.span className="hero-line-inner line-indigo" variants={lineReveal}>Digital</motion.span>
                  </span>
                  <span className="hero-line">
                    <motion.span className="hero-line-inner line-lime line-shine" variants={lineReveal}>
                      <RotatingWord />
                    </motion.span>
                  </span>
                </motion.h1>

                <motion.p className="hero-desc" variants={fadeUp} custom={2}>
                  From concept to launch — we craft scalable web apps, mobile products,
                  and AI-powered systems that drive real business growth.
                </motion.p>

                <motion.div className="hero-actions" variants={fadeUp} custom={3}>
                  <Magnetic>
                    <Link to="/contact" className="btn btn-primary btn-lg">
                      Start a Project →
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link to="/portfolio" className="btn btn-outline btn-lg">
                      View Work
                    </Link>
                  </Magnetic>
                </motion.div>
              </motion.div>

              {/* Right — Stats */}
              <motion.div
                className="hero-right"
                initial={reduceMotion ? false : 'hidden'}
                animate="visible"
                variants={stagger}
                style={reduceMotion ? undefined : { x: contentX, y: contentY }}
              >
                <motion.div className="hero-stats-grid" variants={fadeUp} custom={2}>
                  <div className="stat-tile">
                    <div className="stat-number"><Counter value={50} suffix="+" /></div>
                    <div className="stat-label">Projects Delivered</div>
                    <div className="stat-desc">Across 10+ industries — from startups to enterprises</div>
                  </div>
                  <div className="stat-tile">
                    <div className="stat-number"><Counter value={30} suffix="+" /></div>
                    <div className="stat-label">Happy Clients</div>
                  </div>
                  <div className="stat-tile">
                    <div className="stat-number"><Counter value={5} suffix="+" /></div>
                    <div className="stat-label">Years Experience</div>
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

      {/* ── Featured Projects ── */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-header">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={headingReveal}
            >
              <div className="section-label">Case Studies</div>
              <h2 className="projects-heading">
                Featured<br /><span style={{ color: 'var(--color-lime)' }}>Projects</span>
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={headingReveal}
              transition={{ delay: 0.12 }}
            >
              <Link to="/portfolio" className="btn btn-outline">
                Full Portfolio →
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="projects-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {projects.map((p, i) => (
              <motion.div key={i} className="project-row" variants={fadeUp} custom={i}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-row-link"
                  aria-label={`View ${p.title}`}
                >
                  <div className="project-thumb" style={{ background: p.gradient }} />
                  <div className="project-info">
                    {p.featured && <span className="project-featured">★ Flagship</span>}
                    <span className="project-index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="project-cat">{p.cat}</span>
                    <div className="project-name">{p.title}</div>
                    <p className="project-blurb">{p.blurb}</p>
                  </div>
                  <div className="project-tech-list">
                    {p.tech.map((t, j) => (
                      <span key={j} className="tech-chip">{t}</span>
                    ))}
                    <span className="project-open" aria-hidden="true">↗</span>
                  </div>
                </a>
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
