const db = require('../db');
const fs = require('fs')
const iconv = require('iconv-lite');

let booksModel = {};
const booksDirPath = './books/';
let all = 0;
let count = 0;

booksModel.getBooks = async (key='') => {
    let sql = `select mtitle from m_books where mcontent like '%${key}%' limit 1000`;
    console.log(sql);
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
    all = books.length;
    // TRUNCATE m_books;    
    await booksModel.clear();
    let values = '';
    let v_arr = [];
    let v_sql = '';
    
    for (let i = 0; i < books.length; i++) {
        let title = books[i];
        let content = await booksModel.getBookContentStream(title);

        title = escape(books[i]);
        content = escape(content);

        let value = `('${title}', '${content}')`;

        v_sql = `insert into m_books (mtitle, mcontent) values ${value}`;
        try {
            let res = await db.q(v_sql, []);
            count++;
            console.log(count + '/' + all);
        } catch (error) {
            console.log(v_sql);
            throw error
        }
    }
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
            // .pipe(iconv.decodeStream('gbk'))
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