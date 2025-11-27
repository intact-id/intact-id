import "./Hero.css";

const Hero = () => {
    return (
        <div className="hero-wrapper">
            <div className="hero-container">
                {/* Hero Content */}
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Welcome to Intact ID
                    </div>

                    <h1 className="hero-title">
                        Verify identities
                        <span className="gradient-text"> instantly</span>
                        <br />
                        and securely
                    </h1>

                    <p className="hero-description">
                        Join thousands of organizations using Intact ID to verify customer
                        identities in seconds. Secure, compliant, and seamless KYC verification.
                    </p>

                    <div className="hero-cta">
                        <button className="btn-primary">
                            Start Verifying
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="btn-secondary">
                            Watch Demo
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">99.9%</div>
                            <div className="stat-label">Accuracy</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">&lt;2s</div>
                            <div className="stat-label">Verification Time</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">10M+</div>
                            <div className="stat-label">Verifications</div>
                        </div>
                    </div>
                </div>

                {/* Hero Visual */}
                <div className="hero-visual">
                    <div className="visual-card card-1">
                        <div className="card-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <circle cx="20" cy="20" r="18" stroke="url(#grad1)" strokeWidth="2" />
                                <path d="M14 20L18 24L26 16" stroke="url(#grad1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#6366F1" />
                                        <stop offset="100%" stopColor="#8B5CF6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="card-content">
                            <div className="card-title">Identity Verified</div>
                            <div className="card-subtitle">John Doe • 2 seconds ago</div>
                        </div>
                    </div>

                    <div className="visual-card card-2">
                        <div className="card-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect x="8" y="12" width="24" height="16" rx="2" stroke="url(#grad2)" strokeWidth="2" />
                                <circle cx="16" cy="20" r="3" stroke="url(#grad2)" strokeWidth="1.5" />
                                <line x1="22" y1="18" x2="28" y2="18" stroke="url(#grad2)" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="22" y1="22" x2="26" y2="22" stroke="url(#grad2)" strokeWidth="1.5" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#06B6D4" />
                                        <stop offset="100%" stopColor="#8B5CF6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="card-content">
                            <div className="card-title">Document Scanned</div>
                            <div className="card-subtitle">Passport • Valid</div>
                        </div>
                    </div>

                    <div className="visual-card card-3">
                        <div className="card-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <circle cx="20" cy="16" r="6" stroke="url(#grad3)" strokeWidth="2" />
                                <path d="M10 32C10 26 14 22 20 22C26 22 30 26 30 32" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#EC4899" />
                                        <stop offset="100%" stopColor="#8B5CF6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="card-content">
                            <div className="card-title">Biometric Match</div>
                            <div className="card-subtitle">98.7% confidence</div>
                        </div>
                    </div>

                    {/* Floating elements */}
                    <div className="float-element float-1">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                            <circle cx="30" cy="30" r="28" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" />
                            <circle cx="30" cy="30" r="20" stroke="rgba(99, 102, 241, 0.5)" strokeWidth="2" />
                            <circle cx="30" cy="30" r="12" stroke="rgba(99, 102, 241, 0.7)" strokeWidth="2" />
                        </svg>
                    </div>

                    <div className="float-element float-2">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                            <path d="M25 5L30 15L40 20L30 25L25 35L20 25L10 20L20 15Z" fill="url(#floatGrad)" />
                            <defs>
                                <linearGradient id="floatGrad">
                                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
                                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0.5)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
