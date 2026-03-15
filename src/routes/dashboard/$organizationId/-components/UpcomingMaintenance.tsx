import { Card, Chip, EmptyState } from '@heroui/react'
import { Link } from '@tanstack/react-router'
import { Wrench } from 'lucide-react'

import type { Generator, GeneratorSession } from '@/data/client/db-schema'
import type {
  MaintenanceRecord,
  MaintenanceTemplate
} from '@/data/client/db-schema/maintenance'
import { formatHours } from '@/lib/hooks/use-elapsed-time'
import type { MaintenanceUrgency } from '@/lib/hooks/use-maintenance-due'
import { computeAllUpcomingMaintenance } from '@/lib/hooks/use-maintenance-due'

interface UpcomingMaintenanceProps {
  generators: Generator[]
  templates: MaintenanceTemplate[]
  records: MaintenanceRecord[]
  sessions: GeneratorSession[]
  organizationId: string
}

export default function UpcomingMaintenance({
  generators,
  templates,
  records,
  sessions,
  organizationId
}: UpcomingMaintenanceProps) {
  const allItems = computeAllUpcomingMaintenance(templates, records, sessions)
  // Filter out completed one-time tasks (they have no remaining time) and take top 5
  const items = allItems
    .filter(
      item =>
        item.urgency !== 'ok' ||
        item.hoursRemaining !== null ||
        item.daysRemaining !== null
    )
    .slice(0, 5)

  const generatorMap = new Map(generators.map(g => [g.id, g]))

  return (
    <section>
      <h2 className="text-foreground mb-3 text-lg font-semibold">
        Upcoming Maintenance
      </h2>
      <Card>
        <Card.Content>
          {items.length === 0 ? (
            <EmptyState>
              <Wrench className="text-muted size-8" />
              <p className="text-muted text-sm">
                No maintenance tasks configured
              </p>
            </EmptyState>
          ) : (
            <div className="flex flex-col gap-1">
              {items.map(item => {
                const generator = generatorMap.get(item.generatorId)
                return (
                  <Link
                    key={item.templateId}
                    to="/dashboard/$organizationId/generators/$generatorId"
                    params={{
                      organizationId,
                      generatorId: item.generatorId
                    }}
                    className="hover:bg-muted/10 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <p className="text-foreground truncate text-sm font-medium">
                        {item.taskName}
                      </p>
                      <UrgencyChip urgency={item.urgency} />
                    </div>
                    <p className="text-muted shrink-0 text-xs">
                      {generator?.title}
                    </p>
                    <p className="text-muted w-16 shrink-0 text-right text-xs tabular-nums">
                      {formatRemaining(item.hoursRemaining, item.daysRemaining)}
                    </p>
                  </Link>
                )
              })}
            </div>
          )}
        </Card.Content>
      </Card>
    </section>
  )
}

function formatRemaining(
  hoursRemaining: number | null,
  daysRemaining: number | null
): string {
  // Pick the more urgent of the two
  if (hoursRemaining !== null && daysRemaining !== null) {
    if (hoursRemaining <= 0 || daysRemaining <= 0) return 'Overdue'
    return hoursRemaining < daysRemaining * 24
      ? formatHours(hoursRemaining)
      : `${Math.round(daysRemaining)}d`
  }
  if (hoursRemaining !== null)
    return hoursRemaining <= 0 ? 'Overdue' : formatHours(hoursRemaining)
  if (daysRemaining !== null)
    return daysRemaining <= 0 ? 'Overdue' : `${Math.round(daysRemaining)}d`
  return '—'
}

function UrgencyChip({ urgency }: { urgency: MaintenanceUrgency }) {
  switch (urgency) {
    case 'overdue':
      return (
        <Chip
          size="sm"
          variant="soft"
          className="bg-danger-soft text-danger-soft-foreground"
        >
          Overdue
        </Chip>
      )
    case 'due_soon':
      return (
        <Chip
          size="sm"
          variant="soft"
          className="bg-warning-soft text-warning-soft-foreground"
        >
          Due soon
        </Chip>
      )
    case 'ok':
      return null
    default:
      return urgency satisfies never
  }
}
