import "./Features.css";

const Features = () => {
    return (
        <div className="features-wrapper">
            {/* Hero Section */}
            <section className="features-hero">
                <div className="features-hero-content">
                    <div className="features-badge">
                        <span className="badge-shimmer"></span>
                        Verification Features
                    </div>
                    <h1 className="features-hero-title">
                        Choose Your
                        <span className="gradient-text"> Verification Level</span>
                    </h1>
                    <p className="features-hero-description">
                        From basic document checks to comprehensive KYC with global sanctions screening —
                        select the perfect verification tier for your security needs and compliance requirements.
                    </p>
                </div>

                {/* Animated particles */}
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
                <div className="particle particle-4"></div>
            </section>

            {/* Verification Tiers */}
            <section className="tiers-section">
                <div className="tiers-container">
                    {/* Basic Tier */}
                    <div className="tier-card basic-tier">
                        <div className="tier-header">
                            <div className="tier-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <rect x="10" y="14" width="28" height="20" rx="3" stroke="url(#basicGrad)" strokeWidth="2.5" />
                                    <circle cx="18" cy="24" r="4" stroke="url(#basicGrad)" strokeWidth="2" />
                                    <line x1="26" y1="21" x2="34" y2="21" stroke="url(#basicGrad)" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="26" y1="27" x2="31" y2="27" stroke="url(#basicGrad)" strokeWidth="2" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="basicGrad">
                                            <stop offset="0%" stopColor="#06B6D4" />
                                            <stop offset="100%" stopColor="#6366F1" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h2 className="tier-name">Basic Document Verification</h2>
                            <div className="tier-price">
                                <span className="price-currency">$</span>
                                <span className="price-amount">0.30</span>
                                <span className="price-unit">/check</span>
                            </div>
                            <p className="tier-subtitle">Essential ID verification for low-risk use cases.</p>
                        </div>

                        <div className="tier-features">
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>OCR Data Extraction</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Document Format Check</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Selfie Capture</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Basic Liveness (Blink)</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Face Match (Selfie vs ID)</span>
                            </div>
                            <div className="feature-item excluded">
                                <svg className="cross-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                                <span>No Government DB Check</span>
                            </div>
                        </div>

                        <button className="tier-btn">Get Started</button>
                    </div>

                    {/* Standard Tier - Most Popular */}
                    <div className="tier-card standard-tier featured">
                        <div className="popular-badge">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1L10 5.5L15 6L11 10L12 15L8 12.5L4 15L5 10L1 6L6 5.5L8 1Z" fill="currentColor" />
                            </svg>
                            MOST POPULAR
                        </div>
                        <div className="tier-header">
                            <div className="tier-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path d="M24 6L28 18L40 22L28 26L24 38L20 26L8 22L20 18Z" stroke="url(#standardGrad)" strokeWidth="2.5" />
                                    <circle cx="24" cy="22" r="6" stroke="url(#standardGrad)" strokeWidth="2" />
                                    <defs>
                                        <linearGradient id="standardGrad">
                                            <stop offset="0%" stopColor="#6366F1" />
                                            <stop offset="100%" stopColor="#8B5CF6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h2 className="tier-name">Standard KYC</h2>
                            <div className="tier-price">
                                <span className="price-currency">$</span>
                                <span className="price-amount">0.80</span>
                                <span className="price-unit">/check</span>
                            </div>
                            <p className="tier-subtitle">Comprehensive verification with government database checks.</p>
                        </div>

                        <div className="tier-features">
                            <div className="feature-item included highlight">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Everything in Basic, plus:</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>IPRS Government DB Check</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Video Liveness (3-5s)</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Fraud Detection (Holograms)</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Duplicate Check</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Biometric Data Return</span>
                            </div>
                        </div>

                        <button className="tier-btn">Get Started</button>
                    </div>

                    {/* Enhanced Tier */}
                    <div className="tier-card enhanced-tier">
                        <div className="tier-header">
                            <div className="tier-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path d="M24 4L28 16L40 20L28 24L24 36L20 24L8 20L20 16Z" fill="url(#enhancedGrad)" opacity="0.2" />
                                    <path d="M24 4L28 16L40 20L28 24L24 36L20 24L8 20L20 16Z" stroke="url(#enhancedGrad)" strokeWidth="2.5" />
                                    <circle cx="24" cy="20" r="8" stroke="url(#enhancedGrad)" strokeWidth="2" />
                                    <path d="M24 12L24 20L28 24" stroke="url(#enhancedGrad)" strokeWidth="2" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="enhancedGrad">
                                            <stop offset="0%" stopColor="#EC4899" />
                                            <stop offset="100%" stopColor="#8B5CF6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h2 className="tier-name">Enhanced KYC</h2>
                            <div className="tier-price">
                                <span className="price-currency">$</span>
                                <span className="price-amount">2.00</span>
                                <span className="price-unit">/check</span>
                            </div>
                            <p className="tier-subtitle">Maximum security with global sanctions screening.</p>
                        </div>

                        <div className="tier-features">
                            <div className="feature-item included highlight">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Everything in Standard, plus:</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Sanctions Screening (OFAC/UN)</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>PEP Checks</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Adverse Media Screening</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Enhanced Fraud Analysis</span>
                            </div>
                            <div className="feature-item included">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Risk Scoring</span>
                            </div>
                        </div>

                        <button className="tier-btn">Get Started</button>
                    </div>
                </div>
            </section>

            {/* Feature Deep Dive */}
            <section className="deep-dive-section">
                <div className="deep-dive-container">
                    <h2 className="section-title">Feature Deep Dive</h2>
                    <p className="section-subtitle">
                        Explore the powerful capabilities that make Intact ID the most comprehensive verification platform
                    </p>

                    <div className="features-grid">
                        {/* OCR & Document Processing */}
                        <div className="feature-detail-card">
                            <div className="feature-detail-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <rect x="8" y="10" width="24" height="20" rx="2" stroke="url(#feat1)" strokeWidth="2" />
                                    <line x1="12" y1="16" x2="20" y2="16" stroke="url(#feat1)" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="12" y1="20" x2="28" y2="20" stroke="url(#feat1)" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="12" y1="24" x2="24" y2="24" stroke="url(#feat1)" strokeWidth="2" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="feat1">
                                            <stop offset="0%" stopColor="#06B6D4" />
                                            <stop offset="100%" stopColor="#6366F1" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="feature-detail-title">OCR Data Extraction</h3>
                            <p className="feature-detail-description">
                                Advanced optical character recognition extracts text from 10,000+ document types with 99.9% accuracy.
                                Supports multiple languages and formats.
                            </p>
                            <div className="feature-tags">
                                <span className="tag">AI-Powered</span>
                                <span className="tag">Multi-Language</span>
                            </div>
                        </div>

                        {/* Liveness Detection */}
                        <div className="feature-detail-card">
                            <div className="feature-detail-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="18" r="8" stroke="url(#feat2)" strokeWidth="2" />
                                    <path d="M10 32C10 26 14 22 20 22C26 22 30 26 30 32" stroke="url(#feat2)" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="17" cy="17" r="2" fill="url(#feat2)" />
                                    <circle cx="23" cy="17" r="2" fill="url(#feat2)" />
                                    <defs>
                                        <linearGradient id="feat2">
                                            <stop offset="0%" stopColor="#6366F1" />
                                            <stop offset="100%" stopColor="#8B5CF6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="feature-detail-title">Liveness Detection</h3>
                            <p className="feature-detail-description">
                                Prevent spoofing attacks with active and passive liveness checks. From simple blink detection
                                to advanced 3D video analysis.
                            </p>
                            <div className="feature-tags">
                                <span className="tag">Anti-Spoofing</span>
                                <span className="tag">Real-Time</span>
                            </div>
                        </div>

                        {/* Biometric Matching */}
                        <div className="feature-detail-card">
                            <div className="feature-detail-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="12" stroke="url(#feat3)" strokeWidth="2" />
                                    <path d="M20 8V20L26 26" stroke="url(#feat3)" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="20" cy="20" r="3" fill="url(#feat3)" />
                                    <defs>
                                        <linearGradient id="feat3">
                                            <stop offset="0%" stopColor="#8B5CF6" />
                                            <stop offset="100%" stopColor="#EC4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="feature-detail-title">Biometric Face Match</h3>
                            <p className="feature-detail-description">
                                Deep learning algorithms compare selfies with ID photos to verify identity with
                                industry-leading accuracy and speed.
                            </p>
                            <div className="feature-tags">
                                <span className="tag">Deep Learning</span>
                                <span className="tag">Sub-2s</span>
                            </div>
                        </div>

                        {/* Government DB */}
                        <div className="feature-detail-card">
                            <div className="feature-detail-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <path d="M20 4L6 10V18C6 26 12 32 20 36C28 32 34 26 34 18V10L20 4Z" stroke="url(#feat4)" strokeWidth="2" />
                                    <path d="M15 20L18 23L25 16" stroke="url(#feat4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <defs>
                                        <linearGradient id="feat4">
                                            <stop offset="0%" stopColor="#06B6D4" />
                                            <stop offset="100%" stopColor="#8B5CF6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="feature-detail-title">Government Database Verification</h3>
                            <p className="feature-detail-description">
                                Cross-reference identity data with official government databases (IPRS) to ensure
                                authenticity and compliance.
                            </p>
                            <div className="feature-tags">
                                <span className="tag">Official</span>
                                <span className="tag">Compliant</span>
                            </div>
                        </div>

                        {/* Fraud Detection */}
                        <div className="feature-detail-card">
                            <div className="feature-detail-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="14" stroke="url(#feat5)" strokeWidth="2" />
                                    <path d="M20 12V20L26 23" stroke="url(#feat5)" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="20" cy="20" r="2" fill="url(#feat5)" />
                                    <defs>
                                        <linearGradient id="feat5">
                                            <stop offset="0%" stopColor="#EC4899" />
                                            <stop offset="100%" stopColor="#6366F1" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="feature-detail-title">Advanced Fraud Detection</h3>
                            <p className="feature-detail-description">
                                AI-powered analysis detects forged documents, altered holograms, and sophisticated
                                fraud attempts in real-time.
                            </p>
                            <div className="feature-tags">
                                <span className="tag">AI Detection</span>
                                <span className="tag">Hologram Check</span>
                            </div>
                        </div>

                        {/* Sanctions & PEP */}
                        <div className="feature-detail-card">
                            <div className="feature-detail-icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="12" stroke="url(#feat6)" strokeWidth="2" />
                                    <path d="M8 20H32M20 8V32" stroke="url(#feat6)" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="20" cy="20" r="6" stroke="url(#feat6)" strokeWidth="2" />
                                    <defs>
                                        <linearGradient id="feat6">
                                            <stop offset="0%" stopColor="#6366F1" />
                                            <stop offset="100%" stopColor="#06B6D4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h3 className="feature-detail-title">Sanctions & PEP Screening</h3>
                            <p className="feature-detail-description">
                                Screen against global watchlists including OFAC, UN sanctions, PEP databases, and
                                adverse media for comprehensive risk assessment.
                            </p>
                            <div className="feature-tags">
                                <span className="tag">Global</span>
                                <span className="tag">AML/CFT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="comparison-section">
                <div className="comparison-container">
                    <h2 className="section-title">Feature Comparison</h2>
                    <p className="section-subtitle">
                        Compare all features across verification tiers at a glance
                    </p>

                    <div className="comparison-table-wrapper">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th className="feature-col">Feature</th>
                                    <th className="tier-col basic">Basic</th>
                                    <th className="tier-col standard">Standard</th>
                                    <th className="tier-col enhanced">Enhanced</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="feature-name">OCR Data Extraction</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Document Format Check</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Selfie Capture</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Basic Liveness (Blink)</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Face Match (Selfie vs ID)</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Government DB Check (IPRS)</td>
                                    <td className="cross-cell">×</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Video Liveness (3-5s)</td>
                                    <td className="cross-cell">×</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Fraud Detection (Holograms)</td>
                                    <td className="cross-cell">×</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Duplicate Check</td>
                                    <td className="cross-cell">×</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Biometric Data Return</td>
                                    <td className="cross-cell">×</td>
                                    <td className="check-cell">✓</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Sanctions Screening (OFAC/UN)</td>
                                    <td className="cross-cell">×</td>
                                    <td className="cross-cell">×</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">PEP Checks</td>
                                    <td className="cross-cell">×</td>
                                    <td className="cross-cell">×</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Adverse Media Screening</td>
                                    <td className="cross-cell">×</td>
                                    <td className="cross-cell">×</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Enhanced Fraud Analysis</td>
                                    <td className="cross-cell">×</td>
                                    <td className="cross-cell">×</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                                <tr>
                                    <td className="feature-name">Risk Scoring</td>
                                    <td className="cross-cell">×</td>
                                    <td className="cross-cell">×</td>
                                    <td className="check-cell">✓</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="features-cta-section">
                <div className="features-cta-content">
                    <h2 className="cta-title">Ready to Get Started?</h2>
                    <p className="cta-description">
                        Choose the verification tier that fits your needs and start verifying identities in minutes.
                    </p>
                    <div className="cta-buttons">
                        <button className="cta-btn primary">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Start Free Trial
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
            </section>
        </div>
    );
};

export default Features;
