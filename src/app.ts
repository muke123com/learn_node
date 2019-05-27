import * as fs from 'fs';
const booksDirPath = './books/';
let books = fs.readdirSync(booksDirPath)
console.log(books);
