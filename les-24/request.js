const url = require('url');
const sendFileSafe = require('./send-file');

const checkAccess = (req) => {
  return url.parse(req.url, true).query.secret === 'o_O';
};

const noAccessHandler = (res) => {
  res.statusCode = 403;
  res.end('Secret code is needed!');
};

const request = (req, res) => {
  if (!checkAccess(req)) {
    noAccessHandler(res);
    return;
  }

  sendFileSafe(url.parse(req.url).pathname, res);
};

module.exports = request;