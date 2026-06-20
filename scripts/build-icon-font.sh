#!/usr/bin/env bash
# Gera o subset auto-hospedado da Material Symbols Outlined usado na landing.
#
# Por que existe: os ícones são ligaduras da Material Symbols. Servir a fonte
# variável completa do Google Fonts (~3.9 MB) com display=optional causava FOIT
# (no primeiro acesso aparecia o texto cru, ex.: "arrow_outward"). Auto-hospedamos
# um subset estático (~230 KB) com font-display: block. Ver DESIGN.md.
#
# QUANDO RODAR: sempre que adicionar/remover um ícone na página. Atualize a lista
# ICONS abaixo com TODOS os nomes de ícone usados (props icon=, <Icon name=,
# objetos { icon: '...' } e ternários inline como {open ? 'close' : 'menu'}).
#
# Requisitos: python3 + fonttools[woff] + brotli.
#   python3 -m venv /tmp/ftenv && /tmp/ftenv/bin/pip install "fonttools[woff]" brotli
#
# Uso: bash scripts/build-icon-font.sh
set -euo pipefail

# Lista canônica de ícones usados na página (mantenha em ordem alfabética).
ICONS="add analytics arrow_outward article auto_awesome autorenew bolt \
check_circle chevron_left chevron_right close code electrical_services \
grid_view groups headset_mic layers menu monetization_on monitor remove \
schedule search speed support_agent verified_user warning"

PY="${PYBIN:-/tmp/ftenv/bin}"
OUT="public/assets/fonts/material-symbols-outlined.woff2"
TMP="$(mktemp -d)"

# 1) Baixa a fonte variável (display=block). A URL do .woff2 vem do CSS2 do Google.
CSS_URL="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
WOFF2_URL="$(curl -s -A 'Mozilla/5.0' "$CSS_URL" | grep -oE 'https://[^)]+\.woff2' | head -1)"
echo "Fonte de origem: $WOFF2_URL"
curl -s -o "$TMP/full.woff2" "$WOFF2_URL"

# 2) Instancia estática nos eixos que o CSS usa (remove gvar, reduz ~3.9MB -> ~376KB).
#    Deve casar com font-variation-settings em src/index.css (.material-symbols-outlined).
"$PY/fonttools" varLib.instancer "$TMP/full.woff2" \
  FILL=0 wght=400 GRAD=0 opsz=24 --output="$TMP/static.ttf"

# 3) Subseta para os ícones usados, preservando as ligaduras.
"$PY/pyftsubset" "$TMP/static.ttf" \
  --text="$ICONS" \
  --layout-features+=liga,dlig,clig,calt,rlig \
  --flavor=woff2 \
  --output-file="$OUT"

rm -rf "$TMP"
echo "Gerado: $OUT"
ls -lh "$OUT"
