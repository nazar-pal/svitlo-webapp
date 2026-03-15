import { Button, Chip, Tabs } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
import { Pencil } from 'lucide-react'
import { useState } from 'react'

import {
  getGenerator,
  getGeneratorSessions
} from '@/data/client/queries/generators'
import {
  getMaintenanceRecords,
  getMaintenanceTemplates
} from '@/data/client/queries/maintenance'
import { useDrizzleQuery } from '@/lib/hooks/use-drizzle-query'
import { computeGeneratorStatus } from '@/lib/hooks/use-generator-status'
import { useUserOrgs } from '@/lib/hooks/use-user-orgs'

import AssignedEmployees from './-components/AssignedEmployees'
import EditGeneratorModal from './-components/EditGeneratorModal'
import MaintenancePlans from './-components/MaintenancePlans'
import RuntimeCard from './-components/RuntimeCard'
import SessionHistory from './-components/SessionHistory'

export const Route = createFileRoute(
  '/dashboard/$organizationId/generators/$generatorId/'
)({
  component: GeneratorDetail
})

function GeneratorDetail() {
  const { organizationId, generatorId } = Route.useParams()
  const { userId, isAdmin } = useUserOrgs()

  const { data: [generator] = [] } = useDrizzleQuery(getGenerator(generatorId))
  const { data: sessions } = useDrizzleQuery(getGeneratorSessions(generatorId))
  const { data: templates } = useDrizzleQuery(
    getMaintenanceTemplates(generatorId)
  )
  const { data: records } = useDrizzleQuery(getMaintenanceRecords(generatorId))

  const [editModalOpen, setEditModalOpen] = useState(false)

  if (!generator) return null

  const statusInfo = computeGeneratorStatus(generator, sessions)

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-semibold">
            {generator.title}
          </h1>
          {generator.description && (
            <p className="text-muted mt-1 text-sm">{generator.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Chip size="sm" variant="secondary">
            {generator.model}
          </Chip>
          <Button
            size="sm"
            variant="ghost"
            isIconOnly
            onPress={() => setEditModalOpen(true)}
            aria-label="Edit generator"
          >
            <Pencil size={14} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <AssignedEmployees
          organizationId={organizationId}
          generatorId={generatorId}
          userId={userId}
          isAdmin={isAdmin(organizationId)}
        />

        <RuntimeCard
          generator={generator}
          statusInfo={statusInfo}
          userId={userId}
        />

        <Tabs>
          <Tabs.ListContainer>
            <Tabs.List>
              <Tabs.Tab
                id="sessions"
                className="data-[selected=true]:bg-segment data-[selected=true]:shadow-surface"
              >
                Runtimes
              </Tabs.Tab>
              <Tabs.Tab
                id="maintenance"
                className="data-[selected=true]:bg-segment data-[selected=true]:shadow-surface"
              >
                Maintenance
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          <Tabs.Panel id="sessions">
            <SessionHistory
              sessions={sessions}
              userId={userId}
              generatorId={generatorId}
            />
          </Tabs.Panel>

          <Tabs.Panel id="maintenance">
            <MaintenancePlans
              templates={templates}
              records={records}
              sessions={sessions}
              userId={userId}
              generatorId={generatorId}
            />
          </Tabs.Panel>
        </Tabs>
      </div>

      <EditGeneratorModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        userId={userId}
        generator={generator}
      />
    </div>
  )
}
