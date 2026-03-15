import { Link } from '@tanstack/react-router'
import { Separator } from '@heroui/react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="text-muted mt-20 px-4 pt-10 pb-14">
      <Separator className="mb-10" />
      <div className="page-wrap">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-display text-foreground m-0 text-lg font-bold">
              Svitlo
            </p>
            <p className="text-muted mt-1 mb-0 max-w-xs text-sm leading-relaxed">
              Power generator maintenance, simplified. Track runtime, schedule
              service, keep your team in sync.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm sm:items-end">
            <Link to="/" className="link hover:text-accent no-underline">
              Home
            </Link>
            <a href="#features" className="link hover:text-accent no-underline">
              Features
            </a>
            <a href="#pricing" className="link hover:text-accent no-underline">
              Pricing
            </a>
            <Link to="/sign-in" className="link hover:text-accent no-underline">
              Sign In
            </Link>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="m-0 text-center text-xs">
          &copy; {year} Svitlo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
