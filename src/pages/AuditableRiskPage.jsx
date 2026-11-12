import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './audit.css';

const ACC = {
ver: [['Live models are locked','Once a model is live, nothing in it changes. Edits go into a new draft version.'],['Old versions are retired, not deleted','When a new version goes live the old one is retired and kept for every assessment it made.'],['The version is on every record','Each assessment stores the model version that scored it, so you can always reproduce the result.']],
miss: [['Required factors are never skipped','Missing required data counts as maximum risk or marks the assessment incomplete.'],['Optional factors use your default','For optional factors you can set a default score instead.'],['A note on the line','The record explains what happened, for example “value missing, maximum risk applied”.']]
};
const FAQS = [
['What does an auditor see for each customer?','Every assessment for that customer, newest first. Each shows who, when and why it ran, the model version, the data scored, the screening evidence, the rule and points for each factor, and the result.'],
['Can an assessment be edited after it is saved?','No. Assessments are only ever added. A reassessment creates a new record and the earlier ones stay exactly as they were.'],
['If we change our risk model, do old scores change?','No. Old assessments keep the model version that scored them. Only new assessments use the new version.'],
['Is the screening evidence kept?','Yes. The screening result is saved with the assessment, including the matched records, their sources and how strongly they matched.'],
['What happens when data is missing?','The record shows the gap. Required factors are scored as maximum risk or the assessment is marked incomplete, so a gap never lowers a score.'],
['Can we export records for a regulator?','Yes. Each assessment, with its full breakdown, can be fetched by API and exported for review.'],
['How long are records kept?','As long as your obligations require. Talk to us about the retention period that fits the laws you report under.']
];

export default function AuditableRiskPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  const loc = useLocation();
  useEffect(() => {
    document.title = "Intact ID \u2014 Auditable risk scoring";
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

  const acc = accVals;
  const faqs = faqVals;
  void page;

  return (
    <div className="pg-kyc pg-kyb pg-audit" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0px 56px 0px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 660px", minWidth: "min(100%, 420px)" }}>
<div className="eyepill"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5" /><path d="m9 14 2 2 4-4" /></svg>Auditable risk scoring</div>
<h1 className="h1">Every risk decision, on the record.</h1>
<p className="lead">When a regulator or auditor asks why a customer was rated the way they were, show them the data, the screening evidence, the rules and the model version, exactly as they were on the day.</p>
<div className="ctas"><a className="btn-primary" href="#">Book a demo <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn-ghost" href="#">See a sample record</a></div>
</div>
<div role="img" aria-label="Animated illustration: an assessment record builds up layer by layer: who and when, the data scored, the screening evidence, the rules and points, and the result, then it is locked as read only with the model version." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pp-stage" style={{ position: "relative", width: "760px", height: "520px", flex: "none" }}><div className="rec" style={{ animation: "audit-aud6 10s infinite both" }}><div className="rec__h"><b>Assessment record</b><span className="pill pill--grey">Model v3</span></div><div className="lay" style={{ animation: "audit-aud1 10s infinite both" }}><b>Who and when</b><div className="lay__v"><span>Amina Salim · Individual</span><span>12 Nov 2026, 09:14</span><span>Triggered by a screening event</span></div></div><div className="lay" style={{ animation: "audit-aud2 10s infinite both" }}><b>Data that was scored</b><div className="lay__v"><code>country: TZ · age: 34 · product: Premium</code></div></div><div className="lay" style={{ animation: "audit-aud3 10s infinite both" }}><b>Screening evidence</b><div className="lay__v"><span>PEP match 0.87 · Amina S. Salim</span><span>Source records and lists saved</span></div></div><div className="lay" style={{ animation: "audit-aud4 10s infinite both" }}><b>Rules and points</b><div className="lay__v"><span>Country 20 · Age 10 · Product 80 · PEP 100 · Media 0</span></div></div><div className="lay" style={{ animation: "audit-aud5 10s infinite both" }}><b>Result</b><div className="lay__v"><span>Categories 15 / 80 / 50 · Overall 42 · Medium · no override</span></div></div><div className="rec__lock" style={{ animation: "audit-aud7 10s infinite both" }}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg><span>Saved and read only. A new assessment never changes this one.</span></div></div></div></div>
</div>

</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Answers for the questions auditors ask.</h2><div className="vgrid"><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h10" /></svg></span><h3>What did you know?</h3></div><p>The exact data that was scored is saved with the assessment, so nobody can argue later about what was seen.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.3-4.3" /></svg></span><h3>What did screening find?</h3></div><p>Matched records, the lists they came from and how strongly they matched.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="7" height="5" rx="1.5" /><rect x="14" y="15" width="7" height="5" rx="1.5" /><path d="M6.5 9v3.5a2 2 0 0 0 2 2H14" /></svg></span><h3>Which rules applied?</h3></div><p>The rule each value matched, the points it gave and the weight it carried.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg></span><h3>Has anything changed since?</h3></div><p>Nothing. Assessments are never edited. A new score is a new record.</p></div></div></section>

<section id="record" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">What every assessment keeps</h2><div className="anat"><div className="anat__i"><span className="anat__n">1</span><div><b>Who, when and why</b><p>Customer, customer type, date and time, and what triggered it: onboarding, a screening event, a periodic review or a manual run.</p></div></div><div className="anat__i"><span className="anat__n">2</span><div><b>The model version</b><p>The exact version of your risk model that produced the score.</p></div></div><div className="anat__i"><span className="anat__n">3</span><div><b>The data scored</b><p>A snapshot of every value the model received.</p></div></div><div className="anat__i"><span className="anat__n">4</span><div><b>Screening evidence</b><p>The screening result with matched records, sources and match strength.</p></div></div><div className="anat__i"><span className="anat__n">5</span><div><b>Factor-by-factor working</b><p>For each factor: the value, the rule matched, the points, the weight and any note, such as missing data.</p></div></div><div className="anat__i"><span className="anat__n">6</span><div><b>Category and overall result</b><p>Each category score and level, the overall score, the final level and whether an override was applied.</p></div></div></div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Built so the record holds up</h2><div id="versions"></div><div className="feat"><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>Country of residence rule</b></div><div className="vv"><div><span className="pill pill--grey">v2 · retired</span><div className="rulebox"><span>Other country</span><b>50</b></div></div><div><span className="pill pill--ok">v3 · live</span><div className="rulebox"><span>Other country</span><b>60</b></div></div></div><div className="sub" style={{ marginTop: "14px" }}>Assessments</div><div className="rl"><div className="rl__t"><b>Brian Okello · 3 Jun 2026</b><span>Scored with v2, still shows 50</span></div><span className="pill pill--grey">v2</span></div><div className="rl"><div className="rl__t"><b>Brian Okello · 12 Nov 2026</b><span>Reassessed with v3, shows 60</span></div><span className="pill pill--ok">v3</span></div></div></div><div className="ftxt"><h3>Replay any decision</h3><p className="fp">Live models are never edited. A change becomes a new version, and every assessment keeps the version that scored it.</p><div className="accs">{acc.ver.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div><div id="gaps"></div><div className="feat"><div className="ftxt"><h3>Gaps are recorded, not hidden</h3><p className="fp">When required information is missing, the record says so and scores it as maximum risk or marks the assessment incomplete.</p><div className="accs">{acc.miss.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>Kevin Otieno</b><span className="pill pill--warn">Incomplete</span></div><table className="tbl"><tr><th>Factor</th><th>Value</th><th>What happened</th><th className="num">Points</th></tr><tr><td>Country of residence</td><td>KE</td><td style={{ color: "#5B6461" }}>In KE, UG, TZ</td><td className="num"><span className="pts">20</span></td></tr><tr><td>Age</td><td style={{ color: "#B23434" }}>Missing</td><td style={{ color: "#B23434" }}>Required, so maximum risk</td><td className="num"><span className="pts">100</span></td></tr><tr><td>Product tier</td><td style={{ color: "#B23434" }}>Missing</td><td style={{ color: "#B23434" }}>Required, so marked incomplete</td><td className="num"><span className="pts">100</span></td></tr></table><div style={{ marginTop: "12px", fontSize: "13px", lineHeight: "1.45", color: "#3F4744" }}>A gap is written down as a gap. It is never quietly scored as low risk.</div></div></div></div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><div className="fiu"><div className="fiu__l"><h2>Made for record-keeping duties</h2><p>AML laws across the region expect you to keep customer due diligence records and show how you assessed risk. Every assessment is kept the way it was made.</p><a href="#" className="fiu__cta">Book a demo <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a></div><div className="fiu__r"><div className="fiu__row"><span className="flag">KE</span><div><b>Kenya</b><span>Proceeds of Crime and Anti-Money Laundering Act</span></div></div><div className="fiu__row"><span className="flag">NG</span><div><b>Nigeria</b><span>Money Laundering (Prevention and Prohibition) Act, 2022</span></div></div><div className="fiu__row"><span className="flag">GH</span><div><b>Ghana</b><span>Anti-Money Laundering Act, 2020 (Act 1044)</span></div></div></div></div></section>

<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 id="faq-title" className="h2">Questions teams ask us</h2><div className="faqs">{faqs.map((f, fi) => (<Fragment key={fi}><div className="faqi"><button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{f.open && (<><p className="faqa">{f.a}</p></>)}</div></Fragment>))}</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 112px", boxSizing: "border-box" }}>
<div className="endcta"><img src="/site-assets/africa-dots.svg" alt="" className="endcta__map" />
<div style={{ position: "relative", maxWidth: "760px" }}><h2>See a full assessment record</h2><p>Score a sample customer in the sandbox and open the record behind it.</p></div>
<div className="ctas" style={{ position: "relative", margin: "0" }}><a href="#" className="btn-white">Try the sandbox <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a href="#" className="btn-line">Book a demo</a></div></div>
</section>

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
