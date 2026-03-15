import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
  useOverlayState
} from '@heroui/react'
import { Plus, Zap } from 'lucide-react'
import { useState } from 'react'

import { MaintenanceTaskCard } from '@/components/MaintenanceTaskForm'
import type { MaintenanceTaskFormData } from '@/components/MaintenanceTaskForm'
import RuntimeLimitsFields from '@/components/RuntimeLimitsFields'
import { createGeneratorWithMaintenance } from '@/data/client/mutations/generators'
import { insertGeneratorSchema } from '@/data/client/validation'

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
  const [tasks, setTasks] = useState<MaintenanceTaskFormData[]>([])

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

  function updateTask(key: number, patch: Partial<MaintenanceTaskFormData>) {
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
  tasks: MaintenanceTaskFormData[]
  addTask: () => void
  updateTask: (key: number, patch: Partial<MaintenanceTaskFormData>) => void
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

          <RuntimeLimitsFields
            maxRunHours={maxRunHours}
            onMaxRunHoursChange={setMaxRunHours}
            restHours={restHours}
            onRestHoursChange={setRestHours}
            warningPct={warningPct}
            onWarningPctChange={setWarningPct}
          />
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
            onChange={patch => updateTask(task.key, patch)}
            onRemove={() => removeTask(task.key)}
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
