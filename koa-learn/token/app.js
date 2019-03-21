const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const router = require('koa-router')();
const app = new Koa();

//token
const jwt = require('jsonwebtoken');
// Token 数据
const payload = {
    name: 'mk',
    admin: true
};
// 密钥
const secret = 'HHHAAA';
// 签发 Token
const token = jwt.sign(payload, secret, { expiresIn: '1day' })
// 输出签发的 Token
console.log(token);

jwt.verify(token, 'HHHAAA', (error, decoded) => {
    if (error) {
        console.log('签名错误');
        return
    }
    console.log(decoded)
});


app.use(require('koa-static')(__dirname));

router.get('/test', async (ctx,next)=>{
    let id = ctx.request.query.id;
    console.log(ctx.request.query);
    ctx.body = "id " + id + " 获取成功";
});

app.use(bodyParser());
app.use(router.routes());

app.listen(3000, ()=>{
    console.log('listen:3000')
});