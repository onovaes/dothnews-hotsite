/**
 * Gera as thumbs WebP otimizadas a partir dos PNGs (fonte) em public/assets/.
 *
 * Fluxo para devs e IAs: troque o PNG fonte e rode o comando para (re)gerar
 * as thumbs WebP daquela imagem, sempre otimizadas.
 *
 * Uso:
 *   npm run images                 # gera tudo
 *   npm run images -- dashboard    # gera só o que casar com "dashboard"
 *   npm run images -- correio      # gera só os prints do "correio..."
 *
 * (equivalente: node scripts/optimize-images.mjs [filtro])
 *
 * O filtro é case-insensitive e casa por substring no nome base do arquivo.
 * As larguras (CAROUSEL_WIDTHS / PRINT_WIDTHS) devem casar com os `sizes`
 * usados em src/components/hero.jsx e src/components/solution.jsx.
 */

import sharp from 'sharp'
import { readdir, stat, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ASSETS = join(__dirname, '../public/assets')

const WEBP_QUALITY = 82

// Filtro opcional por nome (substring, case-insensitive). Sem filtro = tudo.
const TARGET = (process.argv[2] || '').toLowerCase()
const matches = (name) => !TARGET || name.toLowerCase().includes(TARGET)
let generated = 0

async function convertToWebP(inputPath, outputPath, options = {}) {
  const transform = sharp(inputPath)
  if (options.width) transform.resize({ width: options.width, withoutEnlargement: true })
  await transform.webp({ quality: WEBP_QUALITY }).toFile(outputPath)
  const [inStat, outStat] = await Promise.all([stat(inputPath), stat(outputPath)])
  const saving = (((inStat.size - outStat.size) / inStat.size) * 100).toFixed(0)
  console.log(`  ${basename(outputPath)} — ${(inStat.size / 1024).toFixed(0)}KB → ${(outStat.size / 1024).toFixed(0)}KB (−${saving}%)`)
}

// Larguras responsivas (webp) — devem casar com os `sizes` em hero.jsx / solution.jsx.
const CAROUSEL_WIDTHS = [480, 768, 1142, 1846]
const PRINT_WIDTHS = [480, 768, 1200]

async function processDirs() {
  // ── Carousel slides — area administrativa ─────────────────────────────────
  // PNGs (fonte) em public/assets/area-administrativa/; webp gerados em ./webp/.
  // Nomeacao: ‹nome›-‹largura›.webp (ex.: dashboard-768.webp).
  const ADMIN = join(ASSETS, 'area-administrativa')
  const ADMIN_WEBP = join(ADMIN, 'webp')
  await mkdir(ADMIN_WEBP, { recursive: true })
  const carouselFiles = ['dashboard', 'posts', 'criar-post', 'app-token', 'dispositivos-conectados']
  console.log('\n[carousel slides — area-administrativa]')
  for (const name of carouselFiles) {
    if (!matches(name)) continue
    const src = join(ADMIN, `${name}.png`)
    for (const w of CAROUSEL_WIDTHS) {
      await convertToWebP(src, join(ADMIN_WEBP, `${name}-${w}.webp`), { width: w })
      generated++
    }
  }

  // ── Monitoramento (Grafana) ────────────────────────────────────────────────
  // PNGs em public/assets/monitoramento/; webp em ./webp/ (mesmo esquema do carousel).
  const MON = join(ASSETS, 'monitoramento')
  const MON_WEBP = join(MON, 'webp')
  await mkdir(MON_WEBP, { recursive: true })
  const monFiles = ['overview', 'mysql', 'nginx']
  console.log('\n[monitoramento — grafana]')
  for (const name of monFiles) {
    if (!matches(name)) continue
    const src = join(MON, `${name}.png`)
    for (const w of CAROUSEL_WIDTHS) {
      await convertToWebP(src, join(MON_WEBP, `${name}-${w}.webp`), { width: w })
      generated++
    }
  }

  // ── Client prints (variantes responsivas) ─────────────────────────────────
  // PNGs em clients/prints/; webp em clients/prints/webp/ (diretorio separado).
  const printDir = join(ASSETS, 'clients/prints')
  const printWebp = join(printDir, 'webp')
  await mkdir(printWebp, { recursive: true })
  const printFiles = (await readdir(printDir)).filter(f => extname(f) === '.png' && !f.startsWith('.'))
  console.log('\n[client prints]')
  for (const file of printFiles) {
    const name = basename(file, '.png')
    if (!matches(name)) continue
    for (const w of PRINT_WIDTHS) {
      await convertToWebP(join(printDir, file), join(printWebp, `${name}-${w}.webp`), { width: w })
      generated++
    }
  }

  // ── Client logos ───────────────────────────────────────────────────────────
  // PNG em clients/; webp em clients/webp/ (diretorio separado).
  const logoDir = join(ASSETS, 'clients')
  const logoWebp = join(logoDir, 'webp')
  await mkdir(logoWebp, { recursive: true })
  const logoFiles = (await readdir(logoDir)).filter(f => extname(f) === '.png' && !f.startsWith('.'))
  console.log('\n[client logos]')
  for (const file of logoFiles) {
    const name = basename(file, '.png')
    if (!matches(name)) continue
    await convertToWebP(join(logoDir, file), join(logoWebp, `${name}.webp`))
    generated++
  }

  // OG image: usa-se og-image.png (meta social); não geramos webp (não referenciado).
}

processDirs()
  .then(() => {
    if (TARGET && generated === 0) {
      console.warn(`\nNenhuma imagem casou com o filtro "${TARGET}".`)
    } else {
      console.log(`\nDone. ${generated} webp gerado(s)${TARGET ? ` (filtro: "${TARGET}")` : ''}.`)
    }
  })
  .catch(err => { console.error(err); process.exit(1) })
