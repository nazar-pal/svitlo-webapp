import { Chip, EmptyState, Table } from '@heroui/react'
import { differenceInMilliseconds, format, parseISO } from 'date-fns'
import { Clock } from 'lucide-react'

import type { GeneratorSession } from '@/data/client/db-schema'
import { formatDuration } from '@/lib/hooks/use-elapsed-time'

interface SessionHistoryProps {
  sessions: GeneratorSession[]
}

export default function SessionHistory({ sessions }: SessionHistoryProps) {
  if (sessions.length === 0)
    return (
      <EmptyState>
        <Clock className="text-muted size-8" />
        <p className="text-muted text-sm">No sessions recorded yet</p>
      </EmptyState>
    )

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Session history">
          <Table.Header>
            <Table.Column isRowHeader>Date</Table.Column>
            <Table.Column>Duration</Table.Column>
            <Table.Column>Started by</Table.Column>
          </Table.Header>
          <Table.Body>
            {sessions.map(session => (
              <Table.Row key={session.id}>
                <Table.Cell>
                  {format(parseISO(session.startedAt), 'MMM d, yyyy HH:mm')}
                </Table.Cell>
                <Table.Cell>
                  <SessionDuration session={session} />
                </Table.Cell>
                <Table.Cell>
                  <span className="text-muted text-xs">
                    {session.startedByUserId.slice(0, 8)}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}

function SessionDuration({ session }: { session: GeneratorSession }) {
  if (!session.stoppedAt)
    return (
      <Chip
        size="sm"
        variant="soft"
        className="bg-accent-soft text-accent-soft-foreground"
      >
        In progress
      </Chip>
    )

  const ms = differenceInMilliseconds(
    parseISO(session.stoppedAt),
    parseISO(session.startedAt)
  )
  return <span>{formatDuration(ms)}</span>
}
