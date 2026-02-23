import { useState } from 'react';
import './ApiDocs.css';

const CodeBlock = ({ code, language }) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="code-block">
            <div className="code-block-header">
                <span className="code-lang">{language}</span>
                <button className="code-copy" onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
            </div>
            <pre><code>{code}</code></pre>
        </div>
    );
};

const SECTIONS = [
    { id: 'overview',        label: 'Overview' },
    { id: 'authentication',  label: 'Authentication' },
    { id: 'verification',    label: 'Submit Verification' },
    { id: 'get-status',      label: 'Get Verification Status' },
    { id: 'webhooks',        label: 'Webhooks' },
    { id: 'signature',       label: 'Verifying Signatures' },
    { id: 'errors',          label: 'Error Codes' },
];

const ApiDocs = () => {
    const [activeSection, setActiveSection] = useState('overview');

    return (
        <div className="docs-wrapper">
            {/* Sidebar */}
            <aside className="docs-sidebar">
                <div className="docs-sidebar-inner">
                    <p className="docs-sidebar-title">API Reference</p>
                    <nav className="docs-nav">
                        {SECTIONS.map(s => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className={`docs-nav-link ${activeSection === s.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(s.id)}
                            >
                                {s.label}
                            </a>
                        ))}
                    </nav>
                    <div className="docs-sidebar-footer">
                        <span>Base URL</span>
                        <code>api.intact-id.com</code>
                    </div>
                </div>
            </aside>

            {/* Content */}
            <main className="docs-content">

                {/* Overview */}
                <section id="overview" className="docs-section">
                    <div className="docs-section-label">Introduction</div>
                    <h1 className="docs-h1">API Documentation <span className="docs-version">v1</span></h1>
                    <p className="docs-lead">The Intact ID API lets you verify identities, retrieve verification results, and receive real-time event notifications via webhooks. All requests are authenticated using API keys and responses are JSON.</p>

                    <div className="docs-info-grid">
                        <div className="docs-info-card">
                            <span className="docs-info-label">Base URL</span>
                            <code>https://api.intact-id.com</code>
                        </div>
                        <div className="docs-info-card">
                            <span className="docs-info-label">Protocol</span>
                            <code>HTTPS only</code>
                        </div>
                        <div className="docs-info-card">
                            <span className="docs-info-label">Format</span>
                            <code>application/json</code>
                        </div>
                        <div className="docs-info-card">
                            <span className="docs-info-label">Environments</span>
                            <code>DEV · PROD</code>
                        </div>
                    </div>
                </section>

                {/* Authentication */}
                <section id="authentication" className="docs-section">
                    <div className="docs-section-label">Auth</div>
                    <h2 className="docs-h2">Authentication</h2>
                    <p>Every API request must be authenticated using two credentials: an <strong>API Key</strong> and an <strong>API Secret</strong>. Both are passed as request headers. You can generate separate key pairs for DEV and PROD from your dashboard.</p>

                    <div className="docs-credentials-grid">
                        <div className="docs-credential-card">
                            <div className="docs-credential-header">
                                <span className="docs-credential-icon">🔑</span>
                                <div>
                                    <div className="docs-credential-name">API Key</div>
                                    <code className="inline-code">X-API-Key</code>
                                </div>
                            </div>
                            <p className="docs-credential-desc">Your public identifier. Sent in the header of every request. Safe to store in app config (but not in client-side code).</p>
                        </div>
                        <div className="docs-credential-card">
                            <div className="docs-credential-header">
                                <span className="docs-credential-icon">🔒</span>
                                <div>
                                    <div className="docs-credential-name">API Secret</div>
                                    <code className="inline-code">X-API-Secret</code>
                                </div>
                            </div>
                            <p className="docs-credential-desc">Your private credential. Never expose this in client-side code or version control. Rotate it immediately if compromised.</p>
                        </div>
                    </div>

                    <div className="docs-callout docs-callout-warn">
                        Never expose your API Secret in client-side code, browser requests, or public repositories. Use server-side calls and environment variables.
                    </div>

                    <CodeBlock language="HTTP" code={`POST /api/v1/kyc/verify/tier1
X-API-Key: ak_live_your_api_key_here
X-API-Secret: sk_live_your_api_secret_here
Content-Type: application/json`} />

                    <CodeBlock language="Node.js" code={`const headers = {
  'X-API-Key': process.env.INTACT_API_KEY,
  'X-API-Secret': process.env.INTACT_API_SECRET,
  'Content-Type': 'application/json',
};`} />

                    <h3 className="docs-h3">Environments</h3>
                    <table className="docs-table">
                        <thead><tr><th>Environment</th><th>Key prefix</th><th>Secret prefix</th><th>Behaviour</th></tr></thead>
                        <tbody>
                            <tr>
                                <td><span className="badge badge-blue">DEV</span></td>
                                <td><code className="inline-code">ak_dev_...</code></td>
                                <td><code className="inline-code">sk_dev_...</code></td>
                                <td>Test mode — no real verifications, no charges</td>
                            </tr>
                            <tr>
                                <td><span className="badge badge-green">PROD</span></td>
                                <td><code className="inline-code">ak_live_...</code></td>
                                <td><code className="inline-code">sk_live_...</code></td>
                                <td>Live mode — real verifications, billed per check</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="docs-callout docs-callout-info">
                        Your DEV credentials will not work against the PROD environment and vice-versa. Make sure you switch both headers when promoting to production.
                    </div>
                </section>

                {/* Submit Verification */}
                <section id="verification" className="docs-section">
                    <div className="docs-section-label">Endpoints</div>
                    <h2 className="docs-h2">Submit Verification</h2>
                    <div className="docs-endpoint">
                        <span className="method method-post">POST</span>
                        <code>/api/v1/kyc/verify/{'{tier}'}</code>
                    </div>
                    <p>Submit a new identity verification request. Replace <code className="inline-code">{'{tier}'}</code> with <code className="inline-code">tier1</code>, <code className="inline-code">tier2</code>, or <code className="inline-code">tier3</code> depending on the depth of verification required.</p>

                    <h3 className="docs-h3">Request Body</h3>
                    <table className="docs-table">
                        <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
                        <tbody>
                            <tr><td><code className="inline-code">firstName</code></td><td>string</td><td><span className="badge badge-red">required</span></td><td>Subject's first name</td></tr>
                            <tr><td><code className="inline-code">lastName</code></td><td>string</td><td><span className="badge badge-red">required</span></td><td>Subject's last name</td></tr>
                            <tr><td><code className="inline-code">email</code></td><td>string</td><td><span className="badge badge-blue">optional</span></td><td>Subject's email address</td></tr>
                            <tr><td><code className="inline-code">phone</code></td><td>string</td><td><span className="badge badge-blue">optional</span></td><td>Subject's phone number</td></tr>
                            <tr><td><code className="inline-code">selfieBase64</code></td><td>string</td><td><span className="badge badge-red">required</span></td><td>Base64-encoded selfie image</td></tr>
                            <tr><td><code className="inline-code">idDocumentBase64</code></td><td>string</td><td><span className="badge badge-red">required</span></td><td>Base64-encoded ID document front</td></tr>
                            <tr><td><code className="inline-code">metadata</code></td><td>object</td><td><span className="badge badge-blue">optional</span></td><td>Any custom key-value pairs you want returned in results</td></tr>
                        </tbody>
                    </table>

                    <CodeBlock language="Node.js" code={`const response = await fetch('https://api.intact-id.com/api/v1/kyc/verify/tier1', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.INTACT_API_KEY,
    'X-API-Secret': process.env.INTACT_API_SECRET,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    selfieBase64: '<base64_selfie>',
    idDocumentBase64: '<base64_id_front>',
    metadata: { userId: 'usr_123' },
  }),
});

const data = await response.json();
console.log(data.data.verificationId); // e703b57f-...`} />

                    <h3 className="docs-h3">Response</h3>
                    <CodeBlock language="JSON" code={`{
  "success": true,
  "responseCode": 201,
  "responseMessage": "Verification submitted successfully",
  "data": {
    "verificationId": "703b57f6-d851-4bc2-b9c9-0b6bb53128f2",
    "status": "PROCESSING",
    "tier": "tier1",
    "createdAt": "2026-02-15T13:57:45.872333"
  }
}`} />
                </section>

                {/* Get Status */}
                <section id="get-status" className="docs-section">
                    <h2 className="docs-h2">Get Verification Status</h2>
                    <div className="docs-endpoint">
                        <span className="method method-get">GET</span>
                        <code>/api/v1/kyc/verify/{'{verificationId}'}</code>
                    </div>
                    <p>Retrieve the current status and results of a verification by its ID. Poll this endpoint or use webhooks to get notified when the result is ready.</p>

                    <CodeBlock language="Node.js" code={`const res = await fetch(
  \`https://api.intact-id.com/api/v1/kyc/verify/\${verificationId}\`,
  { headers: {
      'X-API-Key': process.env.INTACT_API_KEY,
      'X-API-Secret': process.env.INTACT_API_SECRET,
  }}
);
const { data } = await res.json();`} />

                    <h3 className="docs-h3">Response</h3>
                    <CodeBlock language="JSON" code={`{
  "success": true,
  "data": {
    "verificationId": "703b57f6-d851-4bc2-b9c9-0b6bb53128f2",
    "status": "COMPLETED",
    "overall_decision": "approved",
    "tier": "tier1",
    "verification_type": "individual",
    "completed_at": "2026-02-15T13:57:54.444917",
    "started_at": "2026-02-15T13:57:45.872333",
    "results": {
      "face_screening": {
        "decision": "approved",
        "status": "completed"
      }
    }
  }
}`} />

                    <h3 className="docs-h3">Verification Statuses</h3>
                    <table className="docs-table">
                        <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
                        <tbody>
                            <tr><td><span className="badge badge-yellow">PROCESSING</span></td><td>Verification is being processed</td></tr>
                            <tr><td><span className="badge badge-green">COMPLETED</span></td><td>Processing finished — check <code className="inline-code">overall_decision</code> for result</td></tr>
                            <tr><td><span className="badge badge-red">FAILED</span></td><td>Processing failed due to an error</td></tr>
                        </tbody>
                    </table>
                </section>

                {/* Webhooks */}
                <section id="webhooks" className="docs-section">
                    <div className="docs-section-label">Events</div>
                    <h2 className="docs-h2">Webhooks</h2>
                    <p>Configure a webhook URL in your dashboard to receive real-time POST notifications when verification events occur. Each request includes an <code className="inline-code">X-Webhook-Signature</code> header for verification.</p>

                    <h3 className="docs-h3">Event Types</h3>
                    <table className="docs-table">
                        <thead><tr><th>Event</th><th>Trigger</th></tr></thead>
                        <tbody>
                            <tr><td><code className="inline-code">verification.completed</code></td><td>A verification finished processing (approved or rejected)</td></tr>
                            <tr><td><code className="inline-code">verification.failed</code></td><td>A verification encountered a system or document error</td></tr>
                        </tbody>
                    </table>

                    <h3 className="docs-h3">Payload Example</h3>
                    <CodeBlock language="JSON" code={`{
  "eventType": "verification.completed",
  "eventId": "9c979267-67f9-4818-8b75-09396a8ef8e6",
  "timestamp": "2026-02-15T13:57:54.460841",
  "companyId": "7a74dcbb-7450-403d-92f7-36c042c2881f",
  "companyName": "Intact KYC Provider",
  "verificationId": "703b57f6-d851-4bc2-b9c9-0b6bb53128f2",
  "apiVersion": "v1",
  "data": {
    "overall_decision": "approved",
    "status": "COMPLETED",
    "tier": "tier1",
    "verification_type": "individual",
    "completed_at": "2026-02-15T13:57:54.444917",
    "started_at": "2026-02-15T13:57:45.872333",
    "results": {
      "face_screening": {
        "decision": "approved",
        "status": "completed"
      }
    }
  }
}`} />
                </section>

                {/* Signature Verification */}
                <section id="signature" className="docs-section">
                    <h2 className="docs-h2">Verifying Signatures</h2>
                    <p>Every webhook request includes an <code className="inline-code">X-Webhook-Signature</code> header containing an HMAC-SHA256 signature of the raw request body. Always verify this before processing the event.</p>

                    <div className="docs-callout docs-callout-warn">
                        Never process a webhook payload without first verifying its signature. Failing to do so exposes your system to forged events.
                    </div>

                    <p>Your signing secret is available in your dashboard under <strong>Webhook Configuration → Signing Secret</strong>.</p>

                    <CodeBlock language="Node.js" code={`import crypto from 'crypto';

export function verifyWebhookSignature(req, secret) {
  const signature = req.headers['x-webhook-signature']?.replace('sha256=', '');
  if (!signature) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(req.rawBody)          // use raw Buffer, not parsed JSON
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expected, 'hex')
  );
}

// Express handler
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!verifyWebhookSignature(req, process.env.WEBHOOK_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  const event = JSON.parse(req.body);
  // process event...
  res.sendStatus(200);
});`} />

                    <CodeBlock language="Python" code={`import hmac, hashlib

def verify_signature(raw_body: bytes, signature_header: str, secret: str) -> bool:
    signature = signature_header.replace("sha256=", "")
    expected = hmac.new(
        secret.encode(), raw_body, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected)

# Flask handler
@app.route('/webhook', methods=['POST'])
def webhook():
    if not verify_signature(request.data, request.headers.get('X-Webhook-Signature', ''), WEBHOOK_SECRET):
        return jsonify({'error': 'Invalid signature'}), 401
    event = request.json
    # process event...
    return '', 200`} />
                </section>

                {/* Error Codes */}
                <section id="errors" className="docs-section">
                    <div className="docs-section-label">Reference</div>
                    <h2 className="docs-h2">Error Codes</h2>
                    <p>All errors return a consistent JSON structure with a <code className="inline-code">responseCode</code> and <code className="inline-code">errorMessage</code>.</p>

                    <CodeBlock language="JSON" code={`{
  "success": false,
  "responseCode": 401,
  "responseMessage": "Unauthorized",
  "errorMessage": "Invalid or missing API key"
}`} />

                    <table className="docs-table">
                        <thead><tr><th>HTTP Status</th><th>Code</th><th>Meaning</th></tr></thead>
                        <tbody>
                            <tr><td>400</td><td>Bad Request</td><td>Missing or invalid request parameters</td></tr>
                            <tr><td>401</td><td>Unauthorized</td><td>Missing, invalid, or revoked API key</td></tr>
                            <tr><td>403</td><td>Forbidden</td><td>API key doesn't have access to this resource</td></tr>
                            <tr><td>404</td><td>Not Found</td><td>The requested resource does not exist</td></tr>
                            <tr><td>409</td><td>Conflict</td><td>Duplicate resource (e.g. application already exists)</td></tr>
                            <tr><td>429</td><td>Rate Limited</td><td>Too many requests — back off and retry</td></tr>
                            <tr><td>500</td><td>Server Error</td><td>An internal error occurred — contact support if persistent</td></tr>
                        </tbody>
                    </table>

                    <h3 className="docs-h3">Verification Error Codes</h3>
                    <table className="docs-table">
                        <thead><tr><th>Code</th><th>Description</th></tr></thead>
                        <tbody>
                            <tr><td><code className="inline-code">FaceNotDetectedError</code></td><td>No face found in the selfie image</td></tr>
                            <tr><td><code className="inline-code">LivenessCheckFailed</code></td><td>Liveness check did not pass</td></tr>
                            <tr><td><code className="inline-code">FaceMatchFailed</code></td><td>Selfie does not match the ID document</td></tr>
                            <tr><td><code className="inline-code">ImageQualityTooLow</code></td><td>Image is too blurry or low resolution</td></tr>
                            <tr><td><code className="inline-code">SystemError</code></td><td>Internal processing error — retry the request</td></tr>
                        </tbody>
                    </table>
                </section>

            </main>
        </div>
    );
};

export default ApiDocs;
