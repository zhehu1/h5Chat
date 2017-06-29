const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

const users = require('./api/users');

router.put('/users', users.addUsersBaseInfo);
router.get('/users', users.getUsersBaseInfo);
router.post('/users', users.updateUsersBaseInfo);
router.delete('/users', users.delUsersBaseInfo);

exports = module.exports = router;