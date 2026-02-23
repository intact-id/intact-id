import { Link, useLocation } from 'react-router-dom';
import logo from "../../../assets/intact-logo.svg";

const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const navItems = [
        { path: '/dashboard', label: 'Overview', icon: '⚡' },
        { path: '/dashboard/verifications', label: 'Verifications', icon: '🔍' },
        { path: '/dashboard/api-keys', label: 'API Management', icon: '🔑' },
        { path: '/dashboard/billing', label: 'Billing & Plan', icon: '💳' },
        { path: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-header">
                <img src={logo} alt="Intact ID" className="sidebar-logo" />
                <span className="sidebar-brand">Intact ID</span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path)) ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-avatar">AM</div>
                <div className="user-info">
                    <span className="user-name">Alex Mercer</span>
                    <span className="user-role">Admin Workspace</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
