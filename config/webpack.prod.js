const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const getEntry = require('./utils/getEntry');
const commonConfig = require('./webpack.common');

const PUBLIC_PATH = 'http://ov9z0zlev.bkt.clouddn.com/';
const NODE_ENV = 'production';

const extractStyle = new ExtractTextPlugin({
  filename (getPath) {
    return getPath('style/[name].[contenthash].css');
  },
  allChunks: true
});

module.exports = Merge(commonConfig(NODE_ENV), {
  entry: getEntry(NODE_ENV),
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].bundle.[hash].js',
    path: path.resolve(__dirname, '../dist/build'),
    publicPath: PUBLIC_PATH
  },
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
            name: 'assets/[hash].[ext]',
            publicPath: PUBLIC_PATH,
          }
        }]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist/build', {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[hash].js',
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
      filename: '[name].[hash].js'
    }),
    new ManifestPlugin({
      fileName: '../../resource/version.js.json',
      filter(file) {
        return /\.js/.test(file.name)
      }
    }),
    new ManifestPlugin({
      fileName: '../../resource/version.css.json',
      filter(file) {
        return /\.css/.test(file.name)
      }
    }),
    new UglifyJsPlugin({
      cache: true,
      parallel: true
    }),
    extractStyle,
  ],
});
