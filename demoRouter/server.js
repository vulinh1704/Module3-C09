const http = require('http');
let url = require('url');
const fs = require('fs');
const server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true);
    let pathName = parseUrl.pathname;
    let chosenHandle;
    if (typeof (router[pathName]) === 'undefined') {
        chosenHandle = handle.notFound;
    } else {
        chosenHandle = router[pathName];
    }
    chosenHandle(req, res);
});


let handle = {};
handle.home = function (req, res) {
    fs.readFile('views/home.html', 'utf-8', (err, homeHtml) => {
        res.write(homeHtml);
        res.end();
    })
}

handle.login = function (req, res) {
    fs.readFile('views/login.html', 'utf-8', (err, homeHtml) => {
        res.write(homeHtml);
        res.end();
    })
}

handle.notFound = function (req, res) {
    fs.readFile('views/error.html', 'utf-8', (err, errorHtml) => {
        res.write(errorHtml);
        res.end();
    })
}

let router = {
    '/home': handle.home,
    '/login': handle.login
}
server.listen(3000, () => {
    console.log('Server is running')
});