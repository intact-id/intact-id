import "./About.css";

const About = () => {
    return (
        <div className="about-wrapper">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <div className="about-badge">
                        <span className="badge-pulse"></span>
                        About Intact ID
                    </div>
                    <h1 className="about-hero-title">
                        Powering Trust in a
                        <span className="gradient-text"> Digital World</span>
                    </h1>
                    <p className="about-hero-description">
                        Intact ID is a next-generation identity verification platform built to help businesses
                        verify customer identities instantly, securely, and globally. We combine advanced AI,
                        biometric analysis, and government-grade security to deliver seamless verification
                        experiences trusted by organizations across industries.
                    </p>
                </div>

                {/* Animated Background Elements */}
                <div className="hero-orb orb-1"></div>
                <div className="hero-orb orb-2"></div>
                <div className="hero-orb orb-3"></div>
            </section>

            {/* Mission Section */}
            <section className="about-section mission-section">
                <div className="section-container">
                    <div className="section-header">
                        <div className="section-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M24 4L28 16L40 20L28 24L24 36L20 24L8 20L20 16Z" fill="url(#missionGrad)" />
                                <defs>
                                    <linearGradient id="missionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#6366F1" />
                                        <stop offset="100%" stopColor="#8B5CF6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h2 className="section-title">Our Mission</h2>
                    </div>
                    <p className="mission-statement">
                        To enable secure, frictionless identity verification for every business and every user,
                        anywhere in the world.
                    </p>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="about-section what-we-do-section">
                <div className="section-container">
                    <h2 className="section-title centered">What We Do</h2>
                    <p className="section-subtitle">
                        We provide fast, accurate, and compliant digital identity verification that empowers companies to:
                    </p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M16 4L20 12L28 16L20 20L16 28L12 20L4 16L12 12Z" stroke="url(#feat1)" strokeWidth="2" />
                                    <defs>
                                        <linearGradient id="feat1">
                                            <stop offset="0%" stopColor="#EC4899" />
                                            <stop offset="100%" stopColor="#8B5CF6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="feature-title">Reduce Fraud</h3>
                            <p className="feature-description">
                                Advanced AI detection prevents identity theft and fraudulent activities
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <rect x="6" y="8" width="20" height="16" rx="2" stroke="url(#feat2)" strokeWidth="2" />
                                    <path d="M11 8V6C11 4.89543 11.8954 4 13 4H19C20.1046 4 21 4.89543 21 6V8" stroke="url(#feat2)" strokeWidth="2" />
                                    <circle cx="16" cy="16" r="3" stroke="url(#feat2)" strokeWidth="2" />
                                    <defs>
                                        <linearGradient id="feat2">
                                            <stop offset="0%" stopColor="#6366F1" />
                                            <stop offset="100%" stopColor="#06B6D4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="feature-title">Meet Compliance</h3>
                            <p className="feature-description">
                                Stay compliant with global KYC/AML regulations effortlessly
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M4 16L12 8L20 16L28 8" stroke="url(#feat3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 24L12 16L20 24L28 16" stroke="url(#feat3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <defs>
                                        <linearGradient id="feat3">
                                            <stop offset="0%" stopColor="#06B6D4" />
                                            <stop offset="100%" stopColor="#8B5CF6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="feature-title">Instant Onboarding</h3>
                            <p className="feature-description">
                                Onboard customers in seconds with seamless verification flows
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <circle cx="16" cy="16" r="10" stroke="url(#feat4)" strokeWidth="2" />
                                    <path d="M16 6V16L22 19" stroke="url(#feat4)" strokeWidth="2" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="feat4">
                                            <stop offset="0%" stopColor="#8B5CF6" />
                                            <stop offset="100%" stopColor="#EC4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="feature-title">Scale Globally</h3>
                            <p className="feature-description">
                                Expand across borders with confidence and localized support
                            </p>
                        </div>
                    </div>

                    <div className="capabilities-highlight">
                        <p>
                            From <strong>document scanning</strong> to <strong>biometric matching</strong>,
                            <strong> liveness checks</strong>, and <strong>government database verification</strong> —
                            Intact ID brings all identity checks into one powerful platform.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Intact ID Section */}
            <section className="about-section why-section">
                <div className="section-container">
                    <h2 className="section-title centered">Why Intact ID</h2>

                    <div className="why-grid">
                        <div className="why-card">
                            <div className="why-number">01</div>
                            <h3 className="why-title">Accuracy You Can Trust</h3>
                            <p className="why-description">
                                AI-powered verification with <span className="highlight">99.9% precision</span> and
                                under-2-second verification times.
                            </p>
                            <div className="why-visual">
                                <div className="accuracy-bar">
                                    <div className="accuracy-fill"></div>
                                    <span className="accuracy-label">99.9%</span>
                                </div>
                            </div>
                        </div>

                        <div className="why-card">
                            <div className="why-number">02</div>
                            <h3 className="why-title">Global Coverage</h3>
                            <p className="why-description">
                                Support for <span className="highlight">200+ countries</span> and
                                <span className="highlight"> 10,000+ types</span> of ID documents.
                            </p>
                            <div className="why-visual">
                                <div className="globe-stats">
                                    <div className="stat-pill">
                                        <span className="stat-value">200+</span>
                                        <span className="stat-label">Countries</span>
                                    </div>
                                    <div className="stat-pill">
                                        <span className="stat-value">10K+</span>
                                        <span className="stat-label">ID Types</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="why-card">
                            <div className="why-number">03</div>
                            <h3 className="why-title">Bank-Grade Security</h3>
                            <p className="why-description">
                                SOC2 Type II compliant infrastructure, end-to-end encryption, and continuous monitoring.
                            </p>
                            <div className="why-visual">
                                <div className="security-badges">
                                    <div className="security-badge">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2L4 6V12C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 12V6L12 2Z" stroke="url(#secGrad)" strokeWidth="2" />
                                            <defs>
                                                <linearGradient id="secGrad">
                                                    <stop offset="0%" stopColor="#6366F1" />
                                                    <stop offset="100%" stopColor="#8B5CF6" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <span>SOC2</span>
                                    </div>
                                    <div className="security-badge">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <rect x="5" y="11" width="14" height="10" rx="2" stroke="url(#encGrad)" strokeWidth="2" />
                                            <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="url(#encGrad)" strokeWidth="2" />
                                            <defs>
                                                <linearGradient id="encGrad">
                                                    <stop offset="0%" stopColor="#06B6D4" />
                                                    <stop offset="100%" stopColor="#8B5CF6" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <span>E2E Encrypted</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="why-card">
                            <div className="why-number">04</div>
                            <h3 className="why-title">Built for Developers</h3>
                            <p className="why-description">
                                Simple APIs and SDKs for Node.js, Python, Go, and more — integrate within minutes.
                            </p>
                            <div className="why-visual">
                                <div className="dev-languages">
                                    <span className="lang-tag">Node.js</span>
                                    <span className="lang-tag">Python</span>
                                    <span className="lang-tag">Go</span>
                                    <span className="lang-tag">Java</span>
                                    <span className="lang-tag">Ruby</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="about-section vision-section">
                <div className="section-container">
                    <div className="vision-content">
                        <div className="vision-icon">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <circle cx="32" cy="32" r="28" stroke="url(#visionGrad)" strokeWidth="2" opacity="0.3" />
                                <circle cx="32" cy="32" r="20" stroke="url(#visionGrad)" strokeWidth="2" opacity="0.6" />
                                <circle cx="32" cy="32" r="12" stroke="url(#visionGrad)" strokeWidth="2" />
                                <circle cx="32" cy="32" r="4" fill="url(#visionGrad)" />
                                <defs>
                                    <linearGradient id="visionGrad">
                                        <stop offset="0%" stopColor="#6366F1" />
                                        <stop offset="100%" stopColor="#EC4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h2 className="vision-title">Our Vision</h2>
                        <p className="vision-statement">
                            A world where identity is <span className="highlight">secure</span>,
                            <span className="highlight"> universal</span>, and
                            <span className="highlight"> effortless</span> — no passwords, no friction, no doubt.
                            Just instant trust.
                        </p>
                    </div>
                </div>
            </section>

            {/* Who We Serve Section */}
            <section className="about-section serve-section">
                <div className="section-container">
                    <h2 className="section-title centered">Who We Serve</h2>
                    <p className="section-subtitle">
                        Intact ID is trusted by businesses of every size across multiple industries
                    </p>

                    <div className="industries-grid">
                        <div className="industry-card">
                            <div className="industry-icon">💰</div>
                            <h3>FinTech & Banking</h3>
                        </div>
                        <div className="industry-card">
                            <div className="industry-icon">🏥</div>
                            <h3>Healthcare</h3>
                        </div>
                        <div className="industry-card">
                            <div className="industry-icon">🏛️</div>
                            <h3>Government Services</h3>
                        </div>
                        <div className="industry-card">
                            <div className="industry-icon">🛡️</div>
                            <h3>Insurance</h3>
                        </div>
                        <div className="industry-card">
                            <div className="industry-icon">🛒</div>
                            <h3>E-Commerce</h3>
                        </div>
                        <div className="industry-card">
                            <div className="industry-icon">🔗</div>
                            <h3>Crypto & Web3</h3>
                        </div>
                        <div className="industry-card">
                            <div className="industry-icon">🚀</div>
                            <h3>Startups</h3>
                        </div>
                        <div className="industry-card">
                            <div className="industry-icon">🏢</div>
                            <h3>Enterprises</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="about-section story-section">
                <div className="section-container">
                    <div className="story-content">
                        <h2 className="section-title">Our Story</h2>
                        <p className="story-text">
                            Founded with the belief that digital identity should be both <strong>secure and seamless</strong>,
                            Intact ID has grown into one of the fastest-advancing verification platforms globally.
                            We continue to innovate by pushing the frontier of biometric intelligence, fraud detection,
                            and global identity infrastructure.
                        </p>
                        <p className="story-text">
                            Every day, <span className="highlight">millions of users</span> rely on Intact ID to prove who they are —
                            whether they're opening a bank account, accessing fintech services, or signing up for digital platforms.
                            Our mission is simple: <strong>make trust effortless</strong>.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-section cta-section">
                <div className="section-container">
                    <div className="cta-content">
                        <h2 className="cta-title">Join Us</h2>
                        <p className="cta-description">
                            Whether you're building a fintech product, scaling internationally, or improving your
                            compliance workflow — Intact ID gives you the tools to verify anyone, anywhere, instantly.
                        </p>

                        <div className="cta-buttons">
                            <button className="cta-btn primary">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Start Verifying Today
                            </button>
                            <button className="cta-btn secondary">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Explore Documentation
                            </button>
                            <button className="cta-btn secondary">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3 8L10 2L17 8V16C17 16.5304 16.7893 17.0391 16.4142 17.4142C16.0391 17.7893 15.5304 18 15 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 18V10H13V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
