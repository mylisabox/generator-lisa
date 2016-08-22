'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs')

describe('lisa:plugin', ()=> {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/plugin'))
      .withPrompts({someAnswer: true})
      .withArguments('test')
      .toPromise()
  })

  it('creates files', () => {
    assert.file([
      'package.json',
      'test/mocha.opts',
      'test/.eslintrc.json',
      'test/index.js'
    ])
  })

  it('should replace package.json template value', () => {
    const data = fs.readFileSync('package.json', 'utf8')
    assert.notEqual(data.indexOf('lisa-plugin-test'), -1)
  })
})
