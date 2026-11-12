// Public onboarding endpoints on auth-server. No authentication.
export const API_BASE = (import.meta.env.VITE_API_BASE || 'https://api.intact-io.com').replace(/\/$/, '');

/**
 * Calls the API and returns { ok, status, data, message }.
 * Every endpoint wraps its answer in { success, data, errorMessage, responseMessage }, except
 * Spring's own 400 validation errors, which do not, so those get a generic message.
 */
async function call(path, options) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers: { Accept: 'application/json', ...(options && options.headers) } });
  } catch {
    return { ok: false, status: 0, data: null, message: 'We could not reach our servers. Check your connection and try again.' };
  }
  let body = null;
  try { body = await res.json(); } catch { /* empty or non-JSON body */ }
  const enveloped = body && typeof body === 'object' && 'responseCode' in body;
  if (enveloped && body.success) return { ok: true, status: res.status, data: body.data, message: body.responseMessage };
  let message = enveloped ? (body.errorMessage || body.responseMessage) : null;
  if (!message) message = res.status === 400 ? 'Some details are missing or not valid. Check the form and try again.' : 'Something went wrong on our side. Please try again in a few minutes.';
  return { ok: false, status: res.status, data: null, message };
}

export function submitApplication(payload) {
  return call('/api/public/companies/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
}

export function getApplicationStatus(applicationNumber) {
  return call(`/api/public/applications/${encodeURIComponent(applicationNumber)}/status`, { method: 'GET' });
}

/** Formats the server's local datetime ("2026-11-12T14:32:04", no timezone) without shifting it. */
export function formatServerDate(s) {
  const m = typeof s === 'string' && s.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return s || '';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}, ${m[4]}:${m[5]}`;
}
