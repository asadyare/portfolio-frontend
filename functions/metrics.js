/**
 * Cloudflare Pages Function → GET https://asads-portfolio.uk/metrics
 *
 * Serves Prometheus text exposition at the edge (no Docker / no local dev).
 * Values are from this Worker isolate (scrapes counter + static gauges), not from
 * nginx-prometheus-exporter in Kubernetes — use the container stack for pod metrics.
 */
let scrapeCount = 0

function metricsBody() {
  const now = Math.floor(Date.now() / 1000)

  const body = `# Demo endpoint. Connection gauges below are fixed samples, not a live nginx process.
# HELP nginx_http_requests_total Total /metrics scrapes served by this Cloudflare Pages Function isolate
# TYPE nginx_http_requests_total counter
nginx_http_requests_total ${scrapeCount}
# HELP nginx_connections_active Simulated active connections (edge)
# TYPE nginx_connections_active gauge
nginx_connections_active 1
# HELP nginx_connections_reading Simulated reading (edge)
# TYPE nginx_connections_reading gauge
nginx_connections_reading 0
# HELP nginx_connections_waiting Simulated waiting (edge)
# TYPE nginx_connections_waiting gauge
nginx_connections_waiting 0
# HELP nginx_connections_writing Simulated writing (edge)
# TYPE nginx_connections_writing gauge
nginx_connections_writing 1
# HELP portfolio_edge_unixtime_seconds Worker time when scraped (unix seconds)
# TYPE portfolio_edge_unixtime_seconds gauge
portfolio_edge_unixtime_seconds ${now}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; version=0.0.4; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

export async function onRequest({ request }) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', {
      status: 405,
      headers: { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
  if (request.method === 'GET') scrapeCount += 1
  const response = metricsBody()
  if (request.method === 'HEAD') {
    return new Response(null, { status: 200, headers: response.headers })
  }
  return response
}
