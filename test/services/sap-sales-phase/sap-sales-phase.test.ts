// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'

describe('sap-sales-phase service', () => {
  it('registered the service', () => {
    const service = app.service('sap-sales-phase')

    assert.ok(service, 'Registered the service')
  })
})
