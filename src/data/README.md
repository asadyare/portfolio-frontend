# Portfolio data

## `caseStudies.js`

- **`projectCategories`** — route segments under `/projects/:categoryId` (e.g. `portfolio-projects`, `bank-app-projects`, `healthcare-app-projects`). Add a row when you introduce a new vertical.
- Each case study has **`category`** (must match a category `id`) and **`slug`** (unique within that category; keep globally unique for clarity).

URLs:

- `/projects` — hub
- `/projects/portfolio-projects` — list of portfolio case studies
- `/projects/portfolio-projects/my-slug` — one case study

Helpers: `projectCasePath(categoryId, slug)`, `getCaseStudiesByCategory`, `getCaseStudyByCategoryAndSlug`.

**Legacy:** `/projects/<old-slug-only>` redirects if `<old-slug-only>` matches a case study `slug`.

## `projectsList.js`

Featured projects derived from `caseStudies.js` (includes `caseStudyPath` for cards).
