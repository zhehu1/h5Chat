const Router = require('koa-router');
const res = require('./libs/res');
const router = new Router({
  prefix: '/api'
});

const users = require('./api/users');

router.put('/users', async(ctx, next) => {
  try {
    let result = await users.addUsersBaseInfo(ctx.query);
    res.Success(ctx, result);
  } catch (err) {
    res.BadRequest(err);
  }
});
router.get('/users', async(ctx, next) => {
  try {
    let result = await users.getUsersBaseInfo(ctx.query.Account);
    res.Success(ctx, result);
  } catch (err) {
    res.BadRequest(err);
  }
});
router.post('/users', users.updateUsersBaseInfo);
router.delete('/users', users.delUsersBaseInfo);

exports = module.exports = router;