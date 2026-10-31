import { writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { renderHeadersFile } from '../shared/securityHeaders.js'
import { ORIGIN, sitemapPaths } from '../shared/routes.js'
import { jsonLdScriptText } from '../shared/htmlMeta.js'

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const hash = createHash('sha256').update(jsonLdScriptText(indexHtml)).digest('base64')

writeFileSync(new URL('../public/_headers', import.meta.url), renderHeadersFile(hash))

const urls = sitemapPaths()
  .map((path) => `  <url><loc>${ORIGIN}${path === '/' ? '/' : path}</loc></url>`)
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), sitemap)
console.log(`Wrote _headers (json-ld sha256 ${hash.slice(0, 12)}…) and sitemap.xml (${sitemapPaths().length} urls)`)
