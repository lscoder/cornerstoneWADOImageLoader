const webpackConfig = require('../webpack.config.js');

// Deleting output.library to avoid "Uncaught SyntaxError: Unexpected token /" error
// when running testes (var test/foo_test.js = ...)
delete webpackConfig.output.library;

module.exports = {
  basePath: '../',
  frameworks: ['mocha'],
  reporters: ['progress'],
  files: [
    'test/*_test.js',
    'test/**/*_test.js'
  ],

  plugins: [
    'karma-webpack',
    'karma-mocha',
    'karma-phantomjs-launcher',
    'karma-chrome-launcher',
    'karma-firefox-launcher'
  ],

  preprocessors: {
    'src/**/*.js': ['webpack'],
    'test/**/*_test.js': ['webpack']
  },

  webpack: webpackConfig,

  webpackMiddleware: {
    noInfo: false,
    stats: {
      chunks: false,
      timings: false,
      errorDetails: true
    }
  }
};