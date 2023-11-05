const http = require('http');
const path=require('path');
const fs=require('fs');
const fsPromises=require('fs').promises;


const logEvents = require('./logEvents');
// const EventEmitter = require('events');
// class Emiiter extends EventEmitter{};
// // // initialize object
// const myEmiiter = new Emiiter();
// myEmiiter.on('log', (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile =async(pathfile,ContentType, response)=> {
    try{
        const data = await fsPromises.readFile(pathfile,'utf8');
        response.writeHead(200,{'Content-Type':ContentType});
        response.end(data);
    }
    catch (err) {
        
        console.log(err);
        response.statusCode = 500;
        response.end();

    }
}


const server= http.createServer((req,res) =>{
    console.log(req.url,req.method);
   

    // let pathfile;

    // // if(req.url=='/' || req.url==='index.html'){
    //     res.statusCode= 200;
    //     res.setHeader('Content-Type','text/html');
    //     pathfile=path.join(__dirname,'..','views','index.html');
    //     fs.readFile(pathfile,'utf8',(err,data)=>{
    //         res.end(data);
    //     })
    // }

    const extension =path.extname(req.url);

    let ContentType;

    switch(extension)
    {
        case '.css':
            ContentType='text/css';
            break;
        case '.js':
            ContentType='text/javascript';
            break;
        case '.json':
            ContentType='application/json';
            break;           
        case '.jpg':
            ContentType='image/jpeg';
            break;
        case '.png':
            ContentType='image/png';
            break;
        case '.txt':
            ContentType='text/plain';
            break;
        default:
            ContentType='text/html'; 
        }

        let pathfile;

            if(ContentType==='text/html' && req.url === '/')
            {
                pathfile=path.join(__dirname,'..','views','index.html');
                console.log('1');
            }
            else if(ContentType==='text/html' && req.url.slice(-1) === '/')
            {
                pathfile=path.join(__dirname,'..','views',req.url,'index.html');
                console.log('2');
            }
            else if(ContentType==='text/html')
            {
                pathfile=path.join(__dirname,'..','views',req.url);
                console.log('3');
            }
            else
            {
                pathfile=path.join(__dirname,req.url);
                console.log('4');
            }
                
            //.html is not mandatory in url now
            // if(!extension || req.url.slice(-1) !== '/')
            // {
            //     pathfile+='.html';
            // }

            const fileExists= fs.existsSync(pathfile);

            if(fileExists)
            {

                serveFile(pathfile,ContentType,res);
            }
            else {
               switch(path.parse(pathfile).base){
                case 'old-page.html':
                    res.writeHead(301,{'Location':'/new-page.html' });
                    res.end();
                    break;
                case 'www-page.html':
                    res.writeHead(301,{'Location':'/'});
                    res.end()
                    break;
                default:
                    serveFile(path.join(__dirname,'..','views','404.html'),'text/html',res);
                    
               }
            }
            console.log("asdasdasd",req.url);
});

server.listen(PORT,()=>
    console.log(`Server running on port ${PORT}`));





//add listener for the log event

// myEmiiter.on('log',(msg)=> logEvents(msg));


//     myEmiiter.emit('log','log Event Emitted!');


