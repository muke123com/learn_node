const path = require('path');
const myPath = path.join(__dirname, '//p1/','///p2', '/p3///','1.txt');  //拼接校验路径
console.log(myPath);

const myPath2 = './aa/a.js';
let temp = path.resolve(myPath2);  //相对转绝对路径
console.log(temp);

const pathObj = path.parse(myPath);  //路径转为路径对象
console.log(pathObj);

console.log(path.format(pathObj));   //路径对象转为路径