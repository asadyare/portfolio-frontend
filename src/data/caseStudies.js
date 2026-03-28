/**
 * Case studies live under `/projects/:categoryId/:slug`.
 * Categories are defined in `projectCategories` (e.g. portfolio-projects, bank-app-projects).
 */
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  CodeBracketIcon,
  ServerStackIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline'

/** @typedef {{ title: string, items: string[] }} PipelineStage */

/**
 * @typedef {Object} CaseStudyContent
 * @property {string} summary
 * @property {string[]} context
 * @property {string[]} securityRequirements
 * @property {PipelineStage[]} pipeline
 * @property {string[]} controls
 * @property {string[]} evidence
 * @property {string | null} [diagramUrl]
 * @property {string | null} [diagramCaption]
 */

/**
 * @typedef {Object} CaseStudy
 * @property {string} slug
 * @property {string} category
 * @property {string} title
 * @property {string} shortTitle
 * @property {string} repoUrl
 * @property {string | undefined} badgeUrl
 * @property {string[]} tags
 * @property {boolean} featured
 * @property {import('react').ComponentType<{ className?: string }>} icon
 * @property {'primary' | 'secondary'} accent
 * @property {string} goal
 * @property {string[]} tech
 * @property {string[]} concepts
 * @property {CaseStudyContent} caseStudy
 */

/** Registered route segments under /projects/:categoryId — include empty categories for future repos */
export const projectCategories = [
  {
    id: 'portfolio-projects',
    label: 'Portfolio & DevSecOps',
    description:
      'This site, shared CI/CD, Kubernetes, daily security, and threat modelling — repos that power the portfolio story.',
    order: 1,
  },
  {
    id: 'bank-app-projects',
    label: 'Bank application',
    description:
      'Security CI/CD and controls for regulated banking workloads. Add case studies here as you publish bank-demo repos.',
    order: 2,
  },
  {
    id: 'healthcare-app-projects',
    label: 'Healthcare application',
    description:
      'Pipelines and security patterns for healthcare apps (e.g. HIPAA-aware controls). Placeholder until repos exist.',
    order: 3,
  },
]

/** @type {CaseStudy[]} */
export const caseStudies = [
  {
    slug: 'portfolio-ci-cd-security',
    category: 'portfolio-projects',
    title: 'CI/CD Security for Portfolio Application',
    shortTitle: 'portfolio-ci-cd-security',
    repoUrl: 'https://github.com/asadyare/portfolio-ci-cd-security',
    badgeUrl:
      'https://github.com/asadyare/portfolio-ci-cd-security/actions/workflows/ci-security.yml/badge.svg',
    tags: ['CI/CD', 'DevSecOps', 'Trivy', 'Gitleaks', 'Semgrep'],
    featured: true,
    icon: ShieldCheckIcon,
    accent: 'primary',
    goal:
      'Reusable workflows: secret scan, SAST, npm audit, Docker build, Trivy image scan — consumed by app repos via workflow_call.',
    tech: ['GitHub Actions', 'Gitleaks', 'Semgrep', 'npm audit', 'Trivy', 'Docker'],
    concepts: ['workflow_call to app repos', 'SARIF to Security tab', 'Fail on HIGH/CRITICAL (Trivy)'],
    caseStudy: {
      summary:
        'A dedicated repository that centralises security gates so every consuming application inherits the same checks without copying YAML. The portfolio frontend and related repos call these workflows on every PR and main-branch build.',
      context: [
        'DevSecOps teams often duplicate pipeline logic across repositories, which drifts over time. This project treats security CI as a product: one place to update Semgrep rules, Trivy severity thresholds, or scan stages.',
        'Downstream repos reference the shared workflow; results stay visible in the caller’s Actions and Security tabs, preserving accountability per repository.',
      ],
      securityRequirements: [
        'No secrets in commits (Gitleaks).',
        'Static analysis on application code paths (Semgrep with project-appropriate rules).',
        'Dependency visibility (npm audit at a defined severity).',
        'Build artefacts as OCI images and scan with Trivy before promotion.',
        'Fail fast on policy violations suitable for a portfolio / internal app risk profile.',
      ],
      pipeline: [
        {
          title: 'Pre-build',
          items: [
            'Checkout and toolchain setup.',
            'Secret scanning (Gitleaks) to block accidental credential commits.',
            'SAST (Semgrep) with SARIF uploaded for GitHub Advanced Security / code scanning UI.',
          ],
        },
        {
          title: 'Build & package',
          items: [
            'Application build (e.g. Node) and Docker image build using a hardened Dockerfile path.',
            'Image pushed or loaded for scanning depending on your registry strategy (e.g. GHCR).',
          ],
        },
        {
          title: 'Container assurance',
          items: [
            'Trivy image scan with severity gates; pipeline fails on configured HIGH/CRITICAL findings.',
            'Evidence retained in workflow logs and SARIF where applicable.',
          ],
        },
      ],
      controls: [
        'Reusable workflow (`workflow_call`) — single source of truth for security stages.',
        'Explicit job separation so scan failures are attributable to secret vs SAST vs container layers.',
        'Version-pinned third-party Actions where practical to reduce supply-chain noise.',
      ],
      evidence: [
        'Public workflow YAML and README in the repository.',
        'Badges linking to latest workflow runs.',
        'SARIF uploads for Semgrep/Trivy compatible with GitHub’s Security tab.',
      ],
      diagramUrl: null,
      diagramCaption: null,
    },
  },
  {
    slug: 'portfolio-frontend',
    category: 'portfolio-projects',
    title: 'Portfolio frontend (React + Cloudflare)',
    shortTitle: 'portfolio-frontend',
    repoUrl: 'https://github.com/asadyare/portfolio-frontend',
    tags: ['React', 'Vite', 'Cloudflare Pages', 'Terraform', 'DevSecOps'],
    featured: true,
    icon: CodeBracketIcon,
    accent: 'secondary',
    goal:
      'React (Vite) portfolio, Cloudflare Pages deploy via Wrangler (static + Pages Functions), Terraform for DNS/zone — CI consumes shared-security.',
    tech: ['React', 'Vite', 'Cloudflare Pages', 'Workers/Pages Functions', 'Terraform', 'Cloudflare provider'],
    concepts: ['PR previews + production deploys', 'GET /metrics at the edge', 'CI consumes shared-security'],
    caseStudy: {
      summary:
        'The public site you are viewing: a Vite/React SPA with a blueprint-style UI, deployed to Cloudflare Pages, with optional Terraform for zone/DNS/DNSSEC and a Pages Function that exposes Prometheus-style metrics for demos.',
      context: [
        'Static hosting keeps attack surface small; dynamic behaviour at the edge (e.g. `/metrics`) demonstrates how observability hooks can exist without a long-lived server.',
        'The same repository stays aligned with shared CI security workflows so every deploy path runs the same gates as other portfolio projects.',
      ],
      securityRequirements: [
        'Dependency and container checks via shared CI (no manual-only releases).',
        'Minimal edge code (single function) with no secret material in client bundles.',
        'Infrastructure for DNS declared in Terraform to reduce ad-hoc dashboard changes.',
      ],
      pipeline: [
        {
          title: 'CI',
          items: [
            'Lint/build in GitHub Actions; optional call into portfolio-ci-cd-security patterns.',
            'Artifact: static `dist/` suitable for Pages or any static host.',
          ],
        },
        {
          title: 'Deploy',
          items: [
            'Wrangler Pages deploy for production and previews per branch.',
            'Terraform apply for Cloudflare records when using the provided modules.',
          ],
        },
        {
          title: 'Runtime (edge)',
          items: [
            'Pages Function serves GET `/metrics` for portfolio Live dashboard demos when not backed by Kubernetes nginx metrics.',
          ],
        },
      ],
      controls: [
        'Separation of build (CI) and hosting (Cloudflare) with traceable workflow runs.',
        'Theme and content changes without touching security repo — boundaries stay clear.',
      ],
      evidence: [
        'Live site, open-source repo, and CI badges from connected security workflows.',
      ],
      diagramUrl: null,
      diagramCaption: null,
    },
  },
  {
    slug: 'portfolio-k8s-security',
    category: 'portfolio-projects',
    title: 'Kubernetes deployment & security',
    shortTitle: 'portfolio-k8s-security',
    repoUrl: 'https://github.com/asadyare/portfolio-k8s-security',
    tags: ['Kubernetes', 'Docker', 'Falco', 'Grafana', 'NetworkPolicy'],
    featured: true,
    icon: ServerStackIcon,
    accent: 'primary',
    goal:
      'Kubernetes manifests: hardened Deployment, ingress/TLS, NetworkPolicy, Falco, Grafana dashboard ConfigMap — optional path alongside Cloudflare Pages.',
    tech: ['Kubernetes', 'Docker', 'Ingress', 'NetworkPolicy', 'Falco', 'Grafana (as code)'],
    concepts: ['Non-root workloads', 'Runtime detection', 'Observability YAML in repo'],
    caseStudy: {
      summary:
        'Shows how the same container image can run on a cluster with defence in depth: restricted pod security, network segmentation, ingress TLS, runtime alerts (Falco), and dashboards as code (Grafana ConfigMap).',
      context: [
        'Not every visitor needs Kubernetes, but employers evaluating platform/SRE skills expect manifests they can read. This repo is the “production-shaped” counterpart to the static Pages deployment.',
        'Prometheus-compatible metrics from nginx support the Live dashboard when the app is served behind the in-repo deployment.',
      ],
      securityRequirements: [
        'Pods run as non-root with dropped capabilities and read-only root filesystem where configured.',
        'Default-deny network posture with explicit allowances (NetworkPolicy).',
        'Runtime visibility via Falco for suspicious process or syscall patterns.',
        'TLS at ingress; cert-manager patterns documented in the README.',
      ],
      pipeline: [
        {
          title: 'Build',
          items: ['Image build and push (e.g. GHCR) from CI in the frontend or this repo’s workflow.'],
        },
        {
          title: 'Deploy',
          items: ['GitHub Actions deploy to cluster when kubeconfig secret is configured; manifests applied from `k8s/`.'],
        },
        {
          title: 'Observe',
          items: ['ServiceMonitor/Prometheus scrape patterns; Grafana dashboard bundled as ConfigMap.'],
        },
      ],
      controls: [
        'Resource quotas and pod security contexts aligned with least privilege.',
        'Separation of observability and runtime security namespaces as per manifests.',
      ],
      evidence: [
        'Manifests, optional Falco rules, Grafana JSON/dashboard YAML, README with ingress and DNS steps.',
      ],
      diagramUrl: null,
      diagramCaption: null,
    },
  },
  {
    slug: 'portfolio-daily-security',
    category: 'portfolio-projects',
    title: 'Daily & weekly security automation',
    shortTitle: 'portfolio-daily-security',
    repoUrl: 'https://github.com/asadyare/portfolio-daily-security',
    badgeUrl:
      'https://github.com/asadyare/portfolio-daily-security/actions/workflows/security-alerting-and-reporting.yml/badge.svg',
    tags: ['Automation', 'SBOM', 'Trivy', 'GitHub Actions'],
    featured: true,
    icon: CalendarDaysIcon,
    accent: 'secondary',
    goal:
      'Scheduled scans (daily + weekly) for CVEs and drift when no PRs run — SBOM, SARIF, GitHub Issues as audit trail.',
    tech: ['GitHub Actions (cron)', 'Gitleaks', 'Trivy FS', 'SBOM', 'SARIF upload'],
    concepts: ['Post-merge assurance', 'Weekly report issue', 'Links to workflow evidence'],
    caseStudy: {
      summary:
        'PR-based scanning misses newly disclosed CVEs after merge. This repository runs on a schedule to re-scan default branches, generate SBOMs, upload SARIF, and open issues when critical findings appear — complementing CI gates.',
      context: [
        'Security is not only “on push” — it is continuous. Daily jobs create a paper trail in Issues and Actions without requiring developer churn.',
      ],
      securityRequirements: [
        'Repeatable scans using the same tools as CI (Trivy, Gitleaks) for consistency.',
        'Readable alerts (Issues) tied to workflow run IDs.',
        'Weekly summary for management-style visibility.',
      ],
      pipeline: [
        {
          title: 'Scheduled jobs',
          items: [
            'Cron-triggered workflows independent of application release cadence.',
            'Filesystem and dependency scans; SBOM generation for inventory.',
          ],
        },
        {
          title: 'Reporting',
          items: [
            'Automatic issue creation on critical findings.',
            'Weekly consolidated report issue.',
          ],
        },
      ],
      controls: [
        'Least-privilege `GITHUB_TOKEN` scopes for issue creation and SARIF upload.',
        'Clear separation from application repos — governance lives in one place.',
      ],
      evidence: [
        'Workflow YAML, sample Issues, badges, and links from the central portfolio README.',
      ],
      diagramUrl: null,
      diagramCaption: null,
    },
  },
  {
    slug: 'portfolio-threat-model',
    category: 'portfolio-projects',
    title: 'Threat modeling & risk analysis',
    shortTitle: 'portfolio-threat-model',
    repoUrl: 'https://github.com/asadyare/portfolio-threat-model',
    tags: ['STRIDE', 'Risk', 'Security design'],
    featured: true,
    icon: ShieldExclamationIcon,
    accent: 'primary',
    goal:
      'Threat modeling and risk analysis for the portfolio: STRIDE, trust boundaries, mitigations mapped to CI and K8s.',
    tech: ['Markdown', 'STRIDE', 'Risk register', 'Diagrams', 'frontend / CI / K8s lanes'],
    concepts: ['Assets & boundaries', 'Threats with mitigations', 'Aligned with Cloudflare + cluster controls'],
    caseStudy: {
      summary:
        'Documents threats and mitigations across the same systems implemented in code: browser and edge, CI/CD, container build, and Kubernetes runtime. Connects “why” to “what we shipped”.',
      context: [
        'Tools without design rationale look arbitrary. The threat model shows how STRIDE categories map to concrete controls (e.g. NetworkPolicy for spoofing/tampering, Gitleaks for information disclosure).',
      ],
      securityRequirements: [
        'Maintain a risk register with ownership and residual risk acceptance.',
        'Keep diagrams and narratives versioned alongside code changes.',
      ],
      pipeline: [
        {
          title: 'Process',
          items: [
            'Identify assets and trust boundaries (browser, Pages, Actions, cluster).',
            'Enumerate threats per STRIDE; map to existing or planned controls.',
            'Review when architecture changes (new repo, new ingress, new data flow).',
          ],
        },
      ],
      controls: [
        'Markdown-first so diffs are reviewable in PRs.',
        'Cross-links to portfolio-ci-cd-security, k8s-security, and frontend repos.',
      ],
      evidence: [
        'Published markdown, risk register tables, and diagram assets in the repository.',
      ],
      diagramUrl: null,
      diagramCaption: null,
    },
  },
]

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((c) => c.slug === slug) ?? null
}

/** Case study URL path for a project */
export function projectCasePath(categoryId, slug) {
  return `/projects/${categoryId}/${slug}`
}

export function isValidCategoryId(categoryId) {
  return projectCategories.some((c) => c.id === categoryId)
}

export function getCategoryMeta(categoryId) {
  return projectCategories.find((c) => c.id === categoryId) ?? null
}

export function getCaseStudiesByCategory(categoryId) {
  return caseStudies.filter((c) => c.category === categoryId)
}

export function getCaseStudyByCategoryAndSlug(categoryId, slug) {
  return caseStudies.find((c) => c.category === categoryId && c.slug === slug) ?? null
}

export function getAllCaseStudySlugs() {
  return caseStudies.map((c) => c.slug)
}
