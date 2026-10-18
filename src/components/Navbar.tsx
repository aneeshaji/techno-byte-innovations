import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLeadModal } from '../context/LeadModalContext';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from '../utils/siteConfig';
import technobyteLogo from '../assets/technobyte-logo.svg';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Case Studies' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { openLeadModal } = useLeadModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleOpenQuote = () => {
    setIsMobileOpen(false);
    openLeadModal('General Software Project');
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* ── Top Trust & Contact Utility Bar ── */}
      <div className="header-top-bar" aria-label="Quick contact & credibility bar">
        <div className="container header-top-container">
          <div className="top-bar-left">
            <span className="rating-pill">
              <span className="stars" aria-hidden="true">★★★★★</span>
              <strong>4.9/5</strong> Rating (50+ Shipped Projects)
            </span>
            <span className="separator" aria-hidden="true">|</span>
            <span className="location-tag">
              📍 Trivandrum, Kerala · Global Delivery
            </span>
          </div>

          <div className="top-bar-right">
            <a href={PHONE_TEL} className="top-contact-link" title="Call our engineering desk">
              <span className="link-icon">📞</span>
              <span>{PHONE_DISPLAY}</span>
            </a>
            <span className="separator" aria-hidden="true">|</span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="top-contact-link whatsapp"
              title="Chat directly on WhatsApp"
            >
              <span className="link-icon">💬</span>
              <span>WhatsApp Quick Chat</span>
            </a>
            <span className="separator" aria-hidden="true">|</span>
            <span className="response-guarantee">
              ⚡ <strong>15-Min</strong> Response Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <nav className="header-main-nav" aria-label="Main Navigation">
        <div className="container header-nav-container">
          {/* Brand Logo & Authority Label */}
          <Link to="/" className="header-brand" aria-label="TechnoByte Innovations Homepage">
            <div className="brand-logo-emblem">
              <img src={technobyteLogo} alt="TechnoByte" className="brand-logo-img" />
              <span className="brand-logo-glow" aria-hidden="true" />
            </div>
            <div className="brand-text-block">
              <span className="brand-title">
                Techno<span className="brand-lime">Byte</span>
              </span>
              <span className="brand-tagline">ENTERPRISE SOFTWARE & AI</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="desktop-nav-menu">
            {navLinks.map(({ path, label }) => {
              const active = isActive(path);
              return (
                <Link
                  key={path}
                  to={path}
                  className={`desktop-nav-link ${active ? 'active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                  {active && <span className="active-dot" aria-hidden="true" />}
                </Link>
              );
            })}
          </div>

          {/* Right Direct Conversion Channels */}
          <div className="header-action-group">
            {/* Quick Call */}
            <a href={PHONE_TEL} className="nav-icon-action phone" title={`Call ${PHONE_DISPLAY}`}>
              <span className="icon">📞</span>
              <span className="label">Call Now</span>
            </a>

            {/* Quick WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon-action whatsapp"
              title="Chat with Solutions Architect on WhatsApp"
            >
              <span className="icon">💬</span>
              <span className="label">WhatsApp</span>
            </a>

            {/* Primary High-Converting CTA */}
            <button
              type="button"
              className="btn-get-quote"
              onClick={handleOpenQuote}
              aria-label="Request a free project estimate and proposal"
            >
              <span className="btn-text">Get Free Estimate</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>

            {/* Mobile Toggle */}
            <button
              type="button"
              className={`mobile-menu-toggle ${isMobileOpen ? 'active' : ''}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileOpen}
            >
              <span className="bar bar-1"></span>
              <span className="bar bar-2"></span>
              <span className="bar bar-3"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="mobile-nav-panel"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Top */}
              <div className="mobile-drawer-header">
                <div className="mobile-drawer-brand">
                  <span className="brand-title">Techno<span className="brand-lime">Byte</span></span>
                  <span className="status-micro">● Taking New Q2/Q3 Projects</span>
                </div>
                <button
                  type="button"
                  className="mobile-close-btn"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Direct Instant Action Bar in Mobile Menu */}
              <div className="mobile-fast-actions">
                <a href={PHONE_TEL} className="fast-btn phone">
                  <span>📞 Call: {PHONE_DISPLAY}</span>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fast-btn whatsapp"
                >
                  <span>💬 Chat on WhatsApp</span>
                </a>
              </div>

              {/* Mobile Route List */}
              <nav className="mobile-route-list">
                {navLinks.map(({ path, label }, idx) => {
                  const active = isActive(path);
                  return (
                    <Link
                      key={path}
                      to={path}
                      className={`mobile-route-link ${active ? 'active' : ''}`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <div className="route-left">
                        <span className="route-idx">0{idx + 1}</span>
                        <span className="route-label">{label}</span>
                      </div>
                      <span className="route-arrow">→</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="mobile-drawer-footer">
                <button
                  type="button"
                  className="mobile-quote-btn"
                  onClick={handleOpenQuote}
                >
                  <span>Request a Free Project Proposal →</span>
                </button>
                <div className="mobile-guarantee-note">
                  <span>⚡ 15-Minute Guaranteed Response Time</span>
                  <span>🔒 100% Free Consultation & NDA Protection</span>
                  <span>✉️ {CONTACT_EMAIL}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
