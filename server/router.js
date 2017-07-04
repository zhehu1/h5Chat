const Router = require('koa-router');
const res = require('./libs/res');
const apis = require('./apis.js');
const router = new Router({
  prefix: '/api'
});

for (let o in apis) {
    router[o.split(':')[0]](o.split(':')[1],async (ctx, next) => {
      try {
        let result = await apis[o](ctx);
        debugger;
        res.Success(ctx, result);
      } catch (err) {
        res.BadRequest(err);
      }
    });
}

exports = module.exports = router;