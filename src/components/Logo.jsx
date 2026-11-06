/* eslint-disable react/prop-types -- small presentational components; the project does not use prop-types */
/**
 * Intact ID logo — the "Card" mark: a rounded ID card whose photo is a lowercase "i".
 *
 * tone="green" (default) for light backgrounds, tone="white" for dark or green backgrounds.
 */
const TONES = {
  green: { card: '#0B5D45', person: '#FFFFFF', lines: '#5FD3A3' },
  white: { card: '#FFFFFF', person: '#0B5D45', lines: '#1DB980' },
};

export function LogoMark({ size = 40, tone = 'green', title }) {
  const c = TONES[tone] || TONES.green;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
      style={{ flex: 'none', display: 'block' }}
    >
      <rect x="3" y="9" width="42" height="30" rx="8" fill={c.card} />
      <circle cx="17" cy="19.5" r="3.4" fill={c.person} />
      <rect x="13.6" y="25" width="6.8" height="9" rx="3.4" fill={c.person} />
      <rect x="26" y="20" width="12" height="3.4" rx="1.7" fill={c.lines} />
      <rect x="26" y="27" width="8" height="3.4" rx="1.7" fill={c.lines} />
    </svg>
  );
}

/** Mark + "intact id" wordmark, lowercase as designed. */
export default function Logo({ size = 40, tone = 'green', color, fontSize = 24, gap = 10 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: `${gap}px`, fontWeight: 600, fontSize: `${fontSize}px`, letterSpacing: '-0.02em', color: color || (tone === 'white' ? '#FFFFFF' : '#0A0C0E') }}>
      <LogoMark size={size} tone={tone} />
      intact id
    </span>
  );
}
