import { motion } from 'framer-motion'
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  CubeIcon,
  ShieldCheckIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'

const stages = [
  {
    label: 'Commit / PR Trigger',
    desc: 'Push and pull requests trigger the frontend security workflow.',
    icon: CodeBracketIcon,
    status: 'complete',
  },
  {
    label: 'Build + Audit',
    desc: 'Install deps, run build, and run npm audit (high).',
    icon: BeakerIcon,
    status: 'complete',
  },
  {
    label: 'Secrets & SAST',
    desc: 'Gitleaks scans for secrets; Semgrep runs static analysis.',
    icon: ShieldCheckIcon,
    status: 'complete',
  },
  {
    label: 'Container Build',
    desc: 'Docker builds the frontend image using the trusted nginx-unprivileged Dockerfile.',
    icon: CubeIcon,
    status: 'complete',
  },
  {
    label: 'Trivy Image Scan',
    desc: 'Trivy scans the built image and fails on HIGH/CRITICAL findings.',
    icon: ShieldCheckIcon,
    status: 'complete',
  },
  {
    label: 'Terraform Validation',
    desc: 'Terraform fmt/init/validate is run before applying Cloudflare infrastructure (workflow_dispatch).',
    icon: CodeBracketIcon,
    status: 'complete',
  },
  {
    label: 'Deploy',
    desc: 'Cloudflare Pages deploy runs on push to main; image is also pushed to GHCR.',
    icon: ArrowRightIcon,
    status: 'active',
  },
]

export default function BlueprintPipelineSection() {
  return (
    <section id="pipeline" className="py-24 scroll-mt-24 relative bg-secondary/30">
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-semibold text-sm text-primary tracking-widest uppercase">Architecture</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground font-display">
            CI/CD <span className="text-gradient-neon">Security Pipeline</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Security gates at every stage, with evidence exported to SARIF and scan failures enforcing HIGH/CRITICAL blocking.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-6">
              {stages.map((stage, i) => {
                const Icon = stage.icon
                const active = stage.status === 'active'
                return (
                  <motion.div
                    key={stage.label}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="relative flex items-start gap-6 group"
                  >
                    <div
                      className={`relative z-10 flex-shrink-0 w-12 md:w-16 h-12 md:h-16 rounded-xl flex items-center justify-center border transition-all ${
                        active
                          ? 'bg-primary/20 border-primary border-2 glow-pulse'
                          : 'bg-card border-border'
                      }`}
                    >
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>

                    <div
                      className={`flex-1 card-gradient rounded-xl border p-5 transition-all ${
                        active ? 'border-2 border-glow' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-semibold text-foreground">{stage.label}</h3>
                        {stage.status === 'complete' && (
                          <CheckCircleIcon className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-medium mt-1">{stage.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

