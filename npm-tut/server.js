const express = require('express');
const path = require('path');
const cors=require('cors');
const {logger}=require('./middleware/logEvents');
const errorHandler= require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3500;

//saves the log data
app.use(logger);

//custom middleware logger
const whitelist=['https://www.google.com','http://127.0.0.1:5500','http://localhost:3500'];
const corsOptions ={
    origin:(origin,callback) =>{ //origin is the value from the whitelist array above
        if(whitelist.indexOf(origin) !== -1 || !origin) //remove !origin and localhosts after development
        {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS, get yourself into whitelist'));}
          },
          optionSuccessStatus:200

        }

//cross origin resource sharing
app.use(cors(corsOptions));

//built-in middleware to handle url encoded data ( like form data)
app.use(express.urlencoded({extended:false}));

//built in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname,'..','/public')));

app.get(['/', '/index', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

app.get('/wao(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'wao.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, './new-page.html');
});

//route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('ATTEMPTED TO LOAD HELLO.html');
    next();
}, (req, res) => {
    res.redirect('./wao.html');
});

//chaining route handlers

const one = (req,res,next) => {
    console.log("one");
    next();
}

const two = (req,res,next)=>{
    console.log("two");
    next();
}

const three = (req,res) =>{
    console.log("three");
    res.send("FINISHED");
}

app.get('/chain(.html)?',[one,two,three]);


app.all('*', (req, res) => {
    res.status(404);

    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, '..', 'views', '404.html'));
    }
    else if(req.accepts('json')){
        res.json({error:"404 Not found"});
    }
    else{
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => {console.log('Server running on port', PORT)});

