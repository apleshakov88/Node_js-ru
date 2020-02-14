// run: nodemon server.js

const http = require('http');
const getCurrentDate = require('./current-date');

const server = http.createServer();
server.on('request', require('./request'));
console.log('getCurrentDate >>>>>>>>>', getCurrentDate())

server.listen('1337');

