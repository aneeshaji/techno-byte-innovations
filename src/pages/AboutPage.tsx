import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './AboutPage.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const values = [
  { icon: '💡', title: 'Innovation', desc: 'Staying ahead of trends to deliver cutting-edge solutions that give you a competitive edge.' },
  { icon: '🎯', title: 'Quality', desc: 'Excellence in every line of code, design decision, and client interaction is our baseline.' },
  { icon: '🤝', title: 'Partnership', desc: 'Your success is our success. We build lasting relationships based on trust and mutual growth.' },
  { icon: '⚡', title: 'Agility', desc: 'Fast iterations and rapid deployment keep your project moving forward without compromise.' },
];

const milestones = [
  { year: '2019', title: 'Company Founded', desc: 'Started with a vision to transform businesses through technology from Trivandrum, Kerala.' },
  { year: '2020', title: 'First Major Client', desc: 'Delivered an enterprise solution that set the tone for our quality standards.' },
  { year: '2022', title: 'Team Expansion', desc: 'Grew to 20+ talented professionals across design, engineering, and cloud.' },
  { year: '2024', title: '50+ Projects Milestone', desc: 'Reached 50 successful project deliveries across 10+ industries worldwide.' },
];

const AboutPage = () => {
  return (
    <div className="about-page">
      <SEO
        title="About Us"
        description="Learn about TechnoByteInnovations — your trusted partner in digital transformation. We deliver innovative software solutions with expertise in web development, mobile apps, AI/ML, and cloud technologies in Kerala, India."
        canonicalUrl="/about"
        keywords="software company Kerala, IT company Trivandrum, technology consulting India, software development expertise, digital transformation Kerala"
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-glow" />
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div className="section-label" variants={fadeUp} custom={0}>Who We Are</motion.div>
            <motion.div className="page-hero-inner" variants={fadeUp} custom={1}>
              <div>
                <h1 className="page-title">
                  About<br /><span>Us</span>
                </h1>
              </div>
              <p className="page-subtitle">
                Passionate technologists dedicated to transforming businesses through
                innovative, high-quality software solutions — built to last.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="about-story section">
        <div className="container">
          <div className="story-grid">
            <motion.div
              className="story-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="section-label">Our Story</div>
              <h2>
                Built from<br /><span>Passion</span> &<br />Purpose
              </h2>
              <div className="story-metrics">
                {[
                  { val: '50+', label: 'Projects Delivered' },
                  { val: '30+', label: 'Happy Clients' },
                  { val: '5+', label: 'Years Experience' },
                  { val: '20+', label: 'Team Members' },
                ].map((m, i) => (
                  <div key={i} className="story-metric">
                    <div className="metric-val">{m.val}</div>
                    <div className="metric-label">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p className="story-text" variants={fadeUp}>
                TechnoByteInnovations was founded in 2019 with a simple yet powerful mission: to help
                businesses harness the full potential of technology. What started as a small team of
                passionate developers has grown into a full-service software development company
                serving clients worldwide.
              </motion.p>
              <motion.p className="story-text" variants={fadeUp}>
                We believe great software is more than just code — it's about understanding your
                business, your users, and your goals. Every project we undertake is an opportunity to
                create something exceptional that drives real business value.
              </motion.p>
              <motion.p className="story-text" variants={fadeUp}>
                From Trivandrum, Kerala, we serve clients across India and internationally, delivering
                software solutions that stand the test of time.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="section-label">Our Principles</div>
            <h2 className="values-heading">
              What We<br /><span>Believe In</span>
            </h2>
          </motion.div>

          <motion.div
            className="values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {values.map((v, i) => (
              <motion.div key={i} className="value-card" variants={fadeUp} custom={i}>
                <span className="value-icon">{v.icon}</span>
                <div className="value-title">{v.title}</div>
                <p className="value-desc">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="section-label">Milestones</div>
            <h2 className="timeline-heading">
              Our<br /><span>Journey</span>
            </h2>
          </motion.div>

          <motion.div
            className="timeline"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {milestones.map((m, i) => (
              <motion.div key={i} className="timeline-item" variants={fadeUp} custom={i}>
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-content">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="cta-heading">
              Let's Build<br /><span>Together</span>
            </h2>
            <p className="cta-sub">Ready to start your next project? We'd love to hear about it.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">Get In Touch →</Link>
              <Link to="/services" className="btn btn-outline btn-lg">Our Services</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
