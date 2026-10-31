import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { createHash } from 'node:crypto'
import { caseStudies, getHomePageCaseStudies, projectRepos } from '../src/data/caseStudies.js'
import { LEGACY_PORTFOLIO_SLUGS, ORIGIN, resolveRoute, sitemapPaths, studies } from '../shared/routes.js'
import { jsonLdScriptText, sha256Base64 } from '../shared/htmlMeta.js'
import { renderHeadersFile } from '../shared/securityHeaders.js'
import { getMetricValue, parsePrometheusText } from '../src/utils/parsePrometheusText.js'

const PORTFOLIO_REPOS = [
  'https://github.com/asadyare/portfolio-frontend',
  'https://github.com/asadyare/portfolio-ci-cd-security',
  'https://github.com/asadyare/portfolio-k8s-security',
  'https://github.com/asadyare/portfolio-daily-security',
  'https://github.com/asadyare/portfolio-threat-model',
]

test('homepage projects are ordered AWS, banking, healthcare, portfolio', () => {
  const slugs = getHomePageCaseStudies().map((study) => study.slug)
  assert.deepEqual(slugs, [
    'aws-guardrail-pipeline',
    'aws-guardrail-scanner',
    'secure-banking-app',
    'healthcare-apps',
    'portfolio-platform',
  ])
})

test('route catalogue matches case studies', () => {
  assert.deepEqual(
    studies.map((study) => study.slug),
    caseStudies.map((study) => study.slug),
  )
  assert.deepEqual(
    studies.map((study) => study.title),
    caseStudies.map((study) => study.title),
  )
})

test('portfolio platform keeps the five repository links', () => {
  const platform = caseStudies.find((study) => study.slug === 'portfolio-platform')
  assert.ok(platform)
  assert.deepEqual(
    projectRepos(platform).map((repo) => repo.url),
    PORTFOLIO_REPOS,
  )
  assert.deepEqual(platform.legacySlugs, LEGACY_PORTFOLIO_SLUGS)
})

test('AWS guardrail studies keep the published repository URLs', () => {
  const pipeline = caseStudies.find((study) => study.slug === 'aws-guardrail-pipeline')
  const scanner = caseStudies.find((study) => study.slug === 'aws-guardrail-scanner')
  assert.equal(projectRepos(pipeline)[0].url, 'https://gitlab.com/asadyare/aws-guardrail-pipeline')
  assert.equal(projectRepos(scanner)[0].url, 'https://github.com/asadyare/aws-guardrail-scanner')
  assert.equal(resolveRoute('/projects/aws-guardrail-projects/aws-guardrail-scanner').title, 'AWS Guardrail Scanner | Asad Ali Hassan')
})

test('legacy portfolio URLs redirect and unknown paths do not', () => {
  assert.equal(resolveRoute('/projects/portfolio-frontend').kind, 'redirect')
  assert.equal(resolveRoute('/projects/portfolio-frontend').to, '/projects/portfolio-projects/portfolio-platform')
  assert.equal(
    resolveRoute('/projects/portfolio-projects/portfolio-k8s-security').to,
    '/projects/portfolio-projects/portfolio-platform',
  )
  assert.equal(resolveRoute('/projects/aws-guardrail-projects').kind, 'page')
  assert.equal(
    resolveRoute('/projects/aws-guardrail-projects/aws-guardrail-pipeline').title,
    'AWS Guardrail Pipeline | Asad Ali Hassan',
  )
  assert.equal(resolveRoute('/does-not-exist').kind, 'unknown')
})

test('sitemap lists every canonical route on the production origin', () => {
  const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
  for (const path of sitemapPaths()) {
    assert.ok(xml.includes(`${ORIGIN}${path === '/' ? '/' : path}`), path)
  }
  assert.equal(xml.match(/<loc>/g).length, sitemapPaths().length)
})

test('security.txt and robots.txt are real files', () => {
  const security = readFileSync(new URL('../public/.well-known/security.txt', import.meta.url), 'utf8')
  assert.match(security, /^Contact: mailto:walasaqo@gmail.com$/m)
  assert.match(security, /^Expires: 2027-10-31T23:59:59\.000Z$/m)
  assert.match(security, /^Preferred-Languages: en$/m)
  assert.match(security, /^Canonical: https:\/\/asads-portfolio\.uk\/\.well-known\/security\.txt$/m)
  const robots = readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8')
  assert.match(robots, /Sitemap: https:\/\/asads-portfolio\.uk\/sitemap\.xml/)
  const redirects = readFileSync(new URL('../public/_redirects', import.meta.url), 'utf8')
  const rules = redirects
    .split('\n')
    .filter((line) => line.trim() && !line.trim().startsWith('#'))
  assert.deepEqual(rules, [])
})

test('published headers match the CSP used for the JSON-LD hash', async () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  const nodeHash = createHash('sha256').update(jsonLdScriptText(html)).digest('base64')
  const webHash = await sha256Base64(jsonLdScriptText(html))
  assert.equal(webHash, nodeHash)
  const headers = readFileSync(new URL('../public/_headers', import.meta.url), 'utf8')
  assert.equal(headers, renderHeadersFile(nodeHash))
  for (const name of [
    'Content-Security-Policy',
    'X-Frame-Options: DENY',
    'Strict-Transport-Security: max-age=31536000; includeSubDomains',
    'Permissions-Policy:',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'X-Content-Type-Options: nosniff',
    'Cross-Origin-Opener-Policy: same-origin',
    "frame-ancestors 'none'",
  ]) {
    assert.ok(headers.includes(name), name)
  }
})

test('parsePrometheusText reads the demo exposition', () => {
  const text = `# comment
nginx_connections_active 1
nginx_http_requests_total 4
`
  const metrics = parsePrometheusText(text)
  assert.equal(getMetricValue(metrics, 'nginx_connections_active'), 1)
  assert.equal(getMetricValue(metrics, 'nginx_http_requests_total'), 4)
  assert.equal(parsePrometheusText('').nginx_connections_active, undefined)
})
