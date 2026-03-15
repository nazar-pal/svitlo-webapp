import {
  DrizzleAppSchema,
  wrapPowerSyncWithDrizzle
} from '@powersync/drizzle-driver'
import { PowerSyncDatabase } from '@powersync/web'

import {
  user,
  organizations,
  organizationMembers,
  invitations,
  generators,
  generatorUserAssignments,
  generatorSessions,
  maintenanceTemplates,
  maintenanceRecords
} from '../../data/client/db-schema'

const tables = {
  user,
  organizations,
  organizationMembers,
  invitations,
  generators,
  generatorUserAssignments,
  generatorSessions,
  maintenanceTemplates,
  maintenanceRecords
}

const schema = new DrizzleAppSchema(tables)

export const powersync = new PowerSyncDatabase({
  schema,
  database: { dbFilename: 'svitlo.db' }
})

export const db = wrapPowerSyncWithDrizzle(powersync, {
  schema: tables
})
