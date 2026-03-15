import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { Avatar, Button, Chip, Separator } from '@heroui/react'
import { LogOut } from 'lucide-react'
import { authClient } from '@/lib/auth/auth-client'
import { signOut } from '@/lib/auth/sign-out'
import { getServerSession } from '@/lib/auth/get-session'
import ThemeToggle from '@/components/ThemeToggle'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const session = await getServerSession()
    if (!session) throw redirect({ to: '/sign-in' })
  },
  component: DashboardLayout
})

function DashboardLayout() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <div className="flex min-h-screen">
      <aside className="border-border bg-surface flex w-64 flex-shrink-0 flex-col border-r">
        <div className="p-4">
          <Link to="/dashboard" className="inline-block no-underline">
            <Chip color="accent" variant="secondary" size="sm">
              Svitlo
            </Chip>
          </Link>
        </div>

        <Separator />

        <nav className="flex-1 p-4">
          <Link
            to="/dashboard"
            className="link hover:text-accent block py-2 no-underline"
            activeOptions={{ exact: true }}
            activeProps={{ className: 'link text-accent' }}
          >
            Dashboard
          </Link>
        </nav>

        <Separator />

        <div className="flex items-center gap-3 p-4">
          {user && (
            <>
              <Avatar size="sm">
                {user.image ? <Avatar.Image src={user.image} alt="" /> : null}
                <Avatar.Fallback>
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </Avatar.Fallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-foreground m-0 truncate text-sm font-medium">
                  {user.name}
                </p>
                <p className="text-muted m-0 truncate text-xs">{user.email}</p>
              </div>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  onPress={() => void signOut()}
                  aria-label="Sign out"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            </>
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
