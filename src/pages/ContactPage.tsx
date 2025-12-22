import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeInUp } from '../utils/animations';
import SEO from '../components/SEO';
import '../components/Contact.css';
import './ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', company: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const faqs = [
        {
            question: 'What is your typical project timeline?',
            answer: 'Project timelines vary based on scope and complexity. A typical web application takes 8-12 weeks, while mobile apps range from 12-16 weeks. We provide detailed timelines during the planning phase.'
        },
        {
            question: 'Do you offer ongoing support and maintenance?',
            answer: 'Yes! We offer comprehensive support and maintenance packages to ensure your application continues to perform optimally. This includes bug fixes, updates, and feature enhancements.'
        },
        {
            question: 'What technologies do you specialize in?',
            answer: 'We specialize in modern web frameworks (React, Next.js, Vue), mobile development (React Native, Flutter), cloud platforms (AWS, Azure, GCP), and AI/ML technologies (Python, TensorFlow).'
        },
        {
            question: 'How do you handle project communication?',
            answer: 'We believe in transparent communication. You\'ll have a dedicated project manager, regular status updates, and access to our project management tools. We typically have weekly check-ins and are available for ad-hoc discussions.'
        }
    ];

    return (
        <div className="contact-page">
            <SEO
                title="Contact Us"
                description="Get in touch with TechnoByteInnovations for your software development needs. Located in Trivandrum, Kerala. Contact us for web development, mobile apps, cloud solutions, and AI/ML services."
                canonicalUrl="/contact"
                keywords="contact software company Kerala, IT services Trivandrum contact, software development inquiry, tech consulting Kerala"
            />
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="page-title">Get In Touch</h1>
                        <p className="page-subtitle">
                            Ready to start your next project? Let's build something amazing together.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section contact">
                <div className="container">
                    <div className="contact-content">
                        <motion.div
                            className="contact-info"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div className="info-card glass" variants={staggerItem}>
                                <div className="info-icon">📧</div>
                                <h3>Email Us</h3>
                                <p>contact@technobyteinnovations.com</p>
                            </motion.div>

                            <motion.div className="info-card glass" variants={staggerItem}>
                                <div className="info-icon">📍</div>
                                <h3>Visit Us</h3>
                                <p>Trivandrum, Kerala, India</p>
                            </motion.div>
                            <motion.div className="social-links" variants={staggerItem}>
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
                            </motion.div>
                        </motion.div>

                        <motion.form
                            className="contact-form glass"
                            onSubmit={handleSubmit}
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
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
                            <motion.button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send Message
                            </motion.button>
                        </motion.form>
                    </div>
                </div>
            </section>

            <section className="section faq-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="section-title">Frequently Asked Questions</h2>
                        <p className="section-subtitle">
                            Quick answers to common questions
                        </p>
                    </motion.div>

                    <motion.div
                        className="faq-list"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className="faq-item glass"
                                variants={staggerItem}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span>{faq.question}</span>
                                    <span className={`faq-icon ${openFaq === index ? 'open' : ''}`}>
                                        ▼
                                    </span>
                                </button>
                                <motion.div
                                    className="faq-answer"
                                    initial={false}
                                    animate={{
                                        height: openFaq === index ? 'auto' : 0,
                                        opacity: openFaq === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p>{faq.answer}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
