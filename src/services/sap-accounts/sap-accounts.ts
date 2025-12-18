// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { SapAccountsService } from './sap-accounts.class'


export * from './sap-accounts.class'
export const sapAccountsPath = 'sap-accounts'

export const sapAccountsMethods: Array<keyof SapAccountsService> = [
  'find',
  // 'get',
  // 'create',
  // 'patch',
  // 'remove'
]
// A configure function that registers the service and its hooks via `app.configure`
export const sapAccounts = (app: Application) => {
  // Register our service on the Feathers application
  app.use(sapAccountsPath, new SapAccountsService(app), {
    // A list of all methods this service exposes externally
    methods: sapAccountsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(sapAccountsPath).hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      find: [],
      // get: [],
      // create: [],
      // patch: [],
      // remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [sapAccountsPath]: SapAccountsService
  }
}
