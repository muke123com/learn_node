"use strict";
exports.__esModule = true;
var fs = require("fs");
var booksDirPath = './books/';
var books = fs.readdirSync(booksDirPath);
console.log(books);
