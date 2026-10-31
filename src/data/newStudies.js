import { ShieldCheckIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

export const awsGuardrailsStudy = {
  slug: 'aws-guardrails',
  category: 'aws-guardrails',
  title: 'AWS guardrails',
  shortTitle: 'AWS guardrails',
  order: 1,
  repoUrl: 'https://github.com/asadyare/aws-guardrail-scanner',
  repos: [
    {
      label: 'Scanner',
      url: 'https://github.com/asadyare/aws-guardrail-scanner',
    },
    {
      label: 'GitLab pipeline',
      url: 'https://gitlab.com/asadyare/aws-guardrail-pipeline',
    },
  ],
  tags: ['Python', 'boto3', 'Terraform', 'GitLab CI', 'CIS', 'AWS'],
  featured: true,
  icon: ShieldCheckIcon,
  accent: 'primary',
  goal:
    'Read-only AWS checks you can fail a pipeline on, and a GitLab CI baseline that proves the guardrails are still in the Terraform before anyone has credentials to apply them.',
  tech: [
    'Python 3.12',
    'boto3',
    'pytest',
    'moto',
    'Terraform',
    'GitLab CI',
    'Checkov',
    'Trivy',
    'Semgrep',
  ],
  concepts: [
    'Read-only scanner: table, JSON, and SARIF, with a --fail-on gate',
    'Account baseline in Terraform, checked with terraform test and a plan checker',
    'GitLab OIDC for a manual live read; no static AWS keys in the pipeline',
  ],
  caseStudy: {
    summary:
      'Two repositories, one idea. aws-guardrail-scanner is a read-only boto3 CLI that looks for a short list of common AWS misconfigurations and can fail a job when a finding is serious enough. aws-guardrail-pipeline is a GitLab CI project that keeps an account baseline in Terraform and fails when that baseline drops a control. The pipeline is written to stay green on GitLab.com shared runners with no CI variables set, and nothing in it is applied to a live account.',
    context: [
      'The scanner is a guardrail, not an audit. Its README is explicit that Security Hub, GuardDuty, and a human review still matter. It answers a smaller question: are the controls we already agreed on still in place?',
      'The pipeline does not import the scanner. A manual job can install a pinned commit of the scanner, or run a digest-pinned image, once an AWS role is configured. Until then the live scan does not run, and that absence is a skip rather than a red build.',
    ],
    securityRequirements: [
      'Scanner calls are read-only. A failed read is recorded and the rest of the account is still checked.',
      'Findings name the resource and the remediation. Output is a table, JSON, or SARIF 2.1.0 for GitHub code scanning.',
      'Without --fail-on the process exits 0 so a first run cannot break a pipeline by surprise. With --fail-on, exit 1 means a finding is at or above the threshold.',
      'The GitLab example does not commit a real account id, does not configure a remote backend, and does not run terraform apply.',
      'The manual scan-aws job uses GitLab OIDC and STS web identity. It refuses merge-request pipelines, and the example trust policy limits the sub claim to the default branch.',
    ],
    pipeline: [
      {
        title: 'Scanner checks',
        items: [
          'S3: account and bucket Block Public Access, public ACLs, public bucket policies, and a low-severity note when default encryption is not set explicitly.',
          'IAM: console users without MFA, root access keys, root MFA, and access keys older than 90 days.',
          'Security groups: SSH or RDP from the whole internet, all-ports ingress from the whole internet, and default security groups that still have rules.',
          'CloudTrail: a multi-region trail that is logging, includes global service events, and records management events. EBS encryption by default, per region, for new volumes.',
          'Each check is mapped in the README to CIS AWS Foundations Benchmark v3.0.0 and AWS Foundational Security Best Practices controls where that mapping holds. Severities are the tool’s own rating and drop when a guardrail already contains the exposure.',
          'pytest and moto exercise the checks without live AWS calls. pyproject.toml fails the job under 80% coverage. The container runs as a non-root user and the base image is pinned by digest. A least-privilege IAM policy for the read calls ships in the repo.',
        ],
      },
      {
        title: 'Pipeline baseline',
        items: [
          'Terraform modules for account S3 Block Public Access, EBS encryption by default in two regions, a multi-region CloudTrail with KMS-encrypted logs, an IAM password policy, a service control policy that denies tampering (not attached in the example), and Config managed rules for the same controls.',
          'The home region in the example is eu-west-2, with EBS encryption also set in eu-west-1. The SCP attachment count is asserted to be zero until a break-glass role exists.',
          'guardrail-compliance reads terraform show -json output. CI cannot plan without credentials, so the report job evaluates a committed fixture that a unit test keeps in sync with the plan factory. terraform test uses a mocked AWS provider.',
        ],
      },
      {
        title: 'GitLab CI',
        items: [
          'Ruff, mypy, terraform fmt, unit tests, Bandit, pip-audit, Semgrep SAST, secret detection, Checkov, Trivy config, KICS, a compliance report, and a control gate that re-checks the fixture and the artefacts.',
          'Checkov and Trivy fail the job on high and critical findings. Template analysers that only upload a report do not, on their own, turn the pipeline red.',
          'Images for the jobs the repository owns are pinned to a tag and a digest. The README states there is no coverage badge and no claimed percentage; GitLab shows the Cobertura number it measured.',
        ],
      },
    ],
    controls: [
      'Read-only scanner with an explicit user agent, so the calls are visible in CloudTrail, and no write API.',
      'Fail-on threshold defaults to printing findings without failing, until a pipeline opts in.',
      'OIDC instead of stored keys for the optional live read, with two checks: the job will not ask on a merge request, and the example role trust is limited to the default branch.',
      'Checkov skips in the pipeline are named in the README (access-log buckets on SSE-S3, no cross-region replication yet, no SNS fan-out on the trail).',
    ],
    evidence: [
      'Scanner: https://github.com/asadyare/aws-guardrail-scanner',
      'Pipeline: https://gitlab.com/asadyare/aws-guardrail-pipeline',
      'The scanner README’s sample output is a moto run, with moto’s account id, not a production account.',
      'The pipeline README states it has not been applied to a live account. Example account ids are placeholders.',
    ],
    diagramUrl: null,
    diagramCaption: null,
  },
}

export const portfolioPlatformStudy = {
  slug: 'portfolio-platform',
  category: 'portfolio-projects',
  title: 'Portfolio platform',
  shortTitle: 'Portfolio platform',
  order: 4,
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
