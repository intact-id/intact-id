import { Link } from 'react-router-dom';
import { LogoMark } from './Logo.jsx';
import './footer.css';

export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: "#0A0D0C", color: "#E8EDEB" }}>
      <div className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "120px 56px 48px", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "48px 40px" }}>
          <div style={{ gridColumn: "span 2" }}>
            <div>
              <h3 style={{ margin: "0", paddingBottom: "18px", borderBottom: "1px solid rgba(255,255,255,0.14)", fontSize: "22px", fontWeight: "500", color: "#FFFFFF" }}>
                Products
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "24px", marginTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ fontSize: "13px", color: "rgba(232,237,235,0.5)", marginTop: "6px" }}>
                    Verification
                  </div>
                  <Link className="flink" to="/kyc">
                    Identity verification (KYC)
                  </Link>
                  <Link className="flink" to="/kyb">
                    Business verification (KYB)
                  </Link>
                  <a className="flink" href="#">
                    ID document checks
                  </a>
                  <a className="flink" href="#">
                    {"Biometrics & liveness"}
                  </a>
                  <a className="flink" href="#">
                    National registry lookup
                  </a>
                  <a className="flink" href="#">
                    {"Directors & beneficial owners"}
                  </a>
                  <Link className="flink" to="/reusable-kyc">
                    Reusable KYC
                  </Link>
                  <a className="flink" href="#">
                    Agentic verification
                  </a>
                  <div style={{ fontSize: "13px", color: "rgba(232,237,235,0.5)", marginTop: "6px" }}>
                    Screening
                  </div>
                  <a className="flink" href="#">
                    {"Sanctions & PEP"}
                  </a>
                  <a className="flink" href="#">
                    Adverse media
                  </a>
                  <a className="flink" href="#">
                    Entity-level screening
                  </a>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ fontSize: "13px", color: "rgba(232,237,235,0.5)", marginTop: "6px" }}>
                    Transaction monitoring
                  </div>
                  <Link className="flink" to="/transaction-monitoring">
                    Real-time screening
                  </Link>
                  <a className="flink" href="#">
                    {"Rules & typologies"}
                  </a>
                  <a className="flink" href="#">
                    Behavioural anomaly detection
                  </a>
                  <a className="flink" href="#">
                    {"Alerts & case management"}
                  </a>
                  <a className="flink" href="#">
                    Regulatory reporting (STR/SAR)
                  </a>
                  <div style={{ fontSize: "13px", color: "rgba(232,237,235,0.5)", marginTop: "6px" }}>
                    Platform
                  </div>
                  <Link className="flink" to="/customer-risk-assessment">
                    Explainable risk scoring
                  </Link>
                  <a className="flink" href="#">
                    {"Evidence & audit log"}
                  </a>
                  <a className="flink" href="#">
                    {"API & SDKs"}
                  </a>
                  <a className="flink" href="#">
                    Sandbox
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <div>
              <h3 style={{ margin: "0", paddingBottom: "18px", borderBottom: "1px solid rgba(255,255,255,0.14)", fontSize: "22px", fontWeight: "500", color: "#FFFFFF" }}>
                Solutions
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "24px", marginTop: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ fontSize: "13px", color: "rgba(232,237,235,0.5)", marginTop: "6px" }}>
                    Compliance
                  </div>
                  <a className="flink" href="#">
                    KYC compliance
                  </a>
                  <a className="flink" href="#">
                    AML transaction monitoring
                  </a>
                  <a className="flink" href="#">
                    KYB compliance
                  </a>
                  <a className="flink" href="#">
                    AML compliance
                  </a>
                  <a className="flink" href="#">
                    Age verification
                  </a>
                  <div style={{ fontSize: "13px", color: "rgba(232,237,235,0.5)", marginTop: "6px" }}>
                    Customer risk assessment
                  </div>
                  <a className="flink" href="#">
                    Configurable risk models
                  </a>
                  <Link className="flink" to="/customer-risk-assessment">
                    Risk scoring
                  </Link>
                  <a className="flink" href="#">
                    Ongoing reassessment
                  </a>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ fontSize: "13px", color: "rgba(232,237,235,0.5)", marginTop: "6px" }}>
                    Fraud
                  </div>
                  <a className="flink" href="#">
                    Fraud prevention
                  </a>
                  <a className="flink" href="#">
                    New account fraud
                  </a>
                  <a className="flink" href="#">
                    Identity fraud
                  </a>
                  <a className="flink" href="#">
                    Account takeover
                  </a>
                  <a className="flink" href="#">
                    Payment fraud
                  </a>
                  <a className="flink" href="#">
                    Money muling
                  </a>
                  <div style={{ fontSize: "13px", color: "rgba(232,237,235,0.5)", marginTop: "6px" }}>
                    Workforce
                  </div>
                  <a className="flink" href="#">
                    Workforce verification
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 style={{ margin: "0", paddingBottom: "18px", borderBottom: "1px solid rgba(255,255,255,0.14)", fontSize: "22px", fontWeight: "500", color: "#FFFFFF" }}>
              Developers
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(0, 1fr))", gap: "24px", marginTop: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a className="flink" href="#">
                  Documentation
                </a>
                <a className="flink" href="#">
                  API reference
                </a>
                <a className="flink" href="#">
                  SDKs
                </a>
                <a className="flink" href="#">
                  Sandbox
                </a>
                <a className="flink" href="#">
                  Webhooks
                </a>
                <a className="flink" href="#">
                  Service status
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 style={{ margin: "0", paddingBottom: "18px", borderBottom: "1px solid rgba(255,255,255,0.14)", fontSize: "22px", fontWeight: "500", color: "#FFFFFF" }}>
              Company
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(0, 1fr))", gap: "24px", marginTop: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a className="flink" href="#">
                  About us
                </a>
                <a className="flink" href="#">
                  Careers
                </a>
                <a className="flink" href="#">
                  Partners
                </a>
                <a className="flink" href="#">
                  Security
                </a>
                <a className="flink" href="#">
                  Privacy notice
                </a>
                <a className="flink" href="#">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "96px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px", fontSize: "14px", color: "rgba(232,237,235,0.6)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "20px", fontWeight: "600", color: "#FFFFFF" }}>
            <LogoMark size={34} tone="white" />
            intact id
          </span>
          <span>
            © 2026 Intact ID · Nairobi, Kenya
          </span>
          <span style={{ display: "flex", gap: "24px" }}>
            <a className="flink" href="#">
              Privacy
            </a>
            <a className="flink" href="#">
              Terms
            </a>
            <a className="flink" href="#">
              Cookies
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
