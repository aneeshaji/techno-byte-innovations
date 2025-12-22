import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerContainer, staggerItem, fadeInUp } from '../utils/animations';
import SEO from '../components/SEO';
import '../components/Hero.css';
import '../components/Services.css';
import '../components/Portfolio.css';
import './HomePage.css';

const HomePage = () => {
    const featuredServices = [
        {
            icon: '🌐',
            title: 'Web Development',
            description: 'Custom web applications built with modern frameworks for scalable solutions.'
        },
        {
            icon: '📱',
            title: 'Mobile Apps',
            description: 'Native and cross-platform mobile applications for iOS and Android.'
        },
        {
            icon: '🤖',
            title: 'AI & Machine Learning',
            description: 'Intelligent systems powered by cutting-edge AI technologies.'
        }
    ];

    const featuredProjects = [
        {
            title: 'E-Commerce Platform',
            description: 'Full-featured online marketplace with real-time inventory and analytics.',
            tech: ['React', 'Node.js', 'MongoDB'],
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            title: 'Healthcare System',
            description: 'HIPAA-compliant patient management with telemedicine features.',
            tech: ['Next.js', 'PostgreSQL', 'AWS'],
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            title: 'AI Analytics Dashboard',
            description: 'Real-time business intelligence with predictive analytics.',
            tech: ['React', 'Python', 'TensorFlow'],
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
    ];

    return (
        <div className="home-page">
            <SEO
                title="Home"
                description="TechnoByteInnovations delivers cutting-edge software solutions including web development, mobile apps, cloud solutions, and AI/ML services. Transform your business with innovative technology in Trivandrum, Kerala."
                canonicalUrl="/"
                keywords="software development company Kerala, web development Trivandrum, mobile app development India, AI ML solutions Kerala, cloud solutions Trivandrum, custom software development"
            />
            {/* Hero Section */}
            <section id="hero" className="hero">
                <div className="hero-background">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="gradient-orb orb-3"></div>
                </div>

                <div className="container hero-container">
                    <motion.div
                        className="hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.h1 className="hero-title" variants={fadeInUp}>
                            Transforming Ideas Into
                            <br />
                            <span className="gradient-text">Digital Reality</span>
                        </motion.h1>

                        <motion.p className="hero-subtitle" variants={fadeInUp}>
                            We craft cutting-edge software solutions that drive innovation and accelerate business growth.
                            From web and mobile applications to AI-powered systems, we turn your vision into reality.
                        </motion.p>

                        <motion.div className="hero-cta" variants={fadeInUp}>
                            <Link to="/contact" className="btn btn-primary btn-lg">
                                Get Started
                            </Link>
                            <Link to="/portfolio" className="btn btn-secondary btn-lg">
                                View Our Work
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-stats"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div className="stat-card glass" variants={staggerItem}>
                            <div className="stat-number gradient-text">50+</div>
                            <div className="stat-label">Projects Delivered</div>
                        </motion.div>
                        <motion.div className="stat-card glass" variants={staggerItem}>
                            <div className="stat-number gradient-text">30+</div>
                            <div className="stat-label">Happy Clients</div>
                        </motion.div>
                        <motion.div className="stat-card glass" variants={staggerItem}>
                            <div className="stat-number gradient-text">5+</div>
                            <div className="stat-label">Years Experience</div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Services */}
            <section className="section featured-services">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                    >
                        <h2 className="section-title">Our Expertise</h2>
                        <p className="section-subtitle">
                            Comprehensive software solutions tailored to your business needs
                        </p>
                    </motion.div>

                    <motion.div
                        className="services-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {featuredServices.map((service, index) => (
                            <motion.div
                                key={index}
                                className="service-card card"
                                variants={staggerItem}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            >
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="cta-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <Link to="/services" className="btn btn-primary">
                            View All Services
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="section featured-projects">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                    >
                        <h2 className="section-title">Featured Projects</h2>
                        <p className="section-subtitle">
                            Showcasing our best work and successful client partnerships
                        </p>
                    </motion.div>

                    <motion.div
                        className="portfolio-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                className="project-card card"
                                variants={staggerItem}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            >
                                <div
                                    className="project-header"
                                    style={{ background: project.gradient }}
                                ></div>
                                <div className="project-content">
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <div className="project-tech">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="cta-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <Link to="/portfolio" className="btn btn-primary">
                            View All Projects
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <motion.div
                        className="cta-box glass"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2>Ready to Start Your Project?</h2>
                        <p>Let's build something amazing together. Get in touch with our team today.</p>
                        <Link to="/contact" className="btn btn-primary btn-lg">
                            Contact Us
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
