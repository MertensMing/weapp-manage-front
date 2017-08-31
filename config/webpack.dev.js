const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');

// 插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const generatorEntry = require('./generate.entry.js');
const commonConfig = require('./webpack.common.js');

const sourceDir = 'dist/local/';

const entry = generatorEntry('prod');
const entryKeys = Object.keys(entry);

const extractSCSS = new ExtractTextPlugin({
  filename (getPath) {
    return getPath('style/[name].css');
  },
  allChunks: true
});

module.exports = Merge(commonConfig, {
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/local')
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
    ...generateHtml(entryKeys),
    extractSCSS,
  ],
});

function generateHtml (keys) {
  const arr = [];
  keys.forEach(key => {
    arr.push(new HtmlWebpackPlugin({
      filename: `${key}.html`,
      chunks: [key],
      template: './config/template.html'
    }))
  })
  return arr;
}