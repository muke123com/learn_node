import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { Steam } from '../entity/Steam';

export default class ProductController {
    public static async getGames (ctx: BaseContext) {
        const productRepository: Repository<Steam> = getManager().getRepository(Steam);

        const games: Steam[] = await productRepository.find();

        ctx.status = 200;
        ctx.body = games;
    }
}