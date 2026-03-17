import { motion } from 'framer-motion'
import {
  CodeBracketIcon,
  CloudIcon,
  CubeIcon,
  ServerStackIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline'

const skills = [
  { label: 'GitHub Actions', desc: 'CI/CD security pipelines with automated scanning', icon: CodeBracketIcon },
  { label: 'AWS', desc: 'VPC, IAM, EKS, and image delivery with GHCR', icon: CloudIcon },
  { label: 'Docker', desc: 'Multi-stage secure builds and image hardening', icon: CubeIcon },
  { label: 'Kubernetes', desc: 'Helm-ready patterns, network policies, and RBAC hardening', icon: ServerStackIcon },
  { label: 'Terraform', desc: 'Modular IaC with environment separation and validation', icon: Cog6ToothIcon },
  { label: 'Security Scanning', desc: 'Trivy + Gitleaks + Semgrep gates for code, deps, and images', icon: ShieldCheckIcon },
  { label: 'Prometheus', desc: 'Metrics collection and service monitoring for security signals', icon: ChartBarIcon },
  { label: 'Grafana', desc: 'Dashboards for portfolio health and evidence', icon: ChartPieIcon },
]

export default function BlueprintSkillsSection() {
  return (
    <section id="skills" className="py-24 scroll-mt-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-semibold text-sm text-primary tracking-widest uppercase">Tech Stack</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Core <span className="text-gradient-neon">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-gradient rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 hover:border-primary-500/40 transition-all duration-300 group"
              >
                <Icon className="w-8 h-8 text-primary mb-4 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.45)] transition-all" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{skill.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{skill.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

