import { CloudIcon, CommandLineIcon } from '@heroicons/react/24/outline'

export const awsGuardrailPipelineStudy = {
    slug: 'aws-guardrail-pipeline',
    category: 'aws-guardrail-projects',
    title: 'AWS Guardrail Pipeline',
    shortTitle: 'AWS Guardrail Pipeline',
    order: 1,
    repoUrl: 'https://gitlab.com/asadyare/aws-guardrail-pipeline',
    repos: [
      {
        label: 'GitLab',
        url: 'https://gitlab.com/asadyare/aws-guardrail-pipeline',
        badgeUrl: 'https://gitlab.com/asadyare/aws-guardrail-pipeline/badges/main/pipeline.svg',
      },
    ],
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
  }

export const awsGuardrailScannerStudy = {
    slug: 'aws-guardrail-scanner',
    category: 'aws-guardrail-projects',
    title: 'AWS Guardrail Scanner',
    shortTitle: 'AWS Guardrail Scanner',
    order: 2,
    repoUrl: 'https://github.com/asadyare/aws-guardrail-scanner',
    repos: [
      {
        label: 'GitHub',
        url: 'https://github.com/asadyare/aws-guardrail-scanner',
        badgeUrl: 'https://github.com/asadyare/aws-guardrail-scanner/actions/workflows/ci.yml/badge.svg',
      },
    ],
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
  }
