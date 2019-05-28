import * as Router from 'koa-router';
const router = new Router();

router.get('/', async (ctx, next) => {
    ctx.body = 123
})

export { router };