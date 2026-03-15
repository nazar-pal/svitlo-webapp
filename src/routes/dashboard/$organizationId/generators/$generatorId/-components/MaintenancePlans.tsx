import { Button, Card, Chip, EmptyState, Separator, Table } from '@heroui/react'
import { format, parseISO } from 'date-fns'
import { Wrench } from 'lucide-react'
import { useState } from 'react'

import type { GeneratorSession } from '@/data/client/db-schema'
import type {
  MaintenanceRecord,
  MaintenanceTemplate
} from '@/data/client/db-schema/maintenance'
import { computeMaintenanceDue } from '@/lib/hooks/use-maintenance-due'
import type { MaintenanceUrgency } from '@/lib/hooks/use-maintenance-due'

import RecordMaintenanceModal from './RecordMaintenanceModal'

interface MaintenancePlansProps {
  templates: MaintenanceTemplate[]
  records: MaintenanceRecord[]
  sessions: GeneratorSession[]
  userId: string
  generatorId: string
}

export default function MaintenancePlans({
  templates,
  records,
  sessions,
  userId,
  generatorId
}: MaintenancePlansProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [preselectedTemplateId, setPreselectedTemplateId] = useState<
    string | null
  >(null)

  function openRecordModal(templateId: string) {
    setPreselectedTemplateId(templateId)
    setModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-5">
      {templates.length === 0 ? (
        <EmptyState>
          <Wrench className="text-muted size-8" />
          <p className="text-muted text-sm">No maintenance plans configured</p>
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-3">
          {templates.map(template => {
            const dueInfo = computeMaintenanceDue(template, records, sessions)

            return (
              <TemplateCard
                key={template.id}
                template={template}
                urgency={dueInfo.urgency}
                lastPerformedAt={dueInfo.lastPerformedAt}
                onRecord={() => openRecordModal(template.id)}
              />
            )
          })}
        </div>
      )}

      {records.length > 0 && (
        <>
          <Separator />
          <div className="flex flex-col gap-2">
            <p className="text-foreground text-sm font-medium">
              Recent Records
            </p>
            <MaintenanceRecordsTable records={records} templates={templates} />
          </div>
        </>
      )}

      <RecordMaintenanceModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setPreselectedTemplateId(null)
        }}
        userId={userId}
        generatorId={generatorId}
        templates={templates}
        preselectedTemplateId={preselectedTemplateId}
      />
    </div>
  )
}

function TemplateCard({
  template,
  urgency,
  lastPerformedAt,
  onRecord
}: {
  template: MaintenanceTemplate
  urgency: MaintenanceUrgency
  lastPerformedAt: string | null
  onRecord: () => void
}) {
  return (
    <Card>
      <Card.Header>
        <div className="flex items-center gap-2">
          <Card.Title>{template.taskName}</Card.Title>
          {template.isOneTime === 1 && (
            <Chip size="sm" variant="soft">
              One-time
            </Chip>
          )}
          <UrgencyChip urgency={urgency} />
        </div>
        <Card.Description>{formatTrigger(template)}</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="flex items-center justify-between">
          <p className="text-muted text-sm">
            Last performed:{' '}
            {lastPerformedAt
              ? format(parseISO(lastPerformedAt), 'MMM d, yyyy')
              : 'Never'}
          </p>
          <Button size="sm" onPress={onRecord}>
            Record Maintenance
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
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

function formatTrigger(t: MaintenanceTemplate): string {
  if (t.triggerType === 'hours')
    return `Every ${t.triggerHoursInterval}h of runtime`
  if (t.triggerType === 'calendar') return `Every ${t.triggerCalendarDays} days`
  if (t.triggerType === 'whichever_first')
    return `Every ${t.triggerHoursInterval}h or ${t.triggerCalendarDays} days`
  return t.triggerType
}

function MaintenanceRecordsTable({
  records,
  templates
}: {
  records: MaintenanceRecord[]
  templates: MaintenanceTemplate[]
}) {
  const templateMap = new Map(templates.map(t => [t.id, t]))

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Maintenance records">
          <Table.Header>
            <Table.Column isRowHeader>Date</Table.Column>
            <Table.Column>Task</Table.Column>
            <Table.Column>Notes</Table.Column>
          </Table.Header>
          <Table.Body>
            {records.map(record => (
              <Table.Row key={record.id}>
                <Table.Cell>
                  {format(parseISO(record.performedAt), 'MMM d, yyyy')}
                </Table.Cell>
                <Table.Cell>
                  {templateMap.get(record.templateId)?.taskName ?? 'Unknown'}
                </Table.Cell>
                <Table.Cell>
                  <span className="text-muted text-sm">
                    {record.notes || '—'}
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
