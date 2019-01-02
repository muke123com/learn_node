const router = require('koa-router')();
const usersModel = require('../models/users');

router.prefix('/users');

router.get('/login', async (ctx, next) => {
    let users = await usersModel.getUsers();
    console.log(users);
    await ctx.render('users/login', {
        title: '登录'
    })
});
router.get('/register', async (ctx, next) => {
    await ctx.render('users/register', {
        title: '注册'
    })
});

router.post('/login', async (ctx, next) => {
    ctx.body = 'koa2 string'
});

module.exports = router;