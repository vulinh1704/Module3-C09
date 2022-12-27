const fs = require('fs');
const productService = require('../../service/productService');

class HomeHandleRouter {
   static getHomeHtml(homeHtml , products) {
        let tbody = '';
        products.map((product, index) => {
            tbody +=   `
                    <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td><img src="./public/${product.image}" alt="k co" style="width: 50px;height: 50px;"></td>
                    <td><button>Sua</button></td>
                    <td><button>Xoa</button></td>
                </tr>
                    `
        })
        homeHtml = homeHtml.replace('{products}' , tbody);
        return homeHtml;
    }

    showHome(req, res) {
        fs.readFile('./views/home.html', 'utf-8', async (err, homeHtml) => {
            if (err) {
                console.log(err.message)
            } else {
                let products = await productService.findAll()
                homeHtml = HomeHandleRouter.getHomeHtml(homeHtml , products);
                res.writeHead(200, 'text/html');
                res.write(homeHtml);
                res.end();
            }
        })
    }
}

module.exports = new HomeHandleRouter();