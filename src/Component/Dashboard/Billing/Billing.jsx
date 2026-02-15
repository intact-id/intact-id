import { useState, useEffect } from 'react';
import { mockApi } from '../../../mock/mockApi';
import './Billing.css';

const Billing = () => {
    const [billing, setBilling] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBilling = async () => {
            const data = await mockApi.billing.getDetails();
            setBilling(data);
            setLoading(false);
        };
        fetchBilling();
    }, []);

    if (loading) return <div className="loading-spinner">Loading billing info...</div>;

    const { plan, usage, invoices } = billing;

    return (
        <div className="billing-page">
            <div className="plan-card">
                <div className="plan-header">
                    <div>
                        <h2 className="plan-name">{plan.name} Plan</h2>
                        <span style={{ color: 'var(--text-secondary)' }}>Next billing date: {new Date(usage.nextBillingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="plan-price">${plan.price}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/mo</span></div>
                </div>

                <div className="usage-container">
                    <div className="usage-header">
                        <span>Monthly Verifications Usage</span>
                        <span>{usage.percentUsed}% ({usage.currentMonth} / {usage.limit})</span>
                    </div>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${usage.percentUsed}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="invoices-section">
                <h3 className="section-title">Invoice History</h3>
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((inv) => (
                            <tr key={inv.id}>
                                <td style={{ fontFamily: 'monospace' }}>{inv.id}</td>
                                <td>{inv.date}</td>
                                <td>${inv.amount}</td>
                                <td><span className="status-badge passed">{inv.status}</span></td>
                                <td><a href="#" style={{ color: 'var(--accent-cyan)' }}>PDF</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Billing;
