import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/$organizationId/generators/$generatorId'
)({
  ssr: false,
  component: GeneratorLayout
})

function GeneratorLayout() {
  return <Outlet />
}
