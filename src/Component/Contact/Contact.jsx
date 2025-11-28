import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
        interest: 'general'
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email) {
            setError('Email is required');
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!formData.name) {
            setError('Name is required');
            return;
        }

        setSubmitted(true);
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                company: '',
                message: '',
                interest: 'general'
            });
            setSubmitted(false);
        }, 5000);
    };

    return (
        <div className="contact-wrapper">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="contact-hero-content">
                    <div className="contact-badge">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" stroke="url(#contactBadge)" strokeWidth="2" />
                            <path d="M5 8L7 10L11 6" stroke="url(#contactBadge)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <defs>
                                <linearGradient id="contactBadge">
                                    <stop offset="0%" stopColor="#6366F1" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        Get in Touch
                    </div>
                    <h1 className="contact-hero-title">
                        Let's Build Something
                        <span className="gradient-text"> Amazing Together</span>
                    </h1>
                    <p className="contact-hero-description">
                        Whether you're ready to start verifying identities or just have questions,
                        our team is here to help. Reach out and let's discuss how Intact ID can
                        transform your verification process.
                    </p>
                </div>

                {/* Animated Background Elements */}
                <div className="contact-orb orb-1"></div>
                <div className="contact-orb orb-2"></div>
                <div className="contact-orb orb-3"></div>
            </section>

            {/* Main Content */}
            <section className="contact-main">
                <div className="contact-container">
                    {/* Contact Info Cards */}
                    <div className="contact-info-section">
                        <h2 className="info-section-title">Contact Information</h2>
                        <p className="info-section-subtitle">
                            Multiple ways to reach us. Choose what works best for you.
                        </p>

                        <div className="contact-info-grid">
                            <div className="contact-info-card">
                                <div className="info-card-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path d="M4 8L16 16L28 8M4 8V24C4 25.1046 4.89543 26 6 26H26C27.1046 26 28 25.1046 28 24V8M4 8C4 6.89543 4.89543 6 6 6H26C27.1046 6 28 6.89543 28 8"
                                            stroke="url(#email)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <defs>
                                            <linearGradient id="email">
                                                <stop offset="0%" stopColor="#6366F1" />
                                                <stop offset="100%" stopColor="#8B5CF6" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <h3 className="info-card-title">Email Us</h3>
                                <p className="info-card-detail">contact@intactid.com</p>
                                <p className="info-card-desc">We'll respond within 24 hours</p>
                            </div>

                            <div className="contact-info-card">
                                <div className="info-card-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path d="M28 14C28 21 16 28 16 28C16 28 4 21 4 14C4 6.26801 9.37258 2 16 2C22.6274 2 28 6.26801 28 14Z"
                                            stroke="url(#location)" strokeWidth="2" />
                                        <circle cx="16" cy="13" r="4" stroke="url(#location)" strokeWidth="2" />
                                        <defs>
                                            <linearGradient id="location">
                                                <stop offset="0%" stopColor="#06B6D4" />
                                                <stop offset="100%" stopColor="#6366F1" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <h3 className="info-card-title">Visit Us</h3>
                                <p className="info-card-detail">San Francisco, CA</p>
                                <p className="info-card-desc">Headquarters & Innovation Lab</p>
                            </div>

                            <div className="contact-info-card">
                                <div className="info-card-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <circle cx="16" cy="16" r="12" stroke="url(#support)" strokeWidth="2" />
                                        <path d="M16 8V16L20 20" stroke="url(#support)" strokeWidth="2" strokeLinecap="round" />
                                        <defs>
                                            <linearGradient id="support">
                                                <stop offset="0%" stopColor="#8B5CF6" />
                                                <stop offset="100%" stopColor="#EC4899" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <h3 className="info-card-title">Support Hours</h3>
                                <p className="info-card-detail">24/7 Available</p>
                                <p className="info-card-desc">Round-the-clock assistance</p>
                            </div>

                            <div className="contact-info-card">
                                <div className="info-card-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <rect x="6" y="10" width="20" height="16" rx="2" stroke="url(#docs)" strokeWidth="2" />
                                        <path d="M6 14H26M10 18H16M10 22H20" stroke="url(#docs)" strokeWidth="2" strokeLinecap="round" />
                                        <defs>
                                            <linearGradient id="docs">
                                                <stop offset="0%" stopColor="#10B981" />
                                                <stop offset="100%" stopColor="#06B6D4" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <h3 className="info-card-title">Documentation</h3>
                                <p className="info-card-detail">docs.intactid.com</p>
                                <p className="info-card-desc">Comprehensive guides & API docs</p>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="quick-links">
                            <h3 className="quick-links-title">Quick Links</h3>
                            <div className="quick-links-grid">
                                <a href="#" className="quick-link">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    API Documentation
                                </a>
                                <a href="#" className="quick-link">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Schedule Demo
                                </a>
                                <a href="#" className="quick-link">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Support Center
                                </a>
                                <a href="#" className="quick-link">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Status Page
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-section">
                        {!submitted ? (
                            <div className="form-card">
                                <h2 className="form-title">Send Us a Message</h2>
                                <p className="form-subtitle">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>

                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="john@company.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="company">Company Name</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            placeholder="Acme Inc."
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="interest">I'm interested in</label>
                                        <select
                                            id="interest"
                                            name="interest"
                                            value={formData.interest}
                                            onChange={handleChange}
                                            className="form-select"
                                        >
                                            <option value="general">General Inquiry</option>
                                            <option value="sales">Sales & Pricing</option>
                                            <option value="demo">Request a Demo</option>
                                            <option value="partnership">Partnership Opportunities</option>
                                            <option value="support">Technical Support</option>
                                            <option value="enterprise">Enterprise Solutions</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us about your project or inquiry..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="form-textarea"
                                            rows="5"
                                            required
                                        />
                                    </div>

                                    {error && <p className="error-message">{error}</p>}

                                    <button type="submit" className="submit-button">
                                        <span>Send Message</span>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="success-card">
                                <div className="success-animation">
                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                        <circle cx="40" cy="40" r="38" stroke="url(#successGrad)" strokeWidth="4" />
                                        <path d="M25 40L35 50L55 30" stroke="url(#successGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                        <defs>
                                            <linearGradient id="successGrad">
                                                <stop offset="0%" stopColor="#10B981" />
                                                <stop offset="100%" stopColor="#06B6D4" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <h2 className="success-title">Message Sent Successfully!</h2>
                                <p className="success-description">
                                    Thank you for reaching out. Our team will review your message and
                                    get back to you within 24 hours.
                                </p>
                                <div className="success-stats">
                                    <div className="success-stat">
                                        <span className="stat-value">&lt;24h</span>
                                        <span className="stat-label">Response Time</span>
                                    </div>
                                    <div className="success-stat">
                                        <span className="stat-value">100%</span>
                                        <span className="stat-label">Reply Rate</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="trust-section">
                <div className="trust-container">
                    <h3 className="trust-title">Trusted by Industry Leaders</h3>
                    <div className="trust-stats">
                        <div className="trust-stat">
                            <span className="trust-number">10M+</span>
                            <span className="trust-label">Verifications</span>
                        </div>
                        <div className="trust-stat">
                            <span className="trust-number">99.9%</span>
                            <span className="trust-label">Uptime</span>
                        </div>
                        <div className="trust-stat">
                            <span className="trust-number">200+</span>
                            <span className="trust-label">Countries</span>
                        </div>
                        <div className="trust-stat">
                            <span className="trust-number">&lt;2s</span>
                            <span className="trust-label">Verification Time</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
