const express = require('express');
const app = express();
const path = require('path');
const db = require('./queries');

const http = require('http');
// const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 5000;

// const server = http.createServer((req, res) => {
//
//     const requestUrl = url.parse(req.url);
//     if (requestUrl.query === 'users') {
//         const allUsers = db.getAllUsers();
//         console.log(typeof(allUsers));
//         // res.end(`Your request result : ${allUsers}`);
//     }
//
//     const allUsers = db.getAllUsers();
//
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end(`${allUsers}`);
// });
//
// server.listen(port, hostname, () => {
//     console.log(`App runing on port ${port}`)
// });

app.use(express.static(path.join(__dirname + '/..', 'public')));

app.get('/api/users', db.getUsers);
app.get('/api/users/byId', db.getUserById);

app.get('/index', (req, res) => {

    const requestUrl = url.parse(req.url);
    console.log('====');
    console.log(requestUrl.host);
    console.log(requestUrl.pathname);
    console.log(requestUrl.search);
    console.log(requestUrl.query);

    // res.render('index', { title: 'Hello World!'})
    res.sendFile(path.join(__dirname + '/..', 'public', 'index.html'))
});

const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Application request address: http://%s:%s', host, port);
});
