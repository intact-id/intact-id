import { useState, useEffect } from 'react';
import { mockApi } from '../../../mock/mockApi';
import './DashboardOverview.css';

const DashboardOverview = () => {
    const [stats, setStats] = useState(null);
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, activityData] = await Promise.all([
                    mockApi.dashboard.getStats(),
                    mockApi.dashboard.getActivity()
                ]);
                setStats(statsData);
                setActivity(activityData);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading-spinner">Loading...</div>;

    return (
        <div className="dashboard-overview">
            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card primary">
                    <h3 className="stat-title">Total Verifications</h3>
                    <div className="stat-value-container">
                        <span className="stat-value">{stats.totalVerifications.toLocaleString()}</span>
                        <span className="stat-trend">+{stats.trend}%</span>
                    </div>
                </div>

                <div className="stat-card success">
                    <h3 className="stat-title">Success Rate</h3>
                    <div className="stat-value-container">
                        <span className="stat-value">{stats.successRate}%</span>
                        <span className="stat-trend">+0.8%</span>
                    </div>
                </div>

                <div className="stat-card warning">
                    <h3 className="stat-title">Avg. Response Time</h3>
                    <div className="stat-value-container">
                        <span className="stat-value">{stats.avgResponseTime}</span>
                        <span className="stat-trend negative">-12ms</span>
                    </div>
                </div>

                <div className="stat-card danger">
                    <h3 className="stat-title">Failed Checks (Since 30d)</h3>
                    <div className="stat-value-container">
                        <span className="stat-value">{stats.thisMonth.failed}</span>
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="overview-sections">
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">Recent Activity</h2>
                        {/* A dropdown or filter could go here */}
                    </div>
                    <div className="activity-list">
                        {activity.map((item) => (
                            <div key={item.id} className={`activity-item ${getCodeFromType(item.type)}`}>
                                <div className="activity-icon">
                                    {getIconFromType(item.type)}
                                </div>
                                <div className="activity-content">
                                    <span className="activity-desc">{item.description}</span>
                                    <span className="activity-time">{formatTimeAgo(item.timestamp)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">Quick Actions</h2>
                    </div>
                    <div className="quick-actions">
                        <button className="quick-action-btn">
                            <span className="quick-action-icon">🔑</span>
                            Generate API Key
                        </button>
                        <button className="quick-action-btn">
                            <span className="quick-action-icon">👥</span>
                            Invite Team Member
                        </button>
                        <button className="quick-action-btn">
                            <span className="quick-action-icon">💳</span>
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper functions for UI Logic
const getCodeFromType = (type) => {
    if (type.includes('success') || type.includes('completed')) return 'success';
    if (type.includes('warning') || type.includes('alert')) return 'warning';
    return 'info';
};

const getIconFromType = (type) => {
    if (type.includes('verification')) return '✓';
    if (type.includes('billing')) return '$';
    if (type.includes('api_key')) return '🔑';
    if (type.includes('alert')) return '!';
    return '•';
};

const formatTimeAgo = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
};

export default DashboardOverview;
