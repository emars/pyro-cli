/**
 * pyro generate <type> <name>
 * 
 * type: component, container, page, redux
 */
const exec = require('child_process').exec
const chalk = require('chalk')
const fs = require('fs-promise')
const _ = require('lodash')
const GITHUB_URL = 'https://github.com/emars/pyro-base'

module.exports = program => {
  program
    .command('generate [type] [name]')
    .alias('g')
    .description('generate a file in a pyro project')
    .action((type, name, options) => {
      const normalizedType = _.lowerCase(type)
      let generate
      switch (normalizedType) {
        case 'component':
          generate = generateComponent
          break
        case 'container':
          generate = generateContainer
          break
        case 'page':
          generate = generatePage
          break
        case 'redux':
          generate = generateRedux
          break
        default:
          generate = invalidType.bind(this, type)
      }
      generate(name)
        .then(() => {})
        .catch(err => {
          console.error(chalk.bold.red('Pyro Error: Could not generate.'))
          console.error(err)
        })
    })
}

const invalidType = type =>
  Promise.resolve(
    console.log(chalk.red.bold(`Pyro Error: Invalid Generator ${type}`))
  )

const generateComponent = async name => {
  if (!await isPyroRoot()) {
    return console.log(
      chalk.red.bold(
        'Pyro Error: "generate" must be run from the root of a pyro project.'
      )
    )
  }
  console.log(chalk.blue(`Generating Component ${name}...`))
  const indexTemplate = await fs.readFile(
    `${__dirname}/../lib/templates/component/index.js.template`,
    'utf-8'
  )
  const componentTemplate = await fs.readFile(
    `${__dirname}/../lib/templates/component/component.js.template`,
    'utf-8'
  )

  const index = indexTemplate.replace(/%NAME%/g, name)
  const component = componentTemplate.replace(/%NAME%/g, name)

  await fs.mkdir(`${getComponentDir(name)}`)
  await fs.writeFile(`${getComponentDir(name)}/index.js`, index)
  await fs.writeFile(`${getComponentDir(name)}/${name}.js`, component)

  console.log(chalk.blue(`Successfully Generated Component: ${name}.`))
}

const getPyroRoot = () => {
  return process.cwd()
}

const isPyroRoot = async () => {
  try {
    const stat = await fs.stat(`${process.cwd()}/.pyrorc`)
    return true
  } catch (e) {
    return false
  }
}

const getComponentDir = name => `${getPyroRoot()}/src/app/components/${name}`

const generatePage = () => {}

const generateContainer = () => {}

const generateRedux = () => {}
