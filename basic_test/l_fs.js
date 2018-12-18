const fs = require('fs');
const path = require('path');
console.log(__dirname);

// fs.writeFile(__dirname + '/a.txt', 'wwwwwwwwwww', (err)=>{
//     if (err) throw err;
//     console.log('success');
// });
//
// fs.readFile(__dirname + '/a.txt', (err, data)=>{
//     if (err) throw err;
//     console.log(data.toString());
// });

let data = fs.readFileSync(__dirname + '/a.txt', 'utf-8');
console.log(data);
fs.writeFileSync(__dirname + '/b.txt', data);