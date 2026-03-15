import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Modal,
  NumberField,
  Select,
  TextArea,
  TextField,
  useOverlayState
} from '@heroui/react'
import { Wrench } from 'lucide-react'
import { useState } from 'react'

import type { MaintenanceTemplate } from '@/data/client/db-schema/maintenance'
import { TRIGGER_TYPES } from '@/components/MaintenanceTaskForm'
import {
  createMaintenanceTemplate,
  updateMaintenanceTemplate
} from '@/data/client/mutations/maintenance'

type TriggerType = 'hours' | 'calendar' | 'whichever_first'

interface MaintenanceTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  generatorId: string
  template: MaintenanceTemplate | null
}

export default function MaintenanceTemplateModal({
  isOpen,
  onClose,
  userId,
  generatorId,
  template
}: MaintenanceTemplateModalProps) {
  const isEdit = template !== null

  const [taskName, setTaskName] = useState(template?.taskName ?? '')
  const [description, setDescription] = useState(template?.description ?? '')
  const [triggerType, setTriggerType] = useState<TriggerType>(
    (template?.triggerType as TriggerType) ?? 'hours'
  )
  const [triggerHoursInterval, setTriggerHoursInterval] = useState<
    number | null
  >(template?.triggerHoursInterval ?? null)
  const [triggerCalendarDays, setTriggerCalendarDays] = useState<number | null>(
    template?.triggerCalendarDays ?? null
  )
  const [isOneTime, setIsOneTime] = useState(template?.isOneTime === 1)
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  function resetForm() {
    setTaskName(template?.taskName ?? '')
    setDescription(template?.description ?? '')
    setTriggerType((template?.triggerType as TriggerType) ?? 'hours')
    setTriggerHoursInterval(template?.triggerHoursInterval ?? null)
    setTriggerCalendarDays(template?.triggerCalendarDays ?? null)
    setIsOneTime(template?.isOneTime === 1)
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

  const showHours = triggerType === 'hours' || triggerType === 'whichever_first'
  const showDays =
    triggerType === 'calendar' || triggerType === 'whichever_first'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setIsPending(true)

    const result = isEdit
      ? await updateMaintenanceTemplate(userId, template.id, {
          taskName: taskName.trim(),
          description: description.trim() || null,
          triggerType,
          triggerHoursInterval: showHours ? triggerHoursInterval : null,
          triggerCalendarDays: showDays ? triggerCalendarDays : null,
          isOneTime
        })
      : await createMaintenanceTemplate(userId, {
          generatorId,
          taskName: taskName.trim(),
          description: description.trim() || undefined,
          triggerType,
          triggerHoursInterval: showHours
            ? (triggerHoursInterval ?? undefined)
            : undefined,
          triggerCalendarDays: showDays
            ? (triggerCalendarDays ?? undefined)
            : undefined,
          isOneTime
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
              <Modal.Heading>
                {isEdit ? 'Edit Maintenance Task' : 'Add Maintenance Task'}
              </Modal.Heading>
              <p className="text-muted text-sm leading-5">
                {isEdit
                  ? 'Update the maintenance task details.'
                  : 'Create a new maintenance schedule for this generator.'}
              </p>
            </Modal.Header>

            <Form onSubmit={handleSubmit} className="flex flex-col">
              <Modal.Body className="p-1">
                <div className="flex flex-col gap-4">
                  <TextField
                    name="taskName"
                    isRequired
                    value={taskName}
                    onChange={setTaskName}
                    autoFocus
                  >
                    <Label>Task name</Label>
                    <Input placeholder="Oil change" variant="secondary" />
                    <FieldError />
                  </TextField>

                  <TextField
                    name="description"
                    value={description}
                    onChange={setDescription}
                  >
                    <Label>Description</Label>
                    <TextArea
                      placeholder="Optional description"
                      variant="secondary"
                    />
                  </TextField>

                  <Select
                    selectedKey={triggerType}
                    onSelectionChange={key => {
                      const tt = key as TriggerType
                      setTriggerType(tt)
                      if (tt === 'hours') setTriggerCalendarDays(null)
                      if (tt === 'calendar') setTriggerHoursInterval(null)
                    }}
                  >
                    <Label>Trigger type</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {TRIGGER_TYPES.map(t => (
                          <ListBox.Item
                            key={t.id}
                            id={t.id}
                            textValue={t.label}
                          >
                            {t.label}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {(showHours || showDays) && (
                    <div className="grid grid-cols-2 gap-3">
                      {showHours && (
                        <NumberField
                          isRequired
                          minValue={1}
                          step={1}
                          value={triggerHoursInterval ?? undefined}
                          onChange={setTriggerHoursInterval}
                        >
                          <Label>Every N hours</Label>
                          <NumberField.Group>
                            <NumberField.DecrementButton />
                            <NumberField.Input />
                            <NumberField.IncrementButton />
                          </NumberField.Group>
                          <FieldError />
                        </NumberField>
                      )}

                      {showDays && (
                        <NumberField
                          isRequired
                          minValue={1}
                          step={1}
                          value={triggerCalendarDays ?? undefined}
                          onChange={setTriggerCalendarDays}
                        >
                          <Label>Every N days</Label>
                          <NumberField.Group>
                            <NumberField.DecrementButton />
                            <NumberField.Input />
                            <NumberField.IncrementButton />
                          </NumberField.Group>
                          <FieldError />
                        </NumberField>
                      )}
                    </div>
                  )}

                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={isOneTime}
                      onChange={e => setIsOneTime(e.target.checked)}
                      className="accent-primary size-4 rounded"
                    />
                    One-time task
                  </label>

                  {error && <p className="text-danger text-sm">{error}</p>}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" isPending={isPending}>
                  {isEdit ? 'Save Changes' : 'Create Task'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
