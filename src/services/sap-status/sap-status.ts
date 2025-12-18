// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { SapStatusService, getOptions } from './sap-status.class'
// import { sapStatusPath, sapStatusMethods } from './sap-status.shared'

export * from './sap-status.class'
export const sapStatusPath = 'sap-status'

export const sapStatusMethods: Array<keyof SapStatusService> = ['find']

// A configure function that registers the service and its hooks via `app.configure`
export const sapStatus = (app: Application) => {
  // Register our service on the Feathers application
  app.use(sapStatusPath, new SapStatusService(app), {
    // A list of all methods this service exposes externally
    methods: sapStatusMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(sapStatusPath).hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      find: [],
     
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
    [sapStatusPath]: SapStatusService
  }
}
