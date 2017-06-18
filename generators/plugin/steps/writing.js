'use strict'
/**
 * Step 5
 * Where you write the generator specific files (routes, controllers, etc)
 */

const path = require('path')
const TEMPLATE = path.join(path.dirname(require.resolve('lisa-plugin')), 'archetype')

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

module.exports = function () {
  const parts = this.options['plugin-name'].split(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g)
  for (let i = 0; i < parts.length; i++) {
    parts[i] = parts[i].capitalize()
  }

  // Copy all files
  this.fs.copyTpl(path.resolve(TEMPLATE, '**', '*'), this.destinationRoot(), {
    name: this.options['plugin-name'].toLowerCase(),
    nameNormalized: parts.join()
  })

  // Copy all dotfiles
  this.fs.copyTpl(
    path.resolve(TEMPLATE, '**', '.*'),
    this.destinationRoot()
  )
}
