import { useState } from "react";
import "./Pricing.css";
import { Link } from 'react-router-dom';

const Pricing = () => {
    const [volume, setVolume] = useState(1000);
    const [selectedTier, setSelectedTier] = useState('standard');

    const tiers = {
        basic: { name: 'Basic', price: 0.30 },
        standard: { name: 'Standard', price: 0.80 },
        enhanced: { name: 'Enhanced', price: 2.00 }
    };

    const getVolumeDiscount = (vol) => {
        if (vol >= 100000) return 0.25; // 25% discount
        if (vol >= 50000) return 0.20;  // 20% discount
        if (vol >= 10000) return 0.15;  // 15% discount
        if (vol >= 5000) return 0.10;   // 10% discount
        return 0;
    };

    const calculateCost = () => {
        const basePrice = tiers[selectedTier].price;
        const discount = getVolumeDiscount(volume);
        const discountedPrice = basePrice * (1 - discount);
        const totalCost = discountedPrice * volume;
        return {
            pricePerCheck: discountedPrice.toFixed(2),
            totalMonthly: totalCost.toFixed(2),
            savings: discount > 0 ? ((basePrice - discountedPrice) * volume).toFixed(2) : 0,
            discountPercent: (discount * 100).toFixed(0)
        };
    };

    const cost = calculateCost();

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

                {/* Pricing Calculator */}
                <div className="calculator-section">
                    <div className="calculator-header">
                        <h2>Pricing Calculator</h2>
                        <p>Estimate your monthly costs based on verification volume</p>
                    </div>

                    <div className="calculator-card">
                        <div className="calculator-controls">
                            <div className="control-group">
                                <label>Monthly Verification Volume</label>
                                <div className="volume-display">
                                    <span className="volume-number">{volume.toLocaleString()}</span>
                                    <span className="volume-label">verifications/month</span>
                                </div>
                                <input
                                    type="range"
                                    min="100"
                                    max="100000"
                                    step="100"
                                    value={volume}
                                    onChange={(e) => setVolume(parseInt(e.target.value))}
                                    className="volume-slider"
                                />
                                <div className="slider-labels">
                                    <span>100</span>
                                    <span>25K</span>
                                    <span>50K</span>
                                    <span>75K</span>
                                    <span>100K</span>
                                </div>
                            </div>

                            <div className="control-group">
                                <label>Verification Tier</label>
                                <div className="tier-selector">
                                    <button
                                        className={`tier-btn ${selectedTier === 'basic' ? 'active' : ''}`}
                                        onClick={() => setSelectedTier('basic')}
                                    >
                                        <span className="tier-name">Basic</span>
                                        <span className="tier-price">$0.30</span>
                                    </button>
                                    <button
                                        className={`tier-btn ${selectedTier === 'standard' ? 'active' : ''}`}
                                        onClick={() => setSelectedTier('standard')}
                                    >
                                        <span className="tier-name">Standard</span>
                                        <span className="tier-price">$0.80</span>
                                    </button>
                                    <button
                                        className={`tier-btn ${selectedTier === 'enhanced' ? 'active' : ''}`}
                                        onClick={() => setSelectedTier('enhanced')}
                                    >
                                        <span className="tier-name">Enhanced</span>
                                        <span className="tier-price">$2.00</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="calculator-results">
                            <div className="result-card">
                                <div className="result-label">Price per Check</div>
                                <div className="result-value">
                                    ${cost.pricePerCheck}
                                    {cost.discountPercent > 0 && (
                                        <span className="discount-badge">-{cost.discountPercent}%</span>
                                    )}
                                </div>
                            </div>

                            <div className="result-card primary">
                                <div className="result-label">Estimated Monthly Cost</div>
                                <div className="result-value">${cost.totalMonthly}</div>
                                <div className="result-detail">{volume.toLocaleString()} verifications</div>
                            </div>

                            {cost.savings > 0 && (
                                <div className="result-card savings">
                                    <div className="result-label">Monthly Savings</div>
                                    <div className="result-value">${cost.savings}</div>
                                    <div className="result-detail">Volume discount applied</div>
                                </div>
                            )}
                        </div>

                        <div className="calculator-footer">
                            <div className="discount-info">
                                <h4>Volume Discounts</h4>
                                <div className="discount-tiers">
                                    <div className="discount-tier">
                                        <span className="discount-volume">5K - 10K</span>
                                        <span className="discount-amount">10% off</span>
                                    </div>
                                    <div className="discount-tier">
                                        <span className="discount-volume">10K - 50K</span>
                                        <span className="discount-amount">15% off</span>
                                    </div>
                                    <div className="discount-tier">
                                        <span className="discount-volume">50K - 100K</span>
                                        <span className="discount-amount">20% off</span>
                                    </div>
                                    <div className="discount-tier">
                                        <span className="discount-volume">100K+</span>
                                        <span className="discount-amount">25% off</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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

