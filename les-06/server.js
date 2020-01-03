const User = require('./user');
const db = require('./db');
db.connect();

const logger = require('./logger')(module);


function run() {
  const petya = new User('Petya');
  const vasya = new User('Vasya');

  petya.hello(vasya);
  vasya.hello(petya);
  logger(db.getPhrases('hello'));
}

if (module.parent) {
  exports.run = run;
} else {
  run();
}