import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  useOverlayState
} from '@heroui/react'
import { useNavigate } from '@tanstack/react-router'
import { Building2 } from 'lucide-react'
import { useState } from 'react'

import { createOrganization } from '@/data/client/mutations/organizations'

interface CreateOrganizationModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export default function CreateOrganizationModal({
  isOpen,
  onClose,
  userId
}: CreateOrganizationModalProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const state = useOverlayState({
    isOpen,
    onOpenChange: open => {
      if (!open) onClose()
    }
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const result = await createOrganization(userId, { name: name.trim() })
    if (!result.ok) return setError(result.error)

    setName('')
    onClose()
    navigate({
      to: '/dashboard/$organizationId',
      params: { organizationId: result.id }
    })
  }

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Building2 className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Create Organization</Modal.Heading>
              <p className="text-muted text-sm leading-5">
                Add a new organization to manage your generators and team.
              </p>
            </Modal.Header>
            <Form onSubmit={handleSubmit} className="flex flex-col">
              <Modal.Body className="p-1">
                <Surface variant="default">
                  <div className="flex flex-col gap-4">
                    <TextField
                      name="name"
                      isRequired
                      value={name}
                      onChange={v => setName(v)}
                      autoFocus
                    >
                      <Label>Name</Label>
                      <Input
                        placeholder="My Organization"
                        variant="secondary"
                      />
                      <FieldError />
                    </TextField>
                    {error && <p className="text-danger text-sm">{error}</p>}
                  </div>
                </Surface>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">Create</Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
