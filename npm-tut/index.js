const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmiiter extends EventEmitter{};

//initialize object

const myEmiiter = new MyEmiiter();

//add listener for the log event

myEmiiter.on('log',(msg)=> logEvents(msg));

setTimeout(()=>{
    //Emit event
    myEmiiter.emit('log','log Event Emitted!');
},2000)