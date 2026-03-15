import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  TextArea,
  TextField,
  useOverlayState
} from '@heroui/react'
import { Wrench } from 'lucide-react'
import { useState } from 'react'

import type { MaintenanceTemplate } from '@/data/client/db-schema/maintenance'
import { recordMaintenance } from '@/data/client/mutations/maintenance'

function nowLocal(): string {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

interface RecordMaintenanceModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  generatorId: string
  templates: MaintenanceTemplate[]
  preselectedTemplateId: string | null
}

export default function RecordMaintenanceModal({
  isOpen,
  onClose,
  userId,
  generatorId,
  templates,
  preselectedTemplateId
}: RecordMaintenanceModalProps) {
  const [templateId, setTemplateId] = useState(preselectedTemplateId ?? '')
  const [notes, setNotes] = useState('')
  const [performedAt, setPerformedAt] = useState(nowLocal)
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  function resetForm() {
    setTemplateId('')
    setNotes('')
    setPerformedAt(nowLocal())
    setError('')
    setIsPending(false)
  }

  const state = useOverlayState({
    isOpen,
    onOpenChange: open => {
      if (!open) {
        resetForm()
        onClose()
      }
    }
  })

  // Sync preselected template when modal opens
  if (isOpen && preselectedTemplateId && !templateId)
    setTemplateId(preselectedTemplateId)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setIsPending(true)

    const result = await recordMaintenance(userId, {
      templateId,
      generatorId,
      notes: notes.trim() || undefined,
      performedAt: performedAt ? new Date(performedAt).toISOString() : undefined
    })

    setIsPending(false)
    if (!result.ok) return setError(result.error)
    resetForm()
    onClose()
  }

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[420px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Wrench className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Record Maintenance</Modal.Heading>
              <p className="text-muted text-sm leading-5">
                Log a maintenance action for this generator.
              </p>
            </Modal.Header>

            <Form onSubmit={handleSubmit} className="flex flex-col">
              <Modal.Body className="p-1">
                <div className="flex flex-col gap-4">
                  <Select
                    selectedKey={templateId}
                    onSelectionChange={key => setTemplateId(key as string)}
                    isRequired
                  >
                    <Label>Maintenance task</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {templates.map(t => (
                          <ListBox.Item
                            key={t.id}
                            id={t.id}
                            textValue={t.taskName}
                          >
                            {t.taskName}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                    <FieldError />
                  </Select>

                  <TextField
                    name="performedAt"
                    value={performedAt}
                    onChange={setPerformedAt}
                  >
                    <Label>Date performed</Label>
                    <Input type="datetime-local" variant="secondary" />
                  </TextField>

                  <TextField name="notes" value={notes} onChange={setNotes}>
                    <Label>Notes</Label>
                    <TextArea
                      placeholder="Optional notes about the maintenance"
                      variant="secondary"
                    />
                  </TextField>

                  {error && <p className="text-danger m-0 text-sm">{error}</p>}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" isPending={isPending}>
                  Record
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
