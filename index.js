const program = require('commander')
const chalk = require('chalk')
const didYouMean = require('didyoumean')
const pkg = require('./package.json')

program.version(pkg.version)

require('./commands')(program)

program.action(cmd => {
  console.error(chalk.bold.red(`Error: "${cmd}" is not a valid pyro command.`))
})

module.exports = program
