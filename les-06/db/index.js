let phrases;

exports.connect = function() {
  phrases = require('./en');
};

exports.getPhrases = function(name) {
  return phrases[name];
};