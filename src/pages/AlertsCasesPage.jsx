import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './alerts.css';

const ACC = {
detail: [['The same fields every time','Source, subject, typology, priority, evidence, status and time limit, whatever raised the alert.'],['Evidence attached','The transactions involved, the reasons, the rules or scenario that fired, and the network picture where it helps.'],['Two ways to close','Close as a false positive with a reason, or escalate to a case.']],
case: [['One case per customer or network','An escalated alert opens a case or joins an existing one, so the story stays together.'],['Summary drafted for you','A plain-language explanation of why the activity looks suspicious, for the investigator to check.'],['Outcomes on record','No further action, customer exited, or report filed, each with the reason.']],
dash: [['Workload at a glance','Alerts raised, open and closed each day, by team and by analyst.'],['Time limits watched','See which alerts are close to or past their time limit.'],['Quality over time','The share of alerts that turn out to be real, and false alarms, by pattern, rule and scenario.']]
};
const STEPS = [
{ short: 'New', title: 'Alerts arrive', text: 'A held payment, a nightly scenario and a model finding each raise an alert about Peter. All three use the same shape.', card: 'New alerts', badge: '3 new', tone: 'info',
  rows: [['Real-time', 'Payment held for review', 'New', 'warn'], ['Scenario', 'Structuring over 10 days', 'New', 'warn'], ['Model', 'Receiver linked to mule accounts', 'New', 'bad']] },
{ short: 'Grouped', title: 'Grouped into one', text: 'Because all three are about the same customer, they are grouped. The analyst handles Peter, not three separate alerts.', card: 'Peter Kamau', badge: 'High', tone: 'bad',
  rows: [['Alerts', '3 grouped', 'One item', 'ok'], ['Priority', 'From score, amounts, risk level and pattern', 'High', 'bad'], ['Time limit', 'Held payment waiting', '45 min', 'warn']] },
{ short: 'Assigned', title: 'Assigned to an analyst', text: 'The item goes to an analyst’s queue, ordered by priority and time limit.', card: 'Assigned', badge: 'Wanjiru', tone: 'grey',
  rows: [['Analyst', 'Wanjiru, first line', 'Assigned', 'ok'], ['Queue position', 'Second, after a sanctions hit', 'Next', 'grey']] },
{ short: 'In review', title: 'Reviewed with everything in view', text: 'Wanjiru sees what happened, why it was flagged, Peter’s history and his network, without switching screens.', card: 'In review', badge: 'Working', tone: 'warn',
  rows: [['Held payment', 'Rejected: receiver linked to mule accounts', 'Done', 'ok'], ['Pattern', '6 deposits just under the limit', 'Confirmed', 'bad'], ['Customer contact', 'No explanation given', 'Noted', 'grey']] },
{ short: 'Closed', title: 'Closed or escalated, with a reason', text: 'Each alert is closed as a false positive or escalated. Here Wanjiru escalates, and a case opens with a drafted summary for the investigator.', card: 'Outcome', badge: 'Escalated', tone: 'bad',
  rows: [['Decision', 'Escalate to case #2041', 'Escalated', 'bad'], ['Reason', 'Structuring and payments to a mule network', 'Recorded', 'ok'], ['Next', 'Investigator decides whether to file an STR', 'Case open', 'warn']] }
];
const ROLE = [
{ label: 'Analyst', title: 'Analysts', text: 'Work the queue: held payments and alerts, quickly and with a reason for each outcome.', rows: [['Sees', 'Prioritised alerts and held payments'], ['Does', 'Release, reject, close or escalate'], ['Measured on', 'Time limits met, quality of outcomes']] },
{ label: 'Investigator', title: 'Investigators', text: 'Take escalated cases, dig into the activity and decide whether to report.', rows: [['Sees', 'Cases with every related alert and the network'], ['Does', 'Add notes and evidence, ask follow-up questions'], ['Decides', 'No action, exit the customer, or file a report']] },
{ label: 'MLRO', title: 'Compliance managers and MLROs', text: 'Oversee the team and stand behind the reports.', rows: [['Sees', 'Volumes, backlogs and missed time limits'], ['Approves', 'Reports before they are filed'], ['Shows', 'Evidence ready for regulators and auditors']] }
];
const FAQS = [
['What can raise an alert?','A payment held or blocked in real time, a retrospective scenario, a screening hit or a finding from the detection model. All arrive in the same shape.'],
['How are alerts prioritised?','From the score, the amounts, the customer’s risk level and the pattern. Sanctions hits always come first.'],
['Why are alerts grouped?','So analysts deal with a customer, not a pile of separate alerts about the same person.'],
['What are time limits?','Each alert type has a target time to review. Held payments have the shortest, because a customer is waiting.'],
['What happens when an alert is escalated?','It opens a case, or joins an existing case for that customer or network, with a drafted summary and all the evidence.'],
['Will the same pattern alert again after we close it?','Not unless new activity is added to it.'],
['Can we see how the team is doing?','Yes. Volumes, open alerts, backlogs, missed time limits and the share of alerts that turn out to be real.'],
['Is every action recorded?','Yes. Every decision, note and status change is recorded against the person who made it.']
];

export default function AlertsCasesPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  const loc = useLocation();
  useEffect(() => {
    document.title = "Intact ID \u2014 Alerts and case management";
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
const page = Object.assign({}, stepVals, chooserVals('role', ROLE));

  const acc = accVals;
  const faqs = faqVals;
  const { steps, step, roleChips, role } = page;

  return (
    <div className="pg-kyc pg-kyb pg-alerts" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0px 56px 0px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 660px", minWidth: "min(100%, 420px)" }}>
<div className="eyepill"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></svg>Alerts and case management</div>
<h1 className="h1">Handle a person, not a pile of alerts.</h1>
<p className="lead">Every concern from every source lands in one queue, grouped by customer and sorted by priority. Escalate to a case with the evidence and a drafted summary already there.</p>
<div className="ctas"><a className="btn-primary" href="#">Book a demo <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn-ghost" href="#">Try the sandbox</a></div>
</div>
<div role="img" aria-label="Animated illustration: three alerts about Peter Kamau arrive from a held payment, a structuring scenario and the detection model. They are grouped into one item with high priority and a 45-minute time limit, assigned to an analyst, and escalated to a case with a drafted summary." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pp-stage" style={{ position: "relative", width: "760px", height: "520px", flex: "none" }}><div style={{ position: "absolute", left: "0", top: "0", width: "360px", height: "230px" }}><div className="al" style={{ top: "0px", animation: "alerts-alc1 10s infinite both" }}><span className="al__s">Real-time</span><span className="al__t">Payment of KES 99,000 held for review</span><span className="rl__dot rl__dot--warn"></span></div><div className="al" style={{ top: "74px", animation: "alerts-alc2 10s infinite both" }}><span className="al__s">Scenario</span><span className="al__t">Structuring: 6 deposits under the limit in 10 days</span><span className="rl__dot rl__dot--warn"></span></div><div className="al" style={{ top: "148px", animation: "alerts-alc3 10s infinite both" }}><span className="al__s">Model</span><span className="al__t">Receiver linked to confirmed mule accounts</span><span className="rl__dot rl__dot--bad"></span></div></div><div className="grp" style={{ animation: "alerts-alc4 10s infinite both" }}><div style={{ display: "flex", alignItems: "center", gap: "12px" }}><span style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#E4EEE9", color: "#0B5D45", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600", flex: "none" }}>PK</span><div style={{ flex: "1" }}><b style={{ fontSize: "16px", fontWeight: "600" }}>Peter Kamau</b><div style={{ fontSize: "12px", color: "#5B6461" }}>3 alerts grouped · typology: structuring, mule accounts</div></div><span className="pill pill--bad">High</span></div><div className="grp__m"><span>Held payment waiting</span><b>45 min left</b></div><div className="grp__m"><span>Assigned to</span><b>Wanjiru, analyst</b></div><div className="grp__esc" style={{ animation: "alerts-alc5 10s infinite both" }}><span>Escalated to case #2041</span><span>Summary drafted</span></div></div></div></div>
</div>

</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Less noise for analysts. More time on real risk.</h2><div className="vgrid"><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18" /></svg></span><h3>One shape for every alert</h3></div><p>Held payments, scenarios, screening hits and model findings all arrive the same way.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5" /></svg></span><h3>Grouped by customer</h3></div><p>Related alerts on the same person join together instead of piling up.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg></span><h3>Priorities and time limits</h3></div><p>Sanctions hits come first. Held payments get the shortest time limit, because a customer is waiting.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg></span><h3>A reason for every outcome</h3></div><p>Closed as a false positive or escalated to a case, always with the reason on record.</p></div></div></section>

<section id="lifecycle" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">The life of an alert</h2><p className="sub2">Follow Peter’s alerts from the moment they are raised to the moment they are closed or escalated.</p>
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

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Everything an analyst needs, in one place</h2><div id="alerts"></div><div className="feat"><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>Alert · Structuring</b><span className="pill pill--warn">In review</span></div><div className="rl"><div className="rl__t"><b>Source</b><span>Retrospective scenario, run nightly</span></div></div><div className="rl"><div className="rl__t"><b>Subject</b><span>Peter Kamau and his M-Pesa wallet</span></div></div><div className="rl"><div className="rl__t"><b>Typology</b><span>Structuring</span></div></div><div className="rl"><div className="rl__t"><b>Evidence</b><span>6 deposits listed, the scenario settings, network picture</span></div></div><div className="rl"><div className="rl__t"><b>Time limit</b><span>2 days left</span></div></div><div style={{ display: "flex", gap: "8px", marginTop: "12px" }}><span className="btn-s">Close as false positive</span><span className="btn-s btn-s--dark">Escalate to case</span></div></div></div><div className="ftxt"><h3>Every alert tells the whole story</h3><p className="fp">Source, subject, typology, priority, evidence and time limit, the same way every time.</p><div className="accs">{acc.detail.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div><div id="cases"></div><div className="feat"><div className="ftxt"><h3>Cases that bring it all together</h3><p className="fp">An escalated alert opens a case, or joins an existing one for the customer or their network, with a summary already drafted.</p><div className="accs">{acc.case.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div><div className="fvis"><div className="ui" style={{ width: "88%" }}><div className="ui__h"><b>Case #2041 · Peter Kamau</b><span className="pill pill--warn">In review</span></div><div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "16px" }}><div><div className="sub">Checklist</div><div className="ck ck--done"><span></span>KYC and source of funds checked</div><div className="ck ck--done"><span></span>Linked accounts reviewed</div><div className="ck"><span></span>Customer asked for statement</div><div className="ck"><span></span>Decision and reason recorded</div></div><div><div className="sub">Notes</div><div className="note"><b>Wanjiru</b> Deposits match a split-deposit pattern. Escalating to the MLRO.</div><div className="note"><b>Otieno · MLRO</b> Agreed. Prepare the STR.</div></div></div><div className="str"><span style={{ display: "flex", alignItems: "center", gap: "10px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5" /></svg><b style={{ fontWeight: "600" }}>STR draft ready</b><span style={{ color: "#5B6461" }}>goAML format · 7 transactions attached</span></span><span className="btn-s btn-s--dark">Review and file</span></div></div></div></div><div id="oversight"></div><div className="feat"><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>Team overview · this week</b><span className="pill pill--grey">MLRO view</span></div><div className="dgrid"><div><span>Alerts raised</span><b>412</b><em className=""></em></div><div><span>Open</span><b>38</b><em className=""></em></div><div><span>Past time limit</span><b>3</b><em className="bad">Needs attention</em></div><div><span>Turned out real</span><b>17%</b><em className="ok">Up from 12%</em></div></div><div className="sub" style={{ marginTop: "14px" }}>Backlog by analyst</div><div className="rl"><div className="rl__t"><b>Wanjiru</b></div><span className="cr-wbar"><b style={{ width: "60%" }}></b></span><span className="rl__hits">12 open</span></div><div className="rl"><div className="rl__t"><b>Kevin</b></div><span className="cr-wbar"><b style={{ width: "40%" }}></b></span><span className="rl__hits">8 open</span></div><div className="rl"><div className="rl__t"><b>Achieng</b></div><span className="cr-wbar"><b style={{ width: "90%" }}></b></span><span className="rl__hits">18 open</span></div></div></div><div className="ftxt"><h3>See the backlog before it builds</h3><p className="fp">Volumes, open alerts, missed time limits and how many alerts turn out to be real, by analyst and by pattern.</p><div className="accs">{acc.dash.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div></section>

<section id="roles" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Who does what</h2><p className="sub2">Each person sees what their role allows. Every action is recorded against their name.</p>
<div className="cho">
<div className="tm-chips" role="tablist" style={{ margin: "0" }}>{roleChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" role="tab" aria-selected={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div>
<div className="cho__body">
<div className="cho__l"><h3>{role.title}</h3><p>{role.text}</p></div>
<div className="cho__r">{role.rows.map((r, ri) => (<Fragment key={ri}><div className="cho__row"><span>{r.a}</span><b>{r.b}</b></div></Fragment>))}</div>
</div>
</div></section>

<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 id="faq-title" className="h2">Questions teams ask us</h2><div className="faqs">{faqs.map((f, fi) => (<Fragment key={fi}><div className="faqi"><button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{f.open && (<><p className="faqa">{f.a}</p></>)}</div></Fragment>))}</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 112px", boxSizing: "border-box" }}>
<div className="endcta"><img src="/site-assets/africa-dots.svg" alt="" className="endcta__map" />
<div style={{ position: "relative", maxWidth: "760px" }}><h2>Work a sample case in the sandbox</h2><p>See alerts arrive, group them, open a case and close it with a reason.</p></div>
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
