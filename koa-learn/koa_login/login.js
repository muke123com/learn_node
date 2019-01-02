const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
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

    }
    ctx.redirect('/');
});

//错误处理
app.on('error', (err, ctx)=>{
    console.log(err);
    ctx.body = `
        <div style="font-size: 30px">(╯‵□′)╯︵┻━┻z</div>
    `
});

app.use(bodyParser());
app.use(router.routes());

app.listen(3000, ()=>{
    console.log('listen:3000')
});

