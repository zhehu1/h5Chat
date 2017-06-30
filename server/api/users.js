const conn = require('../conn/conn');

class Users {
    constructor (conn) {}

    /**
     * 新增用户
     */
    addUsersBaseInfo (params) {
        // `Account`, `Email`, `Pic`, `Tel`, `Career`, `Birthday`, `Company`, `Address`
        let arr = new Array(8);
        arr[0] = params.Account || null;
        arr[1] = params.Email || null;
        arr[2] = params.Pic || null;
        arr[3] = params.Tel || null;
        arr[4] = params.Career || null;
        arr[5] = params.Birthday || null;
        arr[6] = params.Company || null;
        arr[7] = params.Address || null;
        return new Promise((resolve, reject) => {
            conn.insert('call i_users_base_info(?, ?, ?, ?, ?, ?, ?, ?);', arr)
            .then((result) => {
                res.Success(ctx, result);
            })
            .catch(err => {
                res.BadRequest(ctx, err);
            })
        })
    };

    getUsersBaseInfo (Account) {
        return new Promise((resolve, reject) => {
            conn.query('select * from `users_base_info` where Account=?', Account)
            .then((result) => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
        })
    };

    async updateUsersBaseInfo (ctx, next) {
        // `Account`, `Email`, `Pic`, `Tel`, `Career`, `Birthday`, `Company`, `Address`
        let params = new Array(8);
        debugger;
        params[0] = ctx.request.body.Account || null;
        params[1] = ctx.request.body.Email || null;
        params[2] = ctx.request.body.Pic || null;
        params[3] = ctx.request.body.Tel || null;
        params[4] = ctx.request.body.Career || null;
        params[5] = ctx.request.body.Birthday || null;
        params[6] = ctx.request.body.Company || null;
        params[7] = ctx.request.body.Address || null;
        await conn.update('call u_users_base_info(?, ?, ?, ?, ?, ?, ?, ?);', params)
        .then((result) => {
            res.Success(ctx, result);
        })
        .catch(err => {
            res.BadRequest(ctx, err);
        })
    };

    async delUsersBaseInfo (ctx, next) {
        await conn.delete('DELETE FROM `users_base_info` WHERE `Account`= ?;', ctx.query.Account)
        .then((result) => {
            res.Success(ctx, result);
        })
        .catch(err => {
            res.BadRequest(ctx, err);
        })
    };
    
}

exports = module.exports = new Users();