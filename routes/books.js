const router = require('koa-router')()
const booksModel = require('../models/books')

router.prefix('/books');

router.get('/list', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
// 将本地图书存入数据库中
router.get('/initBooks', async (ctx, next) => {
    let res = booksModel.insertBooksFromFolder();
    ctx.body = res
})

router.get('/getBooks', async (ctx, next) => {
    let key = ctx.query.key;
    let books = await booksModel.getBooks(key);
    ctx.body = books
})

router.get('/getBookContentByTitle', async (ctx, next) => {
    let title = ctx.query.title;
    let content = await booksModel.getBookContentByTitle(title);
    ctx.body = content
})

router.get('/getBookContent/:name', async (ctx, next) => {
    let name = ctx.params.name
    let content = await booksModel.getBookContentStream(name);
    ctx.body = content
})

router.get('/test', async (ctx, next) => {
    let encode = ctx.query.encode;
    let data = await booksModel.getBookContentStream('t111.txt', encode);
    ctx.body = data;
})


module.exports = router
