const Router = require('koa-router');
const res = require('./libs/res');
const conn = require('./conn/conn');
const router = new Router({
  prefix: '/api'
});

router.get('/users', async (ctx, next) => {
    await conn.query('select * from city;')
    .then((result, fields) => {
        res.Success(ctx, result);
    })
    .catch(err => {
        res.BadRequest(ctx, err);
    })
});

exports = module.exports = router;