#!/usr/bin/env bash
# Gera o subset da Material Symbols usado na landing, POR CODEPOINT, e o mapa
# nome->caractere em src/lib/icons.js.
#
# Por que por codepoint (e não por ligadura): subsetar por --text mantém TODAS as
# ligaduras grafáveis com as mesmas letras (~3300 glifos, ~230 KB). Subsetando pelos
# codepoints dos ícones usados, a fonte cai para ~2-3 KB. Por isso renderizamos o
# caractere (iconChar) em vez de digitar o nome (ligadura). Ver DESIGN.md.
#
# QUANDO RODAR: ao adicionar/remover um ícone. Atualize a lista ICONS abaixo com
# TODOS os nomes usados (props icon=, <Icon name=, objetos { icon: '...' } e
# ternários como {open ? 'close' : 'menu'}).
#
# Requisitos: python3 + fonttools[woff] + brotli + uharfbuzz.
#   python3 -m venv /tmp/ftenv && /tmp/ftenv/bin/pip install "fonttools[woff]" brotli uharfbuzz
#
# Uso: bash scripts/build-icon-font.sh
set -euo pipefail

ICONS="add analytics arrow_outward article auto_awesome autorenew bolt \
check_circle chevron_left chevron_right close code electrical_services \
grid_view groups headset_mic layers menu monetization_on monitor remove \
schedule search speed support_agent verified_user warning"

PY="${PYBIN:-/tmp/ftenv/bin}"
OUT="src/fonts/material-symbols-outlined.woff2"
MAP="src/lib/icons.js"
TMP="$(mktemp -d)"

# 1) Baixa a fonte variável (display=block) — URL vem do CSS2 do Google.
CSS_URL="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
WOFF2_URL="$(curl -s -A 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36' "$CSS_URL" | grep -oE 'https://[^)]+\.woff2' | head -1)"
echo "Fonte de origem: $WOFF2_URL"
curl -s -o "$TMP/full.woff2" "$WOFF2_URL"

# 2) Instancia estática nos eixos usados (casa com font-variation-settings em index.css).
"$PY/fonttools" varLib.instancer "$TMP/full.woff2" FILL=0 wght=400 GRAD=0 opsz=24 --output="$TMP/static.ttf" >/dev/null

# 3) Resolve nome->codepoint (via shaping da ligadura) e gera o mapa + lista de unicodes.
ICONS="$ICONS" "$PY/python" - "$TMP" <<'PY'
import sys, os, json, uharfbuzz as hb
from fontTools.ttLib import TTFont
tmp = sys.argv[1]
names = os.environ["ICONS"].split()
f = TTFont(f"{tmp}/full.woff2"); f.flavor=None; f.save(f"{tmp}/shape.ttf")
cmap = f.getBestCmap(); go = f.getGlyphOrder(); gid={n:i for i,n in enumerate(go)}
rev = {gid.get(g): cp for cp,g in cmap.items() if cp >= 0xE000}
font = hb.Font(hb.Face(open(f"{tmp}/shape.ttf","rb").read()))
out={}; missing=[]
for n in names:
    b=hb.Buffer(); b.add_str(n); b.guess_segment_properties(); hb.shape(font,b,{"liga":True})
    g=[i.codepoint for i in b.glyph_infos]
    out[n]=rev[g[0]] if len(g)==1 and g[0] in rev else missing.append(n)
if missing: raise SystemExit(f"Ícones não encontrados: {missing}")
open(f"{tmp}/unicodes.txt","w").write(",".join("U+%04X"%cp for cp in out.values()))
L=["// Material Symbols — mapa nome -> caractere (codepoint PUA). GERADO por",
   "// scripts/build-icon-font.sh. A fonte é subsetada por codepoint (~2KB),",
   "// por isso renderizamos o caractere e não a ligadura.",
   "export const ICON_CHARS = {"]
L += [f"  '{n}': '\\u{out[n]:04x}'," for n in sorted(out)]
L += ["}","","export function iconChar(name) {","  return ICON_CHARS[name] ?? name","}",""]
open("src/lib/icons.js","w").write("\n".join(L))
print(f"{len(out)} ícones mapeados")
PY

# 4) Subseta a fonte por codepoint (sem layout/ligaduras).
"$PY/pyftsubset" "$TMP/static.ttf" \
  --unicodes="$(cat "$TMP/unicodes.txt")" \
  --layout-features="" \
  --flavor=woff2 \
  --output-file="$OUT"

rm -rf "$TMP"
echo "Gerado: $OUT  ($MAP atualizado)"
ls -lh "$OUT" | awk '{print $5, $9}'
