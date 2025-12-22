import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="hero-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title animate-fadeInUp">
                        Transforming Ideas Into
                        <br />
                        <span className="gradient-text">Digital Reality</span>
                    </h1>

                    <p className="hero-subtitle animate-fadeInUp">
                        We craft cutting-edge software solutions that drive innovation and accelerate business growth.
                        From web and mobile applications to AI-powered systems, we turn your vision into reality.
                    </p>

                    <div className="hero-cta animate-fadeInUp">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Get Started
                        </button>
                        <button
                            className="btn btn-secondary btn-lg"
                            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Our Work
                        </button>
                    </div>
                </div>

                <div className="hero-stats">
                    <div className="stat-card glass">
                        <div className="stat-number gradient-text">50+</div>
                        <div className="stat-label">Projects Delivered</div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-number gradient-text">30+</div>
                        <div className="stat-label">Happy Clients</div>
                    </div>
                    <div className="stat-card glass">
                        <div className="stat-number gradient-text">5+</div>
                        <div className="stat-label">Years Experience</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
