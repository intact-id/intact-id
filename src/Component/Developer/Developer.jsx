import "./Developer.css";
import { useState } from "react";

const Developer = () => {
    const [copied, setCopied] = useState(false);
    const [activeLang, setActiveLang] = useState('node');

    const snippets = {
        node: {
            title: 'verify-user.js',
            code: `const intact = require('intact-id');

const verification = await intact.verify({
  document: 'passport',
  user_id: 'user_123',
  mode: 'fast'
});

console.log(verification.status); 
// Output: 'verified'`
        },
        python: {
            title: 'verify_user.py',
            code: `import intact_id

verification = intact_id.verify(
    document='passport',
    user_id='user_123',
    mode='fast'
)

print(verification.status)
# Output: 'verified'`
        },
        go: {
            title: 'main.go',
            code: `package main

import "github.com/intact-id/sdk"

func main() {
    verification, _ := sdk.Verify(sdk.Config{
        Document: "passport",
        UserID:   "user_123",
        Mode:     "fast",
    })
    
    println(verification.Status)
    // Output: 'verified'
}`
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(snippets[activeLang].code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="developer-section">
            <div className="developer-container">
                <div className="developer-content">
                    <span className="dev-badge">Built for Developers</span>
                    <h2>Integrate in <span className="gradient-text">Minutes</span></h2>
                    <p>Our robust SDKs and APIs are designed to be dropped into your existing stack with minimal effort. Support for Node.js, Python, Go, and more.</p>

                    <div className="dev-features">
                        <div className="dev-feature">
                            <span className="feature-icon">⚡</span>
                            <div>
                                <h4>Low Latency</h4>
                                <p>Sub-200ms response times</p>
                            </div>
                        </div>
                        <div className="dev-feature">
                            <span className="feature-icon">🛡️</span>
                            <div>
                                <h4>Bank-Grade Security</h4>
                                <p>SOC2 & GDPR Compliant</p>
                            </div>
                        </div>
                    </div>

                    <a href="/docs" className="doc-link">Read the Documentation →</a>
                </div>

                <div className="code-window">
                    <div className="window-header">
                        <div className="window-dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <span className="window-title">{snippets[activeLang].title}</span>
                        <button className="copy-btn" onClick={handleCopy}>
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>

                    <div className="lang-tabs">
                        <button
                            className={`lang-tab ${activeLang === 'node' ? 'active' : ''}`}
                            onClick={() => setActiveLang('node')}
                        >
                            Node.js
                        </button>
                        <button
                            className={`lang-tab ${activeLang === 'python' ? 'active' : ''}`}
                            onClick={() => setActiveLang('python')}
                        >
                            Python
                        </button>
                        <button
                            className={`lang-tab ${activeLang === 'go' ? 'active' : ''}`}
                            onClick={() => setActiveLang('go')}
                        >
                            Go
                        </button>
                    </div>

                    <div className="code-content">
                        <pre>
                            <code>{snippets[activeLang].code}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Developer;
