const http = require('http');
const fs = require('fs');

const server = http.createServer();
server.on('request', require('./request'));

server.listen('1337');

setTimeout(() => {
  server.close();
}, 2500);


const timer = setInterval(() => {
  console.log('memory usage >>> \n', JSON.stringify(process.memoryUsage()));
}, 1000);

timer.unref();
// timer.ref(); // cancel unref



fs.open(__filename, 'r', (err, file) => {
  console.log('IO ! >>>');
});

// as soon as possible, but after TaskQueue
setImmediate(() => {
  console.log('immediate >>>');
});

// after call stack empty, before TaskQueue (I/O events, timers... like promise microtask)
process.nextTick(() => {
  console.log('next tick >>>');
});

