import {
  Button,
  Card,
  Chip,
  Label,
  ListBox,
  Select,
  Separator
} from '@heroui/react'
import { UserPlus } from 'lucide-react'
import { useState } from 'react'

import ConfirmDialog from '@/components/ConfirmDialog'
import UserRow from '@/components/UserRow'
import type { User } from '@/data/client/db-schema/user'
import { user as userTable } from '@/data/client/db-schema/user'
import {
  assignUserToGenerator,
  unassignUserFromGenerator
} from '@/data/client/mutations/assignments'
import { getGeneratorAssignments } from '@/data/client/queries/generators'
import { getOrgMembers } from '@/data/client/queries/organizations'
import { useDrizzleQuery } from '@/lib/hooks/use-drizzle-query'
import { db } from '@/lib/powersync/database'

interface AssignedEmployeesProps {
  organizationId: string
  generatorId: string
  userId: string
  isAdmin: boolean
}

export default function AssignedEmployees({
  organizationId,
  generatorId,
  userId,
  isAdmin
}: AssignedEmployeesProps) {
  const { data: assignments } = useDrizzleQuery(
    getGeneratorAssignments(generatorId)
  )
  const { data: members } = useDrizzleQuery(getOrgMembers(organizationId))
  const { data: users } = useDrizzleQuery(db.select().from(userTable))

  const userMap = new Map(users.map(u => [u.id, u]))
  const assignedUserIds = new Set(assignments.map(a => a.userId))

  // Members who are not yet assigned — candidates for the dropdown
  const unassignedMembers = members.filter(m => !assignedUserIds.has(m.userId))

  return (
    <Card>
      <Card.Header>
        <Card.Title className="flex items-center gap-2">
          Assigned Employees
          <Chip size="sm" variant="soft">
            {assignments.length}
          </Chip>
        </Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col gap-0">
        {assignments.length === 0 ? (
          <p className="text-default-500 m-0 text-sm">
            No employees assigned yet
          </p>
        ) : (
          assignments.map((assignment, i) => {
            const assignedUser = userMap.get(assignment.userId)
            return (
              <div key={assignment.id}>
                {i > 0 && <Separator className="my-3" />}
                <div className="flex items-center gap-3">
                  <UserRow user={assignedUser} />
                  {isAdmin && (
                    <ConfirmDialog
                      heading="Remove Assignment"
                      message={
                        <>
                          Are you sure you want to unassign{' '}
                          <span className="text-foreground font-medium">
                            {assignedUser?.name ?? 'this user'}
                          </span>{' '}
                          from this generator?
                        </>
                      }
                      confirmLabel="Remove"
                      onConfirm={() =>
                        void unassignUserFromGenerator(
                          userId,
                          generatorId,
                          assignment.userId
                        )
                      }
                    />
                  )}
                </div>
              </div>
            )
          })
        )}

        {isAdmin && unassignedMembers.length > 0 && (
          <>
            {assignments.length > 0 && <Separator className="my-4" />}
            <AssignSelect
              unassignedMembers={unassignedMembers.map(m => ({
                userId: m.userId,
                user: userMap.get(m.userId)
              }))}
              onAssign={targetUserId =>
                void assignUserToGenerator(userId, generatorId, targetUserId)
              }
            />
          </>
        )}
      </Card.Content>
    </Card>
  )
}

function AssignSelect({
  unassignedMembers,
  onAssign
}: {
  unassignedMembers: { userId: string; user: User | undefined }[]
  onAssign: (userId: string) => void
}) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  function handleAssign() {
    if (!selectedUserId) return
    onAssign(selectedUserId)
    setSelectedUserId(null)
  }

  return (
    <div className="flex items-end gap-2">
      <Select
        selectedKey={selectedUserId}
        onSelectionChange={key => setSelectedUserId(String(key))}
        className="flex-1"
        placeholder="Select a member"
      >
        <Label>Add employee</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {unassignedMembers.map(({ userId, user }) => (
              <ListBox.Item
                key={userId}
                id={userId}
                textValue={user?.name ?? userId}
              >
                <Label>{user?.name ?? userId}</Label>
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      <Button size="sm" onPress={handleAssign} isDisabled={!selectedUserId}>
        <UserPlus size={14} />
        Assign
      </Button>
    </div>
  )
}
