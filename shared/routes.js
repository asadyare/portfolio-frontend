/**
 * Canonical routes for the sitemap, Pages middleware, and tests.
 * Case-study copy lives in src/data; this module stays free of React imports
 * so Cloudflare Pages Functions can bundle it.
 */

export const ORIGIN = 'https://asads-portfolio.uk'

export const HOME_TITLE = 'Asad Ali Hassan | DevSecOps Apprentice'

export const HOME_DESCRIPTION =
  'Asad Ali Hassan is a part-time DevSecOps Apprentice at Cyber Agoge (since November 2024), focused on Python and AWS security automation and secure CI/CD. Open to junior and mid-level DevSecOps and cloud security roles. Birmingham, UK, and remote.'

export const categories = [
  {
    id: 'aws-guardrails',
    label: 'AWS guardrails',
    description:
      'A read-only boto3 scanner and a GitLab CI pipeline that checks an AWS account baseline. The pipeline is not applied to a live account.',
    order: 1,
  },
  {
    id: 'bank-app-projects',
    label: 'Financial services (demo)',
    description:
      'Banking-style SPA on AWS: Vite, React, TypeScript, and Supabase, with Terraform for S3, CloudFront, and WAFv2, hardened GitHub Actions, and an in-repo threat model and case study.',
    order: 2,
  },
  {
    id: 'healthcare-app-projects',
    label: 'Healthcare applications',
    description:
      'CareConnect360, MedTrack Pro, and HealthHub Mobile: an npm-workspace monorepo, Terraform for VPC, EKS, and KMS, hardened Kubernetes, and security-first GitHub Actions with an in-repo threat model and case study.',
    order: 3,
  },
  {
    id: 'portfolio-projects',
    label: 'Portfolio platform',
    description:
      'This site together with the shared CI/CD, Kubernetes, scheduled scanning, and threat-model repositories that support it.',
    order: 4,
  },
]

export const studies = [
  {
    order: 1,
    category: 'aws-guardrails',
    slug: 'aws-guardrails',
    title: 'AWS guardrails',
    description:
      'Read-only Python scanner for common AWS misconfigurations, plus a GitLab CI pipeline that checks an account baseline with Terraform, Checkov, Trivy, and a plan checker. Not applied to a live account.',
  },
  {
    order: 2,
    category: 'bank-app-projects',
    slug: 'secure-banking-app',
    title: 'Secure banking app',
    description:
      'Banking-style Vite, React, and TypeScript demo on AWS. Private S3, CloudFront, and WAFv2 via Terraform, OIDC deploys, and in-repo threat model and incident write-ups.',
  },
  {
    order: 3,
    category: 'healthcare-app-projects',
    slug: 'healthcare-apps',
    title: 'Healthcare apps',
    description:
      'CareConnect360, MedTrack Pro, and HealthHub Mobile. Express and Vite workspaces, Terraform for VPC, private EKS, and KMS, and a hardened CI pipeline with an in-repo threat model.',
  },
  {
    order: 4,
    category: 'portfolio-projects',
    slug: 'portfolio-platform',
    title: 'Portfolio platform',
    description:
      'The public portfolio: React on Cloudflare Pages, reusable GitHub Actions security workflows, Kubernetes hardening, scheduled scans, and a STRIDE threat model.',
  },
]

/** Old one-segment and two-segment URLs that now resolve to the portfolio platform study. */
export const LEGACY_PORTFOLIO_SLUGS = [
  'portfolio-ci-cd-security',
  'portfolio-frontend',
  'portfolio-k8s-security',
  'portfolio-daily-security',
  'portfolio-threat-model',
]

const PORTFOLIO_CASE_PATH = '/projects/portfolio-projects/portfolio-platform'

export function normalizePath(pathname) {
  if (!pathname) return '/'
  const path = pathname.split('?')[0].split('#')[0]
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path || '/'
}

export function caseStudyPath(categoryId, slug) {
  return `/projects/${categoryId}/${slug}`
}

export function sitemapPaths() {
  const paths = ['/', '/dashboard', '/projects']
  for (const category of [...categories].sort((a, b) => a.order - b.order)) {
    paths.push(`/projects/${category.id}`)
  }
  for (const study of [...studies].sort((a, b) => a.order - b.order)) {
    paths.push(caseStudyPath(study.category, study.slug))
  }
  return paths
}

function page(title, description, canonicalPath) {
  return { kind: 'page', title, description, canonicalPath }
}

/**
 * @param {string} pathname
 * @returns {{ kind: 'page', title: string, description: string, canonicalPath: string }
 *   | { kind: 'redirect', to: string, status: number }
 *   | { kind: 'unknown' }}
 */
export function resolveRoute(pathname) {
  const path = normalizePath(pathname)

  if (path === '/about') return { kind: 'redirect', to: '/#skills', status: 302 }
  if (path === '/contact') return { kind: 'redirect', to: '/#contact', status: 302 }

  if (LEGACY_PORTFOLIO_SLUGS.includes(path.split('/').filter(Boolean).at(-1) ?? '')) {
    const parts = path.split('/').filter(Boolean)
    const slug = parts.at(-1)
    const isLegacyCase =
      (parts.length === 2 && parts[0] === 'projects') ||
      (parts.length === 3 && parts[0] === 'projects' && parts[1] === 'portfolio-projects')
    if (isLegacyCase && slug && LEGACY_PORTFOLIO_SLUGS.includes(slug)) {
      return { kind: 'redirect', to: PORTFOLIO_CASE_PATH, status: 301 }
    }
  }

  if (path === '/') return page(HOME_TITLE, HOME_DESCRIPTION, '/')
  if (path === '/dashboard') {
    return page(
      'Metrics demo | Asad Ali Hassan',
      'Demonstration Prometheus text. Connection gauges are fixed samples, not a live nginx server. The request counter increases when /metrics is fetched.',
      path,
    )
  }
  if (path === '/projects') {
    return page(
      'Projects | Asad Ali Hassan',
      'Case studies: AWS guardrails, a secure banking app demo, healthcare applications, and the portfolio platform.',
      path,
    )
  }

  const category = categories.find((item) => path === `/projects/${item.id}`)
  if (category) {
    return page(`${category.label} | Asad Ali Hassan`, category.description, path)
  }

  const study = studies.find((item) => path === caseStudyPath(item.category, item.slug))
  if (study) {
    return page(`${study.title} | Asad Ali Hassan`, study.description, path)
  }

  return { kind: 'unknown' }
}
