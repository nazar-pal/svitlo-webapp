import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$organizationId')({
  ssr: false,
  component: OrganizationLayout
})

function OrganizationLayout() {
  return <Outlet />
}
