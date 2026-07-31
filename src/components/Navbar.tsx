import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import technobyteLogo from '../assets/technobyte-logo.svg';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo — grouped icon + stacked wordmark */}
          <Link to="/" className="navbar-logo" aria-label="TechnoByteInnovations Home">
            <img src={technobyteLogo} alt="TechnoByte Logo" className="navbar-logo-image" />
            <span className="navbar-logo-text">
              <span className="navbar-logo-wordmark">
                Techno<span>Byte</span>
              </span>
              <span className="navbar-logo-tagline">Innovations</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-menu">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${isActive(path) ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="navbar-cta">
            <Link to="/contact" className="btn btn-primary btn-nav">
              Let's Talk
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`mobile-menu-toggle ${isMobileOpen ? 'open' : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isMobileOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div className={`mobile-overlay ${isMobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="mobile-overlay-inner">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`mobile-nav-link ${isActive(path) ? 'active' : ''}`}
            >
              <span>{label}</span>
              <span className="arrow">→</span>
            </Link>
          ))}
          <div className="mobile-bottom">
            <span className="mobile-contact">contact@technobyteinnovations.in</span>
            <span className="mobile-contact">Trivandrum, Kerala, India</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
