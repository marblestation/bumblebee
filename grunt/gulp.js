'use strict';
/**
 * Options for the `gulp` grunt task
 *
 * @module grunt/gulp
 */
module.exports = {
  generateSW : function() {
    const workboxBuild = require('workbox-build');
    return workboxBuild.generateSW({
        globDirectory: './dist',
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        cacheId: 'bumblebee',
        globIgnores: ['shim.js'],
        globPatterns: [
          'styles/css/**/*',
          'styles/img/*'
        ],
        swDest: './dist/sw.js'
    });
  }
};
