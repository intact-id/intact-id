import "./Security.css";

const Security = () => {
    return (
        <div className="security-wrapper">
            {/* Hero Section */}
            <section className="security-hero">
                <div className="security-hero-content">
                    <div className="security-badge">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1L2 4V8C2 11.5 5 14.5 8 16C11 14.5 14 11.5 14 8V4L8 1Z" fill="url(#badgeGrad)" />
                            <defs>
                                <linearGradient id="badgeGrad">
                                    <stop offset="0%" stopColor="#6366F1" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        Enterprise-Grade Security
                    </div>
                    <h1 className="security-hero-title">
                        Security Built Into
                        <span className="gradient-text"> Every Layer</span>
                    </h1>
                    <p className="security-hero-description">
                        Bank-grade encryption, SOC2 Type II compliance, and continuous monitoring ensure your data
                        and your customers' identities are protected at every step. Trust is our foundation.
                    </p>
                </div>

                {/* Animated Shield */}
                <div className="shield-container">
                    <svg className="shield-svg" width="300" height="350" viewBox="0 0 300 350" fill="none">
                        <path className="shield-outline" d="M150 20L50 70V170C50 250 100 310 150 330C200 310 250 250 250 170V70L150 20Z"
                            stroke="url(#shieldGrad1)" strokeWidth="3" />
                        <path className="shield-inner" d="M150 50L80 90V170C80 230 115 280 150 300C185 280 220 230 220 170V90L150 50Z"
                            stroke="url(#shieldGrad2)" strokeWidth="2" opacity="0.6" />
                        <circle className="shield-core" cx="150" cy="180" r="40" stroke="url(#shieldGrad3)" strokeWidth="2" />
                        <path className="shield-check" d="M130 180L145 195L170 165" stroke="url(#shieldGrad3)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="shieldGrad1" x1="150" y1="20" x2="150" y2="330">
                                <stop offset="0%" stopColor="#6366F1" />
                                <stop offset="100%" stopColor="#8B5CF6" />
                            </linearGradient>
                            <linearGradient id="shieldGrad2" x1="150" y1="50" x2="150" y2="300">
                                <stop offset="0%" stopColor="#06B6D4" />
                                <stop offset="100%" stopColor="#8B5CF6" />
                            </linearGradient>
                            <linearGradient id="shieldGrad3">
                                <stop offset="0%" stopColor="#10B981" />
                                <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="shield-glow"></div>
                </div>
            </section>

            {/* Security Pillars */}
            <section className="pillars-section">
                <div className="pillars-container">
                    <h2 className="section-title">Our Security Pillars</h2>
                    <p className="section-subtitle">
                        Multi-layered protection designed to safeguard your most sensitive data
                    </p>

                    <div className="pillars-grid">
                        <div className="pillar-card">
                            <div className="pillar-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <rect x="14" y="20" width="20" height="16" rx="2" stroke="url(#pillar1)" strokeWidth="2.5" />
                                    <path d="M18 20V14C18 10.6863 20.6863 8 24 8C27.3137 8 30 10.6863 30 14V20" stroke="url(#pillar1)" strokeWidth="2.5" />
                                    <circle cx="24" cy="28" r="3" fill="url(#pillar1)" />
                                    <defs>
                                        <linearGradient id="pillar1">
                                            <stop offset="0%" stopColor="#6366F1" />
                                            <stop offset="100%" stopColor="#8B5CF6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="pillar-title">End-to-End Encryption</h3>
                            <p className="pillar-description">
                                AES-256 encryption for data at rest and TLS 1.3 for data in transit.
                                Your data is encrypted from capture to storage.
                            </p>
                            <div className="pillar-badge">AES-256</div>
                        </div>

                        <div className="pillar-card">
                            <div className="pillar-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path d="M24 6L10 12V22C10 31 17 38 24 42C31 38 38 31 38 22V12L24 6Z" stroke="url(#pillar2)" strokeWidth="2.5" />
                                    <path d="M18 24L22 28L30 18" stroke="url(#pillar2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <defs>
                                        <linearGradient id="pillar2">
                                            <stop offset="0%" stopColor="#06B6D4" />
                                            <stop offset="100%" stopColor="#6366F1" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="pillar-title">SOC2 Type II Certified</h3>
                            <p className="pillar-description">
                                Independently audited and certified for security, availability, and confidentiality.
                                Annual audits ensure continuous compliance.
                            </p>
                            <div className="pillar-badge">Certified</div>
                        </div>

                        <div className="pillar-card">
                            <div className="pillar-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <circle cx="24" cy="24" r="16" stroke="url(#pillar3)" strokeWidth="2.5" />
                                    <path d="M24 8V24L32 28" stroke="url(#pillar3)" strokeWidth="2.5" strokeLinecap="round" />
                                    <circle cx="24" cy="24" r="3" fill="url(#pillar3)" />
                                    <defs>
                                        <linearGradient id="pillar3">
                                            <stop offset="0%" stopColor="#8B5CF6" />
                                            <stop offset="100%" stopColor="#EC4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="pillar-title">24/7 Monitoring</h3>
                            <p className="pillar-description">
                                Real-time threat detection and automated incident response.
                                Our security team monitors systems around the clock.
                            </p>
                            <div className="pillar-badge">24/7</div>
                        </div>

                        <div className="pillar-card">
                            <div className="pillar-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <rect x="8" y="14" width="32" height="20" rx="3" stroke="url(#pillar4)" strokeWidth="2.5" />
                                    <path d="M16 14V10C16 5.58172 19.5817 2 24 2C28.4183 2 32 5.58172 32 10V14" stroke="url(#pillar4)" strokeWidth="2.5" />
                                    <circle cx="24" cy="24" r="4" stroke="url(#pillar4)" strokeWidth="2" />
                                    <path d="M24 28V30" stroke="url(#pillar4)" strokeWidth="2" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="pillar4">
                                            <stop offset="0%" stopColor="#10B981" />
                                            <stop offset="100%" stopColor="#06B6D4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="pillar-title">Zero-Knowledge Architecture</h3>
                            <p className="pillar-description">
                                We can't access your encryption keys. Only you control access to sensitive data.
                                True privacy by design.
                            </p>
                            <div className="pillar-badge">Private</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compliance Section */}
            <section className="compliance-section">
                <div className="compliance-container">
                    <h2 className="section-title">Global Compliance Standards</h2>
                    <p className="section-subtitle">
                        Meeting the highest international standards for data protection and privacy
                    </p>

                    <div className="compliance-grid">
                        <div className="compliance-card">
                            <div className="compliance-logo">SOC2</div>
                            <h3 className="compliance-name">SOC 2 Type II</h3>
                            <p className="compliance-desc">Security, Availability, Confidentiality</p>
                        </div>

                        <div className="compliance-card">
                            <div className="compliance-logo">GDPR</div>
                            <h3 className="compliance-name">GDPR Compliant</h3>
                            <p className="compliance-desc">EU Data Protection Regulation</p>
                        </div>

                        <div className="compliance-card">
                            <div className="compliance-logo">ISO</div>
                            <h3 className="compliance-name">ISO 27001</h3>
                            <p className="compliance-desc">Information Security Management</p>
                        </div>

                        <div className="compliance-card">
                            <div className="compliance-logo">CCPA</div>
                            <h3 className="compliance-name">CCPA Ready</h3>
                            <p className="compliance-desc">California Consumer Privacy Act</p>
                        </div>

                        <div className="compliance-card">
                            <div className="compliance-logo">PCI</div>
                            <h3 className="compliance-name">PCI DSS</h3>
                            <p className="compliance-desc">Payment Card Industry Standards</p>
                        </div>

                        <div className="compliance-card">
                            <div className="compliance-logo">HIPAA</div>
                            <h3 className="compliance-name">HIPAA Compliant</h3>
                            <p className="compliance-desc">Healthcare Data Protection</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Protection */}
            <section className="data-protection-section">
                <div className="data-protection-container">
                    <h2 className="section-title">How We Protect Your Data</h2>

                    <div className="protection-timeline">
                        <div className="timeline-item">
                            <div className="timeline-number">01</div>
                            <div className="timeline-content">
                                <h3 className="timeline-title">Data Collection</h3>
                                <p className="timeline-description">
                                    All data is encrypted immediately upon capture using TLS 1.3.
                                    No plaintext data ever touches our servers.
                                </p>
                                <div className="timeline-tech">
                                    <span className="tech-tag">TLS 1.3</span>
                                    <span className="tech-tag">Perfect Forward Secrecy</span>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-number">02</div>
                            <div className="timeline-content">
                                <h3 className="timeline-title">Processing & Analysis</h3>
                                <p className="timeline-description">
                                    Data is processed in isolated, encrypted environments.
                                    AI models run on encrypted data using homomorphic encryption.
                                </p>
                                <div className="timeline-tech">
                                    <span className="tech-tag">Isolated Environments</span>
                                    <span className="tech-tag">Encrypted Processing</span>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-number">03</div>
                            <div className="timeline-content">
                                <h3 className="timeline-title">Secure Storage</h3>
                                <p className="timeline-description">
                                    AES-256 encryption at rest with customer-managed keys.
                                    Data is distributed across multiple secure data centers.
                                </p>
                                <div className="timeline-tech">
                                    <span className="tech-tag">AES-256</span>
                                    <span className="tech-tag">Multi-Region</span>
                                    <span className="tech-tag">Customer Keys</span>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-number">04</div>
                            <div className="timeline-content">
                                <h3 className="timeline-title">Access Control</h3>
                                <p className="timeline-description">
                                    Role-based access control (RBAC) with multi-factor authentication.
                                    Every access is logged and auditable.
                                </p>
                                <div className="timeline-tech">
                                    <span className="tech-tag">RBAC</span>
                                    <span className="tech-tag">MFA</span>
                                    <span className="tech-tag">Audit Logs</span>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-number">05</div>
                            <div className="timeline-content">
                                <h3 className="timeline-title">Data Retention</h3>
                                <p className="timeline-description">
                                    Automated data lifecycle management. Secure deletion after retention period.
                                    Right to be forgotten compliance.
                                </p>
                                <div className="timeline-tech">
                                    <span className="tech-tag">Auto-Delete</span>
                                    <span className="tech-tag">GDPR Compliant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infrastructure Security */}
            <section className="infrastructure-section">
                <div className="infrastructure-container">
                    <h2 className="section-title">Infrastructure Security</h2>
                    <p className="section-subtitle">
                        Enterprise-grade infrastructure built on industry-leading cloud platforms
                    </p>

                    <div className="infrastructure-grid">
                        <div className="infra-card">
                            <div className="infra-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <rect x="6" y="8" width="28" height="6" rx="2" stroke="url(#infra1)" strokeWidth="2" />
                                    <rect x="6" y="17" width="28" height="6" rx="2" stroke="url(#infra1)" strokeWidth="2" />
                                    <rect x="6" y="26" width="28" height="6" rx="2" stroke="url(#infra1)" strokeWidth="2" />
                                    <circle cx="10" cy="11" r="1.5" fill="url(#infra1)" />
                                    <circle cx="10" cy="20" r="1.5" fill="url(#infra1)" />
                                    <circle cx="10" cy="29" r="1.5" fill="url(#infra1)" />
                                    <defs>
                                        <linearGradient id="infra1">
                                            <stop offset="0%" stopColor="#6366F1" />
                                            <stop offset="100%" stopColor="#8B5CF6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="infra-title">Redundant Infrastructure</h3>
                            <p className="infra-description">
                                Multi-region deployment with automatic failover. 99.99% uptime SLA.
                            </p>
                        </div>

                        <div className="infra-card">
                            <div className="infra-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <path d="M20 4L6 10V18C6 26 12 32 20 36C28 32 34 26 34 18V10L20 4Z" stroke="url(#infra2)" strokeWidth="2" />
                                    <circle cx="20" cy="20" r="6" stroke="url(#infra2)" strokeWidth="2" />
                                    <defs>
                                        <linearGradient id="infra2">
                                            <stop offset="0%" stopColor="#06B6D4" />
                                            <stop offset="100%" stopColor="#6366F1" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="infra-title">DDoS Protection</h3>
                            <p className="infra-description">
                                Advanced DDoS mitigation and web application firewall (WAF) protection.
                            </p>
                        </div>

                        <div className="infra-card">
                            <div className="infra-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="14" stroke="url(#infra3)" strokeWidth="2" />
                                    <circle cx="20" cy="20" r="9" stroke="url(#infra3)" strokeWidth="2" />
                                    <circle cx="20" cy="20" r="4" fill="url(#infra3)" />
                                    <defs>
                                        <linearGradient id="infra3">
                                            <stop offset="0%" stopColor="#8B5CF6" />
                                            <stop offset="100%" stopColor="#EC4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="infra-title">Network Isolation</h3>
                            <p className="infra-description">
                                Private VPCs, network segmentation, and zero-trust architecture.
                            </p>
                        </div>

                        <div className="infra-card">
                            <div className="infra-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <path d="M8 32V12L20 6L32 12V32" stroke="url(#infra4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <rect x="14" y="20" width="12" height="12" stroke="url(#infra4)" strokeWidth="2" />
                                    <path d="M20 20V32" stroke="url(#infra4)" strokeWidth="2" />
                                    <path d="M14 26H26" stroke="url(#infra4)" strokeWidth="2" />
                                    <defs>
                                        <linearGradient id="infra4">
                                            <stop offset="0%" stopColor="#10B981" />
                                            <stop offset="100%" stopColor="#06B6D4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="infra-title">Physical Security</h3>
                            <p className="infra-description">
                                Tier IV data centers with biometric access and 24/7 surveillance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Team */}
            <section className="team-section">
                <div className="team-container">
                    <h2 className="section-title">Dedicated Security Team</h2>
                    <p className="section-subtitle">
                        Expert security professionals working around the clock to protect your data
                    </p>

                    <div className="team-stats">
                        <div className="stat-box">
                            <div className="stat-value">24/7</div>
                            <div className="stat-label">Security Monitoring</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value">&lt;15min</div>
                            <div className="stat-label">Incident Response Time</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value">100%</div>
                            <div className="stat-label">Threat Detection Rate</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value">Annual</div>
                            <div className="stat-label">Penetration Testing</div>
                        </div>
                    </div>

                    <div className="team-features">
                        <div className="team-feature">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Bug Bounty Program</span>
                        </div>
                        <div className="team-feature">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Regular Security Audits</span>
                        </div>
                        <div className="team-feature">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Vulnerability Disclosure Policy</span>
                        </div>
                        <div className="team-feature">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Incident Response Plan</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="security-cta-section">
                <div className="security-cta-content">
                    <div className="cta-icon">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                            <path d="M32 8L12 18V32C12 46 22 56 32 60C42 56 52 46 52 32V18L32 8Z" stroke="url(#ctaGrad)" strokeWidth="3" />
                            <path d="M24 32L28 36L40 24" stroke="url(#ctaGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <defs>
                                <linearGradient id="ctaGrad">
                                    <stop offset="0%" stopColor="#6366F1" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h2 className="cta-title">Ready to Secure Your Verification?</h2>
                    <p className="cta-description">
                        Join thousands of companies trusting Intact ID with their most sensitive identity data.
                    </p>
                    <div className="cta-buttons">
                        <button className="cta-btn primary">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Get Started
                        </button>
                        <button className="cta-btn secondary">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            View Security Docs
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Security;
