'use strict';

let path = require('path');

module.exports = function(filePath) {
  let expanded;
  let isWin32  = process.env.platform === 'win32';
  let localPath = isWin32 ? path.win32 : path.posix;
  let pathKey  = isWin32 ? 'USERPROFILE' : 'HOME';
  let HOME     = process.env[pathKey];

  if (filePath.indexOf('~') === 0) {
    expanded = true;
    filePath = filePath.replace('~', HOME);
  }

  return expanded ? localPath.normalize(filePath) : localPath.resolve(filePath);
};