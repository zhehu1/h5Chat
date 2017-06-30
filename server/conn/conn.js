const mysql = require('mysql');
const conf = require('../config/mysql.json');

const methods = [
    'query',
    'insert',
    'update',
    'delete'
]

class Connection {
    constructor() {
        this.pool  = mysql.createPool(conf);

        methods.forEach((method) => {
            this[method] = (sql, params) => {
                return new Promise((resolve, reject) => {
                    this.pool.getConnection((connectionError, connection) => {
                        if (connectionError) {
                            reject(connectionError);
                            return;
                        }
                        connection.query(sql, params || [], (queryError, results, fields) => {
                            // 释放链接
                            connection.release();
                        
                            if (queryError) {
                                reject(queryError);
                                return;
                            }
                            let _res = this[method+'Handle'].call(this, results);
                            debugger;
                            if (_res.status) {
                                resolve(_res.result);
                            } else {
                                reject(_res.result);
                            }
                        });
                    });
                });
            };
        })
    };

    queryHandle (results) {
        return {
            status: true,
            result: results
        };
    };

    insertHandle (results) {
        return {
            status: true,
            result: results[0][0]
        };
    };

    updateHandle (results) {
        return {
            status: true,
            result: results[0][0]
        };
    };

    deleteHandle (results) {
        if (results.affectedRows === 0) {
            return {
                status: true,
                result: '删除失败，该记录不存在！'
            }
        }
        return {
            status: true,
            result: results
        };
    }
}

exports = module.exports = new Connection();