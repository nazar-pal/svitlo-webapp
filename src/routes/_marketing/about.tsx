import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@heroui/react'

export const Route = createFileRoute('/_marketing/about')({
  component: About
})

function About() {
  return (
    <main className="page-wrap px-4 py-12">
      <Card>
        <Card.Content className="p-6 sm:p-8">
          <p className="text-muted mb-2 text-xs font-bold tracking-widest uppercase">
            About
          </p>
          <h1 className="font-display text-foreground mb-3 text-4xl font-bold sm:text-5xl">
            A small starter with room to grow.
          </h1>
          <p className="text-muted m-0 max-w-3xl text-base leading-8">
            Svitlo is a local-first web app built on TanStack Start with
            type-safe routing, server functions, and modern SSR defaults. Use it
            as a clean foundation, then layer in your own features.
          </p>
        </Card.Content>
      </Card>
    </main>
  )
}
