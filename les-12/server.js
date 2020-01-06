const { HttpError, MessageError } = require('./errors.js');

const phrases = {
  hello: 'Hello',
  world: 'World'
};

function getPhrase(name) {
  if (!phrases[name]) {
    throw new MessageError('There is no message key "' + name + '"');
  }

  return phrases[name];
}

function makePage(url) {
  if (url !== 'index.html') {
    throw new HttpError('Page not found', 404);
  }
  return getPhrase('hell') + ' ' + getPhrase('world');
}


try {
  const page = makePage('index.html');
} catch(e) {
  if (e instanceof HttpError) {
    console.log(e.status, e.message);
  } else {
    console.error('Error %s\n Message %s\n Stack %s\n', e.name, e.message, e.stack);
  }
}

