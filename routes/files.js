const router = require('koa-router')();
const fs = require('fs');
const Jsons = require('../models/jsons');

router.prefix('/files');

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
});
// 获取当前数据库所有表
router.get('/getTableList', async (ctx, next) => {
    ctx.body = await Jsons.getTableList();
});
// 将表数据转为json和小程序数据库json数据
router.get('/getJson', async (ctx, next) => {
    let query = ctx.query;
    let tableName = query.table?query.table:'poets';
    let res = await Jsons.getJsons(tableName);
    fs.writeFile('../jsonData/' + tableName + '.json', JSON.stringify(res), (err)=>{
        console.log("数据写入成功！");
    });
    let db_json = '';
    res.map((item) => {
        db_json += JSON.stringify(item) + '\n';
    });

    fs.writeFile('../jsonData/db_' + tableName + '.json', db_json, (err)=>{
        console.log("db数据写入成功！");
    });

    ctx.body = res[0];
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
});

module.exports = router