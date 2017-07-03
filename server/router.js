const Router = require('koa-router');
const res = require('./libs/res');
const router = new Router({
  prefix: '/api'
});

const users = require('./api/users');

for (let o in users) {
    router[o.split(':')[0]](o.split(':')[1],async (ctx, next) => {
      try {
        let result = await users[o](ctx);
        res.Success(ctx, result);
      } catch (err) {
        res.BadRequest(err);
      }
    });
}

exports = module.exports = router;