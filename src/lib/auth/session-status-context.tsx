import { createContext, useContext, useMemo } from 'react'
import { authClient } from './auth-client'

type SessionStatus = 'valid' | 'expired' | 'unknown'

interface SessionStatusContextValue {
  sessionStatus: SessionStatus
}

const SessionStatusContext = createContext<SessionStatusContextValue | null>(
  null
)

export function SessionStatusProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { data: session, isPending } = authClient.useSession()

  const sessionStatus = useMemo<SessionStatus>(() => {
    if (isPending) return 'unknown'
    if (!session) return 'expired'
    return 'valid'
  }, [isPending, session])

  return (
    <SessionStatusContext.Provider value={{ sessionStatus }}>
      {children}
    </SessionStatusContext.Provider>
  )
}

export function useSessionStatus(): SessionStatusContextValue {
  const ctx = useContext(SessionStatusContext)
  if (!ctx) {
    throw new Error(
      'useSessionStatus must be used inside SessionStatusProvider'
    )
  }
  return ctx
}
