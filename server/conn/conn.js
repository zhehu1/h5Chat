const mysql = require('mysql');

class Connection {
    constructor() {
        this.pool  = mysql.createPool({
            host            : '127.0.0.1',
            port            :  3306,
            user            : 'root',
            password        : '123456',
            database        : 'world',
            connectionLimit :  20,
            debug           :  false
        });
    };

    query (sql) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((connectionError, connection) => {
                
                if (connectionError) {
                    reject(connectionError);
                    return;
                }
                connection.query(sql, function (queryError, results, fields) {
                    // 释放链接
                    connection.release();
                
                    if (queryError) {
                        reject(queryError);
                        return;
                    }
                
                    resolve(results, fields);
                });
            });
        });
    }
}

exports = module.exports = new Connection();