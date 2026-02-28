import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  Cog6ToothIcon,
  CodeBracketIcon,
  ServerStackIcon,
  CubeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

const skillGroups = [
  {
    title: 'Security & Compliance',
    icon: ShieldCheckIcon,
    items: ['SAST/DAST', 'Policy as Code', 'Secrets Management', 'Vulnerability Scanning', 'OWASP'],
  },
  {
    title: 'CI/CD & Automation',
    icon: Cog6ToothIcon,
    items: ['GitHub Actions', 'Jenkins', 'Argo CD', 'Terraform', 'Ansible'],
  },
  {
    title: 'Containers & Kubernetes',
    icon: CubeIcon,
    items: ['Docker', 'Kubernetes', 'Helm', 'Falco', 'Trivy'],
  },
  {
    title: 'Observability',
    icon: ChartBarIcon,
    items: ['Prometheus', 'Grafana', 'Loki', 'OpenTelemetry', 'Faro'],
  },
  {
    title: 'Infrastructure',
    icon: ServerStackIcon,
    items: ['AWS', 'GCP', 'Linux', 'Networking', 'IaC'],
  },
  {
    title: 'Development',
    icon: CodeBracketIcon,
    items: ['Python', 'Bash', 'YAML', 'Go', 'JavaScript'],
  },
]

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      className="px-0 py-12"
    >
      <div className="max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
          About
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          I am a DevSecOps engineer who builds secure, automated delivery systems. I focus on practical testing, policy as code, and reproducible infrastructure.
        </p>
        <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
          From threat modeling and secure CI/CD pipelines to Kubernetes security and observability, I help teams ship faster without compromising security.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Skills & Tools
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/30"
            >
              <div className="flex items-center gap-2 mb-3">
                <group.icon className="w-5 h-5 text-primary-500" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {group.title}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
