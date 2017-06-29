const conn = require('../conn/conn');
const res = require('../libs/res');

class Users {
    constructor (conn) {}

    /**
     * 新增用户
     */
    async addUsersBaseInfo (ctx, next) {
        // `Account`, `Email`, `Pic`, `Tel`, `Career`, `Birthday`, `Company`, `Address`
        let params = new Array(8);
        params[0] = ctx.params.Account || null;
        params[1] = ctx.params.Email || null;
        params[2] = ctx.params.Pic || null;
        params[3] = ctx.params.Tel || null;
        params[4] = ctx.params.Career || null;
        params[5] = ctx.params.Birthday || null;
        params[6] = ctx.params.Company || null;
        params[7] = ctx.params.Address || null;
        await conn.insert('call i_users_base_info(?, ?, ?, ?, ?, ?, ?, ?);', params)
        .then((result) => {
            res.Success(ctx, result);
        })
        .catch(err => {
            res.BadRequest(ctx, err);
        })
    };

    async getUsersBaseInfo (ctx, next) {
        await conn.query('select * from `users_base_info` where Account=?', ctx.query.Account)
        .then((result) => {
            res.Success(ctx, result);
        })
        .catch(err => {
            res.BadRequest(ctx, err);
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