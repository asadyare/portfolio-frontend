import { motion } from 'framer-motion'
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'

const links = [
  {
    href: 'https://github.com/asadyare',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/asad-hassan-20b540313/',
    label: 'LinkedIn',
  },
  {
    href: 'mailto:walasaqo@gmail.com',
    label: 'Email',
    mail: true,
  },
  {
    href: 'https://github.com/asadyare/devsecops-portfolio-asad/raw/main/diagrams/DevSecOps_Architecture_Pack.pdf',
    label: 'Architecture Pack',
  },
]

export default function BlueprintContactSection() {
  return (
    <section id="contact" className="py-24 scroll-mt-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mx-auto w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center border border-primary-500/30 mb-6">
            <CodeBracketIcon className="w-6 h-6 text-primary-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Let&apos;s <span className="text-gradient-neon">Connect</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
            Interested in DevSecOps, platform engineering, or cloud security roles? Reach out and let&apos;s build secure delivery systems.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.mail ? undefined : '_blank'}
                rel={l.mail ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-colors"
              >
                {l.mail ? (
                  <EnvelopeIcon className="w-4 h-4" />
                ) : (
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                )}
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

