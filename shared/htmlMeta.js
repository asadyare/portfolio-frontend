import { ORIGIN } from './routes.js'

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function jsonLdScriptText(html) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  if (!match) throw new Error('index.html is missing the JSON-LD script')
  return match[1]
}

export async function sha256Base64(text) {
  const bytes = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  const view = new Uint8Array(digest)
  let binary = ''
  for (const byte of view) binary += String.fromCharCode(byte)
  return btoa(binary)
}

/**
 * Point title, description, canonical, and social tags at one route.
 * The JSON-LD script is left untouched so its CSP hash stays stable.
 */
export function applyRouteMeta(html, route) {
  const title = escapeHtml(route.title)
  const description = escapeHtml(route.description)
  const canonical = escapeHtml(`${ORIGIN}${route.canonicalPath === '/' ? '/' : route.canonicalPath}`)

  let next = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  next = replaceMeta(next, 'name', 'description', description)
  next = replaceMeta(next, 'property', 'og:title', title)
  next = replaceMeta(next, 'property', 'og:description', description)
  next = replaceMeta(next, 'property', 'og:url', canonical)
  next = replaceMeta(next, 'name', 'twitter:title', title)
  next = replaceMeta(next, 'name', 'twitter:description', description)
  next = next.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
  return next
}

function replaceMeta(html, attr, key, value) {
  const pattern = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*("\\s*/?>)`)
  if (!pattern.test(html)) throw new Error(`Missing meta ${attr}="${key}"`)
  return html.replace(pattern, `$1${value}$2`)
}
