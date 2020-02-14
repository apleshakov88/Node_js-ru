// just use https://medium.com/nuances-of-programming/%D0%BE%D1%82%D0%BB%D0%B0%D0%B4%D0%BA%D0%B0-node-js-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-google-chrome-e4e8ecf9305e
// + https://nodejs.org/de/docs/guides/debugging-getting-started/

const http = require('http');
const url = require('url');

const server = http.createServer();
server.on('request', (req, res) => {
  const { method, url: reqUrl } = req; 
  const { query, pathname } = url.parse(reqUrl, true);
  
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

