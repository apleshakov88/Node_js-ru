// to run: nodemon server --port=1337 OR nodemon server -port 1337

const http = require('http');
const fs = require('fs');
const argv = require('optimist').argv;

console.log('>>> ', process.argv); // You can parse needed params frmo array. But also you can use optimist NPM
console.log('>>> optimist port >>>', argv.port)

// also you can use NODE_ENV to pass params

const handler = (req, res) => {
  if (req.url === '/') {
    fs.readFile(__filename, (err, fileData) => {
      if (err) throw err;

      res.end(fileData);
    });
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
};

const server = http.createServer(handler);

server.listen(argv.port || 3000);

module.exports = server;