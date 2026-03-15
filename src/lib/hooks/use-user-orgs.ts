import { eq } from 'drizzle-orm'

import {
  organizationMembers,
  organizations
} from '@/data/client/db-schema/organizations'
import { useDrizzleQuery } from '@/lib/hooks/use-drizzle-query'
import { usePowerSync } from '@/lib/powersync/context'
import { db } from '@/lib/powersync/database'

export function useUserOrgs() {
  const { userId: ctxUserId } = usePowerSync()
  const userId = ctxUserId ?? ''

  const { data: memberOrgIds } = useDrizzleQuery(
    userId
      ? db
          .select({ organizationId: organizationMembers.organizationId })
          .from(organizationMembers)
          .where(eq(organizationMembers.userId, userId))
      : undefined
  )

  const memberIdSet = new Set(memberOrgIds.map(m => m.organizationId))

  const { data: allOrgs } = useDrizzleQuery(d => d.select().from(organizations))

  const userOrgs = allOrgs.filter(
    org => org.adminUserId === userId || memberIdSet.has(org.id)
  )

  const isAdmin = (orgId: string | null) =>
    userOrgs.find(o => o.id === orgId)?.adminUserId === userId

  return { userOrgs, allOrgs, isAdmin, userId }
}
