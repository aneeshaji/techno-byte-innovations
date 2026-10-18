import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Magnetic from '../components/Magnetic';
import PageHero from '../components/PageHero';
import { portfolioPageSchema } from '../utils/seo';
import './PortfolioPage.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const projects = [
  {
    title: 'ATSense',
    desc: 'Our flagship AI hiring platform that clears candidate filters instantly, matching the right talent to the right role.',
    tech: ['AI/ML', 'React', 'Cloud'],
    category: 'ai',
    cat: 'AI / ML',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    url: 'https://atsense.online/',
    featured: true,
  },
  {
    title: 'FramezLabs',
    desc: 'Custom photo frames & personalized gifts marketplace — a complete storefront serving customers across India.',
    tech: ['React', 'Node.js', 'Payments'],
    category: 'web',
    cat: 'Web',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    url: 'https://framezlabs.store/',
  },
  {
    title: 'Balancely CRM',
    desc: 'Accounts panel and CRM for managing customers, billing and relationships from a single dashboard.',
    tech: ['Next.js', 'PostgreSQL', 'AWS'],
    category: 'cloud',
    cat: 'Cloud',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    url: 'https://balancely-crm.technobyteinnovations.in/',
  },
  {
    title: 'FramezLabs ERP',
    desc: 'Enterprise resource planning system powering operations — inventory, orders, production and reporting.',
    tech: ['React', 'Node.js', 'MongoDB'],
    category: 'cloud',
    cat: 'Cloud',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    url: 'https://erp.framezlabs.store/',
  },
  {
    title: 'Thurayilkunnu Temple',
    desc: 'Official digital heritage portal and online vazhipadu booking platform for Thurayilkunnu Sree Subrahmanya Swami Temple, serving devotees globally.',
    tech: ['React', 'PWA', 'Cloud'],
    category: 'web',
    cat: 'Web',
    gradient: 'linear-gradient(135deg, #ff9a44 0%, #fc6076 100%)',
    url: 'https://thurayilkunnutemple.com/',
  },
  {
    title: 'Paperstall',
    desc: 'A reading destination where sellers and readers connect to discover and shop their next great book.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    category: 'web',
    cat: 'Web',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    url: 'https://paperstall.com/',
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'cloud', label: 'Cloud' },
];

const PortfolioPage = () => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="portfolio-page">
      <SEO
        title="Our Portfolio — Successful Projects & Case Studies"
        description="Explore our portfolio of successful projects including web applications, mobile apps, e-commerce solutions, and enterprise software. See how we've helped businesses transform with technology."
        canonicalUrl="/portfolio"
        keywords="software projects Kerala, web development portfolio, mobile app projects, technology case studies"
        schema={portfolioPageSchema(projects)}
      />

      {/* Hero */}
      <PageHero
        label="Our Work"
        line1="Our"
        line2="Portfolio"
        subtitle="Showcasing our expertise through successful client projects — each built to solve real problems and create lasting impact."
      />

      {/* Projects */}
      <section className="portfolio-section">
        <div className="container">
          {/* Filter */}
          <motion.div
            className="filter-bar"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                className={`filter-pill ${filter === cat.id ? 'active' : ''}`}
                onClick={() => setFilter(cat.id)}
                variants={fadeUp}
                whileTap={{ scale: 0.96 }}
                id={`filter-${cat.id}`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="portfolio-grid"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              variants={stagger}
            >
              {filtered.map((proj, i) => (
                <motion.div
                  key={proj.title}
                  className="portfolio-card"
                  variants={fadeUp}
                  custom={i}
                  layout
                >
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-card-link"
                    aria-label={`View ${proj.title}`}
                  >
                    <div className="portfolio-thumb" style={{ background: proj.gradient }}>
                      {proj.featured && <span className="portfolio-flagship">★ Flagship</span>}
                      <div className="portfolio-thumb-overlay">
                        <span>View Project ↗</span>
                      </div>
                    </div>
                    <div className="portfolio-card-body">
                      <span className="portfolio-cat">{proj.cat}</span>
                      <div className="portfolio-title">{proj.title}</div>
                      <p className="portfolio-desc">{proj.desc}</p>
                      <div className="portfolio-chips">
                        {proj.tech.map((t, j) => (
                          <span key={j} className="portfolio-chip">{t}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="portfolio-cta">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="cta-heading">
              Have a Project<br /><span>In Mind?</span>
            </h2>
            <p className="cta-sub">
              Let's discuss how we can bring your vision to life with our expertise.
            </p>
            <div className="cta-actions">
              <Magnetic><Link to="/contact" className="btn btn-primary btn-lg">Start Your Project →</Link></Magnetic>
              <Magnetic><Link to="/services" className="btn btn-outline btn-lg">Our Services</Link></Magnetic>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
