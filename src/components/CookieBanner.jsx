import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COOKIE_EVENT, cookieChoice, saveCookieChoice } from '../lib/cookies.js';
import './cookie.css';

export default function CookieBanner() {
  const [open, setOpen] = useState(() => !cookieChoice());

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(COOKIE_EVENT, show);
    return () => window.removeEventListener(COOKIE_EVENT, show);
  }, []);

  const choose = (v) => {
    saveCookieChoice(v);
    setOpen(false);
  };

  if (!open) return null;
  return (
    <section className="ckb" role="region" aria-label="Cookie choice">
      <h2>Cookies on this site</h2>
      <p>
        We use essential cookies to run this site. With your OK, we would also use analytics cookies to see which pages help.{' '}
        <Link to="/privacy#cookies">How we use cookies</Link>
      </p>
      <div className="ckb__btns">
        <button type="button" className="ckb__b" onClick={() => choose('essential')}>Essential only</button>
        <button type="button" className="ckb__b ckb__b--main" onClick={() => choose('all')}>Allow analytics</button>
      </div>
    </section>
  );
}
