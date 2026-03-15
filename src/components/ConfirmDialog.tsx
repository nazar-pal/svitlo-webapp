import { AlertDialog, Button } from '@heroui/react'
import { Trash2 } from 'lucide-react'
import type { ReactNode } from 'react'

interface ConfirmDialogProps {
  heading: string
  message: ReactNode
  confirmLabel: string
  onConfirm: () => void
}

export default function ConfirmDialog({
  heading,
  message,
  confirmLabel,
  onConfirm
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button
          size="sm"
          variant="ghost"
          isIconOnly
          className="text-danger"
          aria-label={heading}
        >
          <Trash2 size={16} />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>{heading}</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-default-500 m-0 text-sm">{message}</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                variant="primary"
                className="bg-danger text-danger-foreground"
                onPress={onConfirm}
              >
                {confirmLabel}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  )
}
