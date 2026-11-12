import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './anom.css';

const ACC = {
net: [['Who pays whom','Every payment adds to a map of how customers and outside accounts are connected.'],['Close to confirmed cases','Accounts one or two links from confirmed fraud or laundering score as riskier.'],['Circles and clusters','Money going round in circles and tight groups of linked accounts stand out.']],
cmp: [['Scored in the background','A candidate model scores live payments without affecting any decision.'],['Compared like for like','Both models are measured on the same payments: fraud caught and false alarms.'],['A person signs it off','The candidate goes live only if it is measurably better and someone approves it. Drift in accuracy triggers retraining.']]
};
const FX = [
{ key: 'amt', label: 'Amount compared with usual', opts: [['Normal', 0], ['3 times', 1], ['12 times', 2]], def: 2 },
{ key: 'rcv', label: 'Receiver', opts: [['Paid before', 0], ['New', 1], ['New, linked to fraud', 2]], def: 2 },
{ key: 'dev', label: 'Device', opts: [['Trusted phone', 0], ['New phone', 1]], def: 0 },
{ key: 'sim', label: 'SIM card', opts: [['No change', 0], ['Swapped this week', 1]], def: 0 }
];
const FAQS = [
['What does the score mean?','It is a number from 0 to 100 saying how unusual or risky a payment looks. Your segment’s bands turn it into Allow, Review or Block.'],
['Why does every score come with reasons?','So an analyst can check the decision, a customer can be told why, and a regulator can see it was fair. Reasons are written in plain language.'],
['What does the model look at?','The customer’s history, the receiver, the network of who pays whom, device and location, and the customer’s risk profile.'],
['Does it replace our rules?','No. Rules and the model work together. Rules can make a decision stricter, and nothing can let a confirmed sanctions match through.'],
['We are new. Do we need our own data first?','No. You start with rules and an industry-wide model. Your own model takes over as your own outcomes build up.'],
['How is a new model put live?','It scores live payments in the background first, is compared with the current model, and goes live only if it is better and a person approves it.'],
['What if the model is unavailable?','The payment goes to Review so a person decides, and the record shows the model did not run.'],
['Can we see how well it is working?','Yes. Catch rate, false alarms and accuracy over time, broken down by pattern, with warnings when accuracy drifts.']
];

export default function AnomalyDetectionPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  const loc = useLocation();
  useEffect(() => {
    document.title = "Intact ID \u2014 Behavioural anomaly detection";
  }, []);
  useEffect(() => {
    if (!loc.hash) return;
    const t = setTimeout(() => { const el = document.getElementById(loc.hash.slice(1)); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    return () => clearTimeout(t);
  }, [loc.hash]);

const accVals = {};
Object.keys(ACC).forEach(k => { accVals[k] = ACC[k].map((x, i) => { const o = (S.acc || {})[k] === i || ((S.acc || {})[k] === undefined && i === 0); return { q: x[0], a: x[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ acc: Object.assign({}, S.acc, { [k]: o ? -1 : i }) }) }; }); });
const faqVals = FAQS.map((f, i) => { const o = (S.faq === undefined ? 0 : S.faq) === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ faq: o ? -1 : i }) }; });

const pick = f => (S[f.key] === undefined ? f.def : S[f.key]);
const v = k => pick(FX.find(x => x.key === k));
const parts = [];
const amt = v('amt'), rcv = v('rcv'), dev = v('dev'), sim = v('sim');
if (amt === 1) parts.push(['3 times the usual amount', 14]); if (amt === 2) parts.push(['12 times the usual amount', 34]);
if (rcv === 1) parts.push(['First payment to this receiver', 12]); if (rcv === 2) parts.push(['New receiver linked to confirmed fraud', 30]);
if (dev === 1) parts.push(['Payment from a phone first seen today', 15]);
if (sim === 1) parts.push(['SIM card swapped this week', 22]);
const score = Math.min(99, 6 + parts.reduce((a, p) => a + p[1], 0));
const dec = score >= 90 ? ['Block', 'pill pill--bad', '#D64545'] : score >= 60 ? ['Review', 'pill pill--warn', '#E0A030'] : ['Allow', 'pill pill--ok', '#1DB980'];
const page = {
fx: FX.map(f => ({ label: f.label, opts: f.opts.map((o, i) => { const on = pick(f) === i; return { label: o[0], cls: 'chip' + (on ? ' is-on' : ''), selected: on ? 'true' : 'false', pick: () => set({ [f.key]: i }) }; }) })),
sc: { score: String(score), pct: score + '%', color: dec[2], decision: dec[0], cls: dec[1], reasons: parts.sort((a, b) => b[1] - a[1]).map(p => ({ t: p[0], w: p[1] >= 25 ? 'Strong' : p[1] >= 14 ? 'Medium' : 'Weak' })), none: parts.length === 0 }
};

  const acc = accVals;
  const faqs = faqVals;
  const { fx, sc } = page;

  return (
    <div className="pg-kyc pg-kyb pg-anom" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0px 56px 0px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 660px", minWidth: "min(100%, 420px)" }}>
<div className="eyepill"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m7 15 3-3 3 2 6-7" /><circle cx="19" cy="7" r="1.5" /></svg>Behavioural anomaly detection</div>
<h1 className="h1">Spots what does not fit. Says why in plain words.</h1>
<p className="lead">A detection model learns what normal looks like for each customer, scores every payment from 0 to 100, and explains the score in reasons your analysts can check.</p>
<div className="ctas"><a className="btn-primary" href="#">Book a demo <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn-ghost" href="#">Try the sandbox</a></div>
</div>
<div role="img" aria-label="Animated illustration: Peter’s usual weekly payments are around KES 8,000. Today he sends KES 99,000. The risk score rises to 86 with three reasons: 12 times his usual amount, a first payment to this receiver, and a receiver linked to confirmed mule accounts. The payment goes to review." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pp-stage" style={{ position: "relative", width: "760px", height: "520px", flex: "none" }}><div className="ui" style={{ position: "absolute", left: "0", top: "0", width: "420px", animation: "anom-anm10 10s infinite both" }}><div className="ui__h"><b>Peter Kamau · payments sent</b><span className="pill pill--grey">Last 8 weeks</span></div><div className="bars"><span style={{ height: "21%", transformOrigin: "bottom", animation: "anom-anm1 10s infinite both" }}></span><span style={{ height: "27%", transformOrigin: "bottom", animation: "anom-anm2 10s infinite both" }}></span><span style={{ height: "18%", transformOrigin: "bottom", animation: "anom-anm3 10s infinite both" }}></span><span style={{ height: "24%", transformOrigin: "bottom", animation: "anom-anm4 10s infinite both" }}></span><span style={{ height: "30%", transformOrigin: "bottom", animation: "anom-anm5 10s infinite both" }}></span><span style={{ height: "21%", transformOrigin: "bottom", animation: "anom-anm6 10s infinite both" }}></span><span style={{ height: "24%", transformOrigin: "bottom", animation: "anom-anm7 10s infinite both" }}></span><span style={{ height: "27%", transformOrigin: "bottom", animation: "anom-anm8 10s infinite both" }}></span><span className="spk" style={{ height: "96%", transformOrigin: "bottom", animation: "anom-anm9 10s infinite both" }}></span><i className="avg"></i></div><div className="bars__k"><span>Usual: about KES 8,000</span><span style={{ color: "#B23434", fontWeight: "600" }}>Today: KES 99,000</span></div></div><div className="ui" style={{ position: "absolute", right: "0", top: "190px", width: "330px", animation: "anom-anm14 10s infinite both" }}><div className="ui__h"><b>Risk score</b><span className="pill pill--bad" style={{ animation: "anom-anm15 10s infinite both" }}>Review</span></div><div className="gauge"><i style={{ transformOrigin: "left", animation: "anom-anm16 10s infinite both" }}></i></div><div className="gauge__k"><span>0</span><b>86</b><span>100</span></div><div className="rl" style={{ animation: "anom-anm11 10s infinite both" }}><span className="rl__dot rl__dot--bad"></span><div className="rl__t"><b>12 times his usual amount</b></div></div><div className="rl" style={{ animation: "anom-anm12 10s infinite both" }}><span className="rl__dot rl__dot--warn"></span><div className="rl__t"><b>First payment to this receiver</b></div></div><div className="rl" style={{ animation: "anom-anm13 10s infinite both" }}><span className="rl__dot rl__dot--bad"></span><div className="rl__t"><b>Receiver linked to 2 confirmed mule accounts</b></div></div></div></div></div>
</div>

</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Scores you can read, not black boxes.</h2><div className="vgrid"><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20a8 8 0 1 1 16 0" /><path d="m12 20 4-6" /></svg></span><h3>A score from 0 to 100</h3></div><p>How unusual or risky a payment looks, compared with your segment’s bands.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h10M4 18h7" /></svg></span><h3>Always with reasons</h3></div><p>“10 times the usual amount.” “Receiver linked to confirmed fraud.” Never just a number.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5" /></svg></span><h3>Normal for this customer</h3></div><p>Each customer is compared with their own history, not a one-size-fits-all limit.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" /><path d="M18 3v4h-4M6 21v-4h4" /></svg></span><h3>Learns from your team</h3></div><p>Every confirmed case and false alarm makes the next model sharper.</p></div></div></section>

<section id="try" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Change one thing. Watch the score move.</h2>
<p className="sub2">A simplified example of how context changes the score and the reasons. The real model weighs many more signals.</p>
<div className="calc">
<div className="calc__in">
{fx.map((g, gi) => (<Fragment key={gi}><div><div className="q">{g.label}</div><div className="tm-chips">{g.opts.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" aria-pressed={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div></div></Fragment>))}
</div>
<div className="calc__out">
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "15px", color: "#CFE6DB" }}>Risk score</span><span className={sc.cls}>{sc.decision}</span></div>
<div className="big" style={{ marginBottom: "6px" }}>{sc.score}</div>
<div className="gauge gauge--dark"><i style={{ width: sc.pct, background: sc.color }}></i></div>
<div style={{ marginTop: "16px", fontSize: "15px", color: "#CFE6DB" }}>Reasons</div>
{sc.reasons.map((r, ri) => (<Fragment key={ri}><div className="kv"><span>{r.t}</span><b>{r.w}</b></div></Fragment>))}
{sc.none && (<><div className="kv"><span>Nothing unusual about this payment</span><b></b></div></>)}
</div>
</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">The model behind the score</h2><div id="network"></div><div className="feat"><div className="fvis"><div className="ui" style={{ width: "88%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "center" }}><div><div className="ui__h" style={{ margin: "0" }}><b>Linked accounts</b></div><svg aria-hidden="true" viewBox="0 0 260 220" style={{ width: "100%", height: "auto", marginTop: "8px" }} fill="none"><g stroke="#C3CBC7" strokeWidth="1.6"><path d="M130 110 50 40M130 110 210 40M130 110 40 170M130 110 220 170M130 110 130 200" /></g><circle cx="130" cy="110" r="26" fill="#FBE3E3" stroke="#D64545" strokeWidth="2" /><text x="130" y="115" textAnchor="middle" fontSize="13" fontWeight="600" fill="#8C2626">Wallet</text><circle cx="50" cy="40" r="16" fill="#F2F6F4" stroke="#9AA6A0" strokeWidth="1.6" /><circle cx="210" cy="40" r="16" fill="#F2F6F4" stroke="#9AA6A0" strokeWidth="1.6" /><circle cx="40" cy="170" r="16" fill="#F2F6F4" stroke="#9AA6A0" strokeWidth="1.6" /><circle cx="220" cy="170" r="16" fill="#F2F6F4" stroke="#9AA6A0" strokeWidth="1.6" /><circle cx="130" cy="200" r="16" fill="#F2F6F4" stroke="#9AA6A0" strokeWidth="1.6" /></svg><div style={{ fontSize: "12px", color: "#5B6461" }}>14 senders, 1 receiver, 48 hours</div></div><div><div style={{ fontSize: "13px", color: "#5B6461" }}>Compared with this customer’s usual month</div><div style={{ marginTop: "12px", fontSize: "13px" }}>New senders<div className="bar"><b style={{ width: "92%", background: "#D64545" }}></b></div></div><div style={{ marginTop: "12px", fontSize: "13px" }}>Money in<div className="bar"><b style={{ width: "81%", background: "#D64545" }}></b></div></div><div style={{ marginTop: "12px", fontSize: "13px" }}>Time money stays<div className="bar"><b style={{ width: "12%", background: "#E0A030" }}></b></div></div><div style={{ marginTop: "12px", fontSize: "13px" }}>Device changes<div className="bar"><b style={{ width: "6%", background: "#1DB980" }}></b></div></div><div style={{ marginTop: "14px", padding: "10px 12px", borderRadius: "8px", background: "#FBE3E3", color: "#8C2626", fontSize: "13px", fontWeight: "600" }}>Likely mule account</div></div></div></div><div className="ftxt"><h3>Network risk, not just account risk</h3><p className="fp">The model sees who pays whom. Being close to accounts confirmed as fraud raises a payment’s score, even when everything else looks normal.</p><div className="accs">{acc.net.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div><div id="models"></div><div className="feat"><div className="ftxt"><h3>A new model has to earn its place</h3><p className="fp">Candidates score live payments in the background, are compared with the current model on the same payments, and go live only when a person approves.</p><div className="accs">{acc.cmp.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>Model comparison</b><span className="pill pill--info">Example</span></div><table className="tbl"><tr><th></th><th className="num">Live · v14</th><th className="num">Candidate · v15</th></tr><tr><td>Fraud caught</td><td className="num">81%</td><td className="num"><b style={{ color: "#0A6B47" }}>86%</b></td></tr><tr><td>False alarms per 1,000 payments</td><td className="num">4.2</td><td className="num"><b style={{ color: "#0A6B47" }}>3.1</b></td></tr><tr><td>Days scored in the background</td><td className="num">—</td><td className="num">21</td></tr></table><div className="rl__foot"><span>Better on both. Ready for approval.</span><span className="btn-s btn-s--dark">Approve v15</span></div></div></div></div></section>

<section id="learning" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Gets better with every case you close</h2><p className="sub2">Your investigators’ conclusions are what improves detection.</p><div className="loop"><div className="loop__s"><span className="loop__n">1</span><b>Outcomes become lessons</b><p>Alerts closed as false positives, confirmed fraud and laundering cases, chargebacks and complaints all become labelled examples.</p></div><div className="loop__s"><span className="loop__n">2</span><b>The model is retrained</b><p>When enough new outcomes build up, or accuracy starts to drift, a new model is trained.</p></div><div className="loop__s"><span className="loop__n">3</span><b>It proves itself in the background</b><p>The new model scores live payments without affecting decisions, side by side with the current one.</p></div><div className="loop__s"><span className="loop__n">4</span><b>A person approves it</b><p>It goes live only if it is measurably better and someone on your team signs it off.</p></div></div><p className="loop__note">New to Intact ID? You start with rules and an industry-wide model on day one. Your own model takes over as your own outcomes build up.</p></section>

<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 id="faq-title" className="h2">Questions teams ask us</h2><div className="faqs">{faqs.map((f, fi) => (<Fragment key={fi}><div className="faqi"><button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{f.open && (<><p className="faqa">{f.a}</p></>)}</div></Fragment>))}</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 112px", boxSizing: "border-box" }}>
<div className="endcta"><img src="/site-assets/africa-dots.svg" alt="" className="endcta__map" />
<div style={{ position: "relative", maxWidth: "760px" }}><h2>See how your customers’ payments would score</h2><p>Send sample payments to the sandbox and read the reasons behind each score.</p></div>
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
