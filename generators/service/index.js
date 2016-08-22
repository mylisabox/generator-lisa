'use strict'
const yeoman = require('yeoman-generator')
const generatorArguments = require('./arguments')
const generatorOptions = require('./options')
const generatorSteps = require('./steps')

module.exports = class ServiceGenerator extends yeoman.Base {
  constructor(arg0, arg1) {
    super(arg0, arg1)

    Object.keys(generatorArguments).forEach(key => this.argument(key, generatorArguments[key]))
    Object.keys(generatorOptions).forEach(key => this.option(key, generatorOptions[key]))

    this.description = 'Create new L.I.S.A. plugin service'
  }

  get configuring() {
    return generatorSteps.configuring
  }

  get conflicts() {
    return generatorSteps.conflicts
  }

  get default() {
    return generatorSteps.default
  }

  get end() {
    return generatorSteps.end
  }

  get initializing() {
    return generatorSteps.initializing
  }

  get install() {
    return generatorSteps.install
  }

  get prompting() {
    return generatorSteps.prompting
  }

  get writing() {
    return generatorSteps.writing
  }
}
