'use strict';
/**
 * Options for the `babel` grunt task
 *
 * @module grunt/babel
 */
module.exports = {
  libs: {
    options: {
      presets: ['babel-preset-es2015']
    },
    files: [{
      cwd: 'src/libs/moment',
      src: ['**/*.js'],
      dest: 'src/libs/moment',
      expand: true
    }]
  }
};
