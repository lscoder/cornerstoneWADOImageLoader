const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
const context = path.resolve(__dirname, "src");

module.exports = {
  context: context,
  entry: {
    cornerstoneWADOImageLoader: './imageLoader/index.js'
  },
  target: 'web',
  output: {
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'var',
    path: outputPath
  },
  devtool: 'source-map',
  externals: {
    jquery: {
      root: '$'
    }
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'eslint-loader',
      options: {
        failOnError: true
      }
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader'
      }]
    }]
  }
};
