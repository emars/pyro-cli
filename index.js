const program = require('commander')
const chalk = require('chalk')
const didYouMean = require('didyoumean')
const pkg = require('./package.json')

program.version(pkg.version)

const client = {}
client.cli = program
client.getCommand = (err, status) => {}

require('./commands')(client)

program.action(cmd => {
  console.error(chalk.bold.red(`Error: "${cmd}" is not a valid pyro command.`))
})

module.exports = client
