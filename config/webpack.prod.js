const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');

const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FastUglifyJsPlugin = require('fast-uglifyjs-plugin');

const generatorEntry = require('./generate.entry.js');
const commonConfig = require('./webpack.common.js');

const entry = generatorEntry('prod');
const sourceDir = 'http://ov9z0zlev.bkt.clouddn.com/';

const extractStyle = new ExtractTextPlugin({
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
          loader: 'babel-loader'
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
        use: extractStyle.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: extractStyle.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/,
        use: extractStyle.extract({
          fallback: "style-loader",
          use: ['css-loader', 'less-loader']
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
      fileName: '../../../weapp-manage/version.js.json',
      filter: function (file) {
        return /\.js/.test(file.name)
      }
    }),
    new ManifestPlugin({
      fileName: '../../../weapp-manage/version.css.json',
      filter: function (file) {
        return /\.css/.test(file.name)
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
    extractStyle,
  ],
});
