// run: nodemon server.js

const fs = require('fs');

const fileStream = new fs.ReadStream('./index.html');

fileStream.on('readable', () => {
  const data = fileStream.read();
  if (data) {
    console.log(data.length)
  }
});

fileStream.on('end', () => {
  console.log('>>> THE END');
});

fileStream.on('error', err => {
  if (err.code === 'ENOENT') {
    console.log('>>>>> File not found')
  } else {
    console.log(err.message)
  }
});