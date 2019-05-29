import * as Router from 'koa-router';
import ProductController from './controller/ProductController';
const router = new Router();

router.get('/index', async (ctx, next) => {
    ctx.body = '接口正常'
})

router.get('/product/games', ProductController.getGames)
router.get('/product/getGamesBySteam', ProductController.getGamesBySteam)

export { router };