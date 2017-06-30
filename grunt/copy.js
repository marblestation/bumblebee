'use strict';
/**
 * Options for the `jshint` grunt task
 *
 * @module grunt/jshint
 */
module.exports = function (grunt) {
  var path = require('path');
  var defaultJsRename = function (dest, src) {
    return path.join(dest, path.dirname(src), 'index.js');
  };
  return {
    libraries: {
      files: [
        // backbone
        {
          cwd: 'node_modules/backbone/',
          src: 'backbone.js',
          dest: 'src/libs/backbone',
          expand: true,
          rename: defaultJsRename
        },

        // backbone-validation
        {
          cwd: 'node_modules/backbone-validation/dist',
          src: 'backbone-validation-amd.js',
          dest: 'src/libs/backbone-validation',
          expand: true,
          rename: defaultJsRename
        },

        // backbone.babysitter
        {
          cwd: 'node_modules/backbone.babysitter/lib',
          src: 'backbone.babysitter.js',
          dest: 'src/libs/backbone.babysitter',
          expand: true,
          rename: defaultJsRename
        },

        // backbone.stickit
        {
          cwd: 'node_modules/backbone.stickit',
          src: 'backbone.stickit.js',
          dest: 'src/libs/backbone.stickit',
          expand: true,
          rename: defaultJsRename
        },

        // bootstrap-sass
        {
          cwd: 'node_modules/bootstrap-sass/assets/',
          src: [
            'javascripts/**/*',
            '!**/*.min.*',
            'fonts/**/*',
            'stylesheets/**/*'
            ],
          dest: 'src/libs/bootstrap-sass',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('bootstrap.js', 'index.js');
            src = src.replace('_bootstrap.scss', 'index.scss');
            return path.join(dest, src);
          }
        },

        // bourbon
        {
          cwd: 'node_modules/bourbon',
          src: 'index.js',
          dest: 'src/libs/bourbon',
          expand: true
        },

        // chai
        {
          cwd: 'node_modules/chai/lib',
          src: '**/*',
          dest: 'src/libs/chai',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('chai.js', 'index.js');
            return path.join(dest, src);
          }
        },

        // clipboard
        {
          cwd: 'node_modules/clipboard/dist',
          src: 'clipboard.js',
          dest: 'src/libs/clipboard',
          expand: true,
          rename: defaultJsRename
        },

        // d3
        {
          cwd: 'node_modules/d3/build',
          src: 'd3.js',
          dest: 'src/libs/d3',
          expand: true,
          rename: defaultJsRename
        },

        // d3-cloud
        {
          cwd: 'node_modules/d3-cloud',
          src: 'index.js',
          dest: 'src/libs/d3-cloud',
          expand: true
        },

        // dsjslib
        {
          cwd: 'node_modules/dsjslib/lib',
          src: '**/*.js',
          dest: 'src/libs/dsjslib',
          expand: true
        },

        // es5-shim
        {
          cwd: 'node_modules/es5-shim',
          src: 'es5-shim.js',
          dest: 'src/libs/es5-shim',
          expand: true,
          rename: defaultJsRename
        },

        // font-awesome-sass
        {
          cwd: 'node_modules/font-awesome-sass/assets',
          src: '**/*',
          dest: 'src/libs/font-awesome-sass',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('_font-awesome.scss', 'index.scss');
            return path.join(dest, src);
          }
        },

        // googleanalytics
        {
          cwd: 'node_modules/googleanalytics/lib',
          src: 'ga.js',
          dest: 'src/libs/googleanalytics',
          expand: true,
          rename: defaultJsRename
        },

        // jquery
        {
          cwd: 'node_modules/jquery/dist',
          src: 'jquery.js',
          dest: 'src/libs/jquery',
          expand: true,
          rename: defaultJsRename
        },

        // jqueryui
        {
          cwd: 'node_modules/jqueryui',
          src: ['jquery-ui.js', '*.css', '!*.min.*', 'images/*'],
          dest: 'src/libs/jqueryui',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('jquery-ui.js', 'index.js');
            src = src.replace('jquery-ui.css', 'index.css');
            return path.join(dest, src);
          }
        },

        // lodash
        {
          cwd: 'node_modules/lodash',
          src: 'lodash.js',
          dest: 'src/libs/lodash',
          expand: true,
          rename: defaultJsRename
        },

        // marionette
        {
          cwd: 'node_modules/marionette',
          src: 'index.js',
          dest: 'src/libs/marionette',
          expand: true
        },

        // mathjax
        {
          cwd: 'node_modules/marionette/unpacked',
          src: 'MathJax.js',
          dest: 'src/libs/marionette',
          expand: true,
          rename: defaultJsRename
        },

        // mocha
        {
          cwd: 'node_modules/mocha/lib',
          src: '**/*',
          dest: 'src/libs/mocha',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('mocha.js', 'index.js');
            return path.join(dest, src);
          }
        },

        // moment
        {
          cwd: 'node_modules/moment/src',
          src: [
            'moment.js',
            'lib/**/*',
            'local/en-*.js' // Only include `en-*` locales
          ],
          dest: 'src/libs/moment',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('moment.js', 'index.js');
            return path.join(dest, src);
          }
        },

        // persist-js
        {
          cwd: 'node_modules/persist-js/src',
          src: 'persist.js',
          dest: 'src/libs/persist-js',
          expand: true,
          rename: defaultJsRename
        },

        // prop-types
        {
          cwd: 'node_modules/prop-types',
          src: [
            'factory.js',
            'factoryWithTypeCheckers.js',
            'checkPropTypes.js',
            'lib/*.js'
          ],
          dest: 'src/libs/prop-types',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('factory.js', 'index.js');
            return path.join(dest, src);
          }
        },

        // react
        {
          cwd: 'node_modules/react/dist',
          src: 'react-with-addons.js',
          dest: 'src/libs/react',
          expand: true,
          rename: defaultJsRename
        },

        // react-backbone
        {
          cwd: 'node_modules/react-backbone',
          src: 'react-backbone.js',
          dest: 'src/libs/react-backbone',
          expand: true,
          rename: defaultJsRename
        },

        // react-dom
        {
          cwd: 'node_modules/react-dom/dist',
          src: 'react-dom.js',
          dest: 'src/libs/react-backbone',
          expand: true,
          rename: defaultJsRename
        },

        // react-redux
        {
          cwd: 'node_modules/react-redux/dist',
          src: 'react-redux.js',
          dest: 'src/libs/react-redux',
          expand: true,
          rename: defaultJsRename
        },

        // react-test-renderer
        {
          cwd: 'node_modules/react-test-renderer/lib',
          src: '*.js',
          dest: 'src/libs/react-test-renderer/',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('ReactTestRenderer.js', 'index.js');
            return path.join(dest, src);
          }
        },

        // react-test-renderer-shallow
        {
          cwd: 'node_modules/react-test-renderer/lib/shallow',
          src: '*.js',
          dest: 'src/libs/react-test-renderer-shallow/',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('ReactShallowRenderer.js', 'index.js');
            return path.join(dest, src);
          }
        },

        // recaptcha2
        {
          cwd: 'node_modules/recaptcha2',
          src: 'index.js',
          dest: 'src/libs/recaptcha2',
          expand: true
        },

        // redux
        {
          cwd: 'node_modules/redux/dist',
          src: 'redux.js',
          dest: 'src/libs/redux',
          expand: true,
          rename: defaultJsRename
        },

        // redux-thunk
        {
          cwd: 'node_modules/redux-thunk/dist',
          src: 'redux-thunk.js',
          dest: 'src/libs/redux-thunk',
          expand: true,
          rename: defaultJsRename
        },

        // require-handlebars-plugin
        {
          cwd: 'node_modules/require-handlebars-plugin',
          src: [
            'hbs.js',
            'hbs/handlebars.js',
            'hbs/json2.js',
            'hbs/underscore.js'
          ],
          dest: 'src/libs/require-handlebars-plugin',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('hbs.js', 'index.js');
            return path.join(dest, src);
          }
        },

        // requirejs
        {
          cwd: 'node_modules/requirejs',
          src: 'require.js',
          dest: 'src/libs/requirejs',
          expand: true,
          rename: defaultJsRename
        },

        // requirejs-babel
        {
          cwd: 'node_modules/requirejs-babel',
          src: 'es6.js',
          dest: 'src/libs/requirejs-babel',
          expand: true,
          rename: defaultJsRename
        },

        // select2
        {
          cwd: 'node_modules/select2/dist',
          src: ['js/select2.full.js', 'css/select2.css'],
          dest: 'src/libs/select2',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('select2.full.js', 'index.js');
            src = src.replace('select2.css', 'index.css');
            return path.join(dest, src);
          }
        },

        // sinon
        {
          cwd: 'node_modules/sinon/lib',
          src: '**/*',
          dest: 'src/libs/sinon',
          expand: true,
          rename: function (dest, src) {
            src = src.replace('sinon.js', 'index.js');
            return path.join(dest, src);
          }
        },

        // sprintf-js
        {
          cwd: 'node_modules/sprintf-js/src',
          src: 'sprintf.js',
          dest: 'src/libs/sprintf',
          expand: true,
          rename: defaultJsRename
        },

        // text
        {
          cwd: 'node_modules/text',
          src: 'text.js',
          dest: 'src/libs/text',
          expand: true,
          rename: defaultJsRename
        }
      ]
    },

    release: {
      files: [{
        expand: true,
        src: ['./src/**'],
        dest: 'dist/',
        rename: function(dest, src) {
          return dest + src.replace('/src/', '/');
        }
      }]
    },

    discovery_vars: {
      src: 'src/discovery.vars.js.default',
      dest: 'src/discovery.vars.js',
      filter: function () {
        // Only copy if over if it does not exist
        var dest = grunt.task.current.data.dest;
        return !grunt.file.exists(dest);
      }
    },

    keep_original: {
      files: [{
        expand: true,
        src: [
          './dist/index.html',
          'dist/discovery.config.js'
        ],
        dest: 'dist/',
        rename: function(dest, src) {
          var x = src.split('.');
          return x.slice(0, x.length-1).join('.') + '.original.' + x[x.length-1];
        }
      }]
    },

    foo: {
      files: [{
        src: ['./src/js/components/**/*.js'],
        dest: 'dist/',
        expand: true,
        rename: function(dest, src) {
          return dest + src.replace('/src/', '/');
        }
      }]
    },

    //give the concatenated file a cache busting hash
    bumblebee_app : {
      files : [{
        src: ['dist/bumblebee_app.js'],
        dest: 'dist/',
        expand: true,
        rename : function(dest, src){
          var gitDescribe = grunt.file.read('git-describe').trim();
          // find out what version of bbb we are going to assemble
          var tagInfo = gitDescribe.split('-');
          var version;
          if (tagInfo.length == 1) {
            version = tagInfo[0]; // the latest tag is also the latest commit (we'll use tagname v1.x.x)
          }
          else {
            version = tagInfo[2]; // use commit number instead of a tag
          }
          return 'dist/bumblebee_app.' + version + '.js';
        }

      }]
    }
  };
};
