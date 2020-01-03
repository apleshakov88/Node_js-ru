// node les-05.js to run script

var user = require('./user');

var petya = new user.User('Petya');
var vasya = new user.User('Vasya');

petya.hello(vasya);
vasya.hello(petya);