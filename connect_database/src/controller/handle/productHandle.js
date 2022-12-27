const fs = require('fs');
const productService = require('../../service/productService');

class ProductHandle {
    static getIndexHtml(products, indexHtml) {
        let tbody = '';
        products.map((product, index) => {
            tbody += `
                    <tr>
                           <td>${index}</td>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td><img src="${product.image}" style="width: 50px;height: 50px" alt="kkk"></td>
                            <td><button style="background-color: green">Sửa</button></td>
                            <td><button style="background-color: red">Xóa</button></td>
                        </tr>
        `
        })
        indexHtml = indexHtml.replace('{products}', tbody);
        return indexHtml;
    }

    showHome(req, res) {
        fs.readFile('./views/index.html', 'utf-8', async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let products = await productService.getProducts();
                indexHtml = ProductHandle.getIndexHtml(products, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        })
    }
}

module.exports = new ProductHandle();