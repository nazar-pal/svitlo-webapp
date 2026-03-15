import { createFileRoute } from '@tanstack/react-router'

import {
  getAllGeneratorSessions,
  getGeneratorsByOrg,
  getUserAssignments
} from '@/data/client/queries/generators'
import {
  getAllMaintenanceRecords,
  getAllMaintenanceTemplates
} from '@/data/client/queries/maintenance'
import { useDrizzleQuery } from '@/lib/hooks/use-drizzle-query'
import { computeGeneratorStatus } from '@/lib/hooks/use-generator-status'
import { useUserOrgs } from '@/lib/hooks/use-user-orgs'

import ActiveSessionCard from './-components/ActiveSessionCard'
import AttentionRequired from './-components/AttentionRequired'
import MyGeneratorsList from './-components/MyGeneratorsList'
import UpcomingMaintenance from './-components/UpcomingMaintenance'

export const Route = createFileRoute('/dashboard/$organizationId/')({
  component: OrganizationDashboard
})

function OrganizationDashboard() {
  const { organizationId } = Route.useParams()
  const { userId, isAdmin } = useUserOrgs()

  const { data: generators } = useDrizzleQuery(
    getGeneratorsByOrg(organizationId)
  )
  const { data: allSessions } = useDrizzleQuery(getAllGeneratorSessions())
  const { data: assignments } = useDrizzleQuery(
    userId ? getUserAssignments(userId) : undefined
  )
  const { data: allTemplates } = useDrizzleQuery(getAllMaintenanceTemplates())
  const { data: allRecords } = useDrizzleQuery(getAllMaintenanceRecords())

  // Filter to org generators
  const orgGenIds = new Set(generators.map(g => g.id))
  const orgSessions = allSessions.filter(s => orgGenIds.has(s.generatorId))
  const orgTemplates = allTemplates.filter(t => orgGenIds.has(t.generatorId))
  const orgRecords = allRecords.filter(r => orgGenIds.has(r.generatorId))

  // Find user's active session
  const activeSession = (() => {
    for (const generator of generators) {
      const genSessions = orgSessions.filter(
        s => s.generatorId === generator.id
      )
      const statusInfo = computeGeneratorStatus(generator, genSessions)
      if (
        statusInfo.status === 'running' &&
        statusInfo.openSession?.startedByUserId === userId
      )
        return { generator, session: statusInfo.openSession }
    }
    return null
  })()

  // Determine "my generators"
  const assignedGenIds = new Set(assignments.map(a => a.generatorId))
  const admin = isAdmin(organizationId)
  const myGenerators =
    assignedGenIds.size > 0
      ? generators.filter(g => assignedGenIds.has(g.id))
      : admin
        ? generators
        : []

  return (
    <div className="mx-auto max-w-3xl py-8">
      <h1 className="text-foreground mb-6 text-2xl font-semibold">Dashboard</h1>

      <div className="flex flex-col gap-6">
        {activeSession && (
          <ActiveSessionCard
            generator={activeSession.generator}
            session={activeSession.session}
            userId={userId}
          />
        )}

        <MyGeneratorsList
          generators={myGenerators}
          sessions={orgSessions}
          templates={orgTemplates}
          records={orgRecords}
          userId={userId}
          organizationId={organizationId}
          isAdmin={admin}
        />

        <AttentionRequired
          generators={generators}
          sessions={orgSessions}
          templates={orgTemplates}
          records={orgRecords}
          organizationId={organizationId}
        />

        <UpcomingMaintenance
          generators={generators}
          templates={orgTemplates}
          records={orgRecords}
          sessions={orgSessions}
          organizationId={organizationId}
        />
      </div>
    </div>
  )
}
