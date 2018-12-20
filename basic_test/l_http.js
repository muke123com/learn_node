//http
const http = require('http');
let server = http.createServer();
server.on('request', (req,res)=>{
    //req只读 拿属性
    //res只读 调函数
    console.log(req.headers);
    res.writeHead(200);
    res.write('abc');
    res.write('def');
    res.end('233');
});
server.listen(8080,()=>{
    console.log('listen:8080')
})