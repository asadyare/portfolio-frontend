import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

const links = [
  { href: 'https://github.com/asadyare', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/asad-hassan-20b540313/', label: 'LinkedIn' },
  { href: 'mailto:walasaqo@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="py-10 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-900 dark:text-gray-100">Asad Hassan</p>
          <p className="text-sm mt-1">&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-6">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
            >
              {label === 'Email' ? (
                <EnvelopeIcon className="w-4 h-4" />
              ) : (
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              )}
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
