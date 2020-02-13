// run: nodemon server.js

const http = require('http');
const server = http.createServer();

server.on('request', require('./request.js'));
server.listen(1337);