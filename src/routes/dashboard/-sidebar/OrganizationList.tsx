import { Button, Chip } from '@heroui/react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import type { Organization } from '@/data/client/db-schema/organizations'
import CreateOrganizationModal from './CreateOrganizationModal'

interface OrganizationListProps {
  organizations: Organization[]
  userId: string
  onNavigate?: () => void
}

export default function OrganizationList({
  organizations,
  userId,
  onNavigate
}: OrganizationListProps) {
  const { modal } = useSearch({ from: '/dashboard' })
  const navigate = useNavigate()

  function closeModal() {
    navigate({ to: '/dashboard', search: {} })
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-muted m-0 text-xs font-medium tracking-wider uppercase">
          Organizations
        </p>
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          onPress={() =>
            navigate({ to: '/dashboard', search: { modal: 'create-org' } })
          }
          aria-label="Create organization"
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {organizations.map(org => (
          <Link
            key={org.id}
            to="/dashboard"
            className="hover:bg-default-100 flex items-center gap-2 rounded-lg px-2 py-2 no-underline"
            onClick={onNavigate}
          >
            <span className="text-foreground truncate text-sm">{org.name}</span>
            {org.adminUserId === userId && (
              <Chip size="sm" variant="secondary">
                Admin
              </Chip>
            )}
          </Link>
        ))}
      </div>

      <CreateOrganizationModal
        isOpen={modal === 'create-org'}
        onClose={closeModal}
        userId={userId}
      />
    </div>
  )
}
