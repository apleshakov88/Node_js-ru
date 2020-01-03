const translates = require('./en');

function User(name) {
  this.name = name;
}

User.prototype.hello = function(user) {
  console.log(translates.hello + ' ' + user.name);
};

exports.User = User;