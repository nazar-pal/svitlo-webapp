import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$organizationId/generators')({
  ssr: false,
  component: GeneratorsLayout
})

function GeneratorsLayout() {
  return <Outlet />
}
