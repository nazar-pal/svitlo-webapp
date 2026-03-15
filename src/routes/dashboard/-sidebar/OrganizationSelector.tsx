import { Button, Chip, Dropdown, Label } from '@heroui/react'
import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { ChevronDown, Plus } from 'lucide-react'

import type { Organization } from '@/data/client/db-schema/organizations'
import CreateOrganizationModal from './CreateOrganizationModal'

interface OrganizationSelectorProps {
  organizations: Organization[]
  userId: string
  onNavigate?: () => void
}

export default function OrganizationSelector({
  organizations,
  userId,
  onNavigate
}: OrganizationSelectorProps) {
  const { organizationId } = useParams({ strict: false })
  const { modal } = useSearch({ from: '/dashboard' })
  const navigate = useNavigate()

  const selectedOrg = organizations.find(o => o.id === organizationId)

  function handleAction(key: React.Key) {
    if (key === 'create-org') {
      navigate({ to: '.', search: { modal: 'create-org' } })
      return
    }
    navigate({
      to: '/dashboard/$organizationId',
      params: { organizationId: String(key) }
    })
    onNavigate?.()
  }

  return (
    <div className="px-4 py-2">
      <Dropdown>
        <Button variant="ghost" size="sm" className="w-full justify-between">
          <span className="truncate">{selectedOrg?.name ?? 'Select org'}</span>
          <ChevronDown size={14} />
        </Button>
        <Dropdown.Popover isNonModal>
          <Dropdown.Menu onAction={handleAction}>
            {organizations.map(org => (
              <Dropdown.Item key={org.id} id={org.id} textValue={org.name}>
                <Label>{org.name}</Label>
                {org.adminUserId === userId && (
                  <Chip size="sm" variant="secondary">
                    Admin
                  </Chip>
                )}
              </Dropdown.Item>
            ))}
            <Dropdown.Section />
            <Dropdown.Item id="create-org" textValue="Create Organization">
              <Plus size={14} />
              <Label>Create Organization</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <CreateOrganizationModal
        isOpen={modal === 'create-org'}
        onClose={() => navigate({ to: '.', search: {} })}
        userId={userId}
      />
    </div>
  )
}
