/* eslint-disable react/prop-types -- small local components; the project does not use prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { submitApplication } from '../lib/api.js';
import { COUNTRIES } from '../lib/countries.js';
import './kyc.css';
import './kyb.css';
import './apply.css';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9][0-9\s-]{6,18}$/;
const BUSINESS_TYPES = ['Bank', 'Microfinance', 'Payments', 'Mobile money', 'Lending', 'Insurance', 'Investment and trading', 'Crypto and digital assets', 'Betting and gaming', 'Marketplace', 'Other'];

const EMPTY = {
  legalName: '', tradingName: '', registrationNumber: '', country: 'KENYA', businessType: '', website: '', email: '', phone: '',
  contactPersonName: '', contactPersonTitle: '', contactPersonEmail: '', contactPersonPhone: '',
};

function validate(f, agreed) {
  const e = {};
  if (!f.legalName.trim()) e.legalName = 'Enter the registered legal name.';
  if (!f.businessType.trim()) e.businessType = 'Choose or type what your business does.';
  if (!f.email.trim()) e.email = 'Enter the company email.';
  else if (!EMAIL.test(f.email.trim())) e.email = 'Enter an email like name@company.com.';
  if (f.phone.trim() && !PHONE.test(f.phone.trim())) e.phone = 'Use digits only, for example +254700000000.';
  if (f.website.trim() && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(f.website.trim())) e.website = 'Enter a web address like company.co.ke.';
  if (!f.contactPersonName.trim()) e.contactPersonName = 'Enter the name of the person we should contact.';
  if (f.contactPersonEmail.trim() && !EMAIL.test(f.contactPersonEmail.trim())) e.contactPersonEmail = 'Enter an email like name@company.com.';
  if (f.contactPersonPhone.trim() && !PHONE.test(f.contactPersonPhone.trim())) e.contactPersonPhone = 'Use digits only, for example +254711000000.';
  if (!agreed) e.agreed = 'Please accept the terms and privacy notice to continue.';
  return e;
}

function toPayload(f) {
  const t = (v) => v.trim() || undefined;
  let website = f.website.trim();
  if (website && !/^https?:\/\//i.test(website)) website = `https://${website}`;
  return {
    legalName: f.legalName.trim(), tradingName: t(f.tradingName), registrationNumber: t(f.registrationNumber), email: f.email.trim(),
    phone: t(f.phone.replace(/[\s-]/g, '')), website: website || undefined, country: f.country || undefined, businessType: f.businessType.trim(),
    contactPersonName: f.contactPersonName.trim(), contactPersonTitle: t(f.contactPersonTitle), contactPersonEmail: t(f.contactPersonEmail),
    contactPersonPhone: t(f.contactPersonPhone.replace(/[\s-]/g, '')),
  };
}

function Field({ id, label, hint, required, error, children }) {
  return (
    <div className={`af${error ? ' af--err' : ''}`}>
      <label htmlFor={id}>{label}{required ? <span aria-hidden="true"> *</span> : <span className="af__opt"> (optional)</span>}</label>
      {children}
      {error ? <p className="af__msg" id={`${id}-err`}>{error}</p> : hint ? <p className="af__hint" id={`${id}-hint`}>{hint}</p> : null}
    </div>
  );
}

function CopyNumber({ value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked: the number is still on screen */ }
  };
  return (
    <div className="ap__num">
      <code>{value}</code>
      <button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
    </div>
  );
}

export default function ApplyPage() {
  const [f, setF] = useState(EMPTY);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ busy: false, error: null, duplicate: false, done: null });
  const errRef = useRef(null);
  const doneRef = useRef(null);

  useEffect(() => { document.title = 'Intact ID — Apply for API access'; }, []);
  useEffect(() => { if (state.done && doneRef.current) doneRef.current.focus(); }, [state.done]);

  const bind = (k) => ({
    id: k, name: k, value: f[k],
    onChange: (e) => { setF((s) => ({ ...s, [k]: e.target.value })); if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined })); },
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `${k}-err` : undefined,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate(f, agreed);
    setErrors(v);
    if (Object.keys(v).length) {
      const first = Object.keys(v)[0];
      const el = document.getElementById(first === 'agreed' ? 'agreed' : first);
      if (el) { el.focus(); el.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
      return;
    }
    setState({ busy: true, error: null, duplicate: false, done: null });
    const r = await submitApplication(toPayload(f));
    if (r.ok) {
      setState({ busy: false, error: null, duplicate: false, done: r.data });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setState({ busy: false, error: r.status === 409 ? 'An application already exists for this company email or registration number.' : r.message, duplicate: r.status === 409, done: null });
      setTimeout(() => errRef.current && errRef.current.focus(), 0);
    }
  };

  return (
    <div className="pg-kyc pg-kyb pg-apply" style={{ zoom: '0.8', fontFamily: 'Geist, system-ui, sans-serif', color: '#0A0C0E', background: '#FFFFFF', minHeight: '125vh', position: 'relative' }}>
      <Nav />
      <main className="ap">
        <aside className="ap__side">
          <h1>Apply for API access</h1>
          <p className="ap__lead">Tell us about your business. We review every application, then email your API credentials to your company address.</p>
          <ol className="ap__steps">
            <li><b>Apply</b><span>About five minutes. You get an application number straight away.</span></li>
            <li><b>We review it</b><span>Two people on our team check your details, one after the other.</span></li>
            <li><b>Get your credentials</b><span>Once approved, your API keys go to your company email.</span></li>
          </ol>
          <p className="ap__track">Already applied? <Link to="/track">Track your application</Link></p>
        </aside>

        <section className="ap__card" aria-live="polite">
          {state.done ? (
            <div className="ap__done" tabIndex={-1} ref={doneRef}>
              <span className="ap__tick" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>
              <h2>Application submitted</h2>
              <p>Keep your application number. You need it to track your application.</p>
              <CopyNumber value={state.done.applicationNumber} />
              <p className="ap__small">We have also emailed it to <b>{f.email.trim()}</b> with a tracking link. If it does not arrive, check your spam folder.</p>
              <div className="ap__btns">
                <Link className="ap__btn" to={`/track?ref=${encodeURIComponent(state.done.applicationNumber)}`}>Track your application</Link>
                <Link className="ap__btn ap__btn--ghost" to="/">Back to home</Link>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit}>
              {state.error && (
                <div className="ap__alert" role="alert" tabIndex={-1} ref={errRef}>
                  <b>{state.duplicate ? 'You have already applied' : 'We could not submit your application'}</b>
                  <span>{state.error} {state.duplicate && <Link to="/track">Track your application</Link>}</span>
                </div>
              )}
              <fieldset>
                <legend>Your company</legend>
                <div className="ap__grid">
                  <Field id="legalName" label="Registered legal name" required error={errors.legalName}><input {...bind('legalName')} autoComplete="organization" placeholder="Kestrel Capital Limited" /></Field>
                  <Field id="tradingName" label="Trading name" error={errors.tradingName}><input {...bind('tradingName')} placeholder="Kestrel" /></Field>
                  <Field id="registrationNumber" label="Registration number" hint="From your certificate of incorporation." error={errors.registrationNumber}><input {...bind('registrationNumber')} placeholder="PVT-8K4L2M9N" /></Field>
                  <Field id="country" label="Country" error={errors.country}>
                    <select {...bind('country')}>
                      <option value="">Choose a country</option>
                      {COUNTRIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </Field>
                  <Field id="businessType" label="What your business does" required error={errors.businessType} hint="Pick one or type your own.">
                    <input {...bind('businessType')} list="businessTypes" placeholder="Payments" />
                    <datalist id="businessTypes">{BUSINESS_TYPES.map((b) => <option key={b} value={b} />)}</datalist>
                  </Field>
                  <Field id="website" label="Website" error={errors.website}><input {...bind('website')} type="url" inputMode="url" autoComplete="url" placeholder="kestrelcapital.co.ke" /></Field>
                  <Field id="email" label="Company email" required error={errors.email} hint="Your credentials and updates are sent here."><input {...bind('email')} type="email" autoComplete="email" placeholder="compliance@kestrelcapital.co.ke" /></Field>
                  <Field id="phone" label="Company phone" error={errors.phone}><input {...bind('phone')} type="tel" autoComplete="tel" placeholder="+254700000000" /></Field>
                </div>
              </fieldset>
              <fieldset>
                <legend>Who should we talk to?</legend>
                <div className="ap__grid">
                  <Field id="contactPersonName" label="Full name" required error={errors.contactPersonName}><input {...bind('contactPersonName')} autoComplete="name" placeholder="Grace Achieng" /></Field>
                  <Field id="contactPersonTitle" label="Job title" error={errors.contactPersonTitle}><input {...bind('contactPersonTitle')} autoComplete="organization-title" placeholder="Compliance officer" /></Field>
                  <Field id="contactPersonEmail" label="Email" error={errors.contactPersonEmail}><input {...bind('contactPersonEmail')} type="email" autoComplete="email" placeholder="g.achieng@kestrelcapital.co.ke" /></Field>
                  <Field id="contactPersonPhone" label="Phone" error={errors.contactPersonPhone}><input {...bind('contactPersonPhone')} type="tel" autoComplete="tel" placeholder="+254711000000" /></Field>
                </div>
              </fieldset>
              <div className={`ap__agree${errors.agreed ? ' af--err' : ''}`}>
                <input type="checkbox" id="agreed" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); if (errors.agreed) setErrors((x) => ({ ...x, agreed: undefined })); }} aria-describedby={errors.agreed ? 'agreed-err' : undefined} />
                <label htmlFor="agreed">I agree to the <Link to="/terms">terms of use</Link> and have read the <Link to="/privacy">privacy notice</Link>.</label>
                {errors.agreed && <p className="af__msg" id="agreed-err">{errors.agreed}</p>}
              </div>
              <button type="submit" className="ap__btn ap__submit" disabled={state.busy}>{state.busy ? 'Submitting…' : 'Submit application'}</button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
