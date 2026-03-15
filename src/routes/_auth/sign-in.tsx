import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { Card, Chip } from '@heroui/react'
import SignInForm from '@/components/SignInForm'
import { getServerSession } from '@/lib/auth/get-session'

export const Route = createFileRoute('/_auth/sign-in')({
  beforeLoad: async () => {
    const session = await getServerSession()
    if (session) throw redirect({ to: '/dashboard' })
  },
  component: SignIn
})

function SignIn() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 text-center">
        <Link to="/" className="inline-block no-underline">
          <Chip color="accent" variant="secondary" size="sm">
            Svitlo
          </Chip>
        </Link>
      </div>
      <Card>
        <Card.Content className="p-6">
          <SignInForm />
        </Card.Content>
      </Card>
      <p className="text-muted mt-4 text-center text-sm">
        <Link to="/" className="link text-accent no-underline hover:underline">
          Back to home
        </Link>
      </p>
    </div>
  )
}
