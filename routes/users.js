const router = require('koa-router')();
const usersModel = require('../models/users');
const Jwt = require('../models/jwt');
const showAjax = require('../models/showAjax');

router.prefix('/users');

router.post('/login', async (ctx, next) => {
    console.log('/login/');
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let res = await usersModel.findOne(username, password);

    ctx.body = res;
})

router.get('/getUserInfo', async (ctx, next) => {
    ctx.body = showAjax(1, '用户已登录')
});
router.get('/register', async (ctx, next) => {
    await ctx.render('users/register', {
        title: '注册'
    })
});

module.exports = router;