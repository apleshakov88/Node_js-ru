const url = require('url');
const debug = require('debug')('[DEBUG REQUEST] >>> ');

module.exports = (req, res) => {
  const { method, url: reqUrl } = req; 
  const { query, pathname } = url.parse(reqUrl, true);
  if (method === 'GET' && pathname === '/echo' && query.message) {
    debug(method, url);
    res.setHeader('Cache-control', 'no-cache'); // write header at nearest write command --- res.end
    res.end(`${query.message} >>> ${Math.random()}`);
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
};