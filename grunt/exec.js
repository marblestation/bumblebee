'use strict';
/**
 * Options for the `exec` grunt task
 *
 * @module grunt/exec
 */
module.exports = {
  latest_commit: {
    cmd: 'git rev-parse --short=7 --verify HEAD | cat > git-latest-commit'
  },
  latest_tag: {
    cmd: 'git describe --abbrev=0 | cat > git-latest-release-tag'
  },
  git_describe: {
    cmd: 'git describe | cat > git-describe'
  },
  npm_install: {
    cmd: 'npm install --no-package-lock --no-shrinkwrap'
  },
  convert_cache: {
    cmd: 'node node_modules/.bin/r.js -convert src/libs/cache src/libs/cache'
  }
};
