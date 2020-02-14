// run: $env:DEBUG='*';node debug-server.js

const http = require('http');
const debug = require('debug')('[DEBUG SERVER] >>> ');

const server = http.createServer();
server.on('request', require('./debug-request'));

server.listen('1337');
debug('server is running');

