import { authClient } from '#/lib/auth/auth-client'
import { Link } from '@tanstack/react-router'
import { Button, Separator } from '@heroui/react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const { data: session } = authClient.useSession()

  return (
    <header className="bg-background/80 sticky top-0 z-50 px-4 backdrop-blur-lg">
      <nav className="page-wrap flex items-center gap-x-3 py-3 sm:py-4">
        <Link to="/" className="flex shrink-0 items-center gap-2 no-underline">
          <img src="/favicon.png" alt="" width={24} height={24} />
          <span className="font-display text-foreground text-sm font-bold">
            Svitlo
          </span>
        </Link>

        <div className="flex items-center gap-x-4 text-sm font-semibold">
          <a href="#" className="link hover:text-accent no-underline">
            Home
          </a>
          <a href="#features" className="link hover:text-accent no-underline">
            Features
          </a>
          <a href="#pricing" className="link hover:text-accent no-underline">
            Pricing
          </a>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {session?.user && (
            <Link to="/dashboard" className="no-underline">
              <Button size="sm">Dashboard</Button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </nav>
      <Separator />
    </header>
  )
}
