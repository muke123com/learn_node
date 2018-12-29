// 1.引入对象
const Koa = require('koa');
// 2.创建服务器对象
let app = new Koa();
// 3.处理响应
app.use((ctx,next)=>{
    //ctx.request 简写
    console.log(ctx.url);
    console.log("=========================");
    console.log(ctx.method);
    console.log("=========================");
    console.log(ctx.headers);
    next();
});

app.use((ctx)=>{
    //ctx.response 简写
    console.log('第二件事')
    ctx.set('mytest', '123456');
    ctx.status = 200;
    ctx.body = '<h1 style="color: red">KOA RESPONSE</h1>';
});

// 4.监听端口
app.listen(3000, ()=>{
    console.log(3000)
});

