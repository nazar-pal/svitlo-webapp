import { Card, Chip } from '@heroui/react'
import { Link } from '@tanstack/react-router'
import { AlertTriangle, CheckCircle } from 'lucide-react'

import type { Generator, GeneratorSession } from '@/data/client/db-schema'
import type {
  MaintenanceRecord,
  MaintenanceTemplate
} from '@/data/client/db-schema/maintenance'
import { useElapsedHours, formatHours } from '@/lib/hooks/use-elapsed-time'
import { computeGeneratorStatus } from '@/lib/hooks/use-generator-status'
import { computeMaintenanceDue } from '@/lib/hooks/use-maintenance-due'
import { useRestCountdown } from '@/lib/hooks/use-rest-countdown'

interface AttentionRequiredProps {
  generators: Generator[]
  sessions: GeneratorSession[]
  templates: MaintenanceTemplate[]
  records: MaintenanceRecord[]
  organizationId: string
}

interface AttentionItem {
  id: string
  generatorId: string
  type: 'warning' | 'overdue' | 'resting'
  label: string
  detail: string
}

export default function AttentionRequired({
  generators,
  sessions,
  templates,
  records,
  organizationId
}: AttentionRequiredProps) {
  const items: AttentionItem[] = []

  for (const generator of generators) {
    const genSessions = sessions.filter(s => s.generatorId === generator.id)
    const statusInfo = computeGeneratorStatus(generator, genSessions)

    if (statusInfo.status === 'running' && statusInfo.openSession) {
      items.push({
        id: `warning-${generator.id}`,
        generatorId: generator.id,
        type: 'warning',
        label: generator.title,
        detail: '' // filled by WarningItem component with live data
      })
    }

    if (statusInfo.status === 'resting' && statusInfo.restEndsAt) {
      items.push({
        id: `resting-${generator.id}`,
        generatorId: generator.id,
        type: 'resting',
        label: generator.title,
        detail: '' // filled by RestingItem component with live data
      })
    }

    const genTemplates = templates.filter(t => t.generatorId === generator.id)
    for (const template of genTemplates) {
      const dueInfo = computeMaintenanceDue(template, records, genSessions)
      if (dueInfo.urgency === 'overdue')
        items.push({
          id: `overdue-${template.id}`,
          generatorId: generator.id,
          type: 'overdue',
          label: template.taskName,
          detail: generator.title
        })
    }
  }

  return (
    <section>
      <h2 className="text-foreground mb-3 text-lg font-semibold">
        Attention Required
      </h2>
      <Card>
        <Card.Content>
          {items.length === 0 ? (
            <div className="flex items-center gap-2 py-2">
              <CheckCircle className="text-accent size-5" />
              <p className="text-muted text-sm">All clear</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {items.map(item => (
                <Link
                  key={item.id}
                  to="/dashboard/$organizationId/generators/$generatorId"
                  params={{
                    organizationId,
                    generatorId: item.generatorId
                  }}
                  className="hover:bg-muted/10 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
                >
                  <AlertTriangle
                    className={
                      item.type === 'overdue'
                        ? 'text-danger size-4'
                        : 'text-warning size-4'
                    }
                  />
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <p className="text-foreground truncate text-sm font-medium">
                      {item.label}
                    </p>
                    {item.type === 'overdue' && (
                      <Chip
                        size="sm"
                        variant="soft"
                        className="bg-danger-soft text-danger-soft-foreground"
                      >
                        Overdue
                      </Chip>
                    )}
                    {item.type === 'resting' && (
                      <Chip
                        size="sm"
                        variant="soft"
                        className="bg-warning-soft text-warning-soft-foreground"
                      >
                        Resting
                      </Chip>
                    )}
                    {item.type === 'warning' && (
                      <Chip
                        size="sm"
                        variant="soft"
                        className="bg-warning-soft text-warning-soft-foreground"
                      >
                        Warning
                      </Chip>
                    )}
                  </div>
                  {item.type === 'warning' && (
                    <WarningDetail
                      generator={
                        generators.find(g => g.id === item.generatorId)!
                      }
                      sessions={sessions}
                    />
                  )}
                  {item.type === 'resting' && (
                    <RestingDetail
                      generator={
                        generators.find(g => g.id === item.generatorId)!
                      }
                      sessions={sessions}
                    />
                  )}
                  {item.type === 'overdue' && (
                    <p className="text-muted shrink-0 text-xs">{item.detail}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>
    </section>
  )
}

function WarningDetail({
  generator,
  sessions
}: {
  generator: Generator
  sessions: GeneratorSession[]
}) {
  const genSessions = sessions.filter(s => s.generatorId === generator.id)
  const openSession = genSessions.find(s => !s.stoppedAt)
  const elapsedHours = useElapsedHours(openSession?.startedAt ?? null)
  const percentage = Math.min(
    (elapsedHours / generator.maxConsecutiveRunHours) * 100,
    100
  )

  // Only show if actually at warning threshold
  if (percentage < generator.runWarningThresholdPct) return null

  return (
    <p className="text-warning shrink-0 text-xs tabular-nums">
      {formatHours(elapsedHours)} /{' '}
      {formatHours(generator.maxConsecutiveRunHours)}
    </p>
  )
}

function RestingDetail({
  generator,
  sessions
}: {
  generator: Generator
  sessions: GeneratorSession[]
}) {
  const genSessions = sessions.filter(s => s.generatorId === generator.id)
  const statusInfo = computeGeneratorStatus(generator, genSessions)
  const { remainingFormatted } = useRestCountdown(
    statusInfo.restEndsAt,
    generator.requiredRestHours
  )

  return (
    <p className="text-muted shrink-0 text-xs tabular-nums">
      {remainingFormatted}
    </p>
  )
}
