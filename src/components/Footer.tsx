import { Link } from 'react-router-dom';
import technobyteLogo from '../assets/technobyte-logo.svg';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from '../utils/siteConfig';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Big CTA Strip */}
      <div className="footer-cta">
        <div className="footer-cta-glow" />
        <div className="container">
          <div className="footer-cta-label">Ready to build?</div>
          <h2 className="footer-cta-heading">
            Let's Make <span className="lime">Something</span><br />
            Great Together.
          </h2>
          <div className="footer-cta-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start a Project →
            </Link>
            <Link to="/portfolio" className="btn btn-outline btn-lg">
              View Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Body */}
      <div className="footer-body">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo" aria-label="Technobyte Innovations Home">
                <img src={technobyteLogo} alt="Technobyte Innovations" className="footer-logo-image" />
                <span className="footer-logo-text">
                  <span className="footer-logo-wordmark">Technobyte <span>Innovations</span></span>
                  <span className="footer-logo-tagline">Software & AI Engineering</span>
                </span>
              </Link>
              <p className="footer-brand-desc">
                Transforming ideas into digital reality through innovative software solutions. Based in Trivandrum, Kerala.
              </p>

            </div>

            {/* Quick Links */}
            <div>
              <div className="footer-col-heading">Navigation</div>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <div className="footer-col-heading">Services</div>
              <ul className="footer-links">
                <li><Link to="/services">Web Development</Link></li>
                <li><Link to="/services">Mobile Apps</Link></li>
                <li><Link to="/services">Cloud Solutions</Link></li>
                <li><Link to="/services">AI & ML</Link></li>
                <li><Link to="/services">UI/UX Design</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="footer-col-heading">Contact</div>
              <ul className="footer-links footer-contact-links">
                <li>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </li>
                <li>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
                </li>
                <li>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 0 1 8 8 1 1 0 0 1-2 0 6 6 0 0 0-6-6 1 1 0 0 1 0-2Zm-5.66 4.34a1 1 0 0 1 0-1.41 9 9 0 0 1 12.73 0 1 1 0 0 1-1.41 1.41 7 7 0 0 0-9.9 0 1 1 0 0 1-1.42 0Z"/></svg>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
                </li>
                <li>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Trivandrum, Kerala, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container">
        <div className="footer-bottom">
          <span className="footer-copyright">
            © {year} TechnoByteInnovations. All rights reserved.
          </span>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
