import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import {
  getCaseStudyByCategoryAndSlug,
  getCaseStudyBySlug,
  projectCasePath,
} from '../data/caseStudies'
import { formatRepoCreatedAt } from '../utils/formatProjectDate'

function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold font-display text-foreground border-b border-border pb-3 mb-6">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function ProjectCaseStudy() {
  const { categoryId, slug } = useParams()

  const bySlugOnly = slug ? getCaseStudyBySlug(slug) : null
  if (bySlugOnly && categoryId && bySlugOnly.category !== categoryId) {
    return <Navigate to={projectCasePath(bySlugOnly.category, bySlugOnly.slug)} replace />
  }

  const project =
    categoryId && slug ? getCaseStudyByCategoryAndSlug(categoryId, slug) : null

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-24 max-w-2xl text-center">
        <h1 className="text-2xl font-bold text-foreground font-display mb-4">Project not found</h1>
        <p className="text-muted-foreground mb-8">
          No case study at{' '}
          <code className="text-primary">
            /projects/{categoryId}/{slug}
          </code>
          . Check <code className="text-xs bg-muted px-2 py-1 rounded">src/data/caseStudies.js</code> for{' '}
          <code className="text-xs">category</code> + <code className="text-xs">slug</code>.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {categoryId && (
            <Link
              to={`/projects/${categoryId}`}
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              This project group
            </Link>
          )}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            ← All project groups
          </Link>
        </div>
      </div>
    )
  }

  const { caseStudy: cs } = project
  const Icon = project.icon
  const catPath = `/projects/${project.category}`

  return (
    <article className="w-full">
      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto px-6 py-10 max-w-3xl">
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-6">
            <Link to="/projects" className="hover:text-primary transition-colors">
              All groups
            </Link>
            <span aria-hidden>/</span>
            <Link to={catPath} className="hover:text-primary transition-colors">
              {project.category.replace(/-/g, ' ')}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground">Case study</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/15 text-primary shrink-0">
                <Icon className="w-8 h-8" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-primary tracking-wide uppercase">Case study</p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display mt-1">
                  {project.title}
                </h1>
                {formatRepoCreatedAt(project.createdAt) && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Repository created{' '}
                    <time className="text-foreground/90 font-medium" dateTime={project.createdAt}>
                      {formatRepoCreatedAt(project.createdAt)}
                    </time>
                  </p>
                )}
                <p className="text-muted-foreground mt-3 leading-relaxed">{cs.summary}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-lg bg-secondary/80 text-secondary-foreground border border-border"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm font-medium text-foreground"
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                Open repository
              </a>
              {project.badgeUrl && (
                <img src={project.badgeUrl} alt="CI status" className="h-9 rounded-md opacity-90" />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-14 max-w-3xl">
        <Section title="Context">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {cs.context.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Section>

        <Section title="Security requirements">
          <ul className="space-y-3">
            {cs.securityRequirements.map((item) => (
              <li key={item} className="flex gap-3 text-foreground/90">
                <CheckCircleIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Pipeline & delivery">
          <div className="space-y-8">
            {cs.pipeline.map((stage) => (
              <div key={stage.title}>
                <h3 className="text-lg font-semibold text-foreground mb-3">{stage.title}</h3>
                <ul className="space-y-2 border-l-2 border-primary/30 pl-4 ml-1">
                  {stage.items.map((line) => (
                    <li key={line} className="text-muted-foreground leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Controls">
          <ul className="space-y-3">
            {cs.controls.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="text-primary font-mono text-sm shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Evidence">
          <ul className="space-y-3">
            {cs.evidence.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="text-primary font-mono text-sm shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {cs.diagramUrl ? (
          <Section title="Architecture">
            <figure className="rounded-xl border border-border overflow-hidden bg-muted/30">
              <img
                src={cs.diagramUrl}
                alt={cs.diagramCaption || 'Architecture diagram'}
                className="w-full h-auto"
              />
              {cs.diagramCaption && (
                <figcaption className="text-sm text-muted-foreground px-4 py-3 border-t border-border">
                  {cs.diagramCaption}
                </figcaption>
              )}
            </figure>
          </Section>
        ) : null}

        <div className="mt-16 p-6 rounded-xl border border-border bg-card/50 text-center">
          <div className="flex flex-wrap gap-6 justify-center">
            <Link
              to={catPath}
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              This project group
            </Link>
            <Link to="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
              All groups
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
