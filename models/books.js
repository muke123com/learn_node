const db = require('../db');
const fs = require('fs')

let booksModel = {};
const booksDirPath = './books/';

booksModel.getBooks = async () => {
    let sql = 'select * from k_users';
    let users_list = await db.q(sql, []);
    return users_list;
};

// 从文件夹中获取图书
booksModel.getBooksInFolder = async () => {
    let books = fs.readdirSync(booksDirPath)
    return books;
};

// 添加到数据库 
booksModel.insertBooks = async () => {
    let books = await booksModel.getBooksInFolder();
    let values = '';
    
    for (let i = 0; i < books.length; i++) {
        let value = '("' + books[i] + '")';
        if(i == books.length - 1) {
            values += value
        }else{
            values += value + ','
        }
    }
        
    let sql = 'insert into m_books (title) values ' + values;
    console.log(sql);
    let res = await db.q(sql, []);
    console.log(res);
}

// 获取图书内容
booksModel.getBookContent = async (name) => {
    let bookContent = fs.readFileSync(booksDirPath + name)
    return bookContent;
};

module.exports = booksModel;