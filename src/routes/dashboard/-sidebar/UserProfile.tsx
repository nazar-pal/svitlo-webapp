import { Avatar } from '@heroui/react'

interface UserProfileProps {
  name: string
  email: string
  image: string | null
}

export default function UserProfile({ name, email, image }: UserProfileProps) {
  return (
    <div className="flex items-center gap-3 p-4">
      <Avatar size="md">
        {image ? <Avatar.Image src={image} alt="" /> : null}
        <Avatar.Fallback>{name.charAt(0).toUpperCase() || 'U'}</Avatar.Fallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-foreground m-0 truncate text-sm font-medium">
          {name}
        </p>
        <p className="text-muted m-0 truncate text-xs">{email}</p>
      </div>
    </div>
  )
}
