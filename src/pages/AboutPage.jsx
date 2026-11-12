import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './about.css';

const ACC = {};
const FAQS = [];

export default function AboutPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  const loc = useLocation();
  useEffect(() => {
    document.title = "Intact ID \u2014 About us";
  }, []);
  useEffect(() => {
    if (!loc.hash) return;
    const t = setTimeout(() => { const el = document.getElementById(loc.hash.slice(1)); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    return () => clearTimeout(t);
  }, [loc.hash]);

const accVals = {};
Object.keys(ACC).forEach(k => { accVals[k] = ACC[k].map((x, i) => { const o = (S.acc || {})[k] === i || ((S.acc || {})[k] === undefined && i === 0); return { q: x[0], a: x[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ acc: Object.assign({}, S.acc, { [k]: o ? -1 : i }) }) }; }); });
const faqVals = FAQS.map((f, i) => { const o = (S.faq === undefined ? 0 : S.faq) === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ faq: o ? -1 : i }) }; });

const page = {};

  void accVals;
  void faqVals;
  void page;

  return (
    <div className="pg-kyc pg-kyb pg-about" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0px 56px 0px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 660px", minWidth: "min(100%, 420px)" }}>
<div className="eyepill"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>About Intact ID</div>
<h1 className="h1">We are revolutionising compliance in Africa.</h1>
<p className="lead">Intact ID gives Africa’s regulated businesses the tools to know who they serve, check them at the source and watch for financial crime, built here, for how people and money actually move here.</p>
<div className="ctas"><a className="btn-primary" href="/">See the platform <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn-ghost" href="/contact">Talk to us</a></div>
</div>
<div role="img" aria-label="Map of Africa with the six countries Intact ID verifies in: Kenya, Uganda, Tanzania, Rwanda, Nigeria and Ghana, each with its national identity registry." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#0B5D45", backgroundImage: "radial-gradient(120% 90% at 0% 0%, #1F8A66 0%, #0B5D45 55%, #08402F 100%)", position: "relative", overflow: "hidden" }}><img src="/site-assets/africa-dots.svg" alt="" style={{ position: "absolute", left: "50%", top: "50%", width: "78%", transform: "translate(-50%, -50%)", opacity: "0.35" }} /><div className="pin2" style={{ left: "62%", top: "47%", animation: "about-abt1 10s infinite both" }}><span className="pin2__d"></span><span className="pin2__l"><b>Kenya</b>IPRS</span></div><div className="pin2" style={{ left: "56%", top: "45%", animation: "about-abt2 10s infinite both" }}><span className="pin2__d"></span><span className="pin2__l"><b>Uganda</b>NIRA</span></div><div className="pin2" style={{ left: "59%", top: "56%", animation: "about-abt3 10s infinite both" }}><span className="pin2__d"></span><span className="pin2__l"><b>Tanzania</b>NIDA</span></div><div className="pin2" style={{ left: "54%", top: "50%", animation: "about-abt4 10s infinite both" }}><span className="pin2__d"></span><span className="pin2__l"><b>Rwanda</b>NIDA</span></div><div className="pin2" style={{ left: "30%", top: "38%", animation: "about-abt5 10s infinite both" }}><span className="pin2__d"></span><span className="pin2__l"><b>Nigeria</b>NIN</span></div><div className="pin2" style={{ left: "20%", top: "41%", animation: "about-abt6 10s infinite both" }}><span className="pin2__d"></span><span className="pin2__l"><b>Ghana</b>Ghana Card</span></div></div>
</div>
</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><div className="story"><h2>Why we exist</h2><div className="story__t"><p>Most compliance tools were built for other markets. They read passports well, but not the IDs most Africans carry. They screen against global lists, but miss local ones. They watch card payments, but not mobile money, agents and cash.</p><p>So African banks, fintechs and lenders end up stitching tools together, checking documents by hand and filing reports in spreadsheets. Good customers wait. Fraud slips through. Regulators ask questions nobody can answer quickly.</p><p>We started Intact ID to change that: one platform that verifies people and businesses against the registries that issued their documents, screens and scores them, watches their payments, and keeps a record a regulator can follow.</p></div></div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">What we believe</h2><div className="vgrid"><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3 3 7.5h18L12 3Z" /></svg></span><h3>Check at the source</h3></div><p>A good-looking document proves little. A match with the registry that issued it proves a lot.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h10M4 18h7" /></svg></span><h3>Explain every decision</h3></div><p>Every score, flag and decision comes with reasons a person can read.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5" /></svg></span><h3>People decide the hard cases</h3></div><p>Automation handles the clear cases. When it is unclear, a person decides.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg></span><h3>Protect the data we hold</h3></div><p>Each client’s data is kept apart and encrypted, and we are registered with Kenya’s ODPC.</p></div></div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">What we build</h2><div className="xpl"><a className="xpl__c" href="/kyc"><b>Identity verification</b><span>ID checks, liveness and registry matches for people.</span><i>Learn more <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></i></a><a className="xpl__c" href="/kyb"><b>Business verification</b><span>Companies, directors and owners, from the registry.</span><i>Learn more <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></i></a><a className="xpl__c" href="/aml-screening"><b>AML screening</b><span>Sanctions, PEP and adverse media, at sign-up and after.</span><i>Learn more <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></i></a><a className="xpl__c" href="/customer-risk-assessment"><b>Risk assessment</b><span>Explainable scores from your own risk model.</span><i>Learn more <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></i></a><a className="xpl__c" href="/transaction-monitoring"><b>Transaction monitoring</b><span>Real-time decisions and patterns over time, ready for goAML.</span><i>Learn more <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></i></a></div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 112px", boxSizing: "border-box" }}><div className="join"><div><h2>Want to build this with us?</h2><p>We are hiring developers and interns: fully remote, with a team meetup in Nairobi every month.</p></div><div className="ctas" style={{ margin: "0" }}><a className="btn-primary" href="/careers">See open roles <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn-ghost" href="/partners">Partner with us</a></div></div></section>

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
