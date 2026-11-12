import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { formatServerDate, getApplicationStatus } from '../lib/api.js';
import './kyc.css';
import './kyb.css';
import './apply.css';

// How each backend status reads to the applicant, and where it sits on the progress line.
const STATUS = {
  SUBMITTED: { step: 0, tone: 'info', label: 'Received', text: 'We have your application. Our team will start reviewing it soon.' },
  PENDING: { step: 1, tone: 'info', label: 'In review', text: 'Our team is checking your details.' },
  INFO_REQUESTED: { step: 1, tone: 'warn', label: 'We need more information', text: 'We have emailed your company address about what we need. Reply to that email, or write to contact@intact-io.com with your application number.' },
  PENDING_APPROVAL: { step: 2, tone: 'info', label: 'Final approval', text: 'Your application passed the first review and is waiting for final approval.' },
  APPROVED: { step: 3, tone: 'ok', label: 'Approved', text: 'Your API credentials have been sent to your company email.' },
  REJECTED: { step: -1, tone: 'bad', label: 'Not approved', text: 'We have emailed your company address with the reason. If you have questions, write to contact@intact-io.com with your application number.' },
};
const STEPS = ['Received', 'In review', 'Final approval', 'Approved'];
const REF = /^APP-[A-Z0-9-]{4,}$/i;

export default function TrackPage() {
  const [params, setParams] = useSearchParams();
  const initial = (params.get('ref') || '').trim();
  const [ref, setRef] = useState(initial);
  const [inputErr, setInputErr] = useState(null);
  const [res, setRes] = useState({ busy: false, error: null, app: null });
  const resultRef = useRef(null);

  useEffect(() => { document.title = 'Intact ID — Track your application'; }, []);

  const lookup = async (value) => {
    const v = value.trim().toUpperCase();
    if (!REF.test(v)) { setInputErr('Enter your application number, for example APP-2026-1A2B3C4D.'); return; }
    setInputErr(null);
    setRes({ busy: true, error: null, app: null });
    const r = await getApplicationStatus(v);
    // Only these four fields are kept. The response also carries contact details, which this public page must not show.
    if (r.ok && r.data) {
      const { applicationNumber, applicationStatus, createdAt, updatedAt } = r.data;
      setRes({ busy: false, error: null, app: { applicationNumber, applicationStatus, createdAt, updatedAt } });
    } else {
      setRes({ busy: false, error: r.status === 404 ? 'We could not find an application with that number. Check it against your confirmation email.' : r.message, app: null });
    }
    setTimeout(() => resultRef.current && resultRef.current.focus(), 0);
  };

  useEffect(() => {
    if (initial) lookup(initial);
    // run once for a ?ref= link from the confirmation email
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setParams(ref.trim() ? { ref: ref.trim().toUpperCase() } : {}, { replace: true });
    lookup(ref);
  };

  const app = res.app;
  const st = app ? (STATUS[app.applicationStatus] || { step: -1, tone: 'info', label: app.applicationStatus, text: 'Write to contact@intact-io.com with your application number if you have questions.' }) : null;

  return (
    <div className="pg-kyc pg-kyb pg-apply" style={{ zoom: '0.8', fontFamily: 'Geist, system-ui, sans-serif', color: '#0A0C0E', background: '#FFFFFF', minHeight: '125vh', position: 'relative' }}>
      <Nav />
      <main className="tr">
        <h1>Track your application</h1>
        <p className="ap__lead">Enter the application number from your confirmation email.</p>
        <form className="tr__form" onSubmit={onSubmit} noValidate>
          <div className={`af${inputErr ? ' af--err' : ''}`} style={{ flex: 1 }}>
            <label htmlFor="ref">Application number</label>
            <input id="ref" value={ref} onChange={(e) => { setRef(e.target.value); setInputErr(null); }} placeholder="APP-2026-1A2B3C4D" autoComplete="off" spellCheck="false" aria-invalid={inputErr ? 'true' : undefined} aria-describedby={inputErr ? 'ref-err' : undefined} />
            {inputErr && <p className="af__msg" id="ref-err">{inputErr}</p>}
          </div>
          <button type="submit" className="ap__btn" disabled={res.busy}>{res.busy ? 'Checking…' : 'Check status'}</button>
        </form>

        <div aria-live="polite">
          {res.error && (
            <div className="ap__alert" role="alert" tabIndex={-1} ref={resultRef}>
              <b>No result</b>
              <span>{res.error}</span>
            </div>
          )}
          {app && (
            <section className="tr__card" tabIndex={-1} ref={resultRef} aria-label="Application status">
              <div className="tr__top">
                <div>
                  <p className="tr__k">Application</p>
                  <p className="tr__num">{app.applicationNumber}</p>
                </div>
                <span className={`tr__pill tr__pill--${st.tone}`}>{st.label}</span>
              </div>
              <p className="tr__text">{st.text}</p>
              {st.step >= 0 && (
                <ol className="tr__line">
                  {STEPS.map((s, i) => (
                    <li key={s} className={i < st.step || (i === st.step && st.step === 3) ? 'is-done' : i === st.step ? `is-now is-${st.tone}` : ''} aria-current={i === st.step ? 'step' : undefined}>
                      <span className="tr__dot" aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              )}
              <dl className="tr__dates">
                <div><dt>Submitted</dt><dd>{formatServerDate(app.createdAt)}</dd></div>
                <div><dt>Last updated</dt><dd>{formatServerDate(app.updatedAt || app.createdAt)}</dd></div>
              </dl>
            </section>
          )}
        </div>
        <p className="ap__track">Not applied yet? <Link to="/apply">Apply for API access</Link></p>
      </main>
      <Footer />
    </div>
  );
}
