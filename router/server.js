const http = require('http');
const url = require('url');
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
    // check static file ( mọi người chủ động đặt log để xem kết quả)
    let urlPath = url.parse(req.url, true).pathname; // lấy ra pathname của url ( vd : /home , /public/image.png ,..)
    const checkPath = urlPath.match(/\.js|\.css|\.png|\.jpg|\.ttf|\.woff|\.woff2|\.eot/); // lấy về 1 mảng khi so sánh urlPath với regex (.png , .js , ....)
    console.log(checkPath)
    if (checkPath) { // nếu trùng khớp với 1 trong các regex trên nó sẽ trả về 1 mảng thông tin
        const contentType = typeFile[checkPath[0].toString().split('.')[1]]; // lấy ra tên file key của typeFile được khai báo lúc đầu ví dụ : css , js , png => sau đó dùng key lấy ra value tương ứng : text/css , text/javascript
        res.writeHead(200, {'Content-Type': contentType}); // Trả về response có header có content-type tương úng
        fs.createReadStream(__dirname + req.url).pipe(res); // tương tự việc đọc file ảnh ra sau đó in lên web
        // end check static file
    } else {
        //Xử lý các req khác như bình thường
        let chosenHandle = (typeof router[urlPath] !== 'undefined') ? router[urlPath]: handle.notFound;
        chosenHandle(req, res);
    }
})

const handle = {};
handle.home = (req, res) => {
    fs.readFile('views/index.html', (err, data) => {
        res.write(data);
        res.end();
    })
}
handle.notFound = (req, res) => {
    fs.readFile('views/notFound.html', (err, data) => {
        res.write(data);
        res.end();
    })
}
const router = {
    '/home': handle.home
}

server.listen(3000, () => {
    console.log('Server is running')
})
