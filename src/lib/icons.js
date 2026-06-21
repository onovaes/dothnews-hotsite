// Material Symbols — mapa nome -> caractere (codepoint PUA).
// A fonte é subsetada POR CODEPOINT (scripts/build-icon-font.sh), por isso
// renderizamos o caractere e não a ligadura: mantém a fonte ~2KB (era ~230KB).
// Ao adicionar um ícone novo: inclua aqui o nome e rode o build da fonte.
export const ICON_CHARS = {
  'add': '\ue145',
  'analytics': '\uef3e',
  'arrow_outward': '\uf8ce',
  'article': '\uef87',
  'auto_awesome': '\ue65f',
  'autorenew': '\ue863',
  'bolt': '\uea0b',
  'check_circle': '\uf0be',
  'chevron_left': '\ue5cb',
  'chevron_right': '\ue5cc',
  'close': '\ue5cd',
  'code': '\ue86f',
  'electrical_services': '\uf102',
  'grid_view': '\ue9b0',
  'groups': '\uf233',
  'headset_mic': '\ue311',
  'layers': '\ue53b',
  'menu': '\ue5d2',
  'monetization_on': '\ue263',
  'monitor': '\uef5b',
  'remove': '\ue15b',
  'schedule': '\uefd6',
  'search': '\uef7a',
  'speed': '\ue9e4',
  'support_agent': '\uf0e2',
  'verified_user': '\uf013',
  'warning': '\uf083',
}

// Retorna o caractere do ícone; cai no próprio nome se faltar no mapa (bug visível).
export function iconChar(name) {
  return ICON_CHARS[name] ?? name
}
