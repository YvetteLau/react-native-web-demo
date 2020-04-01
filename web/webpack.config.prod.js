'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const prodConfig = merge({}, baseWebpackConfig, {
  devtool: '#source-map',
  performance: {
    hints: 'warning', 
    maxAssetSize: 409600, 
    maxEntrypointSize: 15360000, 
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
      '__DEV__': false
    }),
  ]
})
module.exports = prodConfig;