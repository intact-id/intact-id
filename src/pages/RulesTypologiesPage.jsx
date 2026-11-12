import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './rules.css';

const ACC = {
lists: [['Country risk','Rate each country low, medium or high, and use the rating in any rule or scenario.'],['Block lists','Accounts, wallets and phone numbers your team has confirmed as fraud.'],['Allow lists with expiry','Trusted payees such as utilities or school fees, so regular payments are not flagged. Every entry expires.']],
gov: [['Versions','Every change creates a new version. Past decisions keep the version that made them.'],['Who and why','Each change records who made it and the reason they gave.'],['Second approval','Require an MLRO or second person to approve before a change goes live.']]
};
const TY = [
{ label: 'Structuring', title: 'Structuring', text: 'Breaking money into amounts just under a reporting threshold to avoid being reported.', tag: 'Scenario: 5 or more deposits under KES 100,000 in 10 days', rows: [['Targeted by', '1 scenario, 1 rule'], ['Watches', 'Deposits and transfers'], ['Runs', 'Nightly and on each payment']] },
{ label: 'Mule accounts', title: 'Mule accounts', text: 'Accounts that receive money from others and pass it on quickly, often for a fee.', tag: 'Scenario: 80% of money in leaves within 24 hours, 3 times in 14 days', rows: [['Targeted by', '2 scenarios, 2 rules'], ['Watches', 'Incoming and outgoing flows'], ['Runs', 'Nightly and on each payment']] },
{ label: 'Fan-in', title: 'Fan-in', text: 'Many unrelated senders paying one account, a common sign of collection for scams.', tag: 'Scenario: 15 or more new senders in 7 days', rows: [['Targeted by', '1 scenario'], ['Watches', 'Incoming payments'], ['Runs', 'Nightly']] },
{ label: 'Fan-out', title: 'Fan-out', text: 'One account paying many new receivers, often to spread stolen money.', tag: 'Scenario: 10 or more new receivers in 7 days', rows: [['Targeted by', '1 scenario, 1 rule'], ['Watches', 'Outgoing payments'], ['Runs', 'Nightly']] },
{ label: 'Round-tripping', title: 'Round-tripping', text: 'Money sent through other accounts that comes back to where it started, to make it look legitimate.', tag: 'Scenario: funds return within 3 hops in 30 days', rows: [['Targeted by', '1 scenario'], ['Watches', 'The network of payments'], ['Runs', 'Weekly']] },
{ label: 'Account takeover', title: 'Account takeover', text: 'Someone else gets into a real customer’s account and moves money out.', tag: 'Rule: new payee, over KES 50,000, phone new in 24 hours → Review', rows: [['Targeted by', '3 rules, 1 scenario'], ['Watches', 'Logins, devices and payments'], ['Runs', 'On each payment']] },
{ label: 'SIM swap', title: 'SIM swap', text: 'A fraudster moves the victim’s number to a new SIM to reset and empty their wallet.', tag: 'Rule: SIM changed in last 7 days and payment over KES 20,000 → Review', rows: [['Targeted by', '2 rules'], ['Watches', 'SIM changes and payments'], ['Runs', 'On each payment']] }
];
const CNT = [['3', 3], ['4', 4], ['5', 5], ['6', 6]];
const WIN = [['7 days', 7], ['10 days', 10], ['14 days', 14]];
const FAQS = [
['What is the difference between a rule and a scenario?','A rule is checked on each payment as it happens. A scenario looks back over a customer’s activity on a schedule, for patterns no single payment shows.'],
['What is a typology?','A known pattern of fraud or laundering, such as structuring or mule accounts. Rules, scenarios and alerts are tagged with the typology they target.'],
['Can we set different thresholds for different customers?','Yes. Each segment, such as retail, business or high-risk customers, can have its own parameters.'],
['How do we test a change before it goes live?','Run it against past data to see how many alerts it would have raised and which known cases it would have caught.'],
['What happens when we add a new scenario?','You can run it over a past period to find what would have been missed, as well as running it going forward.'],
['Will the same pattern alert again and again?','No. A pattern already alerted and closed is not raised again unless new activity is added to it.'],
['Who can change rules?','Anyone your roles allow. Every change is versioned with who made it and why, and can require a second person’s approval.'],
['Can we switch a rule off quickly?','Yes. Rules can be switched on and off, and the change is recorded like any other.']
];

export default function RulesTypologiesPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  const loc = useLocation();
  useEffect(() => {
    document.title = "Intact ID \u2014 Rules and typologies";
  }, []);
  useEffect(() => {
    if (!loc.hash) return;
    const t = setTimeout(() => { const el = document.getElementById(loc.hash.slice(1)); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    return () => clearTimeout(t);
  }, [loc.hash]);

const accVals = {};
Object.keys(ACC).forEach(k => { accVals[k] = ACC[k].map((x, i) => { const o = (S.acc || {})[k] === i || ((S.acc || {})[k] === undefined && i === 0); return { q: x[0], a: x[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ acc: Object.assign({}, S.acc, { [k]: o ? -1 : i }) }) }; }); });
const faqVals = FAQS.map((f, i) => { const o = (S.faq === undefined ? 0 : S.faq) === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ faq: o ? -1 : i }) }; });

const chooserVals = (key, list) => { const i = S[key] === undefined ? 0 : S[key]; const x = list[i];
  return { [key + 'Chips']: list.map((t, j) => ({ label: t.label, cls: 'chip' + (i === j ? ' is-on' : ''), selected: i === j ? 'true' : 'false', pick: () => set({ [key]: j }) })),
           [key]: { title: x.title, text: x.text, tag: x.tag || '', rows: x.rows.map(r => ({ a: r[0], b: r[1] })) } }; };
const ci = S.cnt === undefined ? 2 : S.cnt, wi = S.win === undefined ? 1 : S.win;
const n = CNT[ci][1], d = WIN[wi][1];
const alerts = Math.round(1900 * Math.pow(0.45, n - 3) * (d / 10));
const caught = Math.min(12, Math.max(4, Math.round(14 - (n - 3) * 2.2 + (d - 10) / 3)));
const page = Object.assign({}, chooserVals('ty', TY), {
cntChips: CNT.map((c, i) => ({ label: c[0], cls: 'chip' + (ci === i ? ' is-on' : ''), selected: ci === i ? 'true' : 'false', pick: () => set({ cnt: i }) })),
winChips: WIN.map((c, i) => ({ label: c[0], cls: 'chip' + (wi === i ? ' is-on' : ''), selected: wi === i ? 'true' : 'false', pick: () => set({ win: i }) })),
bt: { alerts: alerts.toLocaleString('en-US') + ' alerts', perDay: String(Math.round(alerts / 90)), caught: caught + ' of 12',
  note: alerts / 90 > 15 ? 'Catches more, but more alerts than most teams can review. Try a higher count.' : caught < 8 ? 'Very few alerts, but known cases are being missed. Try a lower count.' : 'A workable balance of alerts and cases caught.' }
});

  const acc = accVals;
  const faqs = faqVals;
  const { tyChips, ty, cntChips, winChips, bt } = page;

  return (
    <div className="pg-kyc pg-kyb pg-rules" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0px 56px 0px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 660px", minWidth: "min(100%, 420px)" }}>
<div className="eyepill"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="7" height="5" rx="1.5" /><rect x="14" y="15" width="7" height="5" rx="1.5" /><path d="M6.5 9v3.5a2 2 0 0 0 2 2H14" /></svg>Rules and typologies</div>
<h1 className="h1">Write the rules. Test them on the past. Prove every change.</h1>
<p className="lead">Your compliance team decides what counts as suspicious, in plain conditions, for each segment of customers. Every rule is tested before it goes live and every change is on record.</p>
<div className="ctas"><a className="btn-primary" href="#">Book a demo <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn-ghost" href="#">Try the sandbox</a></div>
</div>
<div role="img" aria-label="Animated illustration: a compliance analyst builds a rule, when the receiver is new, the amount is over KES 50,000 and the phone is new, then review the payment. It is tested on 90 days of past payments, catches 4 of 5 known takeover cases, is approved by the MLRO and goes live as version 7." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pp-stage" style={{ position: "relative", width: "760px", height: "520px", flex: "none" }}><div className="ui" style={{ position: "absolute", left: "0", top: "0", width: "470px", animation: "rules-rul4 10s infinite both" }}><div className="ui__h"><b>New rule · Takeover payout</b><span className="pill pill--info">Draft</span></div><div className="cond" style={{ animation: "rules-rul1 10s infinite both" }}><span className="cond__k">When</span><span>Receiver is new to this customer</span></div><div className="cond" style={{ animation: "rules-rul2 10s infinite both" }}><span className="cond__k">and</span><span>Amount is over KES 50,000</span></div><div className="cond" style={{ animation: "rules-rul3 10s infinite both" }}><span className="cond__k">and</span><span>Phone first seen in the last 24 hours</span></div><div className="cond cond--then" style={{ animation: "rules-rul5 10s infinite both" }}><span className="cond__k">Then</span><span>Review the payment</span><span className="pill pill--warn" style={{ marginLeft: "auto" }}>Review</span></div><div className="tags" style={{ animation: "rules-rul6 10s infinite both" }}><span>Typology: account takeover</span><span>Segment: retail</span></div></div><div className="ui" style={{ position: "absolute", right: "0", top: "150px", width: "300px", animation: "rules-rul7 10s infinite both" }}><div className="ui__h"><b>Tested on last 90 days</b><span style={{ position: "relative", width: "18px", height: "18px", flex: "none", display: "inline-block" }}><span className="pp-out" style={{ position: "absolute", inset: "0", animation: "rules-rul8 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "rules-rul9 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span></div><div style={{ animation: "rules-rul10 10s infinite both" }}><div className="bt"><span>Would have raised</span><b>124 alerts</b></div><div className="bt"><span>Known takeover cases caught</span><b>4 of 5</b></div></div></div><div className="ui" style={{ position: "absolute", left: "60px", top: "330px", width: "420px", animation: "rules-rul11 10s infinite both" }}><div style={{ display: "flex", alignItems: "center", gap: "12px" }}><img src="/site-assets/person-4.webp" alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} /><div style={{ flex: "1", fontSize: "13px", lineHeight: "1.35" }}><b style={{ fontWeight: "600" }}>Approved by Otieno, MLRO</b><div style={{ color: "#5B6461" }}>“Catches the March takeover cases.”</div></div><span className="pill pill--ok" style={{ animation: "rules-rul12 10s infinite both" }}>Live · v7</span></div></div></div></div>
</div>

</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Three tools, one library.</h2><div className="vgrid"><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg></span><h3>Rules</h3></div><p>Checked on each payment as it happens. “New payee, large amount, new phone → Review.”</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /></svg></span><h3>Scenarios</h3></div><p>Run on a schedule over days or weeks. “5 deposits under the limit in 10 days.”</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg></span><h3>Typologies</h3></div><p>Every rule, scenario and alert is tagged with the pattern it targets, so you can see coverage at a glance.</p></div></div></section>

<section id="typologies" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">The typology library</h2><p className="sub2">Known patterns of fraud and laundering, and the rules and scenarios that target each one.</p>
<div className="cho">
<div className="tm-chips" role="tablist" style={{ margin: "0" }}>{tyChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" role="tab" aria-selected={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div>
<div className="cho__body">
<div className="cho__l"><h3>{ty.title}</h3><p>{ty.text}</p><div className="ex"><span>Example</span><b>{ty.tag}</b></div></div>
<div className="cho__r">{ty.rows.map((r, ri) => (<Fragment key={ri}><div className="cho__row"><span>{r.a}</span><b>{r.b}</b></div></Fragment>))}</div>
</div>
</div></section>

<section id="testing" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Tune a scenario before it goes live</h2>
<p className="sub2">Change the settings and see what the scenario would have done on past data. These results are from a sample dataset, to show how testing works.</p>
<div className="calc">
<div className="calc__in">
<div><div className="q">Scenario</div><div style={{ marginTop: "8px", fontSize: "22px", fontWeight: "500" }}>Structuring</div><div style={{ marginTop: "4px", fontSize: "15px", color: "#5B6461" }}>Repeated deposits just under KES 100,000</div></div>
<div><div className="q">Number of deposits</div><div className="tm-chips">{cntChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" aria-pressed={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div></div>
<div><div className="q">Looking back over</div><div className="tm-chips">{winChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" aria-pressed={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div></div>
</div>
<div className="calc__out">
<div style={{ fontSize: "15px", color: "#CFE6DB" }}>On the last 90 days, this would have raised</div>
<div className="big">{bt.alerts}</div>
<div className="kv"><span>Alerts a day for your team</span><b>{bt.perDay}</b></div>
<div className="kv"><span>Known structuring cases caught</span><b>{bt.caught}</b></div>
<div style={{ marginTop: "6px", fontSize: "14px", lineHeight: "1.45", color: "#CFE6DB" }}>{bt.note}</div>
</div>
</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Control without chaos</h2><div id="lists"></div><div className="feat"><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>Lists</b><span className="seg"><span className="seg__on">Countries</span><span>Blocked</span><span>Trusted</span></span></div><div className="rl"><div className="rl__t"><b>Country risk list</b><span>24 countries rated high, 31 medium</span></div><span className="pill pill--warn">Used by 9 rules</span></div><div className="rl"><div className="rl__t"><b>Internal block list</b><span>Wallets and accounts confirmed as fraud</span></div><span className="pill pill--bad">112 entries</span></div><div className="rl"><div className="rl__t"><b>Trusted payee · KPLC prepaid</b><span>Allowed for retail · expires 31 Dec 2026</span></div><span className="pill pill--ok">Allow list</span></div><div className="rl"><div className="rl__t"><b>Trusted payee · School fees, Moi Girls</b><span>Allowed for retail · expires 30 Apr 2027</span></div><span className="pill pill--ok">Allow list</span></div></div></div><div className="ftxt"><h3>Lists your rules can use</h3><p className="fp">Rate countries by risk, block accounts confirmed as fraud, and trust regular payees, with an expiry date so trust never lasts forever.</p><div className="accs">{acc.lists.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div><div id="governance"></div><div className="feat"><div className="ftxt"><h3>Every change on the record</h3><p className="fp">Rules and scenarios are versioned, with who changed what and why, and a second person can be required to approve.</p><div className="accs">{acc.gov.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>History · Takeover payout rule</b></div><div className="rl"><span className="pill pill--ok">v7</span><div className="rl__t"><b>Phone first seen within 24 hours added</b><span>Wanjiru proposed · Otieno approved · 12 Nov 2026</span></div></div><div className="rl"><span className="pill pill--grey">v6</span><div className="rl__t"><b>Amount raised from KES 30,000 to 50,000</b><span>Kevin proposed · Otieno approved · 2 Sep 2026</span></div></div><div className="rl"><span className="pill pill--grey">v5</span><div className="rl__t"><b>Rule created for retail segment</b><span>Wanjiru proposed · Otieno approved · 9 May 2026</span></div></div><div className="rl__foot"><span>Payments decided under v6 still show v6</span></div></div></div></div></section>

<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 id="faq-title" className="h2">Questions teams ask us</h2><div className="faqs">{faqs.map((f, fi) => (<Fragment key={fi}><div className="faqi"><button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{f.open && (<><p className="faqa">{f.a}</p></>)}</div></Fragment>))}</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 112px", boxSizing: "border-box" }}>
<div className="endcta"><img src="/site-assets/africa-dots.svg" alt="" className="endcta__map" />
<div style={{ position: "relative", maxWidth: "760px" }}><h2>Bring your own rules to the sandbox</h2><p>Write a rule, test it on sample data and see what it catches before it touches a real customer.</p></div>
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
