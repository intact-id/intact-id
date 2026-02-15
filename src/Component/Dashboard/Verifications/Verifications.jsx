import { useState, useEffect } from 'react';
import { mockApi } from '../../../mock/mockApi';
import './Verifications.css';

const Verifications = () => {
    const [verifications, setVerifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('all');

    const fetchVerifications = async () => {
        setLoading(true);
        try {
            const result = await mockApi.verifications.getList(page, 10, filter);
            setVerifications(result.data);
            setTotalPages(result.pagination.totalPages);
        } catch (error) {
            console.error("Failed to fetch verifications", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVerifications();
    }, [page, filter]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setPage(1); // Reset to first page on filter change
    };

    return (
        <div className="verifications-page">
            <div className="filters-bar">
                <input type="text" placeholder="Search by ID or User..." className="search-input" />

                <select className="search-input" value={filter} onChange={handleFilterChange} style={{ width: 'auto' }}>
                    <option value="all">All Statuses</option>
                    <option value="passed">Passed</option>
                    <option value="failed">Failed</option>
                    <option value="review">Review Needed</option>
                </select>
            </div>

            <div className="verifications-table-container">
                {loading ? (
                    <div className="loading-spinner" style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>
                ) : (
                    <table className="verifications-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Timestamp</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Details</th>
                                <th>Confidence</th>
                                <th>Region</th>
                            </tr>
                        </thead>
                        <tbody>
                            {verifications.map((v) => (
                                <tr key={v.id}>
                                    <td style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{v.id}</td>
                                    <td>{new Date(v.timestamp).toLocaleString()}</td>
                                    <td>
                                        <span className={`status-badge ${v.status}`}>
                                            {v.status}
                                        </span>
                                    </td>
                                    <td style={{ textTransform: 'capitalize' }}>{v.type.replace('_', ' ')}</td>
                                    <td>{v.user}</td>
                                    <td>
                                        <span className={`confidence-score ${v.confidence > 90 ? 'confidence-high' : (v.confidence > 70 ? 'confidence-med' : 'confidence-low')}`}>
                                            {v.confidence}%
                                        </span>
                                    </td>
                                    <td>{v.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="pagination">
                    <button
                        className="page-btn"
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                        Previous
                    </button>
                    <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', color: 'var(--text-secondary)' }}>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        className="page-btn"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Verifications;
