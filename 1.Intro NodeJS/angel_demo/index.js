const path = require('path'); // core modules
const is = require('is'); // third-party modules
const calc = require('./calculator.js'); // local modules

console.log(calc.add(1, 2));
console.log(calc.multiply(43, 2));

console.log(is.function(calc.add));

console.log(path.resolve('./'));
