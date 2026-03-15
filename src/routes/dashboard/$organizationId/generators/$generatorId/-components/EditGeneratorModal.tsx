import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Modal,
  NumberField,
  Slider,
  Surface,
  TextArea,
  TextField,
  useOverlayState
} from '@heroui/react'
import { Pencil } from 'lucide-react'
import { useState } from 'react'

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

                      <div className="grid grid-cols-2 gap-3">
                        <NumberField
                          isRequired
                          step={0.5}
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
                          step={0.5}
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
                          {({ state: sliderState }) =>
                            `${sliderState.getThumbValueLabel(0)}%`
                          }
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
