const admin = require('firebase-admin')
const program = require('commander')
const chalk = require('chalk')
const didYouMean = require('didyoumean')
const pkg = require('./package.json')

const configureAdmin = () => {
  const serviceAccount = config.serviceAccount
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const loadPyroConfig = () => {}

program.version(pkg.version)

require('./commands')(program)

program.action(cmd => {
  console.error(chalk.bold.red(`Error: "${cmd}" is not a valid pyro command.`))
})

module.exports = program
