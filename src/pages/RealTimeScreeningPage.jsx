import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './rts.css';

const ACC = {
party: [['Both names, every time','Sender and receiver are screened on every payment, including people who are not your customers.'],['Sanctions always win','A confirmed sanctions match blocks the payment. No rule or score can override it.'],['Lists kept current','Customers are also rescreened whenever the lists change.']],
safe: [['Review, not a guess','If the model or another check is unavailable, the payment goes to a person.'],['The gap is recorded','The decision record shows exactly which check did not run.'],['One payment, one decision','If your system sends the same payment twice, it gets the same decision, never two.']]
};
const STEPS = [
{ short: 'Arrives', title: 'The payment arrives', text: 'Your system sends the payment by API. More detail means a better decision; missing details count as less trustworthy.', card: 'USD 9,800 · bank transfer', badge: 'Received', tone: 'info',
  rows: [['Sender', 'Savanna Logistics Ltd · business customer', 'Known', 'ok'], ['Receiver', 'Al-Noor Trading FZE · outside bank', 'New payee', 'warn'], ['Purpose', 'Not provided', 'Missing', 'warn']] },
{ short: 'Parties', title: 'Party screening', text: 'Both names are checked against sanctions and PEP lists. Here the receiver is a confirmed sanctions match, so the payment will be blocked whatever else is true. We follow the rest of the checks to show what each one does.', card: 'Party screening', badge: 'Match', tone: 'bad',
  rows: [['Sender', 'Sanctions and PEP', 'No match', 'ok'], ['Receiver', 'Sanctions list, strength 1.0', 'Confirmed', 'bad']] },
{ short: 'Hard rules', title: 'Hard rules', text: 'Rules that need only the payment itself, such as amount limits and prohibited countries, are checked next. A hit decides at once.', card: 'Hard rules', badge: '1 hit', tone: 'warn',
  rows: [['Business single payment limit', 'USD 25,000', 'Not hit', 'ok'], ['High-risk destination', 'Listed by your country risk list', 'Hit', 'warn']] },
{ short: 'Context', title: 'Building context', text: 'Everything known about the customer is pulled together: history, the receiver, the network, device and location, and their risk profile.', card: 'Context', badge: 'Gathered', tone: 'info',
  rows: [['History', 'Usually pays local suppliers in KES', 'Unusual', 'warn'], ['Receiver', 'Never paid before', 'First time', 'warn'], ['Device', 'Usual office computer', 'Trusted', 'ok'], ['Profile', 'Medium risk · account 2 years', 'Known', 'grey']] },
{ short: 'Context rules', title: 'Rules that need context', text: 'Rules that combine the payment with what we know are checked, such as a new payee plus a large amount plus an unusual country.', card: 'Context rules', badge: '1 hit', tone: 'warn',
  rows: [['New payee, large amount, high-risk country', 'All three true', 'Hit', 'warn'], ['Velocity spike', '1 payment today', 'Not hit', 'ok']] },
{ short: 'Score', title: 'The model scores it', text: 'The detection model gives a score from 0 to 100 with the reasons behind it.', card: 'Risk score 93', badge: 'High', tone: 'bad',
  rows: [['Reason', 'First foreign payment from this business', 'Strong', 'bad'], ['Reason', '6 times its usual payment size', 'Strong', 'bad'], ['Reason', 'Receiver in a high-risk jurisdiction', 'Medium', 'warn']] },
{ short: 'Decision', title: 'The decision', text: 'The score is compared with this segment’s bands, and rules can only make the decision stricter. The sanctions match makes it Block.', card: 'Decision: Block', badge: 'Block', tone: 'bad',
  rows: [['Segment', 'Business · Review from 55 · Block from 85', 'Applied', 'grey'], ['Deciding factor', 'Confirmed sanctions match on receiver', 'Block', 'bad']] },
{ short: 'Record', title: 'Everything is recorded', text: 'The decision is saved with everything that led to it, so it can be explained to your analyst, your customer or your regulator.', card: 'Decision record', badge: 'Saved', tone: 'ok',
  rows: [['Score and reasons', '93 · three reasons', 'Saved', 'ok'], ['Rules and screening', '2 rules hit · 1 sanctions match', 'Saved', 'ok'], ['Thresholds and model', 'Bands and version in force', 'Saved', 'ok'], ['Customer context', 'As it was at that moment', 'Saved', 'ok']] },
{ short: 'Follow-on', title: 'What happens next', text: 'A Block raises an alert and drafts an investigation summary. A Review would have held the payment for an analyst. An Allow would still count towards the checks that look back over time.', card: 'Alert raised', badge: 'Top priority', tone: 'bad',
  rows: [['Alert', 'Sanctions match on a payment receiver', 'New', 'bad'], ['Summary', 'Drafted for the investigator', 'Ready', 'ok'], ['Your system', 'Told by webhook', 'Sent', 'ok']] }
];
const SEG = [
{ label: 'Retail', title: 'Retail customers', text: 'Everyday people using wallets, accounts and cards.', allowW: 60, reviewW: 30, blockW: 10, rows: [['Allow', 'Score 0 to 59'], ['Review', 'Score 60 to 89'], ['Block', 'Score 90 and above'], ['Hard limit', 'KES 150,000 per payment']] },
{ label: 'Business', title: 'Business customers', text: 'Companies paying suppliers, staff and partners.', allowW: 55, reviewW: 30, blockW: 15, rows: [['Allow', 'Score 0 to 54'], ['Review', 'Score 55 to 84'], ['Block', 'Score 85 and above'], ['Hard limit', 'USD 25,000 per payment']] },
{ label: 'High risk', title: 'High-risk customers', text: 'Customers your risk assessment has rated high.', allowW: 40, reviewW: 40, blockW: 20, rows: [['Allow', 'Score 0 to 39'], ['Review', 'Score 40 to 79'], ['Block', 'Score 80 and above'], ['Hard limit', 'KES 50,000 per payment']] },
{ label: 'New accounts', title: 'Accounts under 30 days old', text: 'New customers, before they have a history.', allowW: 50, reviewW: 35, blockW: 15, rows: [['Allow', 'Score 0 to 49'], ['Review', 'Score 50 to 84'], ['Block', 'Score 85 and above'], ['Hard limit', 'KES 70,000 per payment']] }
];
const FAQS = [
['How fast is a decision?','Milliseconds, so screening can sit inside your payment flow without customers noticing.'],
['What does our system get back?','The decision (Allow, Review or Block), the score and the reasons, plus a webhook later when an analyst releases or rejects a held payment.'],
['Are payments coming in screened too?','Yes. Incoming payments are screened and count towards each customer’s history and the checks that look back over time.'],
['Can our rules overrule the model?','Rules can make a decision stricter. Nothing can let a confirmed sanctions match through.'],
['What if a check is down?','The payment goes to Review so a person decides, and the record shows which check did not run.'],
['What if we send the same payment twice?','It gets the same decision. A retried payment is never decided twice.'],
['Can we set different limits for different customers?','Yes. Each segment, such as retail, business, high risk or new accounts, can have its own score bands and limits.'],
['Can we test before going live?','Yes. Send test payments to the sandbox and see the decision and reasons for each.']
];

export default function RealTimeScreeningPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  const loc = useLocation();
  useEffect(() => {
    document.title = "Intact ID \u2014 Real-time transaction screening";
  }, []);
  useEffect(() => {
    if (!loc.hash) return;
    const t = setTimeout(() => { const el = document.getElementById(loc.hash.slice(1)); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    return () => clearTimeout(t);
  }, [loc.hash]);

const accVals = {};
Object.keys(ACC).forEach(k => { accVals[k] = ACC[k].map((x, i) => { const o = (S.acc || {})[k] === i || ((S.acc || {})[k] === undefined && i === 0); return { q: x[0], a: x[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ acc: Object.assign({}, S.acc, { [k]: o ? -1 : i }) }) }; }); });
const faqVals = FAQS.map((f, i) => { const o = (S.faq === undefined ? 0 : S.faq) === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ faq: o ? -1 : i }) }; });

const si = S.step === undefined ? 0 : S.step;
const st = STEPS[si];
const stepVals = {
steps: STEPS.map((s, i) => ({ n: String(i + 1), short: s.short, cls: 'stp__tab' + (i === si ? ' is-on' : '') + (i < si ? ' is-done' : ''), selected: i === si ? 'true' : 'false', pick: () => set({ step: i }) })),
step: { n: String(si + 1), total: String(STEPS.length), title: st.title, text: st.text, card: st.card, badge: st.badge, badgeCls: 'pill pill--' + st.tone,
  rows: st.rows.map(r => ({ a: r[0], b: r[1], c: r[2], cls: 'pill pill--' + r[3] })),
  prev: () => set({ step: Math.max(0, si - 1) }), next: () => set({ step: si === STEPS.length - 1 ? 0 : si + 1 }), nextLabel: si === STEPS.length - 1 ? 'Start again' : 'Next step' }
};
const chooserVals = (key, list) => { const i = S[key] === undefined ? 0 : S[key]; const x = list[i];
  return { [key + 'Chips']: list.map((t, j) => ({ label: t.label, cls: 'chip' + (i === j ? ' is-on' : ''), selected: i === j ? 'true' : 'false', pick: () => set({ [key]: j }) })),
           [key]: { title: x.title, text: x.text, tag: x.tag || '', rows: x.rows.map(r => ({ a: r[0], b: r[1] })) } }; };
const segv = chooserVals('seg', SEG); const sx = SEG[S.seg === undefined ? 0 : S.seg];
segv.seg.allowW = String(sx.allowW); segv.seg.reviewW = String(sx.reviewW); segv.seg.blockW = String(sx.blockW);
const page = Object.assign({}, stepVals, segv);

  const acc = accVals;
  const faqs = faqVals;
  const { steps, step, segChips, seg } = page;

  return (
    <div className="pg-kyc pg-kyb pg-rts" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0px 56px 0px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 660px", minWidth: "min(100%, 420px)" }}>
<div className="eyepill"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>Real-time transaction screening</div>
<h1 className="h1">A decision on every payment, before the money moves.</h1>
<p className="lead">Each payment is screened, checked against your rules and scored in milliseconds, then allowed, held for a person or blocked, with the reasons written down.</p>
<div className="ctas"><a className="btn-primary" href="#">Book a demo <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn-ghost" href="#">Try the sandbox</a></div>
</div>
<div role="img" aria-label="Animated illustration: three payments arrive one after another. A normal payment is allowed, an unusual one is held for review, and one to a sanctioned receiver is blocked, each with its reason." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pp-stage" style={{ position: "relative", width: "760px", height: "520px", flex: "none" }}><div style={{ position: "absolute", left: "80px", right: "80px", top: "20px", bottom: "0" }}><div className="pq" style={{ top: "0px", animation: "rts-rts1 10s infinite both" }}><div className="pq__h"><div><b>Grace Achieng</b><span>KES 4,500 · M-Pesa to a regular payee</span></div><span style={{ position: "relative", display: "inline-block", width: "84px", height: "26px" }}><span className="pp-out pq__chk" style={{ animation: "rts-rts2 10s infinite both" }}><svg className="spin" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>Checking</span><span className="dec dec--ok" style={{ animation: "rts-rts3 10s infinite both" }}>Allow</span></span></div><div className="pq__why" style={{ animation: "rts-rts4 10s infinite both" }}>Normal amount, known receiver, trusted phone</div></div><div className="pq" style={{ top: "162px", animation: "rts-rts5 10s infinite both" }}><div className="pq__h"><div><b>Peter Kamau</b><span>KES 99,000 · M-Pesa to a new number</span></div><span style={{ position: "relative", display: "inline-block", width: "84px", height: "26px" }}><span className="pp-out pq__chk" style={{ animation: "rts-rts6 10s infinite both" }}><svg className="spin" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>Checking</span><span className="dec dec--warn" style={{ animation: "rts-rts7 10s infinite both" }}>Review</span></span></div><div className="pq__why" style={{ animation: "rts-rts8 10s infinite both" }}>12× usual amount · receiver linked to mule accounts</div></div><div className="pq" style={{ top: "324px", animation: "rts-rts9 10s infinite both" }}><div className="pq__h"><div><b>Hassan Ali</b><span>USD 9,800 · bank transfer abroad</span></div><span style={{ position: "relative", display: "inline-block", width: "84px", height: "26px" }}><span className="pp-out pq__chk" style={{ animation: "rts-rts10 10s infinite both" }}><svg className="spin" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>Checking</span><span className="dec dec--bad" style={{ animation: "rts-rts11 10s infinite both" }}>Block</span></span></div><div className="pq__why" style={{ animation: "rts-rts12 10s infinite both" }}>Receiver is a confirmed sanctions match</div></div></div></div></div>
</div>
<div className="rails"><span className="rails__label">Works on</span><span>Mobile money</span><span>Bank transfers</span><span>Cards</span><span>Agent cash-in</span><span>Agent cash-out</span></div>
</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Three possible answers. Always with a reason.</h2><div className="vgrid"><div className="vc"><div className="vc__h"><span className="vc__i"><span className="dec dec--ok" style={{ fontSize: "13px" }}>Allow</span></span><h3>The money moves</h3></div><p>Nothing unusual. The payment still counts towards the customer’s history and the checks that look back over time.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><span className="dec dec--warn" style={{ fontSize: "13px" }}>Review</span></span><h3>A person decides</h3></div><p>The payment is held and an analyst is alerted to release or reject it within a set time.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><span className="dec dec--bad" style={{ fontSize: "13px" }}>Block</span></span><h3>The money stays put</h3></div><p>The payment is stopped, an alert is raised and an investigation summary is drafted.</p></div></div></section>

<section id="checks" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">The nine checks behind every decision</h2><p className="sub2">Follow a USD 9,800 transfer from a business account to a receiver abroad.</p>
<div className="stp">
<div className="stp__tabs" role="tablist">{steps.map((s, si) => (<Fragment key={si}><button className={s.cls} type="button" role="tab" aria-selected={s.selected} onClick={s.pick}><span className="stp__n">{s.n}</span><span>{s.short}</span></button></Fragment>))}</div>
<div className="stp__body">
<div className="stp__txt"><div className="stp__k">Step {step.n} of {step.total}</div><h3>{step.title}</h3><p>{step.text}</p>
<div className="stp__nav"><button className="chip" type="button" onClick={step.prev}>Back</button><button className="chip is-on" type="button" onClick={step.next}>{step.nextLabel}</button></div></div>
<div className="stp__vis"><div className="ui" style={{ width: "100%", maxWidth: "560px" }}><div className="ui__h"><b>{step.card}</b><span className={step.badgeCls}>{step.badge}</span></div>
{step.rows.map((r, ri) => (<Fragment key={ri}><div className="rl"><div className="rl__t"><b>{r.a}</b><span>{r.b}</span></div><span className={r.cls}>{r.c}</span></div></Fragment>))}
</div></div>
</div>
</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Safe by design</h2><div id="party"></div><div className="feat"><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>Party screening</b><span className="pill pill--bad">Block</span></div><div className="rl"><div className="rl__t"><b>Sender · Savanna Logistics Ltd</b><span>Sanctions and PEP</span></div><span className="pill pill--ok">No match</span></div><div className="rl"><div className="rl__t"><b>Receiver · Al-Noor Trading FZE</b><span>Sanctions list match, strength 1.0</span></div><span className="pill pill--bad">Confirmed</span></div><div className="ovr" style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "2px", padding: "12px 14px", borderRadius: "10px", background: "#FBE3E3", color: "#8C2626", fontSize: "13px" }}><b>Blocked before any other check</b><span>No rule or score can let a confirmed sanctions match through.</span></div></div></div><div className="ftxt"><h3>Both sides screened on every payment</h3><p className="fp">The sender and the receiver are checked against sanctions and PEP lists. A confirmed sanctions match blocks the payment, whatever else is true.</p><div className="accs">{acc.party.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div><div id="failsafe"></div><div className="feat"><div className="ftxt"><h3>Never fails silently</h3><p className="fp">If any check cannot run, the payment goes to a person rather than being blocked by mistake or let through unchecked, and the record shows what was missing.</p><div className="accs">{acc.safe.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>Decision record</b><span className="pill pill--warn">Review</span></div><div className="rl"><div className="rl__t"><b>Party screening</b><span>Completed</span></div><span className="pill pill--ok">Ran</span></div><div className="rl"><div className="rl__t"><b>Rules</b><span>Completed</span></div><span className="pill pill--ok">Ran</span></div><div className="rl"><div className="rl__t"><b>Detection model</b><span>Did not respond in time</span></div><span className="pill pill--bad">Did not run</span></div><div className="rl__foot"><span>Sent to a person instead of guessing. Retries of this payment get this same decision.</span></div></div></div></div></section>

<section id="segments" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Set how strict to be, per segment</h2><p className="sub2">Each group of customers or payments can have its own score bands and limits. These numbers are examples.</p>
<div className="cho">
<div className="tm-chips" role="tablist" style={{ margin: "0" }}>{segChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" role="tab" aria-selected={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div>
<div className="cho__body">
<div className="cho__l"><h3>{seg.title}</h3><p>{seg.text}</p><div className="band3"><span className="band3__a" style={{ flex: seg.allowW }}>Allow</span><span className="band3__r" style={{ flex: seg.reviewW }}>Review</span><span className="band3__b" style={{ flex: seg.blockW }}>Block</span></div></div>
<div className="cho__r">{seg.rows.map((r, ri) => (<Fragment key={ri}><div className="cho__row"><span>{r.a}</span><b>{r.b}</b></div></Fragment>))}</div>
</div>
</div></section>

<section id="guarantees" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><div className="fiu"><div className="fiu__l"><h2>Built to sit in the payment flow</h2><p>Decisions come back before the money moves, and nothing fails quietly.</p><a href="#" className="fiu__cta">Book a demo <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a></div><div className="fiu__r"><div className="fiu__row"><span className="flag">1</span><div><b>Fast</b><span>A decision in milliseconds, so customers are not kept waiting</span></div></div><div className="fiu__row"><span className="flag">2</span><div><b>Never fails silently</b><span>If a check cannot run, the payment goes to a person, and the record says why</span></div></div><div className="fiu__row"><span className="flag">3</span><div><b>No double decisions</b><span>A payment sent twice by your system gets the same answer once</span></div></div><div className="fiu__row"><span className="flag">4</span><div><b>Every decision explained</b><span>Reasons your analysts, your customers and your regulator can read</span></div></div></div></div></section>

<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 id="faq-title" className="h2">Questions teams ask us</h2><div className="faqs">{faqs.map((f, fi) => (<Fragment key={fi}><div className="faqi"><button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{f.open && (<><p className="faqa">{f.a}</p></>)}</div></Fragment>))}</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 112px", boxSizing: "border-box" }}>
<div className="endcta"><img src="/site-assets/africa-dots.svg" alt="" className="endcta__map" />
<div style={{ position: "relative", maxWidth: "760px" }}><h2>Put real-time screening in your payment flow</h2><p>Send test payments to the sandbox and see the decision and reasons that come back.</p></div>
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
