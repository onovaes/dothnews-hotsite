import { describe, it, expect } from 'vitest'
import { formatPhoneBR } from './phone'

describe('formatPhoneBR', () => {
  it('formata celular (11 dígitos) como (XX) XXXXX-XXXX', () => {
    expect(formatPhoneBR('67999998888')).toBe('(67) 99999-8888')
  })

  it('formata fixo (10 dígitos) como (XX) XXXX-XXXX', () => {
    expect(formatPhoneBR('6733334444')).toBe('(67) 3333-4444')
  })

  it('formata progressivamente conforme digita', () => {
    expect(formatPhoneBR('')).toBe('')
    expect(formatPhoneBR('6')).toBe('(6')
    expect(formatPhoneBR('67')).toBe('(67')
    expect(formatPhoneBR('6799')).toBe('(67) 99')
    expect(formatPhoneBR('679999')).toBe('(67) 9999')
    expect(formatPhoneBR('6799999')).toBe('(67) 9999-9')
  })

  it('ignora não-dígitos', () => {
    expect(formatPhoneBR('abc67def99')).toBe('(67) 99')
    expect(formatPhoneBR('(67) 99999-8888')).toBe('(67) 99999-8888')
  })

  it('é idempotente sobre um valor já formatado', () => {
    const once = formatPhoneBR('67999998888')
    expect(formatPhoneBR(once)).toBe(once)
  })

  it('limita a 11 dígitos (descarta excedente)', () => {
    expect(formatPhoneBR('679999988889999')).toBe('(67) 99999-8888')
  })

  it('trata null/undefined como vazio', () => {
    expect(formatPhoneBR(null)).toBe('')
    expect(formatPhoneBR(undefined)).toBe('')
  })
})
