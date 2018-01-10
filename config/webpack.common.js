const path = require('path');
const extractStyle = require('./utils/extractStyle');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss'],
    modules: [path.join(__dirname, '../src'), path.join(__dirname, '../node_modules')],
    alias: {
      assets: path.resolve(__dirname, '../assets'),
      request: path.resolve(__dirname, '../src/app/common/utils/request'),
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: extractStyle.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
    ]
  },
}