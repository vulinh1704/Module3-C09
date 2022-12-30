const connection = require('../model/connection');
connection.connected();

class ProductService {
    findAll() {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query('select * from product p join category c on p.idCategory = c.idCategory', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    save(product) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`insert into manager.product(price, name, description, image, idCategory)
                           values (${product.price}, '${product.name}', '${product.description}',
                                   'abc.jpg' , ${product.idCategory})`, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('Tạo Thành công')
                }
            })
        })
    }

    remove(id) {
        let connect = connection.getConnection();
        let sql = `delete
                   from manager.product
                   where id = ${id}`;
        return new Promise((resolve, reject) => {
            connect.query(sql, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('Thành công')
                }
            })
        })
    }
}

const productService = new ProductService();
module.exports = productService;