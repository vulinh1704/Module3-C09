const http = require('http'); // là thư viện hỗ trợ tạo server
const fs = require('fs'); // thư viện đọc ghi file
const qs = require('qs');
const server = http.createServer(function (req, res) { // cú pháp tạo server
    if (req.method === 'GET') {
        fs.readFile('./views/register.html', function (err, htmlRegister) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(htmlRegister);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            console.log(data)
        }) // lấy dữ liệu từ form
        req.on('end', () => {
            const userInfo = qs.parse(data); // dịch data từ chuỗi ra đối tượng chứa các thông tin nhập vào
            fs.readFile('./views/info.html', 'utf8', function (err, htmlIfo) {
                if (err) {
                    console.log(err);
                }
                htmlIfo = htmlIfo.replace('{name}', userInfo.name);
                htmlIfo = htmlIfo.replace('{email}', userInfo.email);
                htmlIfo = htmlIfo.replace('{password}', userInfo.password);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(htmlIfo);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});