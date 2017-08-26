module.exports = function (env) {
  const config = require(`./${env}.js`);
  return config
}