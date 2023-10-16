const name= 'himesh';

console.log(name);
console.log('I am learning node JS');

// console.log(global);

const os= require('os');

// console.log(os);

// console.log(os.type());
// console.log(os.version());

// console.log(__dirname)
// console.log(__filename)

// const path= require('path');

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));


// console.log(path.parse(__filename))

// const math= require('./math')

const {add, subtract , multiply, divide}=require('./math')

const value= divide(2,3);


console.log(value);



