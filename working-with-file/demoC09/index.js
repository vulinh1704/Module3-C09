const http = require('http');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('views/index.html', 'utf-8', (err, indexHtml) => {
            if (err) {
                console.log(err)
            }
            let listProduct = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'));
            let html = ''
            for (let i = 0; i < listProduct.length; i++) {
                html += `<h1>${listProduct[i].id} : ${listProduct[i].name}-${listProduct[i].price}
                <form method="post"><input type="hidden" name="idDelete" value="${listProduct[i].id}"><button type="submit">Xóa</button></form></h1>`
            }
            indexHtml = indexHtml.replace('{list-product}', html);
            res.write(indexHtml);
            res.end();
        })
    }
    if (req.method === 'POST') {
        let data = ''
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            let dataForm = qs.parse(data);
            if (dataForm.idDelete) {
                let listProduct = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'));
                for (let i = 0; i < listProduct.length; i++) {
                    if (dataForm.idDelete == listProduct[i].id) {
                        listProduct.splice(i, 1);
                        break;
                    }
                }
                fs.writeFileSync('data/data.json', JSON.stringify(listProduct));
                res.writeHead(301, {'location': '/'})
                res.end();
            } else {
                let product = qs.parse(data);
                let listProduct = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'));
                listProduct.push(product);
                fs.writeFileSync('data/data.json', JSON.stringify(listProduct));
                res.writeHead(301, {'location': '/'})
                res.end();
            }
        })
    }
});
server.listen(3000, () => {
    console.log('Server is running!')
})