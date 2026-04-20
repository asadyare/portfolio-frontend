import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import {
  getCaseStudiesByCategory,
  getCaseStudyBySlug,
  getCategoryMeta,
  isValidCategoryId,
  projectCasePath,
} from '../data/caseStudies'
import { formatRepoCreatedAt } from '../utils/formatProjectDate'

export default function ProjectCategoryIndex() {
  const { categoryId } = useParams()

  // Legacy bookmark: /projects/portfolio-ci-cd-security → /projects/portfolio-projects/portfolio-ci-cd-security
  const legacyStudy = categoryId ? getCaseStudyBySlug(categoryId) : null
  if (legacyStudy) {
    return <Navigate to={projectCasePath(legacyStudy.category, legacyStudy.slug)} replace />
  }

  if (!categoryId || !isValidCategoryId(categoryId)) {
    return (
      <div className="container mx-auto px-6 py-24 max-w-2xl text-center">
        <h1 className="text-2xl font-bold text-foreground font-display mb-4">Category not found</h1>
        <p className="text-muted-foreground mb-8">
          No project group matches <code className="text-primary">{categoryId}</code>. Use a path like{' '}
          <code className="text-xs bg-muted px-2 py-1 rounded">/projects/portfolio-projects</code>.
        </p>
        <Link to="/projects" className="text-primary font-medium hover:underline inline-flex items-center gap-2">
          <ArrowLeftIcon className="w-4 h-4" />
          All project groups
        </Link>
      </div>
    )
  }

  const meta = getCategoryMeta(categoryId)
  const list = [...getCaseStudiesByCategory(categoryId)].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <div className="w-full min-h-[70vh]">
      <div className="border-b border-border bg-card/20">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            All project groups
          </Link>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-primary tracking-wide uppercase">{meta?.id}</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 text-foreground font-display">{meta?.label}</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">{meta?.description}</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/20 px-8 py-16 text-center">
            <p className="text-muted-foreground max-w-md mx-auto">
              No case studies in this group yet. When you add repositories, register them in{' '}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">src/data/caseStudies.js</code>{' '}
              with <code className="text-xs">category: &apos;{categoryId}&apos;</code>.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {list.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.li
                  key={p.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={projectCasePath(categoryId, p.slug)}
                    className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {p.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.caseStudy.summary}</p>
                        {formatRepoCreatedAt(p.createdAt) && (
                          <p className="text-xs text-muted-foreground/90 mt-2">
                            Repo created{' '}
                            <time dateTime={p.createdAt}>{formatRepoCreatedAt(p.createdAt)}</time>
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {p.tags.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2 py-0.5 rounded-md bg-secondary/60 text-secondary-foreground border border-border"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary shrink-0 sm:pr-2">
                      Case study
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </motion.li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
