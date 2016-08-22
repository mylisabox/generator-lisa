'use strict'
/**
 * Step 5
 * Where you write the generator specific files (routes, controllers, etc)
 */
const Util = require('../../../util')

const SOURCE_CONTROLLER = 'Controller.js'
const SOURCE_CONTROLLER_TEST = 'Controller.test.js'

const DESTINATION_API_INDEX = 'api/index.js'
const DESTINATION_INDEX = 'api/controllers/index.js'
const getDestinationController = name => `api/controllers/${name}Controller.js`
const getDestinationControllerTest = name => `test/unit/controllers/${name}Controller.test.js`

module.exports = function () {
  Util.patchConflicter()

  const name = (this['controller-name'].charAt(0).toUpperCase() + this['controller-name'].slice(1)).replace(/(\w+)Controller$/, '$1')
  const fileName = `${name}Controller`
  const indexPath = this.destinationPath(DESTINATION_INDEX)

  this.template(SOURCE_CONTROLLER, getDestinationController(name), {name, fileName, answers: this.answers})
  this.template(SOURCE_CONTROLLER_TEST, getDestinationControllerTest(name), {name})

  const apiIndexPath = this.destinationPath(DESTINATION_API_INDEX)
  if (this.fs.exists(apiIndexPath) && !Util.hasRequireStatement('controllers', this.fs.read(apiIndexPath))) {
    const apiIndexContent = this.fs.read(apiIndexPath)
    const updatedIndexFile = Util.getUpdatedIndexFile('controllers', apiIndexContent)

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
