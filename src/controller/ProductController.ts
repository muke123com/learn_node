import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import * as fs from 'fs'

import { Steam } from '../entity/Steam';
import { SteamModel } from '../model/Steam';
import { Test } from '../entity/Test';

export default class ProductController {
    public static async getGames (ctx: BaseContext) {
        const steamRepository: Repository<Steam> = getManager().getRepository(Steam);

        const games: Steam[] = await steamRepository.find();
        const sql = await steamRepository.query(`show create table m_steam`)

        ctx.status = 200;
        ctx.body = games;
    }
    
    public static async getGamesBySteam (ctx: BaseContext) {
        const steamRepository: Repository<Steam> = getManager().getRepository(Steam);
        try {
            let page = 0
            let dataList = await SteamModel.getDataFromSteam(page)

            ctx.body = dataList   
        } catch (e) {
            console.log(e);
        }
        
        
    }

    public static async test (ctx: BaseContext) {
        const testRepository: Repository<Test> = getManager().getRepository(Test);
        try {
            let test = new Test();
            let test2 = new Test();
            test.name = "abc";
            test2.name = "def";
            
            let result = await testRepository.update(test, {name: test.name});
            let result2 = await testRepository.update(test2, {name: test2.name});

            ctx.body = result
        } catch (e) {
            console.log(e);
        }
    }
}