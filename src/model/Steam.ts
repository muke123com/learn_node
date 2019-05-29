import * as request from 'request';
import * as cheerio from 'cheerio';

export class SteamModel {
    readonly table = 'm_steam'
    static async getDataFromSteam() {
        return new Promise((resolve, reject) => {
            let url = 'https://store.steampowered.com/search/';

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
                const $ = cheerio.load(body);
                let row = $(".search_result_row");
                let dataList = [];
                row.each((i) => {
                    let name = row.eq(i).find(".title").text();
                    let image = row.eq(i).find("img").attr("src");
                    let href = row.eq(i).attr("href");
                    let game_id = row.eq(i).attr("data-ds-appid");
                    let discount = row.eq(i).find(".search_discount span").text();
                    let price = row.eq(i).find("strike").text();
                    let new_price = row.eq(i).find(".search_price_discount_combined").attr("data-price-final");

                    let data = {
                        name,
                        image,
                        href,
                        game_id,
                        discount,
                        price,
                        new_price
                    };

                    dataList.push(data);
                })
                resolve(dataList);
            });
        })
    }
}