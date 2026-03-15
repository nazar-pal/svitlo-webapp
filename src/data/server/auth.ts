import { db } from '@/data/server'
import * as schema from '@/data/server/db-schema'
import { env } from '@/env'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

export const auth = betterAuth({
  appName: 'Svitlo',
  basePath: '/api/auth',
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    'http://localhost:*',
    ...(env.BETTER_AUTH_URL ? [env.BETTER_AUTH_URL] : [])
  ],
  emailAndPassword: {
    enabled: true
  },
  plugins: [tanstackStartCookies()],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // refresh daily when online
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5
    },
    deferSessionRefresh: true
  },
  databaseHooks: {
    user: {
      create: {
        after: async user => {
          await db.insert(schema.organizations).values({
            id: crypto.randomUUID(),
            name: 'Default',
            adminUserId: user.id,
            createdAt: new Date()
          })
        }
      }
    }
  }
})
