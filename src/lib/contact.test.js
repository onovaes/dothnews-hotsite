import { describe, expect, it } from 'vitest'
import { WHATSAPP_CONTACT } from './contact'

describe('WHATSAPP_CONTACT', () => {
  it('mantem o numero publico e o link direto do WhatsApp consistentes', () => {
    expect(WHATSAPP_CONTACT.number).toBe('+5567993100123')
    expect(WHATSAPP_CONTACT.display).toBe('+55 67 99310-0123')
    expect(WHATSAPP_CONTACT.headerDisplay).toBe('(67) 99310-0123')
    expect(WHATSAPP_CONTACT.href).toBe('https://wa.me/5567993100123')
  })
})
