import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/lib/auth/auth-client'
import { signOut } from '@/lib/auth/sign-out'
import { client } from '#/orpc/client'
import { Button, Card, Form, Input, Tabs, TextField } from '@heroui/react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const session = authClient.useSession()
  const user = session.data?.user

  return (
    <main className="page-wrap mx-auto max-w-2xl px-4 pt-14 pb-8">
      <h1 className="mb-8 text-3xl font-bold text-[var(--sea-ink)]">
        Svitlo API Playground
      </h1>

      <Card className="mb-6">
        <Card.Header>
          <Card.Title>Auth</Card.Title>
        </Card.Header>
        <Card.Content>
          {user ? (
            <div className="space-y-3">
              <p className="text-sm text-[var(--sea-ink-soft)]">
                Signed in as <strong>{user.name}</strong> ({user.email})
              </p>
              <Button variant="danger" size="sm" onPress={() => signOut()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <SignInForm />
          )}
        </Card.Content>
      </Card>

      <HealthCheck />
      <EchoTest />
      <MeTest loggedIn={!!user} />
    </main>
  )
}

function SignInForm() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        const res = await authClient.signUp.email({ name, email, password })
        if (res.error) setError(res.error.message ?? 'Sign up failed')
      } else {
        const res = await authClient.signIn.email({ email, password })
        if (res.error) setError(res.error.message ?? 'Sign in failed')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Tabs
        selectedKey={mode}
        onSelectionChange={key => setMode(key as 'signin' | 'signup')}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Auth mode">
            <Tabs.Tab id="signin">
              Sign In
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="signup">
              Sign Up
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>

      <Form onSubmit={handleSubmit} className="space-y-3">
        {mode === 'signup' && (
          <TextField name="name" value={name} onChange={v => setName(v)}>
            <Input placeholder="Name" />
          </TextField>
        )}
        <TextField
          name="email"
          type="email"
          isRequired
          value={email}
          onChange={v => setEmail(v)}
        >
          <Input placeholder="Email" />
        </TextField>
        <TextField
          name="password"
          type="password"
          isRequired
          value={password}
          onChange={v => setPassword(v)}
        >
          <Input placeholder="Password" />
        </TextField>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" isPending={loading}>
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </Button>
      </Form>
    </div>
  )
}

function HealthCheck() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function check() {
    setLoading(true)
    try {
      const res = await client.appTest.health()
      setResult(JSON.stringify(res, null, 2))
    } catch (err: unknown) {
      setResult(`Error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-6">
      <Card.Header>
        <Card.Title>Health Check</Card.Title>
      </Card.Header>
      <Card.Content>
        <Button
          variant="secondary"
          size="sm"
          onPress={check}
          isPending={loading}
        >
          GET /appTest/health
        </Button>
        {result && (
          <pre className="mt-3 overflow-auto rounded-lg bg-[rgba(23,58,64,0.05)] p-3 text-xs text-[var(--sea-ink)]">
            {result}
          </pre>
        )}
      </Card.Content>
    </Card>
  )
}

function EchoTest() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function check() {
    setLoading(true)
    try {
      const res = await client.appTest.echo({ feature: 'test', status: 'ok' })
      setResult(JSON.stringify(res, null, 2))
    } catch (err: unknown) {
      setResult(`Error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-6">
      <Card.Header>
        <Card.Title>Echo Test</Card.Title>
      </Card.Header>
      <Card.Content>
        <Button
          variant="secondary"
          size="sm"
          onPress={check}
          isPending={loading}
        >
          POST /appTest/echo
        </Button>
        {result && (
          <pre className="mt-3 overflow-auto rounded-lg bg-[rgba(23,58,64,0.05)] p-3 text-xs text-[var(--sea-ink)]">
            {result}
          </pre>
        )}
      </Card.Content>
    </Card>
  )
}

function MeTest({ loggedIn }: { loggedIn: boolean }) {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function check() {
    setLoading(true)
    try {
      const res = await client.user.me()
      setResult(JSON.stringify(res, null, 2))
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? ((err as Error & { code?: string }).code ?? err.message)
          : String(err)
      setResult(`Error: ${message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-6">
      <Card.Header>
        <Card.Title>User Me (Protected)</Card.Title>
        <Card.Description>
          {loggedIn
            ? 'You are signed in — should return your user data.'
            : 'Not signed in — should return UNAUTHORIZED.'}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Button
          variant="secondary"
          size="sm"
          onPress={check}
          isPending={loading}
        >
          GET /user/me
        </Button>
        {result && (
          <pre className="mt-3 overflow-auto rounded-lg bg-[rgba(23,58,64,0.05)] p-3 text-xs text-[var(--sea-ink)]">
            {result}
          </pre>
        )}
      </Card.Content>
    </Card>
  )
}
