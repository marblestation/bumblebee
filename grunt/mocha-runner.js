'use strict';
/**
 * Creates the phantomjs and mocha test runner
 *
 * @module grunt/mocha-runner
 */
module.exports = function (grunt) {

  var _ = require('lodash');
  var async = require('async');
  var spawn = require('child_process').spawn;

  grunt.registerMultiTask('mocha-runner', 'find and run tests', function () {
    var done = this.async();

    // create the options object
    var options = this.options({
      urls: [
        'http://localhost:8000/test/mocha/tests.html'
      ],
      suites: ['discovery'],
      pathToPhantomJsBin: 'node_modules/.bin/phantomjs',
      pathToMochaPhantomJsCoreBin: 'node_modules/mocha-phantomjs-core/mocha-phantomjs-core.js',
      reporter: 'spec'
    });

    // support grepping for tests, this is passed to mocha
    var grep = grunt.option('grep');
    if (grep) {
      _.merge({}, options.args, { grep: grep });
    }

    // stringify the args passed in as options
    if (options.args) {
      options.args = JSON.stringify(options.args);
    }

    // check for single suite name
    if (typeof options.suites === 'string') {
      options.suites = [options.suites];
    }

    // populate all the urls with all the suites
    var initUrls = options.urls.splice(0);
    options.suites.forEach(function (suite) {
      var newUrls = initUrls.map(function (url) {
        return url + '?bbbSuite=' + suite;
      });
      options.urls = options.urls.concat(newUrls);
    });

    // populate any extra params over all the urls
    if (options.urlParams) {
      var extraParams = _.map(options.urlParams, function (v, k) {
        return { key: k, value: v };
      });
      options.urls = options.urls.map(function (url) {
        return _.reduce(extraParams, function (u, param) {
          return u += '&' + param.key + '=' + param.value;
        }, url);
      });
    }

    // no errors to begin with
    var errors = 0;

    // create and spawn a new command child process that will run the tests
    var spawnTest = function (url, next) {

      // create array of arguments to be passed to the runner
      var args = _.flatten([
        options.pathToMochaPhantomJsCoreBin,
        url,
        options.reporter,
        options.args
      ]);

      // create a new phantomjs command
      var cmd = spawn(options.pathToPhantomJsBin, args);

      // handle the outputting to the stdout/stderr/etc.
      cmd.stdout.on('data', function(out) {
        grunt.log.write(out);
      });
      cmd.stderr.on('data', function(err) {
        grunt.log.write(err);
      });

      // on close add the error code to keep track of number of failures
      cmd.on('close', function(code) {
        errors += code;
        next();
      });
    };

    // spawn a new test for each url, output total failures
    async.eachSeries(options.urls, spawnTest, function () {
      if (errors > 0) {
        grunt.fail.warn(errors + ' tests failed :(\n');
      } else if (errors === 0) {
        grunt.log.writeln(errors + ' tests failed :)\n');
      }
      done();
    });
  });

  return {
    options: {
      args: {
        ignoreResourceErrors: true,
        timeout: 10000
      }
    },
    all: {
      options: {
        suites: ['discovery']
      }
    }
  };
};
