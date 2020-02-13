const fs = require('fs');
const path = require('path');

const ROOT = __dirname + '/public';

const sendFileSafe = (filePath, res) => {
  try {
    filePath = decodeURIComponent(filePath);
  } catch(e) {
    res.statusCode = 400;
    res.end('Bad request');
    return;
  }

  if (~filePath.indexOf('\0')) { // check for 0 bite symbol
    res.statusCode = 400;
    res.end('Bad request');
    return;
  }

  filePath = path.normalize(path.join(ROOT, filePath))
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('File not found');
      return;
    }
  });

  sendFile(filePath, res);
};

// even worst code. RES will whait while file have not been read completely
const sendFile = (filePath, res) => {
  fs.readFile(filePath, (err, fileData) => {
    if (err) throw(err);

    var mime = require('mime').getType(filePath);
    res.setHeader('Content-Type', `${mime}; charset=utf-8`);
    res.end(fileData);
  })
};


module.exports = sendFileSafe