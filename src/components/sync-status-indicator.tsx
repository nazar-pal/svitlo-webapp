import { Spinner } from '@heroui/react'
import { useStatus } from '@powersync/react'
import { useSyncExternalStore } from 'react'
import { CloudCheck, TriangleAlert, WifiOff } from 'lucide-react'

const subscribe = () => () => {}
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

function useSyncState() {
  const status = useStatus()

  if (status.dataFlowStatus?.uploadError)
    return {
      label: 'Sync error',
      icon: <TriangleAlert size={14} />,
      color: 'text-danger' as const
    }

  if (status.dataFlowStatus?.uploading)
    return {
      label: 'Syncing changes…',
      icon: <Spinner size="sm" />,
      color: 'text-muted' as const
    }

  if (!status.connected && !status.connecting)
    return {
      label: 'Offline — changes saved locally',
      icon: <WifiOff size={14} />,
      color: 'text-muted' as const
    }

  if (status.connecting && !status.connected)
    return {
      label: 'Connecting…',
      icon: <Spinner size="sm" />,
      color: 'text-muted' as const
    }

  return {
    label: 'All changes synced',
    icon: <CloudCheck size={14} />,
    color: 'text-muted' as const
  }
}

export function SyncStatusIndicator() {
  const isClient = useIsClient()
  const { label, icon, color } = useSyncState()

  if (!isClient) return null

  return (
    <div className="flex items-center gap-1.5 px-4 pb-2">
      {icon}
      <span className={`text-xs ${color}`}>{label}</span>
    </div>
  )
}
