export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Cache-Control', 'no-store')
  // Não expor NODE_ENV nem outros detalhes do ambiente.
  res.json({ ok: true })
}
