const fs = require('fs');
const http = require('http');

let clients = [];
const chat = {
  subscribe: (res) => {
    clients.push(res);

    res.on('close', () => {
      clients = clients.filter(client => client !== res);
    });
  },
  publish: (message) => {
    clients.forEach(res => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message }));
    });
    clients = [];
  }
}


const requestHandler = (req, res) => {
  const endPointHandlers = {
    '/': () => {
      sendFile('./frontend/index.html', res);
    },
    '/subscribe': () => {
      chat.subscribe(res);
    },
    '/publish': () => {
      let body = '';
      req
        .on('readable', () => {
          const data = req.read();
          if (data) body += data;

          if (body.length > 1e4) {
            res.statusCode = 413;
            res.end('Message is too big');
          }
        })
        .on('end', () => {
          try {
            body = JSON.parse(body);
          } catch (err) {
            res.statusCode = 400;
            res.end('Bad Request');
            return;
          }

          chat.publish(body.message);
          res.end('ok');
        });
      
    }
  };

  const endPointHandler = endPointHandlers[req.url];

  if (!endPointHandler) {
    res.statusCode = 404;
    res.end('Not Found');
    return;
  }

  endPointHandler();
};

const sendFile = (fileName, res) => {
  const file$ = new fs.ReadStream(fileName);

  file$.pipe(res);

  file$.on('error', (error) => {
    res.statusCode = 500;
    res.end('Server error');
  });

  res.on('close', () => file$.destroy());
};

new http.Server(requestHandler).listen(1337);
