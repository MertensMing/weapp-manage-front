const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const sourceDir = 'http://ov8hx9jya.bkt.clouddn.com/';
module.exports = {
  entry: {
    'index/main': path.resolve(__dirname, '../src/index/main.js'),
    'app/main': path.resolve(__dirname, '../src/app/main.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist/build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: sourceDir,
              name: '[path][name]_[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: sourceDir,
              name: '[path][name]_[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./local']),
    new ManifestPlugin({
      fileName: '../../version.json',
      publicPath: sourceDir,
      filter: function (file) {
        if (file.name.indexOf('.js') !== -1) {
          return true
        }
        return false
      }
    })
  ],
}