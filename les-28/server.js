const http = require('http');
const fs = require('fs');

const handler = (req, res) => {
  if (req.url === '/') {
    fs.readFile('no-file', (err, fileData) => {
      if (err) throw err;

      res.end(fileData);
    });
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
};

const server = http.createServer(handler);

module.exports = server;