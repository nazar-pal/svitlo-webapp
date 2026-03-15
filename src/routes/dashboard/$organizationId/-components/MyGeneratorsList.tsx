import { Button, Card, Chip, EmptyState, ProgressBar } from '@heroui/react'
import { Link } from '@tanstack/react-router'
import { Play, Square, Zap } from 'lucide-react'

import type { Generator, GeneratorSession } from '@/data/client/db-schema'
import type {
  MaintenanceRecord,
  MaintenanceTemplate
} from '@/data/client/db-schema/maintenance'
import { startSession, stopSession } from '@/data/client/mutations/sessions'
import { useElapsedHours, useElapsedTime } from '@/lib/hooks/use-elapsed-time'
import { computeGeneratorStatus } from '@/lib/hooks/use-generator-status'
import type { MaintenanceUrgency } from '@/lib/hooks/use-maintenance-due'
import { computeNextMaintenance } from '@/lib/hooks/use-maintenance-due'
import { useRestCountdown } from '@/lib/hooks/use-rest-countdown'

interface MyGeneratorsListProps {
  generators: Generator[]
  sessions: GeneratorSession[]
  templates: MaintenanceTemplate[]
  records: MaintenanceRecord[]
  userId: string
  organizationId: string
  isAdmin: boolean
}

export default function MyGeneratorsList({
  generators,
  sessions,
  templates,
  records,
  userId,
  organizationId,
  isAdmin
}: MyGeneratorsListProps) {
  if (generators.length === 0)
    return (
      <section>
        <h2 className="text-foreground mb-3 text-lg font-semibold">
          My Generators
        </h2>
        <EmptyState>
          <Zap className="text-muted size-8" />
          <p className="text-muted text-sm">
            {isAdmin
              ? 'No generators in this organization yet'
              : 'No generators assigned to you'}
          </p>
        </EmptyState>
      </section>
    )

  return (
    <section>
      <h2 className="text-foreground mb-3 text-lg font-semibold">
        My Generators
      </h2>
      <div className="flex flex-col gap-2">
        {generators.map(generator => (
          <GeneratorRow
            key={generator.id}
            generator={generator}
            sessions={sessions.filter(s => s.generatorId === generator.id)}
            templates={templates.filter(t => t.generatorId === generator.id)}
            records={records}
            userId={userId}
            organizationId={organizationId}
          />
        ))}
      </div>
    </section>
  )
}

function GeneratorRow({
  generator,
  sessions,
  templates,
  records,
  userId,
  organizationId
}: {
  generator: Generator
  sessions: GeneratorSession[]
  templates: MaintenanceTemplate[]
  records: MaintenanceRecord[]
  userId: string
  organizationId: string
}) {
  const statusInfo = computeGeneratorStatus(generator, sessions)
  const { status, openSession, restEndsAt } = statusInfo

  const nextMaintenance = computeNextMaintenance(templates, records, sessions)

  return (
    <Card>
      <Card.Content className="py-3">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/$organizationId/generators/$generatorId"
            params={{ organizationId, generatorId: generator.id }}
            className="flex min-w-0 flex-1 items-center gap-2"
          >
            <p className="text-foreground truncate font-medium">
              {generator.title}
            </p>
            <Chip size="sm" variant="secondary">
              {generator.model}
            </Chip>
            <StatusChip status={status} />
            {nextMaintenance && nextMaintenance.urgency !== 'ok' && (
              <UrgencyChip urgency={nextMaintenance.urgency} />
            )}
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            {status === 'running' && openSession && (
              <RunningInline generator={generator} session={openSession} />
            )}
            {status === 'resting' && restEndsAt && (
              <RestingInline
                restEndsAt={restEndsAt}
                requiredRestHours={generator.requiredRestHours}
              />
            )}
            {status === 'running' && openSession ? (
              <Button
                size="sm"
                variant="primary"
                className="bg-danger text-danger-foreground"
                onPress={() => void stopSession(userId, openSession.id)}
              >
                <Square size={12} />
                Stop
              </Button>
            ) : status === 'available' ? (
              <Button
                size="sm"
                onPress={() => void startSession(userId, generator.id)}
              >
                <Play size={12} />
                Start
              </Button>
            ) : null}
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}

function RunningInline({
  generator,
  session
}: {
  generator: Generator
  session: GeneratorSession
}) {
  const elapsed = useElapsedTime(session.startedAt)
  const elapsedHours = useElapsedHours(session.startedAt)
  const percentage = Math.min(
    (elapsedHours / generator.maxConsecutiveRunHours) * 100,
    100
  )
  const warningPct = generator.runWarningThresholdPct
  const color: 'accent' | 'warning' | 'danger' =
    percentage < warningPct ? 'accent' : percentage < 100 ? 'warning' : 'danger'

  return (
    <div className="flex items-center gap-2">
      <p className="text-foreground text-sm tabular-nums">{elapsed}</p>
      <ProgressBar value={percentage} color={color} className="w-16">
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
    </div>
  )
}

function RestingInline({
  restEndsAt,
  requiredRestHours
}: {
  restEndsAt: Date
  requiredRestHours: number
}) {
  const { remainingFormatted } = useRestCountdown(restEndsAt, requiredRestHours)

  return (
    <p className="text-muted text-sm tabular-nums">
      Rest: {remainingFormatted}
    </p>
  )
}

function StatusChip({
  status
}: {
  status: 'running' | 'resting' | 'available'
}) {
  switch (status) {
    case 'running':
      return (
        <Chip
          size="sm"
          variant="soft"
          className="bg-accent-soft text-accent-soft-foreground"
        >
          Running
        </Chip>
      )
    case 'resting':
      return (
        <Chip
          size="sm"
          variant="soft"
          className="bg-warning-soft text-warning-soft-foreground"
        >
          Resting
        </Chip>
      )
    case 'available':
      return (
        <Chip size="sm" variant="soft">
          Idle
        </Chip>
      )
  }
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
