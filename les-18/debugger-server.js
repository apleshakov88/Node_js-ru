// run: node debug debugger-server.js


const http = require('http');
const url = require('url');

const server = http.createServer();
server.on('request', (req, res) => {
  const { method, url: reqUrl } = req; 
  const { query, pathname } = url.parse(reqUrl, true);
  debugger;
  
  if (method === 'GET' && pathname === '/echo' && query.message) {
    res.setHeader('Cache-control', 'no-cache'); // write header at nearest write command --- res.end
    res.end(`${query.message} >>> ${Math.random()}`);
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});

server.listen('1337');
console.log('>>> server is running');

