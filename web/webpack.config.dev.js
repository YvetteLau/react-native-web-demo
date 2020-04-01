'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
var config = require('./config').dev;

function resolve(dir) {
  return path.resolve(__dirname, '../', dir);
}
const devConfig = merge({}, baseWebpackConfig, {
  devtool: '#source-map',
  mode: 'development',
  devServer: {
    port: config.port,
    contentBase: resolve(config.assetsRoot)
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('development'),
      '__DEV__': true
    })
  ],
})

module.exports = devConfig;
