import React, { useState, useEffect } from 'react';
import './ApiDocs.css';

const ApiDocs = () => {
    const [text, setText] = useState('');
    const fullText = "> SYSTEM_STATUS: INITIALIZING...\n> LOADING_MODULE: API_DOCUMENTATION_V1.0\n> STATUS: UNDER_CONSTRUCTION\n> ESTIMATED_COMPLETION: SOON\n> _";

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, index));
            index++;
            if (index > fullText.length) {
                clearInterval(timer);
            }
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="api-docs-container">
            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="terminal-buttons">
                        <span className="close"></span>
                        <span className="minimize"></span>
                        <span className="maximize"></span>
                    </div>
                    <div className="terminal-title">user@intact-id:~/docs</div>
                </div>
                <div className="terminal-content">
                    <pre>{text}<span className="cursor">█</span></pre>

                    <div className="construction-message">
                        <h1>API DOCUMENTATION</h1>
                        <div className="progress-bar">
                            <div className="progress-fill"></div>
                        </div>
                        <p>Our developers are currently compiling the neural networks.</p>
                        <p>Check back soon for full endpoint specifications.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiDocs;
