import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeInUp } from '../utils/animations';
import '../components/About.css';
import './AboutPage.css';

const AboutPage = () => {
    const values = [
        {
            icon: '💡',
            title: 'Innovation',
            description: 'We stay ahead of technology trends to deliver cutting-edge solutions that give you a competitive advantage.'
        },
        {
            icon: '🎯',
            title: 'Quality',
            description: 'Excellence in every line of code, every design decision, and every client interaction is our standard.'
        },
        {
            icon: '🤝',
            title: 'Partnership',
            description: 'Your success is our success. We build lasting relationships based on trust and mutual growth.'
        },
        {
            icon: '⚡',
            title: 'Agility',
            description: 'Fast iterations, rapid deployment, and continuous improvement keep your project moving forward.'
        }
    ];

    const team = [
        { name: 'Sarah Johnson', role: 'CEO & Founder', icon: '👩‍💼' },
        { name: 'Michael Chen', role: 'CTO', icon: '👨‍💻' },
        { name: 'Emily Rodriguez', role: 'Lead Designer', icon: '👩‍🎨' },
        { name: 'David Kim', role: 'Senior Developer', icon: '👨‍💻' }
    ];

    const milestones = [
        { year: '2019', title: 'Company Founded', description: 'Started with a vision to transform businesses through technology' },
        { year: '2020', title: 'First Major Client', description: 'Delivered enterprise solution for Fortune 500 company' },
        { year: '2022', title: 'Team Expansion', description: 'Grew to 20+ talented professionals' },
        { year: '2024', title: '50+ Projects', description: 'Reached milestone of 50 successful project deliveries' }
    ];

    return (
        <div className="about-page">
            <SEO
                title="About Us"
                description="Learn about TechnoByteInnovations - your trusted partner in digital transformation. We deliver innovative software solutions with expertise in web development, mobile apps, AI/ML, and cloud technologies in Kerala, India."
                canonicalUrl="/about"
                keywords="software company Kerala, IT company Trivandrum, technology consulting India, software development expertise, digital transformation Kerala"
            />
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="page-title">About Us</h1>
                        <p className="page-subtitle">
                            Passionate technologists dedicated to transforming businesses through innovative software solutions
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section about-story">
                <div className="container">
                    <motion.div
                        className="story-content"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="section-title">Our Story</h2>
                        <p className="story-text">
                            TechnoByteInnovations was founded in 2019 with a simple yet powerful mission: to help businesses
                            harness the full potential of technology. What started as a small team of passionate developers
                            has grown into a full-service software development company serving clients worldwide.
                        </p>
                        <p className="story-text">
                            We believe that great software is more than just code—it's about understanding your business,
                            your users, and your goals. Every project we undertake is an opportunity to create something
                            exceptional that drives real business value.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section values-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="section-title">Our Values</h2>
                        <p className="section-subtitle">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <motion.div
                        className="values-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="value-card glass"
                                variants={staggerItem}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            >
                                <div className="value-icon">{value.icon}</div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-description">{value.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Meet Our Team Section - Commented for future use */}
            {/* <section className="section team-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="section-title">Meet Our Team</h2>
                        <p className="section-subtitle">
                            Talented professionals passionate about technology
                        </p>
                    </motion.div>

                    <motion.div
                        className="team-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                className="team-card glass"
                                variants={staggerItem}
                                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                            >
                                <div className="team-avatar">{member.icon}</div>
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section> */}

            <section className="section timeline-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="section-title">Our Journey</h2>
                        <p className="section-subtitle">
                            Key milestones in our growth story
                        </p>
                    </motion.div>

                    <motion.div
                        className="timeline"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                className="timeline-item"
                                variants={staggerItem}
                            >
                                <div className="timeline-year gradient-text">{milestone.year}</div>
                                <div className="timeline-content glass">
                                    <h3>{milestone.title}</h3>
                                    <p>{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
