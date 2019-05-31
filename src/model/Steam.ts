import * as request from 'request';
import * as cheerio from 'cheerio';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { Steam } from '../entity/Steam';

export class SteamModel {
    readonly table = 'm_steam'
    static async getDataFromSteam(page) {
        return new Promise((resolve, reject) => {
            let url = 'https://store.steampowered.com/search/';
            // let url = 'https://www.baidu.com/';

            let options = {
                method: 'GET',
                url: url,
                qs: { filter: 'topsellers', os: 'win' },
                headers:
                {
                    'Postman-Token': 'd2d5868a-0911-42fc-9373-4f075c8bfa41',
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/json'
                },
            }

            request(options, async (error, response, body) => {
                if (error) {
                    reject(error)
                }
                const steamRepository: Repository<Steam> = getManager().getRepository(Steam);
                const $ = cheerio.load(body);
                let row = $(".search_result_row");
                let dataList: Steam[] = [];
                row.each(async (i) => {
                    let s = new Steam();
                    s.name = row.eq(i).find(".title").text();
                    s.image = row.eq(i).find("img").attr("src");
                    s.href = row.eq(i).attr("href");
                    s.gameId = row.eq(i).attr("data-ds-appid");
                    s.discount = row.eq(i).find(".search_discount span").text();
                    s.price = row.eq(i).find("strike").text();
                    s.newPrice = row.eq(i).find(".search_price_discount_combined").attr("data-price-final");
                    s.age = 0;
                    
                    // const game = await steamRepository.find({name: s.name});
                    // if(game.length == 0) {
                    //     steamRepository.save(s);
                    // }else {
                    //     await steamRepository.update(s, {name: s.name});
                    // }

                    steamRepository.update(s, {name: s.name});
                })
                resolve(page + '抓取成功');
            });
        })
    }
}