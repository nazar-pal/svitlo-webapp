import { authClient } from './auth-client'

export function hasClientSession() {
  const cached = authClient.$store.atoms.session?.get()
  if (!cached || cached.isPending) return true
  return cached.data !== null
}
