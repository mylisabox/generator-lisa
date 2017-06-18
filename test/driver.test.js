'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const test = require('yeoman-test')

describe('lisa:driver', () => {
  describe('Should properly generate driver interface', () => {
    before(() => {
      return test
        .run(path.join(__dirname, '../generators/driver'))
        .withArguments(['test'])
        .toPromise()
    })

    it('Should properly create driver files', () => {
      assert.file([
        'drivers/TestDriver.js'
      ])
    })

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/drivers/TestDriver.test.js'
      ])
    })
  })
})
