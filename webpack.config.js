const path = require('path');
const pkg = require('./package');
const webpack = require('webpack');
const context = path.resolve(__dirname, "src");
const outputPath = path.resolve(__dirname, 'dist');

function getCurrentDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = ('00' + today.getMonth() + 1).slice(-2);
  var date = ('00' + today.getDate()).slice(-2);

  return `${year}-${month}-${date}`;
}

function getBanner() {
  return `/*! ${pkg.name} - ${pkg.version} - ` +
         `${getCurrentDate()} ` +
         `| (c) 2016 Chris Hafey | https://github.com/chafey/cornerstoneWADOImageLoader */`
}

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
  },
  plugins:[
    new webpack.BannerPlugin({
      banner: getBanner(),
      entryOnly: true,
      raw: true
    })
  ]
};
