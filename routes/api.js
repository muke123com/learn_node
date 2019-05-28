const router = require('koa-router')()

const spiderModel = require('../models/spider');
const userController = require('../src/controller/UserController')

router.prefix('/api');

router.get('/index', async (ctx, next) => {
    ctx.body = '接口正常'
})

router.post('/users/login', userController.login)
router.post('/users/register', userController.register)

module.exports = router