'use strict';

let _ = require('lodash');
let fs = require('fs');
let bb = require('bluebird');
let watchman = require('fb-watchman');
let path = require('path');
let uuid = require('node-uuid').v4;
let childProcess = require('child_process');
let errors = require('./errors');
let through2 = require('through2');

let subs = {
  proj: uuid(),
  tests: uuid(),
  config: uuid()
};


function watchmanClient() {
  let client = new watchman.Client();
  return bb.promisifyAll(client);
}

function handleError(error){
  console.error('Error initiating watch:', error);
  console.error(error.stack);
  return;
}

function subscriptionSuccess(dir, resp){
  console.log(`\nsubscription established: ${resp.subscribe}\n\t- ${dir}`);
}

function shutdown(signal) {
  return function(){
    console.log(`recieved: [${signal}]`);
    process.exit();
  };
}

function subscribeToProcessSignals(signals, signalCb) {
  signals = signals || [
    'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGABRT', 'SIGTERM',
  ];
  signals.forEach(function(s){
    process.on(s, signalCb(s));
  });
}

function mapTestFiles(testDir) {
  return function(f) {
    return path.join(testDir, f.name);
  };
}

function listTestFiles(f){
  let exists = fs.existsSync(f);
  return `\n\t- ${f}: ${exists ? 'exists' : 'missing'}`;
}

function filterMissing(f) {
  return fs.existsSync(f);
}

function logPrefixer(f) {
  return through2(function(chunk, enc, next){
    next();
    // next(null, `[${f}]: ${chunk.toString()}`);
  });
}

function execute(command, f){
  let cp = childProcess.exec(command);
  cp.stdout
    //.pipe(logPrefixer(f))
    .pipe(process.stdout);

  cp.stderr
    // .pipe(logPrefixer(f))
    .pipe(process.stderr);
}

module.exports = function watch(config){
  let client = watchmanClient();
  let opts = config.module;

  if (!opts.query) {
    throw new Error(errors.missingQuery);
  }

  if (!opts.command) {
    throw new Error(errors.missingCommand);
  }

  opts.resTestDir = path.resolve(opts.testDir);

  // Initiate the watch

  let watchProj =client.commandAsync(['watch-project', opts.projectDir]);
  let watchTests = client.commandAsync(['watch-project', opts.resTestDir]);
  let watchConfig = client.commandAsync(['watch-project', config.dir]);
  let subProj = client.commandAsync(['subscribe', opts.projectDir, subs.proj, {
    expression: opts.query,
    fields: ['name', 'size', 'exists', 'type']
  }]);
  // .then(subscriptionSuccess.bind(null, opts.projectDir));

  let subTests = client.commandAsync(['subscribe', opts.resTestDir, subs.tests, {
    expression: opts.testQuery,
    fields: ['name', 'size', 'exists', 'type']
  }]);
  // .then(subscriptionSuccess.bind(null, opts.resTestDir));


  let subConfig = client.commandAsync(['subscribe', config.dir, subs.config, {
    expression: ['name', '.tachyon.js'],
    fields: ['name', 'size', 'exists', 'type']
  }]);
  // .then(subscriptionSuccess.bind(null, opts.resTestDir));

  Promise.all([
    watchProj,
    watchTests,
    watchConfig,
    subProj,
    subTests,
    subConfig
  ])
  .then(function(){
    console.log('\nwatching for file changes\n');
  })
  .catch(handleError);

  client.on('subscription', function (resp) {

    // never exec on start
    // watchman treats all files that match a query expr
    // to be new when it first initializes a subscription
    if (resp.is_fresh_instance) {
      return;
    }

    // reload the configuration
    if (resp.subscription === subs.config) {
      console.log('reloading configuration');
      client.removeAllListeners();
      client.end();
      config.reload();
      console.log(JSON.stringify(config.module));
      watch(config);
      return;
    }

    let numChanged = resp.files.length;
    let list = resp.files.map(mapTestFiles(opts.testDir));
    // console.log(resp);
    console.log(`${numChanged} file(s) changed`);
    console.log(`relative test files ${list.map(listTestFiles).join('')}\n`);

    list = _.filter(list, filterMissing);


    if (!list.length) {
      console.log('no test files to execute');
      return;
    }

    let f = list.join(' ');
    let cmd = `${opts.command} ${f}`;
    console.log(`executing ${cmd}`);
    execute(cmd, f);
    // list.forEach(function(f){
    //   let cmd = `${opts.command} ${f}`;
    //   console.log(`executing ${cmd}`);
    //   execute(cmd, f);
    // });
  });
};


subscribeToProcessSignals(null, shutdown);