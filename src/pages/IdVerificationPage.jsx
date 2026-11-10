import { Fragment, useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './idv.css';

const ACC = {
cap: [['Live guidance','Customers see whether their photo is too dark, blurred or cropped before they take it.'],['Built for real conditions','Works on basic phones, in poor light and on slow networks, with compressed uploads.'],['Upload or camera','Let customers take a photo or upload one, depending on your risk settings.']],
auth: [['Tamper checks','Looks for edited text, replaced photos and mismatched fonts.'],['Screen and copy detection','Spots photos of screens, printouts and screenshots instead of the real card.'],['Data consistency','Compares the front, back and barcode, and checks that dates and numbers make sense.']]
};
const COUNTRIES = [
['Kenya', [['National ID', 'Older ID and Maisha Namba'], ['Passport', 'Kenyan e-passport'], ['Driving licence', 'Smart DL'], ['Alien ID', 'Foreign residents']], 'Registry match with IPRS.'],
['Nigeria', [['NIN slip and card', 'National identity number'], ['Passport', 'Nigerian e-passport'], ['Driver’s licence', 'FRSC licence'], ['Voter’s card', 'Permanent voter card']], 'Registry match with NIN; BVN where you have consent.'],
['Ghana', [['Ghana Card', 'National ID card'], ['Passport', 'Ghanaian passport'], ['Driver’s licence', 'DVLA licence'], ['Voter ID', 'Electoral Commission card']], 'Registry match with the Ghana Card database.'],
['Uganda', [['National ID', 'NIRA card'], ['Passport', 'Ugandan e-passport'], ['Driving permit', 'Smart driving permit']], 'Registry match with NIRA.'],
['Tanzania', [['National ID', 'NIDA card'], ['Passport', 'Tanzanian e-passport'], ['Driving licence', 'Smart licence'], ['Voter ID', 'NEC card']], 'Registry match with NIDA.'],
['Rwanda', [['National ID', 'NIDA Rwanda card'], ['Passport', 'Rwandan e-passport'], ['Driving licence', 'Rwandan licence']], 'Registry match with NIDA Rwanda.'],
['Other countries', [['Passport', 'Passports from around the world'], ['National ID', 'Many national ID cards'], ['Residence permit', 'For foreign residents']], 'Document checks without a registry match.']
];
const FAQS = [
['What is ID document verification?','It is checking that an identity document is real, valid and belongs to the person presenting it, by reading it, checking for signs of forgery and, where possible, confirming it with the issuing registry.'],
['Which documents do you support?','National IDs, passports, driving licences, voter cards and residence permits across the markets we serve, plus passports from other countries.'],
['Do you read both sides?','Yes. We read the front and back, including barcodes and the machine-readable zone where present.'],
['How do you detect fake documents?','We look for edited text, replaced photos, inconsistent data and photos of screens or printouts.'],
['Do you check documents against registries?','Yes, in countries where a registry is available, such as IPRS in Kenya, NIN in Nigeria and the Ghana Card database.'],
['Does it work on low-end phones?','Yes. Capture is designed for basic smartphones, poor light and slow networks.'],
['Can customers upload a photo instead of using the camera?','You decide. Camera-only capture is stricter; uploads can be allowed for lower-risk flows.'],
['Can we try it first?','Yes. The sandbox includes sample documents, including some designed to fail.']
];

export default function IdVerificationPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  useEffect(() => {
    document.title = "Intact ID \u2014 ID document checks for Africa";
  }, []);

const accVals = {};
Object.keys(ACC).forEach(k => { accVals[k] = ACC[k].map((x, i) => { const o = (S.acc || {})[k] === i || ((S.acc || {})[k] === undefined && i === 0); return { q: x[0], a: x[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ acc: Object.assign({}, S.acc, { [k]: o ? -1 : i }) }) }; }); });
const faqVals = FAQS.map((f, i) => { const o = (S.faq === undefined ? 0 : S.faq) === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ faq: o ? -1 : i }) }; });

const chipsOf = (list, key, def) => list.map((c, i) => { const on = (S[key] === undefined ? def : S[key]) === i; return { label: c, cls: 'chip' + (on ? ' is-on' : ''), selected: on ? 'true' : 'false', pick: () => set({ [key]: i }) }; });
const ci = S.cty === undefined ? 0 : S.cty;
const page = { ctyChips: chipsOf(COUNTRIES.map(x => x[0]), 'cty', 0), docs: { list: COUNTRIES[ci][1].map(d => ({ name: d[0], note: d[1] })), foot: COUNTRIES[ci][2] } };

  const acc = accVals;
  const faqs = faqVals;
  const { ctyChips, docs } = page;

  return (
    <div className="pg-kyc pg-kyb pg-idv" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
{/* hero */}
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0 56px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 704px", minWidth: "min(100%, 420px)" }}>
<div style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "40px", padding: "8px 16px", boxSizing: "border-box", borderRadius: "24px", background: "#DCEFE5", color: "#16181D", fontSize: "16px" }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M14 10h4M14 14h3M6 16c.6-1.2 1.7-2 3-2s2.4.8 3 2" /></svg>ID document checks</div>
<h1 style={{ margin: "12px 0 0", fontWeight: "500", fontSize: "clamp(38px, 4.2vw, 56px)", lineHeight: "1.1", color: "#16181D" }}>Check ID documents in seconds, then confirm them at the source</h1>
<p style={{ margin: "16px 0 0", fontSize: "20px", lineHeight: "28px", color: "#16181D" }}>Read national IDs, passports and driving licences from across Africa, spot forgeries and edits, and match the details with the national registry.</p>
<div style={{ display: "flex", gap: "8px", marginTop: "32px", flexWrap: "wrap", fontSize: "18px", fontWeight: "500", lineHeight: "25.2px" }}>
<a className="btn-primary" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "8px" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
<a className="btn-ghost" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", border: "1.25px solid #DEE2E6", display: "inline-flex", alignItems: "center", gap: "8px" }}>See supported documents <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div>
</div>
<div role="img" aria-label="Animated illustration: an ID card is scanned, its details are read one by one, and authenticity checks and a registry match turn green." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pp-stage" style={{ position: "relative", width: "760px", height: "520px", flex: "none" }}><div className="pp-card" style={{ position: "absolute", left: "0", top: "40px", width: "360px", padding: "18px", animation: "idv-idv14 10s infinite both" }}><div style={{ position: "relative", width: "100%", aspectRatio: "1.586", borderRadius: "16px", backgroundImage: "linear-gradient(135deg, #E9F5EE 0%, #C8E6D6 100%)", padding: "18px", boxSizing: "border-box", overflow: "hidden" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", color: "#0B5D45" }}><span>NATIONAL ID</span><span>SPECIMEN</span></div><div style={{ display: "flex", gap: "14px", marginTop: "12px" }}><img src="/site-assets/person-1.webp" alt="" style={{ width: "84px", height: "104px", borderRadius: "8px", objectFit: "cover" }} /><div style={{ display: "grid", gap: "7px", flex: "1" }}><span style={{ height: "9px", width: "80%", borderRadius: "4px", background: "rgba(11,93,69,0.35)" }}></span><span style={{ height: "9px", width: "60%", borderRadius: "4px", background: "rgba(11,93,69,0.25)" }}></span><span style={{ height: "9px", width: "70%", borderRadius: "4px", background: "rgba(11,93,69,0.25)" }}></span><span style={{ height: "9px", width: "50%", borderRadius: "4px", background: "rgba(11,93,69,0.25)" }}></span></div></div><span style={{ position: "absolute", left: "0", right: "0", height: "3px", background: "#1DB980", boxShadow: "0 0 14px #1DB980", top: "50%", animation: "idv-idv13 10s infinite both" }}></span></div><div style={{ marginTop: "10px" }}><div className="row" style={{ animation: "idv-idv1 10s infinite both" }}><span style={{ flex: "1", color: "#5B6461" }}>Name</span><b style={{ fontWeight: "600" }}>Grace Achieng</b></div><div className="row" style={{ animation: "idv-idv2 10s infinite both" }}><span style={{ flex: "1", color: "#5B6461" }}>Date of birth</span><b style={{ fontWeight: "600" }}>14 Mar 1994</b></div><div className="row" style={{ animation: "idv-idv3 10s infinite both" }}><span style={{ flex: "1", color: "#5B6461" }}>ID number</span><b style={{ fontWeight: "600" }}>•••• 4192</b></div><div className="row" style={{ animation: "idv-idv4 10s infinite both" }}><span style={{ flex: "1", color: "#5B6461" }}>Expires</span><b style={{ fontWeight: "600" }}>12 Jun 2031</b></div></div></div><div className="pp-card" style={{ position: "absolute", left: "400px", top: "110px", width: "360px", padding: "22px", animation: "idv-idv15 10s infinite both" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "16px", fontWeight: "600" }}>Document checks</span><span style={{ position: "relative", display: "inline-block", width: "80px", height: "22px" }}><span className="pill pill--info pp-out" style={{ position: "absolute", right: "0", top: "0", animation: "idv-idv16 10s infinite both" }}>Checking</span><span className="pill pill--ok" style={{ position: "absolute", right: "0", top: "0", animation: "idv-idv17 10s infinite both" }}>Verified</span></span></div><div style={{ marginTop: "8px" }}><div className="row"><span style={{ position: "relative", width: "18px", height: "18px", flex: "none", display: "inline-block" }}><span className="pp-out" style={{ position: "absolute", inset: "0", animation: "idv-idv5 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "idv-idv6 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><span style={{ flex: "1" }}>Readable and in focus</span></div><div className="row"><span style={{ position: "relative", width: "18px", height: "18px", flex: "none", display: "inline-block" }}><span className="pp-out" style={{ position: "absolute", inset: "0", animation: "idv-idv7 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "idv-idv8 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><span style={{ flex: "1" }}>Security features</span></div><div className="row"><span style={{ position: "relative", width: "18px", height: "18px", flex: "none", display: "inline-block" }}><span className="pp-out" style={{ position: "absolute", inset: "0", animation: "idv-idv9 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "idv-idv10 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><span style={{ flex: "1" }}>No signs of editing</span></div><div className="row"><span style={{ position: "relative", width: "18px", height: "18px", flex: "none", display: "inline-block" }}><span className="pp-out" style={{ position: "absolute", inset: "0", animation: "idv-idv11 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "idv-idv12 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><span style={{ flex: "1" }}>Matches national registry</span></div></div></div></div></div>
</div>

<div aria-label="Documents we check" role="group" style={{ marginTop: "72px", height: "56px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px", flexWrap: "wrap", fontWeight: "600", fontSize: "30px", letterSpacing: "-0.01em", color: "#8E959C" }}><span>National ID</span><span>Ghana Card</span><span>NIN</span><span>Passport</span><span>Driving licence</span><span>Voter card</span><span>Alien ID</span></div>

</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<h2 className="pp-h2" style={{ maxWidth: "900px", margin: "0 auto 64px" }}>Faster sign-ups, fewer fake documents</h2>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px" }}>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg></div><h3 className="kb-h3">Quick capture</h3><p className="kb-p">Guided capture with live feedback on glare, blur and framing, built for low-end phones.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h10M4 18h7" /></svg></div><h3 className="kb-h3">Accurate reading</h3><p className="kb-p">Names, numbers and dates read from the front and back, including barcodes and MRZ.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg></div><h3 className="kb-h3">Forgery detection</h3><p className="kb-p">Checks for edited text, swapped photos, screenshots and photos of screens.</p></div>
<div style={{ paddingTop: "8px" }}><div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3 3 7.5h18L12 3Z" /></svg></div><h3 className="kb-h3">Registry match</h3><p className="kb-p">Where available, the details are confirmed with the government record.</p></div>
</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}><h2 className="pp-h2">ID document check features</h2><div className="pp-feat"><div className="pp-fvis"><div style={{ width: "300px", borderRadius: "40px", background: "#FFFFFF", border: "8px solid #E5ECE8", boxShadow: "0 30px 70px rgba(0,0,0,0.25)", padding: "24px 18px", boxSizing: "border-box" }}><div style={{ textAlign: "center", fontSize: "18px", fontWeight: "600" }}>Front of your ID</div><div style={{ marginTop: "14px", position: "relative", aspectRatio: "1.586", borderRadius: "12px", background: "#1F2523", overflow: "hidden" }}><div style={{ position: "absolute", inset: "10%", border: "3px solid #1DB980", borderRadius: "10px" }}></div></div><div style={{ marginTop: "14px", display: "grid", gap: "8px", fontSize: "13px" }}><div style={{ display: "flex", alignItems: "center", gap: "8px" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>All four corners visible</div><div style={{ display: "flex", alignItems: "center", gap: "8px" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>No glare</div><div style={{ display: "flex", alignItems: "center", gap: "8px" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>In focus</div></div><div style={{ marginTop: "16px", height: "44px", borderRadius: "10px", background: "#0B5D45", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600" }}>Capturing…</div></div></div><div className="pp-ftxt"><h3 className="pp-fh">Capture that works on any phone</h3><p className="pp-fp">Clear on-screen guidance gets a good photo first time, even on a basic smartphone or a slow network.</p><div style={{ marginTop: "28px" }}>{acc.cap.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div><div className="pp-feat"><div className="pp-ftxt"><h3 className="pp-fh">Spot fakes and edits</h3><p className="pp-fp">Each document is checked for signs of tampering, so a convincing fake does not get through on looks alone.</p><div style={{ marginTop: "28px" }}>{acc.auth.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div><div className="pp-fvis"><div className="pp-card" style={{ width: "540px", maxWidth: "100%" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "18px", fontWeight: "600" }}>Authenticity report</span><span className="pill pill--bad">Rejected</span></div><div className="row"><span style={{ flex: "1" }}>Document type recognised</span><span className="pill pill--ok">Kenya national ID</span></div><div className="row"><span style={{ flex: "1" }}>Photo replaced</span><span className="pill pill--bad">Detected</span></div><div className="row"><span style={{ flex: "1" }}>Text edited</span><span className="pill pill--ok">Not found</span></div><div className="row"><span style={{ flex: "1" }}>Photo of a screen</span><span className="pill pill--ok">Not found</span></div><div className="row"><span style={{ flex: "1" }}>Expiry date</span><span className="pill pill--ok">Valid</span></div><div style={{ marginTop: "12px", padding: "12px", borderRadius: "10px", background: "#FBE3E3", color: "#8C2626", fontSize: "13px" }}>The face on this card does not match the original print area.</div></div></div></div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<h2 className="pp-h2">Supported documents</h2>
<p className="pp-sub">Pick a country to see which documents we check.</p>
<div style={{ marginTop: "48px", padding: "36px", borderRadius: "24px", background: "#F2F6F4" }}>
<div className="tm-chips" role="tablist" style={{ margin: "0" }}>{ctyChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" role="tab" aria-selected={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div>
<div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "12px" }}>
{docs.list.map((d, di) => (<Fragment key={di}><div style={{ background: "#FFFFFF", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "8px" }}><b style={{ fontSize: "18px", fontWeight: "500" }}>{d.name}</b><span style={{ fontSize: "14px", color: "#5B6461" }}>{d.note}</span></div></Fragment>))}
</div>
<p style={{ margin: "20px 0 0", fontSize: "15px", color: "#5B6461" }}>{docs.foot}</p>
</div>
</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<div style={{ borderRadius: "24px", background: "#0A0D0C", color: "#FFFFFF", display: "flex", flexWrap: "wrap", gap: "48px", padding: "clamp(40px, 4vw, 64px)", boxSizing: "border-box" }}>
<div style={{ flex: "1 1 520px", minWidth: "min(100%, 320px)", display: "flex", flexDirection: "column" }}>
<h2 style={{ margin: "0", maxWidth: "720px", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.1", letterSpacing: "-0.02em" }}>Built for African IDs</h2>
<p style={{ margin: "20px 0 0", maxWidth: "600px", fontSize: "20px", lineHeight: "28px", color: "#B9C6C0" }}>Our checks are trained on the documents your customers actually carry, old and new.</p>
<span style={{ flex: "1", minHeight: "80px" }}></span>
<a href="#" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 28px", borderRadius: "8px", fontSize: "18px", fontWeight: "500", background: "#1DB980", color: "#0A0C0E" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div>
<div style={{ flex: "1 1 640px", minWidth: "min(100%, 320px)", display: "grid", gap: "12px", alignContent: "center" }}><div className="case"><b>Old and new formats</b><span>Older IDs and the new digital cards, such as Maisha Namba</span></div><div className="case"><b>Both sides read</b><span>Front and back, including barcodes where present</span></div><div className="case"><b>Registry confirmation</b><span>IPRS, NIN, Ghana Card, NIRA and NIDA lookups</span></div><div className="case"><b>Evidence kept</b><span>Images, results and timestamps saved for audit</span></div></div>
</div>
</section>

{/* FAQ */}
<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}><h2 id="faq-title" className="pp-h2">Frequently asked questions</h2><div style={{ maxWidth: "900px", margin: "56px auto 0" }}>{faqs.map((f, fi) => (<Fragment key={fi}><div style={{ borderBottom: "1px solid #E1E6E3" }}><button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{f.open && (<><p style={{ margin: "0", padding: "0 48px 32px 0", fontSize: "19px", lineHeight: "29px", color: "#3F4744" }}>{f.a}</p></>)}</div></Fragment>))}</div></section>

{/* final call to action */}
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px", boxSizing: "border-box" }}>
<div style={{ position: "relative", overflow: "hidden", borderRadius: "24px", padding: "clamp(48px, 6vw, 96px)", backgroundImage: "linear-gradient(135deg, #0E6B4F 0%, #07432F 60%, #031F16 100%)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "40px" }}>
<img src="/site-assets/africa-dots.svg" alt="" style={{ position: "absolute", right: "-40px", top: "-60px", width: "460px", opacity: "0.18" }} />
<div style={{ position: "relative", maxWidth: "820px" }}>
<h2 style={{ margin: "0", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em", color: "#FFFFFF" }}>Check a sample ID in the sandbox</h2>
<p style={{ margin: "18px 0 0", fontSize: "20px", lineHeight: "28px", color: "#CFE6DB" }}>See what is read, what is checked and what the result looks like.</p>
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
