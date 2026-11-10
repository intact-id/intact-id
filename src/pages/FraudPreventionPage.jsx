import { Fragment, useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './fraud.css';

const ACC = {
dev: [['Device intelligence','Recognise the same phone or computer across accounts, and spot emulators and tampered devices.'],['SIM and phone checks','See recent SIM swaps and how long a number has been in use, a strong signal in mobile money markets.'],['Network signals','Flag VPNs, proxies and locations that do not match the customer.']],
rules: [['Risk-based actions','Block, review, or ask for a fresh selfie depending on the risk score.'],['Test before going live','Try new rules against past traffic to see what they would catch.'],['Explainable decisions','Every block or review shows the signals behind it.']]
};
const INDUSTRIES = [
['Banks', 'Protect accounts from sign-up to transfers', 'Banks face stolen identities at onboarding and SIM swap takeovers after.', ['Stolen and borrowed identities', 'SIM swap account takeover', 'Mule accounts', 'Authorised push payment scams']],
['Mobile money', 'Keep wallets and agents safe', 'Mobile money moves fast, so fraud has to be stopped in real time.', ['SIM swap takeover', 'Agent fraud', 'Promo and bonus abuse', 'Mule wallets']],
['Lending', 'Lend to real people who will repay', 'Digital lenders are targeted by fake and borrowed identities taking loans with no intent to repay.', ['Synthetic identities', 'Borrowed IDs', 'Loan stacking across apps', 'Device farms']],
['Crypto', 'Stop bad actors at the door', 'Exchanges must keep out fraudsters and money launderers while onboarding fast.', ['Fake accounts for laundering', 'Deepfake selfies', 'Account takeover', 'Mule accounts']],
['Marketplaces', 'Trust buyers and sellers', 'Marketplaces need to know sellers are real and payouts go to the right people.', ['Fake seller accounts', 'Payout fraud', 'Promo abuse', 'Stolen card use']],
['Betting and gaming', 'Fair play, verified players', 'Operators face bonus abuse, multiple accounts and under-age play.', ['Multi-accounting', 'Bonus abuse', 'Under-age players', 'Payment fraud']]
];
const FAQS = [
['What is fraud prevention?','It is stopping people from opening fake accounts, taking over real ones or moving stolen money, using identity, device and behaviour signals.'],
['How is this different from KYC?','KYC checks who a person is. Fraud prevention looks at how they behave and what they use, such as devices and SIM cards, to catch fraud that a clean ID would miss.'],
['Can you detect SIM swaps?','Where mobile operator data is available, we can see recent SIM changes and use them to step up checks before risky actions.'],
['Does it work after onboarding?','Yes. Risk is re-checked at login, profile changes and payments.'],
['Will it slow down good customers?','Most checks run in the background. Only risky sessions are asked for more, such as a fresh selfie.'],
['Can we set our own rules?','Yes. You decide which signals block, which send for review and which step up verification.'],
['How does it connect to transaction monitoring?','Fraud signals feed into transaction monitoring and risk scores, so one view covers both fraud and money laundering.'],
['Can we try it first?','Yes. The sandbox lets you send test sign-ups and payments and see the decisions.']
];

export default function FraudPreventionPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  useEffect(() => {
    document.title = "Intact ID \u2014 Fraud prevention for Africa";
  }, []);

const accVals = {};
Object.keys(ACC).forEach(k => { accVals[k] = ACC[k].map((x, i) => { const o = (S.acc || {})[k] === i || ((S.acc || {})[k] === undefined && i === 0); return { q: x[0], a: x[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ acc: Object.assign({}, S.acc, { [k]: o ? -1 : i }) }) }; }); });
const faqVals = FAQS.map((f, i) => { const o = (S.faq === undefined ? 0 : S.faq) === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ faq: o ? -1 : i }) }; });

const chipsOf = (list, key, def) => list.map((c, i) => { const on = (S[key] === undefined ? def : S[key]) === i; return { label: c, cls: 'chip' + (on ? ' is-on' : ''), selected: on ? 'true' : 'false', pick: () => set({ [key]: i }) }; });
const ii = S.ind === undefined ? 0 : S.ind;
const page = { indChips: chipsOf(INDUSTRIES.map(x => x[0]), 'ind', 0), ind: { title: INDUSTRIES[ii][1], text: INDUSTRIES[ii][2], threats: INDUSTRIES[ii][3].map(n => ({ name: n })) } };

  const acc = accVals;
  const faqs = faqVals;
  const { indChips, ind } = page;

  return (
    <div className="pg-kyc pg-kyb pg-fraud" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
{/* hero */}
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0 56px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 704px", minWidth: "min(100%, 420px)" }}>
<div style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "40px", padding: "8px 16px", boxSizing: "border-box", borderRadius: "24px", background: "#DCEFE5", color: "#16181D", fontSize: "16px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="M12 8v5M12 16v.5" /></svg>Fraud prevention</div>
<h1 style={{ margin: "12px 0 0", fontWeight: "500", fontSize: "clamp(38px, 4.2vw, 56px)", lineHeight: "1.1", color: "#16181D" }}>Stop fraud before it costs you</h1>
<p style={{ margin: "16px 0 0", fontSize: "20px", lineHeight: "28px", color: "#16181D" }}>Spot fake sign-ups, stolen identities, account takeovers and mule accounts using device, SIM, behaviour and identity signals, from onboarding to every payment.</p>
<div style={{ display: "flex", gap: "8px", marginTop: "32px", flexWrap: "wrap", fontSize: "18px", fontWeight: "500", lineHeight: "25.2px" }}>
<a className="btn-primary" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "8px" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
<a className="btn-ghost" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", border: "1.25px solid #DEE2E6", display: "inline-flex", alignItems: "center", gap: "8px" }}>See how it works <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div>
</div>
<div role="img" aria-label="Animated illustration: a new sign-up is linked to a device shared by other accounts; risk signals add up and the sign-up is blocked as likely account farming." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pp-stage" style={{ position: "relative", width: "760px", height: "520px", flex: "none" }}><div className="pp-card" style={{ position: "absolute", left: "0", top: "20px", width: "330px", padding: "20px", animation: "fraud-frd6 10s infinite both" }}><div style={{ fontSize: "16px", fontWeight: "600" }}>Device network</div><div style={{ fontSize: "12px", color: "#5B6461", marginTop: "2px" }}>1 device · 5 accounts</div><div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}><svg aria-hidden="true" width="300" height="220" viewBox="0 0 300 220" fill="none"><g stroke="#C3CBC7" strokeWidth="2" strokeDasharray="4 4"><path d="M150 110 60 40M150 110 250 40M150 110 50 180M150 110 250 180" /></g><circle cx="150" cy="110" r="26" fill="#0A0C0E" /><rect x="139" y="98" width="22" height="24" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="2" /><circle cx="60" cy="40" r="20" fill="#FBE3E3" stroke="#D64545" strokeWidth="2" /><circle cx="250" cy="40" r="20" fill="#FBE3E3" stroke="#D64545" strokeWidth="2" /><circle cx="50" cy="180" r="20" fill="#FBE3E3" stroke="#D64545" strokeWidth="2" /><circle cx="250" cy="180" r="20" fill="#E3F6EC" stroke="#1DB980" strokeWidth="2" /></svg></div></div><div className="pp-card" style={{ position: "absolute", left: "350px", top: "70px", width: "410px", padding: "20px", animation: "fraud-frd7 10s infinite both" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "16px", fontWeight: "600" }}>New sign-up · Kevin Otieno</span><span className="pill pill--info">Checking</span></div><div style={{ marginTop: "10px" }}><div className="row" style={{ animation: "fraud-frd1 10s infinite both" }}><span className="pill pill--bad" style={{ minWidth: "32px", textAlign: "center" }}>+30</span><span style={{ flex: "1" }}>Same device used by 4 other accounts</span></div><div className="row" style={{ animation: "fraud-frd2 10s infinite both" }}><span className="pill pill--bad" style={{ minWidth: "32px", textAlign: "center" }}>+25</span><span style={{ flex: "1" }}>SIM card swapped 2 days ago</span></div><div className="row" style={{ animation: "fraud-frd3 10s infinite both" }}><span className="pill pill--warn" style={{ minWidth: "32px", textAlign: "center" }}>+10</span><span style={{ flex: "1" }}>Email address created today</span></div><div className="row" style={{ animation: "fraud-frd4 10s infinite both" }}><span className="pill pill--warn" style={{ minWidth: "32px", textAlign: "center" }}>+12</span><span style={{ flex: "1" }}>Location does not match ID country</span></div><div className="row" style={{ animation: "fraud-frd5 10s infinite both" }}><span className="pill pill--ok" style={{ minWidth: "32px", textAlign: "center" }}>0</span><span style={{ flex: "1" }}>ID document passed checks</span></div></div><div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: "10px", background: "#FBE3E3", color: "#8C2626", fontWeight: "600", fontSize: "14px", animation: "fraud-frd8 10s infinite both" }}><span>Blocked: likely account farming</span><span>Risk 77</span></div></div></div></div>
</div>

<div aria-label="Signals we use" role="group" style={{ marginTop: "72px", height: "56px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px", flexWrap: "wrap", fontWeight: "600", fontSize: "30px", letterSpacing: "-0.01em", color: "#8E959C" }}><span>Device</span><span>SIM swap</span><span>Phone</span><span>Email</span><span>Location</span><span>Behaviour</span><span>Network</span></div>

</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<h2 className="pp-h2" style={{ maxWidth: "900px", margin: "0 auto 64px" }}>Protection across the whole customer journey</h2>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px" }}>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="8" r="3.5" /><path d="M3.5 20c1-3.5 3.5-5.5 6.5-5.5" /><path d="M16 14v6M13 17h6" /></svg></div><h3 className="kb-h3">New account fraud</h3><p className="kb-p">Block fake and duplicate sign-ups, bonus abuse and account farming at the door.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M14 10h4M14 14h3M6 16c.6-1.2 1.7-2 3-2s2.4.8 3 2" /></svg></div><h3 className="kb-h3">Identity fraud</h3><p className="kb-p">Catch stolen, forged and synthetic identities, and one face used across many accounts.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg></div><h3 className="kb-h3">Account takeover</h3><p className="kb-p">Spot logins and changes after a SIM swap, new device or unusual location.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h4" /></svg></div><h3 className="kb-h3">Payment fraud</h3><p className="kb-p">Hold risky payments and payouts before money leaves, with reasons your team can see.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8 7.5 10.5 16M16 7.5 13.5 16M8.5 6h7" /></svg></div><h3 className="kb-h3">Money muling</h3><p className="kb-p">Find accounts that receive from many senders and pass money straight on.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 7v5l3 2" /></svg></div><h3 className="kb-h3">Ongoing protection</h3><p className="kb-p">Risk is re-checked at login, profile changes and payments, not only at sign-up.</p></div>
</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}><h2 className="pp-h2">Fraud prevention features</h2><div className="pp-feat"><div className="pp-fvis"><div className="pp-card" style={{ width: "540px", maxWidth: "100%" }}><div style={{ fontSize: "18px", fontWeight: "600" }}>Device and SIM</div><div className="row"><span style={{ flex: "1" }}>Device fingerprint</span><span className="pill pill--bad">Seen on 4 accounts</span></div><div className="row"><span style={{ flex: "1" }}>Emulator or rooted phone</span><span className="pill pill--ok">No</span></div><div className="row"><span style={{ flex: "1" }}>SIM swap</span><span className="pill pill--bad">2 days ago</span></div><div className="row"><span style={{ flex: "1" }}>Phone number age</span><span className="pill pill--ok">3 years</span></div><div className="row"><span style={{ flex: "1" }}>VPN or proxy</span><span className="pill pill--warn">Yes</span></div></div></div><div className="pp-ftxt"><h3 className="pp-fh">Signals fraudsters cannot fake</h3><p className="pp-fp">Device, SIM and network signals show who is really behind an account, even when the identity looks clean.</p><div style={{ marginTop: "28px" }}>{acc.dev.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div><div className="pp-feat"><div className="pp-ftxt"><h3 className="pp-fh">Your rules, applied instantly</h3><p className="pp-fp">Decide what to block, what to send for review and when to ask for a fresh selfie, and change it any time.</p><div style={{ marginTop: "28px" }}>{acc.rules.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div><div className="pp-fvis"><div className="pp-card" style={{ width: "560px", maxWidth: "100%" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "18px", fontWeight: "600" }}>Fraud rules</span><span className="pill pill--info">Live</span></div><div className="row"><span style={{ flex: "1" }}>Block if device has 3+ accounts</span><span className="pill pill--bad">Block</span><span className="tog"><i></i></span></div><div className="row"><span style={{ flex: "1" }}>Step up if SIM swapped in last 7 days</span><span className="pill pill--warn">Selfie</span><span className="tog"><i></i></span></div><div className="row"><span style={{ flex: "1" }}>Review payouts to new wallets over KES 50k</span><span className="pill pill--warn">Review</span><span className="tog"><i></i></span></div><div className="row"><span style={{ flex: "1" }}>Block disposable email addresses</span><span className="pill pill--bad">Block</span><span className="tog tog--off"><i></i></span></div></div></div></div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<h2 className="pp-h2">Built for your industry</h2>
<p className="pp-sub">Each industry faces its own kinds of fraud. Pick yours.</p>
<div style={{ marginTop: "48px", padding: "36px", borderRadius: "24px", background: "#F2F6F4" }}>
<div className="tm-chips" role="tablist" style={{ margin: "0" }}>{indChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" role="tab" aria-selected={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div>
<div style={{ marginTop: "28px", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "stretch" }}>
<div style={{ flex: "1 1 420px", minWidth: "min(100%, 300px)" }}><div style={{ fontSize: "32px", fontWeight: "500", lineHeight: "1.15" }}>{ind.title}</div><p style={{ margin: "14px 0 0", fontSize: "19px", lineHeight: "28px", color: "#3F4744" }}>{ind.text}</p></div>
<div style={{ flex: "1 1 520px", minWidth: "min(100%, 300px)", background: "#FFFFFF", borderRadius: "16px", padding: "24px", boxSizing: "border-box" }}><div style={{ fontSize: "14px", fontWeight: "600", color: "#5B6461", letterSpacing: "0.04em" }}>COMMON THREATS</div>
{ind.threats.map((t, ti) => (<Fragment key={ti}><div className="row" style={{ fontSize: "16px" }}><span className="pill pill--bad">Threat</span><span style={{ flex: "1" }}>{t.name}</span></div></Fragment>))}</div>
</div>
</div>
</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<div style={{ borderRadius: "24px", background: "#0A0D0C", color: "#FFFFFF", display: "flex", flexWrap: "wrap", gap: "48px", padding: "clamp(40px, 4vw, 64px)", boxSizing: "border-box" }}>
<div style={{ flex: "1 1 520px", minWidth: "min(100%, 320px)", display: "flex", flexDirection: "column" }}>
<h2 style={{ margin: "0", maxWidth: "720px", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.1", letterSpacing: "-0.02em" }}>Fraud patterns we see in African markets</h2>
<p style={{ margin: "20px 0 0", maxWidth: "600px", fontSize: "20px", lineHeight: "28px", color: "#B9C6C0" }}>Local fraud looks different. Our signals are tuned for how it happens here.</p>
<span style={{ flex: "1", minHeight: "80px" }}></span>
<a href="#" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 28px", borderRadius: "8px", fontSize: "18px", fontWeight: "500", background: "#1DB980", color: "#0A0C0E" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div>
<div style={{ flex: "1 1 640px", minWidth: "min(100%, 320px)", display: "grid", gap: "12px", alignContent: "center" }}><div className="case"><b>SIM swap takeovers</b><span>A new SIM, then a password reset and a quick transfer</span></div><div className="case"><b>Agent and promo abuse</b><span>Many accounts opened on one phone to farm bonuses</span></div><div className="case"><b>Borrowed identities</b><span>Real IDs of relatives or strangers used without consent</span></div><div className="case"><b>Mule networks</b><span>Accounts that receive from many and send to one</span></div></div>
</div>
</section>

{/* FAQ */}
<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}><h2 id="faq-title" className="pp-h2">Frequently asked questions</h2><div style={{ maxWidth: "900px", margin: "56px auto 0" }}>{faqs.map((f, fi) => (<Fragment key={fi}><div style={{ borderBottom: "1px solid #E1E6E3" }}><button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{f.open && (<><p style={{ margin: "0", padding: "0 48px 32px 0", fontSize: "19px", lineHeight: "29px", color: "#3F4744" }}>{f.a}</p></>)}</div></Fragment>))}</div></section>

{/* final call to action */}
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px", boxSizing: "border-box" }}>
<div style={{ position: "relative", overflow: "hidden", borderRadius: "24px", padding: "clamp(48px, 6vw, 96px)", backgroundImage: "linear-gradient(135deg, #0E6B4F 0%, #07432F 60%, #031F16 100%)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "40px" }}>
<img src="/site-assets/africa-dots.svg" alt="" style={{ position: "absolute", right: "-40px", top: "-60px", width: "460px", opacity: "0.18" }} />
<div style={{ position: "relative", maxWidth: "820px" }}>
<h2 style={{ margin: "0", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em", color: "#FFFFFF" }}>Try fraud signals in the sandbox</h2>
<p style={{ margin: "18px 0 0", fontSize: "20px", lineHeight: "28px", color: "#CFE6DB" }}>Send test sign-ups and payments and see which ones would be blocked, and why.</p>
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
