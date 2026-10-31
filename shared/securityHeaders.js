/**
 * Security headers for Cloudflare Pages `_headers` (static assets) and for
 * Pages Function responses, which do not inherit `_headers`.
 * CSP script hash covers the JSON-LD block in index.html. Pass the base64
 * sha256 of that script's exact text.
 */

export function contentSecurityPolicy(jsonLdHash) {
  const scriptSrc = [
    "'self'",
    'https://challenges.cloudflare.com',
    'https://static.cloudflareinsights.com',
    `'sha256-${jsonLdHash}'`,
  ].join(' ')

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "script-src-attr 'none'",
    "style-src 'self'",
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob: https://github.com https://camo.githubusercontent.com https://github.githubassets.com https://challenges.cloudflare.com",
    "font-src 'self'",
    "connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com",
    "frame-src https://challenges.cloudflare.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ')
}

export function securityHeaders(jsonLdHash) {
  return {
    'Content-Security-Policy': contentSecurityPolicy(jsonLdHash),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), publickey-credentials-get=(), screen-wake-lock=(), usb=(), xr-spatial-tracking=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Cross-Origin-Opener-Policy': 'same-origin',
  }
}

export function renderHeadersFile(jsonLdHash) {
  const lines = [
    '# Applied to static assets. Pages Functions set the same headers in code.',
    '/*',
  ]
  for (const [name, value] of Object.entries(securityHeaders(jsonLdHash))) {
    lines.push(`  ${name}: ${value}`)
  }
  lines.push('')
  return lines.join('\n')
}
