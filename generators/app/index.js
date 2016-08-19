'use strict'
const yeoman = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class LISAGenerator extends yeoman.Base {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the scrumtrulescent ' + chalk.red('L.I.S.A.') + ' generator!'
    ))

    const prompts = require('./questions')

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer
      this.props = props
    })
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    )
  }

  install() {
    this.installDependencies()
  }
}
