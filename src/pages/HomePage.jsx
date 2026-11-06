import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import { LogoMark } from '../components/Logo.jsx';
import { SetupPanel, CustomPanel, LivePanel } from '../components/GoLivePanels.jsx';
import './home.css';

const SOL = {
  ver: [['Identity Verification (KYC)', '/kyc'], ['Business Verification (KYB)', '#'], ['ID Document Checks', '/kyc'], ['Biometrics & Liveness', '/kyc'], ['National Registry Lookup', '/kyc'], ['Directors & Beneficial Owners', '#'], ['Agentic Verification', '#'], ['Workforce Verification', '#']],
  scr: [['Sanctions & PEP', '#'], ['Adverse Media', '#'], ['Entity-level Screening', '#'], ['Ongoing Monitoring', '#']],
  tm: [['Real-time Transaction Screening', '#'], ['Rules & Typologies', '#'], ['Behavioural Anomaly Detection', '#'], ['Alerts & Case Management', '#'], ['Regulatory Reporting (STR/SAR)', '#']],
  cra: [['Configurable Risk Models', '#'], ['Individual & Business Risk Scoring', '#'], ['Sanctions & PEP Risk Overrides', '#'], ['Onboarding & Ongoing Reassessment', '#'], ['Auditable Score Breakdowns', '#']],
  fraud: [['Fraud Prevention', '#'], ['New Account Fraud Prevention', '#'], ['Identity Fraud Prevention', '#'], ['Account Takeover Prevention', '#'], ['Payment Fraud Prevention', '#'], ['Money Muling Prevention', '#']],
};
const TABS = [['all', 'All'], ['ver', 'Verification'], ['scr', 'Screening'], ['tm', 'Transaction Monitoring'], ['cra', 'Customer Risk Assessment'], ['fraud', 'Fraud']];
const EVERYTHING = [...SOL.ver, ...SOL.scr, ...SOL.tm, ...SOL.cra, ...SOL.fraud];
const PICK_ALL = [SOL.ver[0], SOL.ver[1], SOL.scr[0], SOL.tm[0], SOL.cra[1], SOL.ver[3], SOL.fraud[0]];

const DEV = {
  setup: { label: 'Set up', title: 'Start in test mode', text: 'Create your workspace, invite your team and run checks on sample people before any real customer sees them.', cta: 'Create a free account' },
  custom: { label: 'Customise', title: 'Make the flow yours', text: 'Choose which checks each customer goes through and match the verification screens to your brand. No designers or developers needed.', cta: 'See the verification flow' },
  live: { label: 'Go live', title: 'Switch on and start onboarding', text: 'Flip to live mode and watch decisions arrive in your dashboard as customers verify, each one saved with its evidence.', cta: 'Talk to sales' },
};

export default function HomePage() {
  const [tab, setTab] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [activeIdx, setActiveIdx] = useState('sol');
  const [devKey, setDevKey] = useState('setup');

  const collapsed = tab === 'all' && !expanded;
  const tiles = tab === 'all' ? (collapsed ? PICK_ALL : EVERYTHING) : SOL[tab];
  const dev = DEV[devKey];

  useEffect(() => {
    document.title = 'Intact ID — Trust infrastructure for Africa';
  }, []);

  // Highlight the side index item for the block on screen
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActiveIdx(en.target.id); });
    }, { rootMargin: '-35% 0px -55% 0px' });
    ['sol', 'ops', 'int'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="pg-home" style={{ zoom: "0.8", fontFamily: "Figtree, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      {/* header: utility row + nav row = 112px */}
      <Nav />
      {/* hero: centred large text + one CTA */}
      <section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0 56px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "136px 0 0" }}>
          <h1 style={{ margin: "0", maxWidth: "1240px", fontWeight: "500", fontSize: "clamp(44px, 5.6vw, 88px)", lineHeight: "1.08", letterSpacing: "-0.015em", color: "#16181D" }}>
            Trust infrastructure for Africa's regulated businesses
          </h1>
          <p style={{ margin: "24px 0 0", maxWidth: "760px", fontSize: "20px", lineHeight: "28px", color: "#16181D" }}>
            Connect onboarding, risk checks and monitoring, cut manual reviews, and grow across Africa
            <br />
            without adding more tools, teams, or processes
          </p>
          <a className="btn-primary" href="#" style={{ marginTop: "40px", padding: "15.5px 32px", borderRadius: "8px", fontSize: "18px", fontWeight: "500", lineHeight: "25.2px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            {"Get started "}
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
        {/* logo strip: scrolls slowly, fades out at both edges, pauses on hover */}
        <div className="marquee-box" role="region" aria-label="National registries Intact ID connects to" style={{ marginTop: "168px", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 10%, #000 90%, transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0, #000 10%, #000 90%, transparent 100%)" }}>
          <div className="marquee">
            <div style={{ display: "flex", alignItems: "center", gap: "96px", paddingRight: "96px", height: "56px", fontWeight: "600", fontSize: "30px", letterSpacing: "-0.01em", color: "#9AA1A6", whiteSpace: "nowrap" }}>
              <span>
                IPRS
              </span>
              <span>
                Huduma
              </span>
              <span>
                CR12
              </span>
              <span>
                NIN
              </span>
              <span>
                BVN
              </span>
              <span>
                CAC
              </span>
              <span>
                Ghana Card
              </span>
              <span>
                NIA
              </span>
              <span>
                RGD
              </span>
              <span>
                NIRA
              </span>
              <span>
                URSB
              </span>
              <span>
                NIDA
              </span>
              <span>
                BRELA
              </span>
              <span>
                RDB
              </span>
            </div>
            <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "96px", paddingRight: "96px", height: "56px", fontWeight: "600", fontSize: "30px", letterSpacing: "-0.01em", color: "#9AA1A6", whiteSpace: "nowrap" }}>
              <span>
                IPRS
              </span>
              <span>
                Huduma
              </span>
              <span>
                CR12
              </span>
              <span>
                NIN
              </span>
              <span>
                BVN
              </span>
              <span>
                CAC
              </span>
              <span>
                Ghana Card
              </span>
              <span>
                NIA
              </span>
              <span>
                RGD
              </span>
              <span>
                NIRA
              </span>
              <span>
                URSB
              </span>
              <span>
                NIDA
              </span>
              <span>
                BRELA
              </span>
              <span>
                RDB
              </span>
            </div>
          </div>
        </div>
        {/* banner: logo animation — the card appears, its pieces drop in, then the name; light planes drift slowly */}
        <div style={{ position: "relative", marginTop: "44px", height: "900px", borderRadius: "24px", overflow: "hidden", backgroundImage: "linear-gradient(135deg, #0E6B4F 0%, #07432F 48%, #031F16 100%)" }}>
          <div className="drift-a" aria-hidden="true" style={{ position: "absolute", inset: "-6%", clipPath: "polygon(0 0, 58% 0, 0 72%)", backgroundImage: "linear-gradient(125deg, rgba(150,232,198,0.85) 0%, rgba(61,201,145,0.6) 38%, rgba(29,185,128,0) 80%)" }} />
          <div className="drift-b" aria-hidden="true" style={{ position: "absolute", inset: "-6%", clipPath: "polygon(46% 0, 100% 0, 100% 46%, 70% 30%)", backgroundImage: "linear-gradient(200deg, rgba(95,211,163,0.5) 0%, rgba(29,185,128,0.15) 55%, rgba(29,185,128,0) 100%)" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: "0", backgroundImage: "radial-gradient(ellipse 42% 40% at 50% 36%, rgba(3,31,22,0.65) 0%, rgba(3,31,22,0) 100%), linear-gradient(180deg, rgba(3,31,22,0) 55%, rgba(2,20,14,0.6) 100%)" }} />
          <div role="img" aria-label="Intact ID logo" style={{ position: "absolute", left: "0", right: "0", top: "230px", display: "flex", alignItems: "center", justifyContent: "center", gap: "36px" }}>
            <svg aria-hidden="true" width="230" height="230" viewBox="0 0 48 48" style={{ overflow: "visible" }}>
              <rect className="la la-card" x="3" y="9" width="42" height="30" rx="8" fill="#FFFFFF" />
              <circle className="la la-dot" cx="17" cy="19.5" r="3.4" fill="#0B5D45" />
              <rect className="la la-stem" x="13.6" y="25" width="6.8" height="9" rx="3.4" fill="#0B5D45" />
              <rect className="la la-bar1" x="26" y="20" width="12" height="3.4" rx="1.7" fill="#1DB980" />
              <rect className="la la-bar2" x="26" y="27" width="8" height="3.4" rx="1.7" fill="#1DB980" />
            </svg>
            <span className="la la-name" style={{ color: "#FFFFFF", fontWeight: "600", fontSize: "150px", lineHeight: "1", letterSpacing: "-0.04em" }}>
              intact id
            </span>
          </div>
          <div style={{ position: "absolute", left: "0", right: "0", bottom: "84px", padding: "0 48px", textAlign: "center" }}>
            <h2 style={{ margin: "0", color: "#FFFFFF", fontWeight: "600", fontSize: "clamp(48px, 7.4vw, 128px)", lineHeight: "1.02", letterSpacing: "-0.02em" }}>
              Intact ID connects
              <br />
              your trust stack
            </h2>
          </div>
        </div>
      </section>
      {/* value row: four cards between the banner and the Solutions grid */}
      <section aria-label="Why Intact ID" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0 56px", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px", paddingTop: "32px" }}>
          <div style={{ position: "relative", minHeight: "276px", padding: "112px 32px 36px", borderRadius: "20px", background: "#F2F6F4", boxSizing: "border-box" }}>
            <span style={{ position: "absolute", top: "28px", right: "28px", width: "56px", height: "56px", borderRadius: "8px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A0C0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="13" r="8" />
                <path d="m12 13 3-3M9 4h6" />
              </svg>
            </span>
            <h3 style={{ margin: "0", fontWeight: "500", fontSize: "38px", lineHeight: "1.12", letterSpacing: "-0.015em", color: "#0A0C0E" }}>
              Onboard in minutes
            </h3>
            <p style={{ margin: "10px 0 0", fontSize: "20px", lineHeight: "28px", color: "#16181D", maxWidth: "380px" }}>
              Most customers finish ID, selfie and registry checks in about two minutes, with no back-and-forth.
            </p>
          </div>
          <div style={{ position: "relative", minHeight: "276px", padding: "112px 32px 36px", borderRadius: "20px", background: "#F2F6F4", boxSizing: "border-box" }}>
            <span style={{ position: "absolute", top: "28px", right: "28px", width: "56px", height: "56px", borderRadius: "8px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A0C0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v9h9" />
                <path d="M12 12 6 18.5" />
              </svg>
            </span>
            <h3 style={{ margin: "0", fontWeight: "500", fontSize: "38px", lineHeight: "1.12", letterSpacing: "-0.015em", color: "#0A0C0E" }}>
              Verify at the source
            </h3>
            <p style={{ margin: "10px 0 0", fontSize: "20px", lineHeight: "28px", color: "#16181D", maxWidth: "380px" }}>
              Checks run directly against IPRS, NIN, Ghana Card and other national registries, not a copied database.
            </p>
          </div>
          <div style={{ position: "relative", minHeight: "276px", padding: "112px 32px 36px", borderRadius: "20px", background: "#F2F6F4", boxSizing: "border-box" }}>
            <span style={{ position: "absolute", top: "28px", right: "28px", width: "56px", height: "56px", borderRadius: "8px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A0C0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="m8.5 12 2.5 2.5 4.5-5" />
              </svg>
            </span>
            <h3 style={{ margin: "0", fontWeight: "500", fontSize: "38px", lineHeight: "1.12", letterSpacing: "-0.015em", color: "#0A0C0E" }}>
              Defend every decision
            </h3>
            <p style={{ margin: "10px 0 0", fontSize: "20px", lineHeight: "28px", color: "#16181D", maxWidth: "380px" }}>
              Each result keeps its source, timestamp and evidence for seven years, ready when the regulator asks.
            </p>
          </div>
          <div style={{ position: "relative", minHeight: "276px", padding: "112px 32px 36px", borderRadius: "20px", background: "#F2F6F4", boxSizing: "border-box" }}>
            <span style={{ position: "absolute", top: "28px", right: "28px", width: "56px", height: "56px", borderRadius: "8px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A0C0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="m7 15 4-4 3 3 4-5M15 9h3v3" />
              </svg>
            </span>
            <h3 style={{ margin: "0", fontWeight: "500", fontSize: "38px", lineHeight: "1.12", letterSpacing: "-0.015em", color: "#0A0C0E" }}>
              Grow across Africa
            </h3>
            <p style={{ margin: "10px 0 0", fontSize: "20px", lineHeight: "28px", color: "#16181D", maxWidth: "380px" }}>
              Add new countries, products and risk rules on the same API, without rebuilding your onboarding.
            </p>
          </div>
        </div>
      </section>
      {/* dark section: sticky intro + index on the left, Solutions / Operational layer / Integrations on the right */}
      <section aria-label="Products" style={{ marginTop: "160px", backgroundColor: "#040806", backgroundImage: "radial-gradient(ellipse 45% 40% at 92% 96%, rgba(95,211,163,0.38) 0%, rgba(95,211,163,0) 100%), radial-gradient(ellipse 60% 50% at 70% 10%, rgba(14,107,79,0.35) 0%, rgba(14,107,79,0) 100%), linear-gradient(160deg, #06110C 0%, #040806 60%, #071A12 100%)", color: "#E8EDEB" }}>
        <div className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0 56px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "0" }}>
          <div style={{ flex: "0 1 534px", minWidth: "min(100%, 360px)", borderRight: "1px solid rgba(255,255,255,0.09)", boxSizing: "border-box", paddingRight: "48px" }}>
            <div style={{ position: "sticky", top: "112px", height: "calc(125vh - 112px)", minHeight: "640px", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "58px 0 52px", boxSizing: "border-box" }}>
              <div>
                <h2 style={{ margin: "0", fontWeight: "500", fontSize: "37px", lineHeight: "1.16", letterSpacing: "-0.01em", color: "#E8EDEB", maxWidth: "360px" }}>
                  See how Intact ID connects your trust stack
                </h2>
                <p style={{ margin: "20px 0 0", fontSize: "20px", lineHeight: "28px", color: "rgba(232,237,235,0.78)", maxWidth: "400px" }}>
                  Start with what you need. Add more as your operation grows.
                </p>
              </div>
              <nav aria-label="On this section" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <a data-idx="sol" href="#sol" className={`idx${activeIdx === 'sol' ? ' is-on' : ''}`}>
                  <span className="idx__dot" />
                  Solutions
                </a>
                <a data-idx="ops" href="#ops" className={`idx${activeIdx === 'ops' ? ' is-on' : ''}`}>
                  <span className="idx__dot" />
                  Operational layer
                </a>
                <a data-idx="int" href="#int" className={`idx${activeIdx === 'int' ? ' is-on' : ''}`}>
                  <span className="idx__dot" />
                  Integrations
                </a>
              </nav>
            </div>
          </div>
          <div style={{ flex: "1 1 760px", minWidth: "0", padding: "52px 0 180px 50px", boxSizing: "border-box" }}>
            <div id="sol" style={{ scrollMarginTop: "140px" }}>
              <h2 style={{ margin: "0", fontWeight: "500", fontSize: "74px", lineHeight: "1.1", letterSpacing: "-0.02em", color: "#E8EDEB" }}>
                Solutions
              </h2>
              <div id="solTabs" role="tablist" aria-label="Filter solutions" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "30px" }}>
              {TABS.map(([key, label]) => (
                <button
                  key={key}
                  className={`tab${tab === key ? ' is-on' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => { setTab(key); setExpanded(false); }}
                >
                  {label}
                </button>
              ))}
            </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "9px", marginTop: "50px" }} id="solGrid">
              {tiles.map(([label, href]) => (href.startsWith('/') ? (
                <Link key={label} className="tile" to={href}>{label}<span className="tile__dot" /></Link>
              ) : (
                <a key={label} className="tile" href={href}>{label}<span className="tile__dot" /></a>
              )))}
              {collapsed && (
                <button className="tile tile--more" type="button" onClick={() => setExpanded(true)}>
                  +{EVERYTHING.length - PICK_ALL.length} more
                </button>
              )}
            </div>
            </div>
            <div id="ops" style={{ marginTop: "200px", scrollMarginTop: "140px" }}>
              <h2 style={{ margin: "0", fontWeight: "500", fontSize: "74px", lineHeight: "1.1", letterSpacing: "-0.02em", color: "#E8EDEB" }}>
                Operational Layer
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "9px", marginTop: "50px" }}>
                <a className="tile" href="#">
                  Explainable Risk Scoring
                  <span className="tile__dot" />
                </a>
                <a className="tile" href="#">
                  {"Evidence & Audit Log"}
                  <span className="tile__dot" />
                </a>
                <a className="tile" href="#">
                  {"Alerts & Case Management"}
                  <span className="tile__dot" />
                </a>
                <a className="tile" href="#">
                  Ongoing Monitoring
                  <span className="tile__dot" />
                </a>
                <a className="tile" href="#">
                  Regulatory Reporting (STR/SAR)
                  <span className="tile__dot" />
                </a>
                <a className="tile" href="#">
                  Auditable Score Breakdowns
                  <span className="tile__dot" />
                </a>
              </div>
            </div>
            <div id="int" style={{ marginTop: "200px", scrollMarginTop: "140px" }}>
              <h2 style={{ margin: "0", fontWeight: "500", fontSize: "74px", lineHeight: "1.1", letterSpacing: "-0.02em", color: "#E8EDEB" }}>
                Integrations
              </h2>
              <p style={{ margin: "18px 0 0", fontSize: "20px", lineHeight: "28px", color: "rgba(232,237,235,0.78)", maxWidth: "640px" }}>
                Direct connections to national registries, and the tools your engineers already use.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "9px", marginTop: "50px" }}>
                <a className="tile" href="#">
                  IPRS
                  <span style={{ display: "block", marginTop: "8px", fontSize: "16px", color: "rgba(232,237,235,0.6)" }}>
                    Kenya
                  </span>
                </a>
                <a className="tile" href="#">
                  {"NIN & BVN"}
                  <span style={{ display: "block", marginTop: "8px", fontSize: "16px", color: "rgba(232,237,235,0.6)" }}>
                    Nigeria
                  </span>
                </a>
                <a className="tile" href="#">
                  Ghana Card
                  <span style={{ display: "block", marginTop: "8px", fontSize: "16px", color: "rgba(232,237,235,0.6)" }}>
                    Ghana
                  </span>
                </a>
                <a className="tile" href="#">
                  NIRA
                  <span style={{ display: "block", marginTop: "8px", fontSize: "16px", color: "rgba(232,237,235,0.6)" }}>
                    Uganda
                  </span>
                </a>
                <a className="tile" href="#">
                  NIDA
                  <span style={{ display: "block", marginTop: "8px", fontSize: "16px", color: "rgba(232,237,235,0.6)" }}>
                    Tanzania · Rwanda
                  </span>
                </a>
                <a className="tile" href="#">
                  Web Widget
                  <span className="tile__dot" />
                </a>
                <a className="tile" href="#">
                  {"API & SDKs"}
                  <span style={{ display: "block", marginTop: "8px", fontSize: "16px", color: "rgba(232,237,235,0.6)" }}>
                    Node · Python · Go · PHP · Java
                  </span>
                </a>
                <a className="tile" href="#">
                  Signed Webhooks
                  <span className="tile__dot" />
                </a>
                <a className="tile" href="#">
                  Sandbox
                  <span className="tile__dot" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* industries: photo background with a white card */}
      <section aria-labelledby="ind-title" style={{ position: "relative", overflow: "hidden", minHeight: "780px", backgroundColor: "#E6F1EB", backgroundImage: "radial-gradient(ellipse 45% 70% at 74% 55%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%), linear-gradient(115deg, #EEF5F1 0%, #DCEDE4 50%, #C4E4D3 100%)" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "0", bottom: "0", right: "4%", width: "min(52%, 820px)" }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: "330px", height: "660px", margin: "-330px 0 0 -165px", borderRadius: "52px", background: "#0F1513", padding: "12px", boxSizing: "border-box", boxShadow: "0 40px 90px rgba(10,40,28,0.28)" }}>
            <div style={{ height: "100%", borderRadius: "41px", background: "#FFFFFF", overflow: "hidden", padding: "54px 22px 22px", boxSizing: "border-box", position: "relative", fontFamily: "Figtree, system-ui, sans-serif" }}>
              <span style={{ position: "absolute", top: "14px", left: "50%", width: "92px", height: "26px", marginLeft: "-46px", borderRadius: "13px", background: "#0F1513" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "15px", fontWeight: "600", color: "#1F2523" }}>
                <LogoMark size={22} />
                intact id
              </div>
              <div style={{ marginTop: "22px", border: "1px solid #D7DBDA", borderRadius: "20px", padding: "26px 16px 16px", textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", margin: "0 auto", borderRadius: "50%", background: "#1DB980", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </div>
                <div style={{ marginTop: "16px", fontSize: "21px", fontWeight: "600", color: "#1F2523" }}>
                  You're verified
                </div>
                <div style={{ marginTop: "6px", fontSize: "13px", lineHeight: "1.45", color: "#4D5560" }}>
                  Your identity has been confirmed.
                </div>
                <div style={{ marginTop: "16px", textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 0", borderTop: "1px solid #EEF1F0", fontSize: "14px", color: "#1F2523" }}>
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="#1DB980" />
                      <path d="m7.5 12.3 3 3 6-6.3" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ flex: "1" }}>
                      ID document
                    </span>
                    <span style={{ color: "#5B6461", fontSize: "12px" }}>
                      Passed
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 0", borderTop: "1px solid #EEF1F0", fontSize: "14px", color: "#1F2523" }}>
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="#1DB980" />
                      <path d="m7.5 12.3 3 3 6-6.3" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ flex: "1" }}>
                      Liveness check
                    </span>
                    <span style={{ color: "#5B6461", fontSize: "12px" }}>
                      Passed
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 0", borderTop: "1px solid #EEF1F0", fontSize: "14px", color: "#1F2523" }}>
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="#1DB980" />
                      <path d="m7.5 12.3 3 3 6-6.3" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ flex: "1" }}>
                      Registry match
                    </span>
                    <span style={{ color: "#5B6461", fontSize: "12px" }}>
                      Passed
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "16px", height: "42px", borderRadius: "999px", background: "#1F2523", color: "#FFFFFF", fontSize: "15px", fontWeight: "500", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  Continue
                </div>
              </div>
              <div style={{ marginTop: "14px", textAlign: "center", fontSize: "11px", color: "#5B6461" }}>
                {"Powered by "}
                <strong style={{ color: "#1F2523" }}>
                  Intact ID
                </strong>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", top: "16%", left: "0", display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", background: "#FFFFFF", borderRadius: "14px", boxShadow: "0 18px 40px rgba(10,40,28,0.14)", whiteSpace: "nowrap" }}>
            <span style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#DCEFE5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B5D45" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 17l5-5 4 4 7-8" />
                <path d="M15 8h5v5" />
              </svg>
            </span>
            <span>
              <span style={{ display: "block", fontSize: "17px", fontWeight: "600", color: "#0A0C0E" }}>
                Loan approved
              </span>
              <span style={{ display: "block", marginTop: "2px", fontSize: "14px", color: "#4D5560" }}>
                Digital lending
              </span>
            </span>
          </div>
          <div style={{ position: "absolute", top: "30%", right: "0", display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", background: "#FFFFFF", borderRadius: "14px", boxShadow: "0 18px 40px rgba(10,40,28,0.14)", whiteSpace: "nowrap" }}>
            <span style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#DCEFE5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B5D45" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
                <path d="M10 18.5h4" />
              </svg>
            </span>
            <span>
              <span style={{ display: "block", fontSize: "17px", fontWeight: "600", color: "#0A0C0E" }}>
                Wallet upgraded
              </span>
              <span style={{ display: "block", marginTop: "2px", fontSize: "14px", color: "#4D5560" }}>
                Mobile money
              </span>
            </span>
          </div>
          <div style={{ position: "absolute", bottom: "22%", left: "4%", display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", background: "#FFFFFF", borderRadius: "14px", boxShadow: "0 18px 40px rgba(10,40,28,0.14)", whiteSpace: "nowrap" }}>
            <span style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#DCEFE5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B5D45" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3 3 7.5h18L12 3Z" />
              </svg>
            </span>
            <span>
              <span style={{ display: "block", fontSize: "17px", fontWeight: "600", color: "#0A0C0E" }}>
                Account opened
              </span>
              <span style={{ display: "block", marginTop: "2px", fontSize: "14px", color: "#4D5560" }}>
                {"Banks & SACCOs"}
              </span>
            </span>
          </div>
          <div style={{ position: "absolute", bottom: "12%", right: "6%", display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", background: "#FFFFFF", borderRadius: "14px", boxShadow: "0 18px 40px rgba(10,40,28,0.14)", whiteSpace: "nowrap" }}>
            <span style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#DCEFE5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B5D45" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 18 0Z" />
                  <path d="M12 12v6a2 2 0 0 0 4 0" />
              </svg>
            </span>
            <span>
              <span style={{ display: "block", fontSize: "17px", fontWeight: "600", color: "#0A0C0E" }}>
                Policy issued
              </span>
              <span style={{ display: "block", marginTop: "2px", fontSize: "14px", color: "#4D5560" }}>
                Insurance
              </span>
            </span>
          </div>
        </div>
        <div className="wrap" style={{ position: "relative", maxWidth: "1920px", margin: "0 auto", padding: "80px 56px", boxSizing: "border-box" }}>
          <div style={{ width: "min(100%, 724px)", background: "#FFFFFF", borderRadius: "16px", padding: "40px 32px 32px", boxSizing: "border-box" }}>
            <h2 id="ind-title" style={{ margin: "0", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.05", letterSpacing: "-0.02em", color: "#0A0C0E" }}>
              Adapts to your
              <br />
              business
            </h2>
            <p style={{ margin: "16px 0 0", fontSize: "20px", lineHeight: "28px", color: "#16181D" }}>
              One platform for every regulated industry you grow in
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "16px", marginTop: "120px" }}>
              <a className="ind" href="#">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3 3 7.5h18L12 3Z" />
                </svg>
                {"Banks & SACCOs"}
                <svg className="ind__arrow" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="ind" href="#">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
                  <path d="M10 18.5h4M9.5 9.5h5M12 7.5v4" />
                </svg>
                Mobile money
                <svg className="ind__arrow" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="ind" href="#">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 17l5-5 4 4 7-8" />
                  <path d="M15 8h5v5" />
                </svg>
                Digital lending
                <svg className="ind__arrow" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="ind" href="#">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
                  <path d="M2.5 10h19M6.5 15h4" />
                </svg>
                {"Payments & fintech"}
                <svg className="ind__arrow" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="ind" href="#">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 0 1 18 0Z" />
                  <path d="M12 12v6a2 2 0 0 0 4 0" />
                </svg>
                Insurance
                <svg className="ind__arrow" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="ind" href="#">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="3" />
                  <circle cx="9" cy="9" r="1.2" />
                  <circle cx="15" cy="15" r="1.2" />
                  <circle cx="15" cy="9" r="1.2" />
                  <circle cx="9" cy="15" r="1.2" />
                </svg>
                {"Betting & gaming"}
                <svg className="ind__arrow" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* numbers: dark, facts only */}
      <section aria-labelledby="num-title" style={{ background: "#0A0D0C", color: "#E8EDEB" }}>
        <div className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 520px", minWidth: "min(100%, 360px)", position: "sticky", top: "160px" }}>
            <h2 id="num-title" style={{ margin: "0", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em", color: "#FFFFFF", maxWidth: "640px" }}>
              Turn compliance into a reason to grow
            </h2>
            <p style={{ margin: "22px 0 0", fontSize: "20px", lineHeight: "28px", color: "rgba(232,237,235,0.75)", maxWidth: "520px" }}>
              Fewer tools to stitch together, fewer manual reviews, and an answer ready when the regulator asks.
            </p>
            <a href="#" style={{ marginTop: "36px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 32px", borderRadius: "8px", background: "#FFFFFF", color: "#0A0C0E", fontSize: "18px", fontWeight: "500" }}>
              {"Talk to sales "}
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div style={{ flex: "1 1 760px", minWidth: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "330px", padding: "44px 40px 40px", borderRadius: "16px", background: "#161B19", boxSizing: "border-box" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", color: "#FFFFFF" }}>
                <span style={{ fontSize: "clamp(88px, 8.4vw, 150px)", fontWeight: "400", lineHeight: "0.95", letterSpacing: "-0.04em" }}>
                  6
                </span>
                <span style={{ fontSize: "30px", fontWeight: "500", color: "#5FD3A3" }}>
                  countries
                </span>
              </div>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "500", color: "#FFFFFF" }}>
                  Connected today
                </div>
                <div style={{ marginTop: "6px", fontSize: "17px", lineHeight: "1.5", color: "rgba(232,237,235,0.62)" }}>
                  Kenya, Nigeria, Ghana and Uganda live. Tanzania and Rwanda in beta.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "330px", padding: "44px 40px 40px", borderRadius: "16px", background: "#161B19", boxSizing: "border-box" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", color: "#FFFFFF" }}>
                <span style={{ fontSize: "clamp(88px, 8.4vw, 150px)", fontWeight: "400", lineHeight: "0.95", letterSpacing: "-0.04em" }}>
                  1
                </span>
                <span style={{ fontSize: "30px", fontWeight: "500", color: "#5FD3A3" }}>
                  API call
                </span>
              </div>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "500", color: "#FFFFFF" }}>
                  For a full verification
                </div>
                <div style={{ marginTop: "6px", fontSize: "17px", lineHeight: "1.5", color: "rgba(232,237,235,0.62)" }}>
                  Document, biometrics, registry and sanctions results come back together.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "330px", padding: "44px 40px 40px", borderRadius: "16px", background: "#161B19", boxSizing: "border-box" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", color: "#FFFFFF" }}>
                <span style={{ fontSize: "clamp(88px, 8.4vw, 150px)", fontWeight: "400", lineHeight: "0.95", letterSpacing: "-0.04em" }}>
                  7
                </span>
                <span style={{ fontSize: "30px", fontWeight: "500", color: "#5FD3A3" }}>
                  years
                </span>
              </div>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "500", color: "#FFFFFF" }}>
                  Evidence kept
                </div>
                <div style={{ marginTop: "6px", fontSize: "17px", lineHeight: "1.5", color: "rgba(232,237,235,0.62)" }}>
                  Every result keeps its source, timestamp and raw registry response.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "330px", padding: "44px 40px 40px", borderRadius: "16px", background: "#161B19", boxSizing: "border-box" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", color: "#FFFFFF" }}>
                <span style={{ fontSize: "clamp(88px, 8.4vw, 150px)", fontWeight: "400", lineHeight: "0.95", letterSpacing: "-0.04em" }}>
                  5
                </span>
                <span style={{ fontSize: "30px", fontWeight: "500", color: "#5FD3A3" }}>
                  SDKs
                </span>
              </div>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "500", color: "#FFFFFF" }}>
                  Ready to integrate
                </div>
                <div style={{ marginTop: "6px", fontSize: "17px", lineHeight: "1.5", color: "rgba(232,237,235,0.62)" }}>
                  Node, Python, Go, PHP and Java, plus a sandbox from day one.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* go live: tabbed panel with product visuals (no code) */}
      <section aria-labelledby="dev-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
        <h2 id="dev-title" style={{ margin: "0", textAlign: "center", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em", color: "#0A0C0E" }}>
          From sign-up to live in days
        </h2>
        <div style={{ marginTop: "56px", display: "flex", flexWrap: "wrap", gap: "40px", padding: "40px", borderRadius: "24px", background: "#F2F6F4", boxSizing: "border-box" }}>
          <div style={{ flex: "1 1 560px", minWidth: "min(100%, 340px)", display: "flex", flexDirection: "column" }}>
            <div id="devTabs" role="tablist" aria-label="Getting started" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {Object.entries(DEV).map(([key, d]) => (
                <button
                  key={key}
                  className={`devtab${devKey === key ? ' is-on' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={devKey === key}
                  onClick={() => setDevKey(key)}
                >
                  <span className="devtab__ring" />
                  {d.label}
                </button>
              ))}
            </div>
            <span style={{ flex: "1", minHeight: "120px" }} />
            <h3 style={{ margin: "0", fontSize: "36px", fontWeight: "500", letterSpacing: "-0.01em", color: "#0A0C0E" }} id="devTitle">{dev.title}</h3>
            <p style={{ margin: "16px 0 0", fontSize: "20px", lineHeight: "30px", color: "#3F4744", maxWidth: "680px" }} id="devText">{dev.text}</p>
            <a href="#" style={{ marginTop: "32px", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 28px", borderRadius: "8px", background: "#FFFFFF", border: "1.25px solid #DEE2E6", color: "#0A0C0E", fontSize: "18px", fontWeight: "500" }}>
              <span id="devCta">{dev.cta}</span>
              {" "}
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div style={{ flex: "1 1 760px", minWidth: "0", minHeight: "560px", borderRadius: "16px", backgroundImage: "linear-gradient(135deg, #CFEBDD 0%, #8FD3B3 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px", boxSizing: "border-box" }}>
            {devKey === 'setup' && <SetupPanel />}
            {devKey === 'custom' && <CustomPanel />}
            {devKey === 'live' && <LivePanel />}
          </div>
        </div>
      </section>
      {/* final call to action */}
      <section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px", boxSizing: "border-box" }}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "24px", padding: "clamp(48px, 6vw, 96px)", backgroundImage: "linear-gradient(135deg, #0E6B4F 0%, #07432F 60%, #031F16 100%)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "40px" }}>
          <img src="/site-assets/africa-dots.svg" alt="" style={{ position: "absolute", right: "-40px", top: "-60px", width: "460px", opacity: "0.18" }} />
          <div style={{ position: "relative", maxWidth: "820px" }}>
            <h2 style={{ margin: "0", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em", color: "#FFFFFF" }}>
              Start with the sandbox
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: "20px", lineHeight: "28px", color: "#CFE6DB" }}>
              Full test data, every check, no contract. Make your first verification call in about ten minutes.
            </p>
          </div>
          <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "18px", fontWeight: "500" }}>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 32px", borderRadius: "8px", background: "#FFFFFF", color: "#0A0C0E" }}>
              {"Get started "}
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", padding: "15.5px 32px", borderRadius: "8px", border: "1.25px solid rgba(255,255,255,0.45)", color: "#FFFFFF" }}>
              Talk to sales
            </a>
          </div>
        </div>
      </section>
      {/* footer */}
      <footer style={{ background: "#0A0D0C", color: "#E8EDEB" }}>
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
                    <a className="flink" href="#">
                      Business verification (KYB)
                    </a>
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
                    <a className="flink" href="#">
                      Real-time screening
                    </a>
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
                    <a className="flink" href="#">
                      Explainable risk scoring
                    </a>
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
                    <a className="flink" href="#">
                      Risk scoring
                    </a>
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
    </div>
  );
}
