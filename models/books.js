const db = require('../db');
const fs = require('fs')
const iconv = require('iconv-lite');

let booksModel = {};
const booksDirPath = './books/';

booksModel.getBooks = async (key='') => {
    let sql = `select mtitle from m_books where mcontent like '%${key}%' limit 20`;
    let books_list = await db.q(sql, []);
    return books_list;
};
booksModel.getBookContentByTitle = async (title) => {
    let sql = `select mcontent from m_books where mtitle = '${title}'`;
    let book_content = await db.q(sql, []);
    return book_content;
};

// 从文件夹中获取图书
booksModel.getBooksInFolder = async () => {
    let books = fs.readdirSync(booksDirPath)
    return books;
};

// 将文件夹中文件添加到数据库 
booksModel.insertBooksFromFolder = async () => {
    let books = await booksModel.getBooksInFolder();
    let values = '';
    
    for (let i = 0; i < books.length; i++) {
        let title = books[i];
        let content = await booksModel.getBookContentStream(title);
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
booksModel.getBookContent = async (name, encode) => {
    let bookContent = fs.readFileSync(booksDirPath + name, 'utf-8')
    bookContent = iconv.decode(bookContent, encode);
    return bookContent;
};
// 获取图书内容stream
booksModel.getBookContentStream = async (name, encode) => {
    return new Promise(function(resolve, reject) {
        let rs = fs.createReadStream(booksDirPath + name)
            .pipe(iconv.decodeStream('gbk'))
            // .pipe(iconv.encodeStream('utf-8')); 
        var data='';
        rs.on('data',function(trunk){
            data += trunk;
        })
        rs.on('end',function(){
            try {
                let book = data;
                resolve(book);
            }catch (err){
                reject(err);
            }
        })
    })
    
};
// 清空数据库
booksModel.clear = async () => {
    let sql = `TRUNCATE m_books`;
    await db.q(sql, []);
}

module.exports = booksModel;