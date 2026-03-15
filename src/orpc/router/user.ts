import { protectedProcedure } from '#/orpc/procedures'

export const me = protectedProcedure.handler(({ context }) => ({
  user: context.session.user,
  session: {
    id: context.session.session.id,
    expiresAt: context.session.session.expiresAt
  }
}))
