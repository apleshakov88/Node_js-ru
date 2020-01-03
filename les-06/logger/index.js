module.exports = function(module) {
  return (...args) => {
    console.log.apply(console, [module.filename, ...args]);
  };
}