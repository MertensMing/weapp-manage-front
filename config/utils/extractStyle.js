const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractStyle = new ExtractTextPlugin({
  filename (getPath) {
    return getPath('style/[name].css');
  },
  allChunks: true
});

module.exports = extractStyle;