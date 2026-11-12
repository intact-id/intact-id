const KEY = 'intact-cookie-choice';
export const COOKIE_EVENT = 'intact:cookie-settings';

/** The visitor's saved choice: 'all', 'essential', or null if they have not chosen. */
export function cookieChoice() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

/** Saves the choice and tells any listener (for example, future analytics) about it. */
export function saveCookieChoice(v) {
  try { localStorage.setItem(KEY, v); } catch { /* private mode: the choice lasts this visit */ }
  window.dispatchEvent(new CustomEvent('intact:cookie-choice', { detail: v }));
}

/** Opens the cookie banner again so the visitor can change their choice. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_EVENT));
}
