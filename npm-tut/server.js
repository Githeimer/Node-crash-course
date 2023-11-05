const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3500;
 
const app = express();

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

app.get('/hello(.html)?', (req, res, next) => {
    console.log('ATTEMPTED TO LOAD HELLO.html');
    next();
}, (req, res) => {
    res.redirect('../views/wao.html');
});

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

app.listen(PORT, () => {console.log('Server running on port', PORT)});

