/**
 * pyro new <app_name>
 */
const exec = require('child_process').exec
const chalk = require('chalk')
const GITHUB_URL = 'https://github.com/emars/pyro-base'

module.exports = program => {
  program
    .command('new [name]')
    .description('create a new pyro project')
    .action((name, options) => {
      console.log(chalk.blue(`Creating new pyro project: "${name}".`))
      console.log(chalk.blue(`Cloning pyro-base...`))
      cloneBaseProject(name)
        .then(() => {
          console.log(chalk.blue('All done setting up your pyro project!'))
        })
        .catch(err => {
          console.error(
            chalk.bold.red('Pyro Error: Could not create new project')
          )
          console.error(err)
        })
    })
}

const cloneBaseProject = projectName =>
  new Promise((resolve, reject) => {
    exec(`git clone ${GITHUB_URL} ${process.cwd()}/${projectName}`, err => {
      if (err) reject(err)
      resolve()
    })
  })
