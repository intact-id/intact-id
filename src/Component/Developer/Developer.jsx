import "./Developer.css";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const Developer = () => {
    const [copied, setCopied] = useState(false);
    const [activeLang, setActiveLang] = useState('node');

    const snippets = {
        node: {
            title: 'verify-user.js',
            code: `const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const form = new FormData();
form.append('firstName', 'Jane');
form.append('lastName', 'Doe');
form.append('dateOfBirth', '1990-05-15');
form.append('idNumber', '12345678');
form.append('idType', 'national_id');
form.append('nationality', 'KE');
form.append('phone', '+254700000000');
form.append('email', 'jane@example.com');
form.append('verificationType', 'individual');
form.append('selfie',  fs.createReadStream('./selfie.jpg'));
form.append('idFront', fs.createReadStream('./id_front.jpg'));
form.append('idBack',  fs.createReadStream('./id_back.jpg'));

const res = await axios.post(
  'https://api.intact-id.com/api/v1/kyc/verify/TIER_1',
  form,
  { headers: { ...form.getHeaders(),
      'X-API-Key':    process.env.INTACT_API_KEY,
      'X-API-Secret': process.env.INTACT_API_SECRET } }
);
console.log(res.data.data.verificationId);`
        },
        python: {
            title: 'verify_user.py',
            code: `import requests, os

res = requests.post(
  "https://api.intact-id.com/api/v1/kyc/verify/TIER_1",
  headers={
    "X-API-Key":    os.environ["INTACT_API_KEY"],
    "X-API-Secret": os.environ["INTACT_API_SECRET"],
  },
  data={
    "firstName":        "Jane",
    "lastName":         "Doe",
    "dateOfBirth":      "1990-05-15",
    "idNumber":         "12345678",
    "idType":           "national_id",
    "nationality":      "KE",
    "phone":            "+254700000000",
    "email":            "jane@example.com",
    "verificationType": "individual",
  },
  files={
    "selfie":  open("selfie.jpg", "rb"),
    "idFront": open("id_front.jpg", "rb"),
    "idBack":  open("id_back.jpg", "rb"),
  }
)
print(res.json()["data"]["verificationId"])`
        },
        go: {
            title: 'main.go',
            code: `package main

import (
    "bytes"
    "fmt"
    "mime/multipart"
    "net/http"
    "os"
)

func main() {
    var body bytes.Buffer
    w := multipart.NewWriter(&body)
    w.WriteField("firstName", "Jane")
    w.WriteField("lastName", "Doe")
    w.WriteField("dateOfBirth", "1990-05-15")
    w.WriteField("idNumber", "12345678")
    w.WriteField("idType", "national_id")
    w.WriteField("nationality", "KE")
    w.WriteField("email", "jane@example.com")
    w.WriteField("verificationType", "individual")
    w.Close()

    req, _ := http.NewRequest("POST",
        "https://api.intact-id.com/api/v1/kyc/verify/TIER_1",
        &body)
    req.Header.Set("Content-Type", w.FormDataContentType())
    req.Header.Set("X-API-Key", os.Getenv("INTACT_API_KEY"))
    req.Header.Set("X-API-Secret", os.Getenv("INTACT_API_SECRET"))

    client := &http.Client{}
    res, _ := client.Do(req)
    fmt.Println(res.Status)
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

                    <a href="https://docs.intact-io.com/" className="doc-link" target="_blank" rel="noreferrer">Read the Documentation →</a>
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
                        <SyntaxHighlighter
                            language={activeLang === 'node' ? 'javascript' : activeLang}
                            style={vscDarkPlus}
                            customStyle={{
                                margin: 0,
                                padding: '1.25rem',
                                background: 'transparent',
                                fontSize: '0.85rem',
                                lineHeight: '1.6',
                            }}
                            showLineNumbers
                            wrapLongLines
                        >
                            {snippets[activeLang].code}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Developer;
