// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { SapCategoriesService } from './sap-categories.class'


export * from './sap-categories.class'

export const sapCategoriesPath = 'sap-categories'

export const sapCategoriesMethods: Array<keyof SapCategoriesService> = [
  'find',
  
]

// A configure function that registers the service and its hooks via `app.configure`
export const sapCategories = (app: Application) => {
  // Register our service on the Feathers application
  app.use(sapCategoriesPath, new SapCategoriesService(app), {
    // A list of all methods this service exposes externally
    methods: sapCategoriesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(sapCategoriesPath).hooks({
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
    [sapCategoriesPath]: SapCategoriesService
  }
}
