import { createFileRoute, Link } from '@tanstack/react-router'
import { Card } from '@heroui/react'
import { Zap, Shield, Code } from 'lucide-react'

export const Route = createFileRoute('/_marketing/')({
  component: Home
})

const features = [
  {
    icon: Zap,
    kicker: 'Local-first',
    title: 'Offline Ready',
    description:
      'Works without a connection. Data syncs automatically when you are back online.'
  },
  {
    icon: Shield,
    kicker: 'Secure',
    title: 'Better Auth',
    description:
      'Session-based authentication with secure defaults. Sign in with email and password.'
  },
  {
    icon: Code,
    kicker: 'Type-safe',
    title: 'End to End',
    description:
      'Full type safety from database to UI with Drizzle, oRPC, and TanStack Router.'
  }
] as const

function Home() {
  return (
    <main className="page-wrap px-4 pt-20 pb-12">
      <section className="mx-auto max-w-2xl text-center">
        <p className="text-muted mb-3 text-xs font-bold tracking-widest uppercase">
          Welcome to
        </p>
        <h1 className="font-display text-foreground mb-5 text-5xl font-bold sm:text-6xl">
          Svitlo
        </h1>
        <p className="text-muted mx-auto mb-10 max-w-md text-lg leading-relaxed">
          A modern, local-first web app. Fast by default, offline-ready, and
          beautifully simple.
        </p>
        <Link to="/sign-in" className="button button--lg no-underline">
          Get Started
        </Link>
      </section>

      <section className="mx-auto mt-24 grid max-w-3xl gap-6 sm:grid-cols-3">
        {features.map(f => (
          <Card key={f.title}>
            <Card.Content className="p-6">
              <f.icon
                size={28}
                className="text-accent mb-3"
                strokeWidth={1.5}
              />
              <p className="text-muted mb-1 text-xs font-bold tracking-widest uppercase">
                {f.kicker}
              </p>
              <h3 className="text-foreground mb-2 text-base font-semibold">
                {f.title}
              </h3>
              <p className="text-muted m-0 text-sm leading-relaxed">
                {f.description}
              </p>
            </Card.Content>
          </Card>
        ))}
      </section>
    </main>
  )
}
