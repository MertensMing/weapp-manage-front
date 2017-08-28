const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');

// 插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const generatorEntry = require('./generate.entry.js');
const commonConfig = require('./webpack.common.js');

const sourceDir = 'dist/local/';

const entry = generatorEntry('prod');
const entryKeys = Object.keys(entry);

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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    }),
    ...generateHtml(entryKeys),
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