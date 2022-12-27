const http = require('http');
const url = require('url');
const error = require("./controller/handle/notFoundHanlde");
const router = require("./controller/router");
const fs = require('fs');
const typeFile = {
    'jpg': 'images/jpg',
    'png': 'images/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'svg': 'image/svg+xml',
    'ttf': 'font/tff',
    'woff': 'font/woff',
    'woff2': 'font/woff',
    'eot': 'application/vnd.ms-fontobject'
}

const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname;
    const checkPath = pathName.match(/\.js|\.css|\.png|\.jpg|\.ttf|\.woff|\.woff2|\.eot/);
    if (checkPath) {
        const contentType = typeFile[checkPath[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': contentType});
        fs.createReadStream(__dirname + req.url).pipe(res);
    } else {
        const arrPath = pathName.split('/');
        const trimPath = arrPath[arrPath.length - 1];
        let chosenHandle;
        if (typeof router[trimPath] === 'undefined') {
            chosenHandle = error.showNotFound;
        } else {
            chosenHandle = router[trimPath];
        }
        chosenHandle(req, res);
    }

});

server.listen(8080, () => {
    console.log('Server is running!');
})