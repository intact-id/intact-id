import './Settings.css';

const Settings = () => {
    return (
        <div className="settings-page">
            <div className="settings-section">
                <h2 className="section-title">Profile Settings</h2>
                <form className="settings-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-input" defaultValue="Alex Mercer" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-input" defaultValue="alex.mercer@cybersec-x.com" disabled />
                    </div>
                </form>
            </div>

            <div className="settings-section">
                <div className="section-header">
                    <h2 className="section-title">Team Members</h2>
                    <button className="action-btn">Invite Member</button>
                </div>

                <div className="team-list">
                    <div className="team-member">
                        <div className="member-info">
                            <div className="member-avatar">AM</div>
                            <div>
                                <div className="user-name">Alex Mercer</div>
                                <div className="user-role">Owner</div>
                            </div>
                        </div>
                        <span className="status-badge passed">Active</span>
                    </div>
                    <div className="team-member">
                        <div className="member-info">
                            <div className="member-avatar" style={{ background: 'linear-gradient(135deg, #EC4899, #8B5CF6)' }}>JD</div>
                            <div>
                                <div className="user-name">Jane Doe</div>
                                <div className="user-role">Developer</div>
                            </div>
                        </div>
                        <span className="status-badge passed">Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
