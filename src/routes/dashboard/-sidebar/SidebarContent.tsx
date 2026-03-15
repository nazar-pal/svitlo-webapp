import { Button, Chip, Separator } from '@heroui/react'
import { Link } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

import { authClient } from '@/lib/auth/auth-client'
import { signOut } from '@/lib/auth/sign-out'
import { useDrizzleQuery } from '@/lib/hooks/use-drizzle-query'
import { useUserOrgs } from '@/lib/hooks/use-user-orgs'
import { getInvitationsByEmail } from '@/data/client/queries/organizations'
import { SyncStatusIndicator } from '@/components/sync-status-indicator'
import ThemeToggle from '@/components/ThemeToggle'
import InvitationList from './InvitationList'
import OrganizationList from './OrganizationList'
import UserProfile from './UserProfile'

interface SidebarContentProps {
  onNavigate?: () => void
}

export default function SidebarContent({ onNavigate }: SidebarContentProps) {
  const { data: session } = authClient.useSession()
  const user = session?.user
  const { userOrgs, allOrgs, userId } = useUserOrgs()

  const email = user?.email ?? ''
  const { data: invitations } = useDrizzleQuery(
    email ? getInvitationsByEmail(email) : undefined
  )

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <Link
          to="/dashboard"
          className="inline-block no-underline"
          onClick={onNavigate}
        >
          <Chip color="accent" variant="secondary" size="sm">
            Svitlo
          </Chip>
        </Link>
      </div>

      <Separator />

      {user && (
        <UserProfile
          name={user.name ?? ''}
          email={user.email ?? ''}
          image={user.image ?? null}
        />
      )}

      <SyncStatusIndicator />

      <Separator />

      <OrganizationList
        organizations={userOrgs}
        userId={userId}
        onNavigate={onNavigate}
      />

      <InvitationList
        invitations={invitations}
        allOrgs={allOrgs}
        userId={userId}
        userEmail={email}
      />

      <Separator />

      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          onPress={() => void signOut()}
          aria-label="Sign out"
        >
          <LogOut size={16} />
        </Button>
      </div>
    </div>
  )
}
