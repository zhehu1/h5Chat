const mysql = require('mysql');

class Connection {
    constructor() {
        this.pool  = mysql.createPool({
            host            : '127.0.0.1',
            port            :  3306,
            user            : 'root',
            password        : '123456',
            database        : 'h5chat',
            connectionLimit :  20,
            debug           :  true
        });
    };

    query (sql, params) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((connectionError, connection) => {
                debugger;
                if (connectionError) {
                    reject(connectionError);
                    return;
                }
                connection.query(sql, params || [], function (queryError, results, fields) {
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
    };

    insert (sql, params) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((connectionError, connection) => {
                
                if (connectionError) {
                    reject(connectionError);
                    return;
                }
                connection.query(sql, params || [], function (queryError, results, fields) {

                    // 释放链接
                    connection.release();
                
                    if (queryError) {
                        reject(queryError);
                        return;
                    }
                    resolve(results[0][0]);
                });
            });
        });
    };

    update (sql, params) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((connectionError, connection) => {
                
                if (connectionError) {
                    reject(connectionError);
                    return;
                }
                connection.query(sql, params || [], function (queryError, results, fields) {
                    
                    // 释放链接
                    connection.release();
                
                    if (queryError) {
                        reject(queryError);
                        return;
                    }
                    resolve(results[0][0]);
                });
            });
        });
    };

    delete (sql, params) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((connectionError, connection) => {
                
                if (connectionError) {
                    reject(connectionError);
                    return;
                }
                connection.query(sql, params || [], function (queryError, results, fields) {
                    debugger;
                    // 释放链接
                    connection.release();
                
                    if (queryError) {
                        reject(queryError);
                        return;
                    }

                    if (results.affectedRows === 0) {
                        reject('删除失败，该记录不存在！');
                        return;
                    }
                    resolve(results);
                });
            });
        });
    };
}

exports = module.exports = new Connection();