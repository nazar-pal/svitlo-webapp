import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth/auth-client'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome
})

function DashboardHome() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <div>
      <h1 className="text-foreground mb-2 text-3xl font-bold">
        Welcome back{user?.name ? `, ${user.name}` : ''}
      </h1>
      <p className="text-muted">
        This is your dashboard. More features coming soon.
      </p>
    </div>
  )
}
