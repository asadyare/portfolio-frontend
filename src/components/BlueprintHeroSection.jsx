import { motion } from 'framer-motion'
import { ShieldCheckIcon, ArrowRightIcon, CodeBracketIcon, CubeIcon } from '@heroicons/react/24/outline'

export default function BlueprintHeroSection() {
  return (
    <section id="top" className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent dark:from-primary-500/5" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Terminal badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-950/40 backdrop-blur-sm mb-8"
          >
            <ShieldCheckIcon className="w-4 h-4 text-primary-500" />
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
              DevSecOps Engineer
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="text-gray-900 dark:text-gray-100">Securing the </span>
            <span className="text-gradient-neon">Pipeline</span>
            <br />
            <span className="text-gray-900 dark:text-gray-100">from Code to </span>
            <span className="text-gradient-neon">Cloud</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Building secure, automated delivery with CI security gates, hardened containers, Kubernetes runtime detection, and evidence-ready observability.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm shadow-lg shadow-primary-500/20 transition-all duration-300"
            >
              <ShieldCheckIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              View Projects
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#pipeline"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-gray-200/70 dark:border-gray-700/70 hover:border-primary-500 hover:bg-primary-500/5 text-gray-900 dark:text-gray-100 font-medium text-sm transition-all duration-300"
            >
              <CodeBracketIcon className="w-4 h-4 mr-2" />
              Pipeline Architecture
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-950/30 border border-gray-200/60 dark:border-gray-800/60">
              <CubeIcon className="w-4 h-4 text-primary-500" />
              Non-root containers
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-950/30 border border-gray-200/60 dark:border-gray-800/60">
              <ShieldCheckIcon className="w-4 h-4 text-primary-500" />
              Runtime detection
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

