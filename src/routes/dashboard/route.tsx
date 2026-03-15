import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Button, Chip, Drawer, useOverlayState } from '@heroui/react'
import { Menu } from 'lucide-react'
import { z } from 'zod'

import { authClient } from '@/lib/auth/auth-client'
import { getServerSession } from '@/lib/auth/get-session'
import { PowerSyncProvider } from '@/lib/powersync/context'
import SidebarContent from './-sidebar/SidebarContent'

const dashboardSearchSchema = z.object({
  modal: z.enum(['create-org', 'create-generator']).optional()
})

export const Route = createFileRoute('/dashboard')({
  validateSearch: dashboardSearchSchema,
  ssr: false,
  beforeLoad: async () => {
    const session = await getServerSession()
    if (!session) throw redirect({ to: '/sign-in' })
  },
  component: DashboardLayout
})

function DashboardLayout() {
  const { data: session } = authClient.useSession()
  const drawerState = useOverlayState()

  return (
    <PowerSyncProvider userId={session?.user?.id ?? null}>
      <div className="flex min-h-screen">
        <aside className="bg-surface border-border hidden w-72 flex-shrink-0 flex-col border-r md:flex">
          <SidebarContent />
        </aside>

        <header className="border-border bg-surface flex items-center gap-3 border-b p-3 md:hidden">
          <Drawer state={drawerState}>
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              aria-label="Open menu"
              onPress={drawerState.open}
            >
              <Menu size={20} />
            </Button>
            <Drawer.Backdrop>
              <Drawer.Content placement="left" className="w-72">
                <Drawer.Dialog>
                  <Drawer.Body className="p-0">
                    <SidebarContent onNavigate={drawerState.close} />
                  </Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
          <Chip color="accent" variant="secondary" size="sm">
            Svitlo
          </Chip>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </PowerSyncProvider>
  )
}
