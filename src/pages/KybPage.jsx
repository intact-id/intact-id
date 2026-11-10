import { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';

const KT = {
company: { chips: [
['Registry lookup','Confirm the company exists and is in good standing','Look up the registration number, status, type and registered office directly in the national business registry.'],
['Document check','Check company documents against the record','A CR12, certificate of incorporation or registry extract is read and matched against the live registry, so an edited PDF stands out.'],
['Tax and licences','Confirm tax and licence details','Check the tax PIN and, for regulated sectors, the licence number with the issuing body where it is available.']]},
owners: { chips: [
['Ownership map','See who really owns the business','Shares held through other companies are followed down to the people at the end, and anyone over your threshold is marked as an owner.'],
['Directors','Know who runs the company','Directors and officers come straight from the registry record, with their appointment dates.']]},
screen: { chips: [
['Sanctions & PEP','Screen the company and every person behind it','The business, its directors and its owners are checked against sanctions and PEP lists in one go.'],
['Adverse media','Spot bad news before you onboard','News about fraud, corruption or financial crime linked to the company or its people is flagged for review.'],
['Ongoing monitoring','Rescreen automatically','Everyone is rechecked daily, and you are told when a new match appears.']]},
people: { chips: [
['Director KYC','Verify each director and owner in minutes','Each person gets a secure link to verify with their ID and a selfie, and results join the company case file.'],
['Authorised signatories','Confirm who can act for the business','Check that the person opening the account is allowed to act for the company before you accept instructions.']]}
};
const FAQS = [
['What is KYB verification?','Know Your Business (KYB) is how you confirm a company is real, in good standing and owned and run by the people it says. It covers the company record, its directors and owners, and screening all of them.'],
['Which business registries do you connect to?','We connect to the business registries in Kenya, Nigeria, Ghana, Uganda, Tanzania and Rwanda, including BRS and CR12 in Kenya and CAC in Nigeria.'],
['How do you find the beneficial owners?','We read the shareholders from the registry and, where a shareholder is another company, look that company up too, until we reach the people at the end. Anyone above your threshold, 25% by default, is marked as an owner.'],
['Do directors need to do KYC too?','You decide. Most teams verify every owner and at least one director. Each person gets their own link, and the result is added to the company case file.'],
['What if a registry is unavailable?','The check is retried, and you can choose a fallback such as document checks or manual review. A business is never rejected just because a government system is down.'],
['Can you monitor businesses after onboarding?','Yes. We rescreen the company and its people daily and tell you when directors, owners or status change.'],
['How do we add KYB to our product?','Use the hosted onboarding link, the dashboard, or the API. Results come back through signed webhooks.'],
['Can we try it first?','Yes. The sandbox has sample companies, ownership structures and screening hits, so you can test the full flow before going live.']
];

export default function KybPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [kt, setKt] = useState('company');
  const [chipIdx, setChipIdx] = useState(0);
  const [faq, setFaq] = useState(0);

  useEffect(() => {
    document.title = 'Intact ID — Business verification (KYB) for Africa';
  }, []);

  const chipsData = KT[kt].chips;
  const ci = Math.min(chipIdx, chipsData.length - 1);
  const ktab = (k) => ({ cls: 'ktab' + (kt === k ? ' is-on' : ''), selected: kt === k ? 'true' : 'false', pick: () => { setKt(k); setChipIdx(0); } });
  const ktTabs = { company: ktab('company'), owners: ktab('owners'), screen: ktab('screen'), people: ktab('people') };
  const ktIs = { company: kt === 'company', owners: kt === 'owners', screen: kt === 'screen', people: kt === 'people' };
  const chip = { title: chipsData[ci][1], text: chipsData[ci][2] };
  const chips = chipsData.map((c, i) => ({ label: c[0], cls: 'devtab' + (i === ci ? ' is-on' : ''), selected: i === ci ? 'true' : 'false', pick: () => setChipIdx(i) }));
  const faqs = FAQS.map((f, i) => { const o = faq === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => setFaq(o ? -1 : i) }; });

  return (
    <div className="pg-kyc pg-kyb" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
{/* hero */}
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0 56px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 704px", minWidth: "min(100%, 420px)" }}>
<div style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "40px", padding: "8px 16px", boxSizing: "border-box", borderRadius: "24px", background: "#DCEFE5", color: "#16181D", fontSize: "16px" }}>
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 8h3M8 12h3M8 16h3" /></svg>
Business verification (KYB)</div>
<h1 style={{ margin: "12px 0 0", fontWeight: "500", fontSize: "clamp(38px, 4.2vw, 56px)", lineHeight: "1.1", color: "#16181D" }}>Verify businesses at the registry, not from a PDF</h1>
<p style={{ margin: "16px 0 0", fontSize: "20px", lineHeight: "28px", color: "#16181D" }}>Confirm the company, see who runs it and who owns it, and screen every one of them, straight from Africa&apos;s business registries.</p>
<div style={{ display: "flex", gap: "8px", marginTop: "32px", flexWrap: "wrap", fontSize: "18px", fontWeight: "500", lineHeight: "25.2px" }}>
<a className="btn-primary" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "8px" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
<a className="btn-ghost" href="#" style={{ padding: "15.5px 32px", borderRadius: "8px", border: "1.25px solid #DEE2E6", display: "inline-flex", alignItems: "center", gap: "8px" }}>See a sample result <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" /></svg></a>
</div>
</div>

{/* hero visual: ownership map that builds itself, then loops */}
<div role="img" aria-label="Animated illustration: a company is checked, its director, a shareholder company and a representative are added to an ownership map, the beneficial owner is asked to complete KYC, and every company check turns green." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
<div className="hb-stage" style={{ position: "relative", width: "760px", height: "500px", flex: "none" }}>
<div className="hb-card" style={{ left: "0", top: "30px", width: "250px", flexDirection: "column", alignItems: "stretch", gap: "14px", animation: "kyb-hb1 10s infinite both" }}><div style={{ display: "flex", alignItems: "center", gap: "12px" }}><span className="hb-ico"><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0A0C0E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 8h3M8 12h3M8 16h3" /></svg></span><div className="hb-name" style={{ fontSize: "17px", lineHeight: "1.25", whiteSpace: "normal" }}>Savanna Logistics Ltd</div></div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span className="hb-pill">Processing</span><span className="hb-meta" style={{ margin: "0" }}>Company</span></div></div>
<span className="hb-dot" style={{ left: "241px", top: "51px", animation: "kyb-hb2 10s infinite both" }}><svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg></span>
<span className="hb-line hb-line--h" style={{ left: "259px", top: "60px", width: "37px", transformOrigin: "left", animation: "kyb-hb3 10s infinite both" }}></span>
<span className="hb-line hb-line--v" style={{ left: "268px", top: "60px", height: "226px", transformOrigin: "top", animation: "kyb-hb4 10s infinite both" }}></span>
<span className="hb-line hb-line--h" style={{ left: "268px", top: "173px", width: "28px", transformOrigin: "left", animation: "kyb-hb5 10s infinite both" }}></span>
<span className="hb-line hb-line--h" style={{ left: "268px", top: "286px", width: "28px", transformOrigin: "left", animation: "kyb-hb6 10s infinite both" }}></span>
<div className="hb-card" style={{ left: "296px", top: "24px", width: "230px", animation: "kyb-hb7 10s infinite both" }}><img src="/site-assets/person-1.webp" alt="" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", flex: "none" }} /><div style={{ minWidth: "0" }}><span className="hb-pill hb-pill--ok">Approved</span><div className="hb-name">Grace Achieng</div><div className="hb-meta"><span className="hb-cc">KE</span>Director</div></div></div>
<div className="hb-card" style={{ left: "296px", top: "137px", width: "230px", animation: "kyb-hb8 10s infinite both" }}><span className="hb-ico" style={{ width: "48px", height: "48px" }}><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0A0C0E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 8h3M8 12h3M8 16h3" /></svg></span><div style={{ minWidth: "0" }}><span className="hb-pill">Processing</span><div className="hb-name">Highland Capital Ltd</div><div className="hb-meta">Shareholder · 40%</div></div></div>
<div className="hb-card" style={{ left: "296px", top: "250px", width: "230px", animation: "kyb-hb9 10s infinite both" }}><img src="/site-assets/person-6.webp" alt="" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", flex: "none" }} /><div style={{ minWidth: "0" }}><span className="hb-pill hb-pill--ok">Approved</span><div className="hb-name">Akosua Mensah</div><div className="hb-meta"><span className="hb-cc">GH</span>Representative</div></div></div>
<span className="hb-dot" style={{ left: "517px", top: "164px", animation: "kyb-hb10 10s infinite both" }}><svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg></span>
<span className="hb-line hb-line--h" style={{ left: "535px", top: "173px", width: "21px", transformOrigin: "left", animation: "kyb-hb11 10s infinite both" }}></span>
<div className="hb-ubo" style={{ left: "556px", top: "24px", width: "204px", animation: "kyb-hb12 10s infinite both" }}><img src="/site-assets/person-3.webp" alt="" style={{ display: "block", width: "100%", height: "196px", objectFit: "cover" }} /><div style={{ padding: "12px 14px 14px", background: "#FFFFFF" }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}><span className="hb-name" style={{ margin: "0" }}>Brian Okello</span><span style={{ position: "relative", width: "18px", height: "18px", flex: "none" }}><span className="hb-out" style={{ position: "absolute", inset: "0", animation: "kyb-hb13 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "kyb-hb14 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span></div><div className="hb-meta" style={{ gap: "8px" }}><span className="hb-cc">UG</span>Owner<span className="hb-tag">KYC requested</span></div></div></div>
<div className="hb-card" style={{ left: "40px", top: "214px", width: "220px", flexDirection: "column", alignItems: "stretch", gap: "0", padding: "18px", animation: "kyb-hb25 10s infinite both" }}><div style={{ fontSize: "17px", fontWeight: "500", marginBottom: "6px" }}>Company check</div><div className="hb-row"><span style={{ position: "relative", width: "20px", height: "20px", flex: "none" }}><span className="hb-out" style={{ position: "absolute", inset: "0", animation: "kyb-hb15 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "kyb-hb16 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><div><div className="hb-lab">Company status</div><div className="hb-val">Active</div></div></div><div className="hb-row"><span style={{ position: "relative", width: "20px", height: "20px", flex: "none" }}><span className="hb-out" style={{ position: "absolute", inset: "0", animation: "kyb-hb17 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "kyb-hb18 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><div><div className="hb-lab">Ownership structure</div><div className="hb-val">Retrieved and verified</div></div></div><div className="hb-row"><span style={{ position: "relative", width: "20px", height: "20px", flex: "none" }}><span className="hb-out" style={{ position: "absolute", inset: "0", animation: "kyb-hb19 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "kyb-hb20 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><div><div className="hb-lab">Watchlists</div><div className="hb-val">No matches found</div></div></div><div className="hb-row"><span style={{ position: "relative", width: "20px", height: "20px", flex: "none" }}><span className="hb-out" style={{ position: "absolute", inset: "0", animation: "kyb-hb23 10s infinite both" }}><svg className="spin" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E959C" strokeWidth="2.2" strokeLinecap="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg></span><span style={{ position: "absolute", inset: "0", animation: "kyb-hb24 10s infinite both" }}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1DB980" /><path d="m7 12.3 3.2 3.2L17 8.8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span><div><div className="hb-lab">Owner verification</div><div className="hb-val"><span style={{ position: "relative", display: "inline-block", minWidth: "110px", height: "18px" }}><span className="hb-out" style={{ position: "absolute", left: "0", top: "0", whiteSpace: "nowrap", animation: "kyb-hb21 10s infinite both" }}>In progress</span><span style={{ position: "absolute", left: "0", top: "0", whiteSpace: "nowrap", animation: "kyb-hb22 10s infinite both" }}>Completed</span></span></div></div></div></div>
</div>
</div>
</div>

{/* registry strip */}
<div aria-label="Business registries we connect to" role="group" style={{ marginTop: "72px", height: "56px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px", flexWrap: "wrap", fontWeight: "600", fontSize: "30px", letterSpacing: "-0.01em", color: "#8E959C" }}>
<span>BRS</span><span>CR12</span><span>CAC</span><span>RGD</span><span>URSB</span><span>BRELA</span><span>RDB</span>
</div>

{/* feature row */}
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "16px", padding: "128px 0 120px" }}>
<div style={{ paddingTop: "32px" }}>
<div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3 3 7.5h18L12 3Z" /></svg></div>
<h3 className="kb-h3">Registry lookup</h3>
<p className="kb-p">Registration number, status, address and filing date, taken live from the national business registry.</p>
</div>
<div style={{ paddingTop: "32px" }}>
<div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3.5 19c.8-3 3-4.6 5.5-4.6s4.7 1.6 5.5 4.6M15 14.6c2.5-.4 4.7.9 5.5 3.9" /></svg></div>
<h3 className="kb-h3">Directors and shareholders</h3>
<p className="kb-p">Everyone on the company record, with their roles and shareholding, pulled in automatically.</p>
</div>
<div style={{ paddingTop: "32px" }}>
<div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="5" rx="1.5" /><rect x="3" y="16" width="6" height="5" rx="1.5" /><rect x="15" y="16" width="6" height="5" rx="1.5" /><path d="M12 8v4M6 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" /></svg></div>
<h3 className="kb-h3">Beneficial ownership</h3>
<p className="kb-p">Follow shares through other companies to the real people who own or control the business.</p>
</div>
<div style={{ paddingTop: "32px" }}>
<div className="kb-ico"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.3-4.3M8.5 11h5" /></svg></div>
<h3 className="kb-h3">Entity screening</h3>
<p className="kb-p">The company and every person behind it checked against sanctions, PEP and adverse media.</p>
</div>
</div>
</section>

{/* platform: tabs */}
<section aria-labelledby="plat-title" style={{ background: "#F2F6F4" }}>
<div className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 150px", boxSizing: "border-box" }}>
<h2 id="plat-title" style={{ margin: "0 auto", maxWidth: "900px", textAlign: "center", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em" }}>Know every business you work with, and the people behind it</h2>
<p style={{ margin: "20px auto 0", maxWidth: "820px", textAlign: "center", fontSize: "20px", lineHeight: "28px", color: "#3F4744" }}>One flow from company lookup to the last director&apos;s selfie.</p>

<div role="tablist" aria-label="KYB capabilities" style={{ marginTop: "72px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px 32px", padding: "0 16px", borderBottom: "2px dotted #C3CBC7" }}>
<button className={ktTabs.company.cls} type="button" role="tab" aria-selected={ktTabs.company.selected} onClick={ktTabs.company.pick}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18" /></svg>Verify the company</button>
<button className={ktTabs.owners.cls} type="button" role="tab" aria-selected={ktTabs.owners.selected} onClick={ktTabs.owners.pick}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="5" rx="1.5" /><rect x="3" y="16" width="6" height="5" rx="1.5" /><rect x="15" y="16" width="6" height="5" rx="1.5" /><path d="M12 8v4M6 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" /></svg>Map ownership</button>
<button className={ktTabs.screen.cls} type="button" role="tab" aria-selected={ktTabs.screen.selected} onClick={ktTabs.screen.pick}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.3-4.3" /></svg>Screen everyone</button>
<button className={ktTabs.people.cls} type="button" role="tab" aria-selected={ktTabs.people.selected} onClick={ktTabs.people.pick}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>Onboard their people</button>
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

{/* visual: company record */}
{ktIs.company && (<>
<div style={{ width: "620px", maxWidth: "100%", borderRadius: "18px", background: "#FFFFFF", boxShadow: "0 24px 60px rgba(10,40,28,0.16)", padding: "28px", boxSizing: "border-box" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "22px", fontWeight: "600" }}>Savanna Logistics Ltd</span><span style={{ padding: "5px 12px", borderRadius: "999px", background: "#E3F6EC", color: "#0A6B47", fontSize: "14px", fontWeight: "600" }}>Registered</span></div>
<div style={{ marginTop: "6px", fontSize: "14px", color: "#5B6461" }}>Source: Business Registration Service, Kenya · live lookup</div>
<div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px", fontSize: "15px" }}>
<div className="kb-kv"><span>Registration no.</span><b>PVT-••••7Q2</b></div>
<div className="kb-kv"><span>Type</span><b>Private limited</b></div>
<div className="kb-kv"><span>Incorporated</span><b>12 Jun 2019</b></div>
<div className="kb-kv"><span>Tax PIN</span><b>Valid</b></div>
<div className="kb-kv"><span>Registered office</span><b>Nairobi</b></div>
<div className="kb-kv"><span>Last annual return</span><b>2026</b></div>
</div>
<div style={{ marginTop: "18px", display: "flex", alignItems: "center", gap: "12px", padding: "14px", borderRadius: "12px", background: "#F2F6F4", fontSize: "14px" }}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B5D45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5" /></svg><span style={{ flex: "1" }}>CR12 extract, issued today</span><span style={{ color: "#0A6B47", fontWeight: "600" }}>Matches registry</span></div>
</div>
</>)}

{/* visual: ownership tree */}
{ktIs.owners && (<>
<div style={{ position: "relative", width: "680px", maxWidth: "100%", height: "480px" }}>
<svg aria-hidden="true" width="680" height="480" viewBox="0 0 680 480" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} fill="none" stroke="#9AA6A0" strokeWidth="2"><path d="M340 92v50M120 142h440M120 142v40M340 142v40M560 142v40M560 262v40M460 302h200M460 302v30M660 302v30" /></svg>
<div className="own own--co" style={{ left: "50%", top: "20px", transform: "translateX(-50%)", background: "#0B5D45", color: "#FFFFFF", borderColor: "#0B5D45" }}><b>Savanna Logistics Ltd</b><span style={{ color: "#CFE6DB" }}>The company</span></div>
<div className="own" style={{ left: "0", top: "182px" }}><b>Grace Achieng</b><span>Director · 60%</span><i className="own__tag">Owner</i></div>
<div className="own" style={{ left: "50%", top: "182px", transform: "translateX(-50%)" }}><b>Akosua Mensah</b><span>Director · 30%</span><i className="own__tag">Owner</i></div>
<div className="own" style={{ right: "0", top: "182px" }}><b>Highland Capital Ltd</b><span>Shareholder · 10%</span></div>
<div className="own" style={{ left: "390px", top: "332px", width: "150px" }}><b>Amina Salim</b><span>50% of Highland</span></div>
<div className="own" style={{ right: "-10px", top: "332px", width: "150px" }}><b>Brian Okello</b><span>50% of Highland</span></div>
<div style={{ position: "absolute", left: "0", bottom: "0", padding: "10px 14px", borderRadius: "10px", background: "#0A0C0E", color: "#FFFFFF", fontSize: "13px" }}>Owner threshold: 25%</div>
</div>
</>)}

{/* visual: screening */}
{ktIs.screen && (<>
<div style={{ width: "620px", maxWidth: "100%", borderRadius: "18px", background: "#FFFFFF", boxShadow: "0 24px 60px rgba(10,40,28,0.16)", padding: "28px", boxSizing: "border-box" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "22px", fontWeight: "600" }}>Screening results</span><span style={{ fontSize: "14px", color: "#5B6461" }}>5 checked</span></div>
<div style={{ marginTop: "16px", fontSize: "15px" }}>
<div className="kb-scr"><span>Savanna Logistics Ltd</span><span className="kb-ok">Clear</span></div>
<div className="kb-scr"><span>Grace Achieng</span><span className="kb-ok">Clear</span></div>
<div className="kb-scr"><span>Akosua Mensah</span><span className="kb-warn">PEP match · review</span></div>
<div className="kb-scr"><span>Highland Capital Ltd</span><span className="kb-ok">Clear</span></div>
<div className="kb-scr"><span>Amina Salim</span><span className="kb-ok">Clear</span></div>
</div>
<div style={{ marginTop: "16px", padding: "14px", borderRadius: "12px", background: "#FDF1E2", color: "#6B3A08", fontSize: "14px", lineHeight: "1.45" }}>Akosua Mensah may match a politically exposed person. Sent to review with the source record attached.</div>
<div style={{ marginTop: "12px", fontSize: "13px", color: "#5B6461" }}>Lists: UN, OFAC, EU, UK · PEP · adverse media. Rechecked daily.</div>
</div>
</>)}

{/* visual: director KYC links */}
{ktIs.people && (<>
<div style={{ width: "620px", maxWidth: "100%", borderRadius: "18px", background: "#FFFFFF", boxShadow: "0 24px 60px rgba(10,40,28,0.16)", padding: "28px", boxSizing: "border-box" }}>
<div style={{ fontSize: "22px", fontWeight: "600" }}>Verify the people</div>
<div style={{ marginTop: "6px", fontSize: "14px", color: "#5B6461" }}>Each person gets their own secure link by SMS or email</div>
<div style={{ marginTop: "16px", fontSize: "15px" }}>
<div className="kb-scr"><span style={{ display: "flex", alignItems: "center", gap: "12px" }}><img src="/site-assets/person-1.webp" alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />Grace Achieng</span><span className="kb-ok">Verified</span></div>
<div className="kb-scr"><span style={{ display: "flex", alignItems: "center", gap: "12px" }}><img src="/site-assets/person-6.webp" alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />Akosua Mensah</span><span className="kb-warn">Link opened</span></div>
<div className="kb-scr"><span style={{ display: "flex", alignItems: "center", gap: "12px" }}><img src="/site-assets/person-5.webp" alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />Amina Salim</span><span className="kb-grey">Link sent</span></div>
</div>
<div style={{ marginTop: "18px", display: "flex", gap: "8px", fontSize: "14px", fontWeight: "600" }}><span style={{ padding: "9px 14px", borderRadius: "8px", border: "1px solid #E1E6E3" }}>Resend link</span><span style={{ padding: "9px 14px", borderRadius: "8px", background: "#0B5D45", color: "#FFFFFF" }}>Add a person</span></div>
</div>
</>)}

</div>
</div>
</div>
</section>

{/* dark: one case file per business */}
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<div style={{ borderRadius: "24px", background: "#0A0D0C", color: "#FFFFFF", display: "flex", flexWrap: "wrap", gap: "48px", padding: "clamp(40px, 4vw, 64px)", boxSizing: "border-box", overflow: "hidden" }}>
<div style={{ flex: "1 1 520px", minWidth: "min(100%, 320px)", display: "flex", flexDirection: "column" }}>
<h2 style={{ margin: "0", maxWidth: "720px", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.1", letterSpacing: "-0.02em" }}>One case file for every business</h2>
<p style={{ margin: "20px 0 0", maxWidth: "600px", fontSize: "20px", lineHeight: "28px", color: "#B9C6C0" }}>The registry record, documents, owners and every check, in one place you can export when the regulator asks.</p>
<span style={{ flex: "1", minHeight: "120px" }}></span>
<a href="#" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "15.5px 28px", borderRadius: "8px", fontSize: "18px", fontWeight: "500", background: "#1DB980", color: "#0A0C0E" }}>Get started <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div>
<div style={{ flex: "1 1 640px", minWidth: "min(100%, 320px)", display: "grid", gap: "12px" }}>
<div className="case"><b>Registry record</b><span>BRS · pulled 10 Nov 2026, 09:14</span><i>Saved</i></div>
<div className="case"><b>CR12 extract</b><span>Matches the registry</span><i>Saved</i></div>
<div className="case"><b>Ownership map</b><span>2 owners over 25%</span><i>Saved</i></div>
<div className="case"><b>Director KYC</b><span>3 people · 1 waiting</span><i>In progress</i></div>
<div className="case"><b>Screening</b><span>1 PEP match reviewed and cleared</span><i>Saved</i></div>
<div className="case"><b>Decision</b><span>Approved by compliance, with reason</span><i>Saved</i></div>
</div>
</div>
</section>

{/* product tours */}
<section aria-labelledby="tour-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "150px 56px 0", boxSizing: "border-box" }}>
<h2 id="tour-title" style={{ margin: "0 auto", maxWidth: "940px", textAlign: "center", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em" }}>See how business onboarding comes together</h2>
<div style={{ marginTop: "64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "12px" }}>
<article className="tour">
<div className="tour__v" style={{ background: "#F6F9F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
<div style={{ width: "82%", borderRadius: "12px", background: "#FFFFFF", boxShadow: "0 12px 30px rgba(10,40,28,0.1)", padding: "18px", boxSizing: "border-box", fontSize: "14px" }}>
<div style={{ fontSize: "13px", color: "#5B6461" }}>Company name or number</div>
<div style={{ marginTop: "8px", padding: "12px", border: "1px solid #E1E6E3", borderRadius: "8px" }}>Savanna Logi|</div>
<div style={{ marginTop: "8px", padding: "12px", borderRadius: "8px", background: "#F2F6F4" }}><b style={{ fontWeight: "600" }}>Savanna Logistics Ltd</b><div style={{ fontSize: "12px", color: "#5B6461", marginTop: "2px" }}>Kenya · Registered</div></div>
</div>
</div>
<h3>Find the company</h3>
<p>Search by name or registration number and pull the official record in one step.</p>
<a href="#">See how it works <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</article>
<article className="tour">
<div className="tour__v" style={{ background: "#F6F9F7", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
<div style={{ width: "86%", height: "88%", borderRadius: "12px 12px 0 0", background: "#FFFFFF", boxShadow: "0 12px 30px rgba(10,40,28,0.1)", padding: "18px", boxSizing: "border-box", fontSize: "13px" }}>
<div style={{ fontSize: "15px", fontWeight: "600" }}>Business checks · Standard</div>
<div style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
<div className="lvl"><b>1</b>Registry lookup</div>
<div className="lvl"><b>2</b>Ownership over 25%</div>
<div className="lvl"><b>3</b>KYC for each owner</div>
<div className="lvl"><b>4</b>Screen company and people</div>
</div>
</div>
</div>
<h3>Choose the checks</h3>
<p>Set which checks run for each business type, country and risk level, without code.</p>
<a href="#">See how it works <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</article>
<article className="tour">
<div className="tour__v" style={{ background: "#F6F9F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
<div style={{ width: "82%", borderRadius: "12px", background: "#FFFFFF", boxShadow: "0 12px 30px rgba(10,40,28,0.1)", padding: "18px", boxSizing: "border-box", fontSize: "14px", display: "grid", gap: "10px" }}>
<div style={{ display: "flex", justifyContent: "space-between" }}><b style={{ fontWeight: "600" }}>Annual return filed</b><span style={{ color: "#0A6B47" }}>Today</span></div>
<div style={{ display: "flex", justifyContent: "space-between" }}><b style={{ fontWeight: "600" }}>New director added</b><span style={{ color: "#8A4B0B" }}>Review</span></div>
<div style={{ display: "flex", justifyContent: "space-between" }}><b style={{ fontWeight: "600" }}>Screening rerun</b><span style={{ color: "#0A6B47" }}>Clear</span></div>
</div>
</div>
<h3>Keep it up to date</h3>
<p>Get told when a company&apos;s directors, owners or status change, and rescreen automatically.</p>
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
<h2 style={{ margin: "0", fontWeight: "500", fontSize: "clamp(40px, 4.2vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em", color: "#FFFFFF" }}>Verify your first business in the sandbox</h2>
<p style={{ margin: "18px 0 0", fontSize: "20px", lineHeight: "28px", color: "#CFE6DB" }}>Sample companies, owners and screening hits, no contract needed.</p>
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
