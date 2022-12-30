const connection = require('../model/connection');
connection.connected();

class UserService {
    login(user) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`select *
                           from user
                           where username = '${user.username}'
                             and password = '${user.password}';`, (err, users) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(users)
                }
            })
        })
    }
}

module.exports = new UserService();