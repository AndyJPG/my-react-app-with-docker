const express = require('express');
const app = express();
const router = express.Router();

const path = __dirname + '/views/';
const port = 8080;

// Router Object

router.use((req, res, next) => {
    console.log('/' + req.method);
    next();
});

router.get('/', (req, res) => {
    res.sendFile(path + 'index.html');
});

router.get('/sharks', (req, res) => {
    res.sendFile(path + 'sharks.html');
});

// Mount the router middleware and the application's static assets

app.use(express.static(path));
app.use('/', router);

app.listen(port, () => {
    console.log('Example app listening on port 8080!')
});