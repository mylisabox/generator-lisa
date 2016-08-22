'use strict'
/**
 * Step 5
 * Where you write the generator specific files (routes, controllers, etc)
 */

const Util = require('../../../util')

const SOURCE_SERVICE = 'Service.js'
const SOURCE_SERVICE_TEST = 'Service.test.js'

const DESTINATION_API_INDEX = 'api/index.js'
const DESTINATION_INDEX = 'api/services/index.js'
const getDestinationService = name => `api/services/${name}Service.js`
const getDestinationServiceTest = name => `test/unit/services/${name}Service.test.js`

module.exports = function () {
  Util.patchConflicter()

  const name = (this['service-name'].charAt(0).toUpperCase() + this['service-name'].slice(1)).replace(/(\w+)Service/, '$1')
  const fileName = `${name}Service`
  const indexPath = this.destinationPath(DESTINATION_INDEX)

  this.template(SOURCE_SERVICE, getDestinationService(name), {name, answers: this.answers, fileName})
  this.template(SOURCE_SERVICE_TEST, getDestinationServiceTest(name), {name, answers: this.answers, fileName})

  const apiIndexPath = this.destinationPath(DESTINATION_API_INDEX)
  if (this.fs.exists(apiIndexPath) && !Util.hasRequireStatement('services', this.fs.read(apiIndexPath))) {
    const apiIndexContent = this.fs.read(apiIndexPath)
    const updatedIndexFile = Util.getUpdatedIndexFile('services', apiIndexContent)

    this.fs.write(apiIndexPath, updatedIndexFile)
  }

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
