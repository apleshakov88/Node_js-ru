const http = require('http');
const url = require('url');

let counter = 0;
const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req; 
  const { query, pathname } = url.parse(reqUrl, true);
  if (pathname === '/echo' && query.message) {
    counter++;
    // res.statusCode = 200; // OK - 200 --- by default
    // res.writeHead(200, 'OK', {'Cache-control': 'no-cache'}); // write header right now
    res.setHeader('Cache-control', 'no-cache'); // write header at nearest write command --- res.end
    res.end(`${query.message} >>> ${counter}`);
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});


const serverOrigEmit = server.emit;
server.emit = (event, ...args) => {
  console.log(`server emit event decorator >>> ${event}`);
  return serverOrigEmit.apply(server, [event, ...args])
}


server.listen('1337', '127.0.0.1');

