const mysql = require('mysql');

class Connection {
    configToMySql = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'demo_database',
        charset: 'utf8_general_ci'
    }

    getConnection() {
        return mysql.createConnection(this.configToMySql)
    }

    connection() {
        this.getConnection().connect(err => {
            if(err) {
                console.log(err);
            } else {
                console.log('Connect database success');
            }
        });
    }
}

const connection = new Connection();
module.exports = connection;