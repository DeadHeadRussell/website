const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const compileConfig = {
  entry: './src/public/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'compile.js'
  },
  target: 'node',
  externals: nodeExternals(),
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader'
    }]
  }
};

const clientConfig = {
  devtool: 'cheap-source-map',

  entry: './src/public/client.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }]
  }
};

module.exports = [compileConfig, clientConfig];

