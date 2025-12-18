// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'

describe('sap-status service', () => {
  it('registered the service', () => {
    const service = app.service('sap-status')

    assert.ok(service, 'Registered the service')
  })
})
