/**
 * Step 2
 * Where you prompt users for options (where you'd call this.prompt()).
 */

const questions = require('../questions')
const yosay = require('yosay')
const chalk = require('chalk')

module.exports = {
  ask () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tiptop ' + chalk.red('L.I.S.A. plugin') + ' generator!'
    ))

    return this.prompt(questions).then(answers => {
      this.answers = Object.assign(this.answers || {}, answers)
    })
  }
}
