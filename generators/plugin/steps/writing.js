/**
 * Step 5
 * Where you write the generator specific files (routes, controllers, etc)
 */

const path = require('path')
const TEMPLATE = path.join(path.dirname(require.resolve('lisa-plugin')), 'archetype')


module.exports = function () {
  this.fs.copyTpl(path.resolve(TEMPLATE, '**'), this.destinationPath(), {
    name: this['plugin-name']
  })
}
