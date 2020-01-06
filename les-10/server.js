const util = require('util');

const inspectObj = { a: 1, b: 3 };
console.log(util.inspect(inspectObj));
const inspectObj2 = { a: 1, b: 3, inspect: () => 4 };
console.log(util.inspect(inspectObj2));



const formatStr = 'year %s --- count %d --- user %j';
const formatValues = [2020, 23, { name: 'user01' }];
const formatted = util.format.apply(util, [formatStr, ...formatValues]);
console.log('>>> ', formatted);



function Animal() {
  this.name = 'animal';
}
Animal.prototype.go = function() {
  console.log(this.name, '>>> go');;
}

function Rabbit() {
  this.name = 'rabbit';
}
Rabbit.prototype.jump = function() {
  console.log(this.name, '>>> jump');
}
util.inherits(Rabbit, Animal);
const rabbit = new Rabbit();

rabbit.go();
rabbit.jump();