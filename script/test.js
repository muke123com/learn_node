const iconv = require('iconv-lite');
const fs = require('fs');
const booksDirPath = './books/';
const name = 't111.txt'
fs.createReadStream(booksDirPath + name)
    .pipe(iconv.decodeStream('gbk'))
    .pipe(iconv.encodeStream('utf-8')) 
    .pipe(fs.createWriteStream('t111_uft8.txt')) 
// str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');

console.log(11)