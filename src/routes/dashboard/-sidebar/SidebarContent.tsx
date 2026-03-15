import { Button, Chip, Separator } from '@heroui/react'
import { Link, useParams } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

import { authClient } from '@/lib/auth/auth-client'
import { signOut } from '@/lib/auth/sign-out'
import { useDrizzleQuery } from '@/lib/hooks/use-drizzle-query'
import { useUserOrgs } from '@/lib/hooks/use-user-orgs'
import { getInvitationsByEmail } from '@/data/client/queries/organizations'
import { SyncStatusIndicator } from '@/components/sync-status-indicator'
import ThemeToggle from '@/components/ThemeToggle'
import GeneratorList from './GeneratorList'
import InvitationList from './InvitationList'
import OrganizationSelector from './OrganizationSelector'
import UserProfile from './UserProfile'

interface SidebarContentProps {
  onNavigate?: () => void
}

export default function SidebarContent({ onNavigate }: SidebarContentProps) {
  const { data: session } = authClient.useSession()
  const user = session?.user
  const { userOrgs, allOrgs, isAdmin, userId } = useUserOrgs()
  const { organizationId } = useParams({ strict: false })

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

      <OrganizationSelector
        organizations={userOrgs}
        userId={userId}
        onNavigate={onNavigate}
      />

      <GeneratorList
        organizationId={organizationId}
        isAdmin={isAdmin(organizationId ?? null)}
        onNavigate={onNavigate}
      />

      <SyncStatusIndicator />

      <InvitationList
        invitations={invitations}
        allOrgs={allOrgs}
        userId={userId}
        userEmail={email}
      />

      <Separator />

      <div className="flex-1" />

      <Separator />

      {user && (
        <UserProfile
          name={user.name ?? ''}
          email={user.email ?? ''}
          image={user.image ?? null}
        />
      )}

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
