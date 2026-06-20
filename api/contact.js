import nodemailer from 'nodemailer'

// Destinatários dos leads vêm de env var (CONTACT_RECIPIENTS, separados por vírgula).
// Nunca commitar e-mails reais aqui. Configure em .env / nas variáveis da Vercel.
const DESTINATARIOS = (process.env.CONTACT_RECIPIENTS || '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean)
const ACCENT_COLOR = '#2B00C9'
const BRAND_LIGHT_COLOR = '#747798'
const INK_COLOR = '#040407'
const SUBINK_COLOR = '#292D3D'
const MUTE_COLOR = '#626983'
const FAINT_COLOR = '#717889'
const LINE_COLOR = '#DFE7F1'
const TINT_COLOR = '#dee5ee'
const SURFACE_COLOR = '#F4F6FD'
const PRIMARY_100_COLOR = '#D7DFFB'
const FONT_SANS = "'IBM Plex Sans', Arial, Helvetica, sans-serif"
const FONT_MONO = "'IBM Plex Mono', 'Courier New', Courier, monospace"
const WHATSAPP_FALLBACK_COUNTRY_CODE = '55'

const AUDIENCIA_LABELS = {
  'ate-100k': 'Até 100 mil pageviews/mês',
  '100k-300k': '100 mil a 300 mil pageviews/mês',
  '300k-1m': '300 mil a 1 milhão de pageviews/mês',
  '1m-5m': '1 milhão a 5 milhões de pageviews/mês',
  '5m+': 'Acima de 5 milhões de pageviews/mês',
}

const PLATAFORMA_LABELS = {
  wordpress: 'WordPress',
  'cms-proprio': 'CMS próprio',
  'plataforma-noticias': 'Plataforma especializada para notícias',
  outra: 'Outra plataforma',
  desconhecido: 'Não sei informar',
}

// Dados fictícios apenas para preview do template de e-mail. Não usar dados reais.
const EMAIL_PREVIEW_SAMPLE = {
  nome: 'João Silva',
  email: 'contato@example.com',
  portal: 'Portal Exemplo',
  url: 'https://www.example.com',
  contato: '(11) 99999-9999',
  audiencia: '1m-5m',
  plataforma: 'wordpress',
  dificuldade: 'O site fica lento e cai nos picos de acesso, principalmente quando uma matéria viraliza. Já perdemos audiência por instabilidade e o suporte atual demora pra responder.',
  observacoes: 'Opera com equipe enxuta de redação. Quer migrar sem perder SEO e mantendo o domínio. Já avaliou outras empresas, mas achou caro.',
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 587,
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char])
}

function nl2br(value) {
  return escapeHtml(value).replace(/\r?\n/g, '<br>')
}

function fieldValue(value, fallback = 'Não informado') {
  const normalized = String(value ?? '').trim()
  return normalized ? normalized : fallback
}

function hasValue(value) {
  return String(value ?? '').trim().length > 0
}

function normalizeEmail(value) {
  return String(value ?? '').trim()
}

function isValidEmail(value) {
  const email = normalizeEmail(value)
  // RFC 5321: comprimento máximo de 254 e exatamente um "@".
  if (email.length === 0 || email.length > 254) return false
  if ((email.match(/@/g) || []).length !== 1) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getMailtoHref(value) {
  const email = normalizeEmail(value)
  return email ? `mailto:${encodeURIComponent(email)}` : ''
}

function getMailFrom() {
  const rawFrom = String(process.env.MAIL_FROM ?? '').trim()
  const fromEmail = String(process.env.MAIL_FROM_EMAIL ?? '').trim()
  const fromName = String(process.env.MAIL_FROM_NAME ?? 'DothNews').trim() || 'DothNews'

  if (rawFrom) {
    const emailMatch = rawFrom.match(/<([^>]+)>/) || rawFrom.match(/([\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,})/)
    if (emailMatch) {
      return rawFrom
    }

    if (fromEmail) {
      const safeName = rawFrom.replace(/"/g, '\\"')
      return `"${safeName}" <${fromEmail}>`
    }

    return `"${rawFrom.replace(/"/g, '\\"')}" <no-reply@dothnews.com>`
  }

  if (fromEmail) {
    const safeName = fromName.replace(/"/g, '\\"')
    return `"${safeName}" <${fromEmail}>`
  }

  return `"${fromName}" <no-reply@dothnews.com>`
}

function isEmailPreviewEnabled() {
  return process.env.NODE_ENV !== 'production' || process.env.EMAIL_PREVIEW_ENABLED === 'true'
}

function labelFrom(map, value) {
  const normalized = String(value ?? '').trim()
  return normalized ? map[normalized] ?? normalized : 'Não informado'
}

function formatDateTime(date = new Date()) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Campo_Grande',
  }).format(date)
}

function getHttpHref(value) {
  const normalized = String(value ?? '').trim()
  if (!normalized) return ''
  const withProtocol = /^https?:\/\//i.test(normalized) ? normalized : `https://${normalized}`

  try {
    const url = new URL(withProtocol)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : ''
  } catch {
    return ''
  }
}

function getWhatsappHref(contato, nome) {
  const digits = String(contato ?? '').replace(/\D/g, '')
  if (digits.length < 8) return ''

  const phone = digits.startsWith(WHATSAPP_FALLBACK_COUNTRY_CODE)
    ? digits
    : `${WHATSAPP_FALLBACK_COUNTRY_CODE}${digits}`
  const firstName = fieldValue(nome, '').split(' ')[0] || 'tudo bem'
  const message = `Olá ${firstName}, recebemos seu pedido de diagnóstico na DothNews. Podemos conversar?`

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

function getContactHref(data) {
  return getWhatsappHref(data.contato, data.nome) || getMailtoHref(data.email)
}

function getAudienceLevel(audiencia) {
  if (['300k-1m'].includes(audiencia)) return 'Médio'

  if (['1m-5m', '5m+'].includes(audiencia)) return 'Alto'

  if (['ate-100k', '100k-300k'].includes(audiencia)) return 'Baixo'

  return 'A avaliar'
}

function getComplexityLevel(data) {
  if (data.plataforma === 'desconhecido') return 'Baixo'

  if (data.plataforma === 'wordpress' || data.plataforma === 'outra') return 'Médio'

  if (data.plataforma === 'cms-proprio' || data.plataforma === 'plataforma-noticias') return 'Alto'

  return 'A avaliar'
}

function getFitLevel(audiencia) {
  if (['ate-100k'].includes(audiencia)) return 'Baixo'

  if (['100k-300k'].includes(audiencia)) return 'Médio'

  if (
    ['300k-1m', '1m-5m', '5m+'].includes(audiencia)
  ) return 'Alto'

  return 'A avaliar'
}

function renderSegments(level) {
  const filledCount = { Baixo: 1, Médio: 2, Alto: 3 }[level] ?? 0
  return [0, 1, 2].map((index) => {
    const color = index < filledCount ? ACCENT_COLOR : LINE_COLOR
    return `<td width="28" style="width:28px;height:8px;background:${color};border-radius:2px;font-size:0;line-height:0;">&nbsp;</td>`
  }).join('<td width="4" style="width:4px;font-size:0;line-height:0;">&nbsp;</td>')
}

function renderTriageRow(label, level) {
  const textColor = level === 'Alto' ? ACCENT_COLOR : level === 'A avaliar' ? FAINT_COLOR : SUBINK_COLOR

  return `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid ${TINT_COLOR};">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td class="triage-label" style="font-family:${FONT_SANS};font-size:14px;line-height:20px;color:${SUBINK_COLOR};">${escapeHtml(label)}</td>
            <td width="96" align="right" style="width:96px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="right">
                <tr>${renderSegments(level)}</tr>
              </table>
            </td>
            <td width="72" align="right" style="width:72px;font-family:${FONT_SANS};font-size:13px;line-height:20px;font-weight:700;color:${textColor};">${escapeHtml(level)}</td>
          </tr>
        </table>
      </td>
    </tr>
  `
}

function renderSummaryRow(label, value, href = '') {
  const content = href
    ? `<a href="${escapeHtml(href)}" style="color:${ACCENT_COLOR};text-decoration:none;font-weight:700;">${escapeHtml(value)}</a>`
    : escapeHtml(value)

  return `
    <tr>
      <td class="summary-label" width="174" valign="top" style="width:174px;padding:13px 16px 13px 0;border-bottom:1px solid ${TINT_COLOR};font-family:${FONT_SANS};font-size:13px;line-height:20px;color:${MUTE_COLOR};">${escapeHtml(label)}</td>
      <td class="summary-value" valign="top" style="padding:13px 0;border-bottom:1px solid ${TINT_COLOR};font-family:${FONT_SANS};font-size:15px;line-height:22px;font-weight:700;color:${INK_COLOR};">${content}</td>
    </tr>
  `
}

function buildEmailHtml(data, options = {}) {
  const nome = fieldValue(data.nome)
  const portal = fieldValue(data.portal)
  const email = fieldValue(data.email)
  const contato = fieldValue(data.contato)
  const audiencia = labelFrom(AUDIENCIA_LABELS, data.audiencia)
  const plataforma = labelFrom(PLATAFORMA_LABELS, data.plataforma)
  const urlDisplay = fieldValue(data.url)
  const urlHref = getHttpHref(data.url)
  const contactHref = getContactHref(data)
  const sentAt = formatDateTime()
  const emailHref = getMailtoHref(data.email)
  const crmHref = fieldValue(options.crmHref || process.env.CRM_LEAD_URL || process.env.CRM_URL || 'https://dothcom.youtrack.cloud/tickets', '')

  const triageRows = [
    ['Potencial de audiência', getAudienceLevel(data.audiencia)],
    ['Complexidade da operação', getComplexityLevel(data)],
    ['Aderência ao perfil DothNews', getFitLevel(data.audiencia)],
  ].map(([label, level]) => renderTriageRow(label, level)).join('')

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>Solicitação de diagnóstico recebido</title>
    <style>
      @media screen and (max-width: 620px) {
        .email-shell { width: 100% !important; }
        .email-pad { padding: 24px 20px !important; }
        .summary-label, .summary-value { display: block !important; width: 100% !important; padding-right: 0 !important; }
        .summary-label { padding-bottom: 2px !important; border-bottom: 0 !important; }
        .summary-value { padding-top: 0 !important; }
        .header-meta { display: block !important; padding-top: 8px !important; text-align: left !important; }
        .triage-label { display: block !important; padding-bottom: 6px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#FFFFFF;color:${INK_COLOR};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      Solicitação de diagnóstico via landing page DothNews.
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;background:#FFFFFF;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:34px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="email-shell" style="width:600px;max-width:600px;border-collapse:collapse;">
            <tr>
              <td class="email-pad" style="padding:0 36px 24px;border-bottom:2px solid ${INK_COLOR};">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td valign="top" style="font-family:${FONT_SANS};font-size:18px;line-height:24px;font-weight:800;letter-spacing:0;color:${INK_COLOR};">
                      DOTH<span style="font-weight:800;color:${BRAND_LIGHT_COLOR};">NEWS</span>
                    </td>
                    <td valign="top" align="right" class="header-meta" style="font-family:${FONT_MONO};font-size:12px;line-height:18px;color:${FAINT_COLOR};">
                      ${escapeHtml(sentAt)}
                    </td>
                  </tr>
                </table>
                <div style="display:inline-block;font-family:${FONT_MONO};font-size:13px;font-weight:bold;line-height:16px;letter-spacing:0;text-transform:uppercase;color:${ACCENT_COLOR};padding:6px 0px;margin-top:22px;">
                  Novo lead · Diagnóstico consultivo
                </div>
                <h1 style="font-family:${FONT_SANS};font-size:28px;line-height:34px;font-weight:700;letter-spacing:0;color:${INK_COLOR};margin:12px 0 0;">
                  Solicitação de diagnóstico
                </h1>
              </td>
            </tr>

            <tr>
              <td class="email-pad" style="padding:28px 36px 0;">
                <div style="font-family:${FONT_SANS};font-size:13px;line-height:18px;color:${MUTE_COLOR};margin-bottom:4px;">Enviado por</div>
                <div style="font-family:${FONT_SANS};font-size:23px;line-height:30px;font-weight:700;letter-spacing:0;color:${INK_COLOR};">${escapeHtml(nome)}</div>
                <div style="font-family:${FONT_SANS};font-size:14px;line-height:22px;color:${MUTE_COLOR};margin-top:8px;">
                  <a href="${escapeHtml(getWhatsappHref(data.contato, data.nome))}" style="color:${ACCENT_COLOR};text-decoration:none;font-weight:700;">WhatsApp: ${escapeHtml(contato)}</a>
                  <span style="color:#C6D0E1;">&nbsp;·&nbsp;</span>
                  <a href="${escapeHtml(emailHref)}" style="color:${ACCENT_COLOR};text-decoration:none;font-weight:700;">E-mail: ${escapeHtml(email)}</a>
                </div>

                <div style="font-family:${FONT_MONO};font-size:13px;line-height:16px;letter-spacing:0;text-transform:uppercase;color:${FAINT_COLOR};margin:30px 0 4px;">Resumo rápido</div>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid ${TINT_COLOR};border-collapse:collapse;">
                  ${renderSummaryRow('Portal', portal)}
                  ${renderSummaryRow('URL', urlDisplay, urlHref)}
                  ${renderSummaryRow('WhatsApp', contato, getWhatsappHref(data.contato, data.nome))}
                  ${renderSummaryRow('Faixa de Page Views', audiencia)}
                  ${renderSummaryRow('Plataforma atual', plataforma)}
                </table>

                <div style="font-family:${FONT_MONO};font-size:13px;line-height:16px;letter-spacing:0;text-transform:uppercase;color:${FAINT_COLOR};margin:30px 0 12px;">Diagnóstico informado pelo lead</div>

                <div style="font-family:${FONT_SANS};font-size:13px;line-height:18px;color:${MUTE_COLOR};margin-bottom:6px;">Principal dificuldade hoje</div>
                <div style="font-family:${FONT_SANS};font-size:15px;line-height:24px;color:${SUBINK_COLOR};background:${SURFACE_COLOR};border-left:3px solid ${ACCENT_COLOR};border-radius:0 8px 8px 0;padding:12px 14px;margin-bottom:18px;">
                  ${nl2br(fieldValue(data.dificuldade))}
                </div>

                <div style="font-family:${FONT_SANS};font-size:13px;line-height:18px;color:${MUTE_COLOR};margin-bottom:4px;">Observações</div>
                <div style="font-family:${FONT_SANS};font-size:15px;line-height:24px;color:${SUBINK_COLOR};">
                  ${nl2br(fieldValue(data.observacoes))}
                </div>

                <div style="font-family:${FONT_MONO};font-size:13px;line-height:16px;letter-spacing:0;text-transform:uppercase;color:${FAINT_COLOR};margin:30px 0 8px;">Avaliação rápida · triagem comercial</div>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                  ${triageRows}
                </table>

                ${contactHref ? `
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:30px;">
                  <tr>
                    <td align="center" bgcolor="${ACCENT_COLOR}" style="border-radius:14px;">
                      <a href="${escapeHtml(contactHref)}" style="display:block;padding:16px 24px;font-family:${FONT_SANS};font-size:16px;line-height:22px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:14px;">
                        Entrar em contato com este lead&nbsp;&rarr;
                      </a>
                    </td>
                  </tr>
                </table>` : ''}

                <div style="font-family:${FONT_SANS};font-size:13px;line-height:20px;color:${FAINT_COLOR};text-align:center;margin-top:12px;">
                  SLA de retorno ao lead: <strong style="color:${SUBINK_COLOR};">até 48h úteis</strong>
                </div>
              </td>
            </tr>

            <tr>
              <td class="email-pad" style="padding:24px 36px 0;">
                <div style="border-top:1px solid ${TINT_COLOR};padding-top:16px;font-family:${FONT_SANS};font-size:12px;line-height:18px;color:${FAINT_COLOR};">
                  <span>DothNews · Infraestrutura editorial especializada para portais de notícias</span>
                  ${crmHref ? `<span style="color:#C6D0E1; float:right;"><a href="${escapeHtml(crmHref)}" style="color:${ACCENT_COLOR};text-decoration:none;font-weight:700;">Abrir no CRM</a></span>` : ''}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

// Rate-limit simples em memória (best-effort; some entre cold starts da serverless).
// Para robustez entre instâncias, migrar para um store compartilhado (KV/Upstash).
const RATE_LIMIT_WINDOW_MS = 30_000
const RATE_LIMIT_MAX = 1
const rateLimitHits = new Map()

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress || 'desconhecido'
}

function isRateLimited(ip) {
  const now = Date.now()
  const hits = (rateLimitHits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (hits.length >= RATE_LIMIT_MAX) {
    rateLimitHits.set(ip, hits)
    return true
  }
  hits.push(now)
  rateLimitHits.set(ip, hits)
  return false
}

function setSecurityHeaders(res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://dothnews.com.br')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default async function handler(req, res) {
  setSecurityHeaders(res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ rs: 'erro', msg: 'Method not allowed.' })
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ rs: 'erro', msg: 'Muitas tentativas. Aguarde um instante.' })
  }

  const { nome, portal, contato, email, empresa_site: honeypot } = req.body ?? {}

  // Honeypot: bots preenchem o campo oculto. Respondemos ok sem enviar nada.
  if (hasValue(honeypot)) {
    return res.status(200).json({ rs: 'ok' })
  }

  if (!hasValue(nome) || !hasValue(portal) || !hasValue(contato) || !isValidEmail(email)) {
    return res.status(422).json({ rs: 'erro', msg: 'Campos obrigatórios não preenchidos.' })
  }

  if (DESTINATARIOS.length === 0) {
    console.error('[contact] CONTACT_RECIPIENTS não configurado')
    return res.status(500).json({ rs: 'erro', msg: 'Erro ao enviar email.' })
  }

  try {
    const leadEmail = normalizeEmail(email)
    const assunto = `Diagnóstico — ${fieldValue(portal)} — ${fieldValue(contato)}`

    if (process.env.RESEND_API_KEY) {
      // Envia via Resend API quando chave estiver configurada
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: getMailFrom(),
          to: DESTINATARIOS[0],
          subject: assunto,
          html: buildEmailHtml(req.body),
          reply_to: [leadEmail],
          bcc: DESTINATARIOS.slice(1),
        }),
      })

      if (!resp.ok) {
        const body = await resp.text().catch(() => '')
        throw new Error(`Resend API error ${resp.status} ${body}`)
      }
    } else {
      // Fallback para Nodemailer (comportamento atual)
      await transporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME || 'dothNews'}" <${process.env.MAIL_FROM}>`,
        bcc: DESTINATARIOS,
        subject: assunto,
        replyTo: leadEmail,
        html: buildEmailHtml(req.body),
      })
    }

    res.json({ rs: 'ok' })
  } catch (err) {
    console.error('[contact]', err.message || err)
    res.status(500).json({ rs: 'erro', msg: 'Erro ao enviar email.' })
  }
}

