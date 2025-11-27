import "./Process.css";

const Process = () => {
    return (
        <section className="process-section">
            <div className="process-container">
                <div className="process-header">
                    <span className="process-badge">How It Works</span>
                    <h2>Seamless Identity <span className="gradient-text">Verification</span></h2>
                    <p>Three simple steps to secure your platform and onboard users instantly.</p>
                </div>

                <div className="process-steps">
                    {/* Step 1 */}
                    <div className="process-step">
                        <div className="step-number">01</div>
                        <div className="step-icon-wrapper">
                            <div className="step-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="step-line"></div>
                        </div>
                        <div className="step-content">
                            <h3>Upload Document</h3>
                            <p>User uploads their ID card, passport, or driving license via our secure SDK.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="process-step">
                        <div className="step-number">02</div>
                        <div className="step-icon-wrapper">
                            <div className="step-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.66398 17.4022C6.95313 16.9342 5 14.4863 5 11.5C5 8.46243 7.46243 6 10.5 6H13.5C16.5376 6 19 8.46243 19 11.5C19 14.4863 17.0469 16.9342 14.336 17.4022M12 22C12 22 12 18 12 16M12 16C12 16 14.5 13.5 16 12M12 16C12 16 9.5 13.5 8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="step-line"></div>
                        </div>
                        <div className="step-content">
                            <h3>AI Analysis</h3>
                            <p>Our AI instantly scans for holograms, fonts, and matches the face to the ID photo.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="process-step">
                        <div className="step-number">03</div>
                        <div className="step-icon-wrapper">
                            <div className="step-icon success">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="step-content">
                            <h3>Verified</h3>
                            <p>Identity is confirmed in seconds, and data is securely returned to your system.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
