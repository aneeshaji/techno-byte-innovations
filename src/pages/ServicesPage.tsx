import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerContainer, staggerItem, fadeInUp } from '../utils/animations';
import SEO from '../components/SEO';
import '../components/Services.css';
import './ServicesPage.css';

const ServicesPage = () => {
    const services = [
        {
            icon: '🌐',
            title: 'Web Development',
            description: 'Custom web applications built with modern frameworks like React, Next.js, and Node.js for scalable, high-performance solutions.',
            features: ['Responsive Design', 'Progressive Web Apps', 'E-commerce Solutions', 'CMS Integration']
        },
        {
            icon: '📱',
            title: 'Mobile Apps',
            description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.',
            features: ['iOS Development', 'Android Development', 'React Native', 'Flutter']
        },
        {
            icon: '☁️',
            title: 'Cloud Solutions',
            description: 'Cloud infrastructure design, migration, and management using AWS, Azure, and Google Cloud Platform.',
            features: ['Cloud Migration', 'DevOps', 'Serverless Architecture', 'Container Orchestration']
        },
        {
            icon: '🤖',
            title: 'AI & Machine Learning',
            description: 'Intelligent systems powered by machine learning, natural language processing, and computer vision technologies.',
            features: ['Predictive Analytics', 'NLP Solutions', 'Computer Vision', 'Chatbots & Automation']
        },
        {
            icon: '🎨',
            title: 'UI/UX Design',
            description: 'Beautiful, intuitive interfaces designed with user-centered principles to maximize engagement and conversion.',
            features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
        },
        {
            icon: '🔧',
            title: 'DevOps & Automation',
            description: 'CI/CD pipelines, infrastructure as code, and automated testing to streamline your development workflow.',
            features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring & Logging', 'Automated Testing']
        }
    ];

    return (
        <div className="services-page">
            <SEO
                title="Our Services"
                description="Expert software development services including custom web development, mobile apps, cloud solutions, AI/ML integration, and DevOps. Professional technology solutions in Trivandrum, Kerala."
                canonicalUrl="/services"
                keywords="web development services, mobile app development, cloud computing services, AI ML development, DevOps services Kerala, software consulting Trivandrum"
            />
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="page-title">Our Services</h1>
                        <p className="page-subtitle">
                            Comprehensive software solutions designed to transform your business and drive growth
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section services">
                <div className="container">
                    <motion.div
                        className="services-grid-detailed"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="service-card-detailed card"
                                variants={staggerItem}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            >
                                <div className="service-icon-large">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <ul className="service-features">
                                    {service.features.map((feature, i) => (
                                        <li key={i}>
                                            <span className="feature-check">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="section process-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="section-title">Our Process</h2>
                        <p className="section-subtitle">
                            A proven methodology that delivers results
                        </p>
                    </motion.div>

                    <motion.div
                        className="process-steps"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {[
                            { step: '01', title: 'Discovery', description: 'Understanding your goals and requirements' },
                            { step: '02', title: 'Planning', description: 'Strategic roadmap and technical architecture' },
                            { step: '03', title: 'Development', description: 'Agile development with regular updates' },
                            { step: '04', title: 'Launch', description: 'Deployment and ongoing support' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="process-step glass"
                                variants={staggerItem}
                            >
                                <div className="step-number gradient-text">{item.step}</div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="section cta-section">
                <div className="container">
                    <motion.div
                        className="cta-box glass"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2>Ready to Get Started?</h2>
                        <p>Let's discuss how we can help bring your project to life.</p>
                        <Link to="/contact" className="btn btn-primary btn-lg">
                            Contact Us Today
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
