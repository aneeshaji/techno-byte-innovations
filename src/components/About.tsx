import './About.css';

const About = () => {
    const values = [
        {
            icon: '💡',
            title: 'Innovation',
            description: 'We stay ahead of technology trends to deliver cutting-edge solutions.'
        },
        {
            icon: '🎯',
            title: 'Quality',
            description: 'Excellence in every line of code, every design, every interaction.'
        },
        {
            icon: '🤝',
            title: 'Partnership',
            description: 'Your success is our success. We build lasting relationships.'
        },
        {
            icon: '⚡',
            title: 'Agility',
            description: 'Fast iterations, rapid deployment, continuous improvement.'
        }
    ];

    return (
        <section id="about" className="section about">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h2 className="section-title">About TechnoByteInnovations</h2>
                        <p className="about-description">
                            We are a team of passionate software engineers, designers, and innovators dedicated to
                            transforming businesses through technology. With over 5 years of experience, we've helped
                            companies across industries achieve their digital transformation goals.
                        </p>
                        <p className="about-description">
                            Our expertise spans the full software development lifecycle, from initial concept and
                            design to deployment and ongoing support. We pride ourselves on delivering solutions
                            that are not just functional, but exceptional.
                        </p>
                    </div>

                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="value-card glass"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="value-icon">{value.icon}</div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-description">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
