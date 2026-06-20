import { describe, it, expect } from 'vitest'
import {
  escapeHtml,
  nl2br,
  fieldValue,
  hasValue,
  normalizeEmail,
  isValidEmail,
  getMailtoHref,
} from './_utils.js'

describe('escapeHtml', () => {
  it('escapa caracteres especiais de HTML', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
    )
    expect(escapeHtml("O'Brien & cia")).toBe('O&#39;Brien &amp; cia')
  })
  it('trata null/undefined como string vazia', () => {
    expect(escapeHtml(null)).toBe('')
    expect(escapeHtml(undefined)).toBe('')
  })
})

describe('nl2br', () => {
  it('converte quebras de linha em <br> e escapa o resto', () => {
    expect(nl2br('linha1\nlinha2')).toBe('linha1<br>linha2')
    expect(nl2br('a\r\nb')).toBe('a<br>b')
    expect(nl2br('<b>\n</b>')).toBe('&lt;b&gt;<br>&lt;/b&gt;')
  })
})

describe('fieldValue', () => {
  it('retorna o valor trimado quando presente', () => {
    expect(fieldValue('  texto  ')).toBe('texto')
  })
  it('usa o fallback quando vazio', () => {
    expect(fieldValue('')).toBe('Não informado')
    expect(fieldValue('   ')).toBe('Não informado')
    expect(fieldValue(null, 'N/D')).toBe('N/D')
  })
})

describe('hasValue', () => {
  it('detecta presença de conteúdo não vazio', () => {
    expect(hasValue('x')).toBe(true)
    expect(hasValue('  x  ')).toBe(true)
  })
  it('retorna false para vazio/whitespace/null', () => {
    expect(hasValue('')).toBe(false)
    expect(hasValue('   ')).toBe(false)
    expect(hasValue(null)).toBe(false)
    expect(hasValue(undefined)).toBe(false)
  })
})

describe('normalizeEmail', () => {
  it('apenas trima o valor', () => {
    expect(normalizeEmail('  a@b.com ')).toBe('a@b.com')
    expect(normalizeEmail(null)).toBe('')
  })
})

describe('isValidEmail', () => {
  it('aceita e-mails válidos', () => {
    expect(isValidEmail('contato@example.com')).toBe(true)
    expect(isValidEmail('  joao.silva@dominio.com.br ')).toBe(true)
  })
  it('rejeita e-mails inválidos', () => {
    expect(isValidEmail('')).toBe(false)
    expect(isValidEmail('semarroba.com')).toBe(false)
    expect(isValidEmail('a@@b.com')).toBe(false)
    expect(isValidEmail('a@b')).toBe(false)
    expect(isValidEmail('a b@c.com')).toBe(false)
    expect(isValidEmail(null)).toBe(false)
  })
  it('rejeita e-mails acima de 254 caracteres', () => {
    const longo = 'a'.repeat(250) + '@b.com'
    expect(longo.length).toBeGreaterThan(254)
    expect(isValidEmail(longo)).toBe(false)
  })
})

describe('getMailtoHref', () => {
  it('monta mailto para e-mail presente', () => {
    expect(getMailtoHref('a@b.com')).toBe('mailto:a%40b.com')
  })
  it('retorna string vazia quando sem e-mail', () => {
    expect(getMailtoHref('')).toBe('')
    expect(getMailtoHref(null)).toBe('')
  })
})
