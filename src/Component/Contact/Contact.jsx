import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Email is required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setSubmitted(true);
        setTimeout(() => {
            setEmail('');
            setName('');
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <Link to="/" className="back-link">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>

                <div className="contact-grid">
                    <div className="contact-content">
                        <div className="contact-header">
                            <h1>Get in <span className="gradient-text">Touch</span></h1>
                            <p className="subtitle-text">Join the waitlist for early access to Intact ID. We're onboarding new partners every week.</p>
                        </div>

                        <div className="info-cards">
                            <div className="info-card">
                                <div className="info-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <path d="M22 6l-10 7L2 6" />
                                    </svg>
                                </div>
                                <div>
                                    <h3>Email Us</h3>
                                    <p>contact@intactid.com</p>
                                </div>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div>
                                    <h3>Visit Us</h3>
                                    <p>San Francisco, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-wrapper">
                        <div className="waitlist-card">
                            <h2>Join Waitlist</h2>
                            <p className="waitlist-desc">Secure your spot for the next generation of identity verification.</p>

                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="waitlist-form">
                                    <div className="form-group">
                                        <label>Name (Optional)</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    {error && <p className="error-message">{error}</p>}
                                    <button type="submit" className="submit-btn">
                                        Join Waitlist
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </form>
                            ) : (
                                <div className="success-message">
                                    <div className="success-icon">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <h3>You're on the list!</h3>
                                    <p>We'll be in touch soon with early access details.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
