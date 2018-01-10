const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const getEntry = require('./utils/getEntry.js');
const commonConfig = require('./webpack.common.js');
const extractStyle = require('./utils/extractStyle');

const sourceDir = 'dist/local/';
const contentBase = path.resolve(__dirname, '../dist/local');

module.exports = Merge(commonConfig, {
  entry: getEntry('prod'),
  output: {
    filename: '[name].js',
    path: contentBase
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    compress: true,
    port: 9000,
    index: path.resolve(__dirname, '../index.html')
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: extractStyle.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: sourceDir,
              outputPath: '../dist/local',
              useRelativePath: true,
              context: '../dist/local',
              name: '[path][name].[ext]'
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
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].js',
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity,
      filename: '[name].js'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    }),
    extractStyle,
  ],
});
