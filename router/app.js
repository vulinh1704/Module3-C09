const http = require('http');
let url = require('url');
const fs = require('fs');
http.createServer((req, res) => {
    let parseUrl = url.parse(req.url , true);
    let pathName = parseUrl.pathname;
    let trimPath = pathName.replace(/^\/+|\/+$/g, '');
    let chosenHandle;
    if(typeof router[trimPath] === 'undefined') {
        chosenHandle = handle.notFound;
    } else {
        chosenHandle = router[trimPath];
    }
    chosenHandle(req, res);
}).listen(3000, () => {
    console.log('Server is running ')
})


let handle = {};

handle.home = (req , res) => {
    fs.readFile('views/index.html', 'utf-8', (err, data) => {
        res.write(data);
        res.end();
    })
}
handle.notFound = (req, res) => {
    fs.readFile('views/notFound.html', 'utf-8', (err, data) => {
        res.write(data);
        res.end();
    })
}
let router = {
    'register' : handle.register,
    'login': handle.login,
    '': handle.home
}