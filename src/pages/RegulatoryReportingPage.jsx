import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './report.css';

const ACC = {
aud: [['Every step kept','Alert, escalation, investigation notes, draft, approval and submission, with who and when.'],['Read only for auditors','Auditors and regulators can see any decision and report without being able to change it.'],['Retained for 7 years','Records are kept for the required retention period.']],
met: [['Reports filed','How many reports you filed, by pattern and by month.'],['Time to file','How long it takes from the first alert to a filed report.'],['Waiting for approval','Drafts that need your MLRO’s sign-off.']]
};
const STEPS = [
{ short: 'Decision', title: 'The investigator decides to report', text: 'Achieng closes case #2041 with the outcome “report filed”. That starts the draft.', card: 'Case #2041', badge: 'Report filed', tone: 'bad',
  rows: [['Outcome', 'Report to the FIU', 'Chosen', 'bad'], ['Reason', 'Structuring and payments to a mule network', 'Recorded', 'ok']] },
{ short: 'Draft', title: 'The report drafts itself', text: 'The subject, the transactions, the grounds for suspicion and the evidence are filled in from the case.', card: 'STR draft', badge: 'goAML format', tone: 'info',
  rows: [['Subject', 'Peter Kamau, from his KYC record', 'Filled', 'ok'], ['Transactions', '7 attached', 'Filled', 'ok'], ['Grounds', 'Drafted from the case summary', 'Filled', 'ok'], ['Evidence', 'Scenario result, network, notes', 'Attached', 'ok']] },
{ short: 'Edit', title: 'The investigator checks and edits', text: 'Achieng reads the draft, sharpens the grounds for suspicion and adds anything the case did not capture.', card: 'Draft edits', badge: '2 changes', tone: 'grey',
  rows: [['Grounds', 'Added customer’s lack of explanation', 'Edited', 'grey'], ['Evidence', 'Added call notes', 'Added', 'grey']] },
{ short: 'Approve', title: 'The MLRO approves', text: 'Nothing is submitted without your MLRO’s sign-off. Otieno reviews and approves.', card: 'Approval', badge: 'Approved', tone: 'ok',
  rows: [['Reviewer', 'Otieno, MLRO', 'Approved', 'ok'], ['Comment', 'Grounds are clear', 'Recorded', 'grey']] },
{ short: 'Submit', title: 'Ready for goAML', text: 'The approved report is exported in goAML format for submission to the FIU, here Kenya’s Financial Reporting Centre.', card: 'Submission', badge: 'FRC', tone: 'info',
  rows: [['Format', 'goAML', 'Ready', 'ok'], ['Destination', 'Financial Reporting Centre, Kenya', 'Selected', 'grey']] },
{ short: 'Record', title: 'Kept for the regulator', text: 'The submission is recorded with the case, and every step is kept for 7 years.', card: 'Record', badge: 'Kept 7 years', tone: 'ok',
  rows: [['Submission', 'Recorded against case #2041', 'Saved', 'ok'], ['Trail', 'Alert to submission, with names and times', 'Saved', 'ok']] }
];
const FIU = [
{ label: 'Kenya', title: 'Financial Reporting Centre', text: 'Kenya’s financial intelligence unit, under the Proceeds of Crime and Anti-Money Laundering Act.', tag: 'goAML', rows: [['Reports', 'Suspicious and cash transaction reports'], ['Format', 'goAML'], ['Drafted from', 'Your cases']] },
{ label: 'Nigeria', title: 'Nigerian Financial Intelligence Unit', text: 'Nigeria’s financial intelligence unit, under the Money Laundering (Prevention and Prohibition) Act, 2022.', tag: 'goAML', rows: [['Reports', 'Suspicious and currency transaction reports'], ['Format', 'goAML'], ['Drafted from', 'Your cases']] },
{ label: 'Ghana', title: 'Financial Intelligence Centre', text: 'Ghana’s financial intelligence unit, under the Anti-Money Laundering Act, 2020 (Act 1044).', tag: 'goAML', rows: [['Reports', 'Suspicious and cash transaction reports'], ['Format', 'goAML'], ['Drafted from', 'Your cases']] }
];
const FAQS = [
['What is an STR or SAR?','A suspicious transaction (or activity) report: the report you send your financial intelligence unit when you suspect money laundering, terrorist financing or fraud.'],
['How is the report drafted?','When a case is closed as report filed, the subject, transactions, grounds for suspicion and evidence are filled in from the case for the investigator to check.'],
['Do we still review it?','Yes. Investigators edit the draft and your MLRO approves it before anything is submitted.'],
['Which format is used?','goAML, the format used by financial intelligence units including Kenya’s FRC, Nigeria’s NFIU and Ghana’s FIC.'],
['Does Intact ID submit the report for us?','It prepares the approved report in goAML format and records the submission. Your team submits it to the FIU.'],
['How long are records kept?','Every step, from the first alert to the submission, is kept for 7 years.'],
['Can auditors see past reports?','Yes, in a read-only view showing who did what and when, without being able to change anything.'],
['Can we track how long reporting takes?','Yes. See reports filed, time from first alert to filing, and drafts waiting for approval.']
];

export default function RegulatoryReportingPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  const loc = useLocation();
  useEffect(() => {
    document.title = "Intact ID \u2014 Regulatory reporting (STR/SAR)";
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
const page = Object.assign({}, stepVals, chooserVals('fiu', FIU));

  const acc = accVals;
  const faqs = faqVals;
  const { steps, step, fiuChips, fiu } = page;

  return (
    <div className="pg-kyc pg-kyb pg-report" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0px 56px 0px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 660px", minWidth: "min(100%, 420px)" }}>
<div className="eyepill"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5" /><path d="m9 14 2 2 4-4" /></svg>Regulatory reporting (STR/SAR)</div>
<h1 className="h1">From suspicion to filed report, without the scramble.</h1>
<p className="lead">Confirmed cases become suspicious transaction reports with the evidence already attached, ready for goAML. Your MLRO approves, you submit, and every step is kept for the regulator.</p>
<div className="ctas"><a className="btn-primary" href="#">Book a demo <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn-ghost" href="#">Try the sandbox</a></div>
</div>
<div role="img" aria-label="Animated illustration: a suspicious transaction report fills itself in from case 2041: reporting institution, subject, seven transactions, grounds for suspicion and evidence. The MLRO approves it, it is ready to submit to Kenya’s Financial Reporting Centre on goAML, and the submission is recorded and kept for seven years." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pp-stage" style={{ position: "relative", width: "760px", height: "520px", flex: "none" }}><div className="ui" style={{ position: "absolute", left: "0", top: "0", width: "430px", animation: "report-rpt16 10s infinite both" }}><div className="ui__h"><b>STR draft · case #2041</b><span className="pill pill--info">goAML format</span></div><div className="rl" style={{ animation: "report-rpt1 10s infinite both" }}><span style={{ position: "relative", width: "18px", height: "18px", flex: "none", display: "inline-block" }}><span className="pp-out" style={{ position: "absolute", inset: "0", animation: "report-rpt2 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "report-rpt3 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><div className="rl__t"><b>Reporting institution</b><span>Your details, filled in once</span></div></div><div className="rl" style={{ animation: "report-rpt4 10s infinite both" }}><span style={{ position: "relative", width: "18px", height: "18px", flex: "none", display: "inline-block" }}><span className="pp-out" style={{ position: "absolute", inset: "0", animation: "report-rpt5 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "report-rpt6 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><div className="rl__t"><b>Subject</b><span>Peter Kamau · KYC record attached</span></div></div><div className="rl" style={{ animation: "report-rpt7 10s infinite both" }}><span style={{ position: "relative", width: "18px", height: "18px", flex: "none", display: "inline-block" }}><span className="pp-out" style={{ position: "absolute", inset: "0", animation: "report-rpt8 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "report-rpt9 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><div className="rl__t"><b>Transactions</b><span>7 transactions attached</span></div></div><div className="rl" style={{ animation: "report-rpt10 10s infinite both" }}><span style={{ position: "relative", width: "18px", height: "18px", flex: "none", display: "inline-block" }}><span className="pp-out" style={{ position: "absolute", inset: "0", animation: "report-rpt11 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "report-rpt12 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><div className="rl__t"><b>Grounds for suspicion</b><span>Drafted from the case summary</span></div></div><div className="rl" style={{ animation: "report-rpt13 10s infinite both" }}><span style={{ position: "relative", width: "18px", height: "18px", flex: "none", display: "inline-block" }}><span className="pp-out" style={{ position: "absolute", inset: "0", animation: "report-rpt14 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "report-rpt15 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><div className="rl__t"><b>Evidence</b><span>Scenario result, network picture, notes</span></div></div></div><div className="ui" style={{ position: "absolute", right: "0", top: "230px", width: "330px", animation: "report-rpt17 10s infinite both" }}><div className="ui__h"><b>MLRO approval</b><span className="pill pill--ok" style={{ animation: "report-rpt18 10s infinite both" }}>Approved</span></div><div style={{ display: "flex", alignItems: "center", gap: "10px" }}><img src="/site-assets/person-4.webp" alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} /><div style={{ fontSize: "13px", lineHeight: "1.35" }}><b style={{ fontWeight: "600" }}>Otieno, MLRO</b><div style={{ color: "#5B6461" }}>“Grounds are clear. File it.”</div></div></div><div className="sent" style={{ animation: "report-rpt19 10s infinite both" }}><span>Ready to submit to the FRC on goAML</span></div><div className="sent sent--ok" style={{ animation: "report-rpt20 10s infinite both" }}><span>Submission recorded · kept for 7 years</span></div></div></div></div>
</div>

</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Reports your FIU can act on. Records your auditor can follow.</h2><div className="vgrid"><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg></span><h3>Drafted from the case</h3></div><p>Subject, transactions and grounds for suspicion filled in from what the investigator found.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21.4 11.1 12.2 20.3a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5" /></svg></span><h3>Evidence attached</h3></div><p>Transactions, scenario results, network picture and notes travel with the report.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5" /></svg></span><h3>MLRO sign-off</h3></div><p>Nothing goes out until your money laundering reporting officer approves it.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg></span><h3>Kept for 7 years</h3></div><p>Every step, from first alert to submission, is retained for the required period.</p></div></div></section>

<section id="flow" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">From case to filed report</h2><p className="sub2">Follow case #2041 from the investigator’s decision to the record of submission.</p>
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

<section id="fius" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Built for the units you report to</h2><p className="sub2">Reports are drafted in goAML format for the financial intelligence unit you answer to.</p>
<div className="cho">
<div className="tm-chips" role="tablist" style={{ margin: "0" }}>{fiuChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" role="tab" aria-selected={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div>
<div className="cho__body">
<div className="cho__l"><h3>{fiu.title}</h3><p>{fiu.text}</p><span className="tag">{fiu.tag}</span></div>
<div className="cho__r">{fiu.rows.map((r, ri) => (<Fragment key={ri}><div className="cho__row"><span>{r.a}</span><b>{r.b}</b></div></Fragment>))}</div>
</div>
</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Ready when the regulator asks</h2><div id="audit"></div><div className="feat"><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>Report history · case #2041</b><span className="pill pill--grey">Read only</span></div><div className="rl"><span className="trig">3 Nov</span><div className="rl__t"><b>Alert raised</b><span>Structuring scenario · Peter Kamau</span></div></div><div className="rl"><span className="trig">4 Nov</span><div className="rl__t"><b>Escalated to case</b><span>Wanjiru, analyst · reason recorded</span></div></div><div className="rl"><span className="trig">6 Nov</span><div className="rl__t"><b>Report drafted</b><span>Achieng, investigator · grounds edited</span></div></div><div className="rl"><span className="trig">7 Nov</span><div className="rl__t"><b>Approved</b><span>Otieno, MLRO</span></div></div><div className="rl"><span className="trig">7 Nov</span><div className="rl__t"><b>Submission recorded</b><span>FRC · goAML</span></div></div></div></div><div className="ftxt"><h3>A trail an auditor can follow</h3><p className="fp">Who raised the alert, who escalated it, who drafted and approved the report, and when it was submitted, read-only.</p><div className="accs">{acc.aud.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div><div id="metrics"></div><div className="feat"><div className="ftxt"><h3>Know how your reporting is going</h3><p className="fp">Reports filed, time from first alert to filing, and what is waiting for approval, by pattern.</p><div className="accs">{acc.met.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>Reporting · this quarter</b><span className="pill pill--info">Example</span></div><div className="dgrid"><div><span>Reports filed</span><b>23</b></div><div><span>Median days, alert to filing</span><b>4</b></div><div><span>Waiting for approval</span><b>2</b></div></div><div className="sub" style={{ marginTop: "14px" }}>By pattern</div><div className="rl"><div className="rl__t"><b>Structuring</b></div><span className="cr-wbar"><b style={{ width: "70%" }}></b></span><span className="rl__hits">9</span></div><div className="rl"><div className="rl__t"><b>Mule accounts</b></div><span className="cr-wbar"><b style={{ width: "50%" }}></b></span><span className="rl__hits">7</span></div><div className="rl"><div className="rl__t"><b>Fraud proceeds</b></div><span className="cr-wbar"><b style={{ width: "35%" }}></b></span><span className="rl__hits">5</span></div><div className="rl"><div className="rl__t"><b>Sanctions</b></div><span className="cr-wbar"><b style={{ width: "10%" }}></b></span><span className="rl__hits">2</span></div></div></div></div></section>

<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 id="faq-title" className="h2">Questions teams ask us</h2><div className="faqs">{faqs.map((f, fi) => (<Fragment key={fi}><div className="faqi"><button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{f.open && (<><p className="faqa">{f.a}</p></>)}</div></Fragment>))}</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 112px", boxSizing: "border-box" }}>
<div className="endcta"><img src="/site-assets/africa-dots.svg" alt="" className="endcta__map" />
<div style={{ position: "relative", maxWidth: "760px" }}><h2>Draft a sample STR in the sandbox</h2><p>Close a sample case as report filed and see the draft, evidence and approval flow.</p></div>
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
