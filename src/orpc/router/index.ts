import { health, echo } from './app-test'
import { me } from './user'
import { suggestMaintenancePlan } from './ai'
import { token, applyWrite } from './powersync'

export default {
  appTest: { health, echo },
  user: { me },
  ai: { suggestMaintenancePlan },
  powersync: { token, applyWrite }
}
