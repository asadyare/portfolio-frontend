import { resolveRoute } from '../shared/routes.js'
import { securityHeaders } from '../shared/securityHeaders.js'
import { applyRouteMeta, jsonLdScriptText, sha256Base64 } from '../shared/htmlMeta.js'

const NOT_FOUND = {
  title: 'Page not found | Asad Ali Hassan',
  description: 'No page on asads-portfolio.uk matches that address.',
  canonicalPath: '/',
}

let cachedHash

function wantsHtml(request) {
  const accept = request.headers.get('accept') || ''
  return accept.includes('text/html') || accept.includes('*/*') || accept === ''
}

function isHtmlResponse(response) {
  const type = response.headers.get('content-type') || ''
  return type.includes('text/html')
}

async function indexHtml(context) {
  const indexUrl = new URL('/index.html', context.request.url)
  const asset = await context.env.ASSETS.fetch(new Request(indexUrl, { method: 'GET' }))
  if (!asset.ok) throw new Error(`index.html asset returned ${asset.status}`)
  return asset.text()
}

async function jsonLdHash(context) {
  if (cachedHash) return cachedHash
  cachedHash = await sha256Base64(jsonLdScriptText(await indexHtml(context)))
  return cachedHash
}

function withSecurity(response, hash) {
  const headers = new Headers(response.headers)
  for (const [name, value] of Object.entries(securityHeaders(hash))) {
    headers.set(name, value)
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

async function htmlResponse(context, status, route, hash) {
  const raw = await indexHtml(context)
  const headers = new Headers(securityHeaders(hash))
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
  if (context.request.method === 'HEAD') {
    return new Response(null, { status, headers })
  }
  return new Response(applyRouteMeta(raw, route), { status, headers })
}

export async function onRequest(context) {
  const { request } = context
  const url = new URL(request.url)
  const hash = await jsonLdHash(context)

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return withSecurity(await context.next(), hash)
  }

  if (url.pathname === '/index.html') {
    return withSecurity(await context.next(), hash)
  }

  const route = resolveRoute(url.pathname)

  if (route.kind === 'redirect') {
    const headers = new Headers(securityHeaders(hash))
    headers.set('Location', route.to)
    return new Response(null, { status: route.status, headers })
  }

  if (route.kind === 'page') {
    return htmlResponse(context, 200, route, hash)
  }

  const upstream = await context.next()
  if (!isHtmlResponse(upstream) && upstream.status !== 404) {
    return withSecurity(upstream, hash)
  }

  if (wantsHtml(request)) {
    return htmlResponse(context, 404, NOT_FOUND, hash)
  }

  const headers = new Headers(securityHeaders(hash))
  headers.set('Content-Type', 'text/plain; charset=utf-8')
  return new Response(request.method === 'HEAD' ? null : 'Not found', { status: 404, headers })
}
