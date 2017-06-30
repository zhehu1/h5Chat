const Router = require('koa-router');
const res = require('./libs/res');
const router = new Router({
  prefix: '/api'
});

const users = require('./api/users');

for (let o in users) {
  for (let method in users[o]) {
    router[method](o,async (ctx, next) => {
      try {
        let result = await users[o][method](ctx);
        res.Success(ctx, result);
      } catch (err) {
        res.BadRequest(err);
      }
    });
  }
}

exports = module.exports = router;