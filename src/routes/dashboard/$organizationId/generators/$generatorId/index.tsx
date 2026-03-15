import { createFileRoute } from '@tanstack/react-router'

import { getGenerator } from '@/data/client/queries/generators'
import { useDrizzleQuery } from '@/lib/hooks/use-drizzle-query'

export const Route = createFileRoute(
  '/dashboard/$organizationId/generators/$generatorId/'
)({
  component: GeneratorDetail
})

function GeneratorDetail() {
  const { generatorId } = Route.useParams()
  const { data: generators } = useDrizzleQuery(getGenerator(generatorId))
  const generator = generators[0]

  return (
    <div>
      <h1 className="text-foreground mb-2 text-3xl font-bold">
        {generator?.title ?? 'Generator'}
      </h1>
      <p className="text-muted">ID: {generatorId}</p>
    </div>
  )
}
