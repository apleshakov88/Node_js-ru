const db = require('../db');

function User(name) {
  this.name = name;
}

User.prototype.hello = function(user) {
  console.log(db.getPhrases('hello') + ' ' + user.name);
};

module.exports = User;