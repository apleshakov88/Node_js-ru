const domain = require('domain');

const serverDomain = domain.create();
serverDomain.on('error', err => {
  console.error('>>>>>>>>>>>> Error catched by DOMAin >>>>>>>>>>>>', err);
});
serverDomain.run(() => {
  const server = require('./server'); // in this case DOMAIN can catch error. If import file at the top, then server runned outside of DOMAIN
  server.listen(1337);
});