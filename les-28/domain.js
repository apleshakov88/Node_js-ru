const domain = require('domain');
const fs = require('fs');
const http = require('http');

const d = domain.create();
const server = new http.Server();

d.on('error', err => console.log('DOMAIN CATCH ERROR >>> ', err));

d.run(() => {
  // d.enter() -> process.domain
  d.add(server); // server <-> domain. citcular dependency. To release memory need to kill domain or d.remove(server)

  ERROR();

  setTimeout(() => {
    console.log(process.domain); // link to current GLOBAL ACTIVE DOMAIN. That's why error inside TIMEOUT fired also
    ERROR();
    fs.readFile(__filename, () => ERROR()); // fs also knows the link to current GLOBAL ACTIVE DOMAIN. Same as setTimeout
    // every event emmiter has link to current GLOBAL ACTIVE DOMAIN
   
   
    // d.exit() 
  }, 1000);
});

server.on('boom', () => {
  setTimeout(() => {
    console.log(process.domain); 
    ERROR();
    fs.readFile(__filename, () => ERROR()); 
  }, 1000);
});

server.emit('boom');