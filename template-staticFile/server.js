const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    let url = req.url;
    switch (url) {
        case '/public/anh.jpg':
            fs.readFile('public/anh.jpg', (err, data) => {
                res.writeHead(200, {'Content-Type': 'image/jpg'});
                res.write(data);
                res.end();
            })
            break;
        case '/public/anh2.png':
            fs.readFile('public/anh2.png', (err, data) => {
                res.writeHead(200, {'Content-Type': 'image/png'});
                res.write(data);
                res.end();
            })
            break;
        case '/public/css/style.css':
            fs.readFile('public/css/style.css', (err, data) => {
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

