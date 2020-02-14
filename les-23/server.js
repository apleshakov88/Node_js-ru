// run: nodemon server.js
// sources with errors code https://github.com/rwinlib/libuv/blob/master/include/uv.h

const fs = require('fs');

// get stats for some PATH. Because we don't know is it DIR or FILE
fs.stat(__filename, (err, stats) => {
  console.log('stats >>>', stats.isFile());
  console.log(stats);
});

// read file as Buffer. Convert to string.
fs.readFile('./index.html', (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error(err.message);
    } else {
      console.error(err);
    }
  } else {
    console.log(data.toString('utf-8'));
  }
});

// read file as String if we know that workin with text files
fs.readFile('./index.html', { encoding: 'utf-8' },   (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error(err.message);
    } else {
      console.error(err);
    }
  } else {
    console.log(data);
  }
});

// write file
fs.writeFile('file.tmp', 'file text content', (err) => {
  if (err) throw err;

  fs.rename('file.tmp', 'new.tmp', () => {
    if (err) throw err;

    fs.unlink('new.tmp', (err) => {
      if (err) throw err;
    });
  });
});