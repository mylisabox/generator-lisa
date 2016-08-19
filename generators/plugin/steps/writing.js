/**
 * Step 5
 * Where you write the generator specific files (routes, controllers, etc)
 */

const path = require('path')
const TEMPLATE = path.join(path.dirname(require.resolve('lisa-plugin')), 'archetype')


module.exports = function () {
  // Copy all files
  this.fs.copyTpl(path.resolve(TEMPLATE, '**', '*'), this.destinationRoot(), {
    name: this['plugin-name']
  })

  // Copy all dotfiles
  this.fs.copyTpl(
    path.resolve(TEMPLATE, '**', '.*'),
    this.destinationRoot()
  )
}
