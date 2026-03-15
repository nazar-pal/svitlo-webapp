import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$organizationId/')({
  component: OrganizationDashboard
})

function OrganizationDashboard() {
  const { organizationId } = Route.useParams()

  return (
    <div>
      <h1 className="text-foreground mb-2 text-3xl font-bold">Dashboard</h1>
      <p className="text-muted">Organization: {organizationId}</p>
    </div>
  )
}
