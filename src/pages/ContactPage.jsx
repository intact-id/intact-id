import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './contact.css';

const ACC = {};
const FAQS = [];

export default function ContactPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  const loc = useLocation();
  useEffect(() => {
    document.title = "Intact ID \u2014 Contact";
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
    <div className="pg-kyc pg-kyb pg-contact" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0px 56px 0px", boxSizing: "border-box" }}><div style={{ textAlign: "center", paddingTop: "24px" }}><div className="eyepill"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>Contact</div><h1 className="h1" style={{ maxWidth: "900px", marginLeft: "auto", marginRight: "auto" }}>Talk to the Intact ID team.</h1><p className="lead" style={{ marginLeft: "auto", marginRight: "auto" }}>We are based in Nairobi, Kenya. Write to us and the right person will get back to you.</p></div><div className="cgrid"><a className="cc" href="mailto:contact@intact-io.com?subject=Sales%20enquiry"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></svg></span><b>Sales and general questions</b><span>Pricing, demos, and anything about verification, screening or monitoring.</span><i>contact@intact-io.com</i></a><a className="cc" href="mailto:partner@intact-io.com?subject=Partnership"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="3" /><circle cx="16" cy="16" r="3" /><path d="M10.5 10.5 13.5 13.5" /></svg></span><b>Partnerships</b><span>Data, technology and referral partnerships.</span><i>partner@intact-io.com</i></a><a className="cc" href="mailto:contact@intact-io.com?subject=Security%20question"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg></span><b>Security and compliance</b><span>Due diligence questionnaires, data protection and security questions.</span><i>contact@intact-io.com</i></a><a className="cc" href="mailto:contact@intact-io.com?subject=Careers"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></span><b>Careers</b><span>Apply for a role or tell us what you would like to build.</span><i>contact@intact-io.com</i></a></div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 112px", boxSizing: "border-box" }}><div className="join"><div><h2>Want to try it first?</h2><p>The sandbox has sample people, companies and payments, with no contract needed.</p></div><div className="ctas" style={{ margin: "0" }}><a className="btn-primary" href="/pricing">Start free trial <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a></div></div></section>

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
