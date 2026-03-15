import { Button } from '@heroui/react'
import {
  createFileRoute,
  Navigate,
  useNavigate,
  useSearch
} from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { useUserOrgs } from '@/lib/hooks/use-user-orgs'
import CreateOrganizationModal from './-sidebar/CreateOrganizationModal'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome
})

function DashboardHome() {
  const { userOrgs, userId } = useUserOrgs()
  const { modal } = useSearch({ from: '/dashboard' })
  const navigate = useNavigate({ from: '/dashboard' })

  if (userOrgs.length > 0)
    return (
      <Navigate
        to="/dashboard/$organizationId"
        params={{ organizationId: userOrgs[0].id }}
        replace
      />
    )

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h1 className="text-foreground text-2xl font-bold">Welcome to Svitlo</h1>
      <p className="text-muted">
        Create your first organization to get started.
      </p>
      <Button
        variant="primary"
        onPress={() => navigate({ search: { modal: 'create-org' } })}
      >
        <Plus size={16} />
        Create Organization
      </Button>
      <CreateOrganizationModal
        isOpen={modal === 'create-org'}
        onClose={() => navigate({ search: {} })}
        userId={userId}
      />
    </div>
  )
}
