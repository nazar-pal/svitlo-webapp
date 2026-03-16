import { authClient } from './auth-client'
import { clearCredentialCache } from '@/lib/powersync/connector'
import { powersync } from '@/lib/powersync/database'

export async function signOut() {
  powersync.disconnect()
  clearCredentialCache()
  await authClient.signOut()
  window.location.href = '/sign-in'
}
