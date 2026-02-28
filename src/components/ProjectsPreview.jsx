import { Link } from 'react-router-dom'
import Card from './Card'
import { featuredProjects } from '../data/projectsList'

export default function ProjectsPreview() {
  return (
    <section className="py-10">
      <h2 className="text-xl font-bold text-primary-500">Selected projects</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {featuredProjects.slice(0, 2).map((p) => (
          <Card
            key={p.id}
            title={p.title}
            description={p.description}
            tags={p.tags}
            repoUrl={p.repoUrl}
            badgeUrl={p.badgeUrl}
          />
        ))}
      </div>
      <div className="mt-6">
        <Link to="/projects" className="text-primary-500 font-medium hover:underline">
          View all projects →
        </Link>
      </div>
    </section>
  )
}