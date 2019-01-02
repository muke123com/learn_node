const Koa = require('koa');
const fs = require('fs');

let app = new Koa();

function asyncREadFile() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./index.html', (err, data)=>{
            if(err) {
                reject(err);
                return
            }
            // 成功
            resolve(data);
        })
    })
}

//async(声明函数中有异步操作) + await(等待) = promise
app.use(async (ctx)=>{
    if(ctx.url === '/'){
        let data = await asyncREadFile();
        //设置响应头
        ctx.set('content-type','text/html;charset=utf-8');
        ctx.body = data;
        // ctx.body = data.toString();
    } else {
        ctx.body = 'ok';
    }
});

app.listen(3000, ()=>{
    console.log('listening: 3000')
});