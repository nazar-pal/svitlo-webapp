import { Button, Separator } from '@heroui/react'
import { Link, useParams } from '@tanstack/react-router'
import { LogOut, Settings } from 'lucide-react'

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
      <div className="flex items-center gap-3 px-4 py-5">
        <img src="/favicon.png" alt="Svitlo" className="size-8" />
        <span className="text-foreground text-lg font-semibold tracking-tight">
          Svitlo
        </span>
      </div>

      <Separator />

      <OrganizationSelector
        organizations={userOrgs}
        userId={userId}
        onNavigate={onNavigate}
      />

      <GeneratorList
        organizationId={organizationId}
        userId={userId}
        isAdmin={isAdmin(organizationId ?? null)}
        onNavigate={onNavigate}
      />

      <InvitationList
        invitations={invitations}
        allOrgs={allOrgs}
        userId={userId}
        userEmail={email}
      />

      <Separator />

      <div className="flex-1" />

      <SyncStatusIndicator />

      <Separator />

      {organizationId && (
        <div className="px-2 py-1">
          <Link
            to="/dashboard/$organizationId/settings"
            params={{ organizationId }}
            onClick={onNavigate}
            className="text-muted hover:text-foreground flex items-center gap-2 rounded-lg px-2 py-2 text-sm no-underline transition-colors"
          >
            <Settings size={14} />
            Settings
          </Link>
        </div>
      )}

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
