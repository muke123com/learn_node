const router = require('koa-router')()
const booksModel = require('../models/books')

router.prefix('/books');

router.get('/list', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/initBooks', async (ctx, next) => {
    booksModel.insertBooks();
    ctx.body = 'books'
})

router.get('/getBooks', async (ctx, next) => {
    let books = await booksModel.getBooksInFolder();
    console.log(books);
    ctx.body = books
})

router.get('/getBookContent/:name', async (ctx, next) => {
    let name = ctx.params.name
    let content = await booksModel.getBookContent(name);
    content = content.toString();
    ctx.body = content
})

module.exports = router
