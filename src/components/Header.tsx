import { Link } from '@tanstack/react-router'
import { Chip, Separator } from '@heroui/react'
import BetterAuthHeader from '../integrations/better-auth/header-user.tsx'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 px-4 backdrop-blur-lg">
      <nav className="page-wrap flex items-center gap-x-3 py-3 sm:py-4">
        <Link to="/" className="flex-shrink-0 no-underline">
          <Chip color="accent" variant="secondary" size="sm">
            Svitlo
          </Chip>
        </Link>

        <div className="flex items-center gap-x-4 text-sm font-semibold">
          <Link
            to="/"
            className="link hover:text-accent no-underline"
            activeOptions={{ exact: true }}
            activeProps={{ className: 'link text-accent' }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="link hover:text-accent no-underline"
            activeProps={{ className: 'link text-accent' }}
          >
            About
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <BetterAuthHeader />
          <ThemeToggle />
        </div>
      </nav>
      <Separator />
    </header>
  )
}
