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
import { Pencil } from 'lucide-react'
import { useState } from 'react'

import RuntimeLimitsFields from '@/components/RuntimeLimitsFields'
import type { Generator } from '@/data/client/db-schema'
import { updateGenerator } from '@/data/client/mutations/generators'

interface EditGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  generator: Generator
}

export default function EditGeneratorModal({
  isOpen,
  onClose,
  userId,
  generator
}: EditGeneratorModalProps) {
  const [title, setTitle] = useState(generator.title)
  const [model, setModel] = useState(generator.model)
  const [description, setDescription] = useState(generator.description ?? '')
  const [maxRunHours, setMaxRunHours] = useState<number | null>(
    generator.maxConsecutiveRunHours
  )
  const [restHours, setRestHours] = useState<number | null>(
    generator.requiredRestHours
  )
  const [warningPct, setWarningPct] = useState(generator.runWarningThresholdPct)
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  function resetForm() {
    setTitle(generator.title)
    setModel(generator.model)
    setDescription(generator.description ?? '')
    setMaxRunHours(generator.maxConsecutiveRunHours)
    setRestHours(generator.requiredRestHours)
    setWarningPct(generator.runWarningThresholdPct)
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setIsPending(true)

    const result = await updateGenerator(userId, generator.id, {
      title: title.trim(),
      model: model.trim(),
      description: description.trim() || null,
      maxConsecutiveRunHours: maxRunHours!,
      requiredRestHours: restHours!,
      runWarningThresholdPct: warningPct
    })

    setIsPending(false)
    if (!result.ok) return setError(result.error)
    onClose()
  }

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[480px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Pencil className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Generator</Modal.Heading>
              <p className="text-muted text-sm leading-5">
                Update generator details and runtime settings.
              </p>
            </Modal.Header>

            <Form onSubmit={handleSubmit} className="flex flex-col">
              <Modal.Body className="max-h-[60vh] overflow-y-auto p-1">
                <div className="flex flex-col gap-4">
                  <Surface variant="default">
                    <div className="flex w-full flex-col gap-4">
                      <TextField
                        name="title"
                        isRequired
                        value={title}
                        onChange={setTitle}
                        autoFocus
                      >
                        <Label>Title</Label>
                        <Input placeholder="My Generator" variant="secondary" />
                        <FieldError />
                      </TextField>

                      <TextField
                        name="model"
                        isRequired
                        value={model}
                        onChange={setModel}
                      >
                        <Label>Model</Label>
                        <Input
                          placeholder="Honda EU2200i"
                          variant="secondary"
                        />
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
                    </div>
                  </Surface>

                  <Surface variant="default">
                    <div className="flex w-full flex-col gap-4">
                      <p className="text-foreground text-sm font-medium">
                        Runtime Limits
                      </p>

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

                  {error && <p className="text-danger text-sm">{error}</p>}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" isPending={isPending}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
