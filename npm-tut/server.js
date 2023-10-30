const http = require('http');
const path=require('path');
const fs=require('fs');
const fsPromises=require('fs').promises;


const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emiiter extends EventEmitter{};
//initialize object
const myEmiiter = new Emiiter();

const PORT = process.env.PORT || 3500;

const server= http.createServer((req,res) =>{
    console.log(req.url,req.method);
   

    let pathfile;

    if(req.url=='/' || req.url==='index.html'){
        res.statusCode= 200;
        res.setHeader('Content-Type','text/html');
        pathfile=path.join(__dirname,'..','views','index.html');
        fs.readFile(pathfile,'utf8',(err,data)=>{
            res.end(data);
        })
    }


    
});

server.listen(PORT,()=>
    console.log(`Server running on port ${PORT}`));





//add listener for the log event

// myEmiiter.on('log',(msg)=> logEvents(msg));


//     myEmiiter.emit('log','log Event Emitted!');
