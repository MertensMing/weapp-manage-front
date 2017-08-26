const glob = require('glob');
const path = require('path');
function generatorEntry() {
  const entry = {};
  const rootDir = path.resolve(__dirname, '../src');
  const files = glob.sync(`${rootDir}/**/main.js`);
  files.forEach((filePath) => {
    const dir = __dirname.replace('/config', '');
    const entryName = filePath.replace(dir, '').replace('/src/', '').replace('/main.js', '');
    console.log(entryName)
    entry[entryName] = filePath;
  });
  return entry;
}
const entry = generatorEntry();

module.exports = function (env) {
  let config = require(`./${env}.js`);
  config = Object.assign(config, {
    entry
  });
  return config
}