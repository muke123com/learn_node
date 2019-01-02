const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const router = require('koa-router')();
const app = new Koa();

app.use(require('koa-static')(__dirname + '/public'))

router.get('/', async (ctx,next)=>{

    ctx.render('index');
});

router.post('/login', async ctx => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    console.log(username, password);
    if(username != 'abc' || password != '123'){
        ctx.throw(200, `账号或密码错误`)
    }else {
        ctx.session.user = {
            username: username
        };
        ctx.body = '登录成功'
    }
});

app.keys = ['qds123!@#'];

const CONFIG = {
    key: 'koa:sess', //session名
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** 不允许客户端修改 */
    signed: true, //数字签名，保证数据不被篡改
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));


app.use(bodyParser());
app.use(router.routes());

app.listen(3000, ()=>{
    console.log('listen:3000')
});

