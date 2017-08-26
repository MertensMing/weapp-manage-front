module.exports = function (env) {
  const config = require(`./${env}.js`);
  return config
}
function generatorEntry() {
  var entry = {};

  var jsRootPath = __dirname + '/js';
  var files = glob.sync(path.join(jsRootPath, '**/main.+(js|jsx)'));
  files.forEach(function(file) {
      var fileBasePath = file.replace('/main.js', '');
      var folderName = path.relative(jsRootPath, fileBasePath) || path.basename(fileBasePath);

      entry[folderName] = file.replace(__dirname, '.').replace('.js', '').replace('.jsx', '');
  });

  return entry;
}