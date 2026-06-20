// Helpers puros de validação/sanitização usados por api/contact.js.
// Arquivo com prefixo "_" não vira rota na Vercel. Coberto por _utils.test.js.

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char])
}

export function nl2br(value) {
  return escapeHtml(value).replace(/\r?\n/g, '<br>')
}

export function fieldValue(value, fallback = 'Não informado') {
  const normalized = String(value ?? '').trim()
  return normalized ? normalized : fallback
}

export function hasValue(value) {
  return String(value ?? '').trim().length > 0
}

export function normalizeEmail(value) {
  return String(value ?? '').trim()
}

export function isValidEmail(value) {
  const email = normalizeEmail(value)
  // RFC 5321: comprimento máximo de 254 e exatamente um "@".
  if (email.length === 0 || email.length > 254) return false
  if ((email.match(/@/g) || []).length !== 1) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function getMailtoHref(value) {
  const email = normalizeEmail(value)
  return email ? `mailto:${encodeURIComponent(email)}` : ''
}
