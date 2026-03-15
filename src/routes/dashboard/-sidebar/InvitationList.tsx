import { Button, Chip } from '@heroui/react'
import { Check, X } from 'lucide-react'

import type {
  Invitation,
  Organization
} from '@/data/client/db-schema/organizations'
import type { User } from '@/data/client/db-schema/user'
import {
  acceptInvitation,
  declineInvitation
} from '@/data/client/mutations/organizations'

interface InvitationListProps {
  invitations: Invitation[]
  allOrgs: Organization[]
  allUsers: User[]
  userId: string
  userEmail: string
}

export default function InvitationList({
  invitations,
  allOrgs,
  allUsers,
  userId,
  userEmail
}: InvitationListProps) {
  if (invitations.length === 0) return null

  const orgMap = new Map(allOrgs.map(o => [o.id, o]))
  const userMap = new Map(allUsers.map(u => [u.id, u]))

  return (
    <div className="px-2 pb-2">
      <div className="flex items-center gap-2 px-2 py-2">
        <p className="text-muted m-0 text-xs font-medium tracking-wider uppercase">
          Invitations
        </p>
        <Chip size="sm">{invitations.length}</Chip>
      </div>

      {invitations.map(inv => {
        const org = orgMap.get(inv.organizationId)
        const inviter = userMap.get(inv.invitedByUserId)
        return (
          <div
            key={inv.id}
            className="bg-default-100 flex items-center justify-between rounded-lg px-3 py-2"
          >
            <div className="min-w-0 flex-1">
              <p className="text-foreground m-0 truncate text-sm">
                {org?.name ?? 'Unknown'}
              </p>
              {inviter && (
                <p className="text-muted m-0 truncate text-xs">
                  from {inviter.name}
                </p>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                size="sm"
                isIconOnly
                variant="ghost"
                onPress={() => void acceptInvitation(userId, userEmail, inv.id)}
                aria-label="Accept invitation"
                className="text-success"
              >
                <Check size={14} />
              </Button>
              <Button
                size="sm"
                isIconOnly
                variant="ghost"
                onPress={() => void declineInvitation(userEmail, inv.id)}
                aria-label="Decline invitation"
                className="text-danger"
              >
                <X size={14} />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
