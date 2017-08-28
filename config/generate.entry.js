const glob = require('glob');
const path = require('path');

function generatorEntry(env) {
  const entry = {};
  const rootDir = path.resolve(__dirname, '../src');
  const files = glob.sync(`${rootDir}/**/main.js`);
  files.forEach((filePath) => {
    const dir = __dirname.replace('/config', '');
    const entryName = filePath.replace(dir, '').replace('/src/', '').replace('/main.js', '');
    entry[entryName] = [`webpack-hot-middleware/client?reload=true`, filePath];
    if (env === 'prod') {
      entry[entryName] = filePath;
    }
  });
  return entry;
}

module.exports = generatorEntry;