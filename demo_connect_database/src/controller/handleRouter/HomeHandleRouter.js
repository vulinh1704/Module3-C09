const fs = require('fs');
const productService = require('../../service/productService');
const categoryService = require('../../service/categoryService');
const qs = require('qs');
const cookie = require("cookie");

class HomeHandleRouter {
    static getHomeHtml(homeHtml, products) {
        let tbody = '';
        products.map((product, index) => {
            tbody += `
                    <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.nameCategory}</td>
                    <td><button style="background-color: green; color: white">Sua</button></td>
                    <td><a href="/delete/${product.id}"><button style="background-color: red; color: white">Xoa</button></a></td>
                </tr>
                    `
        })
        homeHtml = homeHtml.replace('{products}', tbody);
        return homeHtml;
    }

    showHome(req, res) {
        const cookies = cookie.parse(req.headers.cookie || '');
        let userCurrent = JSON.parse(cookies.user);
        console.log(userCurrent.id)
        fs.readFile('./views/home.html', 'utf-8', async (err, homeHtml) => {
            if (err) {
                console.log(err.message)
            } else {
                let products = await productService.findAll()
                homeHtml = HomeHandleRouter.getHomeHtml(homeHtml, products);
                res.writeHead(200, 'text/html');
                res.write(homeHtml);
                res.end();
            }
        })
    }

    createProduct(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/create.html', 'utf-8', async (err, createHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    let categories = await categoryService.findAll();
                    let options = ''
                    categories.map(category => {
                        options += `
                        <option value=${category.idCategory}>${category.nameCategory}</option>
                        `
                    })
                    createHtml = createHtml.replace('{categories}', options)
                    console.log(categories)
                    res.write(createHtml);
                    res.end();
                }
            })
        } else {
            let data = ''
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const product = qs.parse(data);
                    console.log(product)
                    const mess = await productService.save(product);
                    console.log(mess)
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            })
        }
    }

    async deleteProduct(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/delete.html', 'utf-8', (err, deleteHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    deleteHtml = deleteHtml.replace('{id}', id);
                    res.write(deleteHtml);
                    res.end();
                }
            })
        } else {
            let mess = await productService.remove(id)
            res.writeHead(301, {'location': '/home'});
            res.end();
        }
    }
}

module.exports = new HomeHandleRouter();