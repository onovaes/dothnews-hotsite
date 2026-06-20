import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const distDir = path.resolve('dist')
const serverDir = path.join(distDir, 'server')
const indexPath = path.join(distDir, 'index.html')

async function findServerEntry(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name.startsWith('._')) continue

    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const nested = await findServerEntry(fullPath)
      if (nested) return nested
      continue
    }

    if (/entry-server\.(mjs|js)$/.test(entry.name)) {
      return fullPath
    }
  }

  return null
}

async function removeAppleDoubleFiles(dir) {
  if (!existsSync(dir)) return

  const entries = await fs.readdir(dir, { withFileTypes: true })

  await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name)

    if (entry.name.startsWith('._')) {
      await fs.rm(fullPath, { recursive: true, force: true })
      return
    }

    if (entry.isDirectory()) {
      await removeAppleDoubleFiles(fullPath)
    }
  }))
}

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html was not found. Run vite build before prerender.')
}

if (!existsSync(serverDir)) {
  throw new Error('dist/server was not found. Run vite build --ssr before prerender.')
}

const serverEntry = await findServerEntry(serverDir)

if (!serverEntry) {
  throw new Error('SSR entry was not found in dist/server.')
}

const { render } = await import(pathToFileURL(serverEntry).href)
const appHtml = render()
const html = await fs.readFile(indexPath, 'utf8')
const renderedHtml = html.replace(
  /<div id="root">(?:<!--app-html-->)?<\/div>/,
  `<div id="root">${appHtml}</div>`,
)

if (renderedHtml === html) {
  throw new Error('Could not find the root placeholder in dist/index.html.')
}

await fs.writeFile(indexPath, renderedHtml)
await fs.rm(serverDir, { recursive: true, force: true })
await removeAppleDoubleFiles(distDir)
