import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Modal,
  TextField,
  useOverlayState
} from '@heroui/react'
import { Clock } from 'lucide-react'
import { useState } from 'react'

import type { GeneratorSession } from '@/data/client/db-schema'
import {
  logManualSession,
  updateSession
} from '@/data/client/mutations/sessions'
import { nowLocal, toISO, toLocal } from '@/lib/time'

interface RuntimeEntryModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  generatorId: string
  session: GeneratorSession | null
}

export default function RuntimeEntryModal({
  isOpen,
  onClose,
  userId,
  generatorId,
  session
}: RuntimeEntryModalProps) {
  const isEdit = session !== null

  const [startedAt, setStartedAt] = useState(
    session ? toLocal(session.startedAt) : ''
  )
  const [stoppedAt, setStoppedAt] = useState(
    session?.stoppedAt ? toLocal(session.stoppedAt) : nowLocal()
  )
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  function resetForm() {
    setStartedAt(session ? toLocal(session.startedAt) : '')
    setStoppedAt(session?.stoppedAt ? toLocal(session.stoppedAt) : nowLocal())
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

    const startISO = toISO(startedAt)
    const stopISO = toISO(stoppedAt)

    const result = isEdit
      ? await updateSession(userId, session.id, {
          startedAt: startISO,
          stoppedAt: stopISO
        })
      : await logManualSession(userId, {
          generatorId,
          startedAt: startISO,
          stoppedAt: stopISO
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
                <Clock className="size-5" />
              </Modal.Icon>
              <Modal.Heading>
                {isEdit ? 'Edit Runtime Entry' : 'Log Runtime Entry'}
              </Modal.Heading>
              <p className="text-muted text-sm leading-5">
                {isEdit
                  ? 'Update the start and stop times.'
                  : 'Manually log a runtime entry for this generator.'}
              </p>
            </Modal.Header>

            <Form onSubmit={handleSubmit} className="flex flex-col">
              <Modal.Body className="p-1">
                <div className="flex flex-col gap-4">
                  <TextField
                    name="startedAt"
                    isRequired
                    value={startedAt}
                    onChange={setStartedAt}
                    autoFocus
                  >
                    <Label>Start time</Label>
                    <Input
                      type="datetime-local"
                      variant="secondary"
                      max={nowLocal()}
                    />
                    <FieldError />
                  </TextField>

                  <TextField
                    name="stoppedAt"
                    isRequired
                    value={stoppedAt}
                    onChange={setStoppedAt}
                  >
                    <Label>Stop time</Label>
                    <Input
                      type="datetime-local"
                      variant="secondary"
                      max={nowLocal()}
                    />
                    <FieldError />
                  </TextField>

                  {error && <p className="text-danger text-sm">{error}</p>}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" isPending={isPending}>
                  {isEdit ? 'Save Changes' : 'Log Runtime'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
