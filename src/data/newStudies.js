import { CodeBracketIcon } from '@heroicons/react/24/outline'

export const portfolioPlatformStudy = {
  slug: 'portfolio-platform',
  category: 'portfolio-projects',
  title: 'Portfolio platform',
    shortTitle: 'Portfolio platform',
    order: 5,
  legacySlugs: [
    'portfolio-ci-cd-security',
    'portfolio-frontend',
    'portfolio-k8s-security',
    'portfolio-daily-security',
    'portfolio-threat-model',
  ],
  repoUrl: 'https://github.com/asadyare/portfolio-frontend',
  repos: [
    { label: 'Frontend', url: 'https://github.com/asadyare/portfolio-frontend' },
    {
      label: 'CI/CD security',
      url: 'https://github.com/asadyare/portfolio-ci-cd-security',
      badgeUrl:
        'https://github.com/asadyare/portfolio-ci-cd-security/actions/workflows/ci-security.yml/badge.svg',
    },
    { label: 'Kubernetes', url: 'https://github.com/asadyare/portfolio-k8s-security' },
    {
      label: 'Daily security',
      url: 'https://github.com/asadyare/portfolio-daily-security',
      badgeUrl:
        'https://github.com/asadyare/portfolio-daily-security/actions/workflows/security-alerting-and-reporting.yml/badge.svg',
    },
    { label: 'Threat model', url: 'https://github.com/asadyare/portfolio-threat-model' },
  ],
  tags: ['React', 'Cloudflare Pages', 'GitHub Actions', 'Kubernetes', 'STRIDE'],
  featured: true,
  icon: CodeBracketIcon,
  accent: 'secondary',
  goal:
    'One public site and the four repositories that back it: shared security CI, Kubernetes hardening, scheduled scans, and a STRIDE write-up tied to those controls.',
  tech: [
    'React',
    'Vite',
    'Cloudflare Pages',
    'GitHub Actions',
    'Gitleaks',
    'Semgrep',
    'Trivy',
    'Kubernetes',
    'Falco',
  ],
  concepts: [
    'Reusable workflow_call security gates, with SARIF where the scanners upload it',
    'Pages for the site, Kubernetes manifests as the cluster-shaped path',
    'Scheduled rescans and a markdown threat model that points at the same controls',
  ],
  caseStudy: {
    summary:
      'These five repositories are one platform, not five products. The frontend is this site. portfolio-ci-cd-security is the reusable workflow other repos call. portfolio-k8s-security is the cluster path for the same image. portfolio-daily-security rescans on a schedule after merge. portfolio-threat-model writes down the threats and the mitigations those repos implement. They used to be five case studies. The work is the same; the story is one.',
    context: [
      'Copying the same scan jobs into every repository is how the gates drift. The shared workflow is the place Semgrep rules, Trivy thresholds, and scan stages change. Callers keep their own Actions and Security tabs.',
      'Cloudflare Pages is the public hosting path: static files, a Pages Function for GET /metrics, and Terraform for zone and DNS. The Kubernetes repository is the other path, for someone who wants to read pod security, NetworkPolicy, ingress TLS, Falco, and Grafana as code. Not every visitor needs the cluster. The manifests are there so the platform path is reviewable.',
      'Pull-request scans miss CVEs that are published after merge. The daily repository runs on a cron, generates an SBOM, uploads SARIF, and opens issues when critical findings appear.',
    ],
    securityRequirements: [
      'No secrets in commits (Gitleaks), SAST on the application paths (Semgrep, SARIF uploaded), dependency visibility (npm audit at a defined severity), and a Trivy image scan that fails on the configured high and critical findings.',
      'The edge function stays small and does not put secret material in the client bundle.',
      'On the cluster path: non-root pods, dropped capabilities, a default-deny NetworkPolicy with explicit allows, Falco for runtime signals, and TLS at the ingress.',
      'Scheduled jobs use the same tools as CI so the results mean the same thing. Issues point at a workflow run.',
      'The threat model stays in git so a change to the architecture is a reviewable diff.',
    ],
    pipeline: [
      {
        title: 'Shared CI (portfolio-ci-cd-security)',
        items: [
          'Secret scanning with Gitleaks, Semgrep with SARIF for the code scanning UI, npm audit, Docker image build, and Trivy with a high/critical gate.',
          'Consumed via workflow_call. This frontend’s CI calls that workflow, then deploys Pages previews on pull requests and production on main.',
        ],
      },
      {
        title: 'Frontend and edge (portfolio-frontend)',
        items: [
          'Vite and React, built to dist/ and deployed with Wrangler so functions/ ships with the static files.',
          'Terraform modules in this repo for Cloudflare DNS. GET /metrics is a Pages Function used by the metrics demo. The connection gauges on that page are sample values, not a live nginx server.',
        ],
      },
      {
        title: 'Kubernetes (portfolio-k8s-security)',
        items: [
          'Hardened Deployment, ingress and TLS, NetworkPolicy, Falco, and a Grafana dashboard ConfigMap.',
          'Image build and push (GHCR) from CI. Deploy to a cluster only when a kubeconfig secret is configured. Prometheus-style scrape patterns are documented for the in-cluster path.',
        ],
      },
      {
        title: 'After merge (portfolio-daily-security)',
        items: [
          'Cron workflows, independent of the release cadence: filesystem and dependency scans, SBOM, SARIF upload.',
          'An issue on critical findings, and a weekly summary issue. GITHUB_TOKEN scopes are limited to what issue creation and SARIF upload need.',
        ],
      },
      {
        title: 'Threat model (portfolio-threat-model)',
        items: [
          'Assets and trust boundaries across the browser, Pages, Actions, and the cluster.',
          'STRIDE threats mapped to controls that exist in the other four repositories: NetworkPolicy, Gitleaks, image scanning, and the edge function’s small surface.',
        ],
      },
    ],
    controls: [
      'One workflow definition for the scan stages, with separate jobs so a failure is attributable to secrets, SAST, or the image.',
      'Third-party Actions pinned where the workflows already pin them.',
      'Hosting (Pages) and the cluster path are separate. Theme changes do not require a change to the security workflow.',
      'The threat model is markdown, so the review is a diff.',
    ],
    evidence: [
      'Frontend: https://github.com/asadyare/portfolio-frontend',
      'Shared CI: https://github.com/asadyare/portfolio-ci-cd-security',
      'Kubernetes: https://github.com/asadyare/portfolio-k8s-security',
      'Daily scans: https://github.com/asadyare/portfolio-daily-security',
      'Threat model: https://github.com/asadyare/portfolio-threat-model',
      'Live site: https://asads-portfolio.uk/',
    ],
    diagramUrl: null,
    diagramCaption: null,
  },
}
