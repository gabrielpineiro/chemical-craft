// Karma configuration
// Generated on Sun Mar 29 2015 20:00:48 GMT-0300 (Argentina Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'http://code.jquery.com/jquery-1.9.1.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular-mocks.js',
      '*.js',
      'tests/*.js'
      //'app/lib/angular/angular-*.js',
      //'app/js/**/*.js',
      //'test/lib/recaptcha/recaptcha_ajax.js',
      //'test/lib/angular/angular-mocks.js',
      //'test/unit/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      'server.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
