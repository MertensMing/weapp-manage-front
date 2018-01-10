const glob = require('glob')
const path = require('path')

function getEntry(env) {
  const entry = {}
  const rootDir = path.resolve(__dirname, '../../src')
  const files = glob.sync(`${rootDir}/**/main.js`)
  files.forEach((filePath) => {
    const dir = __dirname.replace('/config/utils', '')
    const srcPath = filePath.replace(dir, '').replace('/src/', '')
    let entryName = srcPath.replace('/main.js', '')
    if (entryName === 'main.js') {
      entryName = 'main'
    }
    entry[entryName] = [`webpack-hot-middleware/client?reload=true`, filePath]
    if (env === 'prod') {
      entry[entryName] = filePath
    }
  })
  return entry
}

module.exports = getEntry