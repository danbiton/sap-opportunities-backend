// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { SapSalesCyclesService, getOptions } from './sap-sales-cycles.class'
// import { sapSalesCyclesPath, sapSalesCyclesMethods } from './sap-sales-cycles.shared'

export * from './sap-sales-cycles.class'
export const sapSalesCyclesPath = 'sap-sales-cycles'

export const sapSalesCyclesMethods: Array<keyof SapSalesCyclesService> = [
  'find'
  
]

// A configure function that registers the service and its hooks via `app.configure`
export const sapSalesCycles = (app: Application) => {
  // Register our service on the Feathers application
  app.use(sapSalesCyclesPath, new SapSalesCyclesService(app), {
    // A list of all methods this service exposes externally
    methods: sapSalesCyclesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(sapSalesCyclesPath).hooks({
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
    [sapSalesCyclesPath]: SapSalesCyclesService
  }
}
