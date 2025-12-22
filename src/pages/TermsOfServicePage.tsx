import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
import './LegalPage.css';

const TermsOfServicePage = () => {
    return (
        <div className="legal-page">
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="page-title">Terms of Service</h1>
                        <p className="page-subtitle">
                            Last updated: December 22, 2025
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section legal-content">
                <div className="container">
                    <motion.div
                        className="content-box glass"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h2>Agreement to Terms</h2>
                        <p>
                            By accessing and using the TechnoByteInnovations website and services, you agree to be bound by
                            these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>

                        <h2>Services Description</h2>
                        <p>
                            TechnoByteInnovations provides software development services, including but not limited to:
                        </p>
                        <ul>
                            <li>Web application development</li>
                            <li>Mobile application development</li>
                            <li>Cloud solutions and infrastructure</li>
                            <li>AI and Machine Learning solutions</li>
                            <li>UI/UX design services</li>
                            <li>DevOps and automation services</li>
                        </ul>

                        <h2>Use of Services</h2>
                        <h3>Acceptable Use</h3>
                        <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                        <ul>
                            <li>Violate any applicable laws or regulations</li>
                            <li>Infringe upon the rights of others</li>
                            <li>Transmit any harmful or malicious code</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Use our services for any fraudulent or illegal activity</li>
                        </ul>

                        <h3>Account Responsibilities</h3>
                        <p>
                            If you create an account with us, you are responsible for maintaining the confidentiality of your
                            account credentials and for all activities that occur under your account.
                        </p>

                        <h2>Intellectual Property Rights</h2>
                        <h3>Our Property</h3>
                        <p>
                            All content on our website, including text, graphics, logos, images, and software, is the property
                            of TechnoByteInnovations or its licensors and is protected by intellectual property laws.
                        </p>

                        <h3>Client Projects</h3>
                        <p>
                            For custom development projects, intellectual property rights will be specified in the individual
                            project agreement. Upon full payment, clients typically receive ownership of the final deliverables,
                            unless otherwise specified.
                        </p>

                        <h2>Payment Terms</h2>
                        <p>
                            Payment terms for our services will be outlined in individual project agreements. General terms include:
                        </p>
                        <ul>
                            <li>Prices are quoted in the currency specified in the agreement</li>
                            <li>Payment schedules may include upfront deposits and milestone payments</li>
                            <li>Late payments may incur additional fees</li>
                            <li>All fees are non-refundable unless otherwise stated</li>
                        </ul>

                        <h2>Project Delivery and Warranties</h2>
                        <h3>Delivery Timeline</h3>
                        <p>
                            We strive to meet agreed-upon deadlines. However, timelines may be adjusted based on project
                            complexity, scope changes, or client feedback delays.
                        </p>

                        <h3>Warranties</h3>
                        <p>
                            We warrant that our services will be performed in a professional and workmanlike manner. Specific
                            warranties for delivered software will be outlined in individual project agreements.
                        </p>

                        <h2>Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, TechnoByteInnovations shall not be liable for any indirect,
                            incidental, special, consequential, or punitive damages arising out of or relating to your use of
                            our services.
                        </p>

                        <h2>Confidentiality</h2>
                        <p>
                            We respect the confidentiality of your business information and project details. We will not disclose
                            confidential information to third parties without your consent, except as required by law or as
                            necessary to provide our services.
                        </p>

                        <h2>Termination</h2>
                        <p>
                            Either party may terminate a service agreement according to the terms specified in the individual
                            project agreement. Upon termination:
                        </p>
                        <ul>
                            <li>You remain responsible for payment of services rendered up to the termination date</li>
                            <li>We will deliver any completed work as specified in the agreement</li>
                            <li>Both parties will return or destroy confidential information</li>
                        </ul>

                        <h2>Modifications to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms of Service at any time. Changes will be effective
                            immediately upon posting to our website. Your continued use of our services constitutes acceptance
                            of the modified terms.
                        </p>

                        <h2>Governing Law</h2>
                        <p>
                            These Terms of Service shall be governed by and construed in accordance with the laws of India.
                            Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts
                            in Kerala, India.
                        </p>

                        <h2>Contact Information</h2>
                        <p>
                            For questions about these Terms of Service, please contact us at:
                        </p>
                        <p>
                            <strong>Email:</strong> contact@technobyteinnovations.com<br />
                            <strong>Location:</strong> Trivandrum, Kerala, India
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default TermsOfServicePage;
