import { Link } from 'react-router-dom';
import technobyteLogo from '../assets/technobyte-logo.svg';
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
              <Link to="/" className="footer-logo" aria-label="TechnoByteInnovations Home">
                <img src={technobyteLogo} alt="TechnoByte Logo" className="footer-logo-image" />
                <span className="footer-logo-text">
                  <span className="footer-logo-wordmark">Techno<span>Byte</span></span>
                  <span className="footer-logo-tagline">Innovations</span>
                </span>
              </Link>
              <p className="footer-brand-desc">
                Transforming ideas into digital reality through innovative software solutions. Based in Trivandrum, Kerala.
              </p>
              <div className="footer-social">
                <a href="#" className="social-btn" aria-label="LinkedIn" rel="noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.31h4.52V23H.24V8.31zM8.34 8.31h4.33v2h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.51v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23H8.34V8.31z"/></svg>
                </a>
                <a href="#" className="social-btn" aria-label="X (Twitter)" rel="noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231z"/></svg>
                </a>
                <a href="#" className="social-btn" aria-label="GitHub" rel="noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>
                </a>
              </div>
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
                  <a href="mailto:contact@technobyteinnovations.in">contact@technobyteinnovations.in</a>
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
