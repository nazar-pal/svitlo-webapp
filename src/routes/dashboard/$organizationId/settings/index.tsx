import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField
} from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Mail, Trash2, UserPlus } from 'lucide-react'
import { useState } from 'react'

import ConfirmDialog from '@/components/ConfirmDialog'
import UserRow from '@/components/UserRow'
import type { Invitation } from '@/data/client/db-schema/organizations'
import { user as userTable } from '@/data/client/db-schema/user'
import { removeMember } from '@/data/client/mutations/members'
import {
  cancelInvitation,
  createInvitation
} from '@/data/client/mutations/organizations'
import {
  getOrgInvitations,
  getOrgMembers,
  getOrganization
} from '@/data/client/queries/organizations'
import { useDrizzleQuery } from '@/lib/hooks/use-drizzle-query'
import { useUserOrgs } from '@/lib/hooks/use-user-orgs'
import { db } from '@/lib/powersync/database'

export const Route = createFileRoute('/dashboard/$organizationId/settings/')({
  component: OrganizationSettings
})

function OrganizationSettings() {
  const { organizationId } = Route.useParams()
  const { isAdmin, userId } = useUserOrgs()
  const admin = isAdmin(organizationId)

  const { data: [org] = [] } = useDrizzleQuery(getOrganization(organizationId))
  const { data: members } = useDrizzleQuery(getOrgMembers(organizationId))
  const { data: orgInvitations } = useDrizzleQuery(
    admin ? getOrgInvitations(organizationId) : undefined
  )

  const { data: users } = useDrizzleQuery(
    org ? db.select().from(userTable) : undefined
  )

  const userMap = new Map(users.map(u => [u.id, u]))

  if (!org) return null

  const adminUser = userMap.get(org.adminUserId)

  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="text-foreground mb-6 text-xl font-semibold">Settings</h1>

      <div className="flex flex-col gap-5">
        <Card>
          <Card.Header>
            <Card.Title>Organization</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-foreground m-0 text-base font-medium">
              {org.name}
            </p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>People</Card.Title>
            <Card.Description>
              {members.length + 1}{' '}
              {members.length + 1 === 1 ? 'member' : 'members'}
            </Card.Description>
          </Card.Header>
          <Card.Content className="flex flex-col gap-0">
            <UserRow
              user={adminUser}
              fallbackName={org.adminUserId}
              role="Admin"
            />

            {members.map(member => {
              const memberUser = userMap.get(member.userId)
              return (
                <div key={member.id}>
                  <Separator className="my-3" />
                  <div className="flex items-center gap-3">
                    <UserRow
                      user={memberUser}
                      fallbackName={member.userId}
                      role="Member"
                    />
                    {admin && (
                      <ConfirmDialog
                        heading="Remove Member"
                        message={
                          <>
                            Are you sure you want to remove{' '}
                            <span className="text-foreground font-medium">
                              {memberUser?.name ?? member.userId}
                            </span>
                            ? Their generator assignments will be transferred to
                            you.
                          </>
                        }
                        confirmLabel="Remove"
                        onConfirm={() => void removeMember(userId, member.id)}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </Card.Content>
        </Card>

        {admin && (
          <Card>
            <Card.Header>
              <Card.Title>Invitations</Card.Title>
              {orgInvitations.length > 0 && (
                <Card.Description>
                  {orgInvitations.length} pending
                </Card.Description>
              )}
            </Card.Header>
            <Card.Content className="flex flex-col gap-0">
              <PendingInvitations
                invitations={orgInvitations}
                userId={userId}
              />

              {orgInvitations.length > 0 && <Separator className="my-4" />}

              <InviteForm organizationId={organizationId} userId={userId} />
            </Card.Content>
          </Card>
        )}
      </div>
    </div>
  )
}

function PendingInvitations({
  invitations,
  userId
}: {
  invitations: Invitation[]
  userId: string
}) {
  if (invitations.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      {invitations.map(inv => (
        <div key={inv.id} className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Mail size={14} className="text-default-400 shrink-0" />
            <span className="text-foreground truncate text-sm">
              {inv.inviteeEmail}
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            isIconOnly
            className="text-danger"
            aria-label="Cancel invitation"
            onPress={() => void cancelInvitation(userId, inv.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ))}
    </div>
  )
}

function InviteForm({
  organizationId,
  userId
}: {
  organizationId: string
  userId: string
}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const result = await createInvitation(userId, {
      organizationId,
      inviteeEmail: email.trim()
    })

    if (!result.ok) return setError(result.error)
    setEmail('')
  }

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <TextField
        name="email"
        type="email"
        isRequired
        value={email}
        onChange={v => setEmail(v)}
      >
        <Label>Email address</Label>
        <Input placeholder="colleague@example.com" variant="secondary" />
        <FieldError />
      </TextField>
      {error && <p className="text-danger m-0 text-sm">{error}</p>}
      <Button type="submit" size="sm">
        <UserPlus size={14} />
        Send Invitation
      </Button>
    </Form>
  )
}
