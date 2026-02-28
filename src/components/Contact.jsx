import { motion } from 'framer-motion'
import {
  EnvelopeIcon,
  DocumentArrowDownIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'
import {
  EnvelopeIcon as EnvelopeSolid,
  DocumentArrowDownIcon as DocumentSolid,
} from '@heroicons/react/24/solid'

const links = [
  {
    href: 'mailto:walasaqo@gmail.com',
    label: 'Email',
    description: 'walasaqo@gmail.com',
    icon: EnvelopeIcon,
    iconSolid: EnvelopeSolid,
  },
  {
    href: 'https://github.com/asadyare',
    label: 'GitHub',
    description: 'asadyare',
    icon: ArrowTopRightOnSquareIcon,
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/asad-hassan-20b540313/',
    label: 'LinkedIn',
    description: 'Asad Hassan',
    icon: ArrowTopRightOnSquareIcon,
    external: true,
  },
  {
    href: 'https://github.com/asadyare/devsecops-portfolio-asad/raw/main/diagrams/DevSecOps_Architecture_Pack.pdf',
    label: 'DevSecOps Architecture Pack',
    description: 'Download PDF (diagrams)',
    icon: DocumentArrowDownIcon,
    iconSolid: DocumentSolid,
    external: true,
  },
]

export default function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-16 max-w-4xl mx-auto px-4"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
          Get in Touch
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto">
          Reach me on GitHub, LinkedIn, or send an email. I'm open to collaboration and new opportunities.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {links.map((item, i) => {
          const Icon = item.iconSolid || item.icon
          return (
            <motion.a
              key={item.href}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-primary-500/50 hover:bg-primary-500/5 dark:hover:bg-primary-500/10 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-primary-500/10 text-primary-500 group-hover:bg-primary-500/20 transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-gray-900 dark:text-gray-100 block">
                  {item.label}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate block">
                  {item.description}
                </span>
              </div>
              {item.external && (
                <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-500 flex-shrink-0" />
              )}
            </motion.a>
          )
        })}
      </div>
    </motion.section>
  )
}
