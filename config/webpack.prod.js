const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FastUglifyJsPlugin = require('fast-uglifyjs-plugin');

const generatorEntry = require('./generate.entry.js');
const commonConfig = require('./webpack.common.js');

const entry = generatorEntry('prod');
const sourceDir = 'http://ov9z0zlev.bkt.clouddn.com/';

const extractSCSS = new ExtractTextPlugin({
  filename (getPath) {
    return getPath('style/[name].[contenthash].css');
  },
  allChunks: true
});

module.exports = Merge(commonConfig, {
  entry,
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist/build')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.css$/,
        use: extractSCSS.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: extractSCSS.extract({
          fallback: "style-loader",
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
              name: '[path][name].[hash:6].[ext]'
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
              name: '[path][name].[hash:6].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebpackPlugin(['./dist/build'], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[hash].js',
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity,
      filename: '[name].[hash].js'
    }),
    new ManifestPlugin({
      fileName: '../../version.json',
      publicPath: sourceDir,
      filter: function (file) {
        return /\.js|\.css/.test(file.name)
      }
    }),
    new FastUglifyJsPlugin({
      compress: {
          warnings: false
      },
      debug: true,
      cache: false,
      cacheFolder: path.resolve(__dirname, '.'),
      workerNum: 20
    }),
    extractSCSS,
  ],
});
