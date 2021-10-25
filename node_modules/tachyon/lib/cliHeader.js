var fs = require('fs');
var path = require('path');
var headerFile = path.join(__dirname, 'cliHeader.txt');
module.exports = fs.readFileSync(headerFile, 'utf8');