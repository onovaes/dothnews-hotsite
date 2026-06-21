// Máscara de telefone BR: (XX) XXXXX-XXXX (celular) ou (XX) XXXX-XXXX (fixo).
// Formata progressivamente conforme o usuário digita; ignora não-dígitos.
// Lógica pura, coberta por phone.test.js.
export function formatPhoneBR(value) {
  const d = String(value ?? '').replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}
