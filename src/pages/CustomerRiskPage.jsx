import { Fragment, useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './cra.css';

const ACC = {
model: [
['Weighted factors','Give each factor a weight that reflects your risk appetite, and use different models for retail, business and high-value customers.'],
['Your own thresholds','Decide where low, medium and high begin, and what each level means for checks and reviews.'],
['Test before publishing','Score your existing customers with a draft model to see how many would move level before you switch it on.']],
live: [
['Event-driven updates','A new screening hit, an expired document or an unusual transaction can change the score straight away.'],
['Full score history','See every change with the date, the rule that fired and the points it added.'],
['Automatic reviews','When a customer moves to a higher level, open a review or request more information automatically.']]
};
const FAQS = [
['What is a customer risk assessment?','It is how you decide how risky each customer is for money laundering, terrorist financing or fraud, so you can apply lighter or stronger checks to match.'],
['Which risk factors are usually scored?','Common factors are geography, PEP and sanctions status, the products and channels used, occupation and source of funds, and transaction behaviour.'],
['Can we use our own risk methodology?','Yes. You choose the factors, weights and thresholds, and can keep separate models for different customer types.'],
['How often are scores updated?','Whenever something relevant changes, such as a new screening result or a transaction pattern, as well as on your review schedule.'],
['Can we explain a score to an auditor?','Yes. Each score lists the rules that fired and the points they added, with a history of every change.'],
['Does it work for businesses as well as people?','Yes. Business customers can be scored on factors such as industry, ownership structure and the countries they operate in.'],
['How does it connect to KYC and monitoring?','Results from verification, screening and transaction monitoring feed straight into the score, and the score can decide which checks run next.'],
['Can we try it first?','Yes. The sandbox lets you build a model and score sample customers before going live.']
];
const FACTORS = [
{ key: 'geo', label: 'Country risk', opts: [['Low', 0], ['Medium', 10], ['High', 20]], def: 1, name: 'Geography' },
{ key: 'pep', label: 'PEP status', opts: [['None', 0], ['Family or associate', 25], ['PEP', 35]], def: 0, name: 'PEP status' },
{ key: 'prod', label: 'Product', opts: [['Savings', 0], ['Local transfers', 8], ['Cross-border', 15]], def: 1, name: 'Product' },
{ key: 'sof', label: 'Source of funds', opts: [['Verified', -6], ['Declared only', 6], ['Unknown', 12]], def: 0, name: 'Source of funds' }
];

export default function CustomerRiskPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  useEffect(() => {
    document.title = "Intact ID \u2014 Customer risk assessment for Africa";
  }, []);

const accVals = {};
Object.keys(ACC).forEach(k => { accVals[k] = ACC[k].map((x, i) => { const o = (S.acc || {})[k] === i || ((S.acc || {})[k] === undefined && i === 0); return { q: x[0], a: x[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ acc: Object.assign({}, S.acc, { [k]: o ? -1 : i }) }) }; }); });
const faqVals = FAQS.map((f, i) => { const o = (S.faq === undefined ? 0 : S.faq) === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ faq: o ? -1 : i }) }; });

const pickOf = f => (S[f.key] === undefined ? f.def : S[f.key]);
let total = 10;
const rows = [{ label: 'Base score', pts: '10' }];
FACTORS.forEach(f => { const v = f.opts[pickOf(f)][1]; total += v; rows.push({ label: f.name + ' · ' + f.opts[pickOf(f)][0], pts: (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) }); });
total = Math.max(0, total);
const level = total >= 50 ? 'High' : total >= 33 ? 'Medium' : 'Low';
const page = {
factorsUI: FACTORS.map(f => ({ label: f.label, opts: f.opts.map((o, i) => { const on = pickOf(f) === i; return { label: o[0], cls: 'chip' + (on ? ' is-on' : ''), selected: on ? 'true' : 'false', pick: () => set({ [f.key]: i }) }; }) })),
score: { total: String(total), level, rows, pct: Math.min(100, total) + '%',
  cls: 'pill ' + (level === 'High' ? 'pill--bad' : level === 'Medium' ? 'pill--warn' : 'pill--ok'),
  color: level === 'High' ? '#D64545' : level === 'Medium' ? '#E0A030' : '#1DB980',
  action: level === 'High' ? 'Enhanced due diligence and senior approval.' : level === 'Medium' ? 'Standard checks, review every two years.' : 'Simplified checks, review on any change.' }
};

  const acc = accVals;
  const faqs = faqVals;
  const { factorsUI, score } = page;

  return (
    <div className="pg-kyc pg-kyb pg-cra" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
{/* hero */}
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0 56px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 704px", minWidth: "min(100%, 420px)" }}>
<div style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "40px", padding: "8px 16px", boxSizing: "border-box", borderRadius: "24px", background: "#DCEFE5", color: "#16181D", fontSize: "16px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20a8 8 0 1 1 16 0" /><path d="m12 20 4-6" /></svg>Customer risk assessment</div>
<h1 style={{ margin: "12px 0 0", fontWeight: "500", fontSize: "clamp(38px, 4.2vw, 56px)", lineHeight: "1.1", color: "#16181D" }}>Risk scores that explain themselves</h1>
<p style={{ margin: "16px 0 0", fontSize: "20px", lineHeight: "28px", color: "#16181D" }}>Score every customer on the factors your regulator expects, update the score as their behaviour changes, and show exactly why each customer sits where they do.</p>
<div style={{ display: "flex", gap: "8px", marginTop: "32px", flexWrap: "wrap", fontSize: "18px", fontWeight: "500", lineHeight: "25.2px" }}>
<a className="btn-primary" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "8px" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
<a className="btn-ghost" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", border: "1.25px solid #DEE2E6", display: "inline-flex", alignItems: "center", gap: "8px" }}>See how scoring works <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div>
</div>
<div role="img" aria-label="Animated illustration: a customer profile is scored factor by factor, the total risk score fills to 52, the level becomes high, and enhanced due diligence is requested." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pp-stage" style={{ position: "relative", width: "760px", height: "520px", flex: "none" }}><div className="pp-card" style={{ position: "absolute", left: "0", top: "30px", width: "380px", animation: "cra-cra6 10s infinite both" }}><div style={{ display: "flex", alignItems: "center", gap: "14px" }}><img src="/site-assets/person-5.webp" alt="" style={{ width: "64px", height: "64px", borderRadius: "14px", objectFit: "cover" }} /><div><div style={{ fontSize: "18px", fontWeight: "600" }}>Amina Salim</div><div style={{ fontSize: "13px", color: "#5B6461", marginTop: "3px" }}>Customer since 2024 · Tanzania</div></div></div><div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px", fontSize: "13px" }}><div className="cr-kv"><span>KYC</span><b>Verified</b></div><div className="cr-kv"><span>Product</span><b>Transfers</b></div><div className="cr-kv"><span>Monthly volume</span><b>TZS 18M</b></div><div className="cr-kv"><span>Screening</span><b>1 PEP link</b></div></div></div><div className="pp-card" style={{ position: "absolute", left: "330px", top: "150px", width: "400px", padding: "22px", animation: "cra-cra7 10s infinite both" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "17px", fontWeight: "600" }}>Risk score breakdown</span><span style={{ position: "relative", display: "inline-block", width: "70px", height: "22px" }}><span className="pill pill--warn pp-out" style={{ position: "absolute", right: "0", top: "0", animation: "cra-cra8 10s infinite both" }}>Medium</span><span className="pill pill--bad" style={{ position: "absolute", right: "0", top: "0", animation: "cra-cra9 10s infinite both" }}>High</span></span></div><div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "12px" }}><b style={{ fontSize: "30px", fontWeight: "500", animation: "cra-cra10 10s infinite both" }}>52</b><div style={{ flex: "1", height: "8px", borderRadius: "4px", backgroundImage: "linear-gradient(90deg, #1DB980 0 33%, #E0A030 33% 50%, #D64545 50%)", opacity: ".25", position: "relative" }}></div></div><div style={{ height: "8px", margin: "-8px 0 0 52px", borderRadius: "4px", width: "calc(52% - 30px)", backgroundImage: "linear-gradient(90deg, #1DB980, #E0A030 60%, #D64545)", transformOrigin: "left", animation: "cra-cra11 10s infinite both" }}></div><div style={{ marginTop: "10px" }}><div className="cr-f" style={{ animation: "cra-cra1 10s infinite both" }}><span className="pill pill--warn" style={{ minWidth: "34px", textAlign: "center" }}>+10</span><div style={{ minWidth: "0" }}><div style={{ fontSize: "14px", fontWeight: "500" }}>Country of residence</div><div style={{ fontSize: "12px", color: "#5B6461" }}>Kenya</div></div></div><div className="cr-f" style={{ animation: "cra-cra2 10s infinite both" }}><span className="pill pill--bad" style={{ minWidth: "34px", textAlign: "center" }}>+25</span><div style={{ minWidth: "0" }}><div style={{ fontSize: "14px", fontWeight: "500" }}>PEP status</div><div style={{ fontSize: "12px", color: "#5B6461" }}>Family of a PEP</div></div></div><div className="cr-f" style={{ animation: "cra-cra3 10s infinite both" }}><span className="pill pill--warn" style={{ minWidth: "34px", textAlign: "center" }}>+15</span><div style={{ minWidth: "0" }}><div style={{ fontSize: "14px", fontWeight: "500" }}>Product</div><div style={{ fontSize: "12px", color: "#5B6461" }}>Cross-border transfers</div></div></div><div className="cr-f" style={{ animation: "cra-cra4 10s infinite both" }}><span className="pill pill--grey" style={{ minWidth: "34px", textAlign: "center" }}>+8</span><div style={{ minWidth: "0" }}><div style={{ fontSize: "14px", fontWeight: "500" }}>Occupation</div><div style={{ fontSize: "12px", color: "#5B6461" }}>Business owner</div></div></div><div className="cr-f" style={{ animation: "cra-cra5 10s infinite both" }}><span className="pill pill--ok" style={{ minWidth: "34px", textAlign: "center" }}>−6</span><div style={{ minWidth: "0" }}><div style={{ fontSize: "14px", fontWeight: "500" }}>Source of funds</div><div style={{ fontSize: "12px", color: "#5B6461" }}>Verified payslips</div></div></div></div><div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "10px", padding: "12px", borderRadius: "10px", background: "#FBE3E3", color: "#8C2626", fontSize: "13px", fontWeight: "600", animation: "cra-cra12 10s infinite both" }}>Enhanced due diligence requested</div></div></div></div>
</div>

<div aria-label="Risk factors you can score" role="group" style={{ marginTop: "72px", height: "56px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px", flexWrap: "wrap", fontWeight: "600", fontSize: "30px", letterSpacing: "-0.01em", color: "#8E959C" }}><span>Geography</span><span>PEP</span><span>Product</span><span>Channel</span><span>Occupation</span><span>Source of funds</span><span>Transactions</span></div>

</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<h2 className="pp-h2" style={{ maxWidth: "900px", margin: "0 auto 64px" }}>Scoring that keeps up with your customers</h2>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px" }}>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" /><path d="M18 3v4h-4M6 21v-4h4" /></svg></div><h3 className="kb-h3">Always up to date</h3><p className="kb-p">Scores recalculate when a customer’s details, screening results or transactions change.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h10M4 12h16M4 18h7" /><circle cx="17" cy="6" r="2" /><circle cx="14" cy="18" r="2" /></svg></div><h3 className="kb-h3">Set up without code</h3><p className="kb-p">Compliance teams choose the factors, weights and thresholds, and change them without a developer.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 7v5l3 2" /></svg></div><h3 className="kb-h3">Across the whole lifecycle</h3><p className="kb-p">One score from onboarding through every transaction, so reviews happen when risk changes, not just once a year.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg></div><h3 className="kb-h3">Clear for auditors</h3><p className="kb-p">Every score shows its factors and points, with a history of how it changed and why.</p></div>
</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}><h2 className="pp-h2">The features behind your risk model</h2><div className="pp-feat"><div className="pp-fvis"><div className="pp-card" style={{ width: "560px", maxWidth: "100%" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "18px", fontWeight: "600" }}>Risk model · Retail customers</span><span className="pill pill--info">Draft</span></div><div className="cr-w"><span style={{ flex: "1" }}>Geography</span><span className="cr-wbar"><b style={{ width: "25%" }}></b></span><span style={{ width: "40px", textAlign: "right", fontWeight: "600" }}>25%</span></div><div className="cr-w"><span style={{ flex: "1" }}>PEP and sanctions</span><span className="cr-wbar"><b style={{ width: "30%" }}></b></span><span style={{ width: "40px", textAlign: "right", fontWeight: "600" }}>30%</span></div><div className="cr-w"><span style={{ flex: "1" }}>Product and channel</span><span className="cr-wbar"><b style={{ width: "20%" }}></b></span><span style={{ width: "40px", textAlign: "right", fontWeight: "600" }}>20%</span></div><div className="cr-w"><span style={{ flex: "1" }}>Occupation and income</span><span className="cr-wbar"><b style={{ width: "10%" }}></b></span><span style={{ width: "40px", textAlign: "right", fontWeight: "600" }}>10%</span></div><div className="cr-w"><span style={{ flex: "1" }}>Transaction behaviour</span><span className="cr-wbar"><b style={{ width: "15%" }}></b></span><span style={{ width: "40px", textAlign: "right", fontWeight: "600" }}>15%</span></div><div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", fontSize: "13px", textAlign: "center" }}><span style={{ padding: "10px", borderRadius: "8px", background: "#E3F6EC", color: "#0A6B47" }}>Low · 0–32</span><span style={{ padding: "10px", borderRadius: "8px", background: "#FDF1E2", color: "#8A4B0B" }}>Medium · 33–49</span><span style={{ padding: "10px", borderRadius: "8px", background: "#FBE3E3", color: "#B23434" }}>High · 50+</span></div></div></div><div className="pp-ftxt"><h3 className="pp-fh">A risk model you control</h3><p className="pp-fp">Choose the factors, give each one a weight, and decide where low, medium and high begin.</p><div style={{ marginTop: "28px" }}>{acc.model.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div><div className="pp-feat"><div className="pp-ftxt"><h3 className="pp-fh">Scores that move with the customer</h3><p className="pp-fp">Each new screening result, document or transaction can change the score, and the history shows when and why.</p><div style={{ marginTop: "28px" }}>{acc.live.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div><div className="pp-fvis"><div className="pp-card" style={{ width: "540px", maxWidth: "100%" }}><div style={{ fontSize: "18px", fontWeight: "600" }}>Score history · Amina Salim</div><svg aria-hidden="true" viewBox="0 0 480 140" style={{ width: "100%", height: "auto", marginTop: "14px" }}><rect x="0" y="0" width="480" height="47" fill="#FBE3E3" opacity=".5" /><rect x="0" y="47" width="480" height="30" fill="#FDF1E2" opacity=".6" /><rect x="0" y="77" width="480" height="63" fill="#E3F6EC" opacity=".6" /><polyline points="0,110 80,108 160,104 240,92 300,66 360,58 420,47 480,40" fill="none" stroke="#0A0C0E" strokeWidth="2.5" strokeLinejoin="round"></polyline><circle cx="300" cy="66" r="5" fill="#E0A030" /><circle cx="420" cy="47" r="5" fill="#D64545" /></svg><div className="cr-ev"><span className="pill pill--warn">+15</span><span style={{ flex: "1" }}>Started cross-border transfers</span><span style={{ color: "#5B6461" }}>Mar</span></div><div className="cr-ev"><span className="pill pill--bad">+25</span><span style={{ flex: "1" }}>Screening found a PEP family link</span><span style={{ color: "#5B6461" }}>Jun</span></div><div className="cr-ev"><span className="pill pill--ok">−6</span><span style={{ flex: "1" }}>Source of funds verified</span><span style={{ color: "#5B6461" }}>Jul</span></div></div></div></div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}><h2 className="pp-h2">How risk scoring works</h2><div className="pp-feat" style={{ marginTop: "64px" }}><ol style={{ listStyle: "none", margin: "0", padding: "0", flex: "1 1 520px", minWidth: "min(100%, 320px)", display: "grid", gap: "28px", alignContent: "center" }}><li className="pp-step"><span className="pp-step__n">1</span><div><div className="pp-step__h">Pick your factors</div><div className="pp-step__p">Geography, PEP status, product, channel, occupation, source of funds and transaction behaviour.</div></div></li><li className="pp-step"><span className="pp-step__n">2</span><div><div className="pp-step__h">Write the rules</div><div className="pp-step__p">Say when a factor applies and how many points it adds, in plain terms and without code.</div></div></li><li className="pp-step"><span className="pp-step__n">3</span><div><div className="pp-step__h">Add it up automatically</div><div className="pp-step__p">Points from every rule combine into one total score and a low, medium or high level.</div></div></li><li className="pp-step"><span className="pp-step__n">4</span><div><div className="pp-step__h">Act on the result</div><div className="pp-step__p">Approve, ask for more documents, require enhanced due diligence, or set how often to review.</div></div></li></ol><div className="pp-fvis"><div className="pp-card" style={{ width: "520px", maxWidth: "100%", display: "grid", gap: "10px" }}><div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>Rule · High-risk country</div><div className="cr-rule"><span className="cr-k">If</span>Country of residence is on your high-risk list</div><div className="cr-rule"><span className="cr-k">Add</span><b style={{ fontWeight: "600" }}>+20 points</b> to Geography</div><div className="cr-rule"><span className="cr-k">Tag</span><span className="pill pill--warn">High-risk geography</span></div><div className="cr-rule"><span className="cr-k">Then</span>If total is 50 or more, request enhanced due diligence</div></div></div></div></section>

<section aria-labelledby="try-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<h2 id="try-title" className="pp-h2">See what is behind a score</h2>
<p className="pp-sub">Change the customer and watch the score respond. These weights are examples; you set your own.</p>
<div style={{ marginTop: "56px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
<div style={{ flex: "1 1 640px", minWidth: "min(100%, 340px)", padding: "36px", borderRadius: "24px", background: "#F2F6F4", boxSizing: "border-box", display: "grid", gap: "28px" }}>
{factorsUI.map((g, gi) => (<Fragment key={gi}><div><div className="tm-q">{g.label}</div><div className="tm-chips">{g.opts.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" aria-pressed={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div></div></Fragment>))}
</div>
<div style={{ flex: "1 1 420px", minWidth: "min(100%, 320px)", padding: "36px", borderRadius: "24px", background: "#FFFFFF", border: "1px solid #E1E6E3", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "10px" }}>
<div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}><span style={{ fontSize: "24px", fontWeight: "500" }}>Total risk score</span><span className={score.cls} style={{ fontSize: "14px", padding: "5px 14px" }}>{score.level}</span></div>
<div style={{ fontSize: "72px", fontWeight: "500", lineHeight: "1", letterSpacing: "-0.02em" }}>{score.total}</div>
<div style={{ height: "10px", borderRadius: "5px", background: "#EEF1F0", overflow: "hidden" }}><div style={{ height: "100%", borderRadius: "5px", width: score.pct, background: score.color }}></div></div>
<div style={{ marginTop: "10px" }}>
{score.rows.map((r, ri) => (<Fragment key={ri}><div className="cr-ev"><span style={{ flex: "1" }}>{r.label}</span><b style={{ fontWeight: "600" }}>{r.pts}</b></div></Fragment>))}
</div>
<div style={{ marginTop: "auto", padding: "14px", borderRadius: "12px", background: "#F2F6F4", fontSize: "15px" }}><b style={{ fontWeight: "600" }}>Next step:</b> {score.action}</div>
</div>
</div>
</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<div style={{ borderRadius: "24px", background: "#0A0D0C", color: "#FFFFFF", display: "flex", flexWrap: "wrap", gap: "48px", padding: "clamp(40px, 4vw, 64px)", boxSizing: "border-box" }}>
<div style={{ flex: "1 1 520px", minWidth: "min(100%, 320px)", display: "flex", flexDirection: "column" }}>
<h2 style={{ margin: "0", maxWidth: "720px", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.1", letterSpacing: "-0.02em" }}>A risk-based approach your regulator can follow</h2>
<p style={{ margin: "20px 0 0", maxWidth: "600px", fontSize: "20px", lineHeight: "28px", color: "#B9C6C0" }}>Regulators across the region expect checks to match each customer’s risk. Intact ID gives you the scores, the reasons and the record to show it.</p>
<span style={{ flex: "1", minHeight: "80px" }}></span>
<a href="#" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 28px", borderRadius: "8px", fontSize: "18px", fontWeight: "500", background: "#1DB980", color: "#0A0C0E" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div>
<div style={{ flex: "1 1 640px", minWidth: "min(100%, 320px)", display: "grid", gap: "12px" }}>
<div className="case"><b>Simplified due diligence</b><span>Low-risk customers onboard with fewer checks</span><i>Low</i></div>
<div className="case"><b>Standard due diligence</b><span>Full KYC and screening for most customers</span><i>Medium</i></div>
<div className="case"><b>Enhanced due diligence</b><span>Source of funds, senior approval and closer monitoring</span><i>High</i></div>
<div className="case"><b>Review schedule</b><span>Re-check high risk yearly, medium every two years, or on any change</span><i>Automatic</i></div>
</div>
</div>
</section>

{/* FAQ */}
<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}><h2 id="faq-title" className="pp-h2">Frequently asked questions</h2><div style={{ maxWidth: "900px", margin: "56px auto 0" }}>{faqs.map((f, fi) => (<Fragment key={fi}><div style={{ borderBottom: "1px solid #E1E6E3" }}><button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{f.open && (<><p style={{ margin: "0", padding: "0 48px 32px 0", fontSize: "19px", lineHeight: "29px", color: "#3F4744" }}>{f.a}</p></>)}</div></Fragment>))}</div></section>

{/* final call to action */}
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px", boxSizing: "border-box" }}>
<div style={{ position: "relative", overflow: "hidden", borderRadius: "24px", padding: "clamp(48px, 6vw, 96px)", backgroundImage: "linear-gradient(135deg, #0E6B4F 0%, #07432F 60%, #031F16 100%)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "40px" }}>
<img src="/site-assets/africa-dots.svg" alt="" style={{ position: "absolute", right: "-40px", top: "-60px", width: "460px", opacity: "0.18" }} />
<div style={{ position: "relative", maxWidth: "820px" }}>
<h2 style={{ margin: "0", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em", color: "#FFFFFF" }}>Build your risk model in the sandbox</h2>
<p style={{ margin: "18px 0 0", fontSize: "20px", lineHeight: "28px", color: "#CFE6DB" }}>Set factors and weights, score sample customers, and see where each one lands.</p>
</div>
<div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "18px", fontWeight: "500" }}>
<a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 32px", borderRadius: "8px", background: "#FFFFFF", color: "#0A0C0E" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
<a href="#" style={{ display: "inline-flex", alignItems: "center", padding: "15.5px 32px", borderRadius: "8px", border: "1.25px solid rgba(255,255,255,0.45)", color: "#FFFFFF" }}>Talk to sales</a>
</div>
</div>
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
