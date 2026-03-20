import { motion } from 'framer-motion'
import { ShieldCheckIcon, CodeBracketIcon, CubeIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

export default function BlueprintHeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark:bg-transparent"
    >
      {/* Background: hero image + dark gradient + grid, like Portfolio B */}
      <div className="absolute inset-0 z-[5]">
        {/* Hero background image (place hero-bg.jpg in /public or adjust path) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-10"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            // Reduce neon "shiny" look: less contrast + a bit less saturation.
            filter: 'saturate(1.0) contrast(0.92)',
          }}
        />
        {/* Vignette (dark edges, clearer center) */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-65"
          style={{
            background:
              'radial-gradient(circle at center,' +
              ' rgba(0,0,0,0) 0%,' +
              ' rgba(0,0,0,0.04) 55%,' +
              ' rgba(0,0,0,0.22) 100%)',
          }}
        />

        {/* Grid overlay (very subtle) */}
        <div className="absolute inset-0 grid-pattern opacity-0 dark:opacity-10" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow bg-secondary/50 backdrop-blur-sm mb-8"
          >
            <ShieldCheckIcon className="w-4 h-4 text-primary" />
            <span className="font-display font-medium text-sm text-primary">
              DevSecOps Engineer
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight font-display mb-6">
            <span className="text-foreground">Securing the </span>
            <span className="text-gradient-neon">Pipeline</span>
            <br />
            <span className="text-foreground">from Code to </span>
            <span className="text-gradient-neon">Cloud</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            Building production-grade security automation across CI/CD pipelines, Kubernetes clusters, and cloud
            infrastructure with Terraform, Docker, and observability stacks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity glow-pulse"
            >
              <ShieldCheckIcon className="w-4 h-4" />
              View Projects
            </a>
            <div className="relative inline-flex items-center justify-center">
              {/* Arrow ABOVE the Pipeline button */}
              <motion.div
                aria-hidden="true"
                className="absolute -top-5 left-4 z-10"
                animate={{ y: [0, 6, 0], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDownIcon className="w-5 h-5 text-muted-foreground" />
              </motion.div>

              <a
                href="#pipeline"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-glow text-primary font-display font-semibold text-sm hover:bg-primary/10 transition-colors"
              >
                <CodeBracketIcon className="w-4 h-4" />
                Pipeline Architecture
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
              <CubeIcon className="w-4 h-4 text-primary" />
              <span className="text-foreground">Non-root containers</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
              <ShieldCheckIcon className="w-4 h-4 text-primary" />
              <span className="text-foreground">Runtime detection</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

