import { readdir } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../public/assets/clients')
const SOURCE_DIR = ROOT
const WEBP_DIR = join(ROOT, 'webpv2')

describe('logos de clientes WebP v2', () => {
  it('mantém um WebP transparente para cada PNG fonte', async () => {
    const sourceFiles = (await readdir(SOURCE_DIR))
      .filter((file) => extname(file) === '.png' && !file.startsWith('.'))
      .sort()
    const webpFiles = (await readdir(WEBP_DIR))
      .filter((file) => extname(file) === '.webp' && !file.startsWith('.'))
      .sort()

    expect(webpFiles).toEqual(sourceFiles.map((file) => file.replace(/\.png$/, '.webp')))

    for (const sourceFile of sourceFiles) {
      const webpFile = sourceFile.replace(/\.png$/, '.webp')
      const { info: source } = await sharp(join(SOURCE_DIR, sourceFile))
        .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer({ resolveWithObject: true })
      const webpPath = join(WEBP_DIR, webpFile)
      const webp = await sharp(webpPath).metadata()
      const stats = await sharp(webpPath).stats()

      expect(webp.width, webpFile).toBe(source.width)
      expect(webp.height, webpFile).toBe(source.height)
      expect(webp.hasAlpha, webpFile).toBe(true)
      expect(stats.channels[3].min, webpFile).toBe(0)
    }
  })
})
