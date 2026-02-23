import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="content-wrapper">
                <h1 className="error-code">404</h1>
                <div className="divider"></div>
                <div className="message-container">
                    <h2>Page Not Found</h2>
                    <p>The page you are looking for doesn't exist or has been moved.</p>
                    <Link to="/" className="home-button">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
