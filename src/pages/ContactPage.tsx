import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import SEO from '../components/SEO';
import Magnetic from '../components/Magnetic';
import PageHero from '../components/PageHero';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from '../utils/siteConfig';
import { faqPageSchema } from '../utils/seo';
import './ContactPage.css';

/**
 * Paste your Formspree endpoint URL (https://formspree.io/f/xxxx) here to have
 * submissions delivered server-side. Until then the form falls back to opening
 * the visitor's email app addressed to the contact inbox.
 */
const FORMSPREE_ENDPOINT = '';

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

const faqs = [
  {
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary based on scope and complexity. A typical web application takes 8–12 weeks, while mobile apps range from 12–16 weeks. We provide detailed timelines during the planning phase.',
  },
  {
    question: 'Do you offer ongoing support and maintenance?',
    answer: 'Yes! We offer comprehensive support and maintenance packages to ensure your application continues to perform optimally. This includes bug fixes, updates, and feature enhancements.',
  },
  {
    question: 'What technologies do you specialise in?',
    answer: 'We specialise in modern web frameworks (React, Next.js, Vue), mobile development (React Native, Flutter), cloud platforms (AWS, Azure, GCP), and AI/ML technologies (Python, TensorFlow, PyTorch).',
  },
  {
    question: 'How do you handle project communication?',
    answer: "You'll have a dedicated project manager, weekly status updates, and access to our project management tools. We're transparent and available for ad-hoc discussions whenever needed.",
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'mailto'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message,
      _subject: 'New enquiry — technobyteinnovations.in',
    };

    try {
      // 1. Primary: Use Native PHP mail endpoint
      const phpRes = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (phpRes.ok) {
        const data = await phpRes.json().catch(() => null);
        if (data && data.success !== false) {
          setStatus('success');
          return;
        }
      }

      // 2. Secondary fallback for local dev server where PHP is unhandled
      if (FORMSPREE_ENDPOINT) {
        const fsRes = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (fsRes.ok) {
          setStatus('success');
          return;
        }
      }

      const fbRes = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (fbRes.ok) {
        setStatus('success');
        return;
      }
      throw new Error('Submission failed');
    } catch {
      // Fallback: open visitor's mail client if network fails
      const subject = encodeURIComponent(`New enquiry from ${formData.name || 'website visitor'}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\n${formData.message}`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setStatus('mailto');
    }
  };

  return (
    <div className="contact-page">
      <SEO
        title="Contact Us — Start Your Project Today"
        description="Get in touch with TechnoByteInnovations for your software development needs. Located in Trivandrum, Kerala. Contact us for web development, mobile apps, cloud solutions, and AI/ML services."
        canonicalUrl="/contact"
        keywords="contact software company Kerala, IT services Trivandrum contact, software development inquiry"
        schema={faqPageSchema(faqs)}
      />

      {/* Hero */}
      <PageHero
        label="Say Hello"
        line1="Get In"
        line2="Touch"
        subtitle="Ready to start your next project? Have a question? We'd love to hear from you — let's make something great together."
      />

      {/* Contact Split */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-split">
            {/* Left: Info */}
            <motion.div
              className="contact-left"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeUp} custom={0}>
                <div className="section-label">Contact Info</div>
                <h2>Let's Build<br /><span>Something</span><br />Together</h2>
                <p className="contact-lead">
                  Drop us a message and we'll get back to you within 24 hours. No pressure, no commitments — just a conversation.
                </p>
              </motion.div>

              <motion.div className="contact-details" variants={fadeUp} custom={1}>
                <div className="contact-detail-row">
                  <div className="detail-icon">📧</div>
                  <div className="detail-text">
                    <span className="detail-label">Email</span>
                    <a className="detail-value detail-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </div>
                </div>
                <div className="contact-detail-row">
                  <div className="detail-icon">📞</div>
                  <div className="detail-text">
                    <span className="detail-label">Phone</span>
                    <a className="detail-value detail-link" href={PHONE_TEL}>{PHONE_DISPLAY}</a>
                  </div>
                </div>
                <div className="contact-detail-row">
                  <div className="detail-icon">💬</div>
                  <div className="detail-text">
                    <span className="detail-label">WhatsApp</span>
                    <a
                      className="detail-value detail-link"
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat with us — replies in minutes
                    </a>
                  </div>
                </div>
                <div className="contact-detail-row">
                  <div className="detail-icon">📍</div>
                  <div className="detail-text">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">Trivandrum, Kerala, India</span>
                  </div>
                </div>
                <div className="contact-detail-row">
                  <div className="detail-icon">🕐</div>
                  <div className="detail-text">
                    <span className="detail-label">Response Time</span>
                    <span className="detail-value">Within 24 hours</span>
                  </div>
                </div>
              </motion.div>

              <motion.div className="social-row" variants={fadeUp} custom={2}>
                <a href="#" className="social-item" aria-label="LinkedIn">in</a>
                <a href="#" className="social-item" aria-label="Twitter">𝕏</a>
                <a href="#" className="social-item" aria-label="GitHub">⌥</a>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
            >
              {status === 'success' ? (
                <div className="contact-form">
                  <div className="form-success">
                    <span className="success-icon">✅</span>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              ) : status === 'mailto' ? (
                <div className="contact-form">
                  <div className="form-success">
                    <span className="success-icon">📨</span>
                    <h3>Check Your Email App</h3>
                    <p>
                      Your email app should have opened with your message ready to send to{' '}
                      {CONTACT_EMAIL}. If it didn't, email us directly.
                    </p>
                  </div>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label" htmlFor="name">Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-input"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="email">Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="form-input"
                      placeholder="Your company (optional)"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                    />
                  </div>
                  {status === 'error' && (
                    <p className="form-error" role="alert">
                      Something went wrong sending your message. Please email us directly at{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or try again.
                    </p>
                  )}
                  <Magnetic>
                    <motion.button
                      type="submit"
                      className="btn btn-primary btn-lg form-submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={status === 'sending'}
                      id="contact-submit-btn"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send Message →'}
                    </motion.button>
                  </Magnetic>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="section-label">Questions</div>
            <h2 className="faq-heading">
              Frequently<br /><span>Asked</span>
            </h2>
          </motion.div>

          <motion.div
            className="faq-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div key={i} className="faq-item" variants={fadeUp} custom={i}>
                  <button
                    className="faq-trigger"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    id={`faq-${i}`}
                  >
                    <span className="faq-question">{faq.question}</span>
                    <span className={`faq-chevron ${isOpen ? 'open' : ''}`}>▼</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                      >
                        <p className="faq-answer">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
