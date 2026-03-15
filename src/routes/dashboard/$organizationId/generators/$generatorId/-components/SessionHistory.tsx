import { Button, Chip, EmptyState, Table } from '@heroui/react'
import { differenceInMilliseconds, format, parseISO } from 'date-fns'
import { Clock, Pencil, Plus } from 'lucide-react'
import { useState } from 'react'

import type { GeneratorSession } from '@/data/client/db-schema'
import { formatDuration } from '@/lib/hooks/use-elapsed-time'

import RuntimeEntryModal from './RuntimeEntryModal'

interface SessionHistoryProps {
  sessions: GeneratorSession[]
  userId: string
  generatorId: string
}

export default function SessionHistory({
  sessions,
  userId,
  generatorId
}: SessionHistoryProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editSession, setEditSession] = useState<GeneratorSession | null>(null)

  function openCreate() {
    setEditSession(null)
    setModalOpen(true)
  }

  function openEdit(session: GeneratorSession) {
    setEditSession(session)
    setModalOpen(true)
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button size="sm" variant="ghost" onPress={openCreate}>
          <Plus size={14} />
          Log Runtime
        </Button>
      </div>

      {sessions.length === 0 ? (
        <EmptyState>
          <Clock className="text-muted size-8" />
          <p className="text-muted text-sm">No runtimes recorded yet</p>
        </EmptyState>
      ) : (
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Runtime history">
              <Table.Header>
                <Table.Column isRowHeader>Date</Table.Column>
                <Table.Column>Duration</Table.Column>
                <Table.Column>Started by</Table.Column>
                <Table.Column className="w-10" />
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
                    <Table.Cell>
                      {session.stoppedAt && (
                        <Button
                          size="sm"
                          variant="ghost"
                          isIconOnly
                          onPress={() => openEdit(session)}
                          aria-label="Edit runtime entry"
                        >
                          <Pencil size={14} />
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      )}

      <RuntimeEntryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={userId}
        generatorId={generatorId}
        session={editSession}
      />
    </>
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
