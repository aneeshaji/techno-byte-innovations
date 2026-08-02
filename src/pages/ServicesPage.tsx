import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Magnetic from '../components/Magnetic';
import PageHero from '../components/PageHero';
import { servicesPageSchema } from '../utils/seo';
import './ServicesPage.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
};

const services = [
  {
    num: '01', icon: '🌐',
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks like React, Next.js, and Node.js for scalable, high-performance solutions.',
    features: ['Responsive Design', 'Progressive Web Apps', 'E-commerce Solutions', 'CMS Integration']
  },
  {
    num: '02', icon: '📱',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.',
    features: ['iOS Development', 'Android Development', 'React Native', 'Flutter']
  },
  {
    num: '03', icon: '☁️',
    title: 'Cloud Solutions',
    description: 'Cloud infrastructure design, migration, and management using AWS, Azure, and Google Cloud Platform.',
    features: ['Cloud Migration', 'DevOps & CI/CD', 'Serverless Architecture', 'Container Orchestration']
  },
  {
    num: '04', icon: '🤖',
    title: 'AI & Machine Learning',
    description: 'Intelligent systems powered by machine learning, natural language processing, and computer vision technologies.',
    features: ['Predictive Analytics', 'NLP Solutions', 'Computer Vision', 'Chatbots & Automation']
  },
  {
    num: '05', icon: '🎨',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed with user-centered principles to maximize engagement and conversion.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
  },
  {
    num: '06', icon: '🔧',
    title: 'DevOps & Automation',
    description: 'CI/CD pipelines, infrastructure as code, and automated testing to streamline your development workflow.',
    features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring & Logging', 'Automated Testing']
  },
];

const ServicesPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="services-page">
      <SEO
        title="Web, Mobile, Cloud & AI Development Services"
        description="Expert software development services including custom web development, mobile apps, cloud solutions, AI/ML integration, and DevOps. Professional technology solutions in Trivandrum, Kerala."
        canonicalUrl="/services"
        keywords="web development services, mobile app development, cloud computing services, AI ML development, DevOps services Kerala"
        schema={servicesPageSchema(services)}
      />

      {/* Hero */}
      <PageHero
        label="What We Offer"
        line1="Our"
        line2="Services"
        subtitle="Comprehensive software solutions designed to transform your business and accelerate growth — from first line of code to production."
      />

      {/* Accordion Services */}
      <section className="services-accordion">
        <div className="container">
          <motion.div
            className="accordion-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {services.map((svc, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div key={i} className="accordion-item" variants={fadeUp} custom={i}>
                  <button
                    id={`service-${i}`}
                    className="accordion-trigger"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`service-body-${i}`}
                  >
                    <span className="acc-num">{svc.num}</span>
                    <span className="acc-icon">{svc.icon}</span>
                    <span className="accordion-title">{svc.title}</span>
                    <span className={`acc-chevron ${isOpen ? 'open' : ''}`}>▼</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`service-body-${i}`}
                        className="accordion-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                      >
                        <div className="accordion-content">
                          <div>
                            <p className="acc-desc">{svc.description}</p>
                            <ul className="acc-features">
                              {svc.features.map((f, j) => (
                                <li key={j}>{f}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="process-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="section-label">How We Work</div>
            <h2 className="process-heading">
              Our Process
            </h2>
          </motion.div>

          <motion.div
            className="process-steps"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {[
              { num: '01', title: 'Discovery', desc: 'Deep-dive into your goals, users, and constraints.' },
              { num: '02', title: 'Planning', desc: 'Architecture, roadmap, and sprint planning.' },
              { num: '03', title: 'Development', desc: 'Agile build with weekly demos and feedback loops.' },
              { num: '04', title: 'Launch & Support', desc: 'Deployment, monitoring, and ongoing maintenance.' },
            ].map((step, i) => (
              <motion.div key={i} className="tilt-cell" variants={fadeUp} custom={i}>
                <div className="process-step">
                  <div className="step-num">{step.num}</div>
                  <div className="step-title">{step.title}</div>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="cta-heading">
              Ready to Get<br /><span>Started?</span>
            </h2>
            <p className="cta-sub">
              Let's discuss how we can help bring your project to life with our expertise.
            </p>
            <div className="cta-actions">
              <Magnetic><Link to="/contact" className="btn btn-primary btn-lg">Contact Us Today →</Link></Magnetic>
              <Magnetic><Link to="/portfolio" className="btn btn-outline btn-lg">View Portfolio</Link></Magnetic>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
