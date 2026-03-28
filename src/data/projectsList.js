/**
 * Shared list for legacy components (e.g. ProjectsPreview). Prefer `caseStudies.js` for new work.
 */
import { caseStudies, projectCasePath } from './caseStudies'

export const projects = caseStudies
  .filter((c) => c.featured)
  .map((c) => ({
    id: c.slug,
    slug: c.slug,
    category: c.category,
    caseStudyPath: projectCasePath(c.category, c.slug),
    title: c.title,
    description: c.caseStudy.summary,
    tags: c.tags,
    repoUrl: c.repoUrl,
    badgeUrl: c.badgeUrl,
    featured: c.featured,
  }))

/** Projects to show in the home page "Selected projects" section */
export const featuredProjects = projects
