import { Button, Card, Chip, ProgressBar } from '@heroui/react'
import { Play, Square } from 'lucide-react'

import type { Generator, GeneratorSession } from '@/data/client/db-schema'
import { startSession, stopSession } from '@/data/client/mutations/sessions'
import {
  useElapsedHours,
  useElapsedTime,
  formatHours
} from '@/lib/hooks/use-elapsed-time'
import type { GeneratorStatusInfo } from '@/lib/hooks/use-generator-status'
import { useRestCountdown } from '@/lib/hooks/use-rest-countdown'

interface RuntimeCardProps {
  generator: Generator
  statusInfo: GeneratorStatusInfo
  userId: string
}

export default function RuntimeCard({
  generator,
  statusInfo,
  userId
}: RuntimeCardProps) {
  const { status, openSession, restEndsAt } = statusInfo

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center gap-2">
          <Card.Title>Runtime</Card.Title>
          <StatusChip status={status} />
        </div>
      </Card.Header>
      <Card.Content>
        {status === 'running' && openSession && (
          <RunningState
            generator={generator}
            session={openSession}
            userId={userId}
          />
        )}
        {status === 'resting' && restEndsAt && (
          <RestingState
            restEndsAt={restEndsAt}
            requiredRestHours={generator.requiredRestHours}
          />
        )}
        {status === 'available' && (
          <AvailableState generatorId={generator.id} userId={userId} />
        )}
      </Card.Content>
    </Card>
  )
}

function StatusChip({ status }: { status: GeneratorStatusInfo['status'] }) {
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

function RunningState({
  generator,
  session,
  userId
}: {
  generator: Generator
  session: GeneratorSession
  userId: string
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
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <p className="text-foreground text-2xl font-semibold tabular-nums">
          {elapsed}
        </p>
        <p className="text-muted text-sm">
          of {formatHours(generator.maxConsecutiveRunHours)}
        </p>
      </div>

      <ProgressBar value={percentage} color={color}>
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>

      <Button
        variant="primary"
        className="bg-danger text-danger-foreground"
        onPress={() => void stopSession(userId, session.id)}
      >
        <Square size={14} />
        Stop Generator
      </Button>
    </div>
  )
}

function RestingState({
  restEndsAt,
  requiredRestHours
}: {
  restEndsAt: Date
  requiredRestHours: number
}) {
  const { remainingFormatted, progress } = useRestCountdown(
    restEndsAt,
    requiredRestHours
  )

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted text-sm">
        Rest period — {remainingFormatted} remaining
      </p>

      <ProgressBar value={progress * 100} color="default">
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
    </div>
  )
}

function AvailableState({
  generatorId,
  userId
}: {
  generatorId: string
  userId: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted text-sm">Ready to run</p>
      <Button onPress={() => void startSession(userId, generatorId)}>
        <Play size={14} />
        Start Generator
      </Button>
    </div>
  )
}
