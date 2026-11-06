import { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import KycSections from '../components/KycSections.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';

export default function KycPage() {
  const [promoClosed, setPromoClosed] = useState(false);

  useEffect(() => {
    document.title = 'Intact ID — KYC for Africa';
  }, []);

  return (
    <div className="pg-kyc" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      {/* header: utility row + nav row = 112px */}
      <Nav />
      {/* hero */}
      <section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0 56px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
          <div style={{ flex: "0 1 704px", minWidth: "min(100%, 420px)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "40px", padding: "8px 16px", boxSizing: "border-box", borderRadius: "24px", background: "#DCEFE5", color: "#16181D", fontSize: "16px" }}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
              </svg>
              {" KYC & KYB for Africa"}
            </div>
            <h1 style={{ margin: "12px 0 0", fontWeight: "500", fontSize: "clamp(38px, 4.2vw, 56px)", lineHeight: "1.1", color: "#16181D" }}>
              Identity and business verification for regulated companies
            </h1>
            <p style={{ margin: "16px 0 0", fontSize: "20px", lineHeight: "28px", color: "#16181D" }}>
              AI-driven identity and business verification that shortens onboarding, reduces fraud and keeps you audit-ready, adapting to every customer and business you work with.
            </p>
            <div style={{ display: "flex", gap: "8px", marginTop: "32px", flexWrap: "wrap", fontSize: "18px", fontWeight: "500", lineHeight: "25.2px" }}>
              <a className="btn-primary" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                {"Get started "}
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="btn-ghost" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", border: "1.25px solid #DEE2E6", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                {"See how it works "}
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
          {/* hero visual: 896 x 738, radius 24, shaded panel */}
          <div className="stage" role="img" aria-label="Animated illustration: people across Kenya, Nigeria, Tanzania, Uganda, Ghana and Rwanda being verified one after another, with their country lighting up on a map of Africa." style={{ position: "relative", flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", overflow: "hidden", backgroundColor: "#F3F7F5", backgroundImage: "radial-gradient(ellipse 60% 55% at 66% 72%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%), linear-gradient(118deg, rgba(243,247,245,0) 0%, rgba(243,247,245,0) 34%, #EBF2EE 52%, #E3EDE8 100%)" }}>
            <div style={{ position: "absolute", top: "24px", left: "28px", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "500", color: "#16181D", zIndex: "3" }}>
              <span style={{ position: "relative", width: "8px", height: "8px", display: "inline-block" }}>
                <span style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "#1DB980" }} />
                <span className="pulse" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "#1DB980" }} />
              </span>
              {" Live verifications"}
            </div>
            <div className="mapbox" style={{ position: "absolute", left: "33%", top: "7%", width: "62%", aspectRatio: "560 / 600" }}>
              <img src="/site-assets/africa-dots.svg" alt="" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
              <img className="hl cyc" src="/site-assets/hl-KE.svg" alt="" style={{ "--d": "1.8s", position: "absolute", inset: "0", width: "100%", height: "100%" }} />
              <img className="hl cyc" src="/site-assets/hl-NG.svg" alt="" style={{ "--d": "4.8s", position: "absolute", inset: "0", width: "100%", height: "100%" }} />
              <img className="hl cyc" src="/site-assets/hl-TZ.svg" alt="" style={{ "--d": "7.8s", position: "absolute", inset: "0", width: "100%", height: "100%" }} />
              <img className="hl cyc" src="/site-assets/hl-UG.svg" alt="" style={{ "--d": "10.8s", position: "absolute", inset: "0", width: "100%", height: "100%" }} />
              <img className="hl cyc" src="/site-assets/hl-GH.svg" alt="" style={{ "--d": "13.8s", position: "absolute", inset: "0", width: "100%", height: "100%" }} />
              <img className="hl cyc" src="/site-assets/hl-RW.svg" alt="" style={{ "--d": "16.8s", position: "absolute", inset: "0", width: "100%", height: "100%" }} />
              <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", overflow: "visible" }}>
                <line className="hl cyc" style={{ "--d": "1.8s" }} x1="86" y1="31" x2="73.9" y2="42.7" stroke="#0B5D45" strokeWidth="1.4" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                <line className="hl cyc" style={{ "--d": "4.8s" }} x1="42" y1="19" x2="41" y2="33.3" stroke="#0B5D45" strokeWidth="1.4" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                <line className="hl cyc" style={{ "--d": "7.8s" }} x1="83" y1="60" x2="70.5" y2="49.8" stroke="#0B5D45" strokeWidth="1.4" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                <line className="hl cyc" style={{ "--d": "10.8s" }} x1="62" y1="27" x2="67.9" y2="42" stroke="#0B5D45" strokeWidth="1.4" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                <line className="hl cyc" style={{ "--d": "13.8s" }} x1="21" y1="22" x2="30.7" y2="35" stroke="#0B5D45" strokeWidth="1.4" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                <line className="hl cyc" style={{ "--d": "16.8s" }} x1="52" y1="53" x2="65.1" y2="45.3" stroke="#0B5D45" strokeWidth="1.4" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="hl cyc" style={{ "--d": "1.8s", position: "absolute", left: "73.9%", top: "42.7%", width: "8px", height: "8px", margin: "-4px 0 0 -4px", borderRadius: "50%", background: "#0B5D45" }} />
              <span className="hl cyc" style={{ "--d": "4.8s", position: "absolute", left: "41%", top: "33.3%", width: "8px", height: "8px", margin: "-4px 0 0 -4px", borderRadius: "50%", background: "#0B5D45" }} />
              <span className="hl cyc" style={{ "--d": "7.8s", position: "absolute", left: "70.5%", top: "49.8%", width: "8px", height: "8px", margin: "-4px 0 0 -4px", borderRadius: "50%", background: "#0B5D45" }} />
              <span className="hl cyc" style={{ "--d": "10.8s", position: "absolute", left: "67.9%", top: "42%", width: "8px", height: "8px", margin: "-4px 0 0 -4px", borderRadius: "50%", background: "#0B5D45" }} />
              <span className="hl cyc" style={{ "--d": "13.8s", position: "absolute", left: "30.7%", top: "35%", width: "8px", height: "8px", margin: "-4px 0 0 -4px", borderRadius: "50%", background: "#0B5D45" }} />
              <span className="hl cyc" style={{ "--d": "16.8s", position: "absolute", left: "65.1%", top: "45.3%", width: "8px", height: "8px", margin: "-4px 0 0 -4px", borderRadius: "50%", background: "#0B5D45" }} />
              <img className="pin cyc" src="/site-assets/person-1.webp" alt="" style={{ "--d": "1.8s", position: "absolute", left: "86%", top: "31%", width: "52px", height: "52px", margin: "-26px 0 0 -26px", borderRadius: "50%", objectFit: "cover", background: "#DCE8E2", border: "3px solid #FFFFFF", boxShadow: "0 6px 16px rgba(10,12,14,0.16)" }} />
              <img className="pin cyc" src="/site-assets/person-2.webp" alt="" style={{ "--d": "4.8s", position: "absolute", left: "42%", top: "19%", width: "52px", height: "52px", margin: "-26px 0 0 -26px", borderRadius: "50%", objectFit: "cover", background: "#DCE8E2", border: "3px solid #FFFFFF", boxShadow: "0 6px 16px rgba(10,12,14,0.16)" }} />
              <img className="pin cyc" src="/site-assets/person-5.webp" alt="" style={{ "--d": "7.8s", position: "absolute", left: "83%", top: "60%", width: "52px", height: "52px", margin: "-26px 0 0 -26px", borderRadius: "50%", objectFit: "cover", background: "#DCE8E2", border: "3px solid #FFFFFF", boxShadow: "0 6px 16px rgba(10,12,14,0.16)" }} />
              <img className="pin cyc" src="/site-assets/person-3.webp" alt="" style={{ "--d": "10.8s", position: "absolute", left: "62%", top: "27%", width: "52px", height: "52px", margin: "-26px 0 0 -26px", borderRadius: "50%", objectFit: "cover", background: "#DCE8E2", border: "3px solid #FFFFFF", boxShadow: "0 6px 16px rgba(10,12,14,0.16)" }} />
              <img className="pin cyc" src="/site-assets/person-6.webp" alt="" style={{ "--d": "13.8s", position: "absolute", left: "21%", top: "22%", width: "52px", height: "52px", margin: "-26px 0 0 -26px", borderRadius: "50%", objectFit: "cover", background: "#DCE8E2", border: "3px solid #FFFFFF", boxShadow: "0 6px 16px rgba(10,12,14,0.16)" }} />
              <img className="pin cyc" src="/site-assets/person-4.webp" alt="" style={{ "--d": "16.8s", position: "absolute", left: "52%", top: "53%", width: "52px", height: "52px", margin: "-26px 0 0 -26px", borderRadius: "50%", objectFit: "cover", background: "#DCE8E2", border: "3px solid #FFFFFF", boxShadow: "0 6px 16px rgba(10,12,14,0.16)" }} />
            </div>
            {/* verification cards */}
            <div className="cards" style={{ position: "absolute", left: "4%", top: "38%", width: "320px", height: "306px" }}>
              <div className="card cyc first" style={{ "--d": "0s", position: "absolute", inset: "0", background: "#FFFFFF", borderRadius: "20px", boxShadow: "0 18px 48px rgba(10,12,14,0.10), 0 1px 0 rgba(10,12,14,0.04)", padding: "20px", boxSizing: "border-box" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ position: "relative", width: "64px", height: "64px", borderRadius: "16px", overflow: "hidden", background: "#DCE8E2", flex: "none" }}>
                    <img src="/site-assets/person-1.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span className="scan cyc" style={{ "--d": "0s", position: "absolute", left: "0", right: "0", height: "2px", background: "#1DB980", boxShadow: "0 0 10px #1DB980", opacity: "0" }} />
                  </div>
                  <div style={{ minWidth: "0" }}>
                    <div style={{ fontWeight: "500", fontSize: "18px", color: "#16181D" }}>
                      Grace Achieng
                    </div>
                    <div style={{ fontSize: "14px", color: "#4D5560", marginTop: "3px" }}>
                      Kenya · National ID ••••4192
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off1 cyc" style={{ "--d": "0s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on1 cyc" style={{ "--d": "0s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      Document authenticity
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off1 cyc" style={{ "--d": "0s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on1 cyc" style={{ "--d": "0s", gridArea: "1 / 1", opacity: "0" }}>
                        Passed
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off2 cyc" style={{ "--d": "0s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on2 cyc" style={{ "--d": "0s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      {"Face match & liveness"}
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off2 cyc" style={{ "--d": "0s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on2 cyc" style={{ "--d": "0s", gridArea: "1 / 1", opacity: "0" }}>
                        98.7%
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off3 cyc" style={{ "--d": "0s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on3 cyc" style={{ "--d": "0s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      IPRS registry
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off3 cyc" style={{ "--d": "0s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on3 cyc" style={{ "--d": "0s", gridArea: "1 / 1", opacity: "0" }}>
                        Match
                      </span>
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "#4D5560" }}>
                    ver_8kd2m1c4
                  </span>
                  <span className="vf cyc" style={{ "--d": "0s", opacity: "0", display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 11px", borderRadius: "999px", background: "#E3F6EC", color: "#0A6B47", fontSize: "13px", fontWeight: "500" }}>
                    Verified · 1.84s
                  </span>
                </div>
              </div>
              <div className="card cyc" style={{ "--d": "3s", position: "absolute", inset: "0", background: "#FFFFFF", borderRadius: "20px", boxShadow: "0 18px 48px rgba(10,12,14,0.10), 0 1px 0 rgba(10,12,14,0.04)", padding: "20px", boxSizing: "border-box" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ position: "relative", width: "64px", height: "64px", borderRadius: "16px", overflow: "hidden", background: "#DCE8E2", flex: "none" }}>
                    <img src="/site-assets/person-2.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span className="scan cyc" style={{ "--d": "3s", position: "absolute", left: "0", right: "0", height: "2px", background: "#1DB980", boxShadow: "0 0 10px #1DB980", opacity: "0" }} />
                  </div>
                  <div style={{ minWidth: "0" }}>
                    <div style={{ fontWeight: "500", fontSize: "18px", color: "#16181D" }}>
                      Chidi Okafor
                    </div>
                    <div style={{ fontSize: "14px", color: "#4D5560", marginTop: "3px" }}>
                      Nigeria · NIN ••••7730
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off1 cyc" style={{ "--d": "3s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on1 cyc" style={{ "--d": "3s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      Document authenticity
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off1 cyc" style={{ "--d": "3s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on1 cyc" style={{ "--d": "3s", gridArea: "1 / 1", opacity: "0" }}>
                        Passed
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off2 cyc" style={{ "--d": "3s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on2 cyc" style={{ "--d": "3s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      {"Face match & liveness"}
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off2 cyc" style={{ "--d": "3s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on2 cyc" style={{ "--d": "3s", gridArea: "1 / 1", opacity: "0" }}>
                        97.9%
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off3 cyc" style={{ "--d": "3s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on3 cyc" style={{ "--d": "3s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      NIN registry
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off3 cyc" style={{ "--d": "3s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on3 cyc" style={{ "--d": "3s", gridArea: "1 / 1", opacity: "0" }}>
                        Match
                      </span>
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "#4D5560" }}>
                    ver_3fp9q7aa
                  </span>
                  <span className="vf cyc" style={{ "--d": "3s", opacity: "0", display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 11px", borderRadius: "999px", background: "#E3F6EC", color: "#0A6B47", fontSize: "13px", fontWeight: "500" }}>
                    Verified · 2.10s
                  </span>
                </div>
              </div>
              <div className="card cyc" style={{ "--d": "6s", position: "absolute", inset: "0", background: "#FFFFFF", borderRadius: "20px", boxShadow: "0 18px 48px rgba(10,12,14,0.10), 0 1px 0 rgba(10,12,14,0.04)", padding: "20px", boxSizing: "border-box" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ position: "relative", width: "64px", height: "64px", borderRadius: "16px", overflow: "hidden", background: "#DCE8E2", flex: "none" }}>
                    <img src="/site-assets/person-5.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span className="scan cyc" style={{ "--d": "6s", position: "absolute", left: "0", right: "0", height: "2px", background: "#1DB980", boxShadow: "0 0 10px #1DB980", opacity: "0" }} />
                  </div>
                  <div style={{ minWidth: "0" }}>
                    <div style={{ fontWeight: "500", fontSize: "18px", color: "#16181D" }}>
                      Amina Salim
                    </div>
                    <div style={{ fontSize: "14px", color: "#4D5560", marginTop: "3px" }}>
                      Tanzania · NIDA ID ••••0581
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off1 cyc" style={{ "--d": "6s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on1 cyc" style={{ "--d": "6s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      Document authenticity
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off1 cyc" style={{ "--d": "6s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on1 cyc" style={{ "--d": "6s", gridArea: "1 / 1", opacity: "0" }}>
                        Passed
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off2 cyc" style={{ "--d": "6s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on2 cyc" style={{ "--d": "6s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      {"Face match & liveness"}
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off2 cyc" style={{ "--d": "6s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on2 cyc" style={{ "--d": "6s", gridArea: "1 / 1", opacity: "0" }}>
                        99.1%
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off3 cyc" style={{ "--d": "6s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on3 cyc" style={{ "--d": "6s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      NIDA registry
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off3 cyc" style={{ "--d": "6s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on3 cyc" style={{ "--d": "6s", gridArea: "1 / 1", opacity: "0" }}>
                        Match
                      </span>
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "#4D5560" }}>
                    ver_7tz2k0md
                  </span>
                  <span className="vf cyc" style={{ "--d": "6s", opacity: "0", display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 11px", borderRadius: "999px", background: "#E3F6EC", color: "#0A6B47", fontSize: "13px", fontWeight: "500" }}>
                    Verified · 1.62s
                  </span>
                </div>
              </div>
              <div className="card cyc" style={{ "--d": "9s", position: "absolute", inset: "0", background: "#FFFFFF", borderRadius: "20px", boxShadow: "0 18px 48px rgba(10,12,14,0.10), 0 1px 0 rgba(10,12,14,0.04)", padding: "20px", boxSizing: "border-box" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ position: "relative", width: "64px", height: "64px", borderRadius: "16px", overflow: "hidden", background: "#DCE8E2", flex: "none" }}>
                    <img src="/site-assets/person-3.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span className="scan cyc" style={{ "--d": "9s", position: "absolute", left: "0", right: "0", height: "2px", background: "#1DB980", boxShadow: "0 0 10px #1DB980", opacity: "0" }} />
                  </div>
                  <div style={{ minWidth: "0" }}>
                    <div style={{ fontWeight: "500", fontSize: "18px", color: "#16181D" }}>
                      Brian Okello
                    </div>
                    <div style={{ fontSize: "14px", color: "#4D5560", marginTop: "3px" }}>
                      Uganda · NIRA ID ••••2264
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off1 cyc" style={{ "--d": "9s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on1 cyc" style={{ "--d": "9s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      Document authenticity
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off1 cyc" style={{ "--d": "9s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on1 cyc" style={{ "--d": "9s", gridArea: "1 / 1", opacity: "0" }}>
                        Passed
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off2 cyc" style={{ "--d": "9s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on2 cyc" style={{ "--d": "9s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      {"Face match & liveness"}
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off2 cyc" style={{ "--d": "9s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on2 cyc" style={{ "--d": "9s", gridArea: "1 / 1", opacity: "0" }}>
                        98.2%
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off3 cyc" style={{ "--d": "9s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on3 cyc" style={{ "--d": "9s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      NIRA registry
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off3 cyc" style={{ "--d": "9s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on3 cyc" style={{ "--d": "9s", gridArea: "1 / 1", opacity: "0" }}>
                        Match
                      </span>
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "#4D5560" }}>
                    ver_q51wx8jr
                  </span>
                  <span className="vf cyc" style={{ "--d": "9s", opacity: "0", display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 11px", borderRadius: "999px", background: "#E3F6EC", color: "#0A6B47", fontSize: "13px", fontWeight: "500" }}>
                    Verified · 1.95s
                  </span>
                </div>
              </div>
              <div className="card cyc" style={{ "--d": "12s", position: "absolute", inset: "0", background: "#FFFFFF", borderRadius: "20px", boxShadow: "0 18px 48px rgba(10,12,14,0.10), 0 1px 0 rgba(10,12,14,0.04)", padding: "20px", boxSizing: "border-box" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ position: "relative", width: "64px", height: "64px", borderRadius: "16px", overflow: "hidden", background: "#DCE8E2", flex: "none" }}>
                    <img src="/site-assets/person-6.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span className="scan cyc" style={{ "--d": "12s", position: "absolute", left: "0", right: "0", height: "2px", background: "#1DB980", boxShadow: "0 0 10px #1DB980", opacity: "0" }} />
                  </div>
                  <div style={{ minWidth: "0" }}>
                    <div style={{ fontWeight: "500", fontSize: "18px", color: "#16181D" }}>
                      Abena Owusu
                    </div>
                    <div style={{ fontSize: "14px", color: "#4D5560", marginTop: "3px" }}>
                      Ghana · Ghana Card ••••9917
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off1 cyc" style={{ "--d": "12s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on1 cyc" style={{ "--d": "12s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      Document authenticity
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off1 cyc" style={{ "--d": "12s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on1 cyc" style={{ "--d": "12s", gridArea: "1 / 1", opacity: "0" }}>
                        Passed
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off2 cyc" style={{ "--d": "12s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on2 cyc" style={{ "--d": "12s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      {"Face match & liveness"}
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off2 cyc" style={{ "--d": "12s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on2 cyc" style={{ "--d": "12s", gridArea: "1 / 1", opacity: "0" }}>
                        98.4%
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off3 cyc" style={{ "--d": "12s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on3 cyc" style={{ "--d": "12s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      NIA registry
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off3 cyc" style={{ "--d": "12s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on3 cyc" style={{ "--d": "12s", gridArea: "1 / 1", opacity: "0" }}>
                        Match
                      </span>
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "#4D5560" }}>
                    ver_c84na2ve
                  </span>
                  <span className="vf cyc" style={{ "--d": "12s", opacity: "0", display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 11px", borderRadius: "999px", background: "#E3F6EC", color: "#0A6B47", fontSize: "13px", fontWeight: "500" }}>
                    Verified · 2.03s
                  </span>
                </div>
              </div>
              <div className="card cyc" style={{ "--d": "15s", position: "absolute", inset: "0", background: "#FFFFFF", borderRadius: "20px", boxShadow: "0 18px 48px rgba(10,12,14,0.10), 0 1px 0 rgba(10,12,14,0.04)", padding: "20px", boxSizing: "border-box" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ position: "relative", width: "64px", height: "64px", borderRadius: "16px", overflow: "hidden", background: "#DCE8E2", flex: "none" }}>
                    <img src="/site-assets/person-4.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span className="scan cyc" style={{ "--d": "15s", position: "absolute", left: "0", right: "0", height: "2px", background: "#1DB980", boxShadow: "0 0 10px #1DB980", opacity: "0" }} />
                  </div>
                  <div style={{ minWidth: "0" }}>
                    <div style={{ fontWeight: "500", fontSize: "18px", color: "#16181D" }}>
                      Jean-Paul Mugisha
                    </div>
                    <div style={{ fontSize: "14px", color: "#4D5560", marginTop: "3px" }}>
                      Rwanda · National ID ••••3408
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off1 cyc" style={{ "--d": "15s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on1 cyc" style={{ "--d": "15s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      Document authenticity
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off1 cyc" style={{ "--d": "15s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on1 cyc" style={{ "--d": "15s", gridArea: "1 / 1", opacity: "0" }}>
                        Passed
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off2 cyc" style={{ "--d": "15s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on2 cyc" style={{ "--d": "15s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      {"Face match & liveness"}
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off2 cyc" style={{ "--d": "15s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on2 cyc" style={{ "--d": "15s", gridArea: "1 / 1", opacity: "0" }}>
                        97.6%
                      </span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderTop: "1px solid #EEF1F0" }}>
                    <span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}>
                      <span className="spin off3 cyc" style={{ "--d": "15s", position: "absolute", inset: "0", borderRadius: "50%", border: "2px solid #D5E0DA", borderTopColor: "#0B5D45" }} />
                      <svg className="on3 cyc" style={{ "--d": "15s", position: "absolute", inset: "0", opacity: "0" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="9" fill="#1DB980" />
                        <path d="m5.2 9.3 2.5 2.4 5-5.2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ flex: "1", color: "#16181D" }}>
                      NIDA registry
                    </span>
                    <span style={{ display: "grid", justifyItems: "end", color: "#4D5560" }}>
                      <span className="off3 cyc" style={{ "--d": "15s", gridArea: "1 / 1" }}>
                        Checking…
                      </span>
                      <span className="on3 cyc" style={{ "--d": "15s", gridArea: "1 / 1", opacity: "0" }}>
                        Match
                      </span>
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "#4D5560" }}>
                    ver_m2e6t9lb
                  </span>
                  <span className="vf cyc" style={{ "--d": "15s", opacity: "0", display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 11px", borderRadius: "999px", background: "#E3F6EC", color: "#0A6B47", fontSize: "13px", fontWeight: "500" }}>
                    Verified · 1.77s
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* logo strip: 72px below hero, 56px tall */}
        <div aria-label="National registries we connect to" role="group" style={{ marginTop: "72px", height: "56px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px", flexWrap: "wrap", fontWeight: "600", fontSize: "30px", letterSpacing: "-0.01em", color: "#8E959C" }}>
          <span>
            IPRS
          </span>
          <span>
            CR12
          </span>
          <span>
            NIN
          </span>
          <span>
            CAC
          </span>
          <span>
            Ghana Card
          </span>
          <span>
            NIRA
          </span>
          <span>
            NIDA
          </span>
        </div>
        {/* feature row: 4 columns, 16px gap */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px", padding: "128px 0 120px" }}>
          <div style={{ paddingTop: "32px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "8px", background: "#DCEFE5", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0C0E" }}>
              <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3 3 7.5h18L12 3Z" />
              </svg>
            </div>
            <h3 style={{ margin: "24px 0 0", fontSize: "32px", fontWeight: "500", lineHeight: "38.4px", maxWidth: "424px" }}>
              Direct registry access
            </h3>
            <p style={{ margin: "7px 0 0", fontSize: "20px", lineHeight: "28px", maxWidth: "424px" }}>
              Live checks against IPRS, NIN, Ghana Card and more, never a cached copy.
            </p>
          </div>
          <div style={{ paddingTop: "32px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "8px", background: "#DCEFE5", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0C0E" }}>
              <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
                <circle cx="12" cy="10" r="2.6" />
                <path d="M8 16.5c.9-1.6 2.3-2.4 4-2.4s3.1.8 4 2.4" />
              </svg>
            </div>
            <h3 style={{ margin: "24px 0 0", fontSize: "32px", fontWeight: "500", lineHeight: "38.4px", maxWidth: "424px" }}>
              Biometrics and liveness
            </h3>
            <p style={{ margin: "7px 0 0", fontSize: "20px", lineHeight: "28px", maxWidth: "424px" }}>
              Selfie matched to the ID photo, with passive liveness to stop replay attacks.
            </p>
          </div>
          <div style={{ paddingTop: "32px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "8px", background: "#DCEFE5", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0C0E" }}>
              <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m20 20-4.3-4.3M8.5 11h5" />
              </svg>
            </div>
            <h3 style={{ margin: "24px 0 0", fontSize: "32px", fontWeight: "500", lineHeight: "38.4px", maxWidth: "424px" }}>
              Sanctions and PEP screening
            </h3>
            <p style={{ margin: "7px 0 0", fontSize: "20px", lineHeight: "28px", maxWidth: "424px" }}>
              OFAC, UN, EU and UK lists, plus politically exposed persons and adverse media.
            </p>
          </div>
          <div style={{ paddingTop: "32px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "8px", background: "#DCEFE5", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0C0E" }}>
              <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                <path d="M14 3v5h5M9.5 14l2 2 3.5-4" />
              </svg>
            </div>
            <h3 style={{ margin: "24px 0 0", fontSize: "32px", fontWeight: "500", lineHeight: "38.4px", maxWidth: "424px" }}>
              Audit-ready evidence
            </h3>
            <p style={{ margin: "7px 0 0", fontSize: "20px", lineHeight: "28px", maxWidth: "424px" }}>
              Source, timestamp and raw registry payload on every check, kept for seven years.
            </p>
          </div>
        </div>
      </section>
      <KycSections />
      <Footer />
      {/* corner promo */}
      <div id="promo" hidden={promoClosed}>
        <aside className="promo" aria-label="Try the sandbox" style={{ position: "fixed", right: "24px", bottom: "24px", zIndex: "25", width: "460px", maxWidth: "calc(100% - 48px)", background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 16px 48px rgba(10,12,14,0.16)", padding: "20px 44px 20px 20px", display: "flex", gap: "20px", alignItems: "center", boxSizing: "border-box" }}>
          <div style={{ width: "104px", height: "104px", flex: "none", position: "relative" }}>
            <img src="/site-assets/person-1.webp" alt="" style={{ position: "absolute", inset: "14px", width: "76px", height: "76px", borderRadius: "50%", objectFit: "cover", background: "#DCE8E2" }} />
            <svg aria-hidden="true" width="104" height="104" viewBox="0 0 104 104" fill="none" stroke="#0B5D45" strokeWidth="3" strokeLinecap="round" style={{ position: "absolute", inset: "0" }}>
              <path d="M4 26V10a6 6 0 0 1 6-6h16M78 4h16a6 6 0 0 1 6 6v16M100 78v16a6 6 0 0 1-6 6H78M26 100H10a6 6 0 0 1-6-6V78" />
            </svg>
          </div>
          <div style={{ flex: "1", minWidth: "0" }}>
            <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.3", color: "#0A0C0E" }}>
              See how easy verification can be in our sandbox. About ten minutes, no contract.
            </p>
            <a className="btn-primary" href="#" style={{ display: "inline-flex", alignItems: "center", marginTop: "12px", padding: "10px 32px", borderRadius: "4px", fontSize: "16px", fontWeight: "500" }}>
              Try the sandbox
            </a>
          </div>
          <button type="button" aria-label="Close" id="promoClose" style={{ position: "absolute", top: "8px", right: "8px", width: "36px", height: "36px", border: "0", background: "none", color: "#4D5560", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setPromoClosed(true)}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </aside>
      </div>
    </div>
  );
}
