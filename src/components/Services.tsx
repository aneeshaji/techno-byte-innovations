import './Services.css';

const Services = () => {
    const services = [
        {
            icon: '🌐',
            title: 'Web Development',
            description: 'Custom web applications built with modern frameworks like React, Next.js, and Node.js for scalable, high-performance solutions.'
        },
        {
            icon: '📱',
            title: 'Mobile Apps',
            description: 'Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.'
        },
        {
            icon: '☁️',
            title: 'Cloud Solutions',
            description: 'Cloud infrastructure design, migration, and management using AWS, Azure, and Google Cloud Platform.'
        },
        {
            icon: '🤖',
            title: 'AI & Machine Learning',
            description: 'Intelligent systems powered by machine learning, natural language processing, and computer vision technologies.'
        },
        {
            icon: '🎨',
            title: 'UI/UX Design',
            description: 'Beautiful, intuitive interfaces designed with user-centered principles to maximize engagement and conversion.'
        },
        {
            icon: '🔧',
            title: 'DevOps & Automation',
            description: 'CI/CD pipelines, infrastructure as code, and automated testing to streamline your development workflow.'
        }
    ];

    return (
        <section id="services" className="section services">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Services</h2>
                    <p className="section-subtitle">
                        Comprehensive software solutions tailored to your business needs
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
