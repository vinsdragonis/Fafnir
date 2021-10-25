module.exports = {
  query: [
    'allof',
      ['match', '*.js'],

      [
        'not',
          ['dirname', 'node_modules']
      ],

      [
        'not',
          ['dirname', 'tests']
      ]
  ],
  testQuery: [
    'allof',
      ['match', '*.js']
  ],
  command: 'mocha',
  testDir: './tests',
  disableExecOnStart: true
};