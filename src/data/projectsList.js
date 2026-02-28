/**
 * Shared project list for Projects page and Selected projects (home) section.
 */

export const projects = [
  {
    id: 'cicd-security',
    title: 'CI CD Security for Portfolio Application',
    description:
      'Enforced CI pipelines with dependency scanning, secrets detection, and filesystem vulnerability checks.',
    tags: ['CI CD', 'DevSecOps', 'Trivy', 'Gitleaks'],
    repoUrl: 'https://github.com/asadyare/portfolio-ci-cd-security',
    badgeUrl:
      'https://github.com/asadyare/portfolio-ci-cd-security/actions/workflows/ci-security.yml/badge.svg',
    featured: true,
  },
  {
    id: 'threat-modeling',
    title: 'Threat Modeling and Risk Analysis',
    description:
      'Structured threat modeling with risks mapped to implemented controls.',
    tags: ['Threat Modeling', 'Risk Analysis', 'Security Design'],
    repoUrl: 'https://github.com/asadyare/portfolio-threat-model',
    featured: true,
  },
  {
    id: 'daily-security',
    title: 'Daily Security Monitoring',
    description:
      'Scheduled security checks detecting dependency and vulnerability drift.',
    tags: ['Monitoring', 'GitHub Actions', 'Trivy'],
    repoUrl: 'https://github.com/asadyare/portfolio-daily-security',
    badgeUrl:
      'https://github.com/asadyare/portfolio-daily-security/actions/workflows/security-alerting-and-reporting.yml/badge.svg',
    featured: true,
  },
]

/** Projects to show in the home page "Selected projects" section */
export const featuredProjects = projects.filter((p) => p.featured)
