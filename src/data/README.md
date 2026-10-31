# Portfolio data

## `caseStudies.js`

- **`projectCategories`** — route segments under `/projects/:categoryId`. Order on the site is AWS guardrails, the banking demo, healthcare applications, then the portfolio platform.
- Each case study has **`category`** (must match a category `id`), **`slug`**, and **`order`**.
- **`repos`** — every public repository that belongs to that case study. The portfolio platform keeps the frontend, CI/CD, Kubernetes, daily security, and threat-model links on one study.
- **`legacySlugs`** — old slugs that redirect to the portfolio platform study.

URLs:

- `/projects` — hub
- `/projects/aws-guardrail-projects/aws-guardrail-pipeline` — GitLab CI baseline
- `/projects/aws-guardrail-projects/aws-guardrail-scanner` — read-only boto3 scanner
- `/projects/bank-app-projects/secure-banking-app`
- `/projects/healthcare-app-projects/healthcare-apps`
- `/projects/portfolio-projects/portfolio-platform`

Helpers: `projectCasePath(categoryId, slug)`, `projectRepos`, `getCaseStudiesByCategory`, `getCaseStudyByCategoryAndSlug`.

**Legacy:** `/projects/<old-slug>` and `/projects/portfolio-projects/<old-slug>` redirect when `<old-slug>` is one of `legacySlugs` (the five repositories that are now the portfolio platform study).

Canonical paths for the sitemap also live in `shared/routes.js`. A test checks the two lists match.

## `projectsList.js`

Featured projects derived from `caseStudies.js`. The homepage grid uses **`getHomePageCaseStudies()`**, sorted by **`order`**.
