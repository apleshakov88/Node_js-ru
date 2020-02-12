const http = require('http');
const logger = require('winston');
const log = logger.createLogger({
  transports: [
    new logger.transports.Console()
  ]
});

log.info('it works!!');

const server = http.createServer();
server.on('request', require('./winston-request'));

server.listen('1337');
log.info('server is running');

