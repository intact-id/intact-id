import "./Support.css"
import Marquee from "react-fast-marquee";

const Support = () => {
    const companies = [
        "FinTech", "Banking", "Healthcare", "E-commerce",
        "Government", "Insurance", "Crypto", "Startups", "Enterprises"
    ];

    return (
        <div className="support-section">
            <div className="support-container">
                <p className="support-label">TRUSTED BY INNOVATIVE TEAMS WORLDWIDE</p>

                <div className="marquee-wrapper">
                    <Marquee speed={40} gradient={true} gradientColor={[10, 14, 39]} gradientWidth={200}>
                        {companies.map((company, index) => (
                            <div key={index} className="company-item">
                                <span className="company-dot"></span>
                                {company}
                            </div>
                        ))}
                        {companies.map((company, index) => (
                            <div key={`dup-${index}`} className="company-item">
                                <span className="company-dot"></span>
                                {company}
                            </div>
                        ))}
                    </Marquee>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon icon-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h3>Bank-Grade Security</h3>
                        <p>SOC2 Type II certified infrastructure with end-to-end encryption.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon icon-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </div>
                        <h3>Real-Time Verification</h3>
                        <p>Verify identities in under 2 seconds with 99.9% accuracy.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon icon-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <h3>Global Coverage</h3>
                        <p>Support for 200+ countries and 10,000+ ID document types.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Support;