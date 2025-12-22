import './Portfolio.css';

const Portfolio = () => {
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-featured online marketplace with real-time inventory, payment processing, and advanced analytics.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            title: 'Healthcare Management System',
            description: 'HIPAA-compliant patient management system with appointment scheduling and telemedicine features.',
            tech: ['Next.js', 'PostgreSQL', 'AWS', 'WebRTC'],
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            title: 'AI-Powered Analytics Dashboard',
            description: 'Real-time business intelligence platform with predictive analytics and machine learning insights.',
            tech: ['React', 'Python', 'TensorFlow', 'D3.js'],
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            title: 'Mobile Banking App',
            description: 'Secure mobile banking application with biometric authentication and instant transfers.',
            tech: ['React Native', 'Firebase', 'Node.js'],
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        {
            title: 'Social Media Platform',
            description: 'Community-driven platform with real-time messaging, content sharing, and engagement analytics.',
            tech: ['Vue.js', 'GraphQL', 'Redis', 'Socket.io'],
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        {
            title: 'IoT Device Management',
            description: 'Cloud-based platform for monitoring and controlling IoT devices with real-time data visualization.',
            tech: ['Angular', 'MQTT', 'InfluxDB', 'Docker'],
            gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
        }
    ];

    return (
        <section id="portfolio" className="section portfolio">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">
                        Showcasing our expertise through successful client projects
                    </p>
                </div>

                <div className="portfolio-grid">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card card"
                            style={{ animationDelay: `${index * 0.1}s` }}
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
