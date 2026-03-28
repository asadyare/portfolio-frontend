import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { projectCategories, caseStudies } from '../data/caseStudies'

function countInCategory(categoryId) {
  return caseStudies.filter((c) => c.category === categoryId).length
}

/** Hub: /projects — choose a vertical (portfolio, bank, healthcare, …) */
export default function ProjectsIndex() {
  const sorted = [...projectCategories].sort((a, b) => a.order - b.order)

  return (
    <div className="w-full min-h-[70vh]">
      <div className="border-b border-border bg-card/20">
        <div className="container mx-auto px-6 py-16 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-semibold text-sm text-primary tracking-widest uppercase">Projects</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-3 text-foreground font-display">
              Case studies by <span className="text-gradient-neon">domain</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-2xl mx-auto leading-relaxed">
              Portfolio-related repositories live under{' '}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">/projects/portfolio-projects</code>
              .
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-14 max-w-3xl">
        <ul className="space-y-4">
          {sorted.map((cat, i) => {
            const n = countInCategory(cat.id)
            return (
              <motion.li
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/projects/${cat.id}`}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="flex-1 min-w-0 text-left">
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {cat.label}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{cat.description}</p>
                    <p className="text-xs text-muted-foreground mt-3 font-mono">
                      /projects/{cat.id}
                      {n > 0 ? (
                        <span className="ml-2 text-primary">· {n} case study{n === 1 ? '' : 'ies'}</span>
                      ) : (
                        <span className="ml-2">· coming soon</span>
                      )}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary shrink-0">
                    Open
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </motion.li>
            )
          })}
        </ul>

        <p className="text-center text-sm text-muted-foreground mt-12 max-w-lg mx-auto">
          <Link to="/" className="text-primary hover:underline">
            ← Back to home
          </Link>
          <span className="mx-2">·</span>
          <a href="/#projects" className="text-primary hover:underline">
            Projects grid on homepage
          </a>
        </p>
      </div>
    </div>
  )
}
