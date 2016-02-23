/**
 * Created by vuji on 16/2/6.
 *
 * 调用方式
 * sqlBean.and("uId",'1').query(function(err,result){
 *      console.log(result.length);
 * });
 *
 * sqlBean.insertProp('uId','3').insertProp('username','123456').insertProp('password','123456').insert(function(err,result){
 *      console.log(result.length);
 * });
 */



var mysql = require('mysql');
var mysqlConn = require('./mysql-conn');
var sqlBean = function(){};

/**
 * 查询字符串
 * @type {string}
 */
var queryBase = 'select * from h5Chat_login ';
var queryCondition = 'where 1=1';
var queryArr = [];

/**
 * 查询属性
 * @param prop
 * @param str
 * @returns {sqlBean}
 */
sqlBean.prototype.and = function(prop,str){
    queryCondition += " and "+prop + "= ?";
    queryArr.push(str);
    return this;
};

sqlBean.prototype.andLike = function(prop,str){
    queryCondition += " and "+prop + " LIKE ?";
    queryArr.push(str);
    return this;
};

sqlBean.prototype.or = function(prop,str){
    queryCondition += " or "+prop + "= ?";
    queryArr.push(str);
    return this;
};

sqlBean.prototype.orLike = function(prop,str){
    queryCondition += " and "+prop + " LIKE ?";
    queryArr.push(str);
    return this;
};

/**
 * 查询
 * @param callback
 */
sqlBean.prototype.query = function(callback){
    mysqlConn.pool.getConnection(function(err,conn){
        var sqlStr = queryBase+queryCondition;
        //错误处理
        if(err){
            throw "获取数据库链接异常!";
        }

        console.log("["+new Date()+"]   "+ sqlStr);
        console.log("Param:",queryArr);
        conn.query(sqlStr,queryArr,function(err,result){
            var strParseToJSON = JSON.parse(JSON.stringify(result));
            //错误处理
            if(err){
                throw "SQL异常!";
            }
            console.error(false,strParseToJSON);

            callback(false,strParseToJSON);
        });
        conn.release();
    });
};

/**
 * 插入字符串
 * @type {string}
 */
var insertBase = 'INSERT INTO  h5Chat_login (';
var insertVla = ") VALUES (";
var insertEnd = ")";
var insertArr = [];
var insertNum = 0;

/**
 * 插入属性设置
 * @param prop
 * @param str
 * @returns {sqlBean}
 */
sqlBean.prototype.insertProp = function(prop,str){
    if(insertNum !== 0){
        insertBase += ",";
        insertVla += ',';
    }
    insertBase += prop;
    insertVla += '?';
    insertArr.push(str);
    insertNum++;
    return this;
};

/**
 * 插入处理
 * @param callback
 */
sqlBean.prototype.insert = function(callback){
    mysqlConn.pool.getConnection(function(err,conn){

        var sqlStr = insertBase+insertVla+insertEnd;
        //错误处理
        if(err){
            throw "获取数据库链接异常!";
        }

        console.log("["+new Date()+"]   "+sqlStr);
        console.log("Param:",insertArr);
        conn.query(sqlStr,insertArr,function(err,result){

            //错误处理
            if(err){
                console.error(err.errno);
                console.error(err);
                throw "SQL异常!";
            }
            var strParseToJSON = JSON.parse(JSON.stringify(result));
            console.log(false,strParseToJSON);

            callback(false,strParseToJSON);
        });
        conn.release();
    });
};



module.exports = sqlBean;