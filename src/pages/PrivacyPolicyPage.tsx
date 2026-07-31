import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
import './LegalPage.css';

const PrivacyPolicyPage = () => {
    return (
        <div className="legal-page">
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="page-title">Privacy Policy</h1>
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
                        <h2>Introduction</h2>
                        <p>
                            TechnoByteInnovations ("we," "our," or "us") is committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                            when you visit our website or use our services.
                        </p>

                        <h2>Information We Collect</h2>
                        <h3>Personal Information</h3>
                        <p>
                            We may collect personal information that you voluntarily provide to us when you:
                        </p>
                        <ul>
                            <li>Fill out contact forms on our website</li>
                            <li>Subscribe to our newsletter</li>
                            <li>Request a quote or consultation</li>
                            <li>Engage with our services</li>
                        </ul>
                        <p>This information may include:</p>
                        <ul>
                            <li>Name and contact information (email address, phone number)</li>
                            <li>Company name and job title</li>
                            <li>Project requirements and specifications</li>
                            <li>Any other information you choose to provide</li>
                        </ul>

                        <h3>Automatically Collected Information</h3>
                        <p>
                            When you visit our website, we may automatically collect certain information about your device, including:
                        </p>
                        <ul>
                            <li>IP address</li>
                            <li>Browser type and version</li>
                            <li>Operating system</li>
                            <li>Pages visited and time spent on pages</li>
                            <li>Referring website addresses</li>
                        </ul>

                        <h2>How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Respond to your inquiries and provide customer support</li>
                            <li>Deliver our services and fulfill contractual obligations</li>
                            <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
                            <li>Improve our website and services</li>
                            <li>Analyze usage patterns and optimize user experience</li>
                            <li>Comply with legal obligations</li>
                        </ul>

                        <h2>Information Sharing and Disclosure</h2>
                        <p>
                            We do not sell, trade, or rent your personal information to third parties. We may share your
                            information with:
                        </p>
                        <ul>
                            <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website and providing services</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                        </ul>

                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal information
                            against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                            over the internet is 100% secure.
                        </p>

                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Object to processing of your personal information</li>
                            <li>Withdraw consent for marketing communications</li>
                        </ul>

                        <h2>Cookies and Tracking Technologies</h2>
                        <p>
                            We may use cookies and similar tracking technologies to enhance your experience on our website.
                            You can control cookie settings through your browser preferences.
                        </p>

                        <h2>Children's Privacy</h2>
                        <p>
                            Our services are not directed to individuals under the age of 18. We do not knowingly collect
                            personal information from children.
                        </p>

                        <h2>Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                            the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <p>
                            <strong>Email:</strong> contact@technobyteinnovations.in<br />
                            <strong>Location:</strong> Trivandrum, Kerala, India
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
