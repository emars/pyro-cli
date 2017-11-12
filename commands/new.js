/**
 * pyro new <app_name>
 */
const exec = require('cp').exec
const chalk = require('chalk')
const GITHUB_URL = 'https://github.com/emars/pyro-base'

module.exports = name => {
  console.log(chalk.blue(`Creating new pyro project: "${name}".`))
  console.log(chalk.blue(`Cloning pyro-base...`))
  return cloneBaseProject(name).then(() => {
    console.log(chalk.blue(`Done Cloning pyro-base.`))
  })
}

const cloneBaseProject = projectName =>
  new Promise((resolve, reject) => {
    exec(`git clone ${GITHUB_URL} ${process.cwd()}/${projectName}`, err => {
      if (err) reject(err)
    })
  })
