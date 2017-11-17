const assertPyroRoot = () => {
  try {
    const config = require(`${process.cwd()}/.pyrorc`)
  } catch (e) {
    console.log(
      chalk.bold.red('Pyro Error: Must be run from the root of a pyro project')
    )
    process.exit()
  }
}

const getPyroRoot = `${process.cwd()}`
const getAssetsDir = `${getPyroRoot()}/public/assets`

module.exports = {
  getAssetsPath,
  getPyroRoot,
  assertPyroRoot
}
