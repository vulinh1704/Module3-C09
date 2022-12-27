const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    let url = req.url;
    let tail = url.split('.')[1];
    let fileName = url.split('/')[2];
    switch (tail) {
        case 'jpg':
            fs.readFile(`public/${fileName}`, (err, data) => {
                res.writeHead(200, {'Content-Type': 'image/jpg'});
                res.write(data);
                res.end();
            })
            break;
        case 'png':
            fs.readFile(`public/${fileName}`, (err, data) => {
                res.writeHead(200, {'Content-Type': 'image/png'});
                res.write(data);
                res.end();
            })
            break;
        case 'css':
            fs.readFile(`public/${fileName}`, (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(data);
                res.end();
            })
            break;
        default:
            fs.readFile('index.html', 'utf-8', (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            })
    }

});
server.listen(3000, () => {
    console.log('Server is running')
})

