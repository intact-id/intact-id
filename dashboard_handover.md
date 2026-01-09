# Intact ID - Project Documentation & Dashboard Handover

## 1. Executive Summary
**Project Name:** Intact ID
**Purpose:** Next-generation identity verification platform.
**Current State:** A high-fidelity marketing website and documentation portal is implemented. The next phase is to build a functional **Client Dashboard** for users to manage verifications, API keys, and billing.

## 2. Technical Architecture
- **Framework:** React 18 (Vite)
- **Language:** JavaScript (ES6+) / JSX
- **Styling:** Vanilla CSS (Modular & Global)
- **Routing:** React Router DOM v6
- **State Management:** Local state (useState/useEffect) - *Dashboard may require Context API or Redux.*

### Directory Structure
```
src/
├── assets/          # Images, SVGs, Global Styles
├── Component/       # Feature-based component folders
│   ├── Navbar/      # Main Navigation
│   ├── Hero/        # Landing Page Hero
│   ├── Footer/      # Global Footer
│   ├── ApiDocs/     # API Documentation (Terminal Style)
│   ├── PrivacyPolicy/ # Legal Pages
│   ├── TermsOfService/ # Legal Pages
│   ├── NotFound/    # 404 Error Page
│   └── ... (Support, Process, Pricing, etc.)
├── App.jsx          # Main Routing Configuration
└── main.jsx         # Entry Point
```

## 3. Design System
The application follows a "Cybersecurity/Futuristic" aesthetic.

### Color Palette
- **Backgrounds:** Deep dark blues/blacks (`#0b0f19`, `#050505`)
- **Accents:** Cyan (`#00f2ff`), Neon Blue (`#0066ff`), Alert Red (`#ff0055`)
- **Text:** White (`#fff`) for headings, Light Grey (`#8b949e`, `#d1d5db`) for body.

### Typography
- **Primary Font:** `Inter` (Clean, modern sans-serif)
- **Monospace:** `Fira Code` or `Courier New` (For code/terminal elements)

### UI Patterns
- **Glassmorphism:** Semi-transparent backgrounds with blur (`backdrop-filter: blur(10px)`).
- **Gradients:** Subtle linear gradients on text and borders.
- **Animations:** Smooth transitions, hover effects, and CSS keyframe animations (glitch, scanlines).

## 4. Dashboard Requirements
The new dashboard should integrate seamlessly with the existing brand identity.

### Core Features to Build
1.  **Overview / Home**:
    -   Real-time verification stats (Total, Passed, Failed).
    -   Recent activity log.
    -   System status indicator.
2.  **Verifications**:
    -   Table view of all verification requests.
    -   Detail view for individual identity checks (PII redaction required).
3.  **API Management**:
    -   Generate/Revoke API Keys.
    -   Usage quotas and rate limiting visualization.
4.  **Billing & Plan**:
    -   Current plan details (Start-up, Enterprise).
    -   Usage metering (volume-based).
5.  **Settings**:
    -   Team management (Invite members).
    -   Webhook configuration.

### Technical Recommendations
-   **Authentication:** Implement JWT-based auth. Create a shared `AuthContext`.
-   **Layout:** Create a `DashboardLayout` component with a sidebar navigation, distinct from the public `NavBar`.
-   **Components:** Reuse existing UI patterns (Buttons, Cards, Inputs) but adapt for denser information display (Data Tables).

## 5. Mock Server & Data Requirements

### Mock Server Setup
Create a mock API server to populate the dashboard with realistic data for demonstration purposes.

**Recommended Approach:** 
- Create a `src/mock/` directory
- Use a simple mock data service or JSON files
- Implement mock API functions that simulate backend responses

### Mock API Endpoints

#### Authentication
```javascript
// POST /api/auth/login
{
  "email": "demo@intactid.com",
  "password": "demo123"
}
// Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_123",
    "name": "Demo User",
    "email": "demo@intactid.com",
    "company": "Acme Corp"
  }
}
```

#### Dashboard Stats
```javascript
// GET /api/dashboard/stats
{
  "totalVerifications": 12847,
  "successRate": 94.2,
  "thisMonth": {
    "verifications": 2341,
    "passed": 2205,
    "failed": 136
  },
  "trend": "+12.5%" // vs last month
}
```

#### Verifications List
```javascript
// GET /api/verifications?page=1&limit=20
{
  "data": [
    {
      "id": "ver_abc123",
      "timestamp": "2025-11-28T14:23:11Z",
      "status": "passed",
      "type": "government_id",
      "confidence": 98.5,
      "name": "John D***", // Redacted
      "country": "US"
    },
    // ... more items
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 15,
    "totalItems": 287
  }
}
```

#### Verification Detail
```javascript
// GET /api/verifications/:id
{
  "id": "ver_abc123",
  "timestamp": "2025-11-28T14:23:11Z",
  "status": "passed",
  "type": "government_id",
  "confidence": 98.5,
  "checks": [
    { "name": "Document Authenticity", "status": "passed" },
    { "name": "Face Match", "status": "passed" },
    { "name": "Liveness Detection", "status": "passed" }
  ],
  "metadata": {
    "ip": "192.168.1.100",
    "userAgent": "Mozilla/5.0...",
    "documentType": "passport"
  }
}
```

#### API Keys
```javascript
// GET /api/keys
{
  "keys": [
    {
      "id": "key_prod_123",
      "name": "Production API Key",
      "prefix": "ik_live_",
      "created": "2025-10-15T09:00:00Z",
      "lastUsed": "2025-11-28T12:00:00Z",
      "status": "active"
    },
    {
      "id": "key_test_456",
      "name": "Test Environment",
      "prefix": "ik_test_",
      "created": "2025-11-01T10:30:00Z",
      "lastUsed": "2025-11-28T15:45:00Z",
      "status": "active"
    }
  ]
}

// POST /api/keys (Generate new key)
{
  "name": "New Key Name"
}
// Response:
{
  "id": "key_new_789",
  "key": "ik_live_abcdefghijklmnopqrstuvwxyz123456", // Full key shown once
  "name": "New Key Name",
  "created": "2025-11-28T16:00:00Z"
}
```

#### Billing & Usage
```javascript
// GET /api/billing/current
{
  "plan": {
    "name": "Enterprise",
    "price": 499,
    "billingCycle": "monthly",
    "includedVerifications": 10000
  },
  "usage": {
    "currentMonth": 2341,
    "remaining": 7659,
    "percentUsed": 23.41
  },
  "nextBillingDate": "2025-12-01T00:00:00Z"
}
```

#### Activity Log
```javascript
// GET /api/activity?limit=10
{
  "activities": [
    {
      "id": "act_001",
      "timestamp": "2025-11-28T15:30:00Z",
      "type": "verification.completed",
      "description": "Identity verification completed",
      "status": "success"
    },
    {
      "id": "act_002",
      "timestamp": "2025-11-28T14:15:00Z",
      "type": "api_key.created",
      "description": "New API key 'Production Key' created",
      "user": "admin@acme.com"
    },
    // ... more activities
  ]
}
```

### Implementation Guide
1. Create `src/mock/mockData.js` with sample data arrays
2. Create `src/mock/mockApi.js` with functions that return Promises (simulate async calls)
3. Add a small delay (300-500ms) to simulate network latency
4. Use `localStorage` to persist generated API keys during the demo session

## 6. Existing Routes
-   `/` - Home
-   `/pricing` - Pricing Plans
-   `/contact` - Contact Form
-   `/api` - API Documentation
-   `/privacy-policy` - Privacy Policy
-   `/terms-of-service` - Terms of Service
-   `*` - 404 Not Found

## 7. Handover Notes
-   The `ApiDocs` component uses a terminal-style aesthetic that could be reused for a "Live Logs" feature in the dashboard.
-   Ensure the dashboard is responsive; the current site is fully mobile-optimized.
-   Maintain the high standard of visual polish—"believable, not just techy."
-   All mock data should be realistic but clearly fake (use redacted names, generic companies).
-   Create at least 50-100 mock verification records for a realistic table experience.
