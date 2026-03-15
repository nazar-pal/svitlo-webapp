import { eq } from 'drizzle-orm'

import { db } from '@/lib/powersync/database'
import { user } from '../db-schema'

export function getAllUsers() {
  return db.select().from(user)
}

export function getUser({ userId }: { userId: string }) {
  return db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: {
      createdAt: false,
      updatedAt: false
    }
  })
}

export type GetUserResult = Awaited<ReturnType<typeof getUser>>
export type GetUserResultItem = Exclude<GetUserResult, undefined>
