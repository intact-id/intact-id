import { useState } from 'react';
import './Apply.css';

const Apply = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        // Company Information
        legalName: '',
        tradingName: '',
        registrationNumber: '',
        email: '',
        phone: '',
        website: '',
        country: 'KE',
        businessType: '',

        // Contact Person
        contactPersonName: '',
        contactPersonTitle: '',
        contactPersonEmail: '',
        contactPersonPhone: ''
    });

    const [errors, setErrors] = useState({});

    const businessTypes = [
        { value: 'digital_lender', label: 'Digital Lender' },
        { value: 'crypto_exchange', label: 'Crypto Exchange' },
        { value: 'neobank', label: 'Neobank' },
        { value: 'fintech', label: 'FinTech Platform' },
        { value: 'payment_processor', label: 'Payment Processor' },
        { value: 'remittance', label: 'Remittance Service' },
        { value: 'insurance', label: 'Insurance Provider' },
        { value: 'ecommerce', label: 'E-Commerce' },
        { value: 'other', label: 'Other' }
    ];

    const countries = [
        { code: 'KE', name: 'Kenya' },
        { code: 'NG', name: 'Nigeria' },
        { code: 'ZA', name: 'South Africa' },
        { code: 'GH', name: 'Ghana' },
        { code: 'UG', name: 'Uganda' },
        { code: 'TZ', name: 'Tanzania' },
        { code: 'RW', name: 'Rwanda' },
        { code: 'US', name: 'United States' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'SG', name: 'Singapore' },
        { code: 'AE', name: 'United Arab Emirates' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.legalName.trim()) newErrors.legalName = 'Legal name is required';
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email';
            }
            if (!formData.businessType) newErrors.businessType = 'Business type is required';
        }

        if (step === 2) {
            if (!formData.contactPersonName.trim()) {
                newErrors.contactPersonName = 'Contact person name is required';
            }
            if (formData.contactPersonEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactPersonEmail)) {
                newErrors.contactPersonEmail = 'Please enter a valid email';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep(2)) {
            console.log('Form submitted:', formData);
            setSubmitted(true);

            // Reset after 5 seconds
            setTimeout(() => {
                setSubmitted(false);
                setCurrentStep(1);
                setFormData({
                    legalName: '',
                    tradingName: '',
                    registrationNumber: '',
                    email: '',
                    phone: '',
                    website: '',
                    country: 'KE',
                    businessType: '',
                    contactPersonName: '',
                    contactPersonTitle: '',
                    contactPersonEmail: '',
                    contactPersonPhone: ''
                });
            }, 5000);
        }
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return 'Company Information';
            case 2: return 'Contact Person';
            case 3: return 'Review & Submit';
            default: return '';
        }
    };

    const getStepDescription = () => {
        switch (currentStep) {
            case 1: return 'Tell us about your company';
            case 2: return 'Primary contact details';
            case 3: return 'Review your application';
            default: return '';
        }
    };

    return (
        <div className="apply-wrapper">
            {/* Hero Section */}
            <section className="apply-hero">
                <div className="apply-hero-content">
                    <div className="apply-badge">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="4" width="12" height="8" rx="1" stroke="url(#applyBadge)" strokeWidth="1.5" />
                            <path d="M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4" stroke="url(#applyBadge)" strokeWidth="1.5" />
                            <defs>
                                <linearGradient id="applyBadge">
                                    <stop offset="0%" stopColor="#6366F1" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        Company Application
                    </div>
                    <h1 className="apply-hero-title">
                        Partner With
                        <span className="gradient-text"> Intact ID</span>
                    </h1>
                    <p className="apply-hero-description">
                        Join leading companies using Intact ID for secure, compliant identity verification.
                        Complete the application below to get started.
                    </p>
                </div>

                {/* Animated particles */}
                <div className="apply-particle particle-1"></div>
                <div className="apply-particle particle-2"></div>
                <div className="apply-particle particle-3"></div>
            </section>

            {/* Application Form */}
            <section className="apply-form-section">
                <div className="apply-container">
                    {!submitted ? (
                        <>
                            {/* Progress Steps */}
                            <div className="progress-steps">
                                <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                                    <div className="step-number">
                                        {currentStep > 1 ? (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M5 10L8 13L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : '1'}
                                    </div>
                                    <div className="step-info">
                                        <span className="step-label">Step 1</span>
                                        <span className="step-title">Company Info</span>
                                    </div>
                                </div>

                                <div className="step-line"></div>

                                <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                                    <div className="step-number">
                                        {currentStep > 2 ? (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M5 10L8 13L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : '2'}
                                    </div>
                                    <div className="step-info">
                                        <span className="step-label">Step 2</span>
                                        <span className="step-title">Contact Person</span>
                                    </div>
                                </div>

                                <div className="step-line"></div>

                                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                                    <div className="step-number">3</div>
                                    <div className="step-info">
                                        <span className="step-label">Step 3</span>
                                        <span className="step-title">Review</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form Card */}
                            <div className="application-form-card">
                                <div className="form-header">
                                    <h2 className="form-step-title">{getStepTitle()}</h2>
                                    <p className="form-step-description">{getStepDescription()}</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Step 1: Company Information */}
                                    {currentStep === 1 && (
                                        <div className="form-step">
                                            <div className="form-grid">
                                                <div className="form-group full-width">
                                                    <label htmlFor="legalName">Legal Name *</label>
                                                    <input
                                                        type="text"
                                                        id="legalName"
                                                        name="legalName"
                                                        placeholder="Intact Fintech Ltd"
                                                        value={formData.legalName}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.legalName ? 'error' : ''}`}
                                                    />
                                                    {errors.legalName && <span className="error-text">{errors.legalName}</span>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="tradingName">Trading Name</label>
                                                    <input
                                                        type="text"
                                                        id="tradingName"
                                                        name="tradingName"
                                                        placeholder="Intact Pay"
                                                        value={formData.tradingName}
                                                        onChange={handleChange}
                                                        className="form-input"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="registrationNumber">Registration Number</label>
                                                    <input
                                                        type="text"
                                                        id="registrationNumber"
                                                        name="registrationNumber"
                                                        placeholder="PVT-123456"
                                                        value={formData.registrationNumber}
                                                        onChange={handleChange}
                                                        className="form-input"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="email">Company Email *</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        placeholder="support@intact.com"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.email ? 'error' : ''}`}
                                                    />
                                                    {errors.email && <span className="error-text">{errors.email}</span>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="phone">Company Phone</label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        placeholder="+254712345678"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="form-input"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="website">Website</label>
                                                    <input
                                                        type="url"
                                                        id="website"
                                                        name="website"
                                                        placeholder="https://intact.com"
                                                        value={formData.website}
                                                        onChange={handleChange}
                                                        className="form-input"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="country">Country</label>
                                                    <select
                                                        id="country"
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleChange}
                                                        className="form-select"
                                                    >
                                                        {countries.map(country => (
                                                            <option key={country.code} value={country.code}>
                                                                {country.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="businessType">Business Type *</label>
                                                    <select
                                                        id="businessType"
                                                        name="businessType"
                                                        value={formData.businessType}
                                                        onChange={handleChange}
                                                        className={`form-select ${errors.businessType ? 'error' : ''}`}
                                                    >
                                                        <option value="">Select business type</option>
                                                        {businessTypes.map(type => (
                                                            <option key={type.value} value={type.value}>
                                                                {type.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.businessType && <span className="error-text">{errors.businessType}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Contact Person */}
                                    {currentStep === 2 && (
                                        <div className="form-step">
                                            <div className="form-grid">
                                                <div className="form-group full-width">
                                                    <label htmlFor="contactPersonName">Full Name *</label>
                                                    <input
                                                        type="text"
                                                        id="contactPersonName"
                                                        name="contactPersonName"
                                                        placeholder="John Doe"
                                                        value={formData.contactPersonName}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.contactPersonName ? 'error' : ''}`}
                                                    />
                                                    {errors.contactPersonName && <span className="error-text">{errors.contactPersonName}</span>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="contactPersonTitle">Title / Role</label>
                                                    <input
                                                        type="text"
                                                        id="contactPersonTitle"
                                                        name="contactPersonTitle"
                                                        placeholder="CTO"
                                                        value={formData.contactPersonTitle}
                                                        onChange={handleChange}
                                                        className="form-input"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="contactPersonEmail">Email</label>
                                                    <input
                                                        type="email"
                                                        id="contactPersonEmail"
                                                        name="contactPersonEmail"
                                                        placeholder="john.doe@intact.com"
                                                        value={formData.contactPersonEmail}
                                                        onChange={handleChange}
                                                        className={`form-input ${errors.contactPersonEmail ? 'error' : ''}`}
                                                    />
                                                    {errors.contactPersonEmail && <span className="error-text">{errors.contactPersonEmail}</span>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="contactPersonPhone">Phone</label>
                                                    <input
                                                        type="tel"
                                                        id="contactPersonPhone"
                                                        name="contactPersonPhone"
                                                        placeholder="+254711223344"
                                                        value={formData.contactPersonPhone}
                                                        onChange={handleChange}
                                                        className="form-input"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Review */}
                                    {currentStep === 3 && (
                                        <div className="form-step review-step">
                                            <div className="review-section">
                                                <h3 className="review-section-title">Company Information</h3>
                                                <div className="review-grid">
                                                    <div className="review-item">
                                                        <span className="review-label">Legal Name</span>
                                                        <span className="review-value">{formData.legalName || '-'}</span>
                                                    </div>
                                                    <div className="review-item">
                                                        <span className="review-label">Trading Name</span>
                                                        <span className="review-value">{formData.tradingName || '-'}</span>
                                                    </div>
                                                    <div className="review-item">
                                                        <span className="review-label">Registration Number</span>
                                                        <span className="review-value">{formData.registrationNumber || '-'}</span>
                                                    </div>
                                                    <div className="review-item">
                                                        <span className="review-label">Email</span>
                                                        <span className="review-value">{formData.email}</span>
                                                    </div>
                                                    <div className="review-item">
                                                        <span className="review-label">Phone</span>
                                                        <span className="review-value">{formData.phone || '-'}</span>
                                                    </div>
                                                    <div className="review-item">
                                                        <span className="review-label">Website</span>
                                                        <span className="review-value">{formData.website || '-'}</span>
                                                    </div>
                                                    <div className="review-item">
                                                        <span className="review-label">Country</span>
                                                        <span className="review-value">
                                                            {countries.find(c => c.code === formData.country)?.name}
                                                        </span>
                                                    </div>
                                                    <div className="review-item">
                                                        <span className="review-label">Business Type</span>
                                                        <span className="review-value">
                                                            {businessTypes.find(t => t.value === formData.businessType)?.label || '-'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="review-section">
                                                <h3 className="review-section-title">Contact Person</h3>
                                                <div className="review-grid">
                                                    <div className="review-item">
                                                        <span className="review-label">Full Name</span>
                                                        <span className="review-value">{formData.contactPersonName}</span>
                                                    </div>
                                                    <div className="review-item">
                                                        <span className="review-label">Title</span>
                                                        <span className="review-value">{formData.contactPersonTitle || '-'}</span>
                                                    </div>
                                                    <div className="review-item">
                                                        <span className="review-label">Email</span>
                                                        <span className="review-value">{formData.contactPersonEmail || '-'}</span>
                                                    </div>
                                                    <div className="review-item">
                                                        <span className="review-label">Phone</span>
                                                        <span className="review-value">{formData.contactPersonPhone || '-'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Form Actions */}
                                    <div className="form-actions">
                                        {currentStep > 1 && (
                                            <button type="button" onClick={prevStep} className="btn-secondary">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Previous
                                            </button>
                                        )}

                                        {currentStep < 3 ? (
                                            <button type="button" onClick={nextStep} className="btn-primary">
                                                Next
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button type="submit" className="btn-primary">
                                                Submit Application
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M5 10L8 13L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="success-card-apply">
                            <div className="success-animation-apply">
                                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                                    <circle cx="50" cy="50" r="48" stroke="url(#successGradApply)" strokeWidth="4" />
                                    <path d="M30 50L42 62L70 34" stroke="url(#successGradApply)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                    <defs>
                                        <linearGradient id="successGradApply">
                                            <stop offset="0%" stopColor="#10B981" />
                                            <stop offset="100%" stopColor="#06B6D4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <h2 className="success-title-apply">Application Submitted!</h2>
                            <p className="success-description-apply">
                                Thank you for your application. Our team will review your submission and
                                contact you within 2-3 business days.
                            </p>
                            <div className="success-next-steps">
                                <h3>What's Next?</h3>
                                <ul>
                                    <li>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M5 10L8 13L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Application review (1-2 business days)
                                    </li>
                                    <li>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M5 10L8 13L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Account setup and API credentials
                                    </li>
                                    <li>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M5 10L8 13L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Integration support and onboarding
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Apply;
