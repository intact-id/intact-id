import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './careers.css';

const ACC = {};
const FAQS = [];
const ROLES = [
{ title: 'Frontend and mobile intern', type: 'Internship', where: 'Nairobi, Kenya', stack: ['JavaScript', 'React', 'React Native'],
  about: 'Help build the screens our clients and their customers use every day: the verification widget, the mobile SDK and the compliance dashboard.',
  do: ['Build and polish screens in React and React Native', 'Turn designs into working, accessible components', 'Fix bugs and learn how verification and compliance products work'],
  want: ['Comfortable with JavaScript and React', 'Some React Native, or keen to learn it', 'Curious, careful and happy to ask questions'] },
{ title: 'Junior backend developer', type: 'Full time', where: 'Nairobi, Kenya', stack: ['Java', 'Spring Boot', 'Python', 'Go (a plus)', 'Docker', 'GitHub Actions', 'Jenkins'],
  about: 'Work on the services behind verification, screening, risk assessment and transaction monitoring.',
  do: ['Build and maintain APIs in Java and Spring Boot, with some Python', 'Package and ship services with Docker', 'Keep build and deploy pipelines running in GitHub Actions and Jenkins'],
  want: ['Java and Spring Boot experience, from work or serious projects', 'Python; Go is a plus', 'Docker, and some CI/CD with GitHub Actions or Jenkins'] }
];

export default function CareersPage() {
  const [promoClosed, setPromoClosed] = useState(false);
  const [S, setS] = useState({});
  const set = (o) => setS((s) => ({ ...s, ...o }));

  const loc = useLocation();
  useEffect(() => {
    document.title = "Intact ID \u2014 Careers";
  }, []);
  useEffect(() => {
    if (!loc.hash) return;
    const t = setTimeout(() => { const el = document.getElementById(loc.hash.slice(1)); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    return () => clearTimeout(t);
  }, [loc.hash]);

const accVals = {};
Object.keys(ACC).forEach(k => { accVals[k] = ACC[k].map((x, i) => { const o = (S.acc || {})[k] === i || ((S.acc || {})[k] === undefined && i === 0); return { q: x[0], a: x[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ acc: Object.assign({}, S.acc, { [k]: o ? -1 : i }) }) }; }); });
const faqVals = FAQS.map((f, i) => { const o = (S.faq === undefined ? 0 : S.faq) === i; return { q: f[0], a: f[1], open: o, expanded: o ? 'true' : 'false', rot: o ? 'rotate(180deg)' : 'none', toggle: () => set({ faq: o ? -1 : i }) }; });

const oi = S.open === undefined ? 0 : S.open;
const page = { roles: ROLES.map((r, i) => { const o = oi === i; return { title: r.title, type: r.type, where: r.where, about: r.about, open: o, expanded: o ? 'true' : 'false', label: o ? 'Hide details' : 'See details', toggle: () => set({ open: o ? -1 : i }),
  stack: r.stack.map(t => ({ t })), do: r.do.map(t => ({ t })), want: r.want.map(t => ({ t })), mail: 'mailto:contact@intact-io.com?subject=' + encodeURIComponent('Application: ' + r.title) }; }) };

  void accVals;
  void faqVals;
  const { roles } = page;

  return (
    <div className="pg-kyc pg-kyb pg-careers" style={{ zoom: "0.8", fontFamily: "Geist, system-ui, sans-serif", color: "#0A0C0E", background: "#FFFFFF", minHeight: "125vh", position: "relative" }}>
      <Nav />
<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "0px 56px 0px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", paddingTop: "24px" }}>
<div style={{ flex: "0 1 660px", minWidth: "min(100%, 420px)" }}>
<div className="eyepill"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>Careers</div>
<h1 className="h1">Help build compliance for Africa.</h1>
<p className="lead">We are a team in Nairobi building the identity, screening and monitoring tools African businesses rely on. If you like hard problems that matter, come and work with us.</p>
<div className="ctas"><a className="btn-primary" href="#roles">See open roles <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a><a className="btn-ghost" href="mailto:contact@intact-io.com">Email us</a></div>
</div>
<div role="img" aria-label="Two open roles: frontend and mobile intern, and junior backend developer, both in Nairobi." style={{ flex: "0 1 896px", minWidth: "min(100%, 420px)", aspectRatio: "896 / 738", borderRadius: "24px", background: "#F2F6F4", display: "flex", flexDirection: "column", justifyContent: "center", gap: "14px", padding: "48px", boxSizing: "border-box" }}><div className="ui" style={{ maxWidth: "none" }}><div className="ui__h"><b>Frontend and mobile intern</b><span className="pill pill--info">Internship</span></div><div className="stack"><span>JavaScript</span><span>React</span><span>React Native</span></div></div><div className="ui" style={{ maxWidth: "none" }}><div className="ui__h"><b>Junior backend developer</b><span className="pill pill--ok">Full time</span></div><div className="stack"><span>Java</span><span>Spring Boot</span><span>Python</span><span>Go</span><span>Docker</span><span>GitHub Actions</span><span>Jenkins</span></div></div><div style={{ fontSize: "14px", color: "#5B6461" }}>Nairobi, Kenya</div></div>
</div>
</section>

<section className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 0px", boxSizing: "border-box" }}><h2 className="h2">Why work at Intact ID</h2><div className="vgrid"><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18" /></svg></span><h3>Work that matters</h3></div><p>What you build helps businesses across Africa serve real people safely.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" /></svg></span><h3>Real engineering</h3></div><p>APIs, mobile SDKs, scoring engines and pipelines that run in production.</p></div><div className="vc"><div className="vc__h"><span className="vc__i"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 12h18" /></svg></span><h3>Learn fast</h3></div><p>You will work across the product and grow quickly.</p></div></div></section>

<section id="roles" className="wrap" style={{ maxWidth: "1920px", margin: "0 auto", padding: "112px 56px 112px", boxSizing: "border-box" }}><h2 className="h2">Open roles</h2>
<div className="roles">
{roles.map((r, ri) => (<Fragment key={ri}><div className="role">
<button className="role__h" type="button" aria-expanded={r.expanded} onClick={r.toggle}><div><b>{r.title}</b><span>{r.type} · {r.where}</span></div><span className="role__more">{r.label}</span></button>
<div className="stack" style={{ marginTop: "14px" }}>{r.stack.map((s, si) => (<Fragment key={si}><span>{s.t}</span></Fragment>))}</div>
{r.open && (<><div className="role__b">
<p>{r.about}</p>
<div className="role__cols"><div><b>What you will do</b><ul>{r.do.map((x, xi) => (<Fragment key={xi}><li>{x.t}</li></Fragment>))}</ul></div>
<div><b>What we are looking for</b><ul>{r.want.map((x, xi) => (<Fragment key={xi}><li>{x.t}</li></Fragment>))}</ul></div></div>
<a className="btn-primary role__apply" href={r.mail}>Apply by email <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
</div></>)}
</div></Fragment>))}
</div>
<p className="sub2" style={{ marginTop: "28px" }}>Do not see your role? Write to <a href="mailto:contact@intact-io.com" className="inl">contact@intact-io.com</a> and tell us what you would build.</p></section>

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
