import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeadModal } from '../context/LeadModalContext';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from '../utils/siteConfig';
import './LeadModal.css';

const PROJECT_TYPES = [
  'Custom Web Application / SaaS',
  'Mobile App (iOS & Android)',
  'AI / Machine Learning Integration',
  'Enterprise ERP / CRM System',
  'Cloud Architecture & DevOps',
  'MVP for Startup / Other',
];

const BUDGET_RANGES = [
  '₹1,00,000 – ₹3,00,000 ($1.2k - $3.5k)',
  '₹3,00,000 – ₹8,00,000 ($3.5k - $10k)',
  '₹8,00,000 – ₹20,00,000 ($10k - $25k)',
  '₹20,00,000+ ($25k+)',
  'Flexible / Open to discussion',
];

const LeadModal = () => {
  const { isOpen, closeLeadModal, servicePreset } = useLeadModal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeLeadModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLeadModal]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const currentProjectType = formData.projectType || servicePreset || PROJECT_TYPES[0];

  const generateWhatsAppMessage = () => {
    const text = `Hello TechnoByte Innovations! I would like to request a project quote.\n\n*Name:* ${formData.name || 'Not provided'}\n*Email:* ${formData.email || 'Not provided'}\n*Phone:* ${formData.phone || 'Not provided'}\n*Project Type:* ${currentProjectType}\n*Budget:* ${formData.budget || 'Not specified'}\n*Requirements:* ${formData.message || 'Looking to discuss our project needs.'}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const leadPayload = {
      _subject: `New Lead: ${currentProjectType} from ${formData.name}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: currentProjectType,
      budget: formData.budget,
      message: formData.message,
    };

    try {
      // 1. Primary: Send through native PHP mail API
      const phpRes = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(leadPayload),
      });

      if (phpRes.ok) {
        const data = await phpRes.json().catch(() => null);
        if (data && data.success !== false) {
          setStatus('success');
          return;
        }
      }

      // 2. Secondary fallback for local dev environment
      const fbRes = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...leadPayload,
          _captcha: 'false',
        }),
      });

      if (fbRes.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="lead-modal-backdrop" onClick={closeLeadModal}>
          <motion.div
            className="lead-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              className="lead-modal-close"
              onClick={closeLeadModal}
              aria-label="Close quote modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="lead-modal-header">
              <div className="lead-badge">
                <span className="lead-pulse" />
                <span>Free Architecture Consultation · 24h Response</span>
              </div>
              <h2 id="lead-modal-title" className="lead-title">
                Get a Free Project Proposal & Estimate
              </h2>
              <p className="lead-desc">
                Tell us about your project requirements. Our principal engineering team will review your scope and provide a detailed timeline, architecture proposal, and transparent cost estimate within 24 hours.
              </p>
            </div>

            {status === 'success' ? (
              <div className="lead-success-box">
                <div className="lead-success-icon">✓</div>
                <h3>Proposal Request Received!</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Our senior solutions architect has received your inquiry and is reviewing your project details. We will contact you at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> within 24 hours.
                </p>
                <div className="lead-success-actions">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lead-btn-whatsapp"
                  >
                    <span>💬 Chat With Architect on WhatsApp Right Now</span>
                  </a>
                  <button type="button" className="btn btn-outline" onClick={closeLeadModal}>
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form className="lead-form" onSubmit={handleSubmit}>
                <div className="lead-form-grid">
                  {/* Name */}
                  <div className="lead-field">
                    <label htmlFor="lead-name">Your Full Name *</label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma / Alex Morgan"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="lead-field">
                    <label htmlFor="lead-email">Work Email *</label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="lead-field">
                    <label htmlFor="lead-phone">Phone / WhatsApp Number *</label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 99950 64344 or +1 ..."
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Project Type */}
                  <div className="lead-field">
                    <label htmlFor="lead-type">Project Scope / Service *</label>
                    <select
                      id="lead-type"
                      name="projectType"
                      value={currentProjectType}
                      onChange={handleChange}
                      required
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="lead-field full-width">
                    <label htmlFor="lead-budget">Estimated Budget Range</label>
                    <select
                      id="lead-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select an approximate budget range</option>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Requirements */}
                  <div className="lead-field full-width">
                    <label htmlFor="lead-message">Brief Project Requirements *</label>
                    <textarea
                      id="lead-message"
                      name="message"
                      rows={3}
                      required
                      placeholder="Describe what you want to build, existing systems, target launch date, and key features..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="lead-error-msg">
                    We encountered an issue submitting the form. You can chat with us directly on WhatsApp below or email us at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  </div>
                )}

                {/* Submit Actions */}
                <div className="lead-submit-row">
                  <button
                    type="submit"
                    className="lead-btn-primary"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Submitting Proposal Request…' : 'Submit for 24h Free Proposal →'}
                  </button>

                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lead-btn-whatsapp"
                    title="Send your project requirements directly to WhatsApp"
                  >
                    <span>💬 Chat on WhatsApp (+91 99950 64344)</span>
                  </a>
                </div>

                {/* Trust Footer */}
                <div className="lead-trust-strip">
                  <div className="trust-item">
                    <span className="trust-check">✓</span>
                    <span>100% Free Consultation</span>
                  </div>
                  <div className="trust-item">
                    <span className="trust-check">✓</span>
                    <span>Strict NDA & Code Ownership</span>
                  </div>
                  <div className="trust-item">
                    <span className="trust-check">✓</span>
                    <span>Direct Call: <a href={PHONE_TEL}>{PHONE_DISPLAY}</a></span>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;
