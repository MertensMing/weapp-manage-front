const path = require('path');

module.exports = () => {
  const commonConfig = {
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss'],
      modules: [path.join(__dirname, '../src'), path.join(__dirname, '../node_modules')],
      alias: {
        '@': path.resolve(__dirname, '../src'),
        'style': path.resolve(__dirname, '../src/style'),
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
      ]
    },
  }
  return commonConfig;
}