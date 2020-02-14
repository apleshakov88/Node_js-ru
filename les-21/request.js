const url = require('url');
const fs = require('fs');
const getCurrentDate = require('./current-date');

module.exports = (req, res) => {
  const { method, url: reqUrl } = req; 
  const { query, pathname } = url.parse(reqUrl, true);
  if (method === 'GET' && pathname === '/echo' && query.message) {
    res.setHeader('Cache-control', 'no-cache'); // write header at nearest write command --- res.end
    res.end(`${query.message} >>> ${Math.random()}`);
    return;
  } else if (pathname === '/') {
    // const fileInfo = fs.readFileSync('./index.html');
    // res.end(fileInfo);
    console.log('reuqest >>>> ', getCurrentDate());

    fs.readFile('./index.html', (err, fileInfo) => {
      if (err) {
        res.statusCode = 500;
        res.end('Server error');
        return;
      }
      res.end(fileInfo);
    });
    return;
  }

  res.statusCode = 404;
  res.end('Page not found');
};