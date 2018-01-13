const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const getEntry = require('./utils/getEntry.js');
const commonConfig = require('./webpack.common.js');

const DEV_PORT = 8080;
const MOCK_PORT = 9090;
const NODE_ENV = 'dev';

const extractStyle = new ExtractTextPlugin({
  filename (getPath) {
    return getPath('style/[name].css');
  },
  allChunks: true
});

module.exports = Merge(commonConfig(), {
  entry: getEntry(NODE_ENV),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist/local')
  },
  devServer: {
    index: path.resolve(__dirname, '../index.html'),
    contentBase: path.resolve(__dirname, '../'),
    port: DEV_PORT,
    proxy: {
      '/api/*': {
        target: `http://localhost:${MOCK_PORT}`,
        secure: false
      },
    },
    compress: false,
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractStyle.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: extractStyle.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
            publicPath: `http://localhost:${DEV_PORT}/`
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist/local', {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].js',
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
      filename: '[name].js'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    extractStyle,
  ],
});
