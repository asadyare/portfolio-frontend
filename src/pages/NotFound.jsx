import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta({
    title: 'Page not found | Asad Ali Hassan',
    description: 'No page on asads-portfolio.uk matches that address.',
    path: '/',
  })

  return (
    <div className="container mx-auto px-6 py-24 max-w-2xl text-center min-h-[60vh]">
      <p className="text-sm font-semibold text-primary tracking-widest uppercase">404</p>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display mt-3">Page not found</h1>
      <p className="text-muted-foreground mt-4 leading-relaxed">
        That address is not on this site. The case studies and the rest of the portfolio are linked below.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link to="/" className="text-primary font-medium hover:underline">
          Home
        </Link>
        <Link to="/projects" className="text-primary font-medium hover:underline">
          Projects
        </Link>
      </div>
    </div>
  )
}
