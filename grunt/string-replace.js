'use strict';
/**
 * Options for the `string-replace` grunt task
 *
 * For changing the name of the data-main file in dist/index
 *
 * @module grunt/string-replace
 */
module.exports = {
  dist: {
    files: [{
      src: 'dist/index.html',
      dest: 'dist/index.html'
    }],
    options: {
      replacements: [{
        pattern: 'data-main="./discovery.config"',
        replacement: 'data-main="./bumblebee_app.js"'
      }]
    }
  },
  d3_cloud: {
    files: [{
      src: 'src/libs/d3-cloud/main.js',
      dest: 'src/libs/d3-cloud/main.js'
    }],
    options: {
      replacements: [{
        pattern: 'require("d3-dispatch")',
        replacement: 'require("d3")'
      }]
    }
  }
};
