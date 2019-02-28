const Koa = require('koa')
const router = require('koa-router')();
const app = new Koa();

router.get('/home', async (ctx,next)=>{
    ctx.body = '<h1>koa-socket</h1>'
});

app.use(router.routes());

app.listen(3000, ()=>{
    console.log('listen:3000')
});