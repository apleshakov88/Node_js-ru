// run: nodemon server.js

const fs = require('fs');
const http = require('http');
const url = require('url');

const requestHandler = (req, res) => {
  const { method, url: reqUrl } = req; 
  const { query, pathname } = url.parse(reqUrl, true);

  const file$ = new fs.ReadStream('./index.html');
  sendFile(file$, res);
};

// const sendFile = (file$, res) => {
//   const writeResponce = () => {
//     const fileData = file$.read();
//     if (fileData) {
//       const isBufferAvailable = res.write(fileData);
//       if (!isBufferAvailable) {
//         file$.removeListener('readable', writeResponce);
//         res.once('drain', () => {
//           file$.on('readable', writeResponce);
//           writeResponce();
//         })
//       }
//     }
//   }
  
//   file$
//     .on('readable', writeResponce)
//     .on('end', () => res.end());
// };



// is the same as above. Code above is low level (under the hood logic) realization
const sendFile = (file$, res) => {
  file$.pipe(res);
  // file$.pipe(process.stdout); // output to console aslo

  file$.on('error', (error) => {
    res.statusCode = 500;
    res.end('Server error');
  });

  // it's not the same as file$.on('close') - file is finished
  // it means that CONNECTION WAS BROKEN. We need to destroy file$ stream to release memory
  // res.on('finish') is the same as file$.on('close')
  res.on('close', () => {
    file$.destroy();
  });
};

new http.Server(requestHandler).listen(1337);
