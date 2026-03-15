import { Button, Modal, useOverlayState } from '@heroui/react'
import { Zap } from 'lucide-react'

interface CreateGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateGeneratorModal({
  isOpen,
  onClose
}: CreateGeneratorModalProps) {
  const state = useOverlayState({
    isOpen,
    onOpenChange: open => {
      if (!open) onClose()
    }
  })

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Zap className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Create Generator</Modal.Heading>
              <p className="text-muted text-sm leading-5">
                Generator creation form coming soon.
              </p>
            </Modal.Header>
            <Modal.Footer>
              <Button onPress={onClose}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
