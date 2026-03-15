import { Avatar, Chip } from '@heroui/react'

import type { User } from '@/data/client/db-schema/user'

interface UserRowProps {
  user: User | undefined
  fallbackName?: string
  role?: 'Admin' | 'Member'
}

export default function UserRow({ user, fallbackName, role }: UserRowProps) {
  const name = user?.name ?? fallbackName ?? 'Unknown'

  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <Avatar size="sm">
        <Avatar.Fallback>{name.charAt(0).toUpperCase()}</Avatar.Fallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-foreground m-0 truncate text-sm font-medium">
          {name}
        </p>
        {user?.email && (
          <p className="text-default-500 m-0 truncate text-xs">{user.email}</p>
        )}
      </div>
      {role && (
        <Chip size="sm" variant={role === 'Admin' ? 'secondary' : 'soft'}>
          {role}
        </Chip>
      )}
    </div>
  )
}
