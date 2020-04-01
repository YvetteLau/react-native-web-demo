'use strict';

const path = require('path');
const webpack = require('webpack');
const config = require('./config')[process.env.NODE_ENV === 'development' ? 'dev' : 'build'];
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, '../', dir);
}

const baseWebpackConfig = {
  context: path.resolve(__dirname, '..'),
  entry: [
    require.resolve('./polyfills'),
    resolve(config.entry)
  ],
  output: {
    path: resolve(config.assetsRoot),
    filename: '[name].[hash:6].js',
    publicPath: config.publicPath
  },
  optimization: {
    concatenateModules: false,
    splitChunks: {
      maxInitialRequests: 6,
      cacheGroups: {
        'vendor': {
          priority: 1,
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 100,
          minChunks: 1 
        }
      }
    },
    runtimeChunk: {
      name: 'mainifest'
    },
  },
  resolve: {
    extensions: ['.js', '.web.js', '.jsx', '.json'],
    mainFields: ["module","client", "main"],
    modules: [
      resolve(config.src),
      'node_modules'
    ],
    alias: {
      'react-native': 'react-native-web',
      'ReactNativeART': 'react-art',
      // 'react': resolve('node_modules/react-native-web/react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['thread-loader', 'cache-loader', {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['module:metro-react-native-babel-preset', '@babel/preset-env'],
            env: {
              development: {
                plugins: [
                  [
                    "@babel/plugin-transform-runtime", {
                      "corejs": 3
                    }
                  ],
                  "@babel/plugin-syntax-dynamic-import",
                  "@babel/plugin-transform-modules-commonjs",
                  ["@babel/plugin-proposal-decorators", { "legacy": true }],
                  ["@babel/plugin-proposal-class-properties", { "loose": true }]
                ]
              },
              production: {
                plugins: [
                  [
                    "@babel/plugin-transform-runtime", {
                      "corejs": 3
                    }
                  ],
                  "@babel/plugin-syntax-dynamic-import",
                  "@babel/plugin-transform-modules-commonjs",
                  ["@babel/plugin-proposal-decorators", { "legacy": true }],
                  ["@babel/plugin-proposal-class-properties", { "loose": true }],
                  "transform-remove-console"
                ]
              }
            }
          },
        }],
        include: [
          resolve(config.src),
          resolve('node_modules/react-native-web'),
        ],
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: [{
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 8192 //8K
          },
        }],
        include: [
          resolve(config.src)
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')({
                    overrideBrowserslist: ['> 0.25%', 'not dead'],
                  })
                ]
              }
            }
          },
        ],
        include: [
          resolve(config.src)
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      hash: true,
      template: path.join(__dirname, 'index.tpl.vm'),
      config: config.template,
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**']
    }),
    new HardSourceWebpackPlugin()
  ]
}


module.exports = baseWebpackConfig;
