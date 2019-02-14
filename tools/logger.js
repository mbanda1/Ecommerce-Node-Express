const winston = require('winston');
const config = winston.config;
const logger = winston.createLogger ({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        return new Date().toISOString();
      },
      formatter: function(options) {
        return options.timestamp() + ' ' +
          config.colorize(options.level, options.level.toUpperCase()) + ' ' +
          (options.message ? options.message : '') +
          config.colorize(options.level,(options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' ));
      },
      prettyPrint: true
    })
  ]
});
winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  debug: 'green'
});

const logPlacer = (mess,level)=>{
  if(process.env.NODE_ENV!=='test' && logger[level])logger[level](mess)
  else if(process.env.NODE_ENV!=='test') logger.info(mess)
};

module.exports = {
  error: (mess) => {
    logPlacer({ mess: mess, worker: { pid: process.pid } },'error');
  },
  warn: (mess) => {
    logPlacer({ mess: mess, worker: { pid: process.pid } },'warn');
  },
  success: (mess) => {
    logger.info({ mess: mess, worker: { pid: process.pid } });
  },
  system: (mess) => {
    logPlacer({ mess: mess, worker: { pid: process.pid } },'system');
  },
  fail: (mess) => {
    logPlacer({ mess: mess, worker: { pid: process.pid } },'fail');
  },
  internal: (mess) => {
    logPlacer({ mess: mess, worker: { pid: process.pid } },'internal');
  },
  info: (mess) => {
    logPlacer({ mess: mess, worker: { pid: process.pid } }, 'info');
  },
  verb: (mess) => {
    logPlacer({ mess: mess, worker: { pid: process.pid } },'verb');
  },
  debug: (mess) => {
    logPlacer({ mess: mess, worker: { pid: process.pid } },'debug');
  },
  status: (mess) => {
    logPlacer({ mess: mess, worker: { pid: process.pid } },'status');
  },
  timeout: (mess) => {
    logPlacer({ mess: mess, worker: { pid: process.pid } },'timeout');
  },
  sql: (mess) => {
    logPlacer({ mess: mess, worker: { pid: process.pid } },'sql');
  },
  db: (mess) => {
    logger.info({ task:mess.task || 'unspcified', query:mess.query, mess: mess.mess, worker: { pid: process.pid } }, 'db');
  }
}
