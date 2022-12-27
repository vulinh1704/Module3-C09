const connection = require('../model/connection');
connection.connection();

class ProductService {
    getProducts() {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query('select * from product', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }
}

module.exports = new ProductService();