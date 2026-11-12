import { Fragment, useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './pricing.css';

const ACC = {};
const SERVICES = [
{ key: 'doc', name: 'ID document check', note: 'Reads the ID and checks it is real and valid' },
{ key: 'xcheck', name: 'Data cross-check', note: 'Compares the details across the document', needs: ['doc'] },
{ key: 'live', name: 'Selfie and liveness', note: 'Confirms a real person is present' },
{ key: 'face', name: 'Face match', note: 'Matches the selfie to the ID photo', needs: ['doc', 'live'] }
];
const EXTRA = [
{ key: 'iprs', name: 'IPRS registry match', note: 'Confirms Kenyan ID details with the national register' },
{ key: 'aml', name: 'Sanctions and PEP', note: 'Screens against sanctions, PEP and watchlists' },
{ key: 'cra', name: 'Customer risk assessment', note: 'Scores each customer low, medium or high' }
];
const SOON = [{ key: 'poa', name: 'Proof of address' }, { key: 'age', name: 'Age check' }];
const VOL = [['500', 500], ['1,000', 1000], ['5,000', 5000], ['10,000+', 10000]];
const FAQS = [
['How does the free trial work?','You get 14 days and 150 checks to build a workflow, test it in the sandbox and run real verifications. After that you pay per verification.'],
['What am I charged for?','Each verification run through a live workflow is charged at that workflow’s price. Tests in the sandbox are free.'],
['How is a custom workflow priced?','Every check has its own price, and a workflow costs the sum of its checks. You see the price in the builder before you publish, and it stays fixed for that version.'],
['Do I pay for checks a workflow does not use?','No. The widget only asks for what your workflow needs and only those checks run, so you only pay for them.'],
['Can I change plans later?','Yes. Switch plans or edit your workflow at any time. Verifications already in progress keep the version and price they started with.'],
['Do you offer volume discounts?','Yes. For larger monthly volumes or several workflows, talk to us about volume pricing.'],
['How are registry, screening and risk checks priced?','IPRS registry match, sanctions and PEP screening and customer risk assessment are available now and priced with your volume. Proof of address and age checks are coming soon; talk to us if you need them early.']
];

export default function PricingPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  useEffect(() => {
    document.title = "Intact ID \u2014 Pricing";
  }, []);

const accVals = {};
Object.keys(ACC).forEach(k => { accVals[k] = ACC[k].map((x, i) => { const o = (S.acc || {})[k] === i || ((S.acc || {})[k] === undefined && i === 0); return { q: x[0], a: x[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ acc: Object.assign({}, S.acc, { [k]: o ? -1 : i }) }) }; }); });
const faqVals = FAQS.map((f, i) => { const o = (S.faq === undefined ? 0 : S.faq) === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ faq: o ? -1 : i }) }; });

const on = Object.assign({ doc: true, xcheck: true, live: true, face: true }, S.svc || {});
const toggle = (k) => {
  const n = Object.assign({}, on, { [k]: !on[k] });
  const all = SERVICES.concat(EXTRA, SOON);
  if (n[k]) { (all.find(s => s.key === k).needs || []).forEach(d => { n[d] = true; }); }
  else { all.forEach(s => { if ((s.needs || []).includes(k)) n[s.key] = false; }); }
  set({ svc: n });
};
const added = SERVICES.filter(s => on[s.key]).map(s => s.key);
const anySoon = SOON.some(s => on[s.key]);
const anyExtra = EXTRA.some(s => on[s.key]);
const vol = VOL[S.vol === undefined ? 1 : S.vol][1];
let q;
if (!added.length && !anySoon && !anyExtra) q = { label: 'Your price', price: '—', unit: 'Pick at least one check', per: 0, cta: 'Start free trial', note: '' };
else if (anySoon || anyExtra) q = { label: 'Your price', price: 'Custom', unit: 'per verification, quoted for your volume', per: 0, cta: 'Get a quote', note: anySoon ? 'Includes checks that are coming soon. We will price this workflow with you and give you early access.' : 'Registry, screening and risk checks are priced with your volume. Tell us roughly how many verifications you run and we will quote the full workflow.' };
else if (on.live || on.face) q = { label: 'Matches Standard KYC', price: '$1.50', unit: 'per verification', per: 1.5, cta: 'Start free trial', note: '' };
else q = { label: 'Matches ID check', price: '$1.10', unit: 'per verification', per: 1.1, cta: 'Start free trial', note: '' };
if (on.face) q.note = q.note || 'Face match needs the ID document and a selfie, so both are included.';
q.month = q.per ? (vol >= 10000 ? 'Talk to us' : '$' + (q.per * vol).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })) : ((anySoon || anyExtra) ? 'On quote' : '—');
if (vol >= 10000 && q.per) q.cta = 'Talk to sales about volume';
const page = {
svcs: SERVICES.map(s => ({ name: s.name, note: s.note, cls: 'svcb' + (on[s.key] ? ' is-on' : ''), pressed: on[s.key] ? 'true' : 'false', toggle: () => toggle(s.key) })),
extra: EXTRA.map(s => ({ name: s.name, note: s.note, cls: 'svcb' + (on[s.key] ? ' is-on' : ''), pressed: on[s.key] ? 'true' : 'false', toggle: () => toggle(s.key) })),
soon: SOON.map(s => ({ name: s.name, cls: 'svcb is-soon' + (on[s.key] ? ' is-on' : ''), pressed: on[s.key] ? 'true' : 'false', toggle: () => toggle(s.key) })),
flow: SERVICES.concat(EXTRA, SOON).filter(s => on[s.key]).map(s => ({ name: s.name })),
volChips: VOL.map((v, i) => { const sel = (S.vol === undefined ? 1 : S.vol) === i; return { label: v[0], cls: 'chip' + (sel ? ' is-on' : ''), selected: sel ? 'true' : 'false', pick: () => set({ vol: i }) }; }),
quote: q
};

  void accVals;
  const faqs = faqVals;
  const { svcs, extra, soon, flow, volChips, quote } = page;

  return (
    <div className="pg-kyc pg-kyb pg-pricing" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "40px 56px 0px", boxSizing: "border-box" }}>
<div style={{ textAlign: "center" }}>
<h1 className="ph1">Pricing that follows your workflow</h1>
<p className="plead">Try Intact ID free for 14 days with 150 checks included.<br />Pay per verification after that, and change plans whenever you need to.</p>
</div>
<div className="plans">
<div className="plan">
<h2>ID check</h2>
<div className="price"><b>$1.10</b><span>per<br />verification</span></div>
<p>For lower-risk products that need to confirm a real, valid ID before letting someone in.</p>
<a href="#" className="pbtn">Start free trial</a>
<div className="inc">Includes</div>
<ul><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>ID document check</span></li><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>Data cross-check</span></li><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>Dashboard and manual review</span></li><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>Sandbox and API</span></li></ul>
</div>
<div className="plan plan--pop">
<span className="pop">Most chosen</span>
<h2>Standard KYC</h2>
<div className="price"><b>$1.50</b><span>per<br />verification</span></div>
<p>For regulated onboarding: confirm the ID and that the person holding it is real and present.</p>
<a href="#" className="pbtn pbtn--dark">Start free trial</a>
<div className="inc">Everything in ID check, plus</div>
<ul><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>Selfie and liveness</span></li><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>Face match with the ID photo</span></li><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>Automatic approve, reject or review</span></li><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>Audit trail for every decision</span></li></ul>
</div>
<div className="plan plan--talk">
<h2>Let’s talk</h2>
<div className="price price--talk"><span>Custom workflows<br />and volume pricing</span></div>
<p>For larger volumes, business verification, or a workflow built around your own risk rules.</p>
<a href="#" className="pbtn">Talk to sales</a>
<div className="inc">Everything in Standard KYC, plus</div>
<ul><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>Your own workflow, priced per service</span></li><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>Business verification (KYB)</span></li><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>IPRS registry match (Kenya)</span></li><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>Sanctions and PEP screening</span></li><li><span className="tk"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span><span>Customer risk assessment</span></li><li><span className="soon">Soon</span><span>Proof of address</span></li></ul>
</div>
</div>
<p className="fine">Prices in US dollars. You only pay for verifications run on live workflows; the sandbox is free.</p>
</section>

<section aria-labelledby="b-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}>
<h2 id="b-title" className="h2">Build your workflow, see your price</h2>
<p className="sub2">Pick the checks you need. A workflow costs the sum of its checks, and you see that price while you build it in the dashboard.</p>
<div className="bld">
<div className="bld__pick">
<div className="q">Checks</div>
<div className="svc">
{svcs.map((s, si) => (<Fragment key={si}><button className={s.cls} type="button" aria-pressed={s.pressed} onClick={s.toggle}><span className="svc__box"></span><span className="svc__t"><b>{s.name}</b><span>{s.note}</span></span></button></Fragment>))}
</div>
<div className="q" style={{ marginTop: "28px" }}>More checks, priced with you</div>
<div className="svc">
{extra.map((s, si) => (<Fragment key={si}><button className={s.cls} type="button" aria-pressed={s.pressed} onClick={s.toggle}><span className="svc__box"></span><span className="svc__t"><b>{s.name}</b><span>{s.note}</span></span></button></Fragment>))}
</div>
<div className="q" style={{ marginTop: "28px" }}>Coming soon</div>
<div className="svc">
{soon.map((s, si) => (<Fragment key={si}><button className={s.cls} type="button" aria-pressed={s.pressed} onClick={s.toggle}><span className="svc__box"></span><span className="svc__t"><b>{s.name}</b><span>Available on request</span></span></button></Fragment>))}
</div>
</div>
<div className="bld__out">
<div className="flow" aria-label="Your workflow">
<span className="wfn wfn--end">Start</span>
{flow.map((f, fi) => (<Fragment key={fi}><span className="arr" aria-hidden="true"></span><span className="wfn">{f.name}</span></Fragment>))}
<span className="arr" aria-hidden="true"></span><span className="wfn wfn--end">Decision</span>
</div>
{quote.note && (<><div className="note">{quote.note}</div></>)}
<div className="qprice"><span>{quote.label}</span><b>{quote.price}</b><em>{quote.unit}</em></div>
<div className="q" style={{ color: "#CFE6DB" }}>Verifications per month</div>
<div className="tm-chips">{volChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" aria-pressed={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div>
<div className="est"><span>Estimated monthly cost</span><b>{quote.month}</b></div>
<a href="#" className="bcta">{quote.cta} <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div>
</div>
</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Every plan includes</h2><div className="vgrid"><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v6L4 19a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L14 8V2" /><path d="M8.5 2h7M7 15h10" /></svg></span><h3>Free sandbox</h3></div><p>Test every workflow with sample people before going live.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="7" height="5" rx="1.5" /><rect x="14" y="15" width="7" height="5" rx="1.5" /><path d="M6.5 9v3.5a2 2 0 0 0 2 2H14" /></svg></span><h3>Workflow builder</h3></div><p>Drag checks into place, add conditions and publish without code.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5" /></svg></span><h3>Manual review</h3></div><p>Your team approves or rejects the cases that need a person.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg></span><h3>Audit trail</h3></div><p>The exact path each verification took, saved for your auditors.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" /></svg></span><h3>API, SDKs and webhooks</h3></div><p>A hosted link, web and mobile SDKs, and signed webhooks.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></svg></span><h3>Support from people</h3></div><p>Help with setup and questions from a team in your time zone.</p></div></div></section>

<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 id="faq-title" className="h2">Pricing questions</h2><div className="faqs">{faqs.map((f, fi) => (<Fragment key={fi}><div className="faqi"><button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{f.open && (<><p className="faqa">{f.a}</p></>)}</div></Fragment>))}</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 112px", boxSizing: "border-box" }}>
<div className="endcta"><img src="/site-assets/africa-dots.svg" alt="" className="endcta__map" />
<div style={{ position: "relative", maxWidth: "760px" }}><h2>Start with 150 free checks</h2><p>14 days to build a workflow, test it in the sandbox and run real verifications.</p></div>
<div className="ctas" style={{ position: "relative", margin: "0" }}><a href="#" className="btn-white">Start free trial <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a href="#" className="btn-line">Talk to sales</a></div></div>
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
