import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';

// The same destinations as the desktop menus, grouped for a phone screen. Links without a page yet are left out.
const GROUPS = [
  { title: 'Products', sections: [
    { title: 'Verification', links: [['Identity verification (KYC)', '/kyc'], ['Business verification (KYB)', '/kyb'], ['ID document checks', '/id-verification'], ['Biometrics & liveness', '/liveness'], ['Reusable KYC', '/reusable-kyc']] },
    { title: 'Screening', links: [['Sanctions & PEP', '/aml-screening'], ['Adverse media', '/aml-screening'], ['Ongoing monitoring', '/aml-screening']] },
    { title: 'Transaction monitoring', links: [['Real-time transaction screening', '/real-time-screening'], ['Rules & typologies', '/rules-and-typologies'], ['Behavioural anomaly detection', '/anomaly-detection'], ['Alerts & case management', '/alerts-and-cases'], ['Customer risk assessment', '/customer-risk-assessment'], ['Regulatory reporting (STR/SAR)', '/regulatory-reporting'], ['Agentic transaction screening', '/agentic-screening']] },
    { title: 'Platform', links: [['Explainable risk scoring', '/auditable-risk-scoring']] },
  ] },
  { title: 'Solutions', sections: [
    { title: 'Compliance', links: [['KYC compliance', '/kyc'], ['AML transaction monitoring', '/transaction-monitoring'], ['KYB (business verification)', '/kyb'], ['AML compliance', '/aml-screening']] },
    { title: 'Customer risk assessment', links: [['Configurable risk models', '/risk-models'], ['Onboarding & ongoing reassessment', '/customer-risk-assessment'], ['Auditable score breakdowns', '/auditable-risk-scoring']] },
    { title: 'Fraud', links: [['Fraud prevention', '/fraud-prevention'], ['Identity fraud', '/identity-fraud'], ['New account fraud', '/identity-fraud#new-accounts'], ['Account takeover', '/account-takeover'], ['Payment fraud', '/payment-fraud'], ['Money muling', '/money-muling']] },
  ] },
  { title: 'Company', sections: [
    { title: null, links: [['About us', '/about'], ['Careers', '/careers'], ['Partners', '/partners'], ['Security & data protection', '/security'], ['Contact us', '/contact']] },
  ] },
];

/** Menu button and full-screen menu for small screens. Hidden on desktop by nav.css. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState(null);
  const [top, setTop] = useState(64);
  const loc = useLocation();

  useEffect(() => { setOpen(false); }, [loc.pathname, loc.hash]);
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <button type="button" className="mnav-btn" aria-expanded={open} aria-controls="mobileMenu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={(e) => { const h = e.currentTarget.closest('header'); if (h) setTop(Math.round(h.getBoundingClientRect().bottom)); setOpen((o) => !o); }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {createPortal(<div id="mobileMenu" className="mnav" hidden={!open} style={{ '--mnav-top': `${top}px` }}>
        <nav aria-label="Mobile">
          {GROUPS.map((g) => (
            <div key={g.title} className="mnav-g">
              <button type="button" className="mnav-h" aria-expanded={group === g.title} onClick={() => setGroup((x) => (x === g.title ? null : g.title))}>
                {g.title}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {group === g.title && (
                <div className="mnav-body">
                  {g.sections.map((s) => (
                    <div key={s.title || g.title} className="mnav-s">
                      {s.title && <p>{s.title}</p>}
                      {s.links.map(([label, to]) => <Link key={label} to={to} onClick={() => setOpen(false)}>{label}</Link>)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link className="mnav-h mnav-plain" to="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
          <div className="mnav-cta">
            <Link className="mnav-primary" to="/apply" onClick={() => setOpen(false)}>Get started</Link>
            <a className="mnav-secondary" href="https://portal.intact-io.com/">Log in</a>
          </div>
          <p className="mnav-mail">Questions? <a href="mailto:contact@intact-io.com">contact@intact-io.com</a></p>
        </nav>
      </div>, document.body)}
    </>
  );
}
