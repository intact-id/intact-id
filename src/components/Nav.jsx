import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

/** Site header: utility row, main nav, and the Products / Solutions menus. */
export default function Nav() {
  const [open, setOpen] = useState(null);
  const closeTimer = useRef(null);
  const hover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const show = (m) => { clearTimeout(closeTimer.current); setOpen(m); };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };
  const toggle = (m) => setOpen((o) => (o !== m || hover ? m : null));
  const hoverProps = (m) => (hover ? { onMouseEnter: () => show(m), onMouseLeave: closeSoon } : {});

  return (
    <>
    <header style={{ position: "sticky", top: "0", zIndex: "30", background: "#FFFFFF" }}>
      <div className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0 56px", boxSizing: "border-box" }}>
        <div style={{ height: "40px", display: "flex", justifyContent: "flex-end", alignItems: "flex-start", gap: "20px", paddingTop: "10px", boxSizing: "border-box", fontSize: "12px", lineHeight: "17.76px" }}>
          <a className="util" href="#" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="m8.5 12 2.5 2.5 4.5-5" />
            </svg>
            I'm getting verified
          </a>
          <a className="util" href="#" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
            Log in
          </a>
          <a className="util" href="#" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
            </svg>
            English
          </a>
        </div>
        <nav aria-label="Main" style={{ height: "72px", display: "flex", alignItems: "center", position: "relative", fontSize: "16px", fontWeight: "500", lineHeight: "22.4px" }}>
          <Link to="/" aria-label="Intact ID home" style={{ display: "flex", alignItems: "center", flex: "1 1 0" }}>
            <Logo size={40} />
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <button className="navitem" type="button" id="productsBtn" aria-controls="menu" aria-expanded={open === 'products'} onClick={() => toggle('products')} style={open === 'products' ? { color: '#0B5D45' } : undefined} {...hoverProps('products')}>
              Products
            </button>
            <button className="navitem" type="button" id="solutionsBtn" aria-controls="solMenu" aria-expanded={open === 'solutions'} onClick={() => toggle('solutions')} style={open === 'solutions' ? { color: '#0B5D45' } : undefined} {...hoverProps('solutions')}>
              Solutions
            </button>
            <a className="navitem" href="#">
              Resources
            </a>
            <a className="navitem" href="#">
              Company
            </a>
            <a className="navitem" href="#">
              Pricing
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", flex: "1 1 0" }}>
            <a className="navitem" href="#" style={{ padding: "8px 12px" }}>
              Sign up
            </a>
            <a className="btn-primary" href="#" style={{ padding: "8px 12px", borderRadius: "8px" }}>
              Get started
            </a>
          </div>
          <div id="menu" hidden={open !== 'products'} {...hoverProps('products')}>
            <div style={{ position: "absolute", top: "100%", left: "0", right: "0", background: "#FFFFFF", borderRadius: "16px", boxShadow: "0 30px 80px rgba(10,12,14,0.22)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", overflow: "hidden", zIndex: "40", fontWeight: "400" }}>
              <div style={{ padding: "40px 44px", borderRight: "1px solid #ECEFEE" }}>
                <div style={{ height: "260px", borderRadius: "4px", background: "#0B5D45", position: "relative", overflow: "hidden" }}>
                  <img src="/site-assets/africa-dots.svg" alt="" style={{ position: "absolute", right: "-30px", top: "0", width: "280px", opacity: "0.35" }} />
                </div>
                <div style={{ textAlign: "center", marginTop: "30px", fontWeight: "500", fontSize: "22px" }}>
                  Verify Africa at the source
                </div>
                <div style={{ textAlign: "center", marginTop: "8px", fontSize: "13px", color: "#4D5560", lineHeight: "1.45" }}>
                  AI native compliance workflows for scalable businesses
                </div>
              </div>
              <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
                <div style={{ fontWeight: "500", fontSize: "24px", marginBottom: "10px" }}>
                  Verification
                </div>
                <Link className="menulink" to="/kyc">
                  Identity verification (KYC)
                </Link>
                <a className="menulink" href="#">
                  Business verification (KYB)
                </a>
                <a className="menulink" href="#">
                  ID document checks
                </a>
                <a className="menulink" href="#">
                  {"Biometrics & liveness"}
                </a>
                <a className="menulink" href="#">
                  National registry lookup
                </a>
                <a className="menulink" href="#">
                  {"Directors & beneficial owners"}
                </a>
                <a className="menulink" href="#">
                  Agentic verification
                </a>
              </div>
              <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
                <div style={{ fontWeight: "500", fontSize: "24px", marginBottom: "10px" }}>
                  Screening
                </div>
                <a className="menulink" href="#">
                  {"Sanctions & PEP"}
                </a>
                <a className="menulink" href="#">
                  Adverse media
                </a>
                <a className="menulink" href="#">
                  Entity-level screening
                </a>
                <div style={{ fontWeight: "500", fontSize: "24px", margin: "20px 0 10px" }}>
                  Monitoring
                </div>
                <a className="menulink" href="#">
                  Ongoing monitoring
                </a>
                <a className="menulink" href="#">
                  Signed webhooks
                </a>
              </div>
              <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
                <div style={{ fontWeight: "500", fontSize: "24px", marginBottom: "10px" }}>
                  Transaction monitoring
                </div>
                <a className="menulink" href="#">
                  Real-time transaction screening
                </a>
                <a className="menulink" href="#">
                  {"Rules & typologies"}
                </a>
                <a className="menulink" href="#">
                  Behavioural anomaly detection
                </a>
                <a className="menulink" href="#">
                  {"Alerts & case management"}
                </a>
                <a className="menulink" href="#">
                  Customer risk assessment
                </a>
                <a className="menulink" href="#">
                  Regulatory reporting (STR/SAR)
                </a>
              </div>
              <div style={{ padding: "40px 44px", display: "flex", flexDirection: "column", gap: "18px", borderLeft: "1px solid #ECEFEE" }}>
                <div style={{ fontWeight: "500", fontSize: "24px", marginBottom: "4px" }}>
                  Platform
                </div>
                <a className="menulink" href="#" style={{ fontSize: "20px" }}>
                  Explainable risk scoring
                </a>
                <a className="menulink" href="#" style={{ fontSize: "20px" }}>
                  {"Evidence & audit log"}
                </a>
                <a className="menulink" href="#" style={{ fontSize: "20px" }}>
                  {"API & SDKs"}
                </a>
                <a className="menulink" href="#" style={{ fontSize: "20px" }}>
                  Sandbox
                </a>
              </div>
            </div>
          </div>
          <div id="solMenu" hidden={open !== 'solutions'} {...hoverProps('solutions')}>
            <div style={{ position: "absolute", top: "100%", left: "0", right: "0", background: "#FFFFFF", borderRadius: "16px", boxShadow: "0 30px 80px rgba(10,12,14,0.22)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", overflow: "hidden", zIndex: "40", fontWeight: "400" }}>
              <div style={{ padding: "40px 44px", borderRight: "1px solid #ECEFEE" }}>
                <div style={{ height: "260px", borderRadius: "4px", background: "#0B5D45", position: "relative", overflow: "hidden" }}>
                  <img src="/site-assets/africa-dots.svg" alt="" style={{ position: "absolute", right: "-30px", top: "0", width: "280px", opacity: "0.35" }} />
                </div>
                <div style={{ textAlign: "center", marginTop: "30px", fontWeight: "500", fontSize: "22px" }}>
                  Built for regulated teams
                </div>
                <div style={{ textAlign: "center", marginTop: "8px", fontSize: "13px", color: "#4D5560", lineHeight: "1.45" }}>
                  Compliance, risk and fraud workflows for banks, fintechs and payment companies
                </div>
              </div>
              <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
                <div style={{ fontWeight: "500", fontSize: "24px", marginBottom: "10px" }}>
                  Compliance
                </div>
                <a className="menulink" href="#">
                  KYC compliance
                </a>
                <a className="menulink" href="#">
                  AML transaction monitoring
                </a>
                <a className="menulink" href="#">
                  KYB (business verification)
                </a>
                <a className="menulink" href="#">
                  AML compliance
                </a>
                <a className="menulink" href="#">
                  Age verification
                </a>
              </div>
              <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
                <div style={{ fontWeight: "500", fontSize: "24px", marginBottom: "10px" }}>
                  Customer risk assessment
                </div>
                <a className="menulink" href="#">
                  Configurable risk models
                </a>
                <a className="menulink" href="#">
                  {"Individual & business risk scoring"}
                </a>
                <a className="menulink" href="#">
                  {"Sanctions & PEP risk overrides"}
                </a>
                <a className="menulink" href="#">
                  {"Onboarding & ongoing reassessment"}
                </a>
                <a className="menulink" href="#">
                  Auditable score breakdowns
                </a>
              </div>
              <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
                <div style={{ fontWeight: "500", fontSize: "24px", marginBottom: "10px" }}>
                  Fraud
                </div>
                <a className="menulink" href="#">
                  Fraud prevention
                </a>
                <a className="menulink" href="#">
                  New account fraud prevention
                </a>
                <a className="menulink" href="#">
                  Identity fraud prevention
                </a>
                <a className="menulink" href="#">
                  Account takeover prevention
                </a>
                <a className="menulink" href="#">
                  Payment fraud prevention
                </a>
                <a className="menulink" href="#">
                  Money muling prevention
                </a>
              </div>
              <div style={{ padding: "40px 44px", display: "flex", flexDirection: "column", gap: "18px", borderLeft: "1px solid #ECEFEE" }}>
                <div style={{ fontWeight: "500", fontSize: "24px", marginBottom: "4px" }}>
                  Workforce
                </div>
                <a className="menulink" href="#" style={{ fontSize: "20px" }}>
                  Workforce verification
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <div id="overlay" hidden={!open}>
      <button type="button" aria-label="Close menu" id="overlayBtn" style={{ position: "absolute", inset: "0", zIndex: "20", border: "0", background: "rgba(10,12,14,0.7)", cursor: "default" }} onClick={() => setOpen(null)} />
    </div>
    </>
  );
}
