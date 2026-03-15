import {
  Button,
  Card,
  FieldError,
  Input,
  Label,
  ListBox,
  NumberField,
  Select,
  TextArea,
  TextField
} from '@heroui/react'
import { Trash2 } from 'lucide-react'

export interface MaintenanceTaskFormData {
  key: number
  taskName: string
  description: string
  triggerType: 'hours' | 'calendar' | 'whichever_first'
  triggerHoursInterval: number | null
  triggerCalendarDays: number | null
  isOneTime: boolean
}

interface MaintenanceTaskCardProps {
  task: MaintenanceTaskFormData
  onChange: (patch: Partial<MaintenanceTaskFormData>) => void
  onRemove: () => void
}

export const TRIGGER_TYPES = [
  { id: 'hours', label: 'Run hours' },
  { id: 'calendar', label: 'Calendar days' },
  { id: 'whichever_first', label: 'Whichever first' }
] as const

export function MaintenanceTaskCard({
  task,
  onChange,
  onRemove
}: MaintenanceTaskCardProps) {
  const showHours =
    task.triggerType === 'hours' || task.triggerType === 'whichever_first'
  const showDays =
    task.triggerType === 'calendar' || task.triggerType === 'whichever_first'

  return (
    <Card>
      <Card.Content className="flex flex-col gap-3 p-3">
        <div className="flex items-center justify-between">
          <p className="text-foreground text-sm font-medium">
            {task.taskName || 'New Task'}
          </p>
          <Button
            size="sm"
            isIconOnly
            variant="ghost"
            onPress={onRemove}
            aria-label="Remove task"
          >
            <Trash2 size={14} />
          </Button>
        </div>

        <TextField
          name="taskName"
          isRequired
          value={task.taskName}
          onChange={v => onChange({ taskName: v })}
        >
          <Label>Task name</Label>
          <Input placeholder="Oil change" variant="secondary" />
          <FieldError />
        </TextField>

        <TextField
          name="taskDescription"
          value={task.description}
          onChange={v => onChange({ description: v })}
        >
          <Label>Description</Label>
          <TextArea placeholder="Optional description" variant="secondary" />
        </TextField>

        <Select
          selectedKey={task.triggerType}
          onSelectionChange={key => {
            const triggerType = key as MaintenanceTaskFormData['triggerType']
            const patch: Partial<MaintenanceTaskFormData> = { triggerType }
            if (triggerType === 'hours') patch.triggerCalendarDays = null
            if (triggerType === 'calendar') patch.triggerHoursInterval = null
            onChange(patch)
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
                <ListBox.Item key={t.id} id={t.id} textValue={t.label}>
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
                value={task.triggerHoursInterval ?? undefined}
                onChange={v => onChange({ triggerHoursInterval: v })}
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
                value={task.triggerCalendarDays ?? undefined}
                onChange={v => onChange({ triggerCalendarDays: v })}
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
            checked={task.isOneTime}
            onChange={e => onChange({ isOneTime: e.target.checked })}
            className="accent-primary size-4 rounded"
          />
          One-time task
        </label>
      </Card.Content>
    </Card>
  )
}
