const path = require('path');
const webpack = require('webpack');
const rootPath = process.env.PWD;
const context = path.resolve(rootPath, 'src');
const outputPath = path.resolve(rootPath, 'dist');
const bannerPlugin = require('./plugins/banner');
const codecsPath = path.resolve(rootPath, 'codecs');
const codecFiles = {
  charLS: path.resolve(codecsPath, 'charLS-FixedMemory-browser.js'),
  jpeg: path.resolve(codecsPath, 'jpeg.js'),
  jpegLossless: path.resolve(codecsPath, 'jpegLossless.js'),
  jpx: path.resolve(codecsPath, 'jpx.min.js'),
  openJPEG: path.resolve(codecsPath, 'openJPEG-FixedMemory.js'),
  pako: path.resolve(codecsPath, 'pako.min.js')
}

module.exports = {
  context: context,
  entry: {
    cornerstoneWADOImageLoader: './imageLoader/index.js',
    cornerstoneWADOImageLoaderWebWorker: './webWorker/index.js',
    // cornerstoneWADOImageLoaderCodecs: ['charLS', 'jpeg', 'jpegLossless', 'jpx', 'openJPEG', 'pako']
  },
  target: 'web',
  output: {
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'var',
    path: outputPath
  },
  resolve: {
    alias: {
      charLS: codecFiles.charLS,
      jpeg: codecFiles.jpeg,
      jpegLossless: codecFiles.jpegLossless,
      jpx: codecFiles.jpx,
      openJPEG: codecFiles.openJPEG,
      pako: codecFiles.pako
    }
  },
  devtool: 'source-map',
  externals: {
    jquery: 'jQuery',
    // charLS: 'CharLS',
    // jpeg: 'JpegImage',
    // jpegLossless: 'jpeg',
    // jpx: 'JpxImage',
    // openJPEG: 'OpenJPEG',
    // pako: 'pako'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components|codecs)/,
        loader: 'eslint-loader',
        options: {
          failOnError: true
        }
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }, {
        test: /[\/\\]codecs[\/\\]charLS-FixedMemory-browser\.js$/,
        use: [{
          loader: 'imports-loader?this=>self'
        }, {
          loader: 'exports-loader?CharLS'
        }],
      }, {
        test: /[\/\\]codecs[\/\\]jpeg\.js$/,
        use: 'exports-loader?JpegImage'
      }, {
        test: /[\/\\]codecs[\/\\]jpx\.min\.js$/,
        use: [{
          loader: 'imports-loader?this=>self'
        }, {
          loader: 'exports-loader?JpxImage=JpxImage'
        }]
      }, {
        test: /[\/\\]codecs[\/\\]openJPEG-FixedMemory\.js$/,
        use: 'exports-loader?OpenJPEG'
      }
    ]
  },
  plugins: [
    bannerPlugin(),

    // 01) Split the code correctly but adds a `webpackJsonp_name_` call at the beginning
    // of `cornerstoneWADOImageLoader` and `cornerstoneWADOImageLoaderWebWorker`
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['cornerstoneWADOImageLoaderWebWorker', 'cornerstoneWADOImageLoaderCodecs'],
    //   // minChunks: Infinity, // doesn't affect the result
    //   // async: false  // doesn't affect the result
    // })

    // 02) Same as before
    // In this case `cornerstoneWADOImageLoaderCodecs` entry point must be removed from config
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'cornerstoneWADOImageLoaderCodecs',
    //     // filename: 'node-static.js',
    //     minChunks(module, count) {
    //         var context = module.context;
    //         return context && context.indexOf('codecs') >= 0;
    //     },
    // }),

    // 03) Removes the `webpackJsonp_name_` call but adds all codecs code to
    // `cornerstoneWADOImageLoaderWebWorker`
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['cornerstoneWADOImageLoaderWebWorker', 'cornerstoneWADOImageLoaderCodecs'],
    //   children: true,
    //   async: false
    // })
  ],
  node: {
    fs: 'empty'
  }
}