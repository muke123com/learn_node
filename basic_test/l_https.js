const express = require('express');

const https = require('https');
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'a.txt'), (err, data)=>{
    if (err) throw err;
    console.log(data.toString());
});

const options = {
    key: fs.readFileSync(path.join(__dirname, 'privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cacert.pem'))
};

https.createServer(options, (req, res)=>{
    res.writeHead(200);
    res.end('https success')
}).listen(3000);