import "./Pricing.css";
import { Link } from 'react-router-dom';

const Pricing = () => {
    return (
        <div className="pricing-page">
            <div className="pricing-container">
                <div className="pricing-header">
                    <h1>Simple, Transparent <span className="gradient-text">Pricing</span></h1>
                    <p>Choose the verification level that fits your compliance needs.</p>
                </div>

                <div className="pricing-grid">
                    {/* Tier 1 */}
                    <div className="pricing-card">
                        <div className="card-header">
                            <h3>Basic Document Verification</h3>
                            <div className="price">
                                <span className="currency">$</span>
                                <span className="amount">0.30</span>
                                <span className="period">/check</span>
                            </div>
                            <p className="tier-desc">Essential ID verification for low-risk use cases.</p>
                        </div>

                        <div className="features-list">
                            <div className="feature-item">
                                <span className="check">✓</span>
                                OCR Data Extraction
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Document Format Check
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Selfie Capture
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Basic Liveness (Blink)
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Face Match (Selfie vs ID)
                            </div>
                            <div className="feature-item disabled">
                                <span className="cross">×</span>
                                No Government DB Check
                            </div>
                        </div>

                        <button className="pricing-btn">Get Started</button>
                    </div>

                    {/* Tier 2 */}
                    <div className="pricing-card popular">
                        <div className="popular-badge">MOST POPULAR</div>
                        <div className="card-header">
                            <h3>Standard KYC</h3>
                            <div className="price">
                                <span className="currency">$</span>
                                <span className="amount">0.80</span>
                                <span className="period">/check</span>
                            </div>
                            <p className="tier-desc">Comprehensive verification with government database checks.</p>
                        </div>

                        <div className="features-list">
                            <div className="feature-item highlight">
                                <span className="check">✓</span>
                                <strong>Everything in Basic, plus:</strong>
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                IPRS Government DB Check
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Video Liveness (3-5s)
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Fraud Detection (Holograms)
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Duplicate Check
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Biometric Data Return
                            </div>
                        </div>

                        <button className="pricing-btn primary">Get Started</button>
                    </div>

                    {/* Tier 3 */}
                    <div className="pricing-card">
                        <div className="card-header">
                            <h3>Enhanced KYC</h3>
                            <div className="price">
                                <span className="currency">$</span>
                                <span className="amount">2.00</span>
                                <span className="period">/check</span>
                            </div>
                            <p className="tier-desc">Maximum security with global sanctions screening.</p>
                        </div>

                        <div className="features-list">
                            <div className="feature-item highlight">
                                <span className="check">✓</span>
                                <strong>Everything in Standard, plus:</strong>
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Sanctions Screening (OFAC/UN)
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                PEP Checks
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Adverse Media Screening
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Enhanced Fraud Analysis
                            </div>
                            <div className="feature-item">
                                <span className="check">✓</span>
                                Risk Scoring
                            </div>
                        </div>

                        <button className="pricing-btn">Contact Sales</button>
                    </div>
                </div>

                <div className="pricing-footer">
                    <p>Need a custom volume plan? <Link to="/contact">Contact our sales team</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
