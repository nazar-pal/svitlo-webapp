import { authClient } from '#/lib/auth/auth-client'
import { signOut } from '#/lib/auth/sign-out'
import { Link } from '@tanstack/react-router'
import { Avatar, Button, Skeleton } from '@heroui/react'

export default function BetterAuthHeader() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) return <Skeleton className="h-8 w-8 rounded-full" />

  if (session?.user)
    return (
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          {session.user.image ? (
            <Avatar.Image src={session.user.image} alt="" />
          ) : null}
          <Avatar.Fallback>
            {session.user.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar.Fallback>
        </Avatar>
        <Button variant="danger" size="sm" onPress={() => void signOut()}>
          Sign out
        </Button>
      </div>
    )

  return (
    <Link to="/" className="button button--secondary button--sm no-underline">
      Sign in
    </Link>
  )
}
