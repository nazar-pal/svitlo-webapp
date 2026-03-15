import { Button, Card, Chip, ProgressBar } from '@heroui/react'
import { Square } from 'lucide-react'

import type { Generator, GeneratorSession } from '@/data/client/db-schema'
import { stopSession } from '@/data/client/mutations/sessions'
import {
  useElapsedHours,
  useElapsedTime,
  formatHours
} from '@/lib/hooks/use-elapsed-time'

interface ActiveSessionCardProps {
  generator: Generator
  session: GeneratorSession
  userId: string
}

export default function ActiveSessionCard({
  generator,
  session,
  userId
}: ActiveSessionCardProps) {
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
    <Card>
      <Card.Header>
        <div className="flex items-center gap-2">
          <Card.Title>{generator.title}</Card.Title>
          <Chip size="sm" variant="secondary">
            {generator.model}
          </Chip>
        </div>
        <Card.Description>Currently running</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <p className="text-foreground text-3xl font-semibold tabular-nums">
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
      </Card.Content>
    </Card>
  )
}
