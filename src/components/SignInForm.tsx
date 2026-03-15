import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { authClient } from '@/lib/auth/auth-client'
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Tabs,
  TextField
} from '@heroui/react'

export default function SignInForm() {
  const router = useRouter()
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
        if (res.error) return setError(res.error.message ?? 'Sign up failed')
      } else {
        const res = await authClient.signIn.email({ email, password })
        if (res.error) return setError(res.error.message ?? 'Sign in failed')
      }
      await router.navigate({ to: '/dashboard' })
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

      <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {mode === 'signup' && (
          <TextField name="name" value={name} onChange={v => setName(v)}>
            <Label>Name</Label>
            <Input placeholder="Your name" />
            <FieldError />
          </TextField>
        )}
        <TextField
          name="email"
          type="email"
          isRequired
          value={email}
          onChange={v => setEmail(v)}
        >
          <Label>Email</Label>
          <Input placeholder="you@example.com" />
          <FieldError />
        </TextField>
        <TextField
          name="password"
          type="password"
          isRequired
          value={password}
          onChange={v => setPassword(v)}
        >
          <Label>Password</Label>
          <Input placeholder="Your password" />
          <FieldError />
        </TextField>
        {error && <p className="text-danger text-sm">{error}</p>}
        <Button type="submit" isPending={loading} className="mt-1">
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </Button>
      </Form>
    </div>
  )
}
