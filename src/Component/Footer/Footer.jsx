import "./Footer.css";
import logo from "../../assets/intact-logo.svg";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <img src={logo} alt="Intact ID" className="footer-logo" />
                        <p>The next generation of identity verification. Secure, compliant, and frictionless.</p>
                        <div className="social-links">
                            <a href="#" className="social-link">𝕏</a>
                            <a href="#" className="social-link">in</a>
                            <a href="#" className="social-link">G</a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Product</h4>
                        <ul>
                            <li><Link to="/features">Features</Link></li>
                            <li><Link to="/pricing">Pricing</Link></li>
                            <li><Link to="/security">Security</Link></li>
                            <li><Link to="/api">API Docs</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Legal</h4>
                        <ul>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                            <li><Link to="/compliance">Compliance</Link></li>
                            <li><Link to="/status">System Status</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2024 Intact ID Inc. All rights reserved.</p>

                    <div className="system-status">
                        <span className="status-dot"></span>
                        System Operational
                    </div>

                    <div className="compliance-badges">
                        <span>SOC2 Type II</span>
                        <span>•</span>
                        <span>GDPR Ready</span>
                        <span>•</span>
                        <span>ISO 27001</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
