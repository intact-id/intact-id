import { Fragment, useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './tm.css';

const ACC = {
rules: [
['Ready-made rule sets','Start on day one with rules for mobile money, bank transfers and cards, written for local payment habits and limits.'],
['Build rules without code','Describe a pattern in plain terms, pick the amounts and time windows, and set what happens when it fires.'],
['Test before going live','Run a new rule against past transactions in test mode to see how many alerts it would raise before you switch it on.']],
ai: [
['Customer baselines','Each customer’s normal amounts, times and counterparties are learned, so a sudden change stands out.'],
['Linked accounts','Accounts that share phone numbers, devices or beneficiaries are connected, which exposes mule networks.'],
['Device and SIM signals','A new device or a recent SIM swap before a large transfer raises the risk score.']],
case: [
['Case management','Alerts on the same customer group into one case, with tasks, notes and a full history.'],
['Team review','Assign cases, set deadlines, and require a second reviewer before high-risk decisions.'],
['Regulator-ready reports','Draft an STR from the case with the transactions and evidence attached, and export it in goAML format where your FIU uses it.']]
};
const FAQS = [
['What is AML transaction monitoring?','It is the ongoing review of customer transactions to spot activity that could be money laundering, terrorist financing or fraud, so it can be investigated and, where needed, reported to the financial intelligence unit.'],
['Which payment channels can you monitor?','Mobile money, bank transfers, cards, and crypto and remittance flows. You send us transactions by API as they happen, or in batches.'],
['Does it work in real time?','Yes. Transactions are scored as they arrive, so you can hold or block a payment before it completes, or review it afterwards.'],
['What rules come out of the box?','Common patterns such as deposits just under reporting thresholds, money passing straight through an account, dormant accounts waking up, and transfers involving high-risk jurisdictions. You can change any of them.'],
['How do you reduce false positives?','Rules are tuned per product and country, and behaviour models compare each customer with their own history and similar customers. You can test changes before going live.'],
['Can we file suspicious transaction reports from Intact ID?','Yes. Reports are drafted from the case with the evidence attached, and can be exported in goAML format for FIUs that use it.'],
['How does this connect to KYC?','Each customer’s verification and risk level from onboarding is available in every alert, and a monitoring result can trigger a fresh KYC check.'],
['Can we try it first?','Yes. The sandbox lets you run sample transactions through your rules and see the alerts they raise.']
];
const TX = [['50k', 50000], ['250k', 250000], ['1M', 1000000], ['5M', 5000000]];
const RATE = [['0.5%', 0.005], ['1%', 0.01], ['2%', 0.02], ['5%', 0.05]];
const MIN = [['5 min', 5], ['10 min', 10], ['20 min', 20], ['30 min', 30]];
const RED = [['25%', 0.25], ['50%', 0.5], ['75%', 0.75]];

export default function TransactionMonitoringPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  useEffect(() => {
    document.title = "Intact ID \u2014 AML transaction monitoring for Africa";
  }, []);

const accVals = {};
Object.keys(ACC).forEach(k => { accVals[k] = ACC[k].map((x, i) => { const o = (S.acc || {})[k] === i || ((S.acc || {})[k] === undefined && i === 0); return { q: x[0], a: x[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ acc: Object.assign({}, S.acc, { [k]: o ? -1 : i }) }) }; }); });
const faqVals = FAQS.map((f, i) => { const o = (S.faq === undefined ? 0 : S.faq) === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ faq: o ? -1 : i }) }; });

const tx = TX[S.tx === undefined ? 1 : S.tx][1];
const rate = RATE[S.rate === undefined ? 1 : S.rate][1];
const mins = MIN[S.min === undefined ? 1 : S.min][1];
const red = RED[S.red === undefined ? 1 : S.red][1];
const alerts = Math.round(tx * rate);
const hours = Math.round(alerts * mins / 60);
const fmt = n => n.toLocaleString('en-US');
const chipsOf = (list, key, def) => list.map((c, i) => { const on = (S[key] === undefined ? def : S[key]) === i; return { label: c[0], cls: 'chip' + (on ? ' is-on' : ''), selected: on ? 'true' : 'false', pick: () => set({ [key]: i }) }; });
const page = {
txChips: chipsOf(TX, 'tx', 1), rateChips: chipsOf(RATE, 'rate', 1), minChips: chipsOf(MIN, 'min', 1), redChips: chipsOf(RED, 'red', 1),
calc: { alerts: fmt(alerts), hours: fmt(hours), fte: fmt(Math.max(1, Math.ceil(hours / 140))), saved: fmt(Math.round(hours * red)) }
};

  const acc = accVals;
  const faqs = faqVals;
  const { txChips, rateChips, minChips, redChips, calc } = page;

  return (
    <div className="pg-kyc pg-kyb pg-tm" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
{/* hero */}
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0 56px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 704px", minWidth: "min(100%, 420px)" }}>
<div style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "40px", padding: "8px 16px", boxSizing: "border-box", borderRadius: "24px", background: "#DCEFE5", color: "#16181D", fontSize: "16px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l5-5 4 4 8-8" /><path d="M15 8h5v5" /></svg>AML transaction monitoring</div>
<h1 style={{ margin: "12px 0 0", fontWeight: "500", fontSize: "clamp(38px, 4.2vw, 56px)", lineHeight: "1.1", color: "#16181D" }}>Catch suspicious money movement as it happens</h1>
<p style={{ margin: "16px 0 0", fontSize: "20px", lineHeight: "28px", color: "#16181D" }}>Monitor mobile money, bank and card payments in real time, with rules built for how money moves in Africa and every decision on record.</p>
<div style={{ display: "flex", gap: "8px", marginTop: "32px", flexWrap: "wrap", fontSize: "18px", fontWeight: "500", lineHeight: "25.2px" }}>
<a className="btn-primary" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "8px" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
<a className="btn-ghost" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", border: "1.25px solid #DEE2E6", display: "inline-flex", alignItems: "center", gap: "8px" }}>See it in action <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div>
</div>
<div role="img" aria-label="Animated illustration: transactions stream into a live monitoring table; one M-Pesa deposit scores high risk, is moved to review, and an alert explains the rule it broke." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pp-stage" style={{ position: "relative", width: "760px", height: "520px", flex: "none" }}><div className="pp-card" style={{ position: "absolute", left: "0", top: "10px", width: "640px", padding: "20px 22px", animation: "tm-tma10 10s infinite both" }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: "18px", fontWeight: "600" }}>Every transaction, as it happens</span><span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "600", color: "#0A6B47" }}><span className="pulse" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1DB980", display: "inline-block" }}></span>Live</span></div><div className="tm-row tm-head"><span>Risk</span><span>Customer</span><span>Status</span><span>Type</span><span style={{ textAlign: "right" }}>Amount</span></div><div className="tm-tr" style={{ animation: "tm-tma1 10s infinite both" }}><div className="tm-row" style={{  }}><span><span className="pill pill--ok">12</span></span><span className="tm-name">Grace Achieng<i className="cc">KE</i></span><span><span className="pill pill--ok">Approved</span></span><span className="tm-muted">M-Pesa deposit</span><span className="tm-amt">KES 4,500</span></div></div><div className="tm-tr" style={{ animation: "tm-tma2 10s infinite both" }}><div className="tm-row" style={{  }}><span><span className="pill pill--ok">8</span></span><span className="tm-name">Chidi Okafor<i className="cc">NG</i></span><span><span className="pill pill--ok">Approved</span></span><span className="tm-muted">NIP transfer</span><span className="tm-amt">NGN 120,000</span></div></div><div className="tm-tr" style={{ animation: "tm-tma3 10s infinite both" }}><div className="tm-row" style={{  }}><span><span className="pill pill--ok">21</span></span><span className="tm-name">Brian Okello<i className="cc">UG</i></span><span><span className="pill pill--ok">Approved</span></span><span className="tm-muted">MTN MoMo</span><span className="tm-amt">UGX 350,000</span></div></div><div className="tm-tr" style={{ animation: "tm-tma7 10s infinite both" }}><div className="tm-row" style={{ animation: "tm-tma6 10s infinite both" }}><span><span className="pill pill--bad">86</span></span><span className="tm-name">Peter Kamau<i className="cc">KE</i></span><span><span style={{ position: "relative", display: "inline-block", width: "96px", height: "20px" }}><span className="pill pill--ok pp-out" style={{ position: "absolute", left: "0", top: "0", animation: "tm-tma4 10s infinite both" }}>Approved</span><span className="pill pill--bad" style={{ position: "absolute", left: "0", top: "0", animation: "tm-tma5 10s infinite both" }}>In review</span></span></span><span className="tm-muted">M-Pesa deposit</span><span className="tm-amt">KES 99,000</span></div></div><div className="tm-tr" style={{ animation: "tm-tma8 10s infinite both" }}><div className="tm-row" style={{  }}><span><span className="pill pill--ok">15</span></span><span className="tm-name">Akosua Mensah<i className="cc">GH</i></span><span><span className="pill pill--ok">Approved</span></span><span className="tm-muted">Card payment</span><span className="tm-amt">GHS 640</span></div></div><div className="tm-tr" style={{ animation: "tm-tma9 10s infinite both" }}><div className="tm-row" style={{  }}><span><span className="pill pill--warn">34</span></span><span className="tm-name">Amina Salim<i className="cc">TZ</i></span><span><span className="pill pill--ok">Approved</span></span><span className="tm-muted">Bank transfer</span><span className="tm-amt">TZS 2,400,000</span></div></div></div><div className="pp-card" style={{ position: "absolute", left: "400px", top: "318px", width: "360px", padding: "20px", borderLeft: "4px solid #D64545", animation: "tm-tma11 10s infinite both" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "16px", fontWeight: "600" }}>Alert · Structuring</span><span className="pill pill--bad">High · 86</span></div><p style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: "1.45", color: "#3F4744" }}>Peter Kamau made 6 M-Pesa deposits just under KES 100,000 in 24 hours.</p><div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#3F4744" }}><span style={{ padding: "4px 10px", borderRadius: "6px", background: "#F1F5F3" }}>Rule: deposits below threshold</span><span style={{ marginLeft: "auto", padding: "7px 12px", borderRadius: "8px", background: "#0A0C0E", color: "#FFFFFF", fontWeight: "600", animation: "tm-tma12 10s infinite both" }}>Open case</span></div></div></div></div>
</div>

<div aria-label="Payment rails we monitor" role="group" style={{ marginTop: "72px", height: "56px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px", flexWrap: "wrap", fontWeight: "600", fontSize: "30px", letterSpacing: "-0.01em", color: "#8E959C" }}><span>M-Pesa</span><span>Airtel Money</span><span>MTN MoMo</span><span>PesaLink</span><span>RTGS</span><span>NIP</span><span>GhIPSS</span><span>Cards</span></div>

</section>

<section style={{ marginTop: "120px", background: "#0E1412", color: "#FFFFFF" }}><div className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "110px 56px", boxSizing: "border-box" }}><div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "32px", alignItems: "flex-end" }}><h2 style={{ margin: "0", fontWeight: "500", fontSize: "clamp(36px, 3.6vw, 56px)", lineHeight: "1.1", letterSpacing: "-0.02em", maxWidth: "640px" }}>Built for how Africa pays</h2><p style={{ margin: "0", maxWidth: "560px", fontSize: "20px", lineHeight: "28px", color: "#B9C6C0" }}>One set of rules across every channel your customers use, so money that moves between them is not lost from view.</p></div><div style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "12px" }}><div style={{ padding: "28px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.14)" }}><div style={{ fontSize: "28px", fontWeight: "500" }}>Mobile money</div><div style={{ marginTop: "10px", fontSize: "16px", lineHeight: "24px", color: "#B9C6C0" }}>M-Pesa, Airtel Money, MTN MoMo, Tigo Pesa</div></div><div style={{ padding: "28px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.14)" }}><div style={{ fontSize: "28px", fontWeight: "500" }}>Bank transfers</div><div style={{ marginTop: "10px", fontSize: "16px", lineHeight: "24px", color: "#B9C6C0" }}>PesaLink, RTGS, NIP, GhIPSS and SWIFT</div></div><div style={{ padding: "28px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.14)" }}><div style={{ fontSize: "28px", fontWeight: "500" }}>Cards</div><div style={{ marginTop: "10px", fontSize: "16px", lineHeight: "24px", color: "#B9C6C0" }}>Debit, credit and prepaid, online and in store</div></div><div style={{ padding: "28px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.14)" }}><div style={{ fontSize: "28px", fontWeight: "500" }}>Crypto and remittances</div><div style={{ marginTop: "10px", fontSize: "16px", lineHeight: "24px", color: "#B9C6C0" }}>Wallet screening and cross-border corridors</div></div></div></div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<h2 className="pp-h2" style={{ maxWidth: "900px", margin: "0 auto 64px" }}>Stay ahead of financial crime and the rules around it</h2>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px" }}>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg></div><h3 className="kb-h3">Meet your FIU’s expectations</h3><p className="kb-p">Flag and hold suspicious activity in real time, with a record of every decision for your regulator.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M7 12h10M10 18h4" /></svg></div><h3 className="kb-h3">Fewer false alarms</h3><p className="kb-p">Rules tuned to how money moves locally, so analysts spend their time on real risk.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8 7.5 10.5 16M16 7.5 13.5 16M8.5 6h7" /></svg></div><h3 className="kb-h3">See the whole network</h3><p className="kb-p">Linked accounts, devices and phone numbers in one view, so mule rings stand out.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg></div><h3 className="kb-h3">File reports faster</h3><p className="kb-p">Draft suspicious transaction reports straight from the case, ready for goAML where your FIU uses it.</p></div>
</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}><h2 className="pp-h2">Transaction monitoring features</h2><div className="pp-feat"><div className="pp-fvis"><div className="pp-card" style={{ width: "560px", maxWidth: "100%" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "18px", fontWeight: "600" }}>Rule library</span><span className="pill pill--info">Test mode</span></div><div className="tm-rule"><div><div style={{ fontSize: "15px", fontWeight: "500" }}>Deposits just under a threshold</div><div style={{ fontSize: "13px", color: "#5B6461", marginTop: "3px" }}>Several deposits below KES 100,000 in 24h</div></div><span className="pill pill--bad">High</span><span className="tm-tog"><i></i></span></div><div className="tm-rule"><div><div style={{ fontSize: "15px", fontWeight: "500" }}>Fast in, fast out</div><div style={{ fontSize: "13px", color: "#5B6461", marginTop: "3px" }}>Money leaves within an hour of arriving</div></div><span className="pill pill--warn">Medium</span><span className="tm-tog"><i></i></span></div><div className="tm-rule"><div><div style={{ fontSize: "15px", fontWeight: "500" }}>Dormant account wakes up</div><div style={{ fontSize: "13px", color: "#5B6461", marginTop: "3px" }}>No activity for 6 months, then large transfers</div></div><span className="pill pill--warn">Medium</span><span className="tm-tog"><i></i></span></div><div className="tm-rule"><div><div style={{ fontSize: "15px", fontWeight: "500" }}>High-risk corridor</div><div style={{ fontSize: "13px", color: "#5B6461", marginTop: "3px" }}>Transfers to or from listed jurisdictions</div></div><span className="pill pill--bad">High</span><span className="tm-tog"><i></i></span></div><div className="tm-rule"><div><div style={{ fontSize: "15px", fontWeight: "500" }}>Round amounts</div><div style={{ fontSize: "13px", color: "#5B6461", marginTop: "3px" }}>Repeated round-figure transfers</div></div><span className="pill pill--grey">Low</span><span className="tm-tog tm-tog--off"><i></i></span></div></div></div><div className="pp-ftxt"><h3 className="pp-fh">Rules for every payment scenario</h3><p className="pp-fp">Start with rule sets for mobile money, banking and cards, then shape them to your products.</p><div style={{ marginTop: "28px" }}>{acc.rules.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div><div className="pp-feat"><div className="pp-ftxt"><h3 className="pp-fh">Spot the patterns rules miss</h3><p className="pp-fp">Behaviour models learn what normal looks like for each customer and flag what does not fit.</p><div style={{ marginTop: "28px" }}>{acc.ai.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div><div className="pp-fvis"><div className="pp-card" style={{ width: "540px", maxWidth: "100%" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "18px", fontWeight: "600" }}>Unusual behaviour</span><span className="pill pill--bad">High</span></div><p style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: "1.45", color: "#3F4744" }}>This account received money from 14 new senders in two days, then sent it all to one wallet.</p><div style={{ marginTop: "14px", fontSize: "13px", color: "#4D5560" }}>Compared with this customer’s normal pattern<div className="bar"><b style={{ width: "88%", background: "#D64545" }}></b></div></div><div style={{ marginTop: "14px", fontSize: "13px", color: "#4D5560" }}>Compared with similar customers<div className="bar"><b style={{ width: "72%", background: "#D64545" }}></b></div></div><div style={{ marginTop: "14px", fontSize: "13px", color: "#4D5560" }}>New counterparties<div className="bar"><b style={{ width: "64%", background: "#E0A030" }}></b></div></div><div style={{ marginTop: "14px", fontSize: "13px", color: "#4D5560" }}>Device and SIM changes<div className="bar"><b style={{ width: "18%", background: "#1DB980" }}></b></div></div><div style={{ marginTop: "18px", display: "flex", gap: "10px", alignItems: "center", padding: "12px", borderRadius: "10px", background: "#F2F6F4", fontSize: "13px" }}><span className="cc">LINKED</span>3 accounts share this phone number</div></div></div></div><div className="pp-feat"><div className="pp-fvis"><div className="pp-card" style={{ width: "560px", maxWidth: "100%" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "18px", fontWeight: "600" }}>Case #2041 · Peter Kamau</span><span className="pill pill--warn">Open</span></div><div style={{ marginTop: "14px", display: "grid", gap: "8px", fontSize: "14px" }}><div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ width: "18px", height: "18px", borderRadius: "4px", flex: "none", background: "#0B5D45" }}></span><span style={{ color: "#5B6461", textDecoration: "line-through" }}>Check customer KYC and source of funds</span></div><div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ width: "18px", height: "18px", borderRadius: "4px", flex: "none", background: "#0B5D45" }}></span><span style={{ color: "#5B6461", textDecoration: "line-through" }}>Review linked accounts</span></div><div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ width: "18px", height: "18px", borderRadius: "4px", flex: "none", border: "1.5px solid #C3CBC7", boxSizing: "border-box" }}></span><span style={{  }}>Request statement from customer</span></div><div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ width: "18px", height: "18px", borderRadius: "4px", flex: "none", border: "1.5px solid #C3CBC7", boxSizing: "border-box" }}></span><span style={{  }}>Decide and record the reason</span></div></div><div style={{ marginTop: "16px", padding: "12px", borderRadius: "10px", border: "1px solid #E1E6E3", fontSize: "13px", color: "#3F4744" }}><b style={{ fontWeight: "600" }}>Wanjiru (analyst)</b> · Deposits match a known structuring pattern. Escalating to MLRO.</div><div style={{ marginTop: "14px", display: "flex", gap: "8px", fontSize: "14px", fontWeight: "600" }}><span style={{ padding: "9px 14px", borderRadius: "8px", border: "1px solid #E1E6E3" }}>Close as no risk</span><span style={{ padding: "9px 14px", borderRadius: "8px", background: "#0B5D45", color: "#FFFFFF" }}>Draft STR</span></div></div></div><div className="pp-ftxt"><h3 className="pp-fh">Investigate, decide and report in one place</h3><p className="pp-fp">Every alert opens a case with the customer, transactions and evidence together.</p><div style={{ marginTop: "28px" }}>{acc.case.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div></section>

<section aria-labelledby="calc-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<h2 id="calc-title" className="pp-h2">Estimate your review workload</h2>
<p className="pp-sub">Pick numbers close to yours. The results are simple arithmetic on your inputs, not a promise.</p>
<div style={{ marginTop: "56px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
<div style={{ flex: "1 1 640px", minWidth: "min(100%, 340px)", padding: "36px", borderRadius: "24px", background: "#F2F6F4", boxSizing: "border-box", display: "grid", gap: "30px" }}>
<div><div className="tm-q">Transactions per month</div><div className="tm-chips">{txChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" aria-pressed={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div></div>
<div><div className="tm-q">Share of transactions that raise an alert</div><div className="tm-chips">{rateChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" aria-pressed={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div></div>
<div><div className="tm-q">Minutes to review one alert</div><div className="tm-chips">{minChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" aria-pressed={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div></div>
<div><div className="tm-q">False alarms you expect to remove</div><div className="tm-chips">{redChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" aria-pressed={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div></div>
</div>
<div style={{ flex: "1 1 420px", minWidth: "min(100%, 320px)", padding: "36px", borderRadius: "24px", background: "#0B5D45", color: "#FFFFFF", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "12px" }}>
<div style={{ fontSize: "28px", fontWeight: "500", marginBottom: "8px" }}>Your estimate</div>
<div className="tm-res"><span>Alerts per month</span><b>{calc.alerts}</b></div>
<div className="tm-res"><span>Analyst hours per month</span><b>{calc.hours}</b></div>
<div className="tm-res"><span>Full-time analysts needed</span><b>{calc.fte}</b></div>
<div className="tm-res" style={{ background: "#FFFFFF", color: "#0A0C0E" }}><span>Hours saved per month</span><b>{calc.saved}</b></div>
<div style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.45", color: "#CFE6DB" }}>Assumes 140 working hours per analyst per month.</div>
</div>
</div>
</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<div style={{ borderRadius: "24px", background: "#0A0D0C", color: "#FFFFFF", display: "flex", flexWrap: "wrap", gap: "48px", padding: "clamp(40px, 4vw, 64px)", boxSizing: "border-box", overflow: "hidden" }}>
<div style={{ flex: "1 1 520px", minWidth: "min(100%, 320px)", display: "flex", flexDirection: "column" }}>
<h2 style={{ margin: "0", maxWidth: "720px", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.1", letterSpacing: "-0.02em" }}>Report to the right FIU, in the right format</h2>
<p style={{ margin: "20px 0 0", maxWidth: "600px", fontSize: "20px", lineHeight: "28px", color: "#B9C6C0" }}>Suspicious transaction reports are drafted from the case, with the evidence attached, for the financial intelligence unit you answer to.</p>
<span style={{ flex: "1", minHeight: "120px" }}></span>
<a href="#" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 28px", borderRadius: "8px", fontSize: "18px", fontWeight: "500", background: "#1DB980", color: "#0A0C0E" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div>
<div style={{ flex: "1 1 640px", minWidth: "min(100%, 320px)", position: "relative", height: "560px" }}>
<div className="reg" style={{ "--d": "0s" }}><span className="reg__flag">KE</span><div><div className="reg__t">Financial Reporting Centre</div><div className="reg__s">Kenya · suspicious transaction and cash transaction reports</div></div></div>
<div className="reg" style={{ "--d": "-4s" }}><span className="reg__flag">NG</span><div><div className="reg__t">Nigerian Financial Intelligence Unit</div><div className="reg__s">Nigeria · STRs and currency transaction reports</div></div></div>
<div className="reg" style={{ "--d": "-8s" }}><span className="reg__flag">GH</span><div><div className="reg__t">Financial Intelligence Centre</div><div className="reg__s">Ghana · suspicious and cash transaction reports</div></div></div>
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
<h2 style={{ margin: "0", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em", color: "#FFFFFF" }}>Test your rules in the sandbox</h2>
<p style={{ margin: "18px 0 0", fontSize: "20px", lineHeight: "28px", color: "#CFE6DB" }}>Run sample transactions through your rules and see which alerts they raise, before going live.</p>
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
