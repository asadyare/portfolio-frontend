import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, CubeIcon, ShieldCheckIcon, CodeBracketIcon, BeakerIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const skills = [
    { label: 'CI/CD', Icon: ArrowRightIcon },
    { label: 'Terraform', Icon: CubeIcon },
    { label: 'Security', Icon: ShieldCheckIcon },
    { label: 'Testing', Icon: BeakerIcon },
  ]

  return (
    <section className="pt-12 max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid gap-12 md:grid-cols-2 items-center"
      >
        {/* Left content */}
        <div>
          <p className="text-sm font-medium text-primary-500 uppercase tracking-wider mb-2">DevSecOps Engineer</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-indigo-600 bg-clip-text text-transparent">
              Secure pipelines,
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">faster delivery</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
            I build automated CI/CD pipelines with security in mind. I merge infrastructure, policy, and testing into reliable, repeatable releases.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/projects"
              className="group inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300"
            >
              View Projects
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-500/5 text-center font-medium transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right featured card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-blue-600 to-indigo-700 p-8 text-white shadow-2xl shadow-primary-500/20"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
          <div className="relative">
            <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">Featured</div>
            <h3 className="mt-3 text-2xl md:text-3xl font-bold">Portfolio Overview</h3>
            <p className="mt-2 text-white/90 text-lg">
              Highlights of CI/CD, IaC, and security automations.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {skills.map(({ label, Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/25 transition-colors"
                >
                  <Icon className="w-5 h-5 text-white/90" />
                  <span className="font-medium">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
