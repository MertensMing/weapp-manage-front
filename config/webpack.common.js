const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.vue', '.scss'],
    modules: [path.join(__dirname, '../src'), path.join(__dirname, '../node_modules')],
    alias: {
      assets: path.resolve(__dirname, '../assets')
    }
  },
}