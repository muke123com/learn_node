const db = require('../db');
const fs = require('fs')
const iconv = require('iconv-lite');

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
booksModel.insertBooksFromFolder = async () => {
    let books = await booksModel.getBooksInFolder();
    let values = '';
    
    for (let i = 0; i < books.length; i++) {
        let title = books[i];
        let content = await booksModel.getBookContent(title);
        let value = `('${title}', '${content}')`;
        if(i == books.length - 1) {
            values += value
        }else{
            values += value + ','
        }
    }
    // TRUNCATE m_books;    
    await booksModel.clear();
    let sql = `insert into m_books (mtitle, mcontent) values ${values}`;
    let res = await db.q(sql, []);
    console.log(res);
}

// 获取图书内容
booksModel.getBookContent = async (name) => {
    let bookContent = fs.readFileSync(booksDirPath + name, 'utf-8')
    return bookContent;
};
booksModel.getBookContentStream = async (name, encode) => {
    let bookContent = 123;
    return new Promise(function(resolve, reject) {
        let rs = fs.createReadStream(booksDirPath + name); 
        rs.setEncoding(encode)
        var data='';
        rs.on('data',function(trunk){
            data += trunk;
        })
        rs.on('end',function(){
            let book = iconv.decode(data,encode);
            resolve(book);
        })
    })
    
};

booksModel.clear = async () => {
    let sql = `TRUNCATE m_books`;
    await db.q(sql, []);
}

module.exports = booksModel;