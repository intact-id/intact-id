/* KYC page sections below the feature row: platform tabs, regulations, product tours, FAQ, final call to action. */
import { useState } from 'react';

const KT = {
source: { chips: [
['Registry lookup','Verify people against the national register, not just their document','Check name, date of birth and photo directly with IPRS, NIN, Ghana Card, NIRA and NIDA, so a forged card cannot pass on looks alone.'],
['ID document checks','Read and check ID documents in seconds','Capture the front and back of national IDs, passports and driving licences, read the data, and check for signs of tampering.'],
['Biometrics','Make sure the person is real and is the owner of the ID','A selfie with liveness is matched to the document photo and, where the registry allows, to the photo on record.']]},
flow: { chips: [
['Workflow builder','Build verification flows for every country without writing code','Set the steps, the order and the rules for each market, and change them without waiting on a developer release.'],
['Reusable KYC','Let verified people reuse their checks','With the person’s consent, share a completed verification with a partner so they do not have to start again.'],
['Case management','Review the hard cases in one queue','Applications that need a human land in a queue with every check, image and registry response in one view.']]},
fraud: { chips: [
['Device signals','Spot the same device behind many sign-ups','Flag applications from devices, networks and locations already tied to other accounts.'],
['Duplicate faces','Catch one face on many identities','Each new selfie is compared with past applicants, so a fraudster cannot reuse their face with stolen IDs.'],
['Risk scoring','Explain every decision you make','Each signal adds to a score your team can read, with the reasons shown, so approvals and rejections can be defended.']]},
poa: { chips: [
['Document check','Verify addresses from bills and statements','Upload a utility bill, bank or mobile money statement, and we read the name, address and date and check it is recent.'],
['Without documents','Confirm an address without a document','Where documents are hard to get, use registry and other data sources to confirm where a person lives.']]}
};
const FAQS = [
['What is KYC verification?','Know Your Customer (KYC) is how a regulated business confirms who a customer is before serving them. It usually means checking an ID document, confirming the person is real and present, and screening them against sanctions and PEP lists.'],
['Which countries and IDs do you support?','We verify people in Kenya, Nigeria, Ghana, Uganda, Tanzania and Rwanda, using national IDs, passports and driving licences, and we check against national registries where they are available.'],
['How is a registry check different from reading the document?','Reading a document only tells you what is printed on it. A registry check asks the government record directly, so a well-made fake with invented details will not match.'],
['How do we add Intact ID to our product?','Use the hosted verification link with no code, drop in the web or mobile SDK, or call the API directly. Results come back to your dashboard and to your systems through signed webhooks.'],
['Can we have different checks for different customers?','Yes. Build a flow for each country, product or risk level, and step a customer up to stronger checks when their risk changes.'],
['How long do you keep verification data?','Every check keeps its source, timestamp and registry response for seven years by default, so you can show a regulator exactly what was checked and when. Retention can be set to match your obligations.'],
['How much does it cost?','You pay per completed verification, and the price depends on the checks you use. See the pricing page or talk to our team for a quote.'],
['Can we try it before signing a contract?','Yes. The sandbox has sample people and every check, so your team can test the full flow before going live.']
];

export default function KycSections() {
  const [kt, setKt] = useState('source');
  const [chipIdx, setChipIdx] = useState(0);
  const [faq, setFaq] = useState(0);
  const chipsData = KT[kt].chips;
  const ci = Math.min(chipIdx, chipsData.length - 1);
  const ktab = (k) => ({ cls: 'ktab' + (kt === k ? ' is-on' : ''), selected: kt === k ? 'true' : 'false', pick: () => { setKt(k); setChipIdx(0); } });
  const ktTabs = { source: ktab('source'), flow: ktab('flow'), fraud: ktab('fraud'), poa: ktab('poa') };
  const ktIs = { source: kt === 'source', flow: kt === 'flow', fraud: kt === 'fraud', poa: kt === 'poa' };
  const chip = { title: chipsData[ci][1], text: chipsData[ci][2] };
  const chips = chipsData.map((c, i) => ({ label: c[0], cls: 'devtab' + (i === ci ? ' is-on' : ''), selected: i === ci ? 'true' : 'false', pick: () => setChipIdx(i) }));
  const faqs = FAQS.map((f, i) => { const o = faq === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => setFaq(o ? -1 : i) }; });

  return (
    <>

{/* platform: tabs with a dotted rule, then a white panel (text + sub-product chips left, product visual right) */}
<section aria-labelledby="plat-title" style={{ background: "#F2F6F4" }}>
<div className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 150px", boxSizing: "border-box" }}>
<h2 id="plat-title" style={{ margin: "0 auto", maxWidth: "900px", textAlign: "center", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em" }}>One verification platform for every market you serve</h2>
<p style={{ margin: "20px auto 0", maxWidth: "820px", textAlign: "center", fontSize: "20px", lineHeight: "28px", color: "#3F4744" }}>Build flows for each country, risk level and regulator, and run them all from one place.</p>

<div role="tablist" aria-label="KYC capabilities" style={{ marginTop: "72px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px 32px", padding: "0 16px", borderBottom: "2px dotted #C3CBC7" }}>
<button className={ktTabs.source.cls} type="button" role="tab" aria-selected={ktTabs.source.selected} onClick={ktTabs.source.pick}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3 3 7.5h18L12 3Z" /></svg>Verify at the source</button>
<button className={ktTabs.flow.cls} type="button" role="tab" aria-selected={ktTabs.flow.selected} onClick={ktTabs.flow.pick}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="7" height="5" rx="1.5" /><rect x="14" y="15" width="7" height="5" rx="1.5" /><path d="M6.5 9v3.5a2 2 0 0 0 2 2H14" /></svg>Automate onboarding</button>
<button className={ktTabs.fraud.cls} type="button" role="tab" aria-selected={ktTabs.fraud.selected} onClick={ktTabs.fraud.pick}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="8" r="3.5" /><path d="M3.5 20c1-3.5 3.5-5.5 6.5-5.5 1.2 0 2.3.3 3.2.8" /><path d="M17.5 13.5v4M17.5 20.3v.2" /></svg>Stop fraud</button>
<button className={ktTabs.poa.cls} type="button" role="tab" aria-selected={ktTabs.poa.selected} onClick={ktTabs.poa.pick}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Z" /><path d="m9.5 14.5 2 2 3.5-4" /></svg>Proof of address</button>
</div>

<div style={{ marginTop: "48px", display: "flex", flexWrap: "wrap", gap: "32px", padding: "32px", borderRadius: "24px", background: "#FFFFFF", boxSizing: "border-box" }}>
<div style={{ flex: "1 1 560px", minWidth: "min(100%, 340px)", display: "flex", flexDirection: "column", padding: "8px" }}>
<h3 style={{ margin: "0", maxWidth: "680px", fontSize: "clamp(32px, 3vw, 48px)", fontWeight: "500", lineHeight: "1.12", letterSpacing: "-0.015em" }}>{chip.title}</h3>
<p style={{ margin: "16px 0 0", maxWidth: "620px", fontSize: "20px", lineHeight: "28px", color: "#3F4744" }}>{chip.text}</p>
<a className="btn-ghost" href="#" style={{ marginTop: "32px", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 28px", borderRadius: "8px", border: "1.25px solid #DEE2E6", fontSize: "18px", fontWeight: "500" }}>Learn more <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
<span style={{ flex: "1", minHeight: "80px" }}></span>
<div role="tablist" aria-label="Products in this area" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
{chips.map((c) => (
<button key={c.label} className={c.cls} type="button" role="tab" aria-selected={c.selected} onClick={c.pick}><span className="devtab__ring"></span>{c.label}</button>
))}
</div>
</div>

<div style={{ flex: "1 1 760px", minWidth: "0", minHeight: "600px", borderRadius: "16px", backgroundImage: "linear-gradient(160deg, #F4F9F6 0%, #DDEFE5 100%)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px", boxSizing: "border-box" }}>

{/* visual: registry check */}
{ktIs.source && (<>
<div style={{ position: "relative", width: "640px", maxWidth: "100%", height: "500px" }}>
<div style={{ position: "absolute", left: "0", top: "70px", width: "400px", maxWidth: "70%", aspectRatio: "1.586", borderRadius: "18px", backgroundImage: "linear-gradient(135deg, #E9F5EE 0%, #C8E6D6 100%)", boxShadow: "0 20px 50px rgba(10,40,28,0.16)", padding: "22px", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", color: "#0B5D45" }}><span>NATIONAL ID</span><span>SPECIMEN</span></div>
<div style={{ display: "flex", gap: "16px", marginTop: "16px", flex: "1" }}>
<img src="/site-assets/person-1.webp" alt="" style={{ width: "104px", height: "128px", borderRadius: "10px", objectFit: "cover", background: "#DCE8E2" }} />
<div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#4D5560" }}>
<span>Name<b style={{ display: "block", fontSize: "16px", fontWeight: "600", color: "#0A0C0E" }}>Grace Achieng</b></span>
<span>Date of birth<b style={{ display: "block", fontSize: "16px", fontWeight: "600", color: "#0A0C0E" }}>14 Mar 1994</b></span>
<span>ID number<b style={{ display: "block", fontSize: "16px", fontWeight: "600", color: "#0A0C0E" }}>••• ••4 192</b></span>
</div>
</div>
</div>
<div style={{ position: "absolute", right: "0", top: "0", width: "300px", height: "500px", borderRadius: "40px", background: "#FFFFFF", border: "8px solid #E5ECE8", boxShadow: "0 30px 70px rgba(10,40,28,0.2)", padding: "28px 22px", boxSizing: "border-box" }}>
<div style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}>Checking the registry</div>
<div style={{ textAlign: "center", marginTop: "6px", fontSize: "13px", color: "#5B6461", lineHeight: "1.4" }}>We compare your details with the national identity register</div>
<div style={{ margin: "22px auto 0", width: "64px", height: "64px", borderRadius: "50%", background: "#E3F6EC", display: "flex", alignItems: "center", justifyContent: "center" }}><svg aria-hidden="true" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0B5D45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3 3 7.5h18L12 3Z" /></svg></div>
<div style={{ marginTop: "22px", fontSize: "15px" }}>
<div className="vrow"><span>Name</span><b>Match</b></div>
<div className="vrow"><span>Date of birth</span><b>Match</b></div>
<div className="vrow"><span>ID number</span><b>Valid</b></div>
<div className="vrow"><span>Registry photo</span><b>Match</b></div>
</div>
<div style={{ marginTop: "16px", fontSize: "12px", color: "#5B6461", textAlign: "center" }}>Source: IPRS · live lookup</div>
</div>
</div>
</>)}

{/* visual: workflow builder */}
{ktIs.flow && (<>
<div style={{ position: "relative", width: "720px", maxWidth: "100%", height: "500px", borderRadius: "14px", background: "#FFFFFF", boxShadow: "0 20px 50px rgba(10,40,28,0.12)", overflow: "hidden", backgroundImage: "radial-gradient(#DCE3DF 1px, transparent 1px)", backgroundSize: "18px 18px" }}>
<div style={{ height: "56px", display: "flex", alignItems: "center", gap: "12px", padding: "0 20px", background: "#FFFFFF", borderBottom: "1px solid #EEF1F0" }}><span style={{ fontSize: "17px", fontWeight: "600" }}>Country-based onboarding</span><span style={{ padding: "3px 10px", borderRadius: "6px", background: "#F1F5F3", fontSize: "12px", color: "#4D5560" }}>Example · view only</span></div>
<svg aria-hidden="true" width="720" height="444" viewBox="0 0 720 444" style={{ position: "absolute", left: "0", top: "56px" }} fill="none" strokeWidth="2">
<path d="M196 104 C 230 104, 230 104, 262 104" stroke="#1DB980" />
<path d="M470 92 C 500 92, 500 70, 524 70" stroke="#1DB980" />
<path d="M470 172 C 505 172, 495 300, 524 300" stroke="#9AA6A0" />
</svg>
<div className="node" style={{ left: "24px", top: "100px", width: "172px" }}><div className="node__h"><span className="node__ico" style={{ background: "#E3F6EC", color: "#0B5D45" }}>{"▶"}</span>Start</div><div className="node__b">Applicant country</div><div className="node__f">Next step <i></i></div></div>
<div className="node" style={{ left: "262px", top: "96px", width: "208px" }}><div className="node__h"><span className="node__ico" style={{ background: "#EFE7FB", color: "#6B3FB8" }}>{"◆"}</span>Condition</div><div className="node__b"><span className="tag">Kenya</span><span className="tag">Uganda</span><span className="tag">Tanzania</span></div><div className="node__f">Branch 1 <i style={{ background: "#1DB980" }}></i></div><div className="node__f" style={{ borderTop: "1px solid #EEF1F0" }}>Else <i style={{ background: "#9AA6A0" }}></i></div></div>
<div className="node" style={{ left: "524px", top: "72px", width: "176px" }}><div className="node__h"><span className="node__ico" style={{ background: "#E3F6EC", color: "#0B5D45" }}>✓</span>East Africa KYC</div><div className="node__b" style={{ display: "grid", gap: "6px" }}><span className="step">National ID</span><span className="step">Selfie + liveness</span><span className="step">Registry match</span></div></div>
<div className="node" style={{ left: "524px", top: "302px", width: "176px" }}><div className="node__h"><span className="node__ico" style={{ background: "#F1F5F3", color: "#4D5560" }}>✓</span>Default KYC</div><div className="node__b" style={{ display: "grid", gap: "6px" }}><span className="step">Passport</span><span className="step">Selfie + liveness</span></div></div>
</div>
</>)}

{/* visual: fraud case */}
{ktIs.fraud && (<>
<div style={{ position: "relative", width: "680px", maxWidth: "100%", height: "500px" }}>
<div style={{ position: "absolute", left: "0", top: "30px", width: "400px", maxWidth: "70%", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 20px 50px rgba(10,40,28,0.14)", padding: "24px", boxSizing: "border-box" }}>
<div style={{ display: "flex", alignItems: "center", gap: "14px" }}><img src="/site-assets/person-2.webp" alt="" style={{ width: "56px", height: "56px", borderRadius: "12px", objectFit: "cover" }} /><div><div style={{ fontSize: "17px", fontWeight: "600" }}>Chidi Okafor</div><div style={{ fontSize: "13px", color: "#5B6461", marginTop: "2px" }}>Nigeria · NIN · applied 2 min ago</div></div></div>
<div style={{ marginTop: "18px", fontSize: "13px", fontWeight: "600", color: "#5B6461", letterSpacing: "0.04em" }}>SIGNALS</div>
<div style={{ marginTop: "8px", fontSize: "15px" }}>
<div className="sig"><i style={{ background: "#D64545" }}></i>Same device used by 4 other applicants</div>
<div className="sig"><i style={{ background: "#D64545" }}></i>Selfie matches a different applicant</div>
<div className="sig"><i style={{ background: "#E0A030" }}></i>Email created today</div>
<div className="sig"><i style={{ background: "#1DB980" }}></i>Document passed authenticity checks</div>
</div>
<div style={{ marginTop: "18px", display: "flex", gap: "8px", fontSize: "14px", fontWeight: "600" }}><span style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #F0C4C4", color: "#B23434" }}>Reject</span><span style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #E1E6E3" }}>Ask to resubmit</span><span style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #BFE6D3", color: "#0A6B47" }}>Approve</span></div>
</div>
<div style={{ position: "absolute", right: "0", top: "0", width: "290px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 20px 50px rgba(10,40,28,0.16)", padding: "22px", boxSizing: "border-box" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "16px", fontWeight: "600" }}>Fraud risk</span><span style={{ padding: "3px 10px", borderRadius: "6px", background: "#FBE3E3", color: "#B23434", fontSize: "12px", fontWeight: "600" }}>High</span></div>
<div style={{ marginTop: "14px", height: "6px", borderRadius: "3px", backgroundImage: "linear-gradient(90deg, #1DB980 0 40%, #E0A030 40% 70%, #D64545 70%)" }}></div>
<div style={{ marginTop: "18px", display: "grid", gap: "12px", fontSize: "13px", color: "#4D5560" }}>
<div>Device<div className="bar"><b style={{ width: "86%", background: "#D64545" }}></b></div></div>
<div>Biometrics<div className="bar"><b style={{ width: "74%", background: "#D64545" }}></b></div></div>
<div>Contact details<div className="bar"><b style={{ width: "48%", background: "#E0A030" }}></b></div></div>
<div>Document<div className="bar"><b style={{ width: "12%", background: "#1DB980" }}></b></div></div>
</div>
</div>
<div style={{ position: "absolute", right: "40px", bottom: "20px", width: "250px", borderRadius: "14px", background: "#0A0C0E", color: "#FFFFFF", padding: "18px", boxSizing: "border-box", fontSize: "14px", lineHeight: "1.45" }}>Sent to review: the same device and face appear on other applications.</div>
</div>
</>)}

{/* visual: proof of address settings */}
{ktIs.poa && (<>
<div style={{ width: "600px", maxWidth: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
<div className="poa"><div className="poa__h"><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0B5D45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Z" /></svg>Utility provider</div><div className="poa__chips"><span>Electricity bill</span><span>Water bill</span><span>Telecom bill</span></div><div className="poa__f"><span className="box"></span>Issued in the last <span className="num">3</span> months</div></div>
<div className="poa" style={{ transform: "scale(1.04)", boxShadow: "0 24px 60px rgba(10,40,28,0.18)" }}><div className="poa__h"><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0B5D45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h4" /></svg>Bank or mobile money</div><div className="poa__chips"><span>Bank statement</span><span>Mobile money statement</span></div><div className="poa__f"><span className="box"></span>Issued in the last <span className="num">3</span> months</div></div>
<div className="poa"><div className="poa__h"><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0B5D45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5" /></svg>Other documents</div><div className="poa__chips"><span>Tenancy agreement</span><span>Rates bill</span><span>Employer letter</span></div><div className="poa__f"><span className="box"></span>Issued in the last <span className="num">6</span> months</div></div>
</div>
</>)}

</div>
</div>
</div>
</section>

{/* dark: rules you report to, rotating stack on the right */}
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<div style={{ borderRadius: "24px", background: "#0A0D0C", color: "#FFFFFF", display: "flex", flexWrap: "wrap", gap: "48px", padding: "clamp(40px, 4vw, 64px)", boxSizing: "border-box", overflow: "hidden" }}>
<div style={{ flex: "1 1 520px", minWidth: "min(100%, 320px)", display: "flex", flexDirection: "column" }}>
<h2 style={{ margin: "0", maxWidth: "720px", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.1", letterSpacing: "-0.02em" }}>Built around the rules you answer to</h2>
<p style={{ margin: "20px 0 0", maxWidth: "600px", fontSize: "20px", lineHeight: "28px", color: "#B9C6C0" }}>Map each check to the regulation behind it, so your evidence is ready when the regulator asks.</p>
<span style={{ flex: "1", minHeight: "120px" }}></span>
<a className="btn-primary" href="#" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 28px", borderRadius: "8px", fontSize: "18px", fontWeight: "500", background: "#1DB980", color: "#0A0C0E" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div>
<div style={{ flex: "1 1 640px", minWidth: "min(100%, 320px)", position: "relative", height: "560px" }}>
<div className="reg" style={{ "--d": "0s" }}><span className="reg__flag">KE</span><div><div className="reg__t">Kenya</div><div className="reg__s">Proceeds of Crime and Anti-Money Laundering Act, and the Data Protection Act, 2019</div></div></div>
<div className="reg" style={{ "--d": "-4s" }}><span className="reg__flag">NG</span><div><div className="reg__t">Nigeria</div><div className="reg__s">CBN AML/CFT regulations and the Nigeria Data Protection Act, 2023</div></div></div>
<div className="reg" style={{ "--d": "-8s" }}><span className="reg__flag">GH</span><div><div className="reg__t">Ghana</div><div className="reg__s">Anti-Money Laundering Act, 2020 (Act 1044) and the Data Protection Act, 2012</div></div></div>
</div>
</div>
</section>

{/* product tours: three cards */}
<section aria-labelledby="tour-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<h2 id="tour-title" style={{ margin: "0 auto", maxWidth: "940px", textAlign: "center", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em" }}>See how a verification flow comes together</h2>
<div style={{ marginTop: "64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "12px" }}>

<article className="tour">
<div className="tour__v" style={{ backgroundImage: "radial-gradient(#DCE3DF 1px, transparent 1px)", backgroundSize: "16px 16px", backgroundColor: "#F6F9F7" }}>
<div className="node" style={{ left: "24px", top: "48px", width: "150px" }}><div className="node__h">Start</div><div className="node__b">Country</div><div className="node__f">Next <i></i></div></div>
<svg aria-hidden="true" width="80" height="90" viewBox="0 0 80 90" style={{ position: "absolute", left: "174px", top: "70px" }} fill="none" strokeWidth="2"><path d="M0 30 C 40 30, 40 10, 80 10" stroke="#1DB980" /><path d="M0 30 C 40 30, 40 80, 80 80" stroke="#9AA6A0" /></svg>
<div className="node" style={{ left: "254px", top: "36px", width: "170px" }}><div className="node__h">Kenya</div><div className="node__b"><span className="step">ID + IPRS</span></div></div>
<div className="node" style={{ left: "254px", top: "150px", width: "170px" }}><div className="node__h">Everyone else</div><div className="node__b"><span className="step">Passport</span></div></div>
</div>
<h3>Route by country</h3>
<p>Send each applicant down the right path based on where they live, the ID they hold and how risky the product is.</p>
<a href="#">See how it works <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</article>

<article className="tour">
<div className="tour__v" style={{ background: "#F6F9F7", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
<div style={{ width: "86%", height: "88%", borderRadius: "12px 12px 0 0", background: "#FFFFFF", boxShadow: "0 12px 30px rgba(10,40,28,0.1)", padding: "18px", boxSizing: "border-box", fontSize: "13px" }}>
<div style={{ fontSize: "15px", fontWeight: "600" }}>Verification level · Standard</div>
<div style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
<div className="lvl"><b>1</b>ID document · front and back</div>
<div className="lvl"><b>2</b>Selfie with liveness</div>
<div className="lvl"><b>3</b>Registry match</div>
<div className="lvl"><b>4</b>Sanctions &amp; PEP screening</div>
</div>
</div>
</div>
<h3>Choose the checks</h3>
<p>Group checks into levels, like basic, standard or enhanced, and step applicants up when their risk changes.</p>
<a href="#">See how it works <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</article>

<article className="tour">
<div className="tour__v" style={{ background: "#F6F9F7" }}>
<img src="/site-assets/person-1.webp" alt="" style={{ position: "absolute", left: "50%", top: "50%", width: "200px", height: "200px", margin: "-100px 0 0 -130px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 0 0 10px #FFFFFF, 0 0 0 14px #1DB980" }} />
<div style={{ position: "absolute", right: "16px", top: "28px", width: "160px", borderRadius: "12px", background: "#FFFFFF", boxShadow: "0 12px 30px rgba(10,40,28,0.12)", padding: "12px", boxSizing: "border-box", fontSize: "12px", display: "grid", gap: "6px" }}><b style={{ fontSize: "13px" }}>Choose your ID</b><span className="pick">National ID</span><span className="pick">Passport</span><span className="pick">Driving licence</span></div>
</div>
<h3>Design the user journey</h3>
<p>Your colours, your copy and the languages your customers read, in a widget that works on low-end phones and slow networks.</p>
<a href="#">See how it works <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</article>

</div>
</section>

{/* FAQ */}
<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<h2 id="faq-title" style={{ margin: "0", textAlign: "center", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
<div style={{ maxWidth: "900px", margin: "56px auto 0" }}>
{faqs.map((f) => (
<div key={f.q} style={{ borderBottom: "1px solid #E1E6E3" }}>
<button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>
{f.open && (
<p style={{ margin: "0", padding: "0 48px 32px 0", fontSize: "19px", lineHeight: "29px", color: "#3F4744" }}>{f.a}</p>
)}
</div>
))}
</div>
</section>

{/* final call to action */}
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px", boxSizing: "border-box" }}>
<div style={{ position: "relative", overflow: "hidden", borderRadius: "24px", padding: "clamp(48px, 6vw, 96px)", backgroundImage: "linear-gradient(135deg, #0E6B4F 0%, #07432F 60%, #031F16 100%)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "40px" }}>
<img src="/site-assets/africa-dots.svg" alt="" style={{ position: "absolute", right: "-40px", top: "-60px", width: "460px", opacity: "0.18" }} />
<div style={{ position: "relative", maxWidth: "820px" }}>
<h2 style={{ margin: "0", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em", color: "#FFFFFF" }}>Start verifying in the sandbox</h2>
<p style={{ margin: "18px 0 0", fontSize: "20px", lineHeight: "28px", color: "#CFE6DB" }}>Test every check with sample people, no contract needed.</p>
</div>
<div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "18px", fontWeight: "500" }}>
<a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 32px", borderRadius: "8px", background: "#FFFFFF", color: "#0A0C0E" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
<a href="#" style={{ display: "inline-flex", alignItems: "center", padding: "15.5px 32px", borderRadius: "8px", border: "1.25px solid rgba(255,255,255,0.45)", color: "#FFFFFF" }}>Talk to sales</a>
</div>
</div>
</section>


    </>
  );
}
