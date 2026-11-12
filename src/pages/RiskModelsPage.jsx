import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './rmodels.css';

const ACC = {
ind: [['Verified identity','Age comes from the verified date of birth on the ID, not from what the customer typed.'],['What the customer tells you','Country of residence and product tier come from your sign-up form.'],['Screening results','PEP, adverse media and sanctions come straight from screening and cannot be typed over.']],
biz: [['Company screening','The business is screened by its registered name and country of registration.'],['Product','The product tier the company signs up for.'],['More to come','Factors such as age of business and registry status are added as their data sources connect.']]
};
const TYPES = ['Individuals', 'Businesses'];
const CATALOG = {
0: [
['Age', 'ID verification', 'ID', 'From the verified date of birth on the customer’s ID.', 1],
['Country of residence', 'Customer form', 'MAN', 'Where the customer says they live.', 1],
['Product tier', 'Customer form', 'MAN', 'Which product or account tier they are joining.', 1],
['PEP', 'Screening', 'SCR', 'Whether screening finds them, or a relative, in public office.', 1],
['Adverse media', 'Screening', 'SCR', 'Whether screening finds financial crime news about them.', 1],
['Sanctions', 'Screening', 'SCR', 'No match, possible match or confirmed match. Drives the sanctions rule.', 1]],
1: [
['Product tier', 'Customer form', 'MAN', 'Which product or account tier the company is joining.', 1],
['Sanctions', 'Screening', 'SCR', 'The company screened by registered name and country of registration.', 1],
['Age of business', 'Business registry', 'REG', 'How long the company has been registered.', 0],
['Registry status', 'Business registry', 'REG', 'Whether the company is active, dormant or struck off.', 0]]
};
const FAQS = [
['Why use separate models for individuals and businesses?','They carry different risks and you know different things about them. Separate models let each use the factors, weights and thresholds that fit.'],
['Can we have more than one model per customer type?','You can keep as many versions as you like, but only one model is live per customer type at a time, so every customer of that type is scored the same way.'],
['Which factors can a business model use today?','Product tier and a sanctions check on the company. Factors such as age of business and registry status are added as their data sources connect.'],
['Can we add our own factors?','Every factor needs a real data source, so new ones are added to the catalog when we connect the data behind them. You then choose whether to use them in your model.'],
['What is checked before a model goes live?','That every score is between 0 and 100, that the thresholds cover the whole range with no gaps, that factor names are unique, and that the model has a sanctions rule.'],
['What happens to old scores when we change a model?','Nothing. They keep the version that scored them. New customers and reassessments use the new live version.'],
['Can we try both models first?','Yes. Build them in the sandbox and score sample people and companies.']
];

export default function RiskModelsPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  const loc = useLocation();
  useEffect(() => {
    document.title = "Intact ID \u2014 Individual and business risk models";
  }, []);
  useEffect(() => {
    if (!loc.hash) return;
    const t = setTimeout(() => { const el = document.getElementById(loc.hash.slice(1)); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    return () => clearTimeout(t);
  }, [loc.hash]);

const accVals = {};
Object.keys(ACC).forEach(k => { accVals[k] = ACC[k].map((x, i) => { const o = (S.acc || {})[k] === i || ((S.acc || {})[k] === undefined && i === 0); return { q: x[0], a: x[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ acc: Object.assign({}, S.acc, { [k]: o ? -1 : i }) }) }; }); });
const faqVals = FAQS.map((f, i) => { const o = (S.faq === undefined ? 0 : S.faq) === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ faq: o ? -1 : i }) }; });

const ti = S.t === undefined ? 0 : S.t;
const page = {
typeChips: TYPES.map((t, i) => ({ label: t, cls: 'chip' + (ti === i ? ' is-on' : ''), selected: ti === i ? 'true' : 'false', pick: () => set({ t: i }) })),
factors: CATALOG[ti].map(f => ({ name: f[0], src: f[1], srcCls: 'src src--' + f[2], desc: f[3], status: f[4] ? 'Available now' : 'Coming as data sources connect', cls: 'catf' + (f[4] ? '' : ' catf--soon') })),
catNote: ti === 0 ? 'Six factors available for individuals today.' : 'Two factors available for businesses today, with more on the way.'
};

  const acc = accVals;
  const faqs = faqVals;
  const { typeChips, factors, catNote } = page;

  return (
    <div className="pg-kyc pg-kyb pg-rmodels" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0px 56px 0px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 660px", minWidth: "min(100%, 420px)" }}>
<div className="eyepill"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="3" /><path d="M3 18c.8-2.6 2.6-4 5-4" /><rect x="13" y="9" width="8" height="12" rx="1" /></svg>Individual and business risk models</div>
<h1 className="h1">One risk model for people. Another for businesses.</h1>
<p className="lead">People and companies carry different risks. Score each with a model built for it, with its own factors, weights and thresholds, and change either one without touching the other.</p>
<div className="ctas"><a className="btn-primary" href="#">Book a demo <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn-ghost" href="#">Try the sandbox</a></div>
</div>
<div role="img" aria-label="Two risk models side by side: one for individuals with basic information, product and screening categories, and one for businesses with product and screening categories, each with its own thresholds." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="pp-stage" style={{ position: "relative", width: "760px", height: "520px", flex: "none" }}><div className="mc" style={{ left: "0px", animation: "rmodels-rmd1 10s infinite both" }}><div className="mc__h"><span className="mc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5" /></svg></span><div><b>Individuals</b><span>Retail customers</span></div><span className="pill pill--ok" style={{ marginLeft: "auto" }}>Live · v3</span></div><div className="sub" style={{ marginTop: "12px" }}>Category weights</div><div className="mc__r"><span>Basic information</span><span className="mc__w"><i style={{ width: "40%" }}></i></span><b>40%</b></div><div className="mc__r"><span>Product</span><span className="mc__w"><i style={{ width: "20%" }}></i></span><b>20%</b></div><div className="mc__r"><span>Screening</span><span className="mc__w"><i style={{ width: "40%" }}></i></span><b>40%</b></div><div className="bands" style={{ marginTop: "12px" }}><span className="b1">Low 0–39</span><span className="b2">Med 40–69</span><span className="b3">High 70+</span></div></div><div className="mc" style={{ left: "390px", animation: "rmodels-rmd2 10s infinite both" }}><div className="mc__h"><span className="mc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 8h3M8 12h3M8 16h3" /></svg></span><div><b>Businesses</b><span>SME accounts</span></div><span className="pill pill--ok" style={{ marginLeft: "auto" }}>Live · v1</span></div><div className="sub" style={{ marginTop: "12px" }}>Category weights</div><div className="mc__r"><span>Product</span><span className="mc__w"><i style={{ width: "30%" }}></i></span><b>30%</b></div><div className="mc__r"><span>Screening</span><span className="mc__w"><i style={{ width: "70%" }}></i></span><b>70%</b></div><div className="bands" style={{ marginTop: "12px" }}><span className="b1">Low 0–34</span><span className="b2">Med 35–64</span><span className="b3">High 65+</span></div></div><div className="mnote" style={{ animation: "rmodels-rmd3 10s infinite both" }}>One live model for each customer type. Each has its own factors, weights and thresholds.</div></div></div>
</div>

</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Different customers, different questions.</h2><div className="vgrid"><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5" /></svg></span><h3>Individuals</h3></div><p>Who is this person, where do they live, which product are they using, and does screening find anything?</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 8h3M8 12h3M8 16h3" /></svg></span><h3>Businesses</h3></div><p>Which product is the company using, and does screening find the company on a sanctions list?</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg></span><h3>One live model each</h3></div><p>Each customer type has exactly one live model, so every customer is scored the same way.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg></span><h3>Same audit trail</h3></div><p>Both models keep the same factor-by-factor record for every score.</p></div></div></section>

<section id="factors" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">The factors each model can use</h2>
<p className="sub2">Every factor has a real data source behind it, so a score is never built on information nobody collected.</p>
<div className="cat">
<div className="tm-chips" role="tablist" style={{ margin: "0 0 20px" }}>{typeChips.map((c, ci) => (<Fragment key={ci}><button className={c.cls} type="button" role="tab" aria-selected={c.selected} onClick={c.pick}>{c.label}</button></Fragment>))}</div>
<div className="cat__grid">
{factors.map((f, fi) => (<Fragment key={fi}><div className={f.cls}><div className="cat__top"><b>{f.name}</b><span className={f.srcCls}>{f.src}</span></div><p>{f.desc}</p><span className="cat__st">{f.status}</span></div></Fragment>))}
</div>
<p className="cat__foot">{catNote}</p>
</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Two models, side by side</h2><div id="individual"></div><div className="feat"><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>Retail customers · v3</b><span className="pill pill--ok">Live</span></div><div className="rl"><div className="rl__t"><b>Basic information</b><span>Age, country of residence</span></div><span className="rl__hits">Weight 40%</span></div><div className="rl"><div className="rl__t"><b>Product</b><span>Product tier</span></div><span className="rl__hits">Weight 20%</span></div><div className="rl"><div className="rl__t"><b>Screening</b><span>PEP, adverse media, sanctions</span></div><span className="rl__hits">Weight 40%</span></div><div className="sub" style={{ marginTop: "12px" }}>Rule · Age</div><div className="rulebox"><span>18 to 24</span><b>40</b></div><div className="rulebox"><span>25 to 60</span><b>10</b></div><div className="rulebox"><span>Over 60</span><b>30</b></div></div></div><div className="ftxt"><h3>For individuals</h3><p className="fp">Built from verified identity, what the customer tells you, the product they use and what screening finds.</p><div className="accs">{acc.ind.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div></div><div id="business"></div><div className="feat"><div className="ftxt"><h3>For businesses</h3><p className="fp">Built from the product the company uses and a sanctions check on the company itself, with more business factors added as data sources connect.</p><div className="accs">{acc.biz.map((a, ai) => (<Fragment key={ai}><div className="acc"><button className="acc__q" type="button" aria-expanded={a.expanded} onClick={a.toggle}><span>{a.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: a.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{a.open && (<><p className="acc__a">{a.a}</p></>)}</div></Fragment>))}</div></div><div className="fvis"><div className="ui" style={{ width: "90%" }}><div className="ui__h"><b>SME accounts · v1</b><span className="pill pill--ok">Live</span></div><div className="rl"><div className="rl__t"><b>Product</b><span>Product tier</span></div><span className="rl__hits">Weight 30%</span></div><div className="rl"><div className="rl__t"><b>Screening</b><span>Company sanctions check</span></div><span className="rl__hits">Weight 70%</span></div><div className="sub" style={{ marginTop: "12px" }}>Screened by</div><div className="rulebox"><span>Registered name</span><b>Savanna Logistics Ltd</b></div><div className="rulebox"><span>Country of registration</span><b>Kenya</b></div><div className="ovr" style={{ marginTop: "12px", background: "#F2F6F4", color: "#3F4744" }}><b>Sanctions rule</b><span>A confirmed match makes the business high risk</span></div></div></div></div></section>

<section id="versions" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Change a model safely</h2>
<p className="sub2">Every change is a new version. Customers already scored keep the version that scored them.</p>
<div className="life">
<div className="life__s"><span className="life__n">Draft</span><b>Edit freely</b><p>Build or change categories, factors, rules and thresholds. Nothing live is affected.</p></div>
<div className="life__a" aria-hidden="true"></div>
<div className="life__s life__s--on"><span className="life__n">Live</span><b>Checked, then switched on</b><p>Before going live the model is checked: scores from 0 to 100, thresholds with no gaps, and a sanctions rule in place.</p></div>
<div className="life__a" aria-hidden="true"></div>
<div className="life__s"><span className="life__n">Retired</span><b>Kept, never deleted</b><p>When a new version goes live, the old one is retired and stays on record for every assessment it made.</p></div>
</div></section>

<section aria-labelledby="faq-title" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 id="faq-title" className="h2">Questions teams ask us</h2><div className="faqs">{faqs.map((f, fi) => (<Fragment key={fi}><div className="faqi"><button className="faq" type="button" aria-expanded={f.expanded} onClick={f.toggle}><span>{f.q}</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", transform: f.rot }}><path d="m6 9 6 6 6-6" /></svg></button>{f.open && (<><p className="faqa">{f.a}</p></>)}</div></Fragment>))}</div></section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 112px", boxSizing: "border-box" }}>
<div className="endcta"><img src="/site-assets/africa-dots.svg" alt="" className="endcta__map" />
<div style={{ position: "relative", maxWidth: "760px" }}><h2>Set up your individual and business models</h2><p>Build both in the sandbox and score sample people and companies.</p></div>
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
