const router = require('koa-router')()

const spiderModel = require('../models/spider');

router.prefix('/index');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/getData', async (ctx, next) => {
  let data = await spiderModel.getData();
  ctx.body = data;
})


module.exports = router
