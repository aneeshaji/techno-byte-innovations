import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', company: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="section contact">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">
                        Ready to start your next project? Let's build something amazing together.
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="info-card glass">
                            <div className="info-icon">📧</div>
                            <h3>Email Us</h3>
                            <p>contact@technobyteinnovations.com</p>
                        </div>

                        <div className="info-card glass">
                            <div className="info-icon">📍</div>
                            <h3>Visit Us</h3>
                            <p>Trivandrum, Kerala, India</p>
                        </div>
                        <div className="social-links">
                            <a href="#" className="social-link glass" aria-label="LinkedIn">
                                <span>💼</span>
                            </a>
                            <a href="#" className="social-link glass" aria-label="Twitter">
                                <span>🐦</span>
                            </a>
                            <a href="#" className="social-link glass" aria-label="GitHub">
                                <span>💻</span>
                            </a>
                            <a href="#" className="social-link glass" aria-label="Facebook">
                                <span>📘</span>
                            </a>
                        </div>
                    </div>

                    <form className="contact-form glass" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Your company (optional)"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                placeholder="Tell us about your project..."
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
