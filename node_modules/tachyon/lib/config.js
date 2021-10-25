'use strict';

let _ = require('lodash');
let expandPath = require('./expandPath');
let path = require('path');
let loadFailure = `
  Failed to load configuration file
   - you may need to run \`tachyon init\`
   - or the path you specified was incorrect
`;

class TachyonConfig {
  constructor(filePath){
    this.path = expandPath(filePath);
    this.dir = path.dirname(this.path);
    this.load();
  }

  load(){
    try {
      this.module = _.defaults(require(this.path), {
        projectDir: expandPath(process.cwd()),
        testDir: './tests'
      });
      console.log(`loaded config from: ${this.path}`);
    } catch(e) {
      console.error('failed to load config', this.path);
      console.error(loadFailure);
      process.exit(1);
    }
  }

  reload(){
    delete require.cache[this.path];
    this.load();
  }
}


module.exports = TachyonConfig;