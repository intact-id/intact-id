import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getApplicationStatus } from '../../services/api.js';
import './ApplicationStatus.css';

const STATUS_META = {
    PENDING_REVIEW: {
        label: 'Pending Review',
        color: 'status-pending',
        cardClass: 'result-pending',
        icon: '⏳',
        description: 'Your application has been received and is waiting for our team to begin the review process.',
        steps: ['step-done', 'step-active', ''],
    },
    UNDER_REVIEW: {
        label: 'Under Review',
        color: 'status-review',
        cardClass: 'result-review',
        icon: '🔍',
        description: 'Our team is actively reviewing your application. This usually takes 1–2 business days.',
        steps: ['step-done', 'step-active', ''],
    },
    APPROVED: {
        label: 'Approved',
        color: 'status-approved',
        cardClass: 'result-approved',
        icon: '✅',
        description: 'Your application has been approved. Check your email for your API credentials and next steps.',
        steps: ['step-done', 'step-done', 'step-approved'],
    },
    REJECTED: {
        label: 'Rejected',
        color: 'status-rejected',
        cardClass: 'result-rejected',
        icon: '✕',
        description: 'Your application was not approved at this time. Please check your email for details on why.',
        steps: ['step-done', 'step-done', 'step-rejected'],
    },
    PENDING: {
        label: 'Pending',
        color: 'status-pending',
        cardClass: 'result-pending',
        icon: '⏳',
        description: 'Your application has been received and is queued for review.',
        steps: ['step-done', 'step-active', ''],
    },
};

const STEP_LABELS = ['Submitted', 'Under Review', 'Decision'];
const STEP_ICONS  = ['✓', '⚙', '★'];

const ApplicationStatus = () => {
    const [searchParams] = useSearchParams();
    const [refInput, setRefInput] = useState(searchParams.get('ref') || '');
    const [query] = useState(searchParams.get('ref') || '');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (query.trim()) fetchStatus(query.trim());
    }, []);

    const fetchStatus = async (appNumber) => {
        setLoading(true);
        setError('');
        setResult(null);
        try {
            const response = await getApplicationStatus(appNumber);
            setResult(response.data);
        } catch (err) {
            if (err.response?.status === 404) {
                setError('No application found with that number. Please check and try again.');
            } else {
                setError(err.response?.data?.responseMessage || err.message || 'Unable to fetch status. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (refInput.trim()) fetchStatus(refInput.trim());
    };

    const meta = result ? (STATUS_META[result.applicationStatus] || STATUS_META['PENDING']) : null;

    return (
        <div className="track-wrapper">
            <section className="track-hero">
                <div className="track-hero-content">
                    <div className="track-badge">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" stroke="url(#tb)" strokeWidth="1.5" />
                            <path d="M8 5v3l2 2" stroke="url(#tb)" strokeWidth="1.5" strokeLinecap="round" />
                            <defs>
                                <linearGradient id="tb" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#6366F1" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        Application Tracker
                    </div>
                    <h1 className="track-title">Track Your <span className="gradient-text">Application</span></h1>
                    <p className="track-subtitle">Enter your application number to check the current status of your company registration.</p>
                </div>
            </section>

            <section className="track-body">
                <div className="track-container">

                    {/* Search form */}
                    <form className="track-search-card" onSubmit={handleSearch}>
                        <label className="track-label">Application Number</label>
                        <div className="track-input-row">
                            <input
                                className="track-input"
                                type="text"
                                placeholder="APP-2026-XXXXXXXX"
                                value={refInput}
                                onChange={(e) => setRefInput(e.target.value)}
                                spellCheck={false}
                                autoComplete="off"
                            />
                            <button type="submit" className="track-btn" disabled={loading || !refInput.trim()}>
                                {loading ? 'Checking…' : 'Check Status'}
                            </button>
                        </div>
                        <p className="track-hint">Your application number was emailed to you when you submitted your application.</p>
                    </form>

                    {/* Error */}
                    {error && <div className="track-error">{error}</div>}

                    {/* Result */}
                    {result && meta && (
                        <div className={`track-result-card ${meta.cardClass}`}>

                            {/* Header — status badge + description */}
                            <div className="track-result-header">
                                <div className={`track-status-badge ${meta.color}`}>
                                    <span>{meta.icon}</span>
                                    <span>{meta.label}</span>
                                </div>
                                <p className="track-status-description">{meta.description}</p>
                                {result.applicationStatus === 'APPROVED' && (
                                    <p className="track-approved-note">
                                        <span>✉</span>
                                        Check your inbox — we've sent your API credentials and next steps.
                                    </p>
                                )}
                            </div>

                            {/* Step progress */}
                            <div className="track-steps">
                                {STEP_LABELS.map((label, i) => (
                                    <div key={label} className={`track-step ${meta.steps[i] || ''}`}>
                                        <div className="step-dot">{STEP_ICONS[i]}</div>
                                        <span className="step-label">{label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Data grid */}
                            <div className="track-result-body">
                                <div className="track-result-grid">
                                    <div className="track-result-item">
                                        <span className="track-result-label">Application Number</span>
                                        <span className="track-result-value mono">{result.applicationNumber}</span>
                                    </div>
                                    <div className="track-result-item">
                                        <span className="track-result-label">Company Name</span>
                                        <span className="track-result-value">{result.legalName}</span>
                                    </div>
                                    <div className="track-result-item">
                                        <span className="track-result-label">Business Type</span>
                                        <span className="track-result-value">{result.businessType || '—'}</span>
                                    </div>
                                    <div className="track-result-item">
                                        <span className="track-result-label">Submitted</span>
                                        <span className="track-result-value">
                                            {result.createdAt
                                                ? new Date(result.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                                : '—'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="track-footer-links">
                        <span>Haven't applied yet?</span>
                        <Link to="/apply">Start your application →</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ApplicationStatus;
