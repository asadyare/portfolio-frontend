/**
 * Case studies live under `/projects/:categoryId/:slug`.
 * Categories are defined in `projectCategories` (e.g. portfolio-projects, bank-app-projects).
 */
import { BuildingOffice2Icon, HeartIcon } from '@heroicons/react/24/outline'
import { awsGuardrailsStudy, portfolioPlatformStudy } from './newStudies.js'

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
 * @property {string} createdAt ISO 8601 (UTC) — matches GitHub `created_at` for the repo; set for every case study
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

/** @type {CaseStudy[]} */
export const caseStudies = [
  awsGuardrailsStudy,
  {
    slug: 'secure-banking-app',
    category: 'bank-app-projects',
    title: 'Secure banking app',
    shortTitle: 'Secure banking app',
    order: 2,
    repoUrl: 'https://github.com/asadyare/secure-banking-app',
    repos: [
      {
        label: 'Repository',
        url: 'https://github.com/asadyare/secure-banking-app',
        badgeUrl: 'https://github.com/asadyare/secure-banking-app/actions/workflows/ci.yml/badge.svg',
      },
    ],
    createdAt: '2026-03-12T16:11:52Z',
    badgeUrl: 'https://github.com/asadyare/secure-banking-app/actions/workflows/ci.yml/badge.svg',
    tags: ['AWS', 'Terraform', 'Supabase', 'Semgrep', 'Trivy', 'Checkov', 'ZAP', 'OIDC'],
    featured: true,
    icon: BuildingOffice2Icon,
    accent: 'primary',
    goal:
      'Vite + React + TypeScript SPA (banking-style product) with Supabase; S3 + CloudFront via Terraform; GitHub Actions deploy with OIDC; overlapping scanners gating merge plus documented incident log.',
    tech: [
      'Vite',
      'React',
      'TypeScript',
      'Supabase',
      'Terraform (AWS)',
      'CloudFront',
      'WAFv2',
      'GitHub Actions',
      'Husky + Gitleaks',
    ],
    concepts: [
      'Branch ruleset: all scanners green before merge',
      'OIDC to AWS — no long-lived keys in CI',
      'In-repo case study + STRIDE threat model / risk analysis (`docs/`)',
    ],
    caseStudy: {
      summary:
        'A portfolio-grade demo of a banking-style product: Vite + React + TypeScript, Supabase for auth and data, and AWS static hosting (private S3 origin, CloudFront, WAFv2) provisioned as code. CI/CD runs Semgrep, CodeQL (default setup), Trivy (fs + IaC + image posture), Checkov on Terraform, ZAP baseline on the built SPA, TruffleHog, Gitleaks (also in git hooks), Dependabot, Dependency Review, npm audit, and CycloneDX SBOM — plus `docs/threat-model-risk-analysis.md` for STRIDE, trust boundaries, and qualitative risk, and `docs/case-study/` documenting 19 blocking incidents from first green pipeline to first live deploy.',
      context: [
        'The repository doubles as a teaching artefact: `docs/case-study/` walks through architecture (runtime, CI/CD, OIDC trust), per-scanner controls, and a chronological incident log with deep-dives and suppression rationale.',
        'Threat modeling and inherent-risk analysis for the same app live in `docs/threat-model-risk-analysis.md` (aligned with Supabase RLS, JWT, and the static SPA threat surface).',
        'Local developer hygiene matches CI: Husky pre-commit runs lint-staged and `gitleaks protect --staged`; pre-push runs full lint and `gitleaks detect` on the repo.',
      ],
      securityRequirements: [
        'No merge to default branch until required checks pass (including Code scanning / CodeQL expectations).',
        'Terraform and app changes reviewed with IaC scanning (Checkov, Trivy IaC) and justified suppressions only in-tree.',
        'Secrets blocked at commit and push time; no plaintext AWS credentials in workflows — OIDC role scoped to bucket + distribution.',
        'DAST baseline (ZAP) against a built preview to catch missing security headers and similar regressions.',
        'Supply-chain discipline: pinned action SHAs where needed (e.g. after upstream tag incidents), SBOM artefacts for provenance.',
      ],
      pipeline: [
        {
          title: 'CI (ci.yml)',
          items: [
            'Lint, tests, production build, npm audit (high+), CycloneDX SBOM upload.',
            'Semgrep, Trivy filesystem + SARIF, Trivy Dockerfile/IaC, Checkov on Terraform, ZAP baseline against the SPA preview.',
            'TruffleHog filesystem scan; Gitleaks; hardened-runner egress audit on key jobs.',
            'Dependency Review on pull requests.',
          ],
        },
        {
          title: 'Supporting workflows',
          items: [
            'Dedicated secret-scan workflow; Terraform plan/validate workflow; frontend deploy to S3 + CloudFront invalidation via OIDC.',
            'Dependabot for npm, Actions, Docker, and Terraform provider bumps.',
          ],
        },
        {
          title: 'Deploy & runtime',
          items: [
            'Static hosting pattern: CloudFront in front of private S3; WAFv2; least-privilege IAM for deploy role.',
            'Supabase env configuration for local and hosted environments (`VITE_SUPABASE_*`).',
          ],
        },
        {
          title: 'Threat model & risk (same repo)',
          items: [
            '`docs/threat-model-risk-analysis.md` — STRIDE-oriented threat model, trust boundaries, inherent risk, and analysis for the Supabase-backed SPA.',
            'Complements pentest and pre-deployment assessment docs under `docs/`.',
          ],
        },
      ],
      controls: [
        'Documented scanner matrix and “why this tool” rationale in `docs/case-study/03-security-controls.md`.',
        'Every suppression traceable to an incident write-up (e.g. Semgrep CloudFront TLS, Trivy WAF/KMS false positives).',
        'Terraform README + Checkov custom policies for organisation-specific guardrails.',
      ],
      evidence: [
        'Public GitHub repository: https://github.com/asadyare/secure-banking-app',
        'Threat model & risk analysis: https://github.com/asadyare/secure-banking-app/blob/main/docs/threat-model-risk-analysis.md',
        'Case study index: https://github.com/asadyare/secure-banking-app/tree/main/docs/case-study',
        'Incident log and per-incident files under `docs/case-study/` (19 items with PR and workflow proof).',
        'CI badge and workflow run history on GitHub Actions.',
      ],
      diagramUrl: null,
      diagramCaption: null,
    },
  },
  {
    slug: 'healthcare-apps',
    category: 'healthcare-app-projects',
    title: 'Healthcare apps',
    shortTitle: 'Healthcare apps',
    order: 3,
    repoUrl: 'https://github.com/asadyare/Healthcare_Apps',
    repos: [
      {
        label: 'Repository',
        url: 'https://github.com/asadyare/Healthcare_Apps',
        badgeUrl: 'https://github.com/asadyare/Healthcare_Apps/actions/workflows/secure-ci-cd.yml/badge.svg',
      },
    ],
    createdAt: '2026-04-26T10:27:12Z',
    badgeUrl:
      'https://github.com/asadyare/Healthcare_Apps/actions/workflows/secure-ci-cd.yml/badge.svg',
    tags: ['HIPAA', 'EKS', 'Terraform', 'Kubernetes', 'GitHub Actions', 'Trivy', 'Checkov', 'Semgrep'],
    featured: true,
    icon: HeartIcon,
    accent: 'primary',
    goal:
      'Three integrated Express + Vite healthcare apps (npm workspaces); AWS baseline via Terraform (VPC, private EKS API, KMS, flow logs); `k8s/base` hardening; `secure-ci-cd.yml` gates plus STRIDE threat model, risk analysis, infra doc, and incident log with proof pointers.',
    tech: [
      'Node.js',
      'Express',
      'React (Vite)',
      'SQLite (dev)',
      'Terraform (AWS)',
      'EKS',
      'Kubernetes',
      'GitHub Actions',
      'OIDC',
    ],
    concepts: [
      'PHI-oriented trust boundaries and cross-service `INTEGRATION_API_KEY` surface',
      'IaC + image + secret + SAST gates before deploy confirmation',
      'In-repo `docs/case-study/` for narrative evidence: architecture, controls, pipeline, and incident log with proof pointers',
    ],
    caseStudy: {
      summary:
        'Monorepo for provider-facing CareConnect360, medication-focused MedTrack Pro, and patient-facing HealthHub Mobile: shared integration APIs, local SQLite for development, and production-oriented Terraform for VPC, KMS, private EKS API endpoint, and flow logs. Kubernetes manifests apply pod security-minded defaults; CI/CD runs Gitleaks, TruffleHog, Semgrep (including custom rules), npm audit scoped for CI, Checkov on Terraform, Trivy filesystem and multi-service Docker builds, Terraform validate, and server-side dry-run apply — with documentation tying STRIDE, HIPAA-oriented qualitative risk, infrastructure controls, and a chronological incident log to concrete files and workflow steps.',
      context: [
        '`docs/threat-model.md` holds the STRIDE matrix and SDLC security requirements; `docs/threat-model-risk-analysis.md` deepens trust boundaries and top risks for PHI-handling workflows.',
        '`docs/infrastructure-and-security.md` maps Terraform modules, Kubernetes controls, and how scans map to release evidence.',
        '`docs/case-study/` documents architecture (runtime + CI/CD + OIDC), per-gate controls, pipeline jobs, and `05-incident-log.md` for blocking issues and resolutions with file/workflow proof (add Actions permalinks after green runs on `main`).',
      ],
      securityRequirements: [
        'No promotion without passing secret scan, SAST, SCA, IaC policy, and container posture checks defined in `.github/workflows/secure-ci-cd.yml` and `.security/security-gates.md`.',
        'Terraform and cluster configs reviewed with Checkov/Trivy; skips documented in `.security/checkov.yaml` with rationale.',
        'Integration and JWT secrets never committed; `.env.example` only documents variable names.',
        'Network and control-plane assumptions (private EKS API, flow logs) documented for production access paths.',
      ],
      pipeline: [
        {
          title: 'Security gates (secure-ci-cd.yml)',
          items: [
            'Gitleaks and TruffleHog with event-specific base/head inputs for PR vs push.',
            'Semgrep with default plus `.security/semgrep-rules.yaml`.',
            'npm audit with production-focused flags suitable for monorepo noise.',
            'Checkov against Terraform; Trivy fs and image builds for all three app images.',
            'Terraform init without backend on PR validate path; `kubectl apply --dry-run=server` on `k8s/base/microservices.yaml`.',
          ],
        },
        {
          title: 'Build & registry',
          items: [
            'Matrix Docker builds for `care-connect-360`, `medtrack-pro`, `healthhub-mobile` with context paths aligned to `apps/`.',
            'ECR push guarded with idempotent tag checks when workflows are re-run.',
          ],
        },
        {
          title: 'Threat model & evidence (same repo)',
          items: [
            '`docs/threat-model-risk-analysis.md` — qualitative HIPAA-oriented layer and risk narrative.',
            '`docs/case-study/05-incident-log.md` — issues, root causes, fixes, and proof table.',
          ],
        },
      ],
      controls: [
        '`.security/security-gates.md` and case-study chapters map each tool to SDLC phase.',
        'Dependabot configured for npm and GitHub Actions (weekly) with production npm grouping.',
        'Kubernetes and Terraform README-style guidance cross-linked from root `README.md`.',
      ],
      evidence: [
        'Public repo: https://github.com/asadyare/Healthcare_Apps',
        'Threat model: https://github.com/asadyare/Healthcare_Apps/blob/main/docs/threat-model.md',
        'Risk analysis: https://github.com/asadyare/Healthcare_Apps/blob/main/docs/threat-model-risk-analysis.md',
        'Infrastructure & security: https://github.com/asadyare/Healthcare_Apps/blob/main/docs/infrastructure-and-security.md',
        'Case study index: https://github.com/asadyare/Healthcare_Apps/tree/main/docs/case-study',
        'Workflow badge and Actions history for `secure-ci-cd.yml`.',
      ],
      diagramUrl: null,
      diagramCaption: null,
    },
  },
  portfolioPlatformStudy,

]

export function projectRepos(project) {
  if (project?.repos?.length) return project.repos
  if (!project?.repoUrl) return []
  return [{ label: 'Repository', url: project.repoUrl, badgeUrl: project.badgeUrl }]
}

export function getCaseStudyBySlug(slug) {
  return (
    caseStudies.find((c) => c.slug === slug) ??
    caseStudies.find((c) => c.legacySlugs?.includes(slug)) ??
    null
  )
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

/** Homepage grid: featured studies in display order (AWS, banking, healthcare, portfolio). */
export function getHomePageCaseStudies() {
  return caseStudies
    .filter((c) => c.featured)
    .slice()
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}
