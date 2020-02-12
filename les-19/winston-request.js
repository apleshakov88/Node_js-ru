const url = require('url');
const log = require('winston');

module.exports = (req, res) => {
  const { method, url: reqUrl } = req; 
  const { query, pathname } = url.parse(reqUrl, true);
  if (method === 'GET' && pathname === '/echo' && query.message) {
    log.debug(method, query);
    res.setHeader('Cache-control', 'no-cache'); // write header at nearest write command --- res.end
    res.end(`${query.message} >>> ${Math.random()}`);
    return;
  }
  log.error('Unknown URL');

  res.statusCode = 404;
  res.end('Page not found');
};