/**
 * Converte PNGs de public/assets/ para WebP.
 * Slides do carousel também ganham versão mobile reduzida (800px).
 * Prints de clientes são redimensionados para máx 1200px antes de converter.
 *
 * Uso: node scripts/optimize-images.mjs
 */

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ASSETS = join(__dirname, '../public/assets')

const WEBP_QUALITY = 82

async function convertToWebP(inputPath, outputPath, options = {}) {
  const transform = sharp(inputPath)
  if (options.width) transform.resize({ width: options.width, withoutEnlargement: true })
  await transform.webp({ quality: WEBP_QUALITY }).toFile(outputPath)
  const [inStat, outStat] = await Promise.all([stat(inputPath), stat(outputPath)])
  const saving = (((inStat.size - outStat.size) / inStat.size) * 100).toFixed(0)
  console.log(`  ${basename(outputPath)} — ${(inStat.size / 1024).toFixed(0)}KB → ${(outStat.size / 1024).toFixed(0)}KB (−${saving}%)`)
}

async function processDirs() {
  // ── Carousel slides (desktop + mobile sm) ─────────────────────────────────
  const sgiFiles = ['sgi-dashboard', 'sgi-posts', 'sgi-criar-post', 'sgi-config', 'sgi-usuarios']
  console.log('\n[carousel slides]')
  for (const name of sgiFiles) {
    const src = join(ASSETS, `${name}.png`)
    await convertToWebP(src, join(ASSETS, `${name}.webp`))
    await convertToWebP(src, join(ASSETS, `${name}-sm.webp`), { width: 800 })
  }

  // ── Grafana / monitoramento (desktop only) ─────────────────────────────────
  const grafanaFiles = [
    'grafana-nginx',
    'grafana-overview',
    'monitoramento-grafana-dashboard-nave-mae-mysql',
  ]
  console.log('\n[grafana / monitoring]')
  for (const name of grafanaFiles) {
    const src = join(ASSETS, `${name}.png`)
    await convertToWebP(src, join(ASSETS, `${name}.webp`))
  }

  // ── Client prints (resize + convert) ──────────────────────────────────────
  const printDir = join(ASSETS, 'clients/prints')
  const printFiles = (await readdir(printDir)).filter(f => extname(f) === '.png' && !f.startsWith('.'))
  console.log('\n[client prints]')
  for (const file of printFiles) {
    const name = basename(file, '.png')
    await convertToWebP(join(printDir, file), join(printDir, `${name}.webp`), { width: 1200 })
  }

  // ── Client logos ───────────────────────────────────────────────────────────
  const logoDir = join(ASSETS, 'clients')
  const logoFiles = (await readdir(logoDir)).filter(f => extname(f) === '.png' && !f.startsWith('.'))
  console.log('\n[client logos]')
  for (const file of logoFiles) {
    const name = basename(file, '.png')
    await convertToWebP(join(logoDir, file), join(logoDir, `${name}.webp`))
  }

  // ── OG image ──────────────────────────────────────────────────────────────
  console.log('\n[og image]')
  await convertToWebP(join(ASSETS, 'og-image.png'), join(ASSETS, 'og-image.webp'))
}

processDirs()
  .then(() => console.log('\nDone.'))
  .catch(err => { console.error(err); process.exit(1) })
