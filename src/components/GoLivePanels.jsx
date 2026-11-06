/* eslint-disable react/prop-types -- small presentational components; the project does not use prop-types */
/* Product visuals for the "From sign-up to live in days" tabs. No code is shown on purpose. */

const card = {
  width: '100%',
  maxWidth: '600px',
  borderRadius: '18px',
  background: '#FFFFFF',
  boxShadow: '0 24px 60px rgba(10,40,28,0.18)',
  padding: '32px',
  boxSizing: 'border-box',
};

const Tick = () => (
  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <circle cx="12" cy="12" r="10" fill="#1DB980" />
    <path d="m7.5 12.3 3 3 6-6.3" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Row({ label, value, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 0', borderTop: '1px solid #EEF1F0', borderBottom: last ? '1px solid #EEF1F0' : undefined, fontSize: '18px' }}>
      <Tick />
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ fontSize: '15px', color: '#5B6461' }}>{value}</span>
    </div>
  );
}

/** Set up: workspace checklist in test mode. */
export function SetupPanel() {
  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '22px', fontWeight: 600 }}>Your workspace</span>
        <span style={{ padding: '6px 12px', borderRadius: '999px', background: '#FDF1E2', color: '#8A4B0B', fontSize: '14px', fontWeight: 600 }}>Test mode</span>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Row label="Account created" value="Done" />
        <Row label="Team invited" value="3 people" />
        <Row label="Test users ready" value="25 sample people" />
        <Row label="First test verification" value="Approved" last />
      </div>
    </div>
  );
}

function Toggle({ label, on = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderTop: '1px solid #EEF1F0', fontSize: '17px' }}>
      <span>{label}</span>
      <span aria-hidden="true" style={{ width: '46px', height: '26px', borderRadius: '13px', background: on ? '#1DB980' : '#D5DCD8', position: 'relative', flex: 'none' }}>
        <span style={{ position: 'absolute', top: '3px', [on ? 'right' : 'left']: '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#FFFFFF' }} />
      </span>
    </div>
  );
}

/** Customise: brand colour and which checks run. */
export function CustomPanel() {
  const swatches = ['#0B5D45', '#1F2523', '#2B59C3', '#C2410C'];
  return (
    <div style={card}>
      <div style={{ fontSize: '22px', fontWeight: 600 }}>Verification flow</div>
      <div style={{ marginTop: '18px', fontSize: '15px', color: '#5B6461' }}>Brand colour</div>
      <div style={{ marginTop: '10px', display: 'flex', gap: '14px' }}>
        {swatches.map((c, i) => (
          <span key={c} style={{ width: '36px', height: '36px', borderRadius: '50%', background: c, boxShadow: i === 0 ? '0 0 0 3px #FFFFFF, 0 0 0 5px #0A0C0E' : 'none' }} />
        ))}
      </div>
      <div style={{ marginTop: '22px' }}>
        <Toggle label="ID document · front and back" />
        <Toggle label="Liveness check" />
        <Toggle label="Sanctions & PEP screening" />
        <Toggle label="Proof of address" on={false} />
      </div>
    </div>
  );
}

function Result({ name, detail, status, review }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderTop: '1px solid #EEF1F0', fontSize: '17px' }}>
      <span style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E4EEE9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 600, color: '#0B5D45', flex: 'none' }}>{name[0]}</span>
      <span style={{ flex: 1 }}>
        {name}
        <span style={{ display: 'block', fontSize: '14px', color: '#5B6461' }}>{detail}</span>
      </span>
      <span style={{ padding: '5px 12px', borderRadius: '999px', background: review ? '#FDF1E2' : '#E3F6EC', color: review ? '#8A4B0B' : '#0A6B47', fontSize: '14px', fontWeight: 600 }}>{status}</span>
    </div>
  );
}

/** Go live: today's decisions arriving in the dashboard (sample data). */
export function LivePanel() {
  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '22px', fontWeight: 600 }}>Today&apos;s verifications</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#0A6B47' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1DB980' }} />
          Live
        </span>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Result name="Grace Achieng" detail="Kenya · National ID" status="Approved" />
        <Result name="Chidi Okafor" detail="Nigeria · NIN" status="Approved" />
        <Result name="Amina Salim" detail="Tanzania · NIDA" status="In review" review />
        <Result name="Brian Okello" detail="Uganda · NIRA" status="Approved" />
      </div>
      <div style={{ marginTop: '12px', fontSize: '13px', color: '#5B6461' }}>Sample data</div>
    </div>
  );
}
