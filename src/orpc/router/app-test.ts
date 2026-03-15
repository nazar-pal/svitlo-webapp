import { z } from 'zod'

import { publicProcedure } from '#/orpc/procedures'

export const health = publicProcedure.handler(() => ({
  ok: true,
  service: 'svitlo-api',
  timestamp: new Date().toISOString()
}))

export const echo = publicProcedure
  .input(
    z.object({
      feature: z.string().optional(),
      status: z.string().optional()
    })
  )
  .handler(({ input }) => ({
    accepted: true,
    bodyEcho: {
      feature: input.feature ?? 'unknown',
      status: input.status ?? 'unspecified'
    }
  }))
