/**
 * pyro deploy
 * 
 * uses firebase tools and create-react-app build process to push things to firebase
 */
const exec = require('child_process').exec
const admin = require('firebase-admin')
const tools = require('firebase-tools')
const chalk = require('chalk')
const utils = require('../lib/utils')

module.exports = program => {
  program
    .command('deploy')
    .description('deploy a pyro app')
    .action(() => {
      console.log(chalk.blue(`Deploying pyro project...`))

      deploy()
        .then(() => {
          console.log(chalk.blue('Finished deploying your project.'))
        })
        .catch(err => {
          console.error(chalk.bold.red('Pyro Error: Could not deploy project'))
          console.error(err)
        })
    })
}

const deploy = async () => {
  //await buildApp()
  await uploadAssets()
  //await deployFirebaseHosting()
}

/**100
 * Builds the app (create-react-app npm run build)
 */
const buildApp = () =>
  new Promise((resolve, reject) => {
    exec(`npm run build`, err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })

/**
 * Uploads files in assets to the Google cloud bucket
 */
const uploadAssets = async () => {
  const bucket = admin.storage().bucket()

  const assets = await fs.readDir(utils.getAssetsPath())

  return Promise.all(assets.map(assetPath => uploadAsset(bucket, assetPath)))
}

const uploadAsset = (bucket, assetPath) => {
  console.log(chalk.blue(`Uploading: ${assetPath}`))
  return bucket
    .upload(assetPath)
    .then(() => {
      console.log(chalk.blue(`Uploading: ${assetPath}`))
    })
    .catch(err => {
      console.log(chalk.red(`Pyro Error: Could not upload asset ${assetPath}.`))
      console.log(err)
    })
}

/**
 * deploys the app to firebase hosting
 */
const deployFirebaseHosting = () => {
  return tools.deploy({
    project: '',
    token: process.env.FIREBASE_TOKEN,
    cwd: utils.getPyroRoot()
  })
}
