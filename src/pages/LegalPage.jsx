/* eslint-disable react/prop-types -- small presentational components; the project does not use prop-types */
import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import './kyc.css';
import './kyb.css';
import './legal.css';

/** Turns "[label](/path)" and "[label](mailto:x)" inside a string into links. */
function Rich({ text }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((p, i) => {
    const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return <Fragment key={i}>{p}</Fragment>;
    const [, label, href] = m;
    if (href.startsWith('/')) return <Link key={i} to={href}>{label}</Link>;
    return <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{label}</a>;
  });
}

function Block({ b }) {
  if (typeof b === 'string') return <p><Rich text={b} /></p>;
  if (b.list) return <ul>{b.list.map((x, i) => <li key={i}><Rich text={x} /></li>)}</ul>;
  if (b.terms) {
    return (
      <dl>
        {b.terms.map(([t, d], i) => (
          <div key={i} className="lg__term">
            <dt>{t}</dt>
            <dd><Rich text={d} /></dd>
          </div>
        ))}
      </dl>
    );
  }
  return null;
}

/**
 * Shared layout for the privacy notice and terms of use:
 * a plain-language summary, a contents list that follows the reader, and numbered sections.
 */
export default function LegalPage({ docTitle, title, updated, intro, summary, sections, extra }) {
  const loc = useLocation();
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => { document.title = docTitle; }, [docTitle]);
  useEffect(() => {
    if (!loc.hash) return;
    const t = setTimeout(() => {
      const el = document.getElementById(loc.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => clearTimeout(t);
  }, [loc.hash]);
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setActive(vis[0].target.id);
    }, { rootMargin: '-20% 0px -70% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <div className="pg-kyc pg-kyb pg-legal" style={{ zoom: '0.8', fontFamily: 'Geist, system-ui, sans-serif', color: '#0A0C0E', background: '#FFFFFF', minHeight: '125vh', position: 'relative' }}>
      <Nav />
      <header className="lg__hero">
        <div className="lg__in">
          <h1>{title}</h1>
          <p className="lg__meta">Last updated {updated}</p>
          <p className="lg__intro"><Rich text={intro} /></p>
          <div className="lg__sum">
            <h2>The short version</h2>
            <ul>
              {summary.map((s, i) => (
                <li key={i}>
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                  <span><Rich text={s} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
      <div className="lg__body">
        <nav className="lg__toc" aria-label="On this page">
          <p>On this page</p>
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined} onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', `#${s.id}`); setActive(s.id); }}>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="lg__doc">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id}>
              <h2><span className="lg__n">{i + 1}</span>{s.title}</h2>
              {s.blocks.map((b, j) => <Block key={j} b={b} />)}
              {s.id === 'cookies' && extra}
            </section>
          ))}
          <div className="lg__contact">
            <div>
              <h2>Questions about this page?</h2>
              <p>Our legal team reads every message.</p>
            </div>
            <a className="btn-primary" href="mailto:legal@intact-io.com">Email legal@intact-io.com</a>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}
