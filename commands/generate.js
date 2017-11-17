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

/**
 * 
 * @param {*G} dir 
 * @param {*} files 
 * @param {*} name 
 */
const generate = async (dir, files, name) => {
  if (!await isPyroRoot()) {
    return console.log(
      chalk.red.bold(
        'Pyro Error: "generate" must be run from the root of a pyro project.'
      )
    )
  }
  console.log(chalk.blue(`Generating ${name}...`))

  await fs.mkdir(dir)
  files.forEach(async file => {
    const contents = await fs.readFile(file.path, 'utf-8')
    const tplName = file.name.replace(/%NAME%/g, name)
    const tpl = contents.replace(/%NAME%/g, name)
    await fs.writeFile(`${dir}/${tplName}`, tpl)
  })
  console.log(chalk.blue(`Successfully Generated Component: ${name}.`))
}

const generateComponent = async name => {
  const dir = `${getComponentDir(name)}`
  const files = [
    {
      name: 'index.js',
      path: `${__dirname}/../lib/templates/component/index.js.template`
    },
    {
      name: '%NAME%.js',
      path: `${__dirname}/../lib/templates/component/component.js.template`
    }
  ]
  return generate(dir, files, name)
}

const generateContainer = async name => {
  const dir = `${getComponentDir(name)}`
  const files = [
    {
      name: 'index.js',
      path: `${__dirname}/../lib/templates/container/index.js.template`
    },
    {
      name: '%NAME%.js',
      path: `${__dirname}/../lib/templates/container/component.js.template`
    },
    {
      name: '%NAME%Container.js',
      path: `${__dirname}/../lib/templates/container/container.js.template`
    }
  ]
  return generate(dir, files, name)
}

const generatePage = async name => {
  const dir = `${getPageDir(name)}`
  const files = [
    {
      name: 'index.js',
      path: `${__dirname}/../lib/templates/container/index.js.template`
    },
    {
      name: '%NAME%.js',
      path: `${__dirname}/../lib/templates/container/component.js.template`
    },
    {
      name: '%NAME%Container.js',
      path: `${__dirname}/../lib/templates/container/container.js.template`
    }
  ]
  return generate(dir, files, name)
}

const generateRedux = () => {}

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
const getPageDir = name => `${getPyroRoot()}/src/app/router/pages/${name}`
