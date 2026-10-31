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
  BuildingOffice2Icon,
  HeartIcon,
  CommandLineIcon,
  CloudIcon,
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
    id: 'aws-guardrail-projects',
    label: 'AWS account guardrails',
    description:
      'Newest work: a read-only Python scanner for one AWS account (CIS AWS Foundations Benchmark v3.0.0 and AWS FSBP) and a GitLab CI pipeline that checks an account-level Terraform baseline without applying it.',
    order: 0,
  },
  {
    id: 'portfolio-projects',
    label: 'Portfolio & DevSecOps',
    description:
      'This site, shared CI/CD, Kubernetes, daily security, and threat modelling — repos that power the portfolio story.',
    order: 1,
  },
  {
    id: 'bank-app-projects',
    label: 'Financial services (demo)',
    description:
      'Banking-style SPA on AWS: Vite + Supabase, Terraform (S3/CloudFront/WAF), hardened GitHub Actions, and in-repo threat model / case study.',
    order: 2,
  },
  {
    id: 'healthcare-app-projects',
    label: 'Healthcare application',
    description:
      'CareConnect360, MedTrack Pro, and HealthHub Mobile: npm-workspace monorepo, Terraform (VPC/EKS/KMS), hardened Kubernetes, and security-first GitHub Actions with in-repo threat model and case study.',
    order: 3,
  },
]

/** @type {CaseStudy[]} */
export const caseStudies = [
  {
    slug: 'aws-guardrail-pipeline',
    category: 'aws-guardrail-projects',
    title: 'AWS Guardrail Pipeline',
    shortTitle: 'AWS Guardrail Pipeline',
    repoUrl: 'https://gitlab.com/asadyare/aws-guardrail-pipeline',
    createdAt: '2026-10-27T17:55:03.750Z',
    badgeUrl: 'https://gitlab.com/asadyare/aws-guardrail-pipeline/badges/main/pipeline.svg',
    tags: ['GitLab CI', 'Terraform', 'Checkov', 'Trivy', 'Semgrep', 'OIDC'],
    featured: true,
    icon: CloudIcon,
    accent: 'primary',
    goal:
      'GitLab CI for an account-level Terraform baseline. Default jobs do not apply Terraform or call AWS. The control gate fails when the plan report misses a high or critical control.',
    tech: [
      'GitLab CI',
      'Terraform 1.16.7',
      'Python 3.12',
      'Checkov',
      'Trivy',
      'Semgrep',
      'KICS',
      'GitLab OIDC',
    ],
    concepts: [
      'No terraform apply in the default jobs',
      'guardrail-compliance reads plan JSON; the gate fails on high or critical',
      'Manual scan assumes an AWS role with GitLab OIDC; no static keys in the repo',
    ],
    caseStudy: {
      summary:
        'A public GitLab project that defines account-level AWS guardrails in Terraform and checks them in CI before anyone has credentials to apply them. Nothing in the default pipeline is applied to a live account. The pipeline is meant to stay green on GitLab.com shared runners with no CI variables set. `guardrail-compliance` is a Python 3.12 package with no third-party runtime dependencies; it reads Terraform plan JSON with the standard library. A manual `scan-aws` job can assume a role with GitLab OIDC and run a pinned commit of the companion scanner. The repository does not store static AWS keys.',
      context: [
        'The example root module is `terraform/examples/account_baseline`. CI runs `terraform validate` and `terraform test` there. It does not run `terraform plan` or `terraform apply`, and it has no credentials. There is no remote backend. `terraform.tfvars.example` uses the placeholder account `111111111111`.',
        'The home region defaults to `eu-west-2`. EBS encryption by default is regional, so the example also sets it in `eu-west-1`. One multi-Region trail in the home region records events from both. Config global resource types are recorded once, in the home region.',
        'CI cannot run `terraform plan` without credentials, so `compliance-report` evaluates the committed fixture `tests/fixtures/plans/baseline_good.json`. That file is the same document `tests/plan_factory.py` builds, and a unit test fails if the two drift. `terraform test` uses a mocked AWS provider. The README states the good fixture is not a live plan.',
      ],
      securityRequirements: [
        'Default jobs do not apply Terraform and do not call AWS. The only path that can call AWS is the manual `scan-aws` job.',
        'No static AWS keys. `scan-aws` requests a GitLab OIDC token (audience `https://gitlab.com`) and calls `AssumeRoleWithWebIdentity`. The example trust policy in `docs/gitlab-oidc-trust-policy.json` limits the `sub` claim to `ref:main` on this project. The job refuses merge-request pipelines before it talks to STS, and it exits 0 when `AWS_ROLE_ARN` is unset. The role ARN is a CI variable, not a file in the repository.',
        'The control gate re-runs `guardrail-compliance` on the good fixture with `--fail-on high` and `--min-ebs-regions 2`, and fails if the pytest, coverage, markdown report, or code-quality artefacts are missing.',
        'Checkov soft-fails LOW and MEDIUM and fails the job on high and critical. Trivy config (`trivy config --severity HIGH,CRITICAL`) fails the job on those severities. GitLab SAST (`semgrep-sast`), secret detection, and KICS (`kics-iac-sast`) upload reports; those template analysers exit 0 when they find issues.',
      ],
      pipeline: [
        {
          title: 'Lint, test, and project-owned security',
          items: [
            'Ruff (lint and format) on `src`, `tests`, and `ci`; mypy in strict mode; `terraform fmt -check`.',
            'pytest writes JUnit and a Cobertura coverage report for the merge-request widgets. The README does not claim a coverage percentage.',
            'Bandit on `src` and `ci`. pip-audit runs with `--require-hashes` against `requirements-dev.txt`. Python jobs install from that hash-pinned file.',
            'Images this repository owns are pinned by tag and digest: Python 3.12 slim, Terraform 1.16.7, Checkov 3.3.30, and Trivy 0.76.1.',
          ],
        },
        {
          title: 'Infrastructure as code',
          items: [
            '`terraform init -backend=false`, `terraform validate`, and `terraform test` (mocked AWS provider) on the example baseline, with JUnit output.',
            'Checkov on the `terraform/` tree (`--download-external-modules false`). Trivy config scan of `terraform/` at HIGH and CRITICAL.',
            'GitLab’s IaC SAST template runs KICS and uploads its report. Dependency scanning is included from the GitLab template and only runs when the licence includes it; on Free, pip-audit is the check that can fail the pipeline.',
          ],
        },
        {
          title: 'Report and control gate',
          items: [
            '`compliance-report` runs `guardrail-compliance` on `tests/fixtures/plans/baseline_good.json` and writes markdown, JSON, JUnit, and GitLab code-quality reports.',
            '`control-gate` waits for the project-owned jobs (Ruff, mypy, terraform fmt, unit tests, Bandit, pip-audit, terraform validate, Checkov, Trivy config, and the compliance report). It does not wait for the GitLab template analysers. It fails when the checker exits non-zero or those artefacts are empty.',
            'Exit codes from the checker: 0 when nothing at or above `--fail-on` failed, 1 when something did, 2 when the input cannot be read. The default threshold is `high`.',
          ],
        },
        {
          title: 'Manual live read',
          items: [
            '`scan-aws` is manual and `allow_failure: true`, so an unplayed job does not block the pipeline. Playing it does not call AWS unless the job is on the default branch, `AWS_ROLE_ARN` is set, GitLab injected `GITLAB_OIDC_TOKEN`, and the scanner ref is pinned.',
            'The pinned commit is `2c840d6454a4c2584f321d416323e186876ab6eb` of `asadyare/aws-guardrail-scanner`. The job installs that commit and runs `aws-guardrail-scanner --output json --fail-on high`. Other git repositories are rejected. The script does not print the web identity token or the temporary credentials.',
          ],
        },
      ],
      controls: [
        'Account S3 Block Public Access with all four settings fixed on (`terraform/modules/s3_account_public_access_block`).',
        'EBS encryption by default, with no switch to disable it, instantiated once in `eu-west-2` and once in `eu-west-1` (`terraform/modules/ebs_encryption_default`).',
        'Multi-Region CloudTrail with logging on, log-file validation, global service events, a customer-managed KMS key with rotation, a KMS-encrypted CloudWatch log group kept for 365 days, and a log bucket that denies non-TLS, blocks public access, versions objects, and uses GOVERNANCE object lock for 90 days (`terraform/modules/cloudtrail_baseline`).',
        'IAM password policy defaults: minimum length 14, complexity flags on, 24 passwords remembered, maximum age 90 days, `hard_expiry` left off (`terraform/modules/iam_password_policy`).',
        'A service control policy that denies CloudTrail tampering, disabling EBS encryption by default, changing the account public access block, and deleting the password policy. The example leaves `target_id` unset, so the attachment count is zero (`terraform/modules/guardrail_scp`).',
        'AWS Config recorder, delivery channel, and managed rules `S3_ACCOUNT_LEVEL_PUBLIC_ACCESS_BLOCKS`, `EC2_EBS_ENCRYPTION_BY_DEFAULT`, `MULTI_REGION_CLOUD_TRAIL_ENABLED`, and `IAM_PASSWORD_POLICY` (`terraform/modules/config_guardrails`).',
        'Checker control ids include GR-S3-01 (critical), GR-EBS-01 (high), GR-EBS-02 (medium, fewer regions than requested), GR-CT-01 (critical), GR-CT-02, GR-CT-05, GR-CT-07, and GR-SCP-01 (high), GR-CT-03, GR-CT-04, and GR-CFG-01 (medium), and GR-IAM-01 (high, or medium for reuse and age only).',
      ],
      evidence: [
        'Public GitLab project: https://gitlab.com/asadyare/aws-guardrail-pipeline',
        'Pipeline definition: `.gitlab-ci.yml`. Checker package: `src/guardrail_compliance/`. Example baseline: `terraform/examples/account_baseline/`.',
        'Example OIDC trust policy and read-only scanner policy: `docs/gitlab-oidc-trust-policy.json` and `docs/scanner-read-policy.json`. They are examples; CI does not apply them.',
        'Committed plan fixture and drift test: `tests/fixtures/plans/baseline_good.json` and `tests/plan_factory.py`.',
        'What not to commit, and how to report a vulnerability, are in `SECURITY.md`.',
      ],
      diagramUrl: null,
      diagramCaption: null,
    },
  },
  {
    slug: 'aws-guardrail-scanner',
    category: 'aws-guardrail-projects',
    title: 'AWS Guardrail Scanner',
    shortTitle: 'AWS Guardrail Scanner',
    repoUrl: 'https://github.com/asadyare/aws-guardrail-scanner',
    createdAt: '2026-10-27T17:38:02Z',
    badgeUrl:
      'https://github.com/asadyare/aws-guardrail-scanner/actions/workflows/ci.yml/badge.svg',
    tags: ['Python', 'boto3', 'CIS', 'FSBP', 'SARIF', 'Trivy'],
    featured: true,
    icon: CommandLineIcon,
    accent: 'secondary',
    goal:
      'Read-only Python 3.12 and boto3 CLI that checks one AWS account against CIS AWS Foundations Benchmark v3.0.0 and AWS FSBP, and can fail a pipeline when a finding is serious enough.',
    tech: ['Python 3.12', 'boto3', 'pytest', 'moto', 'Ruff', 'mypy', 'Bandit', 'pip-audit', 'Trivy', 'Docker'],
    concepts: [
      'Get, List, and Describe calls only',
      'Table, JSON, or SARIF; non-zero exit at or above --fail-on',
      'pytest and moto; CI coverage floor of 80%',
    ],
    caseStudy: {
      summary:
        'A read-only command-line scanner (package `aws-guardrail-scanner` 0.1.0, not published to PyPI) that checks one AWS account for a short list of misconfigurations and can stop a release when a finding meets `--fail-on`. Checks cover account and bucket S3 Block Public Access, public ACLs and bucket policies, IAM console MFA, root access keys and root MFA, access-key age, security groups open to SSH, RDP, or all ports, default security groups, multi-Region CloudTrail, and EBS encryption by default. Output is a table, JSON (`report_version` 1), or SARIF 2.1.0. The tool’s own CI does not scan an AWS account.',
      context: [
        'S3 and IAM checks are account-wide. Security groups and EBS encryption by default run once per Region named on the command line. CloudTrail is asked once, from the first Region, and includes multi-Region trails. If `--region` is omitted, the profile or `AWS_DEFAULT_REGION` is used; the tool does not guess `us-east-1`.',
        'Each check is a class that receives a `ScanContext` and returns findings. A failed read is recorded and the scan continues, so one denied API does not hide the rest of the account. Calls use the user agent `aws-guardrail-scanner/0.1.0`. Nothing in the tool calls a write API.',
        'The worked example in the README is a run against moto, not a production account. The account id `123456789012` in that output is moto’s. Tests under `tests/` use moto and do not call AWS.',
      ],
      securityRequirements: [
        'Read-only IAM. `iam/scanner-policy.json` allows only Get, List, and Describe actions, plus `sts:GetCallerIdentity`, with `Resource` `*` because those account-level reads do not all support a resource ARN. A test fails if that file drifts from the calls in the code.',
        'No AWS calls in tests. pytest uses moto. Coverage is configured to fail the run under 80% (`--cov-fail-under=80` and `fail_under = 80`). The README says the suite sits above that floor and does not publish a measured percentage.',
        'A pipeline that uses the scanner should assume a role. The README shows a GitHub OIDC example. This repository does not ship a trust policy, because the account id and audience belong to the account that runs it.',
        'Without `--fail-on`, findings are printed and the process exits 0. Exit 1 means a finding is at or above `--fail-on`. Exit 2 means the command was wrong, the profile was missing, or AWS could not be asked who the caller is. A read error is included in the report and does not by itself change the exit code.',
      ],
      pipeline: [
        {
          title: 'Tool CI (ci.yml)',
          items: [
            'On pull requests and pushes to `main`: Ruff (lint and format), mypy (strict), pytest, Bandit, pip-audit, and Trivy.',
            'Trivy scans the image built in the workflow for CRITICAL and HIGH operating-system and library issues, ignores unfixed issues, and fails the job on those severities.',
            'Actions are pinned to full commit SHAs. Workflow permissions are `contents: read`. Dependabot is configured for pip, GitHub Actions, and Docker.',
          ],
        },
        {
          title: 'Using it as a gate',
          items: [
            'The repository’s own workflow does not scan an AWS account. The README shows a consuming workflow that assumes a role, installs the package, runs `aws-guardrail-scanner --region eu-west-1 --output sarif --fail-on high`, and uploads SARIF.',
            '`--fail-on high` fails the job on high and critical findings. Medium and low still appear in the SARIF file. The documented upload step uses `if: always()` so the file is uploaded when the gate fails.',
          ],
        },
        {
          title: 'Packaging',
          items: [
            'Requires Python 3.12. Install from a checkout (`pipx install .`) or from the git URL. The Docker image is built locally and is not in a public registry. The container runs as user `scanner` (uid 10001), not root.',
            '`--checks` takes ids or prefixes (`s3` runs every S3 check, `ec2-sg` runs the three world-ingress checks). `--list-checks` prints the catalogue.',
          ],
        },
      ],
      controls: [
        'References named on the checks are CIS AWS Foundations Benchmark v3.0.0 and AWS Foundational Security Best Practices in Security Hub CSPM. Severities are this tool’s rating. They drop when a guardrail already contains the exposure: a public ACL behind `IgnorePublicAcls` is still reported, at low, so it stays visible without failing a `--fail-on high` gate.',
        'Check ids: `s3-account-block-public-access`, `s3-bucket-block-public-access`, `s3-public-acl`, `s3-public-policy`, `s3-default-encryption`, `iam-user-mfa`, `iam-root-access-keys`, `iam-root-mfa`, `iam-access-key-age`, `ec2-sg-ssh-open`, `ec2-sg-rdp-open`, `ec2-sg-all-ports-open`, `ec2-default-security-group`, `cloudtrail-multi-region`, `ec2-ebs-default-encryption`.',
        'S3 default encryption is low severity hygiene. The README notes FSBP S3.4 was retired on 20 September 2023 because S3 applies SSE-S3 by default, and that this check is not proof that objects are plaintext.',
        'Root hardware MFA versus virtual MFA is not distinguished, so FSBP IAM.6 is not claimed. An access key that is exactly 90 days old still passes `iam-access-key-age`. Users without a login profile are skipped by `iam-user-mfa`.',
        'Limits stated in the README: one account and only the Regions you name (no organisation loop and no `AssumeRole` into member accounts); managed prefix lists on security groups are not expanded; CloudTrail log-file validation and access logging of the log bucket are not checked; S3 objects are not listed. A denied API becomes an error in the report, not a passing control.',
      ],
      evidence: [
        'Public repository: https://github.com/asadyare/aws-guardrail-scanner',
        'Check catalogue and IAM policy: README and `iam/scanner-policy.json`. CI: `.github/workflows/ci.yml`.',
        'Tests: `tests/` (pytest, moto). Coverage floor is set in `pyproject.toml`.',
        'Vulnerability reports for the tool itself go to GitHub security advisories (`SECURITY.md`). A finding about an AWS account is not a vulnerability in this repository.',
      ],
      diagramUrl: null,
      diagramCaption: null,
    },
  },
  {
    slug: 'portfolio-ci-cd-security',
    category: 'portfolio-projects',
    title: 'CI/CD Security for Portfolio Application',
    shortTitle: 'portfolio-ci-cd-security',
    repoUrl: 'https://github.com/asadyare/portfolio-ci-cd-security',
    createdAt: '2026-02-02T19:34:09Z',
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
    createdAt: '2026-01-16T19:15:55Z',
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
    createdAt: '2026-02-06T15:15:55Z',
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
    createdAt: '2026-02-02T19:34:11Z',
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
    createdAt: '2026-02-02T19:34:13Z',
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
  {
    slug: 'secure-banking-app',
    category: 'bank-app-projects',
    title: 'Banking web application (demo)',
    shortTitle: 'Bank app demo',
    repoUrl: 'https://github.com/asadyare/secure-banking-app',
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
    title: 'Healthcare Apps (CareConnect360, MedTrack Pro, HealthHub)',
    shortTitle: 'Healthcare_Apps',
    repoUrl: 'https://github.com/asadyare/Healthcare_Apps',
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

/** Case studies shown in the homepage “Core Projects” grid — all `featured` items, ordered by category then slug */
export function getHomePageCaseStudies() {
  const categoryOrder = new Map(projectCategories.map((pc) => [pc.id, pc.order]))
  return caseStudies
    .filter((c) => c.featured)
    .slice()
    .sort((a, b) => {
      const oa = categoryOrder.get(a.category) ?? 99
      const ob = categoryOrder.get(b.category) ?? 99
      if (oa !== ob) return oa - ob
      return a.slug.localeCompare(b.slug)
    })
}
