import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Modal,
  NumberField,
  Select,
  Slider,
  Surface,
  TextArea,
  TextField,
  useOverlayState
} from '@heroui/react'
import { Plus, Trash2, Zap } from 'lucide-react'
import { useState } from 'react'

import { createGeneratorWithMaintenance } from '@/data/client/mutations/generators'
import { insertGeneratorSchema } from '@/data/client/validation'

interface MaintenanceTaskForm {
  key: number
  taskName: string
  description: string
  triggerType: 'hours' | 'calendar' | 'whichever_first'
  triggerHoursInterval: number | null
  triggerCalendarDays: number | null
  isOneTime: boolean
}

interface CreateGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  organizationId: string
}

let taskKeyCounter = 0

function SectionHeading({
  title,
  subtitle
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-foreground text-sm font-medium">{title}</p>
      {subtitle && <p className="text-muted text-xs">{subtitle}</p>}
    </div>
  )
}

export default function CreateGeneratorModal({
  isOpen,
  onClose,
  userId,
  organizationId
}: CreateGeneratorModalProps) {
  const [step, setStep] = useState<1 | 2>(1)

  // Step 1
  const [title, setTitle] = useState('')
  const [model, setModel] = useState('')
  const [description, setDescription] = useState('')

  // Step 2 - generator runtime
  const [maxRunHours, setMaxRunHours] = useState<number | null>(4)
  const [restHours, setRestHours] = useState<number | null>(1)
  const [warningPct, setWarningPct] = useState(80)

  // Step 2 - maintenance tasks
  const [tasks, setTasks] = useState<MaintenanceTaskForm[]>([])

  // Global
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  function resetForm() {
    setStep(1)
    setTitle('')
    setModel('')
    setDescription('')
    setMaxRunHours(null)
    setRestHours(null)
    setWarningPct(80)
    setTasks([])
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

  function handleNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const partial = insertGeneratorSchema
      .pick({ title: true, model: true })
      .safeParse({ title: title.trim(), model: model.trim() })

    if (!partial.success) return setError(partial.error.issues[0].message)
    setStep(2)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setIsPending(true)

    const result = await createGeneratorWithMaintenance(
      userId,
      {
        organizationId,
        title: title.trim(),
        model: model.trim(),
        description: description.trim() || undefined,
        maxConsecutiveRunHours: maxRunHours!,
        requiredRestHours: restHours!,
        runWarningThresholdPct: warningPct
      },
      tasks.map(t => ({
        taskName: t.taskName.trim(),
        description: t.description.trim() || undefined,
        triggerType: t.triggerType,
        triggerHoursInterval: t.triggerHoursInterval ?? undefined,
        triggerCalendarDays: t.triggerCalendarDays ?? undefined,
        isOneTime: t.isOneTime
      }))
    )

    setIsPending(false)
    if (!result.ok) return setError(result.error)

    resetForm()
    onClose()
  }

  function addTask() {
    setTasks(prev => [
      ...prev,
      {
        key: taskKeyCounter++,
        taskName: '',
        description: '',
        triggerType: 'hours',
        triggerHoursInterval: null,
        triggerCalendarDays: null,
        isOneTime: false
      }
    ])
  }

  function updateTask(key: number, patch: Partial<MaintenanceTaskForm>) {
    setTasks(prev => prev.map(t => (t.key === key ? { ...t, ...patch } : t)))
  }

  function removeTask(key: number) {
    setTasks(prev => prev.filter(t => t.key !== key))
  }

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog
            className={step === 1 ? 'sm:max-w-[420px]' : 'sm:max-w-[560px]'}
          >
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Zap className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Create Generator</Modal.Heading>
              <p className="text-muted text-sm leading-5">
                {step === 1
                  ? 'Enter the basic details for your generator.'
                  : 'Configure runtime limits and maintenance tasks.'}
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <div className="bg-foreground size-2 rounded-full" />
                <div
                  className={`border-foreground size-2 rounded-full border ${step === 2 ? 'bg-foreground' : 'bg-transparent'}`}
                />
              </div>
            </Modal.Header>

            {step === 1 ? (
              <Form onSubmit={handleNext} className="flex flex-col">
                <Modal.Body className="p-1">
                  <StepOneContent
                    title={title}
                    setTitle={setTitle}
                    model={model}
                    setModel={setModel}
                    description={description}
                    setDescription={setDescription}
                    error={error}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button type="submit">Next</Button>
                </Modal.Footer>
              </Form>
            ) : (
              <>
                <Form onSubmit={handleSubmit} className="flex flex-col">
                  <Modal.Body className="max-h-[60vh] overflow-y-auto p-1">
                    <StepTwoContent
                      maxRunHours={maxRunHours}
                      setMaxRunHours={setMaxRunHours}
                      restHours={restHours}
                      setRestHours={setRestHours}
                      warningPct={warningPct}
                      setWarningPct={setWarningPct}
                      tasks={tasks}
                      addTask={addTask}
                      updateTask={updateTask}
                      removeTask={removeTask}
                      error={error}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      type="button"
                      className="text-foreground hover:text-foreground/80 cursor-pointer px-4 py-2 text-sm transition-colors"
                      onClick={() => {
                        setError('')
                        setStep(1)
                      }}
                    >
                      Back
                    </button>
                    <Button type="submit" isPending={isPending}>
                      Create Generator
                    </Button>
                  </Modal.Footer>
                </Form>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

// ---------- Step 1 ----------

interface StepOneProps {
  title: string
  setTitle: (v: string) => void
  model: string
  setModel: (v: string) => void
  description: string
  setDescription: (v: string) => void
  error: string
}

function StepOneContent({
  title,
  setTitle,
  model,
  setModel,
  description,
  setDescription,
  error
}: StepOneProps) {
  return (
    <Surface variant="default">
      <div className="flex w-full flex-col gap-4">
        <SectionHeading title="Basic Details" />

        <TextField
          name="title"
          isRequired
          value={title}
          onChange={setTitle}
          autoFocus
        >
          <Label>Title</Label>
          <Input placeholder="My Generator" variant="secondary" />
          <p className="text-muted text-xs">
            A name to identify this generator
          </p>
          <FieldError />
        </TextField>

        <TextField name="model" isRequired value={model} onChange={setModel}>
          <Label>Model</Label>
          <Input placeholder="Honda EU2200i" variant="secondary" />
          <FieldError />
        </TextField>

        <TextField
          name="description"
          value={description}
          onChange={setDescription}
        >
          <Label>Description</Label>
          <TextArea
            placeholder="Optional notes about this generator"
            variant="secondary"
          />
        </TextField>

        {error && <p className="text-danger text-sm">{error}</p>}
      </div>
    </Surface>
  )
}

// ---------- Step 2 ----------

interface StepTwoProps {
  maxRunHours: number | null
  setMaxRunHours: (v: number | null) => void
  restHours: number | null
  setRestHours: (v: number | null) => void
  warningPct: number
  setWarningPct: (v: number) => void
  tasks: MaintenanceTaskForm[]
  addTask: () => void
  updateTask: (key: number, patch: Partial<MaintenanceTaskForm>) => void
  removeTask: (key: number) => void
  error: string
}

function StepTwoContent({
  maxRunHours,
  setMaxRunHours,
  restHours,
  setRestHours,
  warningPct,
  setWarningPct,
  tasks,
  addTask,
  updateTask,
  removeTask,
  error
}: StepTwoProps) {
  return (
    <div className="flex flex-col gap-4">
      <Surface variant="default">
        <div className="flex w-full flex-col gap-4">
          <SectionHeading
            title="Runtime Limits"
            subtitle="Set operating limits to protect your generator."
          />

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              isRequired
              // minValue={0.1}
              step={0.5}
              defaultValue={4.0}
              value={maxRunHours ?? undefined}
              onChange={v => setMaxRunHours(v)}
            >
              <Label>Max run hours</Label>
              <NumberField.Group>
                <NumberField.DecrementButton />
                <NumberField.Input />
                <NumberField.IncrementButton />
              </NumberField.Group>
              <FieldError />
            </NumberField>

            <NumberField
              isRequired
              // minValue={0.1}
              step={0.5}
              defaultValue={1.0}
              value={restHours ?? undefined}
              onChange={v => setRestHours(v)}
            >
              <Label>Rest hours</Label>
              <NumberField.Group>
                <NumberField.DecrementButton />
                <NumberField.Input />
                <NumberField.IncrementButton />
              </NumberField.Group>
              <FieldError />
            </NumberField>
          </div>

          <Slider
            minValue={1}
            maxValue={100}
            step={1}
            value={warningPct}
            onChange={v => setWarningPct(v as number)}
          >
            <Label>Warning threshold</Label>
            <Slider.Output>
              {({ state }) => `${state.getThumbValueLabel(0)}%`}
            </Slider.Output>
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
          </Slider>
          <p className="text-muted -mt-2 text-xs">
            Alert when runtime reaches this percentage.
          </p>
        </div>
      </Surface>

      <div className="flex flex-col gap-3">
        <SectionHeading
          title="Maintenance Tasks"
          subtitle="Define recurring or one-time maintenance schedules."
        />

        {tasks.map(task => (
          <MaintenanceTaskCard
            key={task.key}
            task={task}
            updateTask={updateTask}
            removeTask={removeTask}
          />
        ))}

        <Button size="sm" variant="ghost" onPress={addTask}>
          <Plus size={14} />
          Add Task
        </Button>
      </div>

      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  )
}

// ---------- Maintenance Task Card ----------

interface MaintenanceTaskCardProps {
  task: MaintenanceTaskForm
  updateTask: (key: number, patch: Partial<MaintenanceTaskForm>) => void
  removeTask: (key: number) => void
}

const TRIGGER_TYPES = [
  { id: 'hours', label: 'Run hours' },
  { id: 'calendar', label: 'Calendar days' },
  { id: 'whichever_first', label: 'Whichever first' }
] as const

function MaintenanceTaskCard({
  task,
  updateTask,
  removeTask
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
            onPress={() => removeTask(task.key)}
            aria-label="Remove task"
          >
            <Trash2 size={14} />
          </Button>
        </div>

        <TextField
          name="taskName"
          isRequired
          value={task.taskName}
          onChange={v => updateTask(task.key, { taskName: v })}
        >
          <Label>Task name</Label>
          <Input placeholder="Oil change" variant="secondary" />
          <FieldError />
        </TextField>

        <TextField
          name="taskDescription"
          value={task.description}
          onChange={v => updateTask(task.key, { description: v })}
        >
          <Label>Description</Label>
          <TextArea placeholder="Optional description" variant="secondary" />
        </TextField>

        <Select
          selectedKey={task.triggerType}
          onSelectionChange={key => {
            const triggerType = key as MaintenanceTaskForm['triggerType']
            const patch: Partial<MaintenanceTaskForm> = { triggerType }
            if (triggerType === 'hours') patch.triggerCalendarDays = null
            if (triggerType === 'calendar') patch.triggerHoursInterval = null
            updateTask(task.key, patch)
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
                onChange={v =>
                  updateTask(task.key, { triggerHoursInterval: v })
                }
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
                onChange={v => updateTask(task.key, { triggerCalendarDays: v })}
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
            onChange={e =>
              updateTask(task.key, { isOneTime: e.target.checked })
            }
            className="accent-primary size-4 rounded"
          />
          One-time task
        </label>
      </Card.Content>
    </Card>
  )
}
