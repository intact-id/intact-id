import { useState, useEffect } from 'react';
import { mockApi } from '../../../mock/mockApi';
import './ApiKeys.css';

const ApiKeys = () => {
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
    const [createdKey, setCreatedKey] = useState(null);

    useEffect(() => {
        loadKeys();
    }, []);

    const loadKeys = async () => {
        setLoading(true);
        const data = await mockApi.apiKeys.list();
        setKeys(data);
        setLoading(false);
    };

    const handleCreateKey = async () => {
        if (!newKeyName) return;
        const newKey = await mockApi.apiKeys.create(newKeyName);
        setCreatedKey(newKey);
        setNewKeyName(''); // Reset input
        loadKeys(); // Refresh list
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // Toast notification could go here
    };

    const handleRevoke = async (id) => {
        if (window.confirm("Are you sure? This action cannot be undone.")) {
            await mockApi.apiKeys.revoke(id);
            loadKeys();
        }
    };

    return (
        <div className="api-keys-page">
            <div className="keys-header">
                <div>
                    <h2>API Keys</h2>
                    <p>Manage your API keys for accessing the Intact ID platform. Treat these keys like passwords.</p>
                </div>
                <button className="create-key-btn" onClick={() => setShowModal(true)}>+ Generate New Key</button>
            </div>

            <div className="keys-list">
                {loading ? <div className="loading-spinner">Loading keys...</div> : keys.map(key => (
                    <div key={key.id} className={`api-key-card ${key.status === 'revoked' ? 'revoked' : ''}`}>
                        <div className="key-info">
                            <h3>
                                {key.name}
                                <span className={`status-badge ${key.status === 'active' ? 'passed' : 'failed'}`}>
                                    {key.status}
                                </span>
                            </h3>
                            <div className="key-meta">
                                <span>Prefix: <span className="key-prefix">{key.prefix}</span></span>
                                <span>Created: {new Date(key.created).toLocaleDateString()}</span>
                                <span>Last Used: {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}</span>
                            </div>
                        </div>
                        <div className="key-actions">
                            {key.status === 'active' && (
                                <button className="icon-btn" title="Copy Key ID" onClick={() => handleCopy(key.id)}>
                                    📋
                                </button>
                            )}
                            {key.status === 'active' && (
                                <button className="icon-btn danger" title="Revoke Key" onClick={() => handleRevoke(key.id)}>
                                    🗑️
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Key Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {!createdKey ? (
                            <>
                                <h3>Create New API Key</h3>
                                <div style={{ margin: '1.5rem 0' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Key Name / Description</label>
                                    <input
                                        type="text"
                                        className="search-input"
                                        style={{ width: '100%' }}
                                        placeholder="e.g. Production Mobile App"
                                        value={newKeyName}
                                        onChange={(e) => setNewKeyName(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                    <button className="action-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button className="create-key-btn" onClick={handleCreateKey}>Generate Key</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 style={{ color: '#10B981' }}>Key Generated Successfully!</h3>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                    Please copy this key now. You will not be able to see it again.
                                </p>
                                <div className="new-key-display">
                                    {createdKey.key}
                                </div>
                                <button className="create-key-btn" style={{ width: '100%' }} onClick={() => {
                                    handleCopy(createdKey.key);
                                    setCreatedKey(null);
                                    setShowModal(false);
                                }}>Copy & Close</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApiKeys;
