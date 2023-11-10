const express = require('express');
const path = require('path');
const cors=require('cors');
const corsOptions=require('./Config/corsOptions');
const {logger}=require('./middleware/logEvents');
const errorHandler= require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3500;

//saves the log data
app.use(logger);

//cross origin resource sharing
app.use(cors(corsOptions));

//built-in middleware to handle url encoded data ( like form data)
app.use(express.urlencoded({extended:false}));

//built in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname,'..','/public')));

app.use('/subdir',express.static(path.join(__dirname,'..','/public')));

//routes
app.use('/',require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employee', require('./routes/api/employee'));


//route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('ATTEMPTED TO LOAD HELLO.html');
    next();
}, (req, res) => {
    res.redirect('./wao.html');
});


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

