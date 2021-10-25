'use strict';

let missingQuery = `
  must provide a watchman query in your configuration

    Example:
      {
        query: [
          'allof',
            ['match', '*.js']
        ]
      }


    checkout the docs: https://facebook.github.io/watchman/docs/expr/allof.html
`;

let missingCommand = `
  You must provide a 'command' option in your config
    Example
      {
        command: 'ls -lha'
      }

    in this case 'ls -lha' will be past a list of files that changed
`;


module.exports = {
  missingCommand,
  missingQuery
};