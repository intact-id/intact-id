import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const location = useLocation();

    // Helper to get page title based on route
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/dashboard') return 'Dashboard Overview';
        if (path.includes('/verifications')) return 'Verifications';
        if (path.includes('/api-keys')) return 'API Management';
        if (path.includes('/billing')) return 'Billing & Usage';
        if (path.includes('/settings')) return 'Settings';
        return 'Dashboard';
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h1 className="page-title">{getPageTitle()}</h1>
                    <div className="header-actions">
                        <button className="action-btn">Help & Support</button>
                        <button className="action-btn">Logout</button>
                    </div>
                </header>

                <div className="content-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
