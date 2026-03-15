import { os, ORPCError } from '@orpc/server'

import { db } from '@/data/server'
import { auth } from '@/data/server/auth'

export interface AppContext {
  db: typeof db
  session: Awaited<ReturnType<typeof auth.api.getSession>>
  headers: Headers
}

const base = os.$context<AppContext>()

export const publicProcedure = base

export const protectedProcedure = base.use(({ context, next }) => {
  if (!context.session) {
    throw new ORPCError('UNAUTHORIZED')
  }
  return next({ context: { session: context.session } })
})

export async function createAppContext(req: Request): Promise<AppContext> {
  const session = await auth.api.getSession({ headers: req.headers })
  return { db, session, headers: req.headers }
}
