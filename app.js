const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const glob = require('glob')

const Jwt = require('./models/jwt')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next) => {
  if(ctx.url != '/users/login'){
      let token = ctx.headers.token;
      let jwt = new Jwt(token);
      let result = jwt.verifyToken(token);

      if(result == 'err'){
          ctx.body = {status: 403, msg: '登录已过期，请重新登录'}
      }else {
          await next();
      }
  }else {
      await next();
  }
})
// routes
glob('routes/*.js', (err, files) => {
  files.map(item => {
    const r = require(`./${item}`)
    app.use(r.routes(), r.allowedMethods())
  })
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
