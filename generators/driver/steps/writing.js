'use strict'
/**
 * Step 5
 * Where you write the generator specific files (routes, controllers, etc)
 */

const Util = require('../../../util')

const SOURCE_DRIVER = 'Driver.js'
const SOURCE_DRIVER_TEST = 'Driver.test.js'

const DESTINATION_INDEX = 'drivers/index.js'
const getDestinationService = name => `drivers/${name}Driver.js`
const getDestinationServiceTest = name => `test/unit/drivers/${name}Driver.test.js`

module.exports = function () {
  Util.patchConflicter()

  const name = (this.options['driver-name'].charAt(0).toUpperCase() + this.options['driver-name'].slice(1)).replace(/(\w+)Driver/, '$1')
  const fileName = `${name}Driver`
  const indexPath = this.destinationPath(DESTINATION_INDEX)

  this.fs.copyTpl(this.templatePath(SOURCE_DRIVER), getDestinationService(name), {name, answers: this.answers, fileName})
  this.fs.copyTpl(this.templatePath(SOURCE_DRIVER_TEST), getDestinationServiceTest(name), {name, answers: this.answers, fileName})

  if (!this.fs.exists(this.destinationPath(DESTINATION_INDEX))) {
    return this.fs.write(this.destinationPath(DESTINATION_INDEX), Util.getRequireStatement(fileName))
  }

  if (Util.hasRequireStatement(fileName, this.fs.read(indexPath))) {
    this.log.identical(DESTINATION_INDEX)
    return
  }

  const indexContents = this.fs.read(indexPath)
  const updatedIndexFile = Util.getUpdatedIndexFile(fileName, indexContents)

  this.fs.write(indexPath, updatedIndexFile)
}
