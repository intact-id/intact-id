// Basic user data
export const MOCK_USER = {
    id: "usr_8f92k20",
    name: "Alex Mercer",
    email: "alex.mercer@cybersec-x.com",
    role: "Admin",
    company: "CyberSec X",
    avatar: "https://ui-avatars.com/api/?name=Alex+Mercer&background=00f2ff&color=050505"
};

// Dashboard Statistics
export const MOCK_STATS = {
    totalVerifications: 12847,
    successRate: 94.2,
    avgResponseTime: "142ms",
    thisMonth: {
        total: 2341,
        passed: 2205,
        failed: 136
    },
    trend: 12.5 // Percentage increase
};

// Billing Information
export const MOCK_BILLING = {
    plan: {
        name: "Enterprise",
        price: 499,
        billingCycle: "monthly",
        includedVerifications: 10000,
        features: ["Unlimited API Keys", "Priority Support", "Custom Retention", "SSO"]
    },
    usage: {
        currentMonth: 2341,
        limit: 10000,
        percentUsed: 23.41,
        nextBillingDate: "2026-02-01T00:00:00Z"
    },
    invoices: [
        { id: "inv_2024_01", date: "2026-01-01", amount: 499, status: "paid" },
        { id: "inv_2023_12", date: "2025-12-01", amount: 499, status: "paid" },
        { id: "inv_2023_11", date: "2025-11-01", amount: 499, status: "paid" }
    ]
};

// API Keys
export const MOCK_API_KEYS = [
    {
        id: "key_prod_992",
        name: "Production API Key",
        prefix: "ix_live_",
        created: "2025-10-15T09:00:00Z",
        lastUsed: "2026-01-31T10:23:00Z",
        status: "active"
    },
    {
        id: "key_test_881",
        name: "Staging Environment",
        prefix: "ix_test_",
        created: "2025-11-01T10:30:00Z",
        lastUsed: "2026-01-30T15:45:00Z",
        status: "active"
    },
    {
        id: "key_dev_775",
        name: "Local Development",
        prefix: "ix_test_",
        created: "2025-12-10T14:20:00Z",
        lastUsed: "2026-01-25T09:12:00Z",
        status: "revoked"
    }
];

// Helper to generate realistic-looking verification data
const generateVerifications = (count) => {
    const types = ["government_id", "biometric", "document", "aml_check"];
    const statuses = ["passed", "failed", "pending", "review"];
    const countries = ["US", "GB", "DE", "FR", "CA", "AU", "JP", "BR"];

    return Array.from({ length: count }, (_, i) => {
        const status = Math.random() > 0.1 ? "passed" : (Math.random() > 0.5 ? "failed" : "review");
        const date = new Date();
        date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 10000));

        return {
            id: `ver_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: date.toISOString(),
            status: status,
            type: types[Math.floor(Math.random() * types.length)],
            confidence: status === "passed" ? (95 + Math.random() * 5).toFixed(1) : (Math.random() * 60).toFixed(1),
            user: `User-${Math.floor(Math.random() * 1000)}`, // Redacted/Internal ID
            country: countries[Math.floor(Math.random() * countries.length)],
            metadata: {
                ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)..."
            }
        };
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const MOCK_VERIFICATIONS = generateVerifications(100);

// Activity Log events
export const MOCK_ACTIVITY = [
    {
        id: "act_001",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
        type: "verification.completed",
        description: "Verification completed for User-842",
        status: "success"
    },
    {
        id: "act_002",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        type: "billing.invoice_paid",
        description: "Invoice #INV-2024-001 processed successfully",
        status: "success"
    },
    {
        id: "act_003",
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        type: "api_key.created",
        description: "New API Key 'Mobile App Prod' created",
        user: "Alex Mercer",
        status: "info"
    },
    {
        id: "act_004",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        type: "system.alert",
        description: "High traffic volume detected from region: EU-West",
        status: "warning"
    },
    {
        id: "act_005",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        type: "user.login",
        description: "Successful login from new device",
        user: "Alex Mercer",
        status: "success"
    }
];
