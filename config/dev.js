const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sourceDir = 'dist/local/';

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/index/main.js'),
    app: path.resolve(__dirname, '../src/app/main.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/local')
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
    new CleanWebpackPlugin(['../dist/local']),
    new HtmlWebpackPlugin({
      filename: 'app.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index']
    }),
  ],
}