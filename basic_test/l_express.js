const express = require('express');
let server = express();
server.listen(8080, ()=>{
    console.log('listen:8080')
});

server.use('/a',(req,res,next)=>{
    console.log('123');
    next();
});
server.use('/b', (req,res,next)=>{
    console.log('456')
    next();
});
