// run: nodemon server-timer.js

const http = require('http');

const server = http.createServer();
server.on('request', require('./request'));

server.listen('1337');

setTimeout(() => {
  //clearInterval(timer); // You can't stop the server while libUV is active SET_INTERVAL
  server.close(() => {
    process.exit(); // exit process will stop interval and anything else
  });
}, 2500);

const timer = setInterval(() => {
  console.log('memory usage >>> \n', JSON.stringify(process.memoryUsage()));
}, 1000)

