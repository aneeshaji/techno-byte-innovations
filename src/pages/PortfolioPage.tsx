import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerContainer, staggerItem, fadeInUp } from '../utils/animations';
import '../components/Portfolio.css';
import './PortfolioPage.css';

const PortfolioPage = () => {
    const [filter, setFilter] = useState('all');

    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-featured online marketplace with real-time inventory, payment processing, and advanced analytics dashboard.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            category: 'web',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            title: 'Healthcare Management System',
            description: 'HIPAA-compliant patient management system with appointment scheduling and telemedicine features.',
            tech: ['Next.js', 'PostgreSQL', 'AWS', 'WebRTC'],
            category: 'web',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            title: 'AI-Powered Analytics Dashboard',
            description: 'Real-time business intelligence platform with predictive analytics and machine learning insights.',
            tech: ['React', 'Python', 'TensorFlow', 'D3.js'],
            category: 'ai',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            title: 'Mobile Banking App',
            description: 'Secure mobile banking application with biometric authentication and instant transfers.',
            tech: ['React Native', 'Firebase', 'Node.js'],
            category: 'mobile',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        {
            title: 'Social Media Platform',
            description: 'Community-driven platform with real-time messaging, content sharing, and engagement analytics.',
            tech: ['Vue.js', 'GraphQL', 'Redis', 'Socket.io'],
            category: 'web',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        {
            title: 'IoT Device Management',
            description: 'Cloud-based platform for monitoring and controlling IoT devices with real-time data visualization.',
            tech: ['Angular', 'MQTT', 'InfluxDB', 'Docker'],
            category: 'cloud',
            gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
        }
    ];

    const categories = [
        { id: 'all', label: 'All Projects' },
        { id: 'web', label: 'Web' },
        { id: 'mobile', label: 'Mobile' },
        { id: 'ai', label: 'AI/ML' },
        { id: 'cloud', label: 'Cloud' }
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="portfolio-page">
            <SEO
                title="Our Portfolio"
                description="Explore our portfolio of successful projects including web applications, mobile apps, e-commerce solutions, and enterprise software. See how we've helped businesses transform with technology."
                canonicalUrl="/portfolio"
                keywords="software projects Kerala, web development portfolio, mobile app projects, technology case studies, successful IT projects Trivandrum"
            />
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="page-title">Our Portfolio</h1>
                        <p className="page-subtitle">
                            Showcasing our expertise through successful client projects and innovative solutions
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section portfolio">
                <div className="container">
                    <motion.div
                        className="filter-buttons"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        {categories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                                onClick={() => setFilter(cat.id)}
                                variants={staggerItem}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {cat.label}
                            </motion.button>
                        ))}
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filter}
                            className="portfolio-grid"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={staggerContainer}
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    className="project-card card"
                                    variants={staggerItem}
                                    layout
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
                    </AnimatePresence>
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
                        <h2>Have a Project in Mind?</h2>
                        <p>Let's discuss how we can bring your vision to life with our expertise.</p>
                        <Link to="/contact" className="btn btn-primary btn-lg">
                            Start Your Project
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PortfolioPage;
