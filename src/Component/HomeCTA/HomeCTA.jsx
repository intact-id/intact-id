import { Link } from 'react-router-dom';
import './HomeCTA.css';

const HomeCTA = () => {
    return (
        <section className="home-cta-section">
            <div className="home-cta-container">
                <div className="home-cta-content">
                    <div className="cta-icon-wrapper">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <path d="M40 10L15 22V38C15 52 27 62 40 70C53 62 65 52 65 38V22L40 10Z" stroke="url(#ctaShield)" strokeWidth="3" />
                            <path d="M30 40L36 46L50 32" stroke="url(#ctaShield)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="40" cy="40" r="35" stroke="url(#ctaShield)" strokeWidth="2" opacity="0.3" />
                            <defs>
                                <linearGradient id="ctaShield">
                                    <stop offset="0%" stopColor="#6366F1" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <h2 className="home-cta-title">
                        Ready to Transform Your
                        <span className="gradient-text"> Verification Process?</span>
                    </h2>

                    <p className="home-cta-description">
                        Join thousands of companies using Intact ID to verify identities securely,
                        compliantly, and instantly. Start building trust today.
                    </p>

                    <div className="home-cta-buttons">
                        <Link to="/apply" className="home-cta-btn primary">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Get Started Free
                        </Link>
                        <Link to="/contact" className="home-cta-btn secondary">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M3 8L10 2L17 8V16C17 16.5304 16.7893 17.0391 16.4142 17.4142C16.0391 17.7893 15.5304 18 15 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 18V10H13V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Talk to Sales
                        </Link>
                    </div>

                    <div className="home-cta-stats">
                        <div className="cta-stat">
                            <span className="cta-stat-value">10M+</span>
                            <span className="cta-stat-label">Verifications</span>
                        </div>
                        <div className="cta-stat-divider"></div>
                        <div className="cta-stat">
                            <span className="cta-stat-value">99.9%</span>
                            <span className="cta-stat-label">Accuracy</span>
                        </div>
                        <div className="cta-stat-divider"></div>
                        <div className="cta-stat">
                            <span className="cta-stat-value">&lt;2s</span>
                            <span className="cta-stat-label">Verification</span>
                        </div>
                        <div className="cta-stat-divider"></div>
                        <div className="cta-stat">
                            <span className="cta-stat-value">200+</span>
                            <span className="cta-stat-label">Countries</span>
                        </div>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="cta-bg-orb cta-orb-1"></div>
                <div className="cta-bg-orb cta-orb-2"></div>
            </div>
        </section>
    );
};

export default HomeCTA;
