import Card from './Card'
import { projects } from '../data/projectsList'

export default function Projects() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-primary-500">Projects</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 [&>*:last-child]:md:col-span-2">
        {projects.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            tags={item.tags}
            repoUrl={item.repoUrl}
            badgeUrl={item.badgeUrl}
          />
        ))}
      </div>
    </section>
  )
}
